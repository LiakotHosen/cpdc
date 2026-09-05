export interface TreatmentDetail {
  serviceId: string;
  // রোগটা কী, কেন ও কীভাবে হয়
  diseaseOverview_bn: string;
  diseaseOverview_en: string;
  causes_bn: string[];
  causes_en: string[];

  // ডক্টরের আধুনিক চিকিৎসা পদ্ধতি
  procedure_bn: string;
  procedure_en: string;
  procedureSteps_bn: string[];
  procedureSteps_en: string[];

  // প্রধান লক্ষণ ও জরুরি চিকিৎসার গুরুত্ব
  symptoms_bn: string[];
  symptoms_en: string[];
  urgencyReason_bn: string;
  urgencyReason_en: string;
}

export const TREATMENT_DETAILS_MAP: Record<string, TreatmentDetail> = {
  // s1: Doctor Consultation
  s1: {
    serviceId: 's1',
    diseaseOverview_bn: 'মুখ ও দাঁতের জটিল রোগসমূহ প্রাথমিক অবস্থায় প্রায়ই দৃশ্যমান ব্যথা বা উপসর্গ ছাড়াই নীরবে বিস্তার লাভ করে। সুপ্ত ডেন্টাল ক্যারিজ, মাড়ির অন্তর্নিহিত পকেট ইনফেকশন কিংবা মুখগহ্বরের প্রাথমিক পরিবর্তন সময়মতো শনাক্ত না হলে তা স্থায়ী ক্ষতি ও অসহ্য ব্যথায় রূপ নেয়।',
    diseaseOverview_en: 'Many severe oral and dental pathologies develop silently without initial pain. Sub-surface cavities, periodontal pockets, and soft tissue changes often progress unnoticed until irreversible nerve damage or tooth loss occurs.',
    causes_bn: [
      'অনিয়মিত ও অকার্যকর ব্রাশিং কৌশল',
      'খাদ্যের সূক্ষ্ম কণা জমে ব্যাকটেরিয়া প্লাক সৃষ্টি',
      'দীর্ঘদিন ধরে পেশাদার ডেন্টাল চেকআপ না করানো'
    ],
    causes_en: [
      'Irregular or improper brushing techniques',
      'Bacterial plaque accumulation from trapped food debris',
      'Lack of routine professional oral examinations'
    ],
    procedure_bn: 'ডা. আক্তার জাহান অনি সম্পূর্ণ জীবাণুমুক্ত পরিবেশে রোগীর ওরাল ক্যাভিটি, মাড়ির স্থিতি ও প্রতিটি দাঁত নিখুঁতভাবে পর্যবেক্ষণ করেন। প্রয়োজনে তাৎক্ষণিক ডিজিটাল আরভিজি এক্স-রে করে চোয়ালের হাড় ও শিকড়ের গভীর অবস্থা যাচাই করে সঠিক ও ব্যক্তিগত ট্রিটমেন্ট প্ল্যান প্রদান করেন।',
    procedure_en: 'Dr. Aktar Zahan Ony performs an exhaustive oral examination under sterile clinical conditions. High-resolution digital RVG imaging is utilized to evaluate root structures and bone support, delivering a customized, transparent clinical roadmap.',
    procedureSteps_bn: [
      '১০০% অটোক্লেভ জীবাণুমুক্ত প্রমিয়ার ডেন্টাল মিরর ও প্রব দ্বারা নিরীক্ষা',
      'প্রয়োজনে তাৎক্ষণিক লো-রেডিয়েশন আরভিজি ডিজিটাল এক্স-রে',
      'রোগীর সাথে সরাসরি স্ক্রিন শেয়ারিং ও সুস্পষ্ট চিকিৎসা পরিকল্পনা'
    ],
    procedureSteps_en: [
      'Direct visual examination using 100% autoclave sterile diagnostics',
      'Instant low-radiation RVG digital radiography as needed',
      'On-screen diagnostic sharing with clear step-by-step treatment guidance'
    ],
    symptoms_bn: [
      'মুখে বা মাড়িতে অস্বস্তি বা মৃদু শিরশিরানি',
      'খাবার চাবানোর সময় কামড়ে হালকা ব্যথা বা অসঙ্গতি',
      'দীর্ঘদিন ডেন্টাল চেকআপ না করানোর ফলে অনিশ্চয়তা'
    ],
    symptoms_en: [
      'Mild sensitivity or discomfort in teeth or gums',
      'Uneven bite sensation or difficulty chewing',
      'Uncertainty following prolonged absence of dental visits'
    ],
    urgencyReason_bn: 'প্রাথমিক চেকআপে সমস্যা ধরা পড়লে তা স্বল্প সময়ে ও সামান্য চিকিৎসায় নিরাময় সম্ভব। অবহেলা করলে পরবর্তীতে জটিল রুট ক্যানেল বা দাঁত তোলার মতো কঠিন পরিস্থিতির মুখোমুখি হতে হয়।',
    urgencyReason_en: 'Early diagnosis allows simple, conservative treatments. Delaying consultation frequently leads to painful nerve infection requiring invasive procedures or irreversible tooth loss.'
  },

  // s2: Dental X-ray (RVG)
  s2: {
    serviceId: 's2',
    diseaseOverview_bn: 'দাঁতের ওপরের এনামেল দৃশ্যমান হলেও দাঁতের শিকড়, মাড়ির হাড়ের স্তর এবং স্নায়ুর অভ্যন্তরীণ অবস্থা খালি চোখে দেখা অসম্ভব। শিকড়ের গোড়ায় লুকানো সিস্ট, পুঁজ, হাড়ের ক্ষয় কিংবা দুটি দাঁতের সংযোগস্থলের ক্যারিজ শনাক্ত করতে আধুনিক ডিজিটাল এক্স-রে অপরিহার্য।',
    diseaseOverview_en: 'While enamel is visible, internal root canals, periapical abscesses, alveolar bone density, and hidden interproximal decay remain completely invisible to the naked eye without digital radiovisiography.',
    causes_bn: [
      'দাঁতের ভেতরের সুপ্ত ব্যাকটেরিয়াল ইনফেকশন',
      'দুর্ঘটনাজনিত কারণে শিকড়ে অদৃশ্য ফাটল বা ফ্র্যাকচার',
      'মাড়ির হাড়ের অভ্যন্তরীণ ক্ষয় ও সিস্টের বিস্তার'
    ],
    causes_en: [
      'Deep latent bacterial invasion reaching root canals',
      'Micro-fractures along the root structure from trauma',
      'Internal bone resorption and asymptomatic periapical cysts'
    ],
    procedure_bn: 'অত্যাধুনিক ডিজিটাল রেডিওভিজিওগ্রাফি (RVG) সেন্সরের মাধ্যমে সাধারণ এক্স-রের তুলনায় ৮০% কম রেডিয়েশন ব্যবহার করে মাত্র ৩ সেকেন্ডে কম্পিউটারের পর্দায় স্পষ্ট ছবি আনা হয়। ডা. অনি নিখুঁত জুম ও কনট্রাস্ট বিশ্লেষণের মাধ্যমে শিকড়ের সঠিক অবস্থা নিশ্চিত করেন।',
    procedure_en: 'Utilizing state-of-the-art RVG digital sensors, high-resolution diagnostic images are rendered on-screen in just 3 seconds with 80% less radiation than conventional film. Dr. Ony analyzes micro-details with enhanced clarity.',
    procedureSteps_bn: [
      'আল্ট্রা-কম রেডিয়েশন সেন্সর মাড়ির সুনির্দিষ্ট স্থানে স্থাপন',
      '৩ সেকেন্ডের মধ্যে মনিটরে হাই-রেজোলিউশন ডিজিটাল ইমেজ তৈরি',
      'শিকড়ের দৈর্ঘ্য, ক্যানেল সংখ্যা ও হাড়ের স্তর সুনির্দিষ্টভাবে চিহ্নিতকরণ'
    ],
    procedureSteps_en: [
      'Placement of ultra-low radiation sensor at target tooth position',
      'Instant 3-second display of high-contrast digital radiography',
      'Precise measurement of canal length, root anatomy, and bone contour'
    ],
    symptoms_bn: [
      'রাতে শুইলে দাঁতে তীব্র টনটনে ব্যথা',
      'দাঁতে কামড় দিলে ভেতরের দিকে গভীর চাপ অনুভূত হওয়া',
      'মাড়িতে ফোড়া ওঠা বা দাঁতের আঘাতজনিত ইতিহাস'
    ],
    symptoms_en: [
      'Throbbing tooth pain, especially when lying down at night',
      'Deep pressure or pain on biting down',
      'Swelling near the root apex or past accidental trauma'
    ],
    urgencyReason_bn: 'এক্স-রে ছাড়া অন্ধভাবে চিকিৎসা করলে ভুল ডায়াগনোসিসের ঝুঁকি থাকে। সঠিক এক্স-রে রোগীকে অপ্রয়োজনীয় ওষুধ ও ভুল চিকিৎসা থেকে শতভাগ সুরক্ষা দেয়।',
    urgencyReason_en: 'Treating without digital radiography risks misdiagnosis. Precision imaging prevents inappropriate medication and guarantees accurate, targeted clinical success.'
  },

  // s3: Scaling & Polishing
  s3: {
    serviceId: 's3',
    diseaseOverview_bn: 'মুখে খাবারের কণা ও লালার খনিজ উপাদানের সমন্বয়ে দাঁত ও মাড়ির সংযোগস্থলে শক্ত ক্যালকুলাস বা পাথর (Tartar) জমা হয়। সাধারণ টুথব্রাশ দিয়ে এই শক্ত পাথর কখনো দূর করা যায় না। জমাকৃত ব্যাকটেরিয়া মাড়িতে প্রদাহ (Gingivitis) সৃষ্টি করে হাড়ের সংযোগ আলগা করে দেয়।',
    diseaseOverview_en: 'Plaque and minerals in saliva harden into calcified tartar (calculus) along the gumline. Calculus cannot be removed by regular brushing. Its bacterial biofilm triggers chronic gingivitis, destroying bone attachment.',
    causes_bn: [
      'দাঁত ও মাড়ির খাঁজে খাদ্যকণা জমে ব্যাকটেরিয়ার কলোনি তৈরি',
      'চা, কফি, পান-সুপারি বা ধূমপানের গাঢ় রঞ্জক দাগ',
      'দীর্ঘদিন স্কেলিং না করানোয় পাথরের স্তর ক্রমশ মাড়ির নিচে চলে যাওয়া'
    ],
    causes_en: [
      'Bacterial colonies thriving on undisturbed food debris',
      'Heavy extrinsic staining from tea, coffee, betel leaf, or tobacco',
      'Subgingival tartar accumulation pushing gums away from teeth'
    ],
    procedure_bn: 'আন্তর্জাতিক মানের আল্ট্রাসনিক স্কেলারে উচ্চগতির নিরাপদ ভাইব্রেশন ও পানির মৃদু স্প্রে দিয়ে দাঁতের এনামেলের কোনো ক্ষতি না করে শক্ত পাথর ও দাগ অপসারণ করা হয়। এরপর বিশেষ প্রফেশনাল পেস্ট দিয়ে পলিশ করে দাঁতের প্রাকৃতিক মসৃণতা ফিরিয়ে দেওয়া হয়।',
    procedure_en: 'Advanced ultrasonic scalers emit controlled micro-vibrations with fine water spray to dislodge hardened calculus without touching natural enamel. A gentle prophylactic paste polish follows, restoring smooth enamel defense.',
    procedureSteps_bn: [
      'আল্ট্রাসনিক টিপ দিয়ে সম্পূর্ণ ব্যথাহীনভাবে পাথর ও টার্টার বিচ্ছিন্নকরণ',
      'মাড়ির ভেতরের গভীর পকেট জীবাণুমুক্তকরণ ও ওয়াশ',
      'এনামেল পলিশিং পেস্টের সাহায্যে মসৃণ ও উজ্জ্বল ফিনিশিং'
    ],
    procedureSteps_en: [
      'Atraumatic ultrasonic calculus detachment along all tooth surfaces',
      'Subgingival pocket debridement and antiseptic flush',
      'Prophy-paste polishing for stain-resistant, smooth tooth surface'
    ],
    symptoms_bn: [
      'ব্রাশ করার সময় বা শক্ত খাবার খাওয়ার সময় মাড়ি থেকে রক্ত পড়া',
      'মুখে দীর্ঘস্থায়ী তীব্র দুর্গন্ধ ও বিস্বাদ অনুভূত হওয়া',
      'দাঁতের গোড়ায় হলদে বা কালচে শক্ত স্তর জমে থাকা'
    ],
    symptoms_en: [
      'Bleeding gums during brushing or eating hard food',
      'Persistent halitosis (bad breath) and unpleasant taste',
      'Visible yellowish-brown or black calcified build-up along gum margins'
    ],
    urgencyReason_bn: 'দেরি করলে মাড়ির প্রদাহ পেরিওডন্টাইটিসে রূপ নিয়ে দাঁতের চারপাশের চোয়ালের হাড় গলিয়ে ফেলে, যার ফলে পুরোপুরি সুস্থ দাঁতও ধীরে ধীরে নড়ে গিয়ে পড়ে যায়।',
    urgencyReason_en: 'Ignoring bleeding gums leads to irreversible periodontitis and bone loss, eventually causing healthy teeth to loosen and fall out permanently.'
  },

  // s4: Tooth Whitening
  s4: {
    serviceId: 's4',
    diseaseOverview_bn: 'খাদ্যাভ্যাস, অতিরিক্ত চা-কফি পান, ধূমপান, পান-জর্দা সেবন এবং বয়োবৃদ্ধির কারণে দাঁতের এনামেল ও ডেন্টিনের মাইক্রোস্কোপিক স্তরে গাঢ় দাগ শোষিত হয়ে যায়। সাধারণ টুথপেস্টে এই গভীর দাগ কখনোই দূর হয় না এবং দাঁতের শুভ্রতা হারিয়ে মুখ মলিন দেখায়।',
    diseaseOverview_en: 'Extrinsic pigments from dietary habits, coffee, tea, smoking, and age penetrate deep microscopic pores of enamel and dentin. Normal whitening toothpastes cannot break these internal intrinsic stains.',
    causes_bn: [
      'চা, কফি, কোলা ও গাঢ় মশলাযুক্ত খাদ্যের ক্রমাগত ব্যবহার',
      'ধূমপান ও পান-সুপারির নিকোটিন ও ট্যানিনের গভীর দাগ',
      'এনামেল পাতলা হয়ে ভেতরের হলুদ ডেন্টিন দৃশ্যমান হওয়া'
    ],
    causes_en: [
      'Continuous consumption of tea, coffee, dark colas, and spices',
      'Deep nicotine and tannin absorption from smoking or betel quid',
      'Natural enamel thinning exposing underlying yellowish dentin'
    ],
    procedure_bn: 'প্রথমে মাড়িকে বিশেষ মেডিকেল ডেন্টাল ড্যাম বা প্রটেক্টিভ ব্যারিয়ার দিয়ে সম্পূর্ণ সুরক্ষিত করা হয়। এরপর দাঁতের উপরিভাগে ক্লিনিক্যাল কার্বামাইড/হাইড্রোজেন পারঅক্সাইড জেল মেখে ব্লু-লাইট অ্যাক্টিভেশন দিয়ে মাত্র ৪৫ মিনিটে দাঁতকে নিরাপদভাবে কয়েক শেড উজ্জ্বল করা হয়।',
    procedure_en: 'The gums are completely shielded with a light-cured gingival barrier. Professional whitening formulation is applied to enamel surfaces and activated with specialized cold light, safely lifting stains 2-4 shades brighter in 45 minutes.',
    procedureSteps_bn: [
      'মাড়ির সুরক্ষায় লাইট-কিউরড জিঞ্জিভাল ড্যাম স্থাপন',
      'মেডিকেল গ্রেড নিরাপদ ব্লিচিং জেল সমভাবে প্রয়োগ',
      'কোল্ড ব্লু-লাইট দিয়ে গভীর দাগ দূরীকরণ ও ডি-সেনসিটাইজিং জেল প্রয়োগ'
    ],
    procedureSteps_en: [
      'Application of protective light-curing gingival barrier on gums',
      'Even application of clinical-grade whitening gel on enamel',
      'Cold-light activation to lift deep pigmentation followed by desensitizing care'
    ],
    symptoms_bn: [
      'দাঁতে তীব্র হলদেটে বা বাদামি দাগ ও বিবর্ণতা',
      'হাসতে গেলে মানসিক সংকোচ ও আত্মবিশ্বাসের ঘাটতি',
      'বিয়ে বা বিশেষ অনুষ্ঠানের পূর্বে উজ্জ্বল হাসির প্রত্যাশা'
    ],
    symptoms_en: [
      'Noticeable yellowing, brown patches, or dull enamel tone',
      'Reluctance to smile openly due to self-consciousness',
      'Desire for a refreshed, radiant smile before major life events'
    ],
    urgencyReason_bn: 'বাজারের ক্ষতিকর কেমিক্যাল বা শক্ত পাউডার ব্যবহারে এনামেল স্থায়ীভাবে ক্ষয় হয়ে দাঁত অতিমাত্রায় শিরশির করে। অভিজ্ঞ ডেন্টাল সার্জনের তত্ত্বাবধানে ব্লিচিং এনামেলের সুরক্ষা অক্ষত রাখে।',
    urgencyReason_en: 'Abrasive DIY powders permanently destroy enamel and trigger intense sensitivity. In-clinic professional bleaching preserves enamel while achieving dramatic, safe aesthetic results.'
  },

  // s5: Smile Designing
  s5: {
    serviceId: 's5',
    diseaseOverview_bn: 'অসমান দাঁত, অসম এনামেল প্রান্ত, দাঁতের মাঝে অনাকাঙ্ক্ষিত ফাঁকা, মাড়ির অতিরিক্ত বিস্তার (Gummy Smile) কিংবা দাঁতের অসঙ্গতিপূর্ণ আকার সামগ্রিক মুখের সৌন্দর্য ও হাসির আকর্ষণে বড় ধরনের অমিল তৈরি করে।',
    diseaseOverview_en: 'Irregular tooth proportions, chipped enamel edges, gaps, excessive gum display, or discoloration disrupt facial harmony and diminish natural aesthetic symmetry.',
    causes_bn: [
      'দাঁতের জিনগত অনিয়মিত গঠন ও অসম উচ্চতা',
      'সামনের দাঁতে মাইক্রো-ফ্র্যাকচার বা পুরনো বিবর্ণ ফিলিং',
      'হাসির সময় ঠোঁট ও মাড়ির অনুপাতে অসামঞ্জস্য'
    ],
    causes_en: [
      'Genetic anatomical variations in tooth size and contour',
      'Micro-fractures on incisal edges or discolored old restorations',
      'Disproportionate gum-to-lip display when smiling'
    ],
    procedure_bn: 'ডা. অনি রোগীর মুখের গঠন, ত্বকের শেড এবং হাসির বক্ররেখা বিশ্লেষণ করে ডিজিটাল প্ল্যান প্রস্তুত করেন। এরপর কসমেটিক কম্পোজিট বন্ডিং, এনামেল কনট্যুরিং অথবা প্রিমিয়াম সিরামিক ভিনিয়ারের সমন্বয়ে তৈরি করা হয় প্রাকৃতিক ও নিখুঁত রাজকীয় হাসি।',
    procedure_en: 'Dr. Ony evaluates facial symmetry, smile arch, and enamel shades to design a customized aesthetic makeover. A harmonious blend of composite veneers, aesthetic contouring, and ultra-thin ceramics is delivered.',
    procedureSteps_bn: [
      'স্মাইল অ্যানালাইসিস ও রোগীর প্রত্যাশা অনুযায়ী পরিকল্পনা প্রণয়ন',
      'দাঁতের প্রাকৃতিক টিস্যু যথাসম্ভব অক্ষত রেখে মিনিমালি ইনভেসিভ প্রিপারেশন',
      'হাই-গ্লস কসমেটিক লেয়ারিং ও মিরর ফিনিশিং'
    ],
    procedureSteps_en: [
      'Digital aesthetic smile evaluation and diagnostic mock-up',
      'Minimally invasive preparation preserving natural tooth enamel',
      'High-gloss multi-shade cosmetic layering and mirror polishing'
    ],
    symptoms_bn: [
      'হাসির সময় সামনের অসমান দাঁত নিয়ে হীনমন্যতা',
      'সামনের দাঁত ভাঙা, ক্ষয়প্রাপ্ত বা বিভিন্ন রঙের হওয়া',
      'ক্যামেরায় বা সামনা-সামনি প্রাণখুলে হাসতে না পারা'
    ],
    symptoms_en: [
      'Embarrassment regarding uneven, disproportioned front teeth',
      'Chipped, worn-down, or multi-colored anterior teeth',
      'Reluctance to smile naturally in social and professional settings'
    ],
    urgencyReason_bn: 'সুন্দর হাসি শুধু বাহ্যিক সৌন্দর্য নয়, ব্যক্তিত্ব ও কর্মজীবনে আত্মবিশ্বাসের নতুন দিগন্ত উন্মোচন করে। সঠিক সময়ে আধুনিক স্মাইল ডিজাইনে প্রাকৃতিক দাঁতের দীর্ঘস্থায়ী সুরক্ষা মেলে।',
    urgencyReason_en: 'A captivating smile boosts career and social confidence while protecting worn tooth edges from further structural breakdown.'
  },

  // s6: Front Teeth Gap Closure (Diastema)
  s6: {
    serviceId: 's6',
    diseaseOverview_bn: 'সামনের দুটি বা ততোধিক দাঁতের মাঝে অপ্রাকৃতিক ফাঁকা অংশকে ডায়াস্টেমা বলা হয়। এর ফলে শুধু হাসির সৌন্দর্যই নষ্ট হয় না, বরং কথা বলার সময় বাতাস বেরিয়ে উচ্চারণ অস্পষ্ট হতে পারে এবং ফাঁকা জায়গায় খাবার আটকে মাড়ির প্রদাহ হতে পারে।',
    diseaseOverview_en: 'Anterior diastema (spacing between front teeth) impacts aesthetic appearance, alters speech phonetics, and allows food impaction that irritates interdental gingiva.',
    causes_bn: [
      'দাঁত ও চোয়ালের আকারের অসামঞ্জস্য (বড় চোয়ালে ছোট দাঁত)',
      'মাড়ির সংযোগকারী ফ্রেনামের অতিরিক্ত পুরুত্ব (Labial Frenum)',
      'দাঁতের কোনো একটি অনুপস্থিত থাকা বা দেরিতে ওঠা'
    ],
    causes_en: [
      'Disproportion between jaw size and tooth dimensions',
      'Hyperactive or thick maxillary labial frenum attachment',
      'Missing or microdontic lateral teeth allowing drift'
    ],
    procedure_bn: 'দাঁতের কোনো অংশ না কেটে বা না ঘষে প্রাকৃতিক এনামেল অক্ষত রাখা হয়। বিশেষ এনামেল কন্ডিশনিংয়ের পর প্রিমিয়াম ন্যানো-কম্পোজিট রেজিন দিয়ে শৈল্পিক হাতে ফাঁকা পূরণ করে আল্ট্রা-ভায়োলেট কিউরিং ও নিখুঁত পলিশিংয়ের মাধ্যমে মাত্র এক সিটিংয়ে স্বাভাবিক দাঁতের রূপ দেওয়া হয়।',
    procedure_en: 'Zero natural tooth structure is removed. After gentle enamel conditioning, multi-layer nano-hybrid composite resin is sculpted directly to close the diastema in a single visit, cured with UV light and seamlessly polished.',
    procedureSteps_bn: [
      'দাঁতের শেড নিখুঁতভাবে ম্যাচিং ও এনামেল প্রস্তুতি',
      'ন্যানো-কম্পোজিট লেয়ারিং দিয়ে দাঁতের স্বাভাবিক শারীরবৃত্তীয় রূপদান',
      'ফাইন পলিশিং ডিস্ক দিয়ে স্পর্শহীন মসৃণ ফিনিশিং'
    ],
    procedureSteps_en: [
      'Accurate multi-shade color matching against adjacent enamel',
      'Direct nano-composite layering forming natural tooth contours',
      'Multi-stage finishing with fine diamond strips and polishing wheels'
    ],
    symptoms_bn: [
      'সামনের দাঁতের মাঝে স্পষ্ট ফাঁকা দৃশ্যমান হওয়া',
      'কথা বলার সময় শিস লাগা বা থুতু ছিটিয়ে যাওয়ার অস্বস্তি',
      'ফাঁকা স্থানে খাবার আটকে থাকা ও মাড়িতে অস্বস্তি'
    ],
    symptoms_en: [
      'Conspicuous gap between upper or lower front teeth',
      'Lisping sounds or saliva escape during pronunciation',
      'Food packing between teeth causing localized gum tenderness'
    ],
    urgencyReason_bn: 'কোনো ড্রিলিং বা কৃত্রিম ক্যাপ ছাড়াই মাত্র ১ ঘণ্টার চিকিৎসায় এই ফাঁকা স্থায়ীভাবে বন্ধ করা যায়, যা প্রাকৃতিক দাঁতকে আজীবন সুস্থ ও সুন্দর রাখে।',
    urgencyReason_en: 'Requiring no tooth reduction or crowns, this 1-hour non-invasive treatment restores flawless smile aesthetics and protects natural dental tissue.'
  },

  // s7: Tooth-Colored Filling (Composite)
  s7: {
    serviceId: 's7',
    diseaseOverview_bn: 'দাঁতের শক্ত এনামেলে খাদ্যের শর্করা ও ব্যাকটেরিয়ার অম্লীয় বিক্রিয়ায় কালো ক্যাভিটি বা ক্ষতের সৃষ্টি হয়। প্রাথমিক অবস্থায় ক্ষতের কোনো তীব্র ব্যথা থাকে না বলে রোগীরা টের পান না, কিন্তু ক্যাভিটি ক্রমশ ডেন্টিন পেরিয়ে স্নায়ুর দিকে এগোতে থাকে।',
    diseaseOverview_en: 'Bacterial acids demineralize hard enamel, opening a dark cavity. Early decay is painless, silently penetrating the sensitive dentin and moving directly toward the dental pulp nerve chamber.',
    causes_bn: [
      'দাঁতের খাঁজে মিষ্টি ও চটচটে খাদ্যকণা দীর্ঘক্ষণ লেগে থাকা',
      'স্ট্রেপ্টোকক্কাস মিউটানস ব্যাকটেরিয়ার অ্যাসিড নিঃসরণ',
      'নিয়মিত ফ্লসিং ও গভীর পরিষ্কারের অভাব'
    ],
    causes_en: [
      'Sticky fermentable carbohydrates adhering to molar pits',
      'Acid production by Streptococcus mutans bacteria',
      'Lack of interdental flossing allowing invisible proximal decay'
    ],
    procedure_bn: 'ডা. অনি অত্যন্ত সতর্কতার সাথে শুধুমাত্র পচা ও সংক্রামিত অংশটি পরিষ্কার করেন যাতে সুস্থ দাঁতের ক্ষতি না হয়। এরপর আধুনিক ডেন্টাল বন্ডিং এজেন্ট ও দাঁতের হুবহু শেডের লাইট-কিউরড কম্পোজিট রেজিন স্তরে স্তরে বসিয়ে ব্লু-লাইটে শক্তিশালী ও মজবুত করা হয়।',
    procedure_en: 'Dr. Ony removes only the infected decayed debris using micro-burs, preserving every fraction of sound tooth structure. A bonding agent is applied, followed by tooth-matched light-cure composite sculpted in increments for lifelong strength.',
    procedureSteps_bn: [
      'মাইক্রো-প্রিসিশনে ক্যাভিটি সংক্রমণ সম্পূর্ণ অপসারণ',
      'এনামেল এচিং ও বায়োকম্প্যাটিবল বন্ডিং লেয়ার স্থাপন',
      'দাঁতের খাঁজ মিলিয়ে কম্পোজিট ফিলিং ও ইউভি লাইট কিউরিং'
    ],
    procedureSteps_en: [
      'Micro-precision debridement of infected decay',
      'Enamel acid-etching and high-tensile bonding agent application',
      'Incremental composite placement, anatomical shaping, and UV light cure'
    ],
    symptoms_bn: [
      'মিষ্টি বা ঠাণ্ডা পানি খেলে দাঁতে ঝিনঝিন বা শিরশিরানি',
      'দাঁতের উপরিভাগে কালো বা বাদামি দাগ ও গর্ত অনুভব',
      'খাবার খাওয়ার সময় দাঁতের খাঁজে খাদ্যকণা আটকে থাকা'
    ],
    symptoms_en: [
      'Transient sharp sensitivity to sweet, cold, or hot drinks',
      'Visible black or brown pits and roughness on the tooth surface',
      'Food continually getting trapped inside the tooth cavity'
    ],
    urgencyReason_bn: 'ক্যাভিটি ডেন্টিন পার হয়ে স্নায়ুতে পৌঁছালে সাধারণ ফিলিং করার সুযোগ শেষ হয়ে যায় এবং ব্যয়বহুল ও জটিল রুট ক্যানেল ছাড়া দাঁত বাঁচানো যায় না।',
    urgencyReason_en: 'Once decay breaches the pulp chamber, simple conservative filling is no longer possible, necessitating an extensive multi-visit root canal treatment.'
  },

  // s8: Cap / Crown – PFM
  s8: {
    serviceId: 's8',
    diseaseOverview_bn: 'রুট ক্যানেল চিকিৎসার পর দাঁত ভেতর থেকে রক্ত সঞ্চালনহীন হয়ে ভঙ্গুর বা শুকনা কাঠের মতো হয়ে যায়। এ ছাড়া দাঁতের বড় অংশ ভেঙে গেলে বা বড় ফিলিং থাকলে চাবানোর চাপে দাঁতটি মাঝখান দিয়ে ফেটে চিরতরে নষ্ট হয়ে যেতে পারে।',
    diseaseOverview_en: 'Following root canal therapy, teeth lose internal vascularity and become brittle. Without protective reinforcement, heavy chewing forces can split the tooth vertically, making it impossible to save.',
    causes_bn: [
      'রুট ক্যানেল পরবর্তী দাঁতের স্বাভাবিক আর্দ্রতা ও শক্তির অভাব',
      'দাঁতের অর্ধেকের বেশি অংশ ক্যাভিটি বা ট্রমার কারণে নষ্ট হওয়া',
      'শক্ত খাবার খাওয়ার সময় অতিরিক্ত চাপের প্রভাব'
    ],
    causes_en: [
      'Post-endodontic dehydration and structural brittleness',
      'Severe coronal loss exceeding 50% from extensive cavities or trauma',
      'High masticatory chewing stress on compromised tooth structure'
    ],
    procedure_bn: 'দাঁতের চারপাশে নির্দিষ্ট মাপে অ্যানাটমিক্যাল প্রিপারেশন করা হয়। নিখুঁত ইমপ্রেশন নিয়ে ল্যাবে ভেতরে শক্তিশালী কোবাল্ট-ক্রোম মেটাল ফ্রেম ও বাইরে দাঁতের রঙের সিরামিক ফিউজ করে ক্যাপ তৈরি করা হয়, যা বিশেষ ডেন্টাল সিমেন্ট দিয়ে স্থায়ীভাবে সেট করা হয়।',
    procedure_en: 'The tooth is conservatively prepared with shoulder margins. A precise impression is cast to fabricate a high-strength cobalt-chromium core bonded with layered porcelain, cemented permanently with high-grade luting agent.',
    procedureSteps_bn: [
      'দাঁতকে নির্দিষ্ট প্যারামিটারে মসৃণ ক্যাপ প্রিপারেশন',
      'নিখুঁত সিলিকন বা থ্রিডি ইমপ্রেশন গ্রহণ',
      'মেডিকেল সিমেন্টের সাহায্যে ক্রাউনটি স্থায়ীভাবে সিলিং'
    ],
    procedureSteps_en: [
      'Conservative circumferential tooth reduction with biological margin',
      'High-precision dimension impression of prepared stump',
      'Permanent hermetic cementation restoring full chewing function'
    ],
    symptoms_bn: [
      'রুট ক্যানেল শেষ হওয়ার পর দাঁত খোলা বা অসুরক্ষিত থাকা',
      'খাবার চাবাতে গেলে দাঁত ভেঙে যাওয়ার শঙ্কা অনুভূত হওয়া',
      'পেছনের মাড়ির দাঁতে বড় ধরনের ক্যাভিটি বা ভাঙা অংশ থাকা'
    ],
    symptoms_en: [
      'Uncrowned, vulnerable tooth following root canal completion',
      'Fear of tooth fracture when chewing on hardened food',
      'Large restored molar lacking structural perimeter'
    ],
    urgencyReason_bn: 'ক্যাপ ছাড়া রুট ক্যানেল করা দাঁতে শক্ত কিছু লাগলে দাঁত শিকড় পর্যন্ত ফেটে যায়, তখন দাঁতটি তুলে ফেলা ছাড়া ডাক্তারের আর কিছুই করার থাকে না।',
    urgencyReason_en: 'Chewing on an unprotected post-RCT tooth often results in catastrophic vertical root fracture, leaving tooth extraction as the only remaining option.'
  },

  // s9: Cap / Crown – Zirconia
  s9: {
    serviceId: 's9',
    diseaseOverview_bn: 'মেটাল-যুক্ত ক্যাপে সময়ের সাথে সাথে মাড়ির বর্ডারে কালচে রেখা ফুটে ওঠে এবং মেটালের কারণে আলো বাধাগ্রস্ত হয়ে দাঁত দেখতে কৃত্রিম লাগে। এ ছাড়া মেটাল অ্যালার্জির ঝুঁকি ও পেছনের দাঁতের চরম চর্বন চাপ সামলাতে প্রিমিয়াম মেটাল-ফ্রি সমাধানের প্রয়োজন হয়।',
    diseaseOverview_en: 'Traditional metal-fused crowns frequently display dark margins at the gumline and lack natural translucency. In high-aesthetic zones and heavy-bite areas, biocompatible metal-free monolithic ceramic is essential.',
    causes_bn: [
      'প্রাকৃতিক এনামেলের মতো ১০০% মেটাল-মুক্ত নান্দনিকতার চাহিদা',
      'মাড়ির সংবেদনশীলতা ও মেটাল অ্যালার্জি প্রতিরোধ',
      'চরম শক্ত খাবার চিবানোর ক্ষেত্রে আজীবন টেকসই শক্তির প্রয়োজন'
    ],
    causes_en: [
      'Demand for 100% metal-free, lifelike optical translucency',
      'Gingival hypersensitivity or allergic reactivity to base metals',
      'Need for unmatched fracture resistance against extreme bite pressures'
    ],
    procedure_bn: 'সম্পূর্ণ ক্যাড-ক্যাম (CAD-CAM) থ্রিডি স্ক্যান ও রোবোটিক মিলিং প্রযুক্তির মাধ্যমে একক সলিড জিরকোনিয়াম অক্সাইড ব্লক থেকে তৈরি করা হয়। এটি শতভাগ বায়োকম্প্যাটিবল, মাড়ির কোনো ক্ষতি করে না এবং হীরা সদৃশ শক্তির সাথে প্রাকৃতিক দাঁতের মতো উজ্জ্বল দেখায়।',
    procedure_en: 'Using precision CAD-CAM 3D scanning and computer-guided milling, the crown is carved from a solid monolithic zirconia block. It integrates seamlessly with gingival tissue, providing diamond-like durability and pristine aesthetic glow.',
    procedureSteps_bn: [
      'মিনিমাল টুথ প্রিপারেশন যাতে দাঁতের সর্বোচ্চ অংশ সুরক্ষিত থাকে',
      'ডিজিটাল ক্যাড-ক্যাম থ্রিডি ডিজাইন ও নিখুঁত রোবোটিক মিলিং',
      'রজন-ভিত্তিক বায়ো-অ্যাক্টিভ সিমেন্ট দিয়ে স্থায়ী বন্ডিং'
    ],
    procedureSteps_en: [
      'Minimally invasive tooth preparation preserving maximal natural tooth',
      'Computer-aided design (CAD-CAM) and precision ceramic milling',
      'Resin-based bio-active adhesive bonding for seamless longevity'
    ],
    symptoms_bn: [
      'সামনের দাঁতে এমন ক্যাপের প্রয়োজন যা কেউ দেখলে কৃত্রিম বুঝবে না',
      'পুরনো মেটাল ক্যাপের গোড়ায় কালো দাগ হয়ে মাড়ি দেখতে বিশ্রী লাগা',
      'দাঁত কিড়মিড় (Bruxism) করার স্বভাব বা অতিমাত্রায় কামড়ের চাপ'
    ],
    symptoms_en: [
      'Need for a front tooth crown indistinguishable from real enamel',
      'Dark metal shadows visible along the gumline of old crowns',
      'Heavy bite habits or bruxism requiring zero-chipping assurance'
    ],
    urgencyReason_bn: 'জিরকোনিয়া ক্রাউন কখনো ভাঙে না, রঙ বদলায় না এবং মাড়ির কোনো ইনফেকশন ঘটায় না। এটি দীর্ঘমেয়াদে আজীবনের এক নির্ভরযোগ্য বিনিয়োগ।',
    urgencyReason_en: 'Zirconia will never chip, discolor, or provoke gingival inflammation, offering a permanent, premium medical investment for your dentition.'
  },

  // s10: Dental Bridge
  s10: {
    serviceId: 's10',
    diseaseOverview_bn: 'মুখের এক বা একাধিক দাঁত না থাকলে ফাঁকা জায়গার দুই পাশের সুস্থ দাঁতগুলো ধীরে ধীরে ফাঁকা অংশের দিকে হেলে পড়ে। ওপরের বিপরীত পাটির দাঁতটি নিচে নেমে আসে, চাবানোর ভারসাম্য নষ্ট হয় এবং চোয়ালের জয়েন্টে (TMJ) দীর্ঘস্থায়ী বাত বা ব্যথা সৃষ্টি হয়।',
    diseaseOverview_en: 'A missing tooth triggers adjacent teeth to tip into the vacant space while the opposing tooth supra-erupts downwards. This destroys bite equilibrium and induces painful temporomandibular joint (TMJ) disorders.',
    causes_bn: [
      'ক্যারিজ বা ইনফেকশনের কারণে দাঁত তুলে ফেলার পর শূন্যস্থান সৃষ্টি',
      'আঘাতের কারণে দাঁত পড়ে যাওয়া',
      'সময়মতো কৃত্রিম দাঁত প্রতিস্থাপন না করায় পাশের দাঁত নড়ে যাওয়া'
    ],
    causes_en: [
      'Unreplaced space following tooth extraction due to decay or abscess',
      'Traumatic avulsion of natural teeth',
      'Delay in prosthetic replacement leading to progressive tooth tilting'
    ],
    procedure_bn: 'ফাঁকা জায়গার দুই পাশের সুস্থ দাঁতকে নির্দিষ্ট মাপে সাপোর্ট (Abutment) হিসেবে প্রস্তুত করা হয়। এরপর একটি সমন্বিত ৩ বা ততোধিক ইউনিটের ব্রিজ ল্যাবরেটরিতে নিখুঁতভাবে তৈরি করে ফাঁকা জায়গায় কৃত্রিম দাঁতটি ফিক্সড ও স্থায়ীভাবে সিমেন্ট দিয়ে যুক্ত করা হয়।',
    procedure_en: 'The adjacent natural teeth are contoured to serve as stable abutments. A multi-unit fixed bridge is cast with high structural accuracy, anchoring artificial pontics into the gap with permanent hermetic luting.',
    procedureSteps_bn: [
      'অ্যাবাটমেন্ট দাঁতের নিখুঁত প্রিপারেশন ও বাইট রেজিস্ট্রেশন',
      'ল্যাবরেটরিতে উচ্চমানের সিরামিক বা জিরকোনিয়া ব্রিজ নির্মাণ',
      'দাঁতের ফাঁকা স্থায়ীভাবে পূরণ করে চাবানোর পূর্ণ শক্তি পুনরুদ্ধার'
    ],
    procedureSteps_en: [
      'Preparation of anchoring abutment teeth and exact bite registration',
      'Custom laboratory fabrication of high-tensile ceramic/zirconia bridge',
      'Permanent fixed seating completely restoring chewing surface'
    ],
    symptoms_bn: [
      'দাঁত না থাকায় একপাশে খাবার চিবানো অসম্ভব হয়ে পড়া',
      'পাশের দাঁত ধীরে ধীরে হেলে পড়ে খাদ্যকণা আটকে যাওয়া',
      'হাসার সময় বা কথা বলার সময় ফাঁকা জায়গা দৃষ্টিকটু দেখানো'
    ],
    symptoms_en: [
      'Inability to chew food efficiently on the toothless side',
      'Adjacent teeth drifting sideways creating difficult food impaction traps',
      'Visible missing gap causing aesthetic and social embarrassment'
    ],
    urgencyReason_bn: 'দেরি করলে পাশের দাঁত এত বেশি হেলে যায় যে ব্রিজ করার সুযোগ হারিয়ে যায় এবং তখন অর্থোডন্টিক ট্রিটমেন্ট বা বড় সার্জারি ছাড়া সমাধান সম্ভব হয় না।',
    urgencyReason_en: 'Postponing bridge work allows adjacent teeth to tilt irreversibly, forfeiting the opportunity for a fixed bridge without prior orthodontic uprighting.'
  },

  // s11: Root Canal – Anterior
  s11: {
    serviceId: 's11',
    diseaseOverview_bn: 'সামনের দাঁতে গভীর ক্যারিজ বা আকস্মিক ট্রমার কারণে দাঁতের ভেতরের সংবেদনশীল রক্তনালী ও স্নায়ু (Pulp) ব্যাকটেরিয়ার আক্রমণে আক্রান্ত হয়ে পচে যায়। এর ফলে দাঁতের শিকড়ের ডগায় ইনফেকশন ও পুঁজ জমা হয়ে সামনের দাঁতের অস্তিত্ব হুমকিতে পড়ে।',
    diseaseOverview_en: 'Trauma or deep decay in front teeth exposes the inner pulp tissue to bacterial invasion, causing necrosis and gangrene. Periapical inflammation and bone destruction quickly threaten the survival of the tooth.',
    causes_bn: [
      'সামনের দাঁতে দৃশ্যমান বা লুকানো গভীর ডেন্টাল ক্যারিজ',
      'খেলার মাঠে বা দুর্ঘটনায় সামনের দাঁতে সরাসরি আঘাত',
      'পুরনো বড় ফিলিংয়ের ফাঁক দিয়ে ব্যাকটেরিয়ার স্নায়ুতে প্রবেশ'
    ],
    causes_en: [
      'Deep proximal decay between anterior teeth',
      'Direct mechanical impact or accidental blow to the front teeth',
      'Micro-leakage beneath old restorations allowing pulpitis'
    ],
    procedure_bn: 'ডা. অনি ব্যথাহীন লোকাল অ্যানেস্থেসিয়ায় সামনের দাঁতের পেছনের অংশ দিয়ে একটি সূক্ষ্ম অ্যাক্সেস তৈরি করেন। সংক্রামিত স্নায়ু সম্পূর্ণ বের করে অ্যান্টিসেপটিক সলিউশনে ক্যানেল জীবাণুমুক্ত করা হয় এবং পরবর্তীতে স্থায়ী বায়োকম্প্যাটিবল গাট্টা-পার্চা দিয়ে থ্রিডি ক্যানাল সিল সম্পন্ন করা হয়।',
    procedure_en: 'Dr. Ony delivers gentle local anesthesia and initiates a lingual micro-access opening. Necrotic pulp tissue is gently extirpated, the canal is disinfected with rotary endodontics, and hermetically sealed with bio-ceramic gutta-percha.',
    procedureSteps_bn: [
      'ডিজিটাল আরভিজি এক্স-রে দিয়ে ক্যানেলের দৈর্ঘ্য ও জটিলতা পরিমাপ',
      'ব্যথামুক্ত লোকাল অ্যানেস্থেসিয়া ও নিখুঁত ক্যানেল ক্লিনিং',
      'গাটা-পার্চা দিয়ে সম্পূর্ণ জীবাণুমুক্ত থ্রিডি সিলিং'
    ],
    procedureSteps_en: [
      'RVG radiography and electronic apex locator canal length determination',
      'Painless local anesthesia and rotary canal debridement',
      'Hermetic 3D root canal obturation with biocompatible sealer'
    ],
    symptoms_bn: [
      'সামনের দাঁত ধীরে ধীরে কালো বা লালচে-ধূসর হয়ে যাওয়া',
      'দাঁতে ঠাণ্ডা বা গরম পানি লাগলে তীব্র ব্যথা হওয়া যা দীর্ঘক্ষণ থাকে',
      'মাড়িতে ছোট ব্রণের মতো পুঁজফোড়া (Sinus) তৈরি হওয়া'
    ],
    symptoms_en: [
      'Progressive discoloration of the front tooth turning greyish-brown',
      'Prolonged, lingering sharp pain triggered by hot or cold contact',
      'Small boil or sinus tract discharging pus on the adjacent gum'
    ],
    urgencyReason_bn: 'রুট ক্যানেল হলো আপনার আসল প্রাকৃতিক সামনের দাঁতটি বাঁচানোর একমাত্র বৈজ্ঞানিক পথ। অবহেলা করলে দাঁত তুলে ফেলা ছাড়া কোনো উপায় থাকে না।',
    urgencyReason_en: 'Root canal therapy is the only medical intervention that saves your natural front tooth from extraction, preserving authentic facial aesthetics.'
  },

  // s12: Root Canal – Posterior
  s12: {
    serviceId: 's12',
    diseaseOverview_bn: 'পেছনের মাড়ির দাঁতে ৩ থেকে ৪টি বাঁকা ও জটিল শিকড় থাকে। খাদ্যকণা জমে বড় গহ্বর তৈরি হলে ব্যাকটেরিয়া দাঁতের কেন্দ্রীয় পাল্পে ছড়িয়ে পড়ে। এর ফলে দাঁতের ভেতরে তীব্র প্রেশার তৈরি হয়ে অসহ্য স্পন্দিত (throbbing) ব্যথার জন্ম দেয় যা কান ও মাথা পর্যন্ত ছড়িয়ে পড়ে।',
    diseaseOverview_en: 'Molar teeth possess 3 to 4 curved, intricate root canals. When deep caries breaches the pulp chamber, high intra-pulpal pressure builds up, producing debilitating throbbing agony radiating to the ear and temple.',
    causes_bn: [
      'মাড়ির দাঁতের গভীর খাঁজে দীর্ঘমেয়াদী ক্যারিজ অবহেলা করা',
      'দাঁতের অভ্যন্তরীণ ফাটল (Cracked Tooth Syndrome)',
      'পুরনো বড় ফিলিং ভেঙে স্নায়ু উন্মুক্ত হয়ে যাওয়া'
    ],
    causes_en: [
      'Unattended deep molar caries penetrating into pulp tissue',
      'Microscopic internal stress fractures across molar cusps',
      'Breakdown of massive restorations exposing pulpal floor'
    ],
    procedure_bn: 'ডা. অনি উন্নত এন্ডোমোটর ও নমনীয় রোটারি নিকেল-টাইটানিয়াম (Ni-Ti) ফাইলের সাহায্যে প্রতিটি বাঁকা ক্যানেলের শেষ প্রান্ত পর্যন্ত পরিষ্কার করেন। ডিজিটাল আরভিজি ও ইলেকট্রনিক অ্যাপেক্স লোকেটর দিয়ে ক্যানেল সিল করে দাঁতের সংক্রমণ শূন্যে নামিয়ে আনেন।',
    procedure_en: 'Dr. Ony deploys modern endodontic motors with flexible rotary nickel-titanium (Ni-Ti) files to navigate curved molar canals. Canals are shaped, thoroughly irrigated, and obturated under digital apex-locator accuracy.',
    procedureSteps_bn: [
      'লোকাল অ্যানেস্থেসিয়ায় ব্যথামুক্ত চিকিৎসা ও এন্ডো অ্যাক্সেস',
      'রোটারি ফাইলে বাঁকা ক্যানেল জীবাণুমুক্তকরণ ও মেডিকেশন',
      'থ্রিডি অবচুরেশন সিলিং ও ডেন্টাল কোর রিস্টোরেশন'
    ],
    procedureSteps_en: [
      'Painless local anesthesia and precise coronal endodontic access',
      'Rotary instrument shaping and copious ultrasonic disinfection',
      'Hermetic gutta-percha 3D obturation followed by core build-up'
    ],
    symptoms_bn: [
      'রাতে শুইলে দাঁতে মারাত্মক টনটনে ব্যথা ও মাথা যন্ত্রণা',
      'গরম চা বা খাবার খেলে দাঁতে তীব্র অসহ্য কামড়ানি',
      'দাঁতে হালকা স্পর্শ বা কামড় দিলেও মারাত্মক কষ্ট হওয়া'
    ],
    symptoms_en: [
      'Severe throbbing pain escalating at night, disturbing sleep',
      'Excruciating pain triggered by hot drinks or warm food',
      'Inability to chew due to extreme periapical pressure tenderness'
    ],
    urgencyReason_bn: 'দেরি করলে শিকড়ের ইনফেকশন চোয়ালের হাড় গলিয়ে মুখে বড় ফোড়া বা সেলুলাইটিস তৈরি করতে পারে, যা পরবর্তীতে জীবন ঝুঁকিপূর্ণ জটিলতায় রূপ নেয়।',
    urgencyReason_en: 'Delaying RCT allows infection to destroy the alveolar bone and expand into facial spaces (cellulitis), requiring emergency hospitalization.'
  },

  // s13: Pulp Capping
  s13: {
    serviceId: 's13',
    diseaseOverview_bn: 'গভীর ক্যাভিটি পরিষ্কার করার সময় যখন দাঁতের স্নায়ু সামান্য উন্মুক্ত বা অতি নিকটে থাকে কিন্তু স্নায়ুতে এখনও কোনো তীব্র সংক্রমণ ঘটেনি, তখন পুরো রুট ক্যানেল না করে স্নায়ুটির জীবন রক্ষা করার আধুনিক পদ্ধতিই হলো পাল্প ক্যাপিং।',
    diseaseOverview_en: 'When deep decay encroaches on the pulp without established irreversible infection, vital pulp therapy protects the exposed nerve, stimulating natural dentin repair without a full root canal.',
    causes_bn: [
      'গভীর ক্যাভিটি যা স্নায়ুর খুব কাছাকাছি পৌঁছে গেছে',
      'ক্যাভিটি পরিষ্কারের সময় সূক্ষ্ম মাইক্রো-এক্সপোজার',
      'দাঁতে আঘাতের কারণে এনামেল-ডেন্টিন ফ্র্যাকচার'
    ],
    causes_en: [
      'Extremely deep caries abutting the boundary of the dental pulp',
      'Microscopic mechanical exposure during caries excavation',
      'Traumatic fracture exposing inner dentin layer'
    ],
    procedure_bn: 'সংক্রামিত অংশ সতর্কতায় ড্রিলিং শেষে স্নায়ুর ওপর বিশেষ বায়ো-অ্যাক্টিভ থেরাক্যাল বা এমটিএ (MTA/Calcium Silicate) মেডিকেশন প্রলেপ দেওয়া হয়। এটি দাঁতের ভেতরের কোষকে উদ্দীপিত করে সেকেন্ডারি ডেন্টিন ব্রিজ তৈরি করায় এবং ওপরে স্থায়ী ফিলিং দিয়ে দাঁতকে সজীব রাখে।',
    procedure_en: 'The cavity is treated with bio-active Mineral Trioxide Aggregate (MTA) or biocompatible calcium silicate over the exposed nerve. This induces tertiary dentin bridge formation, preserving vital tooth pulp under a permanent filling.',
    procedureSteps_bn: [
      'মৃদু অ্যান্টিসেপটিক ওয়াশ ও ক্ষতের হেমোস্ট্যাসিস নিয়ন্ত্রণ',
      'বায়োঅ্যাক্টিভ এমটিএ বা ক্যালসিয়াম সিলিকেট মেডিসিন স্থাপন',
      'স্থায়ী কসমেটিক ফিলিং দিয়ে হারমেটিক সিলিং'
    ],
    procedureSteps_en: [
      'Gentle antiseptic disinfection and complete pulpal hemostasis',
      'Application of bio-active MTA / calcium silicate pulp protector',
      'Immediate hermetic sealing with durable resin composite'
    ],
    symptoms_bn: [
      'মিষ্টি বা ঠাণ্ডা খেলে হালকা শিরশিরানি যা কয়েক সেকেন্ডে সেরে যায়',
      'গভীর গর্ত তৈরি হওয়া কিন্তু রাতে স্বতঃস্ফূর্ত তীব্র ব্যথা না থাকা',
      'দাঁতে খাবার ঢুকে অস্বস্তি অনুভব হওয়া'
    ],
    symptoms_en: [
      'Transient sensitivity to cold or sweets that subsides immediately',
      'Deep cavity present without spontaneous throbbing night pain',
      'Food impaction discomfort without periapical swelling'
    ],
    urgencyReason_bn: 'এই প্রাথমিক মুহূর্তে চিকিৎসা নিলে রুট ক্যানেলের জটিলতা ও বড় খরচ দুটোই বাঁচানো যায়। সামান্য দেরি করলেই স্নায়ু মারা গিয়ে রুট ক্যানেল বাধ্যতামূলক হয়ে পড়ে।',
    urgencyReason_en: 'Acting at this golden window preserves tooth vitality and avoids the higher expense of root canal treatment. A slight delay leads to irreversible pulp necrosis.'
  },

  // s14: Pulpectomy
  s14: {
    serviceId: 's14',
    diseaseOverview_bn: 'শিশুদের দুধ দাঁতের গভীর ইনফেকশনে কিংবা বড়দের জরুরি তীব্র দাঁত ব্যথায় যখন তৎক্ষণাৎ স্নায়ু থেকে প্রদাহ বের করে দেওয়া প্রয়োজন, তখন সম্পূর্ণ পাল্প অপসারণ করে রোগীকে তাৎক্ষণিক ব্যথা থেকে মুক্ত করার চিকিৎসা হলো পালপেকটমি।',
    diseaseOverview_en: 'When acute pulpitis inflicts agonizing pain in pediatric primary teeth or adult dental emergencies, total pulpal debridement eradicates the infected nerve core, bringing immediate relief.',
    causes_bn: [
      'দুধ দাঁতের গভীর নার্সিং বটল ক্যারিজ বা চকলেটের ক্ষতি',
      'তীব্র ব্যাকটেরিয়াল পাল্পাইটিস যা সাধারণ ওষুধে কমে না',
      'দাঁতের স্নায়ুর সম্পূর্ণ প্রদাহ ও মৃত্যু'
    ],
    causes_en: [
      'Aggressive nursing bottle or rampant childhood caries',
      'Acute irreversible pulpitis unresponsive to analgesics',
      'Total necrotic breakdown of internal pulp tissue'
    ],
    procedure_bn: 'ব্যথাহীন লোকাল অ্যানেস্থেসিয়ার সাহায্যে ক্রাউন ও ক্যানেলের সংক্রামিত স্নায়ু সম্পূর্ণ অপসারণ করা হয়। এরপর শিশুদের ক্ষেত্রে রেসোর্বেবল পেস্ট এবং বড়দের ক্ষেত্রে ক্যানেল মেডিকেশন দিয়ে ফিলিং করা হয় যা সঙ্গে সঙ্গে ব্যথামুক্ত করে।',
    procedure_en: 'Under gentle local anesthesia, the inflamed coronal and radicular pulp is entirely extirpated. Canals are gently debrided and sealed with resorbable medicated paste in primary teeth or therapeutic dressing in permanent dentition.',
    procedureSteps_bn: [
      'তাৎক্ষণিক অ্যানেস্থেসিয়া দিয়ে সম্পূর্ণ অসাড়করণ',
      'ক্যানেল থেকে সংক্রামিত স্নায়ু ও পুঁজ দ্রুত নিঃসরণ',
      'জীবাণুনাশক অ্যান্টিব্যাকটেরিয়াল পেস্ট স্থাপন'
    ],
    procedureSteps_en: [
      'Instant gentle local anesthesia ensuring total comfort',
      'Rapid extirpation of hyperemic pulp and purulent exudate',
      'Canal obturation with antibacterial resorbable paste'
    ],
    symptoms_bn: [
      'শিশু বা বড়দের অসহ্য যন্ত্রণায় ক্রমাগত কান্না ও ছটফটানি',
      'কোনো ব্যথানাশক ওষুধেও ব্যথার কোনো উপশম না হওয়া',
      'মাড়িতে ফোলাভাব ও দাঁত ছুঁলেই বিদ্যুতের মতো ব্যথা'
    ],
    symptoms_en: [
      'Unbearable, continuous crying or acute agony in children/adults',
      'Pain entirely unresponsive to standard painkiller tablets',
      'Gingival inflammation and extreme tenderness to touch'
    ],
    urgencyReason_bn: 'জরুরি পালপেকটমি রোগীকে দুঃসহ নরক যন্ত্রণা থেকে মুহূর্তেই মুক্তি দেয় এবং শিশুদের ক্ষেত্রে নিচের স্থায়ী দাঁতের কুঁড়িকে সংক্রমণ থেকে সুরক্ষা দেয়।',
    urgencyReason_en: 'Emergency pulpectomy provides instantaneous pain cessation and shields the underlying permanent tooth germ from destructive periapical abscesses.'
  },

  // s15: Tooth Extraction (Normal)
  s15: {
    serviceId: 's15',
    diseaseOverview_bn: 'যখন কোনো দাঁত ক্যারিজ, মাড়ির রোগ বা গভীর ভাঙনের কারণে এমন পর্যায়ে পৌঁছায় যে ফিলিং, রুট ক্যানেল বা ক্যাপ করেও তা আর মুখের হাড়ের সাথে সংরক্ষণ করা বৈজ্ঞানিকভাবে নিরাপদ নয়, তখন সংক্রমণ রোধে দাঁতটি তোলা আবশ্যক।',
    diseaseOverview_en: 'When severe caries, advanced periodontitis, or catastrophic coronal breakage renders a tooth non-restorable, controlled extraction is required to protect adjacent teeth and bone.',
    causes_bn: [
      'দাঁত এতটা ক্ষয় হয়ে যাওয়া যে ক্যাপ পরানোর কোনো কাঠামো অবশিষ্ট নেই',
      'মাড়ির হাড় সম্পূর্ণ ক্ষয়ে দাঁত মারাত্মকভাবে নড়ে যাওয়া',
      'চিকিৎসাযোগ্য নয় এমন দীর্ঘস্থায়ী ইনফেকশন'
    ],
    causes_en: [
      'Complete destruction of clinical crown precluding retention',
      'Terminal periodontal bone loss with grade-III tooth mobility',
      'Chronic recalcitrant infection unresponsive to endodontic care'
    ],
    procedure_bn: 'ডা. অনি আধুনিক ব্যথাহীন লোকাল অ্যানেস্থেসিয়া প্রয়োগ করে সংশ্লিষ্ট অংশ সম্পূর্ণ অসাড় করেন। এরপর মাড়ির টিস্যু বা চোয়ালের হাড়ের কোনো ক্ষতি না করে অ্যাট্রমাটিক এলিভেটর দ্বারা আলতো চাপে দাঁতটি অক্ষত অবস্থায় তুলে আনেন এবং জীবাণুমুক্ত গজ প্যাক দেন।',
    procedure_en: 'Dr. Ony administers gentle local anesthesia. Using specialized atraumatic periotomes and luxators, the tooth is mobilized gently without tearing gingival tissues or damaging alveolar bone plates, followed by sterile hemostatic dressing.',
    procedureSteps_bn: [
      'সম্পূর্ণ ব্যথামুক্ত আধুনিক লোকাল অ্যানেস্থেসিয়া প্রয়োগ',
      'চোয়ালের হাড় অক্ষত রেখে অ্যাট্রমাটিক পদ্ধতিতে দাঁত তোলা',
      'রক্তপাত নিয়ন্ত্রণ ও বিস্তারিত আফটার-কেয়ার পরামর্শ প্রদান'
    ],
    procedureSteps_en: [
      'Effective, profound local anesthesia ensuring 100% painless removal',
      'Atraumatic socket preservation extraction technique',
      'Hemostatic socket packaging and comprehensive post-op guidance'
    ],
    symptoms_bn: [
      'দাঁত চরম নড়বড়ে হয়ে খাবার খাওয়ার সময় মারাত্মক ব্যথা হওয়া',
      'মাড়ি থেকে অনবরত পুঁজ পড়া ও মুখে বিশ্রী গন্ধ হওয়া',
      'দাঁতের গোড়া পচে দুর্গন্ধযুক্ত ফোড়া হওয়া'
    ],
    symptoms_en: [
      'Grossly mobile tooth causing acute pain whenever chewing',
      'Continuous purulent discharge and foul odor from the socket',
      'Extensively decayed, non-functional root stump'
    ],
    urgencyReason_bn: 'মৃত ও পচা দাঁত মুখে রেখে দিলে রক্তে ব্যাকটেরিয়া মিশে হৃদযন্ত্র ও কিডনির মারাত্মক ক্ষতি করতে পারে এবং পাশের সুস্থ দাঁতের হাড় ধ্বংস করে দেয়।',
    urgencyReason_en: 'Retaining a non-restorable infected tooth risks systemic bacteremia and accelerates severe bone destruction around adjacent healthy teeth.'
  },

  // s16: Tooth Extraction (Surgical)
  s16: {
    serviceId: 's16',
    diseaseOverview_bn: 'মাড়ির হাড়ের ভেতরে ভেঙে যাওয়া শিকড় (Retained Root), হাড়ের সাথে আঁকড়ে থাকা (Ankylosed) দাঁত কিংবা বাঁকা শিকড়ের দাঁত সাধারণ ফরসেপ দিয়ে তোলা যায় না। এ ক্ষেত্রে মাড়িতে সূক্ষ্ম সার্জিক্যাল উইন্ডো তৈরি করে নিরাপদে দাঁত অপসারণ করতে হয়।',
    diseaseOverview_en: 'Retained root fragments buried within the alveolar bone, curved roots, or ankylosed teeth cannot be retrieved with simple forceps, requiring a precision surgical flap approach.',
    causes_bn: [
      'অতীতে সাধারণ দাঁত তোলার সময় শিকড় ভেঙে মাড়িতে থেকে যাওয়া',
      'হাড়ের সাথে দাঁতের শিকড় স্থায়ীভাবে জোড়া লেগে যাওয়া',
      'শিকড়ের ডগায় অস্বাভাবিক বাঁক বা হাড়ের ঘনত্ব বৃদ্ধি'
    ],
    causes_en: [
      'Past incomplete extraction leaving broken root tips in bone',
      'Bone ankylosis fusing root cementum to the alveolar wall',
      'Extreme root curvature or hypercementosis blocking simple removal'
    ],
    procedure_bn: 'ডিজিটাল আরভিজি এক্স-রেতে শিকড়ের অবস্থান দেখে সুনির্দিষ্ট সার্জিক্যাল অ্যানেস্থেসিয়ায় মাড়িতে সূক্ষ্ম ইনসিশন দেওয়া হয়। বিশেষ সার্জিক্যাল হ্যান্ডপিস দিয়ে হাড়ের সামান্য অংশ সরিয়ে শিকড়টি অক্ষত বের করে আনা হয় এবং রি-অ্যাবজরবেবল সুচার দিয়ে সেলাই করা হয়।',
    procedure_en: 'Guided by RVG radiography, Dr. Ony reflects a conservative mucosal flap. Minimal bone relief is sculpted with cooled surgical burs to elevate the root tip, followed by antiseptic debridement and fine micro-suturing.',
    procedureSteps_bn: [
      'আরভিজি এক্স-রেতে শিকড় ও স্নায়ুর অবস্থান চিহ্নিতকরণ',
      'মাইক্রো-সার্জিক্যাল ফ্ল্যাপ তৈরি ও সতর্কতায় শিকড় অপসারণ',
      'স্যালাইন ওয়াশ ও সূক্ষ্ম সেলাই দিয়ে দ্রুত নিরাময় নিশ্চিতকরণ'
    ],
    procedureSteps_en: [
      'Precise radiographic localization of root tips relative to nerves',
      'Conservative surgical window creation and gentle root retrieval',
      'Antiseptic debridement and fine aesthetic suturing for rapid healing'
    ],
    symptoms_bn: [
      'মাড়ির ভেতরে শক্ত কিছু আটকে থাকা ও বারবার পুঁজ হওয়া',
      'দাঁত না থাকা সত্ত্বেও মাড়িতে চাপ দিলে তীব্র ব্যথা হওয়া',
      'জিহ্বায় বা মাড়িতে ধারালো ভাঙা অংশের খোঁচা লাগা'
    ],
    symptoms_en: [
      'Recurrent swelling and fistula above a supposedly missing tooth',
      'Persistent localized ache when pressing on the edentulous ridge',
      'Sharp buried fragment piercing through mucosa during meals'
    ],
    urgencyReason_bn: 'মাড়ির ভেতরে ভাঙা শিকড় বছরের পর বছর থাকলে তা চোয়ালের হাড়ে বড় সিস্ট ও টিউমারে রূপ নিতে পারে। সময়মতো বের করে ফেলা জরুরি।',
    urgencyReason_en: 'Retained roots fester as chronic foci of infection, frequently progressing into destructive jaw cysts or osteomyelitis if unaddressed.'
  },

  // s17: Wisdom Tooth Surgery
  s17: {
    serviceId: 's17',
    diseaseOverview_bn: 'চোয়ালে পর্যাপ্ত জায়গা না থাকায় ১৮ থেকে ২৫ বছর বয়সে মুখের শেষ প্রান্তের আক্কেল দাঁত সোজা উঠতে পারে না। এটি মাড়ির নিচে বা চোয়ালের হাড়ের মধ্যে আড়াআড়ি (Impacted) আটকে থাকে। এতে পাশের দাঁতের শিকড় নষ্ট হয় এবং মারাত্মক পেরিকরোনাইটিস ইনফেকশন সৃষ্টি হয়।',
    diseaseOverview_en: 'Due to lack of dental arch space, 3rd molars frequently become partially or fully impacted against the jawbone. This forms a food-trapping operculum flap, causing agonizing pericoronitis and resorption of adjacent molar roots.',
    causes_bn: [
      'আধুনিক মানুষের চোয়ালের আকার ছোট হয়ে আসার বিবর্তনীয় কারণ',
      'দাঁতের অস্বাভাবিক কোণ (হরাইজন্টাল বা মেসিয়াল ইমপ্যাকশন)',
      'মাড়ির মাংসের নিচে খাদ্যকণা ও ব্যাকটেরিয়ার দীর্ঘস্থায়ী আক্রমণ'
    ],
    causes_en: [
      'Evolutionary reduction in human jaw dimensions leaving no space',
      'Abnormal developmental angulation (horizontal or mesioangular)',
      'Subgingival bacterial entrapment beneath the swollen operculum'
    ],
    procedure_bn: 'ডা. অনি আরভিজি এক্স-রেতে ম্যান্ডিবুলার নার্ভের অবস্থান মূল্যায়ন করে ডিপ লোকাল অ্যানেস্থেসিয়ায় ফ্ল্যাপ উন্মুক্ত করেন। চোয়ালের হাড়ের সুরক্ষা বজায় রেখে দাঁতটিকে আধুনিক বারের সাহায্যে কয়েকটি সূক্ষ্ম খণ্ডে বিভক্ত (Sectioning) করে ব্যথাহীনভাবে অপসারণ করেন এবং ফাইন সুচার দেন।',
    procedure_en: 'Dr. Ony reviews RVG films to map the inferior alveolar nerve. Under profound anesthesia, a minimal surgical flap is elevated. The impacted crown is sectioned into atraumatic pieces to preserve jawbone, followed by sterile suturing.',
    procedureSteps_bn: [
      'ডিজিটাল আরভিজিতে আক্কেল দাঁতের হাড়ের গভীরতা পরিমাপ',
      'ব্যথামুক্ত সার্জিক্যাল ফ্ল্যাপ ও সেকশনিং পদ্ধতিতে দাঁত উত্তোলন',
      'অ্যান্টিবায়োটিক প্রটেকশন ও সূক্ষ্ম সেলাই দিয়ে আরামদায়ক রিকভারি'
    ],
    procedureSteps_en: [
      'Detailed RVG mapping of root angulation and nerve proximity',
      'Micro-surgical flap reflection and precise tooth sectioning',
      'Antiseptic socket irrigation and comfortable suture closure'
    ],
    symptoms_bn: [
      'মুখ বা হাঁ করতে মারাত্মক কষ্ট হওয়া ও চোয়াল আটকে যাওয়া (Trismus)',
      'কানের নিচে, গলায় ও পুরো চোয়ালে ছড়িয়ে পড়া অসহ্য যন্ত্রণা',
      'আক্কেল দাঁতের মাড়ি লাল হয়ে ফুলে ওঠা ও পুঁজ বের হওয়া'
    ],
    symptoms_en: [
      'Severe difficulty opening mouth or swallowing (Trismus)',
      'Excruciating pain radiating across the jaw, ear, and neck',
      'Swollen, tender gum flap behind molars with bad taste or pus'
    ],
    urgencyReason_bn: 'আক্কেল দাঁত না তুললে তা পাশের সুস্থ মূল মাড়ির দাঁতের শিকড় গলিয়ে ফেলে এবং পুরো মুখমণ্ডলে মারাত্মক সেলুলাইটিস ছড়িয়ে গাল ফুলে জীবন বিপন্ন করতে পারে।',
    urgencyReason_en: 'Untreated impactions destroy adjacent permanent molars, cause dentigerous cysts, and provoke life-threatening facial space infections.'
  },

  // s18: Periapical Surgery (Apicoectomy)
  s18: {
    serviceId: 's18',
    diseaseOverview_bn: 'রুট ক্যানেল করার পরেও কিছু জটিল ক্ষেত্রে শিকড়ের ডগায় লুকানো মাইক্রো-ক্যানালের কারণে ইনফেকশন বা সিস্ট থেকে যেতে পারে। পুরো দাঁত না তুলে শুধুমাত্র শিকড়ের শেষ প্রান্তের সংক্রামিত অংশ অস্ত্রোপচারের মাধ্যমে কেটে ফেলে দাঁতকে আজীবনের জন্য বাঁচানোর পদ্ধতি হলো এপিকোয়েকটমি।',
    diseaseOverview_en: 'Persistent periapical granulomas or cysts may survive conventional root canal therapy due to anatomical canal variations. Apicoectomy surgically resects the infected root tip, salvaging the tooth without extraction.',
    causes_bn: [
      'শিকড়ের শেষ প্রান্তে ক্রনিক সিস্ট বা গ্র্যানুলোমা বিস্তার লাভ করা',
      'ক্যানালের শেষ প্রান্তে ক্যালসিফিকেশন বা বাঁকা শারীরবৃত্তীয় গঠন',
      'প্রচলিত রি-রুট ক্যানেলে ইনফেকশন নিরাময় না হওয়া'
    ],
    causes_en: [
      'Chronic periapical cyst or granuloma eroding cortical bone',
      'Un-negotiable canal delta or apical root curvature harboring bacteria',
      'Failure of conventional orthograde endodontic re-treatment'
    ],
    procedure_bn: 'লোকাল অ্যানেস্থেসিয়ায় মাড়ির ওপর ছোট সার্জিক্যাল উইন্ডো খুলে শিকড়ের শেষ ৩ মিলিমিটার অংশ কেটে ফেলা হয় এবং সংলগ্ন সিস্টের থলি পরিষ্কার করা হয়। এরপর আল্ট্রাসনিক দিয়ে রেট্রোগ্রেড ক্যাভিটি তৈরি করে বায়োসেরামিক দিয়ে স্থায়ী সিলিং নিশ্চিত করা হয়।',
    procedure_en: 'Under local anesthesia, a submarginal flap exposes the root apex. The apical 3mm is resected, pathological lesion curetted, and a retro-cavity prepared using micro-ultrasonic tips, sealed with bio-ceramic retro-filling.',
    procedureSteps_bn: [
      'সার্জিক্যাল ফ্ল্যাপের মাধ্যমে শিকড়ের এপেক্স উন্মোচন',
      'সংক্রামিত টিস্যু কিউরেটেজ ও শিকড়ের ডগা কর্তন',
      'বায়ো-অ্যাক্টিভ ম্যাটেরিয়াল দিয়ে রেট্রোগ্রেড সিলিং ও সেলাই'
    ],
    procedureSteps_en: [
      'Precision surgical flap reflection exposing the cortical bone defect',
      'Complete cyst enucleation and 3mm apical root resection',
      'Hermetic retrograde bio-ceramic seal and tension-free suturing'
    ],
    symptoms_bn: [
      'রুট ক্যানেল করা দাঁতের গোড়ার মাড়িতে বারবার পুঁজফোড়া হওয়া',
      'দাঁতে কামড় দিলে বা চাপ দিলে ভেতরে গভীর ভোঁতা ব্যথা হওয়া',
      'এক্স-রেতে শিকড়ের ডগায় হাড়ের বড় ধরনের কালো ক্ষত দেখা যাওয়া'
    ],
    symptoms_en: [
      'Recurrent gum boil or draining sinus tract above a root-treated tooth',
      'Dull, persistent tenderness upon tapping or applying bite force',
      'Radiographic evidence of expanding radiolucent bone destruction'
    ],
    urgencyReason_bn: 'এই সার্জারি হলো আপনার আসল প্রাকৃতিক দাঁতটি রক্ষা করার শেষ বৈজ্ঞানিক সুযোগ। তা না করলে মূল্যবান দাঁতটি চিরতরে তুলে ফেলতে হয়।',
    urgencyReason_en: 'Apicoectomy represents the definitive surgical boundary between retaining your natural tooth and permanent surgical loss.'
  },

  // s19: Biopsy Surgery
  s19: {
    serviceId: 's19',
    diseaseOverview_bn: 'মুখের ভেতরে জিহ্বা, গাল, তালু বা মাড়িতে এমন কিছু ঘা, সাদা-লাল ছোপ (Leukoplakia) কিংবা অস্বাভাবিক ফোলা মাংসপিণ্ড তৈরি হতে পারে যা সাধারণ ওষুধে সারে না। এটি ওরাল ক্যান্সার বা প্রি-ক্যান্সারাস ক্ষত কি না তা নিশ্চিত হওয়ার একমাত্র নির্ভুল পরীক্ষা বায়োপসি।',
    diseaseOverview_en: 'Persistent oral ulcers, white/red patches (erythroplakia/leukoplakia), or tissue growths that do not heal within 14 days require histopathological biopsy to rule out oral malignancies or pre-cancerous lesions.',
    causes_bn: [
      'ধূমপান, পান-সুপারি, গুল বা জর্দা সেবনের মারাত্মক বিষক্রিয়া',
      'ভাঙা বা ধারালো দাঁতের দীর্ঘমেয়াদী ক্রমাগত ঘর্ষণ',
      'অটোইমিউন ডিসঅর্ডার বা ওরাল লাইকেন প্ল্যানাস'
    ],
    causes_en: [
      'Chronic carcinogenic irritation from tobacco, betel nut, or zarda',
      'Persistent mechanical trauma from fractured sharp cusps',
      'Autoimmune conditions such as oral lichen planus'
    ],
    procedure_bn: 'ব্যথাহীন লোকাল অ্যানেস্থেসিয়ায় সন্দেহজনক অংশের সুস্থ ও অসুস্থ টিস্যুর সংযোগস্থল থেকে অত্যন্ত সতর্কতার সাথে অল্প পরিমাণ স্যাম্পল সংগ্রহ করা হয়। স্যাম্পলটি বিশেষ ফরমালিন প্রিজার্ভারে সিল করে অনুমোদিত প্যাথলজি ল্যাবে পরীক্ষার জন্য পাঠানো হয়।',
    procedure_en: 'Under local anesthesia, Dr. Ony excises a representative wedge of tissue spanning lesion margins. The specimen is fixed in 10% buffered formalin and dispatched to an accredited pathology laboratory for microscopic analysis.',
    procedureSteps_bn: [
      'লোকাল অ্যানেস্থেসিয়ায় ব্যথাহীন স্যাম্পলিং নিশ্চিতকরণ',
      'মাইক্রো-স্ক্যাল্পেল দিয়ে ডায়াগনস্টিক টিস্যু সংগ্রহ',
      'ফাইন সুচারিং ও প্যাথলজি রিপোর্টের ভিত্তিতে সঠিক চিকিৎসা নির্দেশনা'
    ],
    procedureSteps_en: [
      'Targeted local anesthesia ensuring zero patient discomfort',
      'Micro-surgical harvesting of representative tissue boundary',
      'Aesthetic suturing and expert guidance upon laboratory staging'
    ],
    symptoms_bn: [
      'মুখের ভেতরের ঘা বা ক্ষত যা ২ সপ্তাহের বেশি সময় ধরে শুকাচ্ছে না',
      'মুখে সাদা বা লালচে খসখসে দাগ বা মাংসের অস্বাভাবিক বৃদ্ধি',
      'মুখের কোনো স্থানে দীর্ঘমেয়াদী অসাড়তা বা জ্বালাপোড়া'
    ],
    symptoms_en: [
      'Non-healing oral ulcer or sore persisting longer than 2 weeks',
      'Velvety red or rough white patches that cannot be wiped off',
      'Unexplained tissue hardening, swelling, or localized numbness'
    ],
    urgencyReason_bn: 'ওরাল ক্যান্সার প্রাথমিক পর্যায়ে শনাক্ত হলে ১০০% নিরাময় সম্ভব। অবহেলা করলে এটি দ্রুত চোয়াল ও গলায় ছড়িয়ে জীবনঘাতী রূপ নিতে পারে।',
    urgencyReason_en: 'Early detection of oral dysplasia guarantees near 100% cure rates. Delay allows malignant metastasis, endangering life and requiring extensive surgery.'
  },

  // s20: Tooth Avulsion Management
  s20: {
    serviceId: 's20',
    diseaseOverview_bn: 'খেলাধুলা, সড়ক দুর্ঘটনা বা মারামারির আঘাতে অক্ষত প্রাকৃতিক দাঁত সমূলে তার সকেট থেকে সম্পূর্ণ বাইরে ছিটকে পড়ে যাওয়াকে এভালশন বলে। সঠিক সময়ে দ্রুত চিকিৎসা নিলে এই ছিটকে পড়া দাঁতটি আবার চোয়ালের হাড়ে আজীবনের জন্য জোড়া লাগানো সম্ভব।',
    diseaseOverview_en: 'Complete displacement of a natural tooth out of its alveolar socket due to mechanical trauma. If managed within the golden 60-minute window, the natural tooth can be successfully replanted and permanently re-integrated.',
    causes_bn: [
      'খেলাধুলার সময় মুখে বল, ব্যাট বা কনুইয়ের প্রচণ্ড আঘাত',
      'সড়ক বা বাইক দুর্ঘটনায় সামনের দাঁতে আঘাত',
      'হঠাৎ নিচে পড়ে গিয়ে দাঁত সমূলে উপড়ে যাওয়া'
    ],
    causes_en: [
      'Sports-related collisions or direct facial impact',
      'Road traffic accidents jarring the anterior dental arch',
      'Accidental falls dislodging fully formed permanent teeth'
    ],
    procedure_bn: 'ছিটকে পড়া দাঁতটির শিকড় স্পর্শ না করে জীবাণুমুক্ত স্যালাইনে ধুয়ে অবিলম্বে সকেটে পুনঃস্থাপন করা হয়। এরপর বিশেষ নমনীয় অর্থোডন্টিক ওয়্যার বা কম্পোজিট দিয়ে পাশের দাঁতের সাথে শক্তভাবে স্প্লিন্টিং (Splinting) করে রাখা হয় যাতে দাঁতটি হাড়ে আবার মজবুত হয়ে জোড়া লাগে।',
    procedure_en: 'The avulsed tooth is gently cleansed with sterile saline without scraping the root membrane. It is immediately repositioned into the socket and stabilized with flexible composite-wire splinting to promote periodontal ligament regeneration.',
    procedureSteps_bn: [
      'জরুরি সকেট ওয়াশ ও রক্ত জমাট দূরীকরণ',
      'সঠিক অ্যানাটমিক্যাল পজিশনে দাঁত পুনঃস্থাপন',
      'পাশের দাঁতের সাথে বিশেষ স্প্লিন্টিং ফিক্সেশন ও ফলো-আপ'
    ],
    procedureSteps_en: [
      'Emergency debridement of blood clot with atraumatic saline rinse',
      'Precise re-implantation of tooth into alveolar socket',
      'Functional semi-rigid splinting to adjacent teeth for 2 weeks'
    ],
    symptoms_bn: [
      'আঘাতের কারণে আস্ত দাঁত মুখ থেকে সম্পূর্ণ খুলে পড়ে যাওয়া',
      'দাঁতের খালি সকেট থেকে অনবরত রক্তপাত হওয়া',
      'চোয়াল ও ঠোঁটে তীব্র আঘাত ও ক্ষত সৃষ্টি হওয়া'
    ],
    symptoms_en: [
      'Complete loss of a sound tooth out of the mouth after impact',
      'Continuous hemorrhage from the empty alveolar socket',
      'Associated lip lacerations and acute facial tenderness'
    ],
    urgencyReason_bn: 'দাঁত পড়ে যাওয়ার ৩০ থেকে ৬০ মিনিটের মধ্যে ডাক্তারের কাছে আসলে দাঁতটি চিরতরে বাঁচানো যায়। প্রতি মিনিটের দেরিতে শিকড়ের কোষ মারা গিয়ে দাঁত হারানোর ঝুঁকি বাড়ে।',
    urgencyReason_en: 'Replantation within 30 to 60 minutes yields maximum periodontal survival. Every minute of extra-oral dryness destroys cell viability.'
  },

  // s21: Jaw & Tooth Fracture Management
  s21: {
    serviceId: 's21',
    diseaseOverview_bn: 'দুর্ঘটনায় মুখের চোয়ালের হাড় বা দাঁতের শিকড় ভেঙে গিয়ে দাঁতের স্বাভাবিক কামড় ও মিলন বিচ্ছিন্ন হয়ে যায়। এতে রোগী মুখ বন্ধ করতে পারে না, প্রচণ্ড রক্তপাত ও ব্যথা হয় এবং দ্রুত চিকিৎসা না নিলে চোয়ালের হাড় চিরতরে বাঁকা হয়ে জোড়া লাগতে পারে।',
    diseaseOverview_en: 'Traumatic fractures of alveolar bone or dental root structures displace the dental arch, disrupting normal occlusion. Without emergency stabilization, bones heal in malposition, causing permanent facial deformity.',
    causes_bn: [
      'মোটরসাইকেল বা সড়ক দুর্ঘটনায় মুখের চোয়ালে সরাসরি আঘাত',
      'উঁচু স্থান থেকে মুখ থুবড়ে পড়ে যাওয়া',
      'শারীরিক সংঘর্ষজনিত চোয়ালের ফ্র্যাকচার'
    ],
    causes_en: [
      'Severe blunt force impact from road traffic crashes',
      'Falls from height landing directly on the chin or midface',
      'Physical assault or direct sports trauma fracturing bone'
    ],
    procedure_bn: 'ডিজিটাল আরভিজি এক্স-রেতে ফ্র্যাকচার লাইন সুনির্দিষ্টভাবে চিহ্নিত করা হয়। এরপর ব্যথামুক্ত লোকাল অ্যানেস্থেসিয়ায় স্থানচ্যুত হাড় ও দাঁতকে সঠিক অ্যানাটমিক অবস্থানে এনে বিশেষ ইন্টারডেন্টাল স্প্লিন্ট বা আর্ক-বার ওয়্যারিংয়ের মাধ্যমে অনড়ভাবে ফিক্সেশন করা হয়।',
    procedure_en: 'Digital radiographs pinpoint the fracture planes. Under local anesthesia, the displaced segments are anatomically reduced and immobilized using arch bars, interdental wiring, or rigid splints until clinical union occurs.',
    procedureSteps_bn: [
      'জরুরি রেডিওলজিক্যাল নিরীক্ষা ও ফ্র্যাকচার লাইন ম্যাপিং',
      'অ্যানাটমিক্যাল রিডাকশন করে কামড়ের সঠিক মিলন নিশ্চিতকরণ',
      'স্প্লিন্ট বা ওয়্যারিংয়ের মাধ্যমে রিজিড ইমোবিলাইজেশন'
    ],
    procedureSteps_en: [
      'Emergency radiographic verification of fracture morphology',
      'Precise anatomical reduction restoring pre-injury dental occlusion',
      'Rigid stabilization using orthodontic wire splints and arch bars'
    ],
    symptoms_bn: [
      'মুখ বা চোয়াল বন্ধ করতে না পারা এবং কামড় অসমান লাগা',
      'চোয়াল নাড়াতে গেলে হাড়ের ঘর্ষণ ও মারাত্মক ব্যথা হওয়া',
      'মাড়ি ও দাঁতের ফাঁক দিয়ে রক্তক্ষরণ ও দাঁত স্থানচ্যুত হওয়া'
    ],
    symptoms_en: [
      'Inability to bring upper and lower teeth together in normal bite',
      'Audible bone crepitus and agonizing pain upon jaw movement',
      'Gingival tearing, hemorrhage, and abnormal tooth displacement'
    ],
    urgencyReason_bn: 'জরুরি ফিক্সেশন না করালে হাড় ভুল অবস্থানে জোড়া লেগে মুখ আজীবনের জন্য বিকৃত হয়ে যায় এবং খাবার চিবানোর ক্ষমতা চিরতরে নষ্ট হতে পারে।',
    urgencyReason_en: 'Failure to immobilize fractured segments results in malunion or non-union, causing permanent chronic pain and severe functional masticatory disability.'
  },

  // s22: Dental & Gingival Surgery
  s22: {
    serviceId: 's22',
    diseaseOverview_bn: 'উন্নত পেরিওডন্টাল রোগ বা ওষুধের পার্শ্বপ্রতিক্রিয়ায় মাড়ি অস্বাভাবিকভাবে ফুলে দাঁত ঢেকে ফেলতে পারে (Gingival Hyperplasia), কিংবা মাড়ির নিচে গভীর পকেট তৈরি হয়ে ব্যাকটেরিয়ার ডিপো তৈরি হয় যা সাধারণ ব্রাশিং বা স্কেলিংয়ে দূর হয় না।',
    diseaseOverview_en: 'Advanced periodontal disease or drug-induced gingival enlargement creates deep diseased pockets and hypertrophic gum flaps. Standard scaling cannot reach these subgingival pathogens, requiring specialized periodontal surgery.',
    causes_bn: [
      'দীর্ঘমেয়াদী তীব্র মাড়ির ইনফেকশন (Advanced Periodontitis)',
      'উচ্চ রক্তচাপ বা এপিলেপ্সির ওষুধের প্রভাবে মাড়ির অতিবৃদ্ধি',
      'মাড়ির গভীর পকেটে লুকানো ব্যাকটেরিয়া ও টার্টার জমা'
    ],
    causes_en: [
      'Chronic severe periodontitis with pocket depths exceeding 5mm',
      'Medication-induced gingival fibromatosis (calcium channel blockers)',
      'Subgingival calculus deposits protected within deep infrabony defects'
    ],
    procedure_bn: 'ডা. অনি মাইক্রো-সার্জিক্যাল পদ্ধতিতে ফ্ল্যাপ তৈরি করে বা জিঞ্জিভেকটমির মাধ্যমে সংক্রামিত মাড়ি নিখুঁতভাবে ছেঁটে ফেলেন। এরপর শিকড়ের গভীরে জমে থাকা পাথর পরিষ্কার করে মাড়িকে দাঁতের সাথে টাইটভাবে সেলাই করে দেন যাতে দাঁতের স্থায়িত্ব নিশ্চিত হয়।',
    procedure_en: 'Under local anesthesia, Dr. Ony performs gingivectomy or flap debridement. The diseased pocket lining and deep calculus are eradicated under direct vision. The gum contours are sculpted and sutured for firm bone re-attachment.',
    procedureSteps_bn: [
      'পেরিওডন্টাল চার্টিং ও মাড়ির গভীর পকেট মূল্যায়ন',
      'ব্যথামুক্ত সার্জিক্যাল ফ্ল্যাপ বা জিঞ্জিভেকটমি সম্পন্নকরণ',
      'মাড়ির স্বাভাবিক মার্জিন পুনর্গঠন ও অ্যান্টিসেপটিক ড্রেসিং'
    ],
    procedureSteps_en: [
      'Comprehensive periodontal pocket probing and mapping',
      'Painless flap elevation or surgical gingivectomy recontouring',
      'Subgingival root planing, biological pocket reduction, and suturing'
    ],
    symptoms_bn: [
      'মাড়ি মাত্রাতিরিক্ত ফুলে দাঁত ঢেকে যাওয়া ও রক্ত পড়া',
      'দাঁত ও মাড়ির খাঁজ থেকে অনবরত দুর্গন্ধযুক্ত পুঁজ নির্গমন',
      'খাবার খেতে গেলে মাড়িতে তীব্র খোঁচা ও ফোলা ভাব অনুভব'
    ],
    symptoms_en: [
      'Severe gum overgrowth covering tooth surfaces with easy bleeding',
      'Continuous foul-smelling suppurative exudate from gingival pockets',
      'Painful mastication due to inflamed, hyperplastic gum margins'
    ],
    urgencyReason_bn: 'মাড়ির সংক্রমণ হাড় পর্যন্ত পৌঁছে গেলে সুস্থ দাঁতের হাড়ের সমর্থন সম্পূর্ণ ধসে পড়ে। সার্জারি সময়মতো মাড়ি ও হাড়কে আবার মজবুত করে।',
    urgencyReason_en: 'Allowing deep pockets to persist leads to rapid horizontal and vertical bone collapse, making total tooth loss unavoidable.'
  },

  // s23: Partial Denture – Acrylic
  s23: {
    serviceId: 's23',
    diseaseOverview_bn: 'মুখের এক বা একাধিক দাঁত হারিয়ে ফেলা রোগীদের জন্য সহজে খোলা-পড়া যায় এমন একটি বহুল প্রচলিত ও অত্যন্ত সাশ্রয়ী কৃত্রিম দাঁতের সমাধান। এটি চিবানোর ক্ষমতা ও মুখের রূপরেখা স্বাভাবিক রাখতে প্রাথমিক ভূমিকা পালন করে।',
    diseaseOverview_en: 'A cost-effective, removable prosthetic solution replacing single or multiple missing teeth. It restores essential masticatory function and prevents premature facial muscle collapse.',
    causes_bn: [
      'ক্যারিজ বা মাড়ির রোগের কারণে এক বা একাধিক দাঁত হারাতে হওয়া',
      'বাজেট-বান্ধব ও সহজে ব্যবহারযোগ্য কৃত্রিম দাঁতের প্রয়োজন',
      'স্থায়ী চিকিৎসার পূর্বে ট্রানজিশনাল দাঁত হিসেবে ব্যবহারের চাহিদা'
    ],
    causes_en: [
      'Tooth loss resulting from neglected decay or advanced mobility',
      'Need for an accessible, budget-conscious removable restoration',
      'Interim tooth replacement prior to advanced prosthetics'
    ],
    procedure_bn: 'রোগীর মুখের মাড়ির সূক্ষ্ম মেজারমেন্ট বা ইমপ্রেশন নেওয়া হয়। এরপর মাড়ির রঙের পিঙ্ক অ্যাক্রিলিক বেজের উপর টেকসই কৃত্রিম দাঁত ও ক্ল্যাম্প বসিয়ে ডেনচারটি কাস্টম-ফিট করা হয় যা রোগী নিজেই প্রয়োজনমতো খুলতে ও পরতে পারেন।',
    procedure_en: 'Accurate dental impressions record the contours of the dental ridge. In the dental laboratory, shade-matched teeth are set on a high-impact pink acrylic resin base, fitted with retentive wire clasps for custom stability.',
    procedureSteps_bn: [
      'মাড়ি ও দাঁতের নিখুঁত ডেন্টাল ইমপ্রেশন গ্রহণ',
      'ল্যাবরেটরিতে কাস্টম অ্যাক্রিলিক ডেনচার নির্মাণ ও বাইট ট্রায়াল',
      'মুখে পরিয়ে নিখুঁত ফিটিং ও রক্ষণাবেক্ষণ পদ্ধতি প্রদর্শন'
    ],
    procedureSteps_en: [
      'Accurate anatomical impression recording ridge dynamics',
      'Laboratory wax try-in and bite verification on acrylic plate',
      'Final delivery, functional bite adjustment, and patient maintenance training'
    ],
    symptoms_bn: [
      'এক বা একাধিক দাঁত না থাকায় খাবার খেতে ও চাবাতে কষ্ট হওয়া',
      'দাঁত না থাকায় কথা বলার সময় শব্দ উচ্চারণে জড়তা আসা',
      'দাঁতহীন ফাঁকা জায়গা নিয়ে সামাজিক অস্বস্তিতে ভোগা'
    ],
    symptoms_en: [
      'Difficulty grinding food due to gaps in the dental arch',
      'Speech slurring caused by missing anterior or posterior stops',
      'Aesthetic hesitation to speak or smile freely in public'
    ],
    urgencyReason_bn: 'দাঁত তোলার পর ফাঁকা ফেলে রাখলে পাশের দাঁত হেলে যায় এবং চোয়ালের হাড় দ্রুত শুকিয়ে যায়। দ্রুত কৃত্রিম দাঁত বসালে মুখের ভারসাম্য অক্ষত থাকে।',
    urgencyReason_en: 'Leaving empty spaces accelerates ridge resorption and shifts remaining teeth out of alignment, complicating future prosthetic interventions.'
  },

  // s24: Fibre Partial Denture
  s24: {
    serviceId: 's24',
    diseaseOverview_bn: 'সাধারণ অ্যাক্রিলিক ডেনচার অতিরিক্ত চাবানোর চাপে বা অসাবধানতায় হাত থেকে পড়ে গেলে মাঝখান দিয়ে ভেঙে যাওয়ার ঝুঁকি থাকে। এই দুর্বলতা দূর করতে ফাইবার-রিইনফোর্সড উন্নত ম্যাটেরিয়াল দিয়ে তৈরি করা হয় যা অনেক বেশি মজবুত ও টেকসই।',
    diseaseOverview_en: 'Standard acrylic plates are prone to mid-line fatigue fractures under heavy chewing stress or accidental dropping. High-tensile fiber-reinforced dentures provide superior fracture toughness and lightweight resilience.',
    causes_bn: [
      'রোগীর ভারী কামড়ের চাপ (Heavy bite force)',
      'প্রচলিত অ্যাক্রিলিক ডেনচার বারবার ভেঙে যাওয়ার ইতিহাস',
      'পাতলা অথচ দীর্ঘস্থায়ী কৃত্রিম দাঁতের প্রত্যাশা'
    ],
    causes_en: [
      'High masticatory occlusal load fracturing ordinary acrylics',
      'History of recurrent denture fractures during usage',
      'Patient desire for a thinner, featherweight, yet ultra-strong plate'
    ],
    procedure_bn: 'অ্যাক্রিলিক রেজিনের ভেতরে উচ্চশক্তির বায়োকম্প্যাটিবল গ্লাস বা কার্বন ফাইবার মেশ (Mesh) সংযোজন করা হয়। ফলে ডেনচারটির ফাটল প্রতিরোধী ক্ষমতা বহুগুণ বৃদ্ধি পায় এবং মাড়িতে অনেক বেশি আরামদায়ক ও নিরাপদ অনুভূতি দেয়।',
    procedure_en: 'A silanized micro-glass fiber matrix is embedded directly into the acrylic base during polymerisation. This distributes bite stresses evenly, dramatically lowering fracture risks while enabling a more slender, comfortable palate.',
    procedureSteps_bn: [
      'নির্ভুল আর্চ ইমপ্রেশন ও কামড়ের ভারসাম্য নিরীক্ষা',
      'ল্যাবে ফাইবার মেশ ইনকর্পোরেশন ও প্রেসার পলিমারাইজেশন',
      'মসৃণ সারফেস ফিনিশিং ও কমফোর্ট টেস্ট'
    ],
    procedureSteps_en: [
      'High-precision impression and centric occlusal record',
      'Internal fiber mesh integration during pressurized polymerization',
      'High-gloss smooth border finishing and intra-oral bite balancing'
    ],
    symptoms_bn: [
      'পূর্বে ব্যবহার করা কৃত্রিম দাঁত মাঝখান থেকে ভেঙে যাওয়ার তিক্ত অভিজ্ঞতা',
      'মোটা ডেনচারে মুখে অস্বস্তি বা বমি বমি ভাব হওয়া',
      'শক্ত খাবার আস্থার সাথে খাওয়ার সক্ষমতা না থাকা'
    ],
    symptoms_en: [
      'Frustration with previously fractured standard plastic dentures',
      'Bulky traditional plates provoking a persistent gag reflex',
      'Insecurity when biting into dense, firm meals'
    ],
    urgencyReason_bn: 'ফাইবার প্রযুক্তির ডেনচার দীর্ঘদিন অক্ষত থাকে এবং ঘন ঘন মেরামতের ঝামেলা ও অতিরিক্ত খরচ থেকে রোগীকে সম্পূর্ণ মুক্তি দেয়।',
    urgencyReason_en: 'Fiber-reinforced prosthetics eliminate chronic repair expenses, providing reliable long-term functionality without recurring crack anxiety.'
  },

  // s25: Partial Denture (Standard)
  s25: {
    serviceId: 's25',
    diseaseOverview_bn: 'হারিয়ে যাওয়া একাধিক দাঁতের চিবানোর স্বাভাবিক ক্ষমতা, ঠোঁট ও গালের সমর্থন এবং ব্যক্তিত্বের পূর্ণ রূপ ফিরিয়ে আনার জন্য একটি ভারসাম্যপূর্ণ ও কাস্টমাইজড আংশিক কৃত্রিম দাঁতের চিকিৎসা।',
    diseaseOverview_en: 'A balanced, customized partial denture replacing multiple missing natural teeth, restoring phonetics, lip support, and healthy masticatory rhythm.',
    causes_bn: [
      'বার্ধক্য বা ক্ষয়ের কারণে বেশ কয়েকটি দাঁত হারানো',
      'খাবার চাবানোর সঠিক তল না থাকা',
      'পর্যাপ্ত বাজেটে নির্ভরযোগ্য রিস্টোরেশনের প্রয়োজন'
    ],
    causes_en: [
      'Loss of several posterior or anterior teeth over time',
      'Lack of opposing occlusal contacts leading to digestive strain',
      'Need for a robust, functional prosthetic replacement'
    ],
    procedure_bn: 'মাড়ির রিট্রিভাল অ্যানাটমি পরীক্ষা করে সুনির্দিষ্ট কাস্টম ট্রে দিয়ে মাপ নেওয়া হয়। চিবানোর অক্ষ (Vertical Dimension) ঠিক রেখে ল্যাবে তৈরি দাঁত মুখে ট্রায়াল দেওয়া হয় এবং চূড়ান্ত সমন্বয়ের পর ডেলিভারি করা হয়।',
    procedure_en: 'Custom impression trays capture ridge anatomy under physiological pressure. Correct vertical dimension and bite harmony are verified during wax try-in, culminating in a stable, comfortable prosthesis.',
    procedureSteps_bn: [
      'কাস্টম ট্রে দ্বারা নির্ভুল ডেন্টাল আর্চ ইমপ্রেশন গ্রহণ',
      'বাইট রেজিস্ট্রেশন ও ওয়াক্স ট্রায়ালে দাঁতের শেড যাচাই',
      'চূড়ান্ত ফিনিশিং ও মাড়ির সাথে সংবেদনশীলতা সমন্বয়'
    ],
    procedureSteps_en: [
      'Custom impression tray recording functional ridge borders',
      'Wax try-in verification ensuring accurate shade and occlusion',
      'Final placement with meticulous border trimming for zero irritation'
    ],
    symptoms_bn: [
      'দাঁত না থাকায় শক্ত খাবার গিলতে গিয়ে পেটে গ্যাস ও হজমে সমস্যা',
      'মুখের দুই পাশের গাল কিছুটা দেবে গিয়ে বয়স্ক দেখানো',
      'আত্মীয়-স্বজনের সাথে হাসিমুখে কথা বলতে অস্বস্তি'
    ],
    symptoms_en: [
      'Digestive issues from swallowing poorly chewed food particles',
      'Hollow cheeks and prematurely aged facial profile',
      'Hesitation to eat and converse freely in social gatherings'
    ],
    urgencyReason_bn: 'খাবার ভালো করে চিবিয়ে না খেলে পাকস্থলীর রোগ বাড়ে। কৃত্রিম দাঁত মুখের চিবানোর ক্ষমতা ফিরিয়ে দিয়ে শরীরকে সুস্থ রাখে।',
    urgencyReason_en: 'Inadequate mastication directly impairs gastrointestinal absorption. Restoring dental arches is foundational to overall systemic nutrition.'
  },

  // s26: Flexible Denture (Valplast)
  s26: {
    serviceId: 's26',
    diseaseOverview_bn: 'প্রচলিত শক্ত কৃত্রিম দাঁতের মেটাল তার বা ক্ল্যাম্প হাসলে দৃশ্যমান হয়ে পড়ে এবং শক্ত অ্যাক্রিলিক মাড়ির নরম ত্বকে ঘষা লেগে যন্ত্রণাদায়ক ঘা তৈরি করে। এ সমস্যা দূর করতে আধুনিক চিকিৎসায় এসেছে নরম ও নমনীয় ফ্লেক্সিবল ডেনচার।',
    diseaseOverview_en: 'Traditional acrylic dentures feature unsightly metal wire clasps that show when smiling and rigid plates that cause painful pressure sores. Valplast flexible nylon prosthetics resolve these issues with superior ergonomics.',
    causes_bn: [
      'কঠিন অ্যাক্রিলিক ডেনচারে মাড়িতে ঘন ঘন ক্ষত ও তীব্র অস্বস্তি',
      'হাসলে মেটাল তার দেখা যাওয়ার নান্দনিক অনীহা',
      'মাড়ির হাড় অসম বা খাঁজযুক্ত (Undercut) থাকা'
    ],
    causes_en: [
      'Recurrent mucosal ulcerations beneath rigid denture bases',
      'Aesthetic refusal to tolerate visible metal retention clasps',
      'Presence of severe bony undercuts complicating rigid insertion'
    ],
    procedure_bn: 'মেডিকেল গ্রেড সুপার-ফ্লেক্সিবল থার্মোপ্লাস্টিক নাইলন দিয়ে এটি তৈরি করা হয়। এতে কোনো ধাতব তার থাকে না; মাড়ির রঙের নমনীয় ক্ল্যাম্প মাড়ির সাথে পুরোপুরি মিশে যায়। এটি শতভাগ অভঙ্গুর এবং মাড়ির ওপর একদম নরম তুলোর মতো বসে থাকে।',
    procedure_en: 'Fabricated from biocompatible, super-elastic thermoplastic nylon resin. With no metal clasps, its translucent tissue-colored retention wings blend invisibly against natural gums, providing 100% shatter-proof comfort.',
    procedureSteps_bn: [
      'মাড়ির গভীর আন্ডারকাট রেকর্ড করে বিশেষ ইমপ্রেশন গ্রহণ',
      'থার্মো-ইনজেকশন প্রযুক্তিতে ফ্লেক্সিবল নাইলন কাস্টিং',
      'মুখে স্থাপন—কোনো মেটাল তার ছাড়াই নিখুঁত গ্রিপ ও সৌন্দর্য'
    ],
    procedureSteps_en: [
      'Precision elastic impression recording tissue undercuts',
      'Thermal-injection molding of medical-grade Valplast nylon',
      'Comfort delivery with seamless gingival camouflage and zero metal'
    ],
    symptoms_bn: [
      'সাধারণ শক্ত কৃত্রিম দাঁত পরলে মাড়ি কেটে যাওয়া বা ঘা হওয়া',
      'কৃত্রিম দাঁতের মেটাল ক্ল্যাম্প হাসলে স্পষ্ট ফুটে ওঠা',
      'হালকা ও নরম দাঁতের প্রত্যাশা যা মুখে পরে আরাম পাওয়া যায়'
    ],
    symptoms_en: [
      'Painful cuts and sores triggered by hard plastic dentures',
      'Embarrassment from visible metallic clasps on front teeth',
      'Desire for an ultra-lightweight, flexible tooth plate that feels natural'
    ],
    urgencyReason_bn: 'ফ্লেক্সিবল ডেনচার কখনো ভাঙে না এবং মাড়ির কোনো ক্ষতি করে না। এটি আরাম ও নান্দনিকতার এক অপূর্ব মেলবন্ধন।',
    urgencyReason_en: 'Valplast dentures are unbreakable, highly biocompatible, and virtually undetectable, offering the gold-standard in removable comfort.'
  },

  // s27: Cast Partial Denture
  s27: {
    serviceId: 's27',
    diseaseOverview_bn: 'আংশিক দাঁতহীন রোগীদের জন্য সবচেয়ে মজবুত, নিখুঁত ও দীর্ঘস্থায়ী অপসারণযোগ্য কৃত্রিম দাঁত। সাধারণ প্লাস্টিক ডেনচারের মতো এটি মাড়ির হাড়ের ওপর চেপে বসে হাড়ের ক্ষতি করে না, বরং বাকি সুস্থ দাঁতের ওপর ভর দিয়ে সম্পূর্ণ স্থিতিশীল থাকে।',
    diseaseOverview_en: 'The definitive gold-standard in removable partial prosthetics. Unlike mucosal-borne plastic plates that compress and resorb the jawbone, cast metal framework dentures are tooth-borne, delivering rock-solid stability.',
    causes_bn: [
      'মাড়ির হাড় অতিরিক্ত নরম বা সংকুচিত হওয়া',
      'সাধারণ ডেনচার চিবানোর সময় নড়ে যাওয়া বা আলগা হওয়া',
      'আজকের দিনে দীর্ঘমেয়াদী সর্বোচ্চ আরাম ও স্থায়িত্বের চাহিদা'
    ],
    causes_en: [
      'Compromised or flat alveolar ridge intolerant to mucosal load',
      'Instability and rocking movements of conventional acrylic plates',
      'Desire for maximum biomechanical stability and long-term durability'
    ],
    procedure_bn: 'রোগীর মুখের কাস্ট তৈরি করে বিশেষ ডেন্টাল সার্ভেয়ার মেশিনে ডিজাইন করা হয়। এরপর কোবাল্ট-ক্রোম বা টাইটানিয়াম অ্যালয়ের পাতলা ও নিখুঁত মেটাল ফ্রেমওয়ার্ক কাস্টিং করে তৈরি করা হয় যা প্রাকৃতিক দাঁতে সুনির্দিষ্ট রেস্ট-সিটের মাধ্যমে লক হয়ে থাকে।',
    procedure_en: 'Study casts undergo surveyor analysis to optimize path of insertion. A custom cobalt-chromium skeleton is cast with precision occlusal rests and clasps, directing chewing forces down the long axis of remaining teeth.',
    procedureSteps_bn: [
      'দাঁতের ওপর সুনির্দিষ্ট রেস্ট-সিট প্রিপারেশন ও সার্ভেয়ার অ্যানালাইসিস',
      'ল্যাবে কম্পিউটারাইজড মেটাল ফ্রেম কাস্টিং ও ট্রায়াল',
      'অ্যাক্রিলিক দাঁত সংযোজন করে চূড়ান্ত মুখে লক-ইন ফিটিং'
    ],
    procedureSteps_en: [
      'Precision occlusal rest seat preparations on natural anchor teeth',
      'Laboratory casting and oral try-in of the thin metal framework',
      'High-impact tooth processing and permanent occlusal equilibration'
    ],
    symptoms_bn: [
      'সাধারণ ডেনচার পরে খাবার খেলে ডেনচার নড়ে গিয়ে খাবার গিলতে কষ্ট হওয়া',
      'ডেনচারের নিচে খাবার বারবার আটকে মাড়ি লাল হয়ে যাওয়া',
      'পাতলা ও নিখুঁত দাঁতের চাহিদা যা মুখে ভারি লাগবে না'
    ],
    symptoms_en: [
      'Denture continually rocking or dislodging during normal chewing',
      'Repeated food impaction beneath the plate inflaming gums',
      'Desire for an ultra-thin, rigid palatal design that does not obstruct taste'
    ],
    urgencyReason_bn: 'কাস্ট পার্টিয়াল ডেনচার মুখের অবশিষ্ট সুস্থ দাঁত ও হাড়কে দীর্ঘ বহু বছর সুরক্ষিত রাখে এবং নড়াচড়া ছাড়া আস্থার সাথে চিবানোর সুযোগ দেয়।',
    urgencyReason_en: 'Tooth-supported cast partials preserve alveolar bone contours from progressive resorption, providing incomparable chewing efficiency.'
  },

  // s28: Complete Denture
  s28: {
    serviceId: 's28',
    diseaseOverview_bn: 'বার্ধক্য বা জটিল রোগের কারণে যখন ওপরের বা নিচের পাটির সমস্ত দাঁত সম্পূর্ণ পড়ে যায়, তখন রোগীর মুখমণ্ডল কুঁচকে যায়, খাবার খাওয়া অসম্ভব হয়ে পড়ে এবং কথা বলার স্বাভাবিক ক্ষমতা হারিয়ে যায়। ফুল ডেনচার সম্পূর্ণ নতুন মুখের কাঠামো ফিরিয়ে আনে।',
    diseaseOverview_en: 'Complete edentulism (loss of all natural teeth) leads to profound facial collapse, inability to digest solid food, and severely compromised speech phonetics. Full complete dentures restore facial vertical height and function.',
    causes_bn: [
      'বার্ধক্যজনিত কারণে সমস্ত প্রাকৃতিক দাঁত পড়ে যাওয়া',
      'মারাত্মক মাড়ির ইনফেকশন বা ক্যারিজের কারণে সব দাঁত তোলা লাগা',
      'পুরনো আলগা ডেনচার আর কোনো কাজে না আসা'
    ],
    causes_en: [
      'Age-related cumulative loss of all natural dentition',
      'Severe generalized periodontitis requiring clearance of remaining teeth',
      'Severely worn-down, ill-fitting old dentures losing retention'
    ],
    procedure_bn: 'ডা. অনি একাধিক ধাপে বর্ডার মোল্ডিং ও স্পেশাল ট্রে দ্বারা মাড়ির সূক্ষ্ম মাংসপেশির গতিবিধি রেকর্ড করেন। এরপর চোয়ালের কামড়ের উচ্চতা (Vertical Dimension) ও হাসির লাইন নিখুঁতভাবে নির্ধারণ করে প্রাকৃতিক সাকশন (Suction) যুক্ত আরামদায়ক ফুল সেট তৈরি করেন।',
    procedure_en: 'Dr. Ony utilizes multi-stage anatomical and functional border-molding impressions to capture muscular seal dynamics. Jaw relation and vertical dimension are recorded to establish optimal peripheral suction and natural facial aesthetics.',
    procedureSteps_bn: [
      'প্রাইমারি ও স্পেশাল কাস্টম বর্ডার মোল্ডিং ইমপ্রেশন গ্রহণ',
      'জ-রিলেশন ও ওয়াক্স টিথ ট্রায়ালে হাসির রূপরেখা চূড়ান্তকরণ',
      'প্রাকৃতিক সাকশন ফিটিং নিশ্চিত করে নতুন দাঁতের সেট ডেলিভারি'
    ],
    procedureSteps_en: [
      'Anatomical preliminary and border-molded functional impressions',
      'Centric jaw relation recording and aesthetic wax try-in',
      'Final delivery ensuring peripheral atmospheric seal and bite equilibrium'
    ],
    symptoms_bn: [
      'মুখে কোনো দাঁত না থাকায় শক্ত কোনো খাবার চিবিয়ে খেতে না পারা',
      'গাল ভেতরে ঢুকে গিয়ে মুখে বয়সের অনেক বেশি ছাপ পড়া',
      'কথা স্পষ্ট না হওয়া ও পরিবারে একাকীত্ব ও সংকোচে ভোগা'
    ],
    symptoms_en: [
      'Total inability to chew solid nutrition, resulting in poor health',
      'Severe facial collapse, sunken cheeks, and thinned lips',
      'Indistinct slurred speech provoking profound social isolation'
    ],
    urgencyReason_bn: 'দাঁত ছাড়া বয়স্কদের পুষ্টিহীনতা মারাত্মকভাবে বৃদ্ধি পায়। নিখুঁত ফুল ডেনচার একজন মানুষের জীবনের আনন্দ, খাবার উপভোগ ও আত্মবিশ্বাস সম্পূর্ণ ফিরিয়ে দেয়।',
    urgencyReason_en: 'Edentulism induces gastrointestinal malnutrition and emotional decline. A custom full denture revitalizes life satisfaction, chewing health, and dignity.'
  },

  // s29: Pediatric Dental Filling
  s29: {
    serviceId: 's29',
    diseaseOverview_bn: 'অনেকেই মনে করেন শিশুদের দুধ দাঁত তো পড়েই যাবে, তাই চিকিৎসার দরকার নেই—এটি একটি মারাত্মক ভুল ধারণা। দুধ দাঁতে ক্যাভিটি হলে তীব্র ব্যথা ছাড়াও এর নিচে থাকা স্থায়ী দাঁতের কুঁড়ি (Permanent tooth germ) ক্ষতিগ্রস্ত হয় এবং ভবিষ্যৎ দাঁত বাঁকা ও দুর্বল হয়ে ওঠে।',
    diseaseOverview_en: 'The belief that baby teeth do not matter because they fall out is a dangerous misconception. Untreated decay in primary teeth causes severe pain, spreads infection to underlying permanent tooth buds, and derails dental spacing.',
    causes_bn: [
      'ঘুমানোর সময় বোতলে দুধ বা মিষ্টি তরল পানের অভ্যাস (Nursing Caries)',
      'চকলেট, ক্যান্ডি ও চিপসের অবশিষ্টাংশ দাঁতের খাঁজে জমে থাকা',
      'শিশুদের নিয়মিত ও সঠিক নিয়মে দাঁত ব্রাশ না করানো'
    ],
    causes_en: [
      'Frequent bedtime consumption of milk bottles or sugary juices',
      'High consumption of sticky candies, refined chocolates, and snacks',
      'Inadequate parental supervision during morning and bedtime brushing'
    ],
    procedure_bn: 'ডা. অনি অত্যন্ত মমতাময়ী ও শিশুবান্ধব পরিবেশে কোনো প্রকার মানসিক ভয় বা ব্যথা ছাড়া ক্যাভিটি পরিষ্কার করেন। এরপর ফ্লোরাইড সমৃদ্ধ গ্লাস আয়নোমার সিমেন্ট (GIC) দিয়ে ফিলিং করেন যা দাঁতকে শক্ত করে এবং ভবিষ্যৎ ক্যারিজ থেকে সুরক্ষিত রাখে।',
    procedure_en: 'Dr. Ony employs empathetic, child-friendly behavioral management to eliminate dental anxiety. Decay is gently cleared, and tooth-restorative, fluoride-releasing Glass Ionomer Cement (GIC) is placed to actively reinforce the enamel.',
    procedureSteps_bn: [
      'শিশুর সাথে বন্ধুত্বপূর্ণ সম্পর্ক তৈরি ও ভীতি দূরীকরণ',
      'ব্যথাহীন ও মৃদু গতিতে ক্ষতিকর ক্যাভিটি অপসারণ',
      'ফ্লোরাইড নিঃসরণকারী বায়ো-অ্যাক্টিভ ফিলিং দিয়ে খাঁজ সিলিং'
    ],
    procedureSteps_en: [
      'Empathetic tell-show-do approach dispelling dental apprehension',
      'Gentle, atraumatic debridement of infected softened dentin',
      'Placement of biocompatible, fluoride-releasing glass ionomer seal'
    ],
    symptoms_bn: [
      'শিশু খাবার চিবিয়ে খেতে না চেয়ে মুখে জমিয়ে রাখা বা কান্না করা',
      'দাঁতে কালো গর্ত দেখা দেওয়া এবং রাতে ব্যথায় ঘুম ভেঙে যাওয়া',
      'মিষ্টি বা ঠাণ্ডা পানি মুখে দিলে শিশু অস্বস্তিতে চিৎকার করা'
    ],
    symptoms_en: [
      'Child refusing to chew food, holding meals in mouth, or crying',
      'Visible black holes or pits on milk molars causing night waking',
      'Sudden distress or crying when consuming cold water or sweets'
    ],
    urgencyReason_bn: 'দুধ দাঁত অকালে নষ্ট হলে স্থায়ী দাঁত ভুল জায়গায় ওঠে এবং ভবিষ্যতে ব্যয়বহুল ব্রেসেস চিকিৎসার প্রয়োজন হয়। এখনই ফিলিং করে দুধ দাঁত সংরক্ষণ অপরিহার্য।',
    urgencyReason_en: 'Premature loss of primary molars collapses dental arch space, guaranteeing crooked permanent teeth that necessitate costly orthodontics later.'
  },

  // s30: Orthodontic Appliance (Braces)
  s30: {
    serviceId: 's30',
    diseaseOverview_bn: 'দাঁত উঁচু-নিচু, আঁকাবাঁকা, অতিরিক্ত ফাঁকা কিংবা সামনে এগিয়ে থাকা শুধু মুখের চেহারাই নষ্ট করে না, বরং এমন দাঁতে ব্রাশের ব্রিসল পৌঁছাতে পারে না বলে দ্রুত পাথর জমে মাড়ির মারাত্মক রোগ হয় এবং খাবার সঠিকভাবে চর্বন হয় না।',
    diseaseOverview_en: 'Crowded, crooked, spaced, or protruding teeth impair facial aesthetics and obstruct proper oral hygiene. Misaligned teeth harbor calculus traps, precipitate early gum disease, and strain jaw joints.',
    causes_bn: [
      'বংশগত বা জেনেটিক কারণে চোয়ালের চেয়ে দাঁতের আকার বড় হওয়া',
      'শৈশবে অতিরিক্ত আঙুল চোষা বা মুখ দিয়ে শ্বাস নেওয়ার অভ্যাস',
      'দুধ দাঁত সময়ের অনেক আগে বা অনেক দেরিতে পড়ে যাওয়া'
    ],
    causes_en: [
      'Genetic mismatch between jaw dimensions and tooth size',
      'Childhood habits like prolonged thumb sucking or mouth breathing',
      'Premature loss or prolonged retention of deciduous milk teeth'
    ],
    procedure_bn: 'রোগীর মুখের প্রোফাইল ও এক্স-রে স্টাডি করে প্রতিটি দাঁতে বিশেষ মেডিকেল গ্রেড মেটাল বা সিরামিক ব্র্যাকেট বসানো হয়। এরপর নিকেল-টাইটানিয়াম মেমরি ওয়্যারের মৃদু ও সুষম বল প্রয়োগ করে প্রতি মাসে ধাপে ধাপে দাঁতগুলোকে তাদের প্রাকৃতিক আর্চে সোজা ও সুন্দর করা হয়।',
    procedure_en: 'After cephalometric analysis and photographic profiling, precision metal or ceramic brackets are bonded to enamel surfaces. Super-elastic nickel-titanium archwires apply gentle, continuous bio-forces to guide teeth into alignment.',
    procedureSteps_bn: [
      'অর্থোডন্টিক মডেল, ফটোগ্রাফ ও ডিজিটাল প্ল্যানিং',
      'দাঁতের এনামেলে নির্ভুল পজিশনে ব্র্যাকেট বন্ডিং ও আর্চ ওয়্যার স্থাপন',
      'মাসিক অ্যাডজাস্টমেন্ট ও চিকিৎসা শেষে রিটেইনার দিয়ে ফলাফল স্থায়ী করা'
    ],
    procedureSteps_en: [
      'Diagnostic photographic and cephalometric orthodontic planning',
      'Precision enamel bracket bonding and super-elastic archwire engagement',
      'Monthly progressive adjustments followed by retention therapy'
    ],
    symptoms_bn: [
      'দাঁত একটির ওপর আরেকটি উঠে থাকা বা অস্বাভাবিক ফাঁকা থাকা',
      'হাসার সময় হাত দিয়ে মুখ ঢেকে রাখার সামাজিক হীনমন্যতা',
      'সামনের দাঁত বেশি এগিয়ে থাকায় ঠোঁট দিয়ে স্বাভাবিকভাবে মুখ বন্ধ না হওয়া'
    ],
    symptoms_en: [
      'Severely crowded, overlapping, or widely spaced front teeth',
      'Habit of covering the mouth when laughing due to low confidence',
      'Protruding front teeth preventing comfortable lip closure'
    ],
    urgencyReason_bn: 'কৈশোর ও তরুণ বয়সে দাঁত সোজা করা সবচেয়ে দ্রুত ও সহজ। সঠিক বিন্যাসের দাঁত সারাজীবন সুস্থ থাকে এবং মানুষের আত্মবিশ্বাস আমূল বদলে দেয়।',
    urgencyReason_en: 'Correcting alignment creates a balanced facial profile, facilitates easy brushing, prevents premature tooth wear, and delivers a captivating smile for life.'
  },

  // s31: Dental Implant
  s31: {
    serviceId: 's31',
    diseaseOverview_bn: 'দাঁত হারানোর পর চোয়ালের হাড় প্রাকৃতিকভাবে শুকিয়ে ও ক্ষয়ে যেতে থাকে। পাশের সুস্থ দাঁত না কেটে অথবা কোনো কৃত্রিম খোলা-পড়া ডেনচার ছাড়া আজীবনের জন্য একদম প্রাকৃতিক দাঁতের মতো হাড়ের সাথে স্থায়ী দাঁত পাওয়ার বিশ্বমানের একমাত্র সমাধান ডেন্টাল ইমপ্ল্যান্ট।',
    diseaseOverview_en: 'Following tooth extraction, alveolar bone naturally atrophies and resorbs. Dental implants represent the modern gold standard, replacing the missing root with titanium to permanently halt bone loss without touching adjacent healthy teeth.',
    causes_bn: [
      'যেকোনো বয়সে দুর্ঘটনা বা ক্যারিজের কারণে দাঁত স্থায়ীভাবে হারানো',
      'পাশের সুস্থ দাঁত কেটে ব্রিজ বানাতে তীব্র অনীহা',
      'আজীবন স্থায়ী ও প্রাকৃতিক দাঁতের মতো শক্ত কামড়ের প্রত্যাশা'
    ],
    causes_en: [
      'Permanent tooth loss from trauma, decay, or root fracture',
      'Desire to avoid cutting adjacent sound teeth for a conventional bridge',
      'Demand for a lifelong, non-removable tooth with 100% natural chewing force'
    ],
    procedure_bn: 'সম্পূর্ণ জীবাণুমুক্ত ডেন্টাল সার্জিক্যাল থিয়েটারে চোয়ালের হাড়ের মধ্যে আন্তর্জাতিক সার্টিফায়েড বায়োকম্প্যাটিবল টাইটানিয়াম পোস্ট স্থাপন করা হয়। হাড়ের সাথে টাইটানিয়াম জোড়া লাগার (Osseointegration) পর তার ওপর কাস্টম অ্যাবাটমেন্ট ও প্রিমিয়াম জিরকোনিয়া ক্রাউন স্থায়ীভাবে বসানো হয়।',
    procedure_en: 'In a sterile operatory, a medical-grade titanium fixture is inserted into the jawbone using guided precision osteotomy. After osseointegration, a custom abutment and lifelike zirconia ceramic crown are permanently anchored.',
    procedureSteps_bn: [
      'ডিজিটাল আরভিজি এক্স-রে ও হাড়ের ঘনত্ব যাচাই করে সুনির্দিষ্ট প্ল্যান',
      'ব্যথাহীন লোকাল অ্যানেস্থেসিয়ায় টাইটানিয়াম ইমপ্ল্যান্ট স্থাপন',
      'হাড়ের সাথে জোড়া লাগার পর পারফেক্ট জিরকোনিয়া দাঁত সংযোজন'
    ],
    procedureSteps_en: [
      'Radiographic alveolar bone density evaluation and surgical mapping',
      'Painless surgical placement of sterile biocompatible titanium fixture',
      'Post-integration connection of custom abutment and monolithic crown'
    ],
    symptoms_bn: [
      'হারিয়ে যাওয়া দাঁতের স্থানে স্থায়ী দাঁতের তীব্র প্রয়োজনীয়তা',
      'খাবার খেতে গিয়ে কৃত্রিম ডেনচার খুলে যাওয়ার অস্বস্তি',
      'পাশের ভালো দাঁতের কোনো ক্ষতি না করে স্থায়ী সমাধান চাওয়া'
    ],
    symptoms_en: [
      'Missing tooth causing functional chewing deficit and self-consciousness',
      'Frustration with loose, uncomfortable removable dentures',
      'Aversion to grinding down adjacent virgin teeth for bridges'
    ],
    urgencyReason_bn: 'দাঁত তোলার পর বেশিদিন অপেক্ষা করলে চোয়ালের হাড় এতটাই ক্ষয়ে যায় যে পরবর্তীতে বোন গ্রাফটিং ছাড়া ইমপ্ল্যান্ট বসানো কঠিন ও ব্যয়বহুল হয়ে পড়ে।',
    urgencyReason_en: 'Postponing an implant causes irreversible bone loss. Timely placement preserves native jawbone volume and avoids costly bone grafting surgery.'
  },

  // s32: SDF with Pit & Fissure Sealant
  s32: {
    serviceId: 's32',
    diseaseOverview_bn: 'নতুন গজানো মাড়ির দাঁতের উপরিভাগের প্রাকৃতিক খাঁজগুলো (Pits & Fissures) অত্যন্ত গভীর ও সরু হয়, যেখানে টুথব্রাশের কোনো ব্রিসল পৌঁছাতে পারে না। ফলে সেখানে খাদ্য ও ব্যাকটেরিয়া জমে কোনো লক্ষণ ছাড়াই দ্রুত গভীর ক্ষতের সৃষ্টি হয়।',
    diseaseOverview_en: 'Deep anatomical pits and fissures on newly erupted permanent molars trap food particles and bacteria beyond the reach of toothbrush bristles. Over 80% of childhood cavities initiate inside these vulnerable deep grooves.',
    causes_bn: [
      'দাঁতের স্বাভাবিক অতিরিক্ত গভীর ও খাঁজযুক্ত অ্যানাটমি',
      'শিশুদের দুধ দাঁতের পরপরই ওঠা প্রথম স্থায়ী মোলার দাঁতের সুরক্ষা না থাকা',
      'খাদ্যের ক্ষুদ্রাতিক্ষুদ্র কণা খাঁজে দীর্ঘক্ষণ জমে পচন সৃষ্টি করা'
    ],
    causes_en: [
      'Morphologically deep, microscopic developmental enamel fissures',
      'Vulnerability of newly erupted 6-year permanent molars before full maturation',
      'Acid-forming plaque stagnation in microscopic groove crevices'
    ],
    procedure_bn: 'কোনো প্রকার ডেন্টাল ড্রিলিং বা দাঁত কাটা ছাড়া দাঁতের পৃষ্ঠ পরিষ্কার করে সিলভার ডায়ামাইন ফ্লোরাইড (SDF) ও বিশেষ রেজিন সিল্যান্ট প্রয়োগ করা হয়। এটি খাঁজের মুখগুলোকে মসৃণভাবে সিল করে ব্যাকটেরিয়ার পথ চিরতরে বন্ধ করে দেয়।',
    procedure_en: 'Without any drilling or anesthetic injections, the enamel grooves are conditioned. Silver Diamine Fluoride (SDF) and flowable resin sealant are applied, penetrating deep crevices and polymerizing into a durable barrier.',
    procedureSteps_bn: [
      'দাঁতের উপরিভাগ আলতোভাবে ব্রাশ ও অ্যান্টিসেপটিক দিয়ে পরিষ্কার',
      'ক্যারিজ ধ্বংসকারী এসডিএফ ও সিল্যান্ট কোটিং প্রয়োগ',
      'ব্লু-লাইট কিউরিং দিয়ে খাঁজগুলো মসৃণ কাঁচের মতো সিলিং'
    ],
    procedureSteps_en: [
      'Non-invasive surface cleaning and groove micro-debridement',
      'Application of antimicrobial SDF followed by bioactive resin sealant',
      'UV light-curing producing an impermeable, glass-smooth protective shield'
    ],
    symptoms_bn: [
      'দাঁতের ওপরের খাঁজে সূক্ষ্ম কালো বা বাদামি রেখা দেখা দেওয়া',
      'শিশু বা কিশোরদের মাড়ির নতুন দাঁত ক্যাভিটি থেকে সুরক্ষিত রাখার সচেতনতা',
      'খাবার খাওয়ার সময় দাঁতের উপরিভাগে খাদ্য আটকে থাকা'
    ],
    symptoms_en: [
      'Fine dark discolored lines developing along molar biting surfaces',
      'Desire to shield newly erupted permanent molars from early decay',
      'Food continually clinging to molar grooves after eating'
    ],
    urgencyReason_bn: 'দাঁতে ক্যাভিটি হওয়ার আগেই সিল্যান্ট দিলে দাঁতটি সারাজীবনের জন্য ১০০% ক্যারিজ-মুক্ত থাকে। এটি ডেন্টিস্ট্রির সবচেয়ে সফল প্রতিরোধমূলক উপহার।',
    urgencyReason_en: 'Pit and fissure sealants reduce molar decay risks by over 80%. Protecting teeth before decay begins saves your child from a lifetime of dental trauma.'
  },

  // s33: Professional Fluoride Application
  s33: {
    serviceId: 's33',
    diseaseOverview_bn: 'খাবারের এসিড ও ব্যাকটেরিয়ার ক্রমাগত আক্রমণে দাঁতের শক্ত এনামেল থেকে খনিজ উপাদান (Calcium & Phosphate) ধুয়ে যায়। এর ফলে দাঁতের মাইক্রোস্কোপিক ছিদ্র উন্মুক্ত হয়ে ঠাণ্ডা পানি বা বাতাসে মারাত্মক অস্বস্তিকর শিরশিরানি শুরু হয়।',
    diseaseOverview_en: 'Bacterial acids continuously demineralize tooth enamel, leaching vital calcium and phosphate. This exposes dentinal tubules, triggering acute, sharp nerve sensitivity whenever cold water, air, or sour food contacts the teeth.',
    causes_bn: [
      'ভুল নিয়মে জোরে জোরে বা শক্ত ব্রাশ দিয়ে দাঁত ঘষে এনামেল ক্ষয় করা',
      'অতিরিক্ত কোমল পানীয়, অম্লীয় ফল ও মিষ্টি খাবারের অ্যাসিড আক্রমণ',
      'মাড়ি সরে গিয়ে দাঁতের গোড়ার সংবেদনশীল অংশ উন্মুক্ত হওয়া'
    ],
    causes_en: [
      'Aggressive horizontal brushing with hard bristles wearing enamel away',
      'Frequent dietary exposure to acidic colas, citrus fruits, and refined sugars',
      'Gingival recession leaving unshielded root dentin exposed to thermal changes'
    ],
    procedure_bn: 'দাঁতের উপরিভাগ শুকিয়ে উচ্চ ঘনত্বের প্রফেশনাল মেডিকেল ফ্লোরাইড ভার্নিশ আলতো করে মেখে দেওয়া হয়। এটি এনামেলের সাথে বিক্রিয়া করে শক্তিশালী ‘ফ্লুরোপ্যাটাইট’ স্ফটিক তৈরি করে, যা এনামেলকে পাথরের মতো শক্ত করে শিরশিরানি স্থায়ীভাবে দূর করে।',
    procedure_en: 'Enamel surfaces are isolated and coated with high-concentration medical fluoride varnish. Fluoride ions bind directly with enamel hydroxyapatite to create robust fluorapatite, sealing open tubules and halting sensitivity.',
    procedureSteps_bn: [
      'দাঁত পরিষ্কার ও স্যালাইভা আইসোলেশন',
      'মেডিকেল গ্রেড ফ্লোরাইড ভার্নিশ সূক্ষ্ম ব্রাশে সমভাবে প্রয়োগ',
      'এনামেলের স্থায়ী পুনঃখনিজায়ন (Remineralization) নিশ্চিতকরণ'
    ],
    procedureSteps_en: [
      'Surface debridement and complete salivary isolation',
      'Targeted micro-brush application of therapeutic fluoride varnish',
      'Enamel tubule occlusion and immediate deep remineralization'
    ],
    symptoms_bn: [
      'ঠাণ্ডা পানি বা আইসক্রিম খেলে দাঁতে বিদ্যুতের মতো তীব্র শিরশিরানি',
      'বাতাসে বা সকালে ব্রাশ করার সময় দাঁতে তীব্র ঝাঁকুনি লাগা',
      'দাঁতের উপরিভাগে চকচকে হলুদ বা খসখসে ক্ষয়ের আভাস'
    ],
    symptoms_en: [
      'Electric, sharp shock of sensitivity when drinking cold water or ice',
      'Discomfort when inhaling cold outdoor air or during daily brushing',
      'Visible shiny or yellowish enamel erosion along the cervical gumline'
    ],
    urgencyReason_bn: 'এনামেলের প্রাথমিক ক্ষয় ফ্লোরাইড থেরাপির মাধ্যমে শতভাগ নিরাময় সম্ভব। অবহেলা করলে দাঁত ক্ষয়ে গর্ত হয়ে ফিলিং বা রুট ক্যানেলের প্রয়োজন হয়।',
    urgencyReason_en: 'Early micro-demineralization is completely reversible with professional fluoride. Neglecting it leads to cavitation, requiring restorative drilling.'
  }
};
