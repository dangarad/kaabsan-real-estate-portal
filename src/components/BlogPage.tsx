import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Share2, 
  Check, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  MessageCircle, 
  ArrowRight,
  X
} from 'lucide-react';
import { PressArticle } from '../types';

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: 'Market Trends' | 'Construction & Quality' | 'Financing Guides' | 'Diaspora Investment' | 'Telesom News';
  categorySomali: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-01',
    title: 'Sida Qorshaha Maalgelinta 5-ta Sano (60 Bilood) Ugu Fududeynayo Iibsiga Guryaha Somaliland',
    subtitle: 'Nidaamka Maaliyadeed ee Shareecada Waafaqsan ee Kaabsan Real Estate & Dara Salaam Bank',
    category: 'Financing Guides',
    categorySomali: 'Maalgelinta 5-ta Sano',
    author: 'Kaabsan Financial Advisory',
    authorRole: 'Qaybta Maaliyadda & Maalgelinta',
    date: 'August 16, 2026',
    readTime: '4 daqiiqo',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    summary: 'Kaabsan Real Estate waxay soo bandhigtay nidaamka 60-ka bilood oo ay bixinayso Dara Salaam Bank, kaasoo u sahlaya muwaadiniinta guryo heersare ah ku iibsadaan 30% Down Payment iyo lacag bixin bille ah oo aan lahayn wax ribo ah.',
    content: [
      'Guri iibsashadu waa mid ka mid ah go’aannada ugu muhiimsan ee qofku qaato noloshiisa. Hargeysa iyo guud ahaan Somaliland, kobaca dhaqaalaha iyo baahida guryo tayo leh oo casri ah ayaa sare u kacday sannadihii ugu dambeeyay.',
      'Si looga jawaabo caqabadda lacag bixinta degdegga ah (Upfront Cash), Kaabsan Real Estate (Shirkad ka tirsan Telesom Group) iyo Dara Salaam Bank waxay dhiseen nidaam cusub oo maalgelin 5 sano ah (60 bilood). Nidaamkani wuxuu u shaqeeyaa sidan:',
      '1. **Horumarinta Hore (30% Down Payment):** Macmiilku wuxuu bixinayaa 30% qiimaha guud ee guriga marka la saxiixayo heshiiska rasmiga ah.',
      '2. **Qaybinta 60-ka Bilood:** 70%-ka soo haray waxaa loo qaybinayaa 60 bilood oo siman, taas oo u oggolaanaysa qoysaska iyo maalgashadayaasha inay si fudud u qorsheeyaan miisaaniyaddooda.',
      '3. **Shareeco Waafaqsan (0% Riba):** Ma jiro wax dulsaar ama ribo qarsoon ah. Qiimaha aad ku heshiiso bilowgii ayaa ah qiimaha saxda ah ee aad bixinayso illaa maalinta ugu dambeysa.',
      'Nidaamkan wuxuu si gaar ah u caawiyay qoysaska qurbajoogta ah ee ka soo jeeda Yurub, Waqooyiga Ameerika, iyo Khaliijka, kuwaas oo doonaya guryo dammaanad leh oo ay ku nastaan ama mustaqbalka u maalgashadaan.'
    ],
    keyTakeaways: [
      '30% Down payment bilowga heshiiska',
      '70% waxaa loo qaybiyaa 60 bilood (5 Sano)',
      '100% Shareeco waafaqsan oo aan ribo lahayn (Dara Salaam Bank)',
      'Dammaanad dhismaha iyo lahaanshaha rasmiga ah ee Telesom Group'
    ],
    tags: ['Financing', '60-Months', 'Islamic Banking', 'Rugsan Gardens', 'Aragsan Village', 'Bilicsan Village', 'Masallaha Apartments']
  },
  {
    id: 'blog-02',
    title: 'Maxay Tahay Sababta Shubka Kaabsan Batching Plant Ugu Yahay Halbeegga Tayada Dhismaha?',
    subtitle: 'Shaybaadhka Casriga ah, Tijaabada Cadaadiska (Compressive Strength), iyo Adkeysiga Dhismayaasha',
    category: 'Construction & Quality',
    categorySomali: 'Tayada Dhismaha',
    author: 'Eng. Cabdirisaaq Maxamed',
    authorRole: 'Madaxa Injineerada Kaabsan Ready-Mix',
    date: 'August 12, 2026',
    readTime: '5 daqiiqo',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
    summary: 'Sidee warshadda casriga ah ee Kaabsan Batching Plant u xaqiijisaa in guri kasta lagu dhiso shub heer caalami ah oo tijaabiyay shaybaadhka injineernimada.',
    content: [
      'Tayada dhismaha guri waxay ku xiran tahay saldhigga iyo shubka loo isticmaalo. Hababka duugga ah ee gacanta lagu qaso shubka waxay inta badan keenaan isbeddel ku yimaada saamiga biyaha iyo sibidhka (Water-Cement Ratio), taas oo daciifisa awoodda dhismaha.',
      'Kaabsan Real Estate waxay maalgashi weyn ku samaysay warshadda casriga ah ee **Kaabsan Modern Ready-Mix Batching Plant**, taasoo bixisa:',
      '• **Saamiga Kumbuyuutarka (Automated Batching):** Sibidhka, ciidda, dhagaxa, iyo biyaha waxaa lagu cabbiraa miisaan dijitaal ah oo sax ah oo aan qalad yeelan karin.',
      '• **Tijaabada Shaybaadhka (Laboratory Cube Testing):** Shub kasta oo laga soo saaro warshadda waxaa lagu tijaabiyaa shaybaadhka injineernimada si loo xaqiijiyo awoodda cadaadiska (C25/C30/C35 MPa).',
      '• **Gawaarida Mixer Trucks:** Shubka waxaa goobta dhismaha loogu geeyaa gaadiidka casriga ah ee wareega, iyadoo la adeegsanayo bamka shubka (Concrete Boom Pump) si dhakhso iyo tayo leh loogu shubo.',
      'Taasi waa sababta mashaariicda sida Rugsan Gardens, Aragsan Village, iyo Masallaha Apartments ay u leeyihiin dammaanad adag oo dhisme waara ah.'
    ],
    keyTakeaways: [
      'Miisaan dijitaal ah oo kombuyuutar ku shaqeeya',
      'Tijaabada shaybaadhka ee Compressive Strength',
      'Dhisid dhakhso leh oo leh dammaanad heer caalami ah',
      'Ka hortagga dildilaaca iyo cimilada daran'
    ],
    tags: ['Batching Plant', 'Ready-Mix', 'Concrete Quality', 'Engineering', 'Safety']
  },
  {
    id: 'blog-03',
    title: 'Hargeisa Real Estate Boom: Sababaha Masallaha iyo Jigjiga Yar U Noqdeen Goobaha Ugu Qiimaha Badan',
    subtitle: 'Falanqaynta Suuqa Guryaha, Kaabayaasha Dhaqaalaha, iyo Fursadaha Maalgashiga',
    category: 'Market Trends',
    categorySomali: 'Suuqa Guryaha',
    author: 'Kaabsan Research Desk',
    authorRole: 'Qaybta Falanqaynta Suuqa',
    date: 'August 08, 2026',
    readTime: '6 daqiiqo',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    summary: 'Falanqayn qoto-dheer oo ku saabsan kobaca degmooyinka Masallaha (Madaarka Cigaal agtiisa) iyo Jigjiga Yar (Buurta Kala-jeexan) iyo mustaqbalka maalgashiga guryaha.',
    content: [
      'Magaalada Hargeysa waxay maraysaa marxalad ballaaran oo dhanka horumarka magaalooyinka ah (Urban Expansion). Labada deegaan ee ugu horreeya ee maanta soo jiitay indhaha maalgashadayaasha iyo qoysaska waa **Masallaha** iyo **Jigjiga Yar (Buurta Kala-jeexan)**.',
      '**1. Degmada Masallaha (Corridor-ka Madaarka):**',
      'U dhowaanshaha Madaarka Caalamiga ah ee Cigaal, waddooyinka balaadhan ee laamiga ah, iyo nidaamka master community-yada sida Rugsan Gardens iyo Masallaha Apartments ayaa Masallaha ka dhigay aagga ugu casrisan magaalada.',
      '**2. Jigjiga Yar & Buurta Kala-jeexan:**',
      'Jawiga deggen, hawada macaan ee buurta, iyo aragtida quruxda badan ee magaalada Hargeysa ayaa Jigjiga Yar ka dhigay doorashada koowaad ee dadka doonaya guryo raaxo leh (Luxury Villas) sida mashruuca Aragsan Village.',
      'Maalgashiga guryaha ee labadan deegaan wuxuu sannadkiiba koraa qiyaastii 12-18% qiimaha hantida, taas oo ka dhigaysa mid ka mid ah maalgashiyada ugu faa’iidada badan Geeska Afrika.'
    ],
    keyTakeaways: [
      'Koboc qiime sannadle ah oo u dhaxeeya 12% - 18%',
      'Kaabayaal laami, biyo, iyo adeegyo 24/7 ah',
      'Kala doorashada jawiga buurta (Aragsan) iyo aagga madaarka (Masallaha)',
      'Fursad weyn oo loogu talagalay kireysiga heersare ah'
    ],
    tags: ['Market Analysis', 'Hargeisa', 'Masalaha', 'Jigjiga Yar', 'ROI']
  },
  {
    id: 'blog-04',
    title: 'Hagaha Qurbajoogta: Sida Looga Iibsado Guri Hargeysa Adigoo Jooga UK, USA, ama Scandinavia',
    subtitle: 'Heshiisyada Rasmiga ah, Xaqiijinta Sharciga, iyo Bixinta Tooska ah ee Zaad ama Xawaaladaha',
    category: 'Diaspora Investment',
    categorySomali: 'Hagaha Qurbajoogta',
    author: 'Diaspora Client Relations',
    authorRole: 'La-talinta Macaamiisha Dibadda',
    date: 'August 03, 2026',
    readTime: '5 daqiiqo',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    summary: 'Tallaabooyinka cad ee qurbajooggu ku iibsan karaan guri iyagoo jooga waddamada ay ku nool yihiin, laga bilaabo doorashada ilaa wareejinta furayaasha.',
    content: [
      'Boqolaal qoysas qurbajoog ah ayaa sannad kasta raba inay guri ka dhistaan ama ka iibsadaan dalka hooyo, laakiin waxay inta badan ka walwalaan maamulka dhismaha, hufnaanta lacagta, iyo ilaalinta sharciga.',
      'Kaabsan Real Estate (Telesom Group) waxay dhistay hab nidaamsan oo u gaar ah qurbajoogta:',
      '• **Booqasho Muuqaal ah (Virtual Tour & Live Video):** Waxaad si toos ah muuqaal HD ah ugu arki kartaa goobta dhismaha iyo qaabka guriga.',
      '• **Heshiis Sharci ah oo Saxeexan (Digital Contracts):** Dukumentiyada rasmiga ah waxaa laguugu soo dirayaa hab dijitaal ah oo sugan oo sharciyaysan.',
      '• **Bixinta Tooska ah ee Bangiyada & Zaad:** Waxaad lacag bixintaada toos ugu diri kartaa xisaabaadka rasmiga ah ee Kaabsan (Dara-Salaam Bank, Premier Bank, ama Zaad Merchant).',
      '• **Warbixinnada Dhismaha:** Bishiiba mar waxaa laguu soo dirayaa sawirrada iyo muuqaallada horumarka dhismahaaga.'
    ],
    keyTakeaways: [
      'Heshiisyo sharci ah oo dammaanad leh',
      'Lacag bixin toos ah oo ku socota Telesom Group / Kaabsan accounts',
      'Warbixinta horumarka dhismaha oo bil kasta laguu soo diro',
      'Furayaasha oo si toos ah lagugu wareejiyo markaad timaaddo dalka'
    ],
    tags: ['Diaspora', 'UK Somali', 'USA Somali', 'Nordic', 'Safe Investment']
  }
];

