import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Compass, 
  BrainCircuit, 
  Copy, 
  Check, 
  RotateCcw,
  Building,
  TrendingUp,
  ShieldCheck,
  Phone,
  MessageSquare,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { Property } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  thinkingMode?: string;
  isVerificationCard?: boolean;
}

interface AIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  contextProperty?: Property | null;
  onOpenScheduleTour?: (property: Property) => void;
}

export const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  contextProperty = null,
  onOpenScheduleTour
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Kusoo dhawoow **Kaabsan Real Estate AI Advisor** (Qayb ka mid ah **Telesom Group**).

**Mashaariicda aad iibsan karto waxay kala yihiin:**
1. **Rugsan Gardens** (Masallaha) - 70 Modern Luxury Townhouses + DSQ (Plot: 400 m², Built: 321 m²), $225,000 (Maalgelin 5 Sano ah).
2. **Aragsan Village** (Buurta Kala-jeexan) - 66 Standalone Luxury Villas (Gross: 361.99 m², Plot: 483 m²), $292,508.40 (Maalgelinta 60-ka Bilood oo Islaami ah oo ay bixinayso Dara Salaam Bank, 0% Riba).
3. **Bilicsan Village** (Masallaha) - 16 Standalone Luxury Compound Villas (Typology A: 7 Bedrooms, Plot: 450 m², Built: 380 m²), $275,000 – $336,000 (Maalgelin 5 Sano ah).
4. **Masallaha Apartment** (Masallaha Luxury Apartments) - 2, 3, 4 qolal iyo Penthouses (107 m² - 272 m²), 78 baabuur baakinkood, 2 wiish, matoor 24/7 ah (Maalgelin 5 Sano ah).

*Xusuusin: Wixii xog dheeraad ah ama ballamaha gaarka ah ee aan halkan ku jirin, waxaan toos kuugu gudbinayaa **Staff-ka Iibka & Suuqgeynta ee Kaabsan** (Tel/WhatsApp: **+252 63 6100090** / Khadka Gaaban: **380**).*

