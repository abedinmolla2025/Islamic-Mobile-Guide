export type Language = 'en' | 'ar' | 'ur' | 'bn' | 'tr' | 'hi';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

export interface IslamicName {
  name: string;
  arabic: string;
  meanings: {
    en: string;
    ar: string;
    ur: string;
    bn: string;
    tr: string;
    hi: string;
  };
}

export const boyNames: IslamicName[] = [
  { 
    name: "Muhammad", 
    arabic: "محمد",
    meanings: {
      en: "Praised one, The praiseworthy",
      ar: "المحمود، الممدوح",
      ur: "تعریف کیا گیا، قابل تعریف",
      bn: "প্রশংসিত, প্রশংসনীয়",
      tr: "Övülen, Övgüye değer",
      hi: "प्रशंसित, प्रशंसनीय"
    }
  },
  { 
    name: "Ahmad", 
    arabic: "أحمد",
    meanings: {
      en: "Most praiseworthy, Most commendable",
      ar: "الأكثر حمداً، الأكثر استحقاقاً للثناء",
      ur: "سب سے زیادہ قابل تعریف",
      bn: "সর্বাধিক প্রশংসনীয়",
      tr: "En çok övülen",
      hi: "सबसे अधिक प्रशंसनीय"
    }
  },
  { 
    name: "Ali", 
    arabic: "علي",
    meanings: {
      en: "Elevated, High, Champion",
      ar: "العالي، الرفيع، البطل",
      ur: "بلند، اعلیٰ، چیمپیئن",
      bn: "উন্নত, উচ্চ, চ্যাম্পিয়ন",
      tr: "Yüce, Yüksek, Şampiyon",
      hi: "उच्च, ऊँचा, चैंपियन"
    }
  },
  { 
    name: "Omar", 
    arabic: "عمر",
    meanings: {
      en: "Long-lived, Flourishing, Eloquent",
      ar: "طويل العمر، مزدهر، فصيح",
      ur: "لمبی عمر والا، ترقی پذیر",
      bn: "দীর্ঘজীবী, সমৃদ্ধ",
      tr: "Uzun ömürlü, Gelişen",
      hi: "दीर्घायु, समृद्ध"
    }
  },
  { 
    name: "Hassan", 
    arabic: "حسن",
    meanings: {
      en: "Good, Beautiful, Handsome",
      ar: "حسن، جميل، وسيم",
      ur: "اچھا، خوبصورت، حسین",
      bn: "ভালো, সুন্দর, সুদর্শন",
      tr: "İyi, Güzel, Yakışıklı",
      hi: "अच्छा, सुंदर, खूबसूरत"
    }
  },
  { 
    name: "Hussein", 
    arabic: "حسين",
    meanings: {
      en: "Good, Beautiful, Handsome one",
      ar: "الحسن، الجميل الصغير",
      ur: "چھوٹا حسن، خوبصورت",
      bn: "ছোট সুন্দর",
      tr: "Küçük güzel",
      hi: "छोटा सुंदर"
    }
  },
  { 
    name: "Ibrahim", 
    arabic: "إبراهيم",
    meanings: {
      en: "Father of many nations",
      ar: "أبو الأمم",
      ur: "بہت سی قوموں کا باپ",
      bn: "অনেক জাতির পিতা",
      tr: "Birçok milletin babası",
      hi: "कई राष्ट्रों के पिता"
    }
  },
  { 
    name: "Yusuf", 
    arabic: "يوسف",
    meanings: {
      en: "God increases in piety",
      ar: "الله يزيد في التقوى",
      ur: "خدا نیکی میں اضافہ کرے",
      bn: "আল্লাহ ধার্মিকতায় বৃদ্ধি করেন",
      tr: "Allah takvayı artırır",
      hi: "भगवान धर्मपरायणता बढ़ाए"
    }
  },
  { 
    name: "Adam", 
    arabic: "آدم",
    meanings: {
      en: "Made from earth's soil",
      ar: "مخلوق من تراب الأرض",
      ur: "زمین کی مٹی سے بنا",
      bn: "মাটি থেকে তৈরি",
      tr: "Topraktan yaratılmış",
      hi: "धरती की मिट्टी से बना"
    }
  },
  { 
    name: "Hamza", 
    arabic: "حمزة",
    meanings: {
      en: "Lion, Strong, Steadfast",
      ar: "الأسد، القوي، الثابت",
      ur: "شیر، مضبوط، ثابت قدم",
      bn: "সিংহ, শক্তিশালী, অবিচল",
      tr: "Aslan, Güçlü, Kararlı",
      hi: "शेर, मजबूत, दृढ़"
    }
  },
  { 
    name: "Zaid", 
    arabic: "زيد",
    meanings: {
      en: "Growth, Abundance",
      ar: "النمو، الوفرة",
      ur: "ترقی، فراوانی",
      bn: "বৃদ্ধি, প্রাচুর্য",
      tr: "Büyüme, Bolluk",
      hi: "वृद्धि, प्रचुरता"
    }
  },
  { 
    name: "Khalid", 
    arabic: "خالد",
    meanings: {
      en: "Eternal, Immortal",
      ar: "الخالد، الباقي",
      ur: "ابدی، لازوال",
      bn: "চিরন্তন, অমর",
      tr: "Ebedi, Ölümsüz",
      hi: "शाश्वत, अमर"
    }
  },
  { 
    name: "Bilal", 
    arabic: "بلال",
    meanings: {
      en: "Moisture, Water",
      ar: "الرطوبة، الماء",
      ur: "نمی، پانی",
      bn: "আর্দ্রতা, জল",
      tr: "Nem, Su",
      hi: "नमी, पानी"
    }
  },
  { 
    name: "Tariq", 
    arabic: "طارق",
    meanings: {
      en: "Morning star, He who knocks at the door",
      ar: "نجم الصباح، الطارق",
      ur: "صبح کا تارہ، دروازہ کھٹکھٹانے والا",
      bn: "প্রভাতী তারা, দরজায় কড়া নাড়ে যে",
      tr: "Sabah yıldızı, Kapıyı çalan",
      hi: "सुबह का तारा, दरवाज़ा खटखटाने वाला"
    }
  },
  { 
    name: "Amir", 
    arabic: "أمير",
    meanings: {
      en: "Prince, Commander",
      ar: "الأمير، القائد",
      ur: "شہزادہ، سردار",
      bn: "রাজকুমার, সেনাপতি",
      tr: "Prens, Komutan",
      hi: "राजकुमार, सेनापति"
    }
  },
  { 
    name: "Salman", 
    arabic: "سلمان",
    meanings: {
      en: "Safe, Peaceful",
      ar: "السالم، المسالم",
      ur: "محفوظ، پرامن",
      bn: "নিরাপদ, শান্তিপূর্ণ",
      tr: "Güvenli, Barışçıl",
      hi: "सुरक्षित, शांतिपूर्ण"
    }
  },
  { 
    name: "Imran", 
    arabic: "عمران",
    meanings: {
      en: "Prosperity, Long-lived",
      ar: "الازدهار، طويل العمر",
      ur: "خوشحالی، لمبی عمر",
      bn: "সমৃদ্ধি, দীর্ঘজীবী",
      tr: "Refah, Uzun ömürlü",
      hi: "समृद्धि, दीर्घायु"
    }
  },
  { 
    name: "Musa", 
    arabic: "موسى",
    meanings: {
      en: "Drawn from water",
      ar: "المنتشل من الماء",
      ur: "پانی سے نکالا گیا",
      bn: "জল থেকে তোলা",
      tr: "Sudan çıkarılmış",
      hi: "पानी से निकाला गया"
    }
  },
  { 
    name: "Isa", 
    arabic: "عيسى",
    meanings: {
      en: "God is salvation",
      ar: "الله هو الخلاص",
      ur: "خدا نجات ہے",
      bn: "আল্লাহই মুক্তি",
      tr: "Allah kurtuluştur",
      hi: "भगवान ही मुक्ति है"
    }
  },
  { 
    name: "Abdullah", 
    arabic: "عبدالله",
    meanings: {
      en: "Servant of Allah",
      ar: "عبد الله",
      ur: "اللہ کا بندہ",
      bn: "আল্লাহর বান্দা",
      tr: "Allah'ın kulu",
      hi: "अल्लाह का बंदा"
    }
  },
  { 
    name: "Abdulrahman", 
    arabic: "عبدالرحمن",
    meanings: {
      en: "Servant of the Most Merciful",
      ar: "عبد الرحمن",
      ur: "رحمان کا بندہ",
      bn: "পরম করুণাময়ের বান্দা",
      tr: "Rahman'ın kulu",
      hi: "रहमान का बंदा"
    }
  },
  { 
    name: "Rayyan", 
    arabic: "ريان",
    meanings: {
      en: "Gates of Heaven, Luxuriant",
      ar: "باب من أبواب الجنة",
      ur: "جنت کا دروازہ",
      bn: "জান্নাতের দরজা",
      tr: "Cennetin kapısı",
      hi: "जन्नत का दरवाज़ा"
    }
  },
  { 
    name: "Saad", 
    arabic: "سعد",
    meanings: {
      en: "Good fortune, Happiness",
      ar: "الحظ السعيد، السعادة",
      ur: "خوش قسمتی، خوشی",
      bn: "সৌভাগ্য, সুখ",
      tr: "İyi şans, Mutluluk",
      hi: "सौभाग्य, खुशी"
    }
  },
  { 
    name: "Faisal", 
    arabic: "فيصل",
    meanings: {
      en: "Decisive, Resolute",
      ar: "الفاصل، الحازم",
      ur: "فیصلہ کن، پختہ ارادہ",
      bn: "দৃঢ়, সংকল্পবদ্ধ",
      tr: "Kararlı, Kesin",
      hi: "निर्णायक, दृढ़"
    }
  },
  { 
    name: "Kareem", 
    arabic: "كريم",
    meanings: {
      en: "Generous, Noble",
      ar: "الكريم، النبيل",
      ur: "سخی، شریف",
      bn: "উদার, মহৎ",
      tr: "Cömert, Asil",
      hi: "उदार, नेक"
    }
  },
  { 
    name: "Malik", 
    arabic: "مالك",
    meanings: {
      en: "King, Master",
      ar: "الملك، السيد",
      ur: "بادشاہ، مالک",
      bn: "রাজা, মালিক",
      tr: "Kral, Efendi",
      hi: "राजा, मालिक"
    }
  },
  { 
    name: "Nabil", 
    arabic: "نبيل",
    meanings: {
      en: "Noble",
      ar: "النبيل",
      ur: "شریف، عالی نسب",
      bn: "মহৎ",
      tr: "Asil",
      hi: "नेक"
    }
  },
  { 
    name: "Rashid", 
    arabic: "رشيد",
    meanings: {
      en: "Rightly guided",
      ar: "الراشد، المهتدي",
      ur: "ہدایت یافتہ",
      bn: "সঠিক পথে পরিচালিত",
      tr: "Doğru yolda",
      hi: "सही मार्गदर्शित"
    }
  },
  { 
    name: "Saif", 
    arabic: "سيف",
    meanings: {
      en: "Sword",
      ar: "السيف",
      ur: "تلوار",
      bn: "তলোয়ার",
      tr: "Kılıç",
      hi: "तलवार"
    }
  },
  { 
    name: "Tahir", 
    arabic: "طاهر",
    meanings: {
      en: "Pure, Clean",
      ar: "الطاهر، النظيف",
      ur: "پاک، صاف",
      bn: "পবিত্র, পরিষ্কার",
      tr: "Temiz, Saf",
      hi: "पवित्र, साफ"
    }
  },
  { 
    name: "Yasser", 
    arabic: "ياسر",
    meanings: {
      en: "Wealthy, Prosperous",
      ar: "الميسور، المزدهر",
      ur: "خوشحال، آسودہ",
      bn: "ধনী, সমৃদ্ধ",
      tr: "Zengin, Müreffeh",
      hi: "धनी, समृद्ध"
    }
  },
];