interface BlogPageProps {
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenContact: (msg?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onBack,
  onSelectProject,
  onOpenContact
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', label: 'Dhammaan Maqaallada' },
    { id: 'Financing Guides', label: 'Maalgelinta 5-ta Sano' },
    { id: 'Construction & Quality', label: 'Tayada Dhismaha' },
    { id: 'Market Trends', label: 'Suuqa Guryaha' },
    { id: 'Diaspora Investment', label: 'Hagaha Qurbajoogta' }
  ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const queryMatch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && queryMatch;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] pb-24 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E2DA] sticky top-[68px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-[#6B665E]">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-[#35322E] hover:text-[#C2A55D] font-bold transition-colors cursor-pointer bg-[#F4F1EA] hover:bg-[#EAE6DE] px-3.5 py-1.5 rounded-xl border border-[#E5E2DA]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Bogga Hore (Home)</span>
            </button>
            <span className="text-[#D8D3C8]">/</span>
            <span className="font-bold text-[#1A1A1A] text-xs sm:text-sm">
              Wararka, Falanqaynta & Hagaha (Blog & Insights)
            </span>
          </div>

          <button
            onClick={() => onOpenContact('Waxaan doonayaa la-talin gaar ah oo ku saabsan maalgashiga guryaha')}
            className="bg-[#35322E] hover:bg-[#1A1815] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#C2A55D]" />
            <span>Weydii Khubarada</span>
          </button>
        </div>
      </div>

      {/* Blog Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#24211E] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#E5E2DA]">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D] bg-black/40 px-3.5 py-1 rounded-full border border-white/10 w-fit">
              <BookOpen className="w-3.5 h-3.5 text-[#C2A55D]" />
              Falanqaynta Rasmiga ah ee Kaabsan Real Estate
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal leading-tight">
              Wararka Guryaha, Maalgelinta & Fursadaha Maalgashiga
            </h1>
            <p className="text-xs sm:text-sm text-[#D8D3C8] font-light leading-relaxed">
              Akhriso hagaha rasmiga ah ee dhismaha casriga ah, qorshaha maalgelinta 60-ka bilood ee Dara Salaam Bank & Telesom Group, iyo falanqaynta suuqa guryaha ee Somaliland.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-15 bg-cover bg-center pointer-events-none hidden md:block" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80')` }}></div>
        </div>
      </div>

      {/* Search & Category Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#35322E] text-white shadow-sm'
                    : 'bg-white text-[#4A4742] hover:bg-[#EFECE6] border border-[#E5E2DA]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-[#8C867D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Raadi maqaal, maalgelin, deegaan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2DA] bg-white text-xs text-[#1A1A1A] placeholder-[#8C867D] focus:outline-none focus:border-[#C2A55D] shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Featured Lead Article (if not searching) */}
      {!searchQuery && selectedCategory === 'all' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div 
            onClick={() => setActiveArticle(featuredPost)}
            className="group bg-white rounded-3xl overflow-hidden border border-[#E5E2DA] hover:border-[#C2A55D] transition-all hover:shadow-xl cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#24211E]">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden"></div>
              <span className="absolute top-4 left-4 bg-[#C2A55D] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Featured Insight
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#8C867D]">
                  <span className="font-bold text-[#C2A55D] uppercase">{featuredPost.categorySomali}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                </div>

                <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] group-hover:text-[#C2A55D] transition-colors leading-tight font-normal">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#6B665E] font-light leading-relaxed">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2EFE9] flex items-center justify-between">
                <div className="text-xs">
                  <div className="font-bold text-[#1A1A1A]">{featuredPost.author}</div>
                  <div className="text-[#8C867D] text-[11px]">{featuredPost.authorRole}</div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C2A55D] group-hover:translate-x-1 transition-transform">
                  <span>Akhriso Maqaalka</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] mb-6">
          {searchQuery ? `Natiijooyinka Raadinta (${filteredPosts.length})` : 'Dhammaan Maqaallada & Hagayaasha'}
        </h3>

        {filteredPosts.length === 0 ? (
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-[#C2A55D] mx-auto opacity-60" />
            <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">Ma jiro maqaal ku habboon raadintaada</h3>
            <p className="text-xs text-[#6B665E]">Fadlan tijaabi ereyo kale ama dooro qaybaha sare.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 bg-[#35322E] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Tus dhammaan maqaallada
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                onClick={() => setActiveArticle(post)}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E5E2DA] hover:border-[#C2A55D] transition-all hover:shadow-xl cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#24211E]">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20">
                      {post.categorySomali}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-[#8C867D]">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="font-serif-luxury text-lg text-[#1A1A1A] group-hover:text-[#C2A55D] transition-colors leading-snug font-normal">
                      {post.title}
                    </h4>

                    <p className="text-xs text-[#6B665E] font-light leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#F2EFE9] text-xs">
                  <span className="text-[#8C867D] font-medium">{post.author}</span>
                  <span className="font-bold text-[#C2A55D] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Faahfaahin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E5E2DA] my-8 flex flex-col max-h-[92vh]">
            
            {/* Header with Close button */}
            <div className="p-6 border-b border-[#E5E2DA] flex items-center justify-between bg-[#F9F8F6] sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#C2A55D] text-white text-xs font-bold">
                  {activeArticle.categorySomali}
                </span>
                <span className="text-xs text-[#8C867D]">{activeArticle.date}</span>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-full hover:bg-[#EAE6DE] text-[#35322E] transition-colors cursor-pointer"
                title="Xidh"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              <div>
                <h1 className="font-serif-luxury text-2xl sm:text-4xl text-[#1A1A1A] leading-tight font-normal">
                  {activeArticle.title}
                </h1>
                <p className="text-sm text-[#6B665E] font-medium mt-2">
                  {activeArticle.subtitle}
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-md">
                <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
              </div>

              {/* Author Strip */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F4F1EA] border border-[#E5E2DA]">
                <div className="w-10 h-10 rounded-full bg-[#35322E] text-white flex items-center justify-center font-bold text-sm">
                  {activeArticle.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1A1A]">{activeArticle.author}</div>
                  <div className="text-[11px] text-[#6B665E]">{activeArticle.authorRole}</div>
                </div>
              </div>

              {/* Article Content Paragraphs */}
              <div className="space-y-4 text-sm text-[#35322E] font-light leading-relaxed">
                {activeArticle.content.map((para, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key Takeaways Box */}
              {activeArticle.keyTakeaways && (
                <div className="p-6 rounded-2xl bg-[#F9F8F6] border border-[#C2A55D]/30 space-y-3">
                  <h4 className="text-xs font-bold text-[#C2A55D] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Qodobada Ugu Muhiimsan (Key Takeaways)
                  </h4>
                  <ul className="space-y-2">
                    {activeArticle.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="text-xs text-[#35322E] font-medium flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C2A55D] mt-1.5 flex-shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeArticle.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-[#F4F1EA] text-[#6B665E] text-xs font-medium border border-[#E5E2DA]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-[#E5E2DA] bg-[#F9F8F6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-[#6B665E]">
                Ma doonaysaa faahfaahin dheeraad ah oo ku saabsan mawduucan?
              </div>
              <button
                onClick={() => {
                  const title = activeArticle.title;
                  setActiveArticle(null);
                  onOpenContact(`Waxaan rabaa la-talin ku saabsan maqaalka: ${title}`);
                }}
                className="px-5 py-2.5 bg-[#35322E] hover:bg-[#1A1815] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                La Xiriir Xafiiska Kaabsan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