Sideen maanta kuugu caawin karaa?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      thinkingMode: 'Kaabsan AI Assistant'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Anti-bot Human Verification state
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientLocation, setClientLocation] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [isVerifiedHuman, setIsVerifiedHuman] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showVerificationForm]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          contextProperty: contextProperty ? {
            title: contextProperty.title,
            address: contextProperty.address,
            neighborhood: contextProperty.neighborhood,
            price: contextProperty.priceDisplay,
            sqft: contextProperty.sqft,
            beds: contextProperty.beds,
            baths: contextProperty.baths,
            style: contextProperty.architecturalStyle
          } : undefined
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from Kaabsan advisor');
      }

      const data = await response.json();
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Waad ku mahadsan tahay su\'aashaada. Waxaan ku gudbinayaa staff-ka iibka ee Kaabsan Real Estate (WhatsApp: +252 63 6100090).',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thinkingMode: data.thinkingMode || 'Kaabsan Official Intelligence'
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const fallbackMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `Mashaariicda rasmiga ah ee Kaabsan Real Estate (Aragsan Village, Masallaha Apartments, Rugsan Gardens) waxaa lagu iibsan karaa qorshe **60 Bilood (5 Sano)** oo 30% horumarin ah (0% Riba).\n\nWaxaan ku gudbinayaa staff-ka iibka iyo marketing-ka ee Kaabsan Real Estate si ay su'aashaada xog buuxda kaaga siiyaan.\n\n📞 **Telesom:** 380 | **WhatsApp:** +252 63 6100090`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thinkingMode: 'Kaabsan Verified Database'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientLocation || !clientWhatsapp) return;

    setIsVerifiedHuman(true);
    setShowVerificationForm(false);

    // Save lead to inquiries database
    try {
      const currentInquiries = JSON.parse(localStorage.getItem('kaabsan_inquiries_v11') || '[]');
      const newInquiry = {
        id: `inq-ai-${Date.now()}`,
        clientName,
        phone: clientWhatsapp,
        location: clientLocation,
        propertyName: contextProperty?.title || 'Kaabsan AI Verified Inquiry',
        propertyType: 'Master Community',
        budget: '$200,000+',
        financingRequested: true,
        source: 'Kaabsan AI Assistant (Human Verified)',
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        urgency: 'High',
        notes: `Macmiilka dhabta ah ee xaqiijiyay xogtiisa: Magaca: ${clientName}, Goobta: ${clientLocation}, WhatsApp: ${clientWhatsapp}`
      };
      localStorage.setItem('kaabsan_inquiries_v11', JSON.stringify([newInquiry, ...currentInquiries]));
    } catch (e) {
      console.warn('Could not persist inquiry:', e);
    }

    const verificationMsg: Message = {
      id: `user-verif-${Date.now()}`,
      sender: 'user',
      text: `Xogtayda Xaqiijinta Macmiilka:\n👤 **Magaca:** ${clientName}\n📍 **Goobta/Magaalada:** ${clientLocation}\n📱 **WhatsApp:** ${clientWhatsapp}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const aiConfirmMsg: Message = {
      id: `ai-verif-${Date.now()}`,
      sender: 'ai',
      text: `✅ **Waad ku mahadsan tahay ${clientName}!**\n\nXogtaadii waa la xaqiijiyay waxaana lagu diiwaangeliyay nidaamka rasmiga ah ee Kaabsan Real Estate.\n\nWaxaan toos kuugu gudbiyay **Staff-ka Iibka & Suuqgeynta ee Kaabsan**. Waxaad toos ugula hadli kartaa WhatsApp ama wac Tel **+252 63 6100090** ama **380** (Telesom).`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      thinkingMode: 'Human Lead Verified'
    };

    setMessages((prev) => [...prev, verificationMsg, aiConfirmMsg]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: 'Wada-hadalkii waa la nadiifiyay. Sideen kuugu caawin karaa mashaariicda rasmiga ah ee Kaabsan Real Estate ee aad iibsan karto (Rugsan Gardens, Aragsan Village, Bilicsan Village, Masallaha Apartment, ama Maalgelinta 60-ka Bilood ee Dara Salaam Bank)?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thinkingMode: 'Kaabsan AI Assistant'
      }
    ]);
    setIsVerifiedHuman(false);
  };

  const suggestedPrompts = [
    "Faahfaahin buuxda iga sii Aragsan Village (Buurta Kala-jeexan) iyo qiimaha",
    "Masallaha Luxury Apartments dabaqyada iyo adeegyada ku yaalla",
    "Sidee u shaqeysaa Maalgelinta 60-ka bilood ee Dara Salaam Bank (0% Riba)?",
    "Waa maxay cabirrada (m²) iyo qolalka ku yaal G+1 Villa ee Aragsan?",
    "Igu xidh staff-ka iibka iyo marketing-ka ee Kaabsan Real Estate"
  ];

  if (!isOpen) return null;

  const whatsappDirectUrl = `https://wa.me/252636100090?text=${encodeURIComponent(
    `Kaabsan Real Estate Official Website:\nAssalaamu Calaykum Kaabsan Real Estate, Waxaan ahay ${clientName || 'Macmiil'}, waxaan joogaa ${clientLocation || 'Hargeisa'}, waxaan rabaa xog ku saabsan mashaariicda Kaabsan iyo maalgelinta Dara Salaam Bank.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[780px] bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#1A1A1A]">
        
        {/* Header */}
        <div className="bg-[#F9F8F6] border-b border-[#E5E2DA] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#C2A55D]/50 flex items-center justify-center text-[#C2A55D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base text-[#1A1A1A] font-bold font-serif">Kaabsan Real Estate AI</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#C2A55D]/15 text-[#8C733E] border border-[#C2A55D]/30 font-semibold">
                  Telesom Group • Verified Knowledge
                </span>
              </div>
              <p className="text-xs text-[#6B665E]">
                60-Month Islamic Financing (Dara Salaam Bank) & Official Real Estate Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowVerificationForm(!showVerificationForm)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E5E2DA] hover:border-[#C2A55D] text-xs font-bold text-[#8C733E] transition-all cursor-pointer shadow-xs"
              title="Xaqiijinta Macmiilka"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isVerifiedHuman ? 'Verified Human ✓' : 'Human Lead Connect'}</span>
            </button>
            <button
              onClick={handleClearChat}
              className="p-2 text-[#6B665E] hover:text-[#1A1A1A] hover:bg-[#EAE6DE] rounded-full transition-colors cursor-pointer"
              title="Nadiifi Wada-hadalka"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#6B665E] hover:text-[#1A1A1A] hover:bg-[#EAE6DE] rounded-full transition-colors cursor-pointer"
              id="close-ai-advisor-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Context Property Banner if applicable */}
        {contextProperty && (
          <div className="bg-[#F4F1EA] border-b border-[#E5E2DA] px-5 py-2.5 flex items-center justify-between text-xs text-[#4A4742]">
            <div className="flex items-center gap-2 truncate">
              <Building className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span className="text-[#6B665E]">Hadda Baadhaya:</span>
              <strong className="text-[#1A1A1A] truncate">{contextProperty.title} ({contextProperty.priceDisplay})</strong>
            </div>
            <span className="text-xs text-[#C2A55D] font-semibold">{contextProperty.neighborhood}</span>
          </div>
        )}

        {/* Anti-Bot Verification Form Banner if opened */}
        {showVerificationForm && (
          <div className="bg-[#FDFBF7] border-b border-[#E8E2D5] p-4 sm:p-5 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                  Xaqiijinta Macmiilka Dhabta ah (Human Lead Verification)
                </h4>
              </div>
              <button 
                onClick={() => setShowVerificationForm(false)}
                className="text-xs text-gray-500 hover:text-black cursor-pointer"
              >
                ✕ Xidh
              </button>
            </div>
            <p className="text-xs text-[#6B665E] mb-3">
              Si aan u kala saarno macaamiisha dhabta ah iyo bots-ka, isla markaana kooxda iibku si toos ah WhatsApp kuugula soo xidhiidhaan, fadlan geli 3-daada xog:
            </p>
            <form onSubmit={handleVerificationSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#4A4742] mb-1">1. Magacaaga oo buuxa *</label>
                <input
                  type="text"
                  required
                  placeholder="Tusaale: Ahmed Jama"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white border border-[#DCD6C8] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#8C733E]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#4A4742] mb-1">2. Halka aad joogto (Magaalada/Waddanka) *</label>
                <input
                  type="text"
                  required
                  placeholder="Tusaale: Hargeisa / London / Minnesota"
                  value={clientLocation}
                  onChange={(e) => setClientLocation(e.target.value)}
                  className="w-full bg-white border border-[#DCD6C8] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#8C733E]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#4A4742] mb-1">3. Lambarka WhatsApp-ka *</label>
                <input
                  type="tel"
                  required
                  placeholder="+252 63 ... ama +44 ..."
                  value={clientWhatsapp}
                  onChange={(e) => setClientWhatsapp(e.target.value)}
                  className="w-full bg-white border border-[#DCD6C8] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#8C733E]"
                />
              </div>
              <div className="sm:col-span-3 flex justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setShowVerificationForm(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#6B665E] hover:bg-gray-100 cursor-pointer"
                >
                  Iska Dhaaf
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1A1A1A] text-white hover:bg-[#333] flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Check className="w-3.5 h-3.5 text-[#C2A55D]" />
                  <span>Xaqiiji & Ku Xidh Staff-ka Iibka</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FDFCFA]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#C2A55D]/30 flex items-center justify-center text-[#C2A55D] flex-shrink-0 mt-0.5 shadow-sm">
                  <BrainCircuit className="w-4 h-4" />
                </div>
              )}

              <div
                className={`relative max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#1A1A1A] text-white font-medium'
                    : 'bg-[#FFFFFF] border border-[#E5E2DA] text-[#35322E]'
                }`}
              >
                {/* AI Thinking Mode Badge */}
                {msg.sender === 'ai' && msg.thinkingMode && (
                  <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-[#E5E2DA] text-[10px] text-[#8C733E] font-mono font-semibold">
                    <span className="flex items-center gap-1">
                      <FileCheck className="w-3 h-3 text-[#C2A55D]" />
                      {msg.thinkingMode}
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="text-[#6B665E] hover:text-[#1A1A1A] flex items-center gap-1 cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                )}

                <div className="whitespace-pre-line font-light">
                  {msg.text}
                </div>

                {/* Direct Connect Buttons inside AI response if mentioning staff */}
                {msg.sender === 'ai' && (msg.text.includes('staff') || msg.text.includes('iibka') || msg.text.includes('marketing')) && (
                  <div className="mt-3 pt-3 border-t border-[#EAE6DC] flex flex-wrap items-center gap-2">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Kala Hadal WhatsApp (+252 63 6100090)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    
                    {!isVerifiedHuman && (
                      <button
                        type="button"
                        onClick={() => setShowVerificationForm(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#C2A55D] text-[#8C733E] text-xs font-bold hover:bg-[#F4F1EA] transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Xaqiiji Xogtaada (Human Verification)</span>
                      </button>
                    )}
                  </div>
                )}

                <div
                  className={`text-[9px] mt-2 text-right ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-[#8C867D] font-mono'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#F4F1EA] border border-[#E5E2DA] flex items-center justify-center text-[#35322E] flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Thinking / Loading Animation */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#C2A55D]/30 flex items-center justify-center text-[#C2A55D] flex-shrink-0 shadow-sm">
                <BrainCircuit className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl px-4 py-3 text-xs text-[#4A4742] flex items-center gap-2.5 shadow-sm">
                <div className="flex space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C2A55D] animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C2A55D] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C2A55D] animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-[#8C733E] text-xs font-medium">
                  Raadinaya...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-4 py-2.5 bg-[#F4F1EA] border-t border-[#E5E2DA] overflow-x-auto flex gap-2 scrollbar-none">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-[#E5E2DA] hover:border-[#8C733E] text-[11px] text-[#4A4742] hover:text-[#1A1A1A] transition-colors cursor-pointer shadow-xs"
            >
              ✦ {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#F9F8F6] border-t border-[#E5E2DA]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Waydii Aragsan Village, Masallaha Apartments, ama Maalgelinta 60-ka Bilood..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-white border border-[#E5E2DA] focus:border-[#8C733E] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1A1A1A] focus:outline-none placeholder:text-[#8C867D]"
              id="ai-advisor-input-field"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-3 bg-[#1A1A1A] hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center cursor-pointer shadow-md"
              id="send-ai-message-btn"
            >
              <Send className="w-4 h-4 text-[#C2A55D]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