export const girlNames: IslamicName[] = [
  { 
    name: "Fatima", 
    arabic: "فاطمة",
    meanings: {
      en: "One who abstains, Captivating",
      ar: "الفاطمة، الفاتنة",
      ur: "پرہیزگار، دلکش",
      bn: "সংযমী, মোহনীয়",
      tr: "Perhizkâr, Büyüleyici",
      hi: "संयमी, मोहक"
    }
  },
  { 
    name: "Aisha", 
    arabic: "عائشة",
    meanings: {
      en: "Alive, Living, Prosperous",
      ar: "الحية، المزدهرة",
      ur: "زندہ، خوشحال",
      bn: "জীবিত, সমৃদ্ধ",
      tr: "Yaşayan, Müreffeh",
      hi: "जीवित, समृद्ध"
    }
  },
  { 
    name: "Khadija", 
    arabic: "خديجة",
    meanings: {
      en: "Premature child, Trustworthy",
      ar: "الخديجة، الموثوقة",
      ur: "قابل اعتماد",
      bn: "বিশ্বস্ত",
      tr: "Güvenilir",
      hi: "विश्वसनीय"
    }
  },
  { 
    name: "Maryam", 
    arabic: "مريم",
    meanings: {
      en: "Beloved, Sea of sorrow",
      ar: "المحبوبة، بحر الحزن",
      ur: "محبوبہ، غم کا سمندر",
      bn: "প্রিয়, দুঃখের সাগর",
      tr: "Sevgili, Hüzün denizi",
      hi: "प्रिय, दुख का सागर"
    }
  },
  { 
    name: "Zainab", 
    arabic: "زينب",
    meanings: {
      en: "Fragrant flower, Father's gem",
      ar: "الزهرة العطرة، جوهرة الأب",
      ur: "خوشبودار پھول، باپ کا جوہر",
      bn: "সুগন্ধি ফুল, বাবার রত্ন",
      tr: "Kokulu çiçek, Babanın mücevheri",
      hi: "सुगंधित फूल, पिता का रत्न"
    }
  },
  { 
    name: "Noor", 
    arabic: "نور",
    meanings: {
      en: "Light, Divine light",
      ar: "النور، النور الإلهي",
      ur: "روشنی، الہٰی نور",
      bn: "আলো, ঐশ্বরিক আলো",
      tr: "Işık, İlahi nur",
      hi: "प्रकाश, दिव्य प्रकाश"
    }
  },
  { 
    name: "Aaliyah", 
    arabic: "عالية",
    meanings: {
      en: "Exalted, Highest",
      ar: "العالية، الأسمى",
      ur: "بلند، اعلیٰ",
      bn: "উচ্চ, সর্বোচ্চ",
      tr: "Yüce, En yüksek",
      hi: "उच्च, सर्वोच्च"
    }
  },
  { 
    name: "Iman", 
    arabic: "إيمان",
    meanings: {
      en: "Faith, Belief",
      ar: "الإيمان، العقيدة",
      ur: "ایمان، یقین",
      bn: "ঈমান, বিশ্বাস",
      tr: "İman, İnanç",
      hi: "ईमान, विश्वास"
    }
  },
  { 
    name: "Layla", 
    arabic: "ليلى",
    meanings: {
      en: "Night, Dark beauty",
      ar: "الليل، الجمال الداكن",
      ur: "رات، سیاہ خوبصورتی",
      bn: "রাত, কালো সৌন্দর্য",
      tr: "Gece, Karanlık güzellik",
      hi: "रात, गहरी सुंदरता"
    }
  },
  { 
    name: "Yasmin", 
    arabic: "ياسمين",
    meanings: {
      en: "Jasmine flower",
      ar: "زهرة الياسمين",
      ur: "چمیلی کا پھول",
      bn: "জুঁই ফুল",
      tr: "Yasemin çiçeği",
      hi: "चमेली का फूल"
    }
  },
  { 
    name: "Amira", 
    arabic: "أميرة",
    meanings: {
      en: "Princess, Leader",
      ar: "الأميرة، القائدة",
      ur: "شہزادی، قائد",
      bn: "রাজকন্যা, নেত্রী",
      tr: "Prenses, Lider",
      hi: "राजकुमारी, नेता"
    }
  },
  { 
    name: "Zahra", 
    arabic: "زهراء",
    meanings: {
      en: "Flower, Shining, Bright",
      ar: "الزهراء، المشرقة",
      ur: "پھول، چمکدار، روشن",
      bn: "ফুল, উজ্জ্বল",
      tr: "Çiçek, Parlak",
      hi: "फूल, चमकदार"
    }
  },
  { 
    name: "Huda", 
    arabic: "هدى",
    meanings: {
      en: "Right guidance",
      ar: "الهداية الصحيحة",
      ur: "صحیح ہدایت",
      bn: "সঠিক পথনির্দেশ",
      tr: "Doğru rehberlik",
      hi: "सही मार्गदर्शन"
    }
  },
  { 
    name: "Jana", 
    arabic: "جنة",
    meanings: {
      en: "Paradise, Heaven",
      ar: "الجنة، الفردوس",
      ur: "جنت، فردوس",
      bn: "জান্নাত, স্বর্গ",
      tr: "Cennet",
      hi: "जन्नत, स्वर्ग"
    }
  },
  { 
    name: "Rahma", 
    arabic: "رحمة",
    meanings: {
      en: "Mercy, Compassion",
      ar: "الرحمة، الشفقة",
      ur: "رحم، شفقت",
      bn: "রহমত, দয়া",
      tr: "Merhamet, Şefkat",
      hi: "दया, करुणा"
    }
  },
  { 
    name: "Amal", 
    arabic: "أمل",
    meanings: {
      en: "Hope, Aspiration",
      ar: "الأمل، الطموح",
      ur: "امید، آرزو",
      bn: "আশা, আকাঙ্ক্ষা",
      tr: "Umut, Arzu",
      hi: "आशा, आकांक्षा"
    }
  },
  { 
    name: "Farah", 
    arabic: "فرح",
    meanings: {
      en: "Joy, Happiness",
      ar: "الفرح، السعادة",
      ur: "خوشی، مسرت",
      bn: "আনন্দ, সুখ",
      tr: "Sevinç, Mutluluk",
      hi: "खुशी, आनंद"
    }
  },
  { 
    name: "Inaya", 
    arabic: "عناية",
    meanings: {
      en: "Care, Concern, Solicitude",
      ar: "العناية، الاهتمام",
      ur: "خیال، فکر، توجہ",
      bn: "যত্ন, উদ্বেগ",
      tr: "Özen, İlgi",
      hi: "देखभाल, चिंता"
    }
  },
  { 
    name: "Jamila", 
    arabic: "جميلة",
    meanings: {
      en: "Beautiful",
      ar: "الجميلة",
      ur: "خوبصورت",
      bn: "সুন্দরী",
      tr: "Güzel",
      hi: "सुंदर"
    }
  },
  { 
    name: "Aya", 
    arabic: "آية",
    meanings: {
      en: "Miracle, Sign of God",
      ar: "الآية، علامة من الله",
      ur: "معجزہ، خدا کی نشانی",
      bn: "অলৌকিক ঘটনা, আল্লাহর নিদর্শন",
      tr: "Mucize, Allah'ın işareti",
      hi: "चमत्कार, भगवान का संकेत"
    }
  },
  { 
    name: "Hiba", 
    arabic: "هبة",
    meanings: {
      en: "Gift, Present",
      ar: "الهبة، الهدية",
      ur: "تحفہ، ہدیہ",
      bn: "উপহার",
      tr: "Hediye, Armağan",
      hi: "उपहार, भेंट"
    }
  },
  { 
    name: "Rawan", 
    arabic: "روان",
    meanings: {
      en: "River in Paradise",
      ar: "نهر في الجنة",
      ur: "جنت کی نہر",
      bn: "জান্নাতের নদী",
      tr: "Cennetteki nehir",
      hi: "जन्नत की नदी"
    }
  },
  { 
    name: "Warda", 
    arabic: "وردة",
    meanings: {
      en: "Rose, Flower",
      ar: "الوردة، الزهرة",
      ur: "گلاب، پھول",
      bn: "গোলাপ, ফুল",
      tr: "Gül, Çiçek",
      hi: "गुलाब, फूल"
    }
  },
  { 
    name: "Sarah", 
    arabic: "سارة",
    meanings: {
      en: "Princess, Noble woman",
      ar: "الأميرة، المرأة النبيلة",
      ur: "شہزادی، شریف خاتون",
      bn: "রাজকন্যা, মহিলা",
      tr: "Prenses, Asil kadın",
      hi: "राजकुमारी, कुलीन महिला"
    }
  },
  { 
    name: "Salma", 
    arabic: "سلمى",
    meanings: {
      en: "Safe, Peaceful",
      ar: "السالمة، المسالمة",
      ur: "محفوظ، پرسکون",
      bn: "নিরাপদ, শান্তিপূর্ণ",
      tr: "Güvenli, Huzurlu",
      hi: "सुरक्षित, शांतिपूर्ण"
    }
  },
  { 
    name: "Malika", 
    arabic: "مليكة",
    meanings: {
      en: "Queen, Sovereign",
      ar: "الملكة، السيدة",
      ur: "ملکہ، حکمران",
      bn: "রানী, সার্বভৌম",
      tr: "Kraliçe, Hükümdar",
      hi: "रानी, सम्राज्ञी"
    }
  },
];

export function searchNames(query: string, gender?: 'boy' | 'girl' | 'all', language: Language = 'en'): IslamicName[] {
  const searchTerm = query.toLowerCase().trim();
  
  let namesToSearch: IslamicName[] = [];
  
  if (gender === 'boy') {
    namesToSearch = boyNames;
  } else if (gender === 'girl') {
    namesToSearch = girlNames;
  } else {
    namesToSearch = [...boyNames, ...girlNames];
  }
  
  if (!searchTerm) {
    return namesToSearch;
  }
  
  return namesToSearch.filter(n => 
    n.name.toLowerCase().includes(searchTerm) ||
    n.meanings[language].toLowerCase().includes(searchTerm) ||
    n.arabic.includes(searchTerm)
  );
}

export function getMeaning(name: IslamicName, language: Language): string {
  return name.meanings[language] || name.meanings.en;
}
