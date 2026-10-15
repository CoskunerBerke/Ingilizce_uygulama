// Expanded Grammar Bank for A1 - C2:
// 1. Extra Multiple-Choice Grammar Questions
// 2. Extra Sentence Builder Puzzles
// 3. "Doğru mu Yanlış mı?" (True / False Grammar Speed Duel) Challenges

export const EXTRA_GRAMMAR_QUIZZES = {
  A1: [
    {
      id: 'a1-eg1',
      topic: 'Present Simple',
      question: 'My sister _______ coffee in the morning; she always drinks tea.',
      options: ["doesn't drink", "don't drink", "isn't drink", "doesn't drinks"],
      answer: "doesn't drink",
      explanation: 'Tekil 3. şahıs (My sister = she) geniş zaman olumsuz cümlede "doesn\'t + yalın fiil (drink)" alır.'
    },
    {
      id: 'a1-eg2',
      topic: 'To Be (Am / Is / Are)',
      question: 'Where _______ my keys? I cannot find them on the table.',
      options: ['are', 'is', 'do', 'does'],
      answer: 'are',
      explanation: '"My keys" (anahtarlarım) çoğul bir isim olduğu için "are" yardımcı fiili kullanılır.'
    },
    {
      id: 'a1-eg3',
      topic: 'Possessive Adjectives',
      question: 'We love _______ new school because the teachers are very kind.',
      options: ['our', 'we', 'us', 'ours'],
      answer: 'our',
      explanation: 'İsimden ("new school") önce iyelik sıfatı ("our" = bizim) kullanılır.'
    },
    {
      id: 'a1-eg4',
      topic: 'Prepositions of Time',
      question: 'My birthday is _______ July, and the party is _______ Saturday.',
      options: ['in / on', 'on / in', 'at / on', 'in / at'],
      answer: 'in / on',
      explanation: 'Aylardan önce "in" (in July), günlerden önce "on" (on Saturday) kullanılır.'
    },
    {
      id: 'a1-eg5',
      topic: 'Present Continuous',
      question: 'Be quiet, please! The baby _______ in the next room right now.',
      options: ['is sleeping', 'sleeps', 'sleep', 'are sleeping'],
      answer: 'is sleeping',
      explanation: 'Şu anda ("right now") gerçekleşen eylemler için Present Continuous ("is + V-ing") kullanılır.'
    }
  ],
  A2: [
    {
      id: 'a2-eg1',
      topic: 'Past Simple Irregular',
      question: 'We _______ a great movie at the cinema last Friday.',
      options: ['saw', 'see', 'seen', 'was seeing'],
      answer: 'saw',
      explanation: '"Last Friday" geçmiş zaman zarfıdır. "See" fiilinin 2. hali (V2) "saw"dur.'
    },
    {
      id: 'a2-eg2',
      topic: 'Superlatives',
      question: 'Mount Everest is _______ mountain in the world.',
      options: ['the highest', 'higher than', 'most high', 'the most high'],
      answer: 'the highest',
      explanation: 'Kısa sıfatlarla en üstünlük (Superlative) yapılırken "the + sıfat + -est" (the highest) kullanılır.'
    },
    {
      id: 'a2-eg3',
      topic: 'Modals (Have to / Should)',
      question: 'You have a terrible toothache. You _______ see a dentist today.',
      options: ['should', 'would', 'may not', 'could not'],
      answer: 'should',
      explanation: 'Tavsiye verirken "yapmalısın / iyi olur" anlamında "should + V1" kullanılır.'
    },
    {
      id: 'a2-eg4',
      topic: 'Countable & Uncountable',
      question: 'How _______ apples do we need for the pie?',
      options: ['many', 'much', 'little', 'any'],
      answer: 'many',
      explanation: '"Apples" sayılabilen çoğul bir isim olduğu için miktar sorarken "How many" kullanılır.'
    },
    {
      id: 'a2-eg5',
      topic: 'Will vs Going to',
      question: 'A: The bag looks very heavy! B: Don\'t worry, I _______ carry it for you.',
      options: ['will', 'am going', 'carried', 'would'],
      answer: 'will',
      explanation: 'Konuşma anında verilen gönüllü kararlar ve teklifler için "will + V1" kullanılır.'
    }
  ],
  B1: [
    {
      id: 'b1-eg1',
      topic: 'Present Perfect (For / Since)',
      question: 'Mr. Carter has worked as an engineer _______ more than fifteen years.',
      options: ['for', 'since', 'during', 'from'],
      answer: 'for',
      explanation: 'Toplam süreç uzunluğu ("more than fifteen years") belirtildiğinde Present Perfect ile "for" kullanılır.'
    },
    {
      id: 'b1-eg2',
      topic: 'First Conditional (Unless)',
      question: 'You won\'t pass the driving test _______ you practice parallel parking.',
      options: ['unless', 'if', 'as long as', 'because'],
      answer: 'unless',
      explanation: '"Unless" = "If ... not" (-medikçe / -madıkça) anlamına gelir: Pratik yapmadıkça geçemeyeceksin.'
    },
    {
      id: 'b1-eg3',
      topic: 'Gerund vs Infinitive',
      question: 'She decided _______ abroad after graduating from university.',
      options: ['to study', 'studying', 'study', 'for studying'],
      answer: 'to study',
      explanation: '"Decide" fiilinden sonra gelen fiil her zaman "to + V1" (Infinitive) alır.'
    },
    {
      id: 'b1-eg4',
      topic: 'Past Perfect',
      question: 'When we arrived at the station, the train _______ already _______.',
      options: ['had / left', 'has / left', 'was / leaving', 'did / leave'],
      answer: 'had / left',
      explanation: 'Geçmişteki bir olaydan ("arrived") daha önce tamamlanmış eylemler için Past Perfect ("had + V3") kullanılır.'
    },
    {
      id: 'b1-eg5',
      topic: 'Relative Pronouns',
      question: 'The laptop _______ I bought last month is working very fast.',
      options: ['which', 'who', 'where', 'whose'],
      answer: 'which',
      explanation: 'Cansız nesneleri ("The laptop") niteleyen sıfat cümleciklerinde "which" veya "that" kullanılır.'
    }
  ],
  B2: [
    {
      id: 'b2-eg1',
      topic: 'Wish Clauses (Present)',
      question: 'I wish I _______ how to play the piano; it sounds so relaxing.',
      options: ['knew', 'know', 'will know', 'have known'],
      answer: 'knew',
      explanation: 'Şu anki bir durumu değiştirmeyi dilerken "I wish + Past Simple (knew)" kullanılır.'
    },
    {
      id: 'b2-eg2',
      topic: 'Passive with Modals',
      question: 'All safety guidelines must _______ strictly by laboratory staff.',
      options: ['be followed', 'follow', 'have followed', 'be following'],
      answer: 'be followed',
      explanation: 'Modal fiillerin edilgen (Passive) yapısı "Modal (must) + be + V3 (followed)" şeklindedir.'
    },
    {
      id: 'b2-eg3',
      topic: 'Reported Speech',
      question: 'The doctor advised him _______ smoking and exercise regularly.',
      options: ['to quit', 'quitting', 'quit', 'that quit'],
      answer: 'to quit',
      explanation: '"Advise + someone + to V1" yapısı dolaylı aktarımda tavsiye bildirmek için kullanılır.'
    },
    {
      id: 'b2-eg4',
      topic: 'Connectors of Contrast',
      question: '_______ he had very little experience, he was selected for the role.',
      options: ['Even though', 'Despite', 'In spite of', 'Because of'],
      answer: 'Even though',
      explanation: 'Boşluktan sonra tam bir cümle (Subject + Verb: "he had...") geldiği için "Even though / Although" kullanılır.'
    },
    {
      id: 'b2-eg5',
      topic: 'Past Modals (Should have V3)',
      question: 'You _______ me earlier! I could have given you a ride to the airport.',
      options: ['should have called', 'must call', 'would call', 'can\'t have called'],
      answer: 'should have called',
      explanation: 'Geçmişte yapılmamış bir eylem için sitem/tavsiye bildirirken "should have + V3" (aramalıydın) kullanılır.'
    }
  ],
  C1: [
    {
      id: 'c1-eg1',
      topic: 'Inversion (Hardly... when)',
      question: 'Hardly _______ the office when the director called an urgent meeting.',
      options: ['had I entered', 'I had entered', 'did I entered', 'have I entered'],
      answer: 'had I entered',
      explanation: '"Hardly / Scarcely ... when" kalıbı cümle başında Past Perfect devrik yapı ("had + Subject + V3") gerektirir.'
    },
    {
      id: 'c1-eg2',
      topic: 'Cleft Sentences (It was... that)',
      question: 'It was only after the audit _______ the board realized the scale of the loss.',
      options: ['that', 'which', 'when', 'what'],
      answer: 'that',
      explanation: '"It was [vurgulanan öğe] + that..." yapısı (It-Cleft) zaman ifadelerini vurgularken "that" ile tamamlanır.'
    },
    {
      id: 'c1-eg3',
      topic: 'Inversion with Only',
      question: 'Only by working together _______ overcome these environmental challenges.',
      options: ['can we', 'we can', 'do we', 'we will'],
      answer: 'can we',
      explanation: '"Only by / Only after / Only when" ifadeleri cümle başında yer aldığında ana cümle devrik ("can we") kurulur.'
    },
    {
      id: 'c1-eg4',
      topic: 'Future in the Past',
      question: 'Little did she know that this decision _______ her career forever.',
      options: ['would change', 'will change', 'has changed', 'changes'],
      answer: 'would change',
      explanation: 'Geçmişteki bir noktadan ("did she know") geleceğe bakarken "would + V1" kullanılır.'
    },
    {
      id: 'c1-eg5',
      topic: 'Reduced Relative Clauses',
      question: 'Anyone _______ to attend the seminar must register by Wednesday.',
      options: ['wishing', 'wished', 'who wish', 'to wish'],
      answer: 'wishing',
      explanation: 'Etken sıfat cümleciği ("Anyone who wishes...") kısaltılırken Present Participle ("wishing") kullanılır.'
    }
  ],
  C2: [
    {
      id: 'c2-eg1',
      topic: 'Subjunctive Mood (Lest)',
      question: 'He wrote down the coordinates carefully lest he _______ them during the storm.',
      options: ['forget', 'forgets', 'forgot', 'would forgot'],
      answer: 'forget',
      explanation: 'C2 seviyesinde "lest" (-mesin diye / korkusuyla) bağlacından sonra Subjunctive (yalın fiil: "forget" veya "should forget") kullanılır.'
    },
    {
      id: 'c2-eg2',
      topic: 'Inversion (So + Adj + be)',
      question: 'So intricate _______ the carvings that historians spent years decoding them.',
      options: ['were', 'they were', 'was', 'did'],
      answer: 'were',
      explanation: '"So + Adjective + be (were) + Subject (the carvings) + that..." ileri seviye devrik vurgu cümlesidir.'
    },
    {
      id: 'c2-eg3',
      topic: 'But for (Conditional)',
      question: 'But for the pilot\'s quick reflexes, the aircraft _______ a severe accident.',
      options: ['would have suffered', 'will suffer', 'suffered', 'had suffered'],
      answer: 'would have suffered',
      explanation: '"But for + Noun" geçmiş bağlamda "If it hadn\'t been for" anlamı taşır ve ana cümlede "would have + V3" alır.'
    },
    {
      id: 'c2-eg4',
      topic: 'Participle Clauses (Albeit)',
      question: 'The treaty was finally ratified, _______ after months of heated debate.',
      options: ['albeit', 'however', 'despite', 'whereas'],
      answer: 'albeit',
      explanation: '"Albeit" (her ne kadar ... olsa da) doğrudan edat/zarf öbeklerinden ("after months of...") önce gelebilen C2 bağlacıdır.'
    },
    {
      id: 'c2-eg5',
      topic: 'Emphatic Fronting',
      question: '_______ as it may seem, the tiny startup outperformed its biggest rivals.',
      options: ['Paradoxical', 'Paradoxically', 'Despite', 'Although'],
      answer: 'Paradoxical',
      explanation: 'Yüklem sıfatının başa alındığı "Adjective (Paradoxical) + as/though + Subject + seem/be" yapısıdır.'
    }
  ]
};

