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
  { 
    name: "Karim", 
    arabic: "كريم",
    meanings: {
      en: "Generous, Bountiful",
      ar: "الكريم، المعطاء",
      ur: "سخی، فیاض",
      bn: "উদার, দাতব্য",
      tr: "Cömert, Verimli",
      hi: "उदार, भरपूर"
    }
  },
  { 
    name: "Samir", 
    arabic: "سامر",
    meanings: {
      en: "Night entertainer",
      ar: "السامر، مرح الليل",
      ur: "رات کو تفریح دینے والا",
      bn: "রাতের বিনোদন",
      tr: "Gece eğlencesi",
      hi: "रात का मनोरंजन"
    }
  },
  { 
    name: "Nasir", 
    arabic: "ناصر",
    meanings: {
      en: "Helper, Supporter",
      ar: "الناصر، المساعد",
      ur: "مدد گار، معاون",
      bn: "সহায়ক, সমর্থক",
      tr: "Yardımcı, Destekçi",
      hi: "सहायक, समर्थक"
    }
  },
  { 
    name: "Anwar", 
    arabic: "أنور",
    meanings: {
      en: "Lights, Brighter",
      ar: "الأنوار، أكثر إشراقاً",
      ur: "روشنیاں، زیادہ روشن",
      bn: "আলো, উজ্জ্বলতর",
      tr: "Işıklar, Daha parlak",
      hi: "रोशनी, अधिक चमकदार"
    }
  },
  { 
    name: "Waleed", 
    arabic: "وليد",
    meanings: {
      en: "Newborn, Infant",
      ar: "الوليد، الطفل الصغير",
      ur: "نو جمہ، بچہ",
      bn: "নবজাত, শিশু",
      tr: "Yenidoğan, Bebek",
      hi: "नवजात, बच्चा"
    }
  },
  { 
    name: "Rayan", 
    arabic: "ريان",
    meanings: {
      en: "Full, Satiated",
      ar: "الريان، الشبعان",
      ur: "مکمل، سیر",
      bn: "পূর্ণ, তৃপ্ত",
      tr: "Dolu, Doygun",
      hi: "पूर्ण, तृप्त"
    }
  },
  { 
    name: "Hasan", 
    arabic: "حسان",
    meanings: {
      en: "Handsome, Beautiful",
      ar: "الحسان، الجميل",
      ur: "خوبصورت",
      bn: "সুন্দর",
      tr: "Güzel, Yakışıklı",
      hi: "सुंदर, खूबसूरत"
    }
  },
  { 
    name: "Saul", 
    arabic: "شاول",
    meanings: {
      en: "Asked for, Requested",
      ar: "المطلوب، المطالب به",
      ur: "مانگا گیا",
      bn: "চাওয়া হয়েছে",
      tr: "İstenen",
      hi: "मांगा गया"
    }
  },
  { 
    name: "Adnan", 
    arabic: "عدنان",
    meanings: {
      en: "Garden, Dweller",
      ar: "الحديقة، الساكن",
      ur: "باغ، رہائش",
      bn: "বাগান, বাসিন্দা",
      tr: "Bahçe, İkamet eden",
      hi: "बाग, निवासी"
    }
  },
  { name: "Abbas", arabic: "عباس", meanings: { en: "Stern, Gloomy", ar: "الجدي، العبوس", ur: "سخت، غمگین", bn: "কঠোর, অন্ধকার", tr: "Sert, Somber", hi: "कठोर, गंभीर" } },
  { name: "Abbad", arabic: "عباد", meanings: { en: "Worshipper", ar: "العابد", ur: "عبادت کار", bn: "উপাসক", tr: "Tapıcı", hi: "उपासक" } },
  { name: "Abdalla", arabic: "عبدالله", meanings: { en: "Servant of Allah", ar: "عبد الله", ur: "اللہ کا بندہ", bn: "আল্লাহর বান্দা", tr: "Allah'ın kulu", hi: "अल्लाह का बंदा" } },
  { name: "Abdalmalik", arabic: "عبدالملك", meanings: { en: "Servant of King", ar: "عبد الملك", ur: "بادشاہ کا بندہ", bn: "রাজার বান্দা", tr: "Kral'ın kulu", hi: "राजा का बंदा" } },
  { name: "Abdelkadir", arabic: "عبدالقادر", meanings: { en: "Servant of Mighty", ar: "عبد القادر", ur: "قادر کا بندہ", bn: "শক্তিমানের বান্দা", tr: "Güçlü'nün kulu", hi: "शक्तिशाली का बंदा" } },
  { name: "Abdi", arabic: "عبدي", meanings: { en: "My servant", ar: "عبدي", ur: "میرا بندہ", bn: "আমার বান্দা", tr: "Benim kulum", hi: "मेरा बंदा" } },
  { name: "Abdiel", arabic: "عبديائيل", meanings: { en: "Servant of God", ar: "عبد الله", ur: "خدا کا بندہ", bn: "ঈশ্বরের বান্দা", tr: "Tanrı'nın kulu", hi: "भगवान का बंदा" } },
  { name: "Abdosh", arabic: "عبدوش", meanings: { en: "Servant", ar: "العبد", ur: "بندہ", bn: "দাস", tr: "Kul", hi: "दास" } },
  { name: "Abdoulay", arabic: "عبدولاي", meanings: { en: "Servant of Almighty", ar: "عبد العلي", ur: "عظیم کا بندہ", bn: "সর্বশক্তিমানের বান্দা", tr: "Yüce'nin kulu", hi: "सर्वशक्तिमान का बंदा" } },
  { name: "Abdu", arabic: "عبدو", meanings: { en: "Servant of God", ar: "عبد", ur: "خدا کا بندہ", bn: "ঈশ্বরের বান্দা", tr: "Tanrı'nın kulu", hi: "भगवान का बंदा" } },
  { name: "Abdul", arabic: "عبدول", meanings: { en: "Servant of God", ar: "عبد", ur: "خدا کا بندہ", bn: "ঈশ্বরের বান্দা", tr: "Tanrı'nın kulu", hi: "भगवान का बंदा" } },
  { name: "Abdulal", arabic: "عبدالعال", meanings: { en: "Servant of High", ar: "عبد العالي", ur: "اعلیٰ کا بندہ", bn: "উচ্চের বান্দা", tr: "Yüce'nin kulu", hi: "ऊंचे का बंदा" } },
  { name: "Abdulaziz", arabic: "عبدالعزيز", meanings: { en: "Servant of Mighty", ar: "عبد العزيز", ur: "طاقتور کا بندہ", bn: "শক্তিশালীর বান্দা", tr: "Gücü'nün kulu", hi: "शक्तिशाली का बंदा" } },
  { name: "Abdulbaqi", arabic: "عبدالباقي", meanings: { en: "Servant of Eternal", ar: "عبد الباقي", ur: "ابدی کا بندہ", bn: "চিরন্তনের বান্দা", tr: "Kal'ıcı'nın kulu", hi: "शाश्वत का बंदा" } },
  { name: "Abdulbasit", arabic: "عبدالباسط", meanings: { en: "Servant of Expander", ar: "عبد الباسط", ur: "کشاد کار کا بندہ", bn: "প্রসারক ের বান্দা", tr: "Genişletici'nin kulu", hi: "विस्तारकर्ता का बंदा" } },
  { name: "Abdulfatah", arabic: "عبدالفتاح", meanings: { en: "Servant of Opener", ar: "عبد الفتاح", ur: "کھولنے والے کا بندہ", bn: "উদ্বোধনকারীর বান্দা", tr: "Açan'ın kulu", hi: "खोलने वाले का बंदा" } },
  { name: "Abdulghani", arabic: "عبدالغني", meanings: { en: "Servant of Rich", ar: "عبد الغني", ur: "امیر کا بندہ", bn: "ধনীর বান্দা", tr: "Zengin'in kulu", hi: "अमीर का बंदा" } },
  { name: "Abdulhamid", arabic: "عبدالحميد", meanings: { en: "Servant of Praiser", ar: "عبد الحميد", ur: "حمد کرنے والے کا بندہ", bn: "প্রশংসাকারীর বান্দা", tr: "Övücü'nün kulu", hi: "प्रशंसक का बंदा" } },
  { name: "Abdulhanan", arabic: "عبدالحنان", meanings: { en: "Servant of Merciful", ar: "عبد الحنان", ur: "رحم کرنے والے کا بندہ", bn: "কৃপাশীলের বান্দা", tr: "Merhamet'in kulu", hi: "दयालु का बंदा" } },
  { name: "Abdulhaqq", arabic: "عبدالحق", meanings: { en: "Servant of Truth", ar: "عبد الحق", ur: "حق کا بندہ", bn: "সত্যের বান্দা", tr: "Gerçek'in kulu", hi: "सत्य का बंदा" } },
  { name: "Abdulhasan", arabic: "عبدالحسن", meanings: { en: "Servant of Good", ar: "عبد الحسن", ur: "اچھائی کا بندہ", bn: "সদ্গুণের বান্দা", tr: "İyi'nin kulu", hi: "अच्छाई का बंदा" } },
  { name: "Abdulhay", arabic: "عبدالحي", meanings: { en: "Servant of Living", ar: "عبد الحي", ur: "زندہ کا بندہ", bn: "জীবন্তের বান্দা", tr: "Hayat'ın kulu", hi: "जीवन का बंदा" } },
  { name: "Abdulillah", arabic: "عبدالإله", meanings: { en: "Servant of God", ar: "عبد الله", ur: "خدا کا بندہ", bn: "ঈশ্বরের বান্দা", tr: "Tanrı'nın kulu", hi: "भगवान का बंदा" } },
  { name: "Abduljabar", arabic: "عبدالجبار", meanings: { en: "Servant of Mighty", ar: "عبد الجبار", ur: "طاقتور کا بندہ", bn: "শক্তিশালীর বান্দা", tr: "Güçlü'nün kulu", hi: "शक्तिशाली का बंदा" } },
  { name: "Abduljalil", arabic: "عبدالجليل", meanings: { en: "Servant of Great", ar: "عبد الجليل", ur: "عظیم کا بندہ", bn: "মহানের বান্দা", tr: "Büyük'ün kulu", hi: "महान का बंदा" } },
  { name: "Abdulkahar", arabic: "عبدالقاهر", meanings: { en: "Servant of Subduer", ar: "عبد القاهر", ur: "مغلوب کن والے کا بندہ", bn: "জয়ী কারীর বান্দা", tr: "Yenilgiye uğratan'ın kulu", hi: "विजेता का बंदा" } },
  { name: "Abdulkarim", arabic: "عبدالكريم", meanings: { en: "Servant of Generous", ar: "عبد الكريم", ur: "سخی کا بندہ", bn: "উদারের বান্দা", tr: "Cömert'in kulu", hi: "उदार का बंदा" } },
  { name: "Abdulkhaleq", arabic: "عبدالخالق", meanings: { en: "Servant of Creator", ar: "عبد الخالق", ur: "خالق کا بندہ", bn: "সৃষ্টিকর্তার বান্দা", tr: "Yaratıcı'nın kulu", hi: "निर्माता का बंदा" } },
  { name: "Abdullahi", arabic: "عبدالله", meanings: { en: "Servant of Allah", ar: "عبد الله", ur: "اللہ کا بندہ", bn: "আল্লাহর বান্দা", tr: "Allah'ın kulu", hi: "अल्लाह का बंदा" } },
  { name: "Abdullatif", arabic: "عبدالعاطف", meanings: { en: "Servant of Subtle", ar: "عبد اللطيف", ur: "نرم مزاج کا بندہ", bn: "সূক্ষ্মের বান্দা", tr: "İnce'nin kulu", hi: "सूक्ष्म का बंदा" } },
  { name: "Abdulmajid", arabic: "عبدالمجيد", meanings: { en: "Servant of Glorious", ar: "عبد المجيد", ur: "شان والے کا بندہ", bn: "মহিমান্বিতের বান্দা", tr: "Şanlı'nın kulu", hi: "महिमान्वित का बंदा" } },
  { name: "Abdulmalik", arabic: "عبدالملك", meanings: { en: "Servant of King", ar: "عبد الملك", ur: "بادشاہ کا بندہ", bn: "রাজার বান্দা", tr: "Kral'ın kulu", hi: "राजा का बंदा" } },
  { name: "Abdulmanaf", arabic: "عبدالمنافع", meanings: { en: "Servant of Benefits", ar: "عبد المنافع", ur: "فوائد کا بندہ", bn: "উপকারের বান্দা", tr: "Faydalar'ın kulu", hi: "लाभों का बंदा" } },
  { name: "Abdulmomen", arabic: "عبدالمؤمن", meanings: { en: "Servant of Believer", ar: "عبد المؤمن", ur: "ایمان والے کا بندہ", bn: "বিশ্বাসীর বান্দা", tr: "Mümin'in kulu", hi: "विश्वासी का बंदा" } },
  { name: "Abdulmoneim", arabic: "عبدالمنعم", meanings: { en: "Servant of Benefactor", ar: "عبد المنعم", ur: "احسان کار کا بندہ", bn: "উপকারকারীর বান্দা", tr: "İyiliksever'in kulu", hi: "कृपालु का बंदा" } },
  { name: "Abdulmuttalib", arabic: "عبدالمطلب", meanings: { en: "Servant of Seeker", ar: "عبد المطلب", ur: "طالب کا بندہ", bn: "অন্বেষণকারীর বান্দা", tr: "Arayan'ın kulu", hi: "खोजी का बंदा" } },
  { name: "Abdulmuiz", arabic: "عبدالمعز", meanings: { en: "Servant of Mighty", ar: "عبد المعز", ur: "عزت والے کا بندہ", bn: "শক্তিশালীর বান্দা", tr: "Güçlü'nün kulu", hi: "शक्तिशाली का बंदा" } },
  { name: "Abdulqader", arabic: "عبدالقادر", meanings: { en: "Servant of Able", ar: "عبد القادر", ur: "قادر کا بندہ", bn: "সক্ষমের বান्দা", tr: "Muktedir'in kulu", hi: "सक्षम का बंदा" } },
  { name: "Abdulqahhar", arabic: "عبدالقهار", meanings: { en: "Servant of Subduer", ar: "عبد القهار", ur: "مغلوب کن والے کا بندہ", bn: "জয়ী কারীর বান्দা", tr: "Yenilgiye uğratan'ın kulu", hi: "विजेता का बंदा" } },
  { name: "Abdulqahari", arabic: "عبدالقاهري", meanings: { en: "Servant of Conqueror", ar: "عبد القاهري", ur: "فاتح کا بندہ", bn: "বিজয়ীর বান্দা", tr: "Fatihi'nin kulu", hi: "विजेता का बंदा" } },
  { name: "Abdulqawi", arabic: "عبدالقوي", meanings: { en: "Servant of Strong", ar: "عبد القوي", ur: "مضبوط کا بندہ", bn: "শক্তিশালীর বান्দা", tr: "Güçlü'nün kulu", hi: "मजबूत का बंदा" } },
  { name: "Abdulrahman", arabic: "عبدالرحمن", meanings: { en: "Servant of Merciful", ar: "عبد الرحمن", ur: "رحمان کا بندہ", bn: "পরম করুণাময়ের বান्দা", tr: "Rahman'ın kulu", hi: "रहमान का बंदा" } },
  { name: "Abdulrashid", arabic: "عبدالراشد", meanings: { en: "Servant of Guided", ar: "عبد الراشد", ur: "ہدایت یافتہ کا بندہ", bn: "পথপ্রদর্শকের বান्দা", tr: "Doğru yolda'nın kulu", hi: "मार्गदर्शक का बंदा" } },
  { name: "Abdulsalam", arabic: "عبدالسلام", meanings: { en: "Servant of Peace", ar: "عبد السلام", ur: "امن کا بندہ", bn: "শান্তির বান्দा", tr: "Barış'ın kulu", hi: "शांति का बंदा" } },
  { name: "Abdulsattar", arabic: "عبدالساتر", meanings: { en: "Servant of Concealer", ar: "عبد الساتر", ur: "پنہان کن والے کا بندہ", bn: "আড়ম্বনকারীর বান्দা", tr: "Gizleyen'in kulu", hi: "छिपाने वाले का बंदा" } },
  { name: "Abdulsaud", arabic: "عبدالسعود", meanings: { en: "Servant of Happy", ar: "عبد السعود", ur: "خوش قسمتی کا بندہ", bn: "সৌভাগ্যের বান्দা", tr: "Mutlu'nun kulu", hi: "खुशी का बंदा" } },
  { name: "Abdulshaafi", arabic: "عبدالشافع", meanings: { en: "Servant of Intercessor", ar: "عبد الشافع", ur: "سفارش کار کا بندہ", bn: "মধ্যস্থতাকারীর বান्দा", tr: "Ara bulucu'nun kulu", hi: "मध्यस्थ का बंदा" } },
  { name: "Abdulshafi", arabic: "عبدالشافي", meanings: { en: "Servant of Healer", ar: "عبد الشافي", ur: "شفا دیتے کا بندہ", bn: "সারক্যকারীর বান्দा", tr: "Şifacı'nın kulu", hi: "चिकित्सक का बंदा" } },
  { name: "Abdulstaar", arabic: "عبدالستار", meanings: { en: "Servant of Concealer", ar: "عبد الستار", ur: "پردہ کن والے کا بندہ", bn: "আবৃতকারীর بান्দা", tr: "Kapatan'ın kulu", hi: "ढकने वाले का बंदा" } },
  { name: "Abdulwahab", arabic: "عبدالوهاب", meanings: { en: "Servant of Giver", ar: "عبد الوهاب", ur: "دینے والے کا بندہ", bn: "দাতার বান्দা", tr: "Veren'in kulu", hi: "देने वाले का बंदा" } },
  { name: "Abdulwahed", arabic: "عبدالواحد", meanings: { en: "Servant of One", ar: "عبد الواحد", ur: "ایک کا بندہ", bn: "একের বান্দা", tr: "Tek'in kulu", hi: "एक का बंदा" } },
  { name: "Abdulwahid", arabic: "عبدالواحد", meanings: { en: "Servant of Unique", ar: "عبد الواحد", ur: "لاتطابقی کا بندہ", bn: "অনন্যের বান্দা", tr: "Benzersiz'in kulu", hi: "अद्वितीय का बंदा" } },
  { name: "Abdulwali", arabic: "عبدالولي", meanings: { en: "Servant of Guardian", ar: "عبد الولي", ur: "محافظ کا بندہ", bn: "রক্ষকের বান्দা", tr: "Vasi'nin kulu", hi: "संरक्षक का बंदा" } },
  { name: "Abdulwali", arabic: "عبدالوالي", meanings: { en: "Servant of Ruler", ar: "عبد الولي", ur: "حاکم کا بندہ", bn: "শাসকের বান्দা", tr: "Hükümdâr'ın kulu", hi: "शासक का बंदा" } },
  { name: "Abdulwarrith", arabic: "عبدالوارث", meanings: { en: "Servant of Inheritor", ar: "عبد الوارث", ur: "وارث کا بندہ", bn: "উত্তরাধিকারীর বান्দা", tr: "Varis'in kulu", hi: "उत्तराधिकारी का बंदा" } },
  { name: "Abdulwasi", arabic: "عبدالواسع", meanings: { en: "Servant of Wide", ar: "عبد الواسع", ur: "وسیع کا بندہ", bn: "বিস্তৃতের বান্দा", tr: "Geniş'in kulu", hi: "विस्तृत का बंदा" } },
  { name: "Abdulwassee", arabic: "عبدالواسع", meanings: { en: "Servant of Vast", ar: "عبد الواسع", ur: "وسیع کا بندہ", bn: "বিশাল সেবকের বান्দা", tr: "Genişk'ün kulu", hi: "विशाल का बंदा" } },
  { name: "Abdulwazir", arabic: "عبدالوزير", meanings: { en: "Servant of Minister", ar: "عبد الوزير", ur: "وزیر کا بندہ", bn: "মন্ত্রীর বান्দা", tr: "Bakan'ın kulu", hi: "मंत्री का बंदा" } },
  { name: "Abdulwazzan", arabic: "عبدالوزن", meanings: { en: "Servant of Weight", ar: "عبد الوزن", ur: "وزن کا بندہ", bn: "ওজনের বান्দা", tr: "Ağırlık'ın kulu", hi: "वजन का बंदा" } },
  { name: "Abdulwhab", arabic: "عبدالوهاب", meanings: { en: "Servant of Giver", ar: "عبد الوهاب", ur: "دینے والے کا بندہ", bn: "দাতার বান्দা", tr: "Veren'in kulu", hi: "देने वाले का बंदा" } },
  { name: "Abdulwilly", arabic: "عبدالويلي", meanings: { en: "Servant of Will", ar: "عبد الويل", ur: "مرضی کا بندہ", bn: "ইচ্ছার বান्দা", tr: "İrade'nin kulu", hi: "इच्छा का बंदा" } },
  { name: "Abdulwimmilah", arabic: "عبدالوميلة", meanings: { en: "Servant of Helper", ar: "عبد الوميلة", ur: "مدد گار کا بندہ", bn: "সহায়কের বান्দা", tr: "Yardımcı'nın kulu", hi: "सहायक का बंदा" } },
  { name: "Abdulwinney", arabic: "عبدالويني", meanings: { en: "Servant of Comfort", ar: "عبد الويني", ur: "آرام کا بندہ", bn: "স্বস্তির বান্দা", tr: "Rahatlık'ın kulu", hi: "आराम का बंदा" } },
  { name: "Abdulwyell", arabic: "عبدالويل", meanings: { en: "Servant of Well", ar: "عبد الويل", ur: "کنویں کا بندہ", bn: "কুপের বান्দা", tr: "Kuyu'nun kulu", hi: "कुआं का बंदा" } },
  { name: "Abdulyadeed", arabic: "عبدالياسر", meanings: { en: "Servant of Maker Easy", ar: "عبد اليسر", ur: "آسان کن والے کا بندہ", bn: "সহজকারীর বান्দা", tr: "Kolaylaştıran'ın kulu", hi: "सुगम करने वाले का बंदा" } },
  { name: "Abdulyelef", arabic: "عبدالظلام", meanings: { en: "Servant of Darkness", ar: "عبد الظلام", ur: "اندھیرے کا بندہ", bn: "অন্ধকারের বান्দা", tr: "Karanlık'ın kulu", hi: "अंधकार का बंदा" } },
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
  { 
    name: "Nadia", 
    arabic: "ناديا",
    meanings: {
      en: "Caller, Announcer",
      ar: "الناادية، المعلنة",
      ur: "ندا کن والی، اعلان کن والی",
      bn: "ডাককারী, ঘোষক",
      tr: "Çağıran, Duyurucu",
      hi: "पुकारने वाली, घोषणा करने वाली"
    }
  },
  { 
    name: "Sana", 
    arabic: "سناء",
    meanings: {
      en: "Radiance, Splendor",
      ar: "السناء، البهاء",
      ur: "روشنی، دولت",
      bn: "উজ্জ্বলতা, প্রভা",
      tr: "Parlak, Zafer",
      hi: "चमक, शोभा"
    }
  },
  { 
    name: "Dina", 
    arabic: "دينا",
    meanings: {
      en: "Religion, Faith",
      ar: "الدين، الإيمان",
      ur: "مذہب، ایمان",
      bn: "ধর্ম, বিশ্বাস",
      tr: "Din, İman",
      hi: "धर्म, विश्वास"
    }
  },
  { 
    name: "Leila", 
    arabic: "ليلة",
    meanings: {
      en: "Night, Dark",
      ar: "الليل، الليلة",
      ur: "رات، شب",
      bn: "রাত, অন্ধকার",
      tr: "Gece, Karanlık",
      hi: "रात, अंधकार"
    }
  },
  { 
    name: "Mina", 
    arabic: "منى",
    meanings: {
      en: "Desire, Wish, Hope",
      ar: "المنى، الأمنية",
      ur: "خواہش، آرزو، امید",
      bn: "ইচ্ছা, আশা",
      tr: "Arzu, İstek, Umut",
      hi: "इच्छा, आशा"
    }
  },
  { 
    name: "Rima", 
    arabic: "ريما",
    meanings: {
      en: "Antelope, Graceful",
      ar: "الريم، الظبي",
      ur: "ہرن، خوب صورت",
      bn: "হরিণ, সুন্দর",
      tr: "Ceylan, Zarif",
      hi: "मृग, सुंदर"
    }
  },
  { 
    name: "Nida", 
    arabic: "نداء",
    meanings: {
      en: "Call, Appeal",
      ar: "النداء، الطلب",
      ur: "ندا، اپیل",
      bn: "আহ্বান, আবেদন",
      tr: "Çağrı, İddia",
      hi: "आह्वान, अपील"
    }
  },
  { 
    name: "Sabah", 
    arabic: "صباح",
    meanings: {
      en: "Morning, Dawn",
      ar: "الصباح، الفجر",
      ur: "صبح، طلوع",
      bn: "সকাল, ভোর",
      tr: "Sabah, Şafak",
      hi: "सुबह, भोर"
    }
  },
  { 
    name: "Rabia", 
    arabic: "رابعة",
    meanings: {
      en: "Fourth, Garden",
      ar: "الرابعة، الحديقة",
      ur: "چوتھا، باغ",
      bn: "চতুর্থ, বাগান",
      tr: "Dördüncü, Bahçe",
      hi: "चौथा, बाग"
    }
  },
  { 
    name: "Hana", 
    arabic: "هناء",
    meanings: {
      en: "Happiness, Bliss",
      ar: "الهناء، السعادة",
      ur: "خوشی، برکت",
      bn: "সুখ, আনন্দ",
      tr: "Mutluluk, Bereket",
      hi: "खुशी, आनंद"
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
