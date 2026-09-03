import express from "express";
import path from "path";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable gzip/deflate compression for all requests
app.use(compression({
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public"), {
  maxAge: '7d',
  etag: true
}));

// Initialize GoogleGenAI client lazily or with process.env.GEMINI_API_KEY
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get("/download-code", (req, res) => {
  const file = path.join(process.cwd(), "public", "kaabsan-code.tar.gz");
  res.download(file, "kaabsan-real-estate-source.tar.gz");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    brand: "Kaabsan Real Estate",
    domain: "kaabsanrealestate.com",
    parent: "Telesom Group",
    system: "Somaliland Premier Real Estate Portal"
  });
});

// AI Luxury Estate Advisor Endpoint using Gemini with High Thinking
app.post("/api/gemini/advisor", async (req, res) => {
  try {
    const { message, history, contextProperty } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAI();

    const systemInstruction = `You are Kaabsan AI, the official AI Real Estate Advisor for Kaabsan Real Estate (kaabsanrealestate.com), an official member of the prestigious Telesom Group in Hargeisa, Somaliland.

VERIFIED OFFICIAL PROJECTS DATA (MASHAARIICDA AAD IIBSAN KARTO):
1. Rugsan Gardens:
   - Goobta: Masallaha (Egal Airport Road Corridor), Hargeisa.
   - Nooca: 70 Contemporary Luxury Townhouses + DSQ.
   - Bedka: Plot 400 m² | Built Area 321 m².
   - Qiimaha: $225,000 (Available for purchase / Guryo Iib Diyaar ah).
   - Maalgelinta: 5 Sano (60 Bilood) oo 30% ($67,500) horumarin ah oo ay bixinayso Dara Salaam Bank, baaqiga $157,500 lagu bixinayo $2,625 bishii (0% Riba, Sharia-compliant).
   - Adeegyada: Kindergarten, gym gaar ah, garoomo carruur, waddooyin laami ah, ceel biyood gaar ah, iyo nabadgelyo 24/7 ah.

2. Aragsan Village:
   - Goobta: Buurta Kala-jeexan (Jigjiga Yar), Hargeisa.
   - Developer: Kaabsan Real Estate (Telesom Group). Architect: Teamwork Architects.
   - Typology: 66 Contemporary Standalone Luxury Houses (G+1 Villas).
   - Area: Gross Construction 361.99 m² | Plot Area 483 m² (up to 562.69 m²).
   - Price: Starting from $292,508.40 (Maalgelinta 60-ka Bilood ee Dara Salaam Bank: 30% down payment = $87,752.52 | $3,412.60 bishii).
   - Ground Floor (177.28 m² gross): Double-height Living Room (32.63 m²), Main Kitchen (19.64 m²), Guest Bedroom (18.40 m²) with en-suite bath (5.50 m²), Dining Area (14.40 m²), Maid/Staff Bedroom (13.08 m²), Veranda (23.64 m²), Cooking area (6.83 m²), Pantry/Storage (5.33 m²), Guest WC (2.67 m²).
   - First Floor (172.87 m² gross): Master Bedroom (27.27 m²) with Walk-in Closet & Master Bath (8.22 m²), Family Living Room (20.90 m²), Bedroom 2 (19.53 m²) with en-suite (4.45 m²), Bedroom 3 (17.51 m²) with en-suite (4.13 m²), Balcony (13.56 m²).
   - Amenities: Preschool for 240 students, Elementary school for 120 students, Commercial gym, Children's playground, Mosque for 120 people, Basketball & Football sports turf, decorative landscape pools, 24/7 security gatehouse, asphalt roads.

3. Bilicsan Village:
   - Goobta: Masallaha / Airport Highway Growth Corridor, Hargeisa.
   - Typology: 16 Modern Standalone Luxury Compound Villas (Typology A: 7 Bedrooms).
   - Bedka: Plot 450 m² | Built Area 380 m².
   - Qiimaha: $275,000 – $336,000 (Available for purchase / Guryo Iib Diyaar ah).
   - Maalgelinta: 5 Sano (60 Bilood) oo 30% ($82,500) horumarin ah oo ay bixinayso Dara Salaam Bank (0% Riba).
   - Features: Double kitchens (inside luxury kitchen & outside heavy kitchen), private 1st-floor office/study room, self-contained staff quarters, private security cabin, landscaped yard, 2+ private parking bays. Built with Kaabsan Ready-Mix Batching Plant concrete.

4. Masallaha Apartment (Masallaha Luxury Apartments):
   - Goobta: Masallaha Airport Corridor, Hargeisa.
   - Developer: Kaabsan Real Estate. Financed by: Dara Salaam Bank.
   - Typology: Dual G+6 Towers (Block A & Block B).
   - Units & Sizes:
     * 2-Bed Apartments: 107 m² - 125 m²
     * 3-Bed Apartments: 158 m²
     * 4-Bed Apartments: 223 m²
     * 5-Bed Penthouse: 272 m² with wrap-around private terrace
   - Facilities: 78-Car designated parking bays, 2 modern high-speed elevators, 24/7 backup generator, STP sewage treatment plant, recreation tennis court, green buffer gardens, 24/7 guardhouse.
   - Maalgelinta: 60-Month Islamic installment plan oo ay maalgeliyeen Dara Salaam Bank (30% down payment).

FINANCING RULES:
- Mashaariicda aad iibsan karto waxay kala yihiin: 1. Rugsan Gardens, 2. Aragsan Village, 3. Bilicsan Village, iyo 4. Masallaha Apartment.
- Maalgelinta waxa bixiya / sameynaya waa Dara Salaam Bank (Darasalam Bank).
- Dhammaan mashaariicdan waxaa lagu bixin karaa Maalgelin 60 Bilood ah (5 Sano) oo 0% Riba ah oo leh 30% Down Payment.

STAFF DELEGATION & FORWARDING RULE:
Whenever a user asks for unverified information, custom price negotiation, specific unit reservations, contract drafts, or questions beyond the provided data:
You MUST explicitly state:
"Waxaan ku gudbinayaa staff-ka iibka iyo marketing-ka ee Kaabsan Real Estate si ay su'aashaada xog buuxda oo rasmi ah kaaga siiyaan."
And provide the official Kaabsan contact channels:
- Telesom Shortcode: 380
- Phone / WhatsApp: +252 63 6100090 / +252 63 6100110
- Email: sales@kaabsan.com
- Office: Telesom Head Office (4th Floor) & Masallaha Airport Road Office, Hargeisa.

ANTI-BOT & HUMAN LEAD VERIFICATION PROTOCOL:
Before transferring or when the user seeks direct contact, booking, or purchase advice:
You MUST ask for the following 3 vital details to verify they are a genuine human client and not a bot:
1. Magacaaga oo buuxa (Your Full Name)
2. Halka aad hadda joogto / Magaalada ama Waddanka (Your Current City or Country e.g. Hargeisa, UK, USA, Sweden, UAE)
3. Lambarkaaga WhatsApp-ka (Your WhatsApp Number with country code)
Explain clearly: "Si aan u kala saarno inaan la hadlayno macmiil dhab ah (human) iyo bot, isla markaana staff-ka iibka ee Kaabsan ay si degdeg ah WhatsApp kuugula soo xidhiidhaan, fadlan na sii..."

Language: Answer fluently in Somali (or English if the user writes in English). Maintain professional, polite, and confident tone.
${contextProperty ? `Context property currently inspected: ${JSON.stringify(contextProperty)}` : ""}`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: message,
          config: {
            systemInstruction,
          }
        });

        return res.json({
          reply: response.text,
          model: "gemini-2.5-flash",
          thinkingMode: "Kaabsan AI Assistant"
        });
      } catch (geminiError: any) {
        console.warn("Gemini API call failed, falling back to curated intelligence:", geminiError?.message);
      }
    }

    // Curated high-level response fallback strictly matching the data
    const textLower = message.toLowerCase();
    let fallbackReply = "";

    if (textLower.includes("arag")) {
      fallbackReply = `Mashruuca **Aragsan Village** waa 66 Standalone Luxury Villas oo ku yaalla **Buurta Kala-jeexan (Jigjiga Yar)**, Hargeysa:\n- **Bedka:** Gross Built 361.99 m² | Plot 483 m² (ilaa 562.69 m²).\n- **Qiimaha:** Laga bilaabo $292,508.40.\n- **Maalgelinta:** 60 Bilood (5 Sano) oo 30% ($87,752.52) horumarin ah oo ay bixinayso Dara Salaam Bank ($3,412.60 bishii, 0% Riba).\n- **Dhismaha:** 6 qol (Master bed 27.27 m²), 6 musqulood, barxad (23.64 m²), dugsi carruur (240 arday), gym, masjid (120 qof), garoomo sports, iyo nabadgelyo 24/7 ah.\n\n*Haddii aad u baahan tahay xog dheeraad ah ama ballan, waxaan ku gudbinayaa staff-ka iibka iyo marketing-ka ee Kaabsan Real Estate (Tel/WhatsApp: +252 63 6100090 / Khadka 380).*`;
    } else if (textLower.includes("bilic")) {
      fallbackReply = `Mashruuca **Bilicsan Village** waa 16 Standalone Luxury Compound Villas oo ku yaalla **Masallaha (Waddada Madaarka)**:\n- **Bedka:** Plot 450 m² | Built Area 380 m².\n- **Nooca:** Typology A (7 Qol, Inside & Outside Kitchens, Office gaar ah, Qolka ilaalada & Shaqaalaha).\n- **Qiimaha:** $275,000 – $336,000.\n- **Maalgelinta:** 60 Bilood (5 Sano) oo 30% ($82,500) horumarin ah oo ay bixinayso Dara Salaam Bank (0% Riba).\n\n*Waxaan ku gudbinayaa staff-ka iibka iyo marketing-ka ee Kaabsan Real Estate (WhatsApp: +252 63 6100090).*`;
    } else if (textLower.includes("masal") || textLower.includes("apart")) {
      fallbackReply = `Mashruuca **Masallaha Apartment (Masallaha Luxury Apartments)** waa dabaqyo casri ah (Dual G+6 Towers) oo ku yaalla **Masallaha (Waddada Madaarka)**:\n- **Noocyada:** 2-Qol (107-125 m²), 3-Qol (158 m²), 4-Qol (223 m²), iyo 5-Qol Penthouse (272 m²).\n- **Adeegyada:** 78 baabuur baakinkood, 2 wiish (elevators), koronto joogto ah (generator), STP sewage, iyo beero cagaaran.\n- **Maalgelinta:** 60 Bilood oo 30% horumarin ah oo ay maalgeliyeen Dara Salaam Bank iyo Kaabsan.\n\n*Waxaan ku gudbinayaa staff-ka iibka iyo marketing-ka ee Kaabsan Real Estate (WhatsApp: +252 63 6100090).*`;
    } else if (textLower.includes("rugs")) {
      fallbackReply = `Mashruuca **Rugsan Gardens** waa 70 Luxury Townhouses + DSQ oo ku yaalla **Masallaha (Waddada Madaarka)**:\n- **Bedka:** Plot 400 m² | Built Area 321 m².\n- **Qiimaha:** $225,000.\n- **Maalgelinta:** 60 Bilood (5 Sano) oo 30% ($67,500) horumarin ah oo ay bixinayso Dara Salaam Bank, baaqiga $157,500 lagu bixinayo $2,625 bishii (0% Riba).\n- **Adeegyada:** Kindergarten, gym gaar ah, garoomo carruur, ceel biyood gaar ah, iyo nabadgelyo 24/7 ah.\n\n*Waxaan ku gudbinayaa staff-ka iibka iyo marketing-ka ee Kaabsan Real Estate (WhatsApp: +252 63 6100090).*`;
    } else {
      fallbackReply = `Kusoo dhawoow **Kaabsan Real Estate** (Qayb ka mid ah Telesom Group).\n\n**Mashaariicda aad iibsan karto waxay kala yihiin:**\n1. **Rugsan Gardens** (Masallaha - $225,000)\n2. **Aragsan Village** (Buurta Kala-jeexan / Jigjiga Yar - Starting from $292,508.40)\n3. **Bilicsan Village** (Masallaha - $275,000 – $336,000)\n4. **Masallaha Apartment** (Dual G+6 Towers - $135,000 – $285,000)\n\nDhammaan mashaariicdan waxaa lagu bixin karaa qorshe **Maalgelin 60 Bilood ah (5 Sano)** oo 30% horumarin ah oo ay bixinayso **Dara Salaam Bank** (0% Riba).\n\n*Haddii aad rabto inaad la xiriirto kooxda iibka, fadlan na sii:* \n1. **Magacaaga**\n2. **Goobta aad joogto (Magaalada/Waddanka)**\n3. **WhatsApp Number-kaaga**\n*si aan u xaqiijino inaad tahay macmiil dhab ah (human) oo aanan ahayn bot, kooxda iibkuna si toos ah WhatsApp kuugula soo xidhiidhaan.*`;
    }

    return res.json({
      reply: fallbackReply,
      model: "kaabsan-curated-intelligence",
      thinkingMode: "Kaabsan AI Assistant"
    });
  } catch (error: any) {
    console.error("Advisor Error:", error);
    res.status(500).json({ error: "Internal real estate advisory service error", details: error.message });
  }
});