// True / False (Doğru mu Hatalı mı?) Speed Grammar Duel Bank
export const GRAMMAR_TRUE_FALSE = {
  A1: [
    {
      id: 'a1-tf1',
      sentence: 'She doesn\'t likes cold coffee.',
      isCorrect: false,
      correction: 'She doesn\'t like cold coffee.',
      reason: '"Doesn\'t" yardımcı fiili kullanıldığında ana fiildeki "-s" takısı kalkar ("like" olur).'
    },
    {
      id: 'a1-tf2',
      sentence: 'There are four chairs in the dining room.',
      isCorrect: true,
      correction: 'There are four chairs in the dining room.',
      reason: '"Four chairs" çoğul olduğu için "There are" kullanımı tamamen doğrudur.'
    },
    {
      id: 'a1-tf3',
      sentence: 'He can swims very fast in the pool.',
      isCorrect: false,
      correction: 'He can swim very fast in the pool.',
      reason: '"Can" modal fiilinden sonra gelen fiil her zaman yalındır, "-s" takısı almaz.'
    },
    {
      id: 'a1-tf4',
      sentence: 'Do your brother live in Izmir?',
      isCorrect: false,
      correction: 'Does your brother live in Izmir?',
      reason: '"Your brother" (He) tekil özne olduğu için soru "Does" ile başlamalıdır.'
    },
    {
      id: 'a1-tf5',
      sentence: 'I am twenty-four years old.',
      isCorrect: true,
      correction: 'I am twenty-four years old.',
      reason: 'İngilizcede yaş söylerken "am / is / are" kullanılır; cümle doğrudur.'
    },
    {
      id: 'a1-tf6',
      sentence: 'We usually have breakfast at 8 o\'clock.',
      isCorrect: true,
      correction: 'We usually have breakfast at 8 o\'clock.',
      reason: 'Saatlerden önce "at" ve geniş zamanda sıklık zarfı "usually" doğru kullanılmıştır.'
    }
  ],
  A2: [
    {
      id: 'a2-tf1',
      sentence: 'Did you went to the supermarket yesterday?',
      isCorrect: false,
      correction: 'Did you go to the supermarket yesterday?',
      reason: 'Soru cümlesinde "Did" kullanıldığında fiil 1. haline ("go") döner!'
    },
    {
      id: 'a2-tf2',
      sentence: 'This book is more interesting than the movie.',
      isCorrect: true,
      correction: 'This book is more interesting than the movie.',
      reason: 'Uzun sıfatlarla ("interesting") karşılaştırma yapılırken "more ... than" kullanılır.'
    },
    {
      id: 'a2-tf3',
      sentence: 'She is the most tall girl in our class.',
      isCorrect: false,
      correction: 'She is the tallest girl in our class.',
      reason: 'Tek heceli kısa sıfatlarda ("tall") "most" yerine "-est" takısı kullanılır ("the tallest").'
    },
    {
      id: 'a2-tf4',
      sentence: 'While I was walking home, it started to rain.',
      isCorrect: true,
      correction: 'While I was walking home, it started to rain.',
      reason: '"While + Past Continuous, Past Simple" zaman uyumu tamamen doğrudur.'
    },
    {
      id: 'a2-tf5',
      sentence: 'There isn\'t many milk in the bottle.',
      isCorrect: false,
      correction: 'There isn\'t much milk in the bottle.',
      reason: '"Milk" sayılamayan bir isim olduğu için "many" değil "much" kullanılır.'
    },
    {
      id: 'a2-tf6',
      sentence: 'We are going to visit Rome next month.',
      isCorrect: true,
      correction: 'We are going to visit Rome next month.',
      reason: 'Planlanmış gelecek zaman için "are going to + V1" kullanımı doğrudur.'
    }
  ],
  B1: [
    {
      id: 'b1-tf1',
      sentence: 'I have seen that documentary yesterday evening.',
      isCorrect: false,
      correction: 'I saw that documentary yesterday evening.',
      reason: '"Yesterday evening" gibi net geçmiş zaman ifadeleriyle Present Perfect ("have seen") KULLANILMAZ, Past Simple ("saw") kullanılır.'
    },
    {
      id: 'b1-tf2',
      sentence: 'If I were you, I would apply for that scholarship.',
      isCorrect: true,
      correction: 'If I were you, I would apply for that scholarship.',
      reason: 'Type 2 koşul cümlesinde "If I were you, I would + V1" kullanımı doğrudur.'
    },
    {
      id: 'b1-tf3',
      sentence: 'If it will rain tomorrow, we will stay at home.',
      isCorrect: false,
      correction: 'If it rains tomorrow, we will stay at home.',
      reason: '"If" yan cümleciğinin içinde gelecek zaman için "will" kullanılmaz; geniş zaman ("rains") kullanılır.'
    },
    {
      id: 'b1-tf4',
      sentence: 'This novel was written by George Orwell in 1949.',
      isCorrect: true,
      correction: 'This novel was written by George Orwell in 1949.',
      reason: 'Geçmiş zaman edilgen (Passive) yapı "was + V3 (written)" doğru kurulmuştur.'
    },
    {
      id: 'b1-tf5',
      sentence: 'She has lived in Ankara since five years.',
      isCorrect: false,
      correction: 'She has lived in Ankara for five years.',
      reason: '"Five years" bir süreç bildirdiği için "since" değil "for" kullanılmalıdır.'
    },
    {
      id: 'b1-tf6',
      sentence: 'You don\'t have to pay; the museum entrance is free today.',
      isCorrect: true,
      correction: 'You don\'t have to pay; the museum entrance is free today.',
      reason: 'Zorunluluk olmadığını ("gerek yok") belirtmek için "don\'t have to" doğru kullanılmıştır.'
    }
  ],
  B2: [
    {
      id: 'b2-tf1',
      sentence: 'If you would have told me, I would have helped you.',
      isCorrect: false,
      correction: 'If you had told me, I would have helped you.',
      reason: 'Type 3 koşul cümlesinde "If" kısmında "would have" kullanılmaz, "had + V3 (had told)" kullanılır!'
    },
    {
      id: 'b2-tf2',
      sentence: 'I am used to waking up early on weekdays.',
      isCorrect: true,
      correction: 'I am used to waking up early on weekdays.',
      reason: '"Be used to + V-ing" (bir şeye alışkın olmak) kalıbı dilbilgisi açısından doğrudur.'
    },
    {
      id: 'b2-tf3',
      sentence: 'She asked me where did I live.',
      isCorrect: false,
      correction: 'She asked me where I lived.',
      reason: 'Dolaylı sorularda (Reported Questions) soru devrikliği kalkar, "did" düşer ve fiil geçmiş zamana ("lived") çekilir.'
    },
    {
      id: 'b2-tf4',
      sentence: 'Despite the heavy traffic, we arrived on time.',
      isCorrect: true,
      correction: 'Despite the heavy traffic, we arrived on time.',
      reason: '"Despite + isim tamlaması (the heavy traffic)" yapısı tamamen doğrudur.'
    },
    {
      id: 'b2-tf5',
      sentence: 'Istanbul, that is a historic city, attracts millions of tourists.',
      isCorrect: false,
      correction: 'Istanbul, which is a historic city, attracts millions of tourists.',
      reason: 'Virgülle ayrılan (Non-defining) sıfat cümleciklerinde "that" ASLA kullanılmaz, "which" kullanılır.'
    },
    {
      id: 'b2-tf6',
      sentence: 'I wish I hadn\'t spent so much money yesterday.',
      isCorrect: true,
      correction: 'I wish I hadn\'t spent so much money yesterday.',
      reason: 'Geçmişteki bir pişmanlığı anlatırken "I wish + Past Perfect (hadn\'t spent)" doğrudur.'
    }
  ],
  C1: [
    {
      id: 'c1-tf1',
      sentence: 'Not only she finished the project, but she also helped her team.',
      isCorrect: false,
      correction: 'Not only did she finish the project, but she also helped her team.',
      reason: '"Not only" cümle başında olduğunda ilk cümle devrik ("did she finish") olmak zorundadır!'
    },
    {
      id: 'c1-tf2',
      sentence: 'Never have I encountered such a resilient community.',
      isCorrect: true,
      correction: 'Never have I encountered such a resilient community.',
      reason: '"Never" başta olduğunda "have + Subject + V3" devrik yapısı doğru kullanılmıştır.'
    },
    {
      id: 'c1-tf3',
      sentence: 'He mustn\'t have seen the sign; otherwise he would have stopped.',
      isCorrect: false,
      correction: 'He can\'t have seen the sign; otherwise he would have stopped.',
      reason: 'Geçmişe yönelik olumsuz çıkarımda "mustn\'t have V3" kullanılmaz, "can\'t / couldn\'t have V3" kullanılır.'
    },
    {
      id: 'c1-tf4',
      sentence: 'If I had taken that flight, I would be in Paris right now.',
      isCorrect: true,
      correction: 'If I had taken that flight, I would be in Paris right now.',
      reason: 'Geçmiş koşulun ("had taken") şimdiki sonucunu ("would be ... right now") anlatan Mixed Conditional doğrudur.'
    },
    {
      id: 'c1-tf5',
      sentence: 'It is high time we leave for the airport.',
      isCorrect: false,
      correction: 'It is high time we left for the airport.',
      reason: '"It is high time + Subject + Past Simple (V2 - left)" kuralı gereği fiil geçmiş zaman formunda olmalıdır.'
    },
    {
      id: 'c1-tf6',
      sentence: 'Having completed the audit, the team published the annual report.',
      isCorrect: true,
      correction: 'Having completed the audit, the team published the annual report.',
      reason: 'Perfect Participle ("Having + V3") kısaltması tamamen doğrudur.'
    }
  ],
  C2: [
    {
      id: 'c2-tf1',
      sentence: 'It is imperative that every member attends the emergency briefing.',
      isCorrect: false,
      correction: 'It is imperative that every member attend the emergency briefing.',
      reason: '"It is imperative that..." Subjunctive yapısında tekil öznede bile fiil "-s" almaz, yalın ("attend") kalır!'
    },
    {
      id: 'c2-tf2',
      sentence: 'Had it not been for your guidance, the research would have failed.',
      isCorrect: true,
      correction: 'Had it not been for your guidance, the research would have failed.',
      reason: 'C2 devrik 3. tip koşul yapısı ("Had it not been for...") kusursuz kullanılmıştır.'
    },
    {
      id: 'c2-tf3',
      sentence: 'Were the company to relocate, many employees will resign.',
      isCorrect: false,
      correction: 'Were the company to relocate, many employees would resign.',
      reason: '"Were + Subject + to V1" 2. tip (hayali) devrik koşuldur; ana cümlede "will" değil "would / might" kullanılır.'
    },
    {
      id: 'c2-tf4',
      sentence: 'Try as he might, he could not persuade the committee.',
      isCorrect: true,
      correction: 'Try as he might, he could not persuade the committee.',
      reason: '"Try as + Subject + might" ileri seviye zıtlık yapısı doğrudur.'
    },
    {
      id: 'c2-tf5',
      sentence: 'The judge insisted that the witness is not interrupted.',
      isCorrect: false,
      correction: 'The judge insisted that the witness not be interrupted.',
      reason: '"Insist that..." olumsuz edilgen Subjunctive yapısında "not be + V3" kullanılır.'
    },
    {
      id: 'c2-tf6',
      sentence: 'Such was the intensity of the debate that the session lasted until midnight.',
      isCorrect: true,
      correction: 'Such was the intensity of the debate that the session lasted until midnight.',
      reason: '"Such + be + Noun + that..." devrik yapısı tamamen doğrudur.'
    }
  ]
};