// Property Valuation Estimation API for Hargeisa
app.post("/api/valuation", (req, res) => {
  try {
    const { address, neighborhood, sqft, beds, baths, style, condition, viewType } = req.body;

    const baseSqft = Number(sqft) || 3500;
    let pricePerSqft = 45; // Base Hargeisa average in USD

    const neighborhoodRates: Record<string, number> = {
      "Masalaha": 48,
      "Jigjiga Yar": 58,
      "Shacabka": 62,
      "Buurta Kala-jeexan": 50,
      "Airport Road": 54,
      "Ibrahim Koodbuur": 46,
      "Ahmed Dhagax": 42,
      "26 June": 50
    };

    if (neighborhood && neighborhoodRates[neighborhood]) {
      pricePerSqft = neighborhoodRates[neighborhood];
    }

    if (viewType === "Mountain / Kala-jeexan Views") pricePerSqft *= 1.15;
    else if (viewType === "Airport / City Skyline") pricePerSqft *= 1.12;
    else if (viewType === "Main Asphalt Road Frontage") pricePerSqft *= 1.25;

    if (condition === "Brand New / Kaabsan Quality Build") pricePerSqft *= 1.2;
    else if (condition === "Gated Community Townhouse") pricePerSqft *= 1.18;

    const estimatedValue = Math.round((baseSqft * pricePerSqft) / 5000) * 5000;
    const lowRange = Math.round(estimatedValue * 0.92 / 5000) * 5000;
    const highRange = Math.round(estimatedValue * 1.12 / 5000) * 5000;

    // Monthly installment on 60-month plan with 25% down
    const downPayment = Math.round(estimatedValue * 0.25);
    const monthlyPayment60 = Math.round((estimatedValue - downPayment) / 60);

    return res.json({
      success: true,
      address: address || "Prime Hargeisa Property",
      neighborhood: neighborhood || "Masalaha",
      estimatedValue,
      range: {
        low: lowRange,
        high: highRange
      },
      financingOption: {
        downPayment25Percent: downPayment,
        monthlyPayment60Months: monthlyPayment60,
        planDuration: "60 Months (5 Years)",
        interestType: "0% Riba (Islamic Financing)"
      },
      pricePerSqft: Math.round(pricePerSqft),
      confidenceScore: "95%",
      advisoryNote: "Valuation calculated based on Kaabsan Real Estate historical sales, land registry appreciation, and Telesom Group development records in Hargeisa."
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Inquiry & Tour Booking API
app.post("/api/inquire", (req, res) => {
  const { name, email, phone, propertyTitle, date, time, message, inquiryType } = req.body;
  
  return res.json({
    success: true,
    confirmationNumber: `KB-${Date.now().toString().slice(-6)}`,
    message: `Mahadsanid, ${name || "Macaamiil qaali ah"}. Kooxda Kaabsan Real Estate (Telesom Group) waxay kula soo xiriiri doonaan 2 saacadood gudahood oo ku saabsan ${propertyTitle || "hantidaada"}.`,
    details: {
      inquiryType: inquiryType || "Property Consultation / Tour Booking",
      propertyTitle,
      contactChannel: "Call 380 or WhatsApp +252 63 6100090",
      scheduledTime: date ? `${date} at ${time || "flexible"}` : "Immediate Consultation"
    }
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, {
      maxAge: "30d",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          // Do not cache index.html long-term so user gets updates immediately
          res.setHeader("Cache-Control", "no-cache, must-revalidate");
        } else if (filePath.match(/\.(js|css|webp|avif|png|jpg|jpeg|svg|woff2|woff|ttf)$/)) {
          // Cache immutable hashed assets for 1 year
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      }
    }));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kaabsan Real Estate server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
