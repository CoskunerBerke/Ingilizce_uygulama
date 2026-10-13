export const CEFR_LEVELS = [
  {
    id: 'A1',
    name: 'A1 • Beginner',
    trName: 'Başlangıç Seviyesi',
    subtitle: 'Günlük temel kelimeler, tanışma, geniş zaman ve basit cümle kurulumu.',
    color: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    accentText: 'text-emerald-400',
    ringColor: 'ring-emerald-500/40',
    boss: {
      name: 'Slime of Simple Present',
      trTitle: 'Geniş Zaman Muhafızı',
      emoji: '🟢',
      hp: 100,
      quote: '"Am, Is, Are" kurallarını bilmeden yanımdan geçemezsin!'
    },
    grammarLessons: [
      {
        id: 'a1-g1',
        title: 'To Be (Am / Is / Are)',
        trTitle: 'Olmak Fiili ve Durum Cümleleri',
        formula: 'Subject + am / is / are + Noun / Adjective / Place',
        explanation: 'İngilizcede eylem (fiil) içermeyen durum, meslek, yaş, duygu ve yer cümlelerinde "to be" kullanılır. I -> am, He/She/It -> is, You/We/They -> are alır.',
        proTip: 'Yaş söylerken Türkçedeki gibi "sahip olmak (have)" değil, her zaman "am/is/are" kullanılır: "I am 22 years old."',
        examples: [
          { en: 'She is an architect in London.', tr: 'O, Londra\'da bir mimardır.' },
          { en: 'They are not tired right now.', tr: 'Onlar şu anda yorgun değiller.' },
          { en: 'Are you ready for the exam?', tr: 'Sınava hazır mısın?' }
        ]
      },
      {
        id: 'a1-g2',
        title: 'Present Simple Tense',
        trTitle: 'Geniş Zaman (Alışkanlıklar & Rutinler)',
        formula: 'I/You/We/They + V1  |  He/She/It + V1(-s/-es)',
        explanation: 'Her gün tekrarlanan rutinler, genel geçer doğrular ve sevip sevmediğimiz şeyleri anlatırken kullanılır. Olumsuz ve soru cümlelerinde "do / does" yardımcı fiili devreye girer.',
        proTip: 'Olumsuz (doesn\'t) veya soru (Does he...?) cümlesinde "does" kullanıldığında ana fiildeki "-s" takısı düşer!',
        examples: [
          { en: 'He drinks coffee every morning.', tr: 'O her sabah kahve içer.' },
          { en: 'She does not (doesn\'t) like cold weather.', tr: 'O soğuk havayı sevmez.' },
          { en: 'Do they live near the station?', tr: 'İstasyonun yakınında mı yaşıyorlar?' }
        ]
      },
      {
        id: 'a1-g3',
        title: 'There is / There are & Can',
        trTitle: 'Varlık Bildirme ve Yetenek (Can / Can\'t)',
        formula: 'There is + Tekil  |  There are + Çoğul  |  Subject + can + V1',
        explanation: 'Bir yerde bir şeyin "var" olduğunu söylemek için There is/are; yapabildiğimiz yetenekleri veya olasılıkları anlatmak için ise "can + yalın fiil" kullanırız.',
        proTip: '"Can" modal fiilinden sonra gelen fiil asla "to" veya "-s" takısı almaz: "He can swim" (Doğru), "He can swims" (Yanlış).',
        examples: [
          { en: 'There are three books on the desk.', tr: 'Masanın üzerinde üç kitap var.' },
          { en: 'I can speak a little English.', tr: 'Biraz İngilizce konuşabilirim.' },
          { en: 'Can you help me with this bag?', tr: 'Bu çantayla bana yardım edebilir misin?' }
        ]
      }
    ],
    vocabList: [
      {
        id: 'a1-v1',
        word: 'confident',
        phonetic: '/ˈkɒn.fɪ.dənt/',
        type: 'Sıfat',
        tr: 'Kendine güvenen, emin',
        synonym: 'sure, self-assured',
        example: 'She feels confident before the interview.',
        exampleTr: 'Mülakattan önce kendine güveniyor hissediyor.',
        clozeOptions: ['confident', 'crowded', 'expensive', 'hungry']
      },
      {
        id: 'a1-v2',
        word: 'schedule',
        phonetic: '/ˈʃed.juːl/',
        type: 'İsim',
        tr: 'Program, takvim, ders/iş planı',
        synonym: 'timetable, plan',
        example: 'My work schedule is very busy on Mondays.',
        exampleTr: 'Pazartesi günleri iş programım çok yoğundur.',
        clozeOptions: ['schedule', 'weather', 'blanket', 'kitchen']
      },
      {
        id: 'a1-v3',
        word: 'delicious',
        phonetic: '/dɪˈlɪʃ.əs/',
        type: 'Sıfat',
        tr: 'Çok lezzetli, nefis',
        synonym: 'tasty, yummy',
        example: 'This homemade soup tastes delicious.',
        exampleTr: 'Bu ev yapımı çorbanın tadı çok lezzetli.',
        clozeOptions: ['delicious', 'dangerous', 'noisy', 'empty']
      },
      {
        id: 'a1-v4',
        word: 'arrive',
        phonetic: '/əˈraɪv/',
        type: 'Fiil',
        tr: 'Varmak, ulaşmak',
        synonym: 'reach, get to',
        example: 'What time does the train arrive at the station?',
        exampleTr: 'Tren istasyona saat kaçta varır?',
        clozeOptions: ['arrive', 'borrow', 'forget', 'listen']
      },
      {
        id: 'a1-v5',
        word: 'neighbor',
        phonetic: '/ˈneɪ.bər/',
        type: 'İsim',
        tr: 'Komşu',
        synonym: 'next-door resident',
        example: 'Our new neighbor is very polite and friendly.',
        exampleTr: 'Yeni komşumuz çok kibar ve arkadaş canlısı.',
        clozeOptions: ['neighbor', 'umbrella', 'ticket', 'bridge']
      },
      {
        id: 'a1-v6',
        word: 'expensive',
        phonetic: '/ɪkˈspen.sɪv/',
        type: 'Sıfat',
        tr: 'Pahalı',
        synonym: 'costly, pricey',
        example: 'Hotels in the city center are usually expensive.',
        exampleTr: 'Şehir merkezindeki oteller genellikle pahalıdır.',
        clozeOptions: ['expensive', 'careful', 'thirsty', 'early']
      },
      {
        id: 'a1-v7',
        word: 'prepare',
        phonetic: '/prɪˈpeər/',
        type: 'Fiil',
        tr: 'Hazırlamak, hazırlanmak',
        synonym: 'get ready, make',
        example: 'We prepare breakfast together every Sunday.',
        exampleTr: 'Her pazar birlikte kahvaltı hazırlarız.',
        clozeOptions: ['prepare', 'sleep', 'laugh', 'climb']
      },
      {
        id: 'a1-v8',
        word: 'comfortable',
        phonetic: '/ˈkʌm.fə.tə.bəl/',
        type: 'Sıfat',
        tr: 'Rahat, konforlu',
        synonym: 'cozy, relaxing',
        example: 'This armchair is very comfortable for reading.',
        exampleTr: 'Bu koltuk kitap okumak için çok rahat.',
        clozeOptions: ['comfortable', 'difficult', 'heavy', 'angry']
      }
    ],
    sentencePuzzles: [
      {
        id: 'a1-sp1',
        trPrompt: 'O her sabah işe otobüsle gider.',
        grammarTopic: 'Present Simple (He/She/It -s)',
        correctWords: ['She', 'goes', 'to', 'work', 'by', 'bus', 'every', 'morning'],
        distractors: ['go', 'going', 'is'],
        hint: 'He/She/It öznelerinde geniş zamanda fiil "-s/-es" takısı alır (go -> goes).'
      },
      {
        id: 'a1-sp2',
        trPrompt: 'Masanın üzerinde iki fincan kahve var.',
        grammarTopic: 'There is / There are',
        correctWords: ['There', 'are', 'two', 'cups', 'of', 'coffee', 'on', 'the', 'table'],
        distractors: ['is', 'have', 'in'],
        hint: 'Çoğul nesnelerin varlığını belirtirken "There are" kullanılır.'
      },
      {
        id: 'a1-sp3',
        trPrompt: 'Kardeşin hafta sonları erken uyanır mı?',
        grammarTopic: 'Present Simple Questions',
        correctWords: ['Does', 'your', 'brother', 'wake', 'up', 'early', 'on', 'weekends'],
        distractors: ['Do', 'wakes', 'Is'],
        hint: 'Tekil 3. şahıs (your brother = he) soru cümlesinde başa "Does" gelir ve fiil yalın kalır.'
      },
      {
        id: 'a1-sp4',
        trPrompt: 'Ben çok iyi yüzebilirim ama gitar çalamam.',
        grammarTopic: 'Can / Can\'t',
        correctWords: ['I', 'can', 'swim', 'very', 'well', 'but', 'I', 'cannot', 'play', 'guitar'],
        distractors: ['swims', 'to', 'am'],
        hint: 'Can ve cannot (can\'t) sonrasında fiiller her zaman yalın (V1) haldedir.'
      },
      {
        id: 'a1-sp5',
        trPrompt: 'Onlar şu anda evde değiller.',
        grammarTopic: 'To Be Negative',
        correctWords: ['They', 'are', 'not', 'at', 'home', 'right', 'now'],
        distractors: ['do', 'is', 'does'],
        hint: 'Durum cümlesinde "They" öznesi "are not" (aren\'t) alır.'
      }
    ],
    grammarQuizzes: [
      {
        id: 'a1-gq1',
        type: 'fill',
        topic: 'Present Simple',
        question: 'My father _______ watch television in the evenings; he prefers reading books.',
        options: ['doesn\'t', 'don\'t', 'isn\'t', 'aren\'t'],
        answer: 'doesn\'t',
        explanation: '"My father" (He) tekil özne olduğu için ve cümlede "watch" ana fiili bulunduğu için olumsuz yardımcı fiil "doesn\'t" olmalıdır.'
      },
      {
        id: 'a1-gq2',
        type: 'fill',
        topic: 'To Be',
        question: '_______ your parents at home right now, or are they at the market?',
        options: ['Are', 'Do', 'Is', 'Have'],
        answer: 'Are',
        explanation: 'Cümlede ana fiil yoktur ("at home" yer bildirir) ve "your parents" (they) çoğuldur. Bu yüzden "Are" kullanılır.'
      },
      {
        id: 'a1-gq3',
        type: 'error',
        topic: 'Modal Can',
        question: 'Hangi cümle dilbilgisi açısından DOĞRUDUR?',
        options: [
          'She can speak three languages fluently.',
          'She cans speak three languages fluently.',
          'She can speaks three languages fluently.',
          'She can to speak three languages fluently.'
        ],
        answer: 'She can speak three languages fluently.',
        explanation: '"Can" yardımcı fiili özneye göre değişmez ve kendisinden sonra gelen fiil ("speak") hiçbir ek veya "to" almaz.'
      },
      {
        id: 'a1-gq4',
        type: 'fill',
        topic: 'There is / There are',
        question: '_______ any milk left in the fridge for breakfast?',
        options: ['Is there', 'Are there', 'Do there', 'Have there'],
        answer: 'Is there',
        explanation: '"Milk" (süt) sayılamayan (uncountable) bir isim olduğu için tekil kabul edilir ve soru formunda "Is there" kullanılır.'
      },
      {
        id: 'a1-gq5',
        type: 'fill',
        topic: 'Object Pronouns & Prepositions',
        question: 'Our English lesson starts _______ 9:30 _______ Monday mornings.',
        options: ['at / on', 'in / at', 'on / in', 'at / in'],
        answer: 'at / on',
        explanation: 'Saatlerden önce "at" (at 9:30), günlerden önce ise "on" (on Monday mornings) edatı kullanılır.'
      }
    ]
  },

  {
    id: 'A2',
    name: 'A2 • Elementary',
    trName: 'Temel Seviye',
    subtitle: 'Geçmiş zaman, gelecek planları, karşılaştırma sıfatları ve günlük deneyimler.',
    color: 'from-sky-500 to-blue-600',
    badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    accentText: 'text-sky-400',
    ringColor: 'ring-sky-500/40',
    boss: {
      name: 'Knight of Past Irregulars',
      trTitle: 'Düzensiz Fiiller Şövalyesi',
      emoji: '🛡️',
      hp: 120,
      quote: 'Go -> Went, Buy -> Bought! Geçmişin sırlarını çözebilecek misin?'
    },
    grammarLessons: [
      {
        id: 'a2-g1',
        title: 'Past Simple Tense (Did & V2)',
        trTitle: 'Geçmiş Zaman (Düzenli & Düzensiz Fiiller)',
        formula: 'Olumlu: Subject + V2 (-ed)  |  Olumsuz: Subject + didn\'t + V1',
        explanation: 'Geçmişte belirli bir zamanda başlayıp bitmiş eylemleri anlatır. Olumlu cümlede fiilin 2. hali (V2) kullanılırken, "did" veya "didn\'t" girdiğinde fiil V1 (yalın) haline döner!',
        proTip: '"Did you went?" en sık yapılan hatadır! Doğrusu: "Did you go?" çünkü "did" geçmiş zaman görevini üstlenir.',
        examples: [
          { en: 'We bought a new laptop yesterday.', tr: 'Dün yeni bir dizüstü bilgisayar aldık.' },
          { en: 'I didn\'t see your message last night.', tr: 'Dün gece mesajını görmedim.' },
          { en: 'Where did they spend their holiday?', tr: 'Tatillerini nerede geçirdiler?' }
        ]
      },
      {
        id: 'a2-g2',
        title: 'Comparatives & Superlatives',
        trTitle: 'Karşılaştırma ve Üstünlük Sıfatları',
        formula: 'Kısa: adj + -er than / the adj + -est  |  Uzun: more adj than / the most adj',
        explanation: 'İki şeyi kıyaslarken kısa sıfatlara "-er" (taller), uzun sıfatların önüne "more" (more expensive) getiririz. Düzensiz sıfatlara dikkat: good -> better -> the best, bad -> worse -> the worst.',
        proTip: 'İki heceden uzun sıfatlarda "-er" yerine "more" kullanılır: "more comfortable" (comfortabler denmez).',
        examples: [
          { en: 'Train travel is faster and more comfortable than bus travel.', tr: 'Tren yolculuğu otobüs yolculuğundan daha hızlı ve daha konforludur.' },
          { en: 'This is the best restaurant in our neighborhood.', tr: 'Bu, mahallemizdeki en iyi restorandır.' }
        ]
      },
      {
        id: 'a2-g3',
        title: 'Future: Be Going To vs. Will',
        trTitle: 'Gelecek Zaman (Planlar vs. Anlık Kararlar)',
        formula: 'Plan & Kanıt: am/is/are going to + V1  |  Anlık & Tahmin: will + V1',
        explanation: 'Önceden planlanmış niyetler ve güçlü belirtiler için "be going to", konuşma anında verilen kararlar, sözler ve kişisel tahminler (I think...) için "will" kullanılır.',
        proTip: 'Kara bulutları görüp "Yağmur yağacak" derken kanıt olduğu için "It is going to rain!" tercih edilir.',
        examples: [
          { en: 'I am going to visit my grandparents this weekend.', tr: 'Bu hafta sonu büyükanne ve büyükbabamı ziyaret edeceğim (Planlı).' },
          { en: 'The phone is ringing! I will answer it.', tr: 'Telefon çalıyor! Ben bakarım (Anlık karar).' }
        ]
      }
    ],
    vocabList: [
      {
        id: 'a2-v1',
        word: 'appointment',
        phonetic: '/əˈpɔɪnt.mənt/',
        type: 'İsim',
        tr: 'Randevu (doktor, iş vb.)',
        synonym: 'meeting, session',
        example: 'I have a dentist appointment at 3 PM tomorrow.',
        exampleTr: 'Yarın öğleden sonra saat 3\'te dişçi randevum var.',
        clozeOptions: ['appointment', 'adventure', 'accident', 'advertisement']
      },
      {
        id: 'a2-v2',
        word: 'improve',
        phonetic: '/ɪmˈpruːv/',
        type: 'Fiil',
        tr: 'Geliştirmek, ilerletmek, iyileşmek',
        synonym: 'get better, enhance',
        example: 'Reading short stories helps you improve your vocabulary.',
        exampleTr: 'Kısa hikayeler okumak kelime dağarcığınızı geliştirmenize yardımcı olur.',
        clozeOptions: ['improve', 'cancel', 'complain', 'destroy']
      },
      {
        id: 'a2-v3',
        word: 'crowded',
        phonetic: '/ˈkraʊ.dɪd/',
        type: 'Sıfat',
        tr: 'Kalabalık, tıklım tıklım',
        synonym: 'packed, full of people',
        example: 'The subway is always crowded during rush hour.',
        exampleTr: 'Metro iş çıkış saatlerinde her zaman kalabalıktır.',
        clozeOptions: ['crowded', 'silent', 'polite', 'ancient']
      },
      {
        id: 'a2-v4',
        word: 'immediately',
        phonetic: '/ɪˈmiː.di.ət.li/',
        type: 'Zarf',
        tr: 'Derhal, hemen, anında',
        synonym: 'right away, at once',
        example: 'Please call me back immediately when you see this.',
        exampleTr: 'Bunu gördüğünde lütfen beni hemen geri ara.',
        clozeOptions: ['immediately', 'rarely', 'slowly', 'accidentally']
      },
      {
        id: 'a2-v5',
        word: 'borrow',
        phonetic: '/ˈbɒr.əʊ/',
        type: 'Fiil',
        tr: 'Ödünç almak',
        synonym: 'take temporarily',
        example: 'Can I borrow your charger for twenty minutes?',
        exampleTr: 'Şarj aletini yirmi dakikalığına ödünç alabilir miyim?',
        clozeOptions: ['borrow', 'lend', 'explain', 'invite']
      },
      {
        id: 'a2-v6',
        word: 'exhausted',
        phonetic: '/ɪɡˈzɔː.stɪd/',
        type: 'Sıfat',
        tr: 'Çok yorgun, bitkin, tükenmiş',
        synonym: 'very tired, worn out',
        example: 'After the 10-hour flight, all passengers were exhausted.',
        exampleTr: '10 saatlik uçuşun ardından tüm yolcular bitkindi.',
        clozeOptions: ['exhausted', 'curious', 'generous', 'lucky']
      },
      {
        id: 'a2-v7',
        word: 'opportunity',
        phonetic: '/ˌɒp.əˈtjuː.nə.ti/',
        type: 'İsim',
        tr: 'Fırsat, imkan',
        synonym: 'chance',
        example: 'This internship is a great opportunity for students.',
        exampleTr: 'Bu staj öğrenciler için harika bir fırsattır.',
        clozeOptions: ['opportunity', 'luggage', 'medicine', 'receipt']
      },
      {
        id: 'a2-v8',
        word: 'recommend',
        phonetic: '/ˌrek.əˈmend/',
        type: 'Fiil',
        tr: 'Tavsiye etmek, önermek',
        synonym: 'suggest, advise',
        example: 'Which local dish do you recommend at this restaurant?',
        exampleTr: 'Bu restoranda hangi yöresel yemeği tavsiye edersiniz?',
        clozeOptions: ['recommend', 'promise', 'protect', 'repair']
      }
    ],
    sentencePuzzles: [
      {
        id: 'a2-sp1',
        trPrompt: 'Dün gece yağmur yağdığı için dışarı çıkmadık.',
        grammarTopic: 'Past Simple Negative',
        correctWords: ['We', 'did', 'not', 'go', 'out', 'last', 'night', 'because', 'it', 'rained'],
        distractors: ['went', 'were', 'don\'t'],
        hint: 'Geçmiş zamanda olumsuz cümlede "did not + V1 (go)" kullanılır.'
      },
      {
        id: 'a2-sp2',
        trPrompt: 'Bu sınav geçen haftaki sınavdan çok daha kolay.',
        grammarTopic: 'Comparatives',
        correctWords: ['This', 'exam', 'is', 'much', 'easier', 'than', 'last', 'week\'s', 'exam'],
        distractors: ['more', 'easy', 'easiest'],
        hint: 'Sonu -y ile biten iki heceli "easy" sıfatı karşılaştırmada "easier than" olur.'
      },
      {
        id: 'a2-sp3',
        trPrompt: 'Önümüzdeki yaz İtalya\'da yeni bir dil öğreneceğim (Planlı).',
        grammarTopic: 'Be Going To Future',
        correctWords: ['I', 'am', 'going', 'to', 'learn', 'a', 'new', 'language', 'next', 'summer'],
        distractors: ['will', 'learning', 'was'],
        hint: 'Planlanmış gelecek eylemlerinde "am/is/are going to + V1" kullanılır.'
      },
      {
        id: 'a2-sp4',
        trPrompt: 'Geçen hafta sonu cüzdanını nerede buldun?',
        grammarTopic: 'Past Simple Questions',
        correctWords: ['Where', 'did', 'you', 'find', 'your', 'wallet', 'last', 'weekend'],
        distractors: ['found', 'were', 'do'],
        hint: 'Geçmiş zaman soru cümlesinde "Where + did + Subject + V1 (find)" dizilimi kullanılır.'
      },
      {
        id: 'a2-sp5',
        trPrompt: 'Japonya dünyadaki en güvenli ülkelerden biridir.',
        grammarTopic: 'Superlatives',
        correctWords: ['Japan', 'is', 'one', 'of', 'the', 'safest', 'countries', 'in', 'the', 'world'],
        distractors: ['safer', 'most', 'safe'],
        hint: 'En üstünlük (Superlative) yapısında kısa sıfata "the + -est" (the safest) eklenir.'
      }
    ],
    grammarQuizzes: [
      {
        id: 'a2-gq1',
        type: 'fill',
        topic: 'Past Simple',
        question: 'Why _______ you come to the party yesterday evening?',
        options: ['didn\'t', 'weren\'t', 'don\'t', 'haven\'t'],
        answer: 'didn\'t',
        explanation: '"yesterday evening" geçmiş zamanı gösterir ve "come" bir eylem fiili olduğu için "didn\'t" kullanılır.'
      },
      {
        id: 'a2-gq2',
        type: 'fill',
        topic: 'Comparatives & Superlatives',
        question: 'In my opinion, the traffic today is _______ than it was yesterday.',
        options: ['worse', 'badder', 'more bad', 'the worst'],
        answer: 'worse',
        explanation: '"Bad" sıfatı düzensizdir. "than" ile karşılaştırma yapılırken "worse" (daha kötü) kullanılır.'
      },
      {
        id: 'a2-gq3',
        type: 'fill',
        topic: 'Past Continuous vs Past Simple',
        question: 'While I _______ dinner, the electricity suddenly went out.',
        options: ['was cooking', 'cooked', 'am cooking', 'have cooked'],
        answer: 'was cooking',
        explanation: 'Geçmişte devam etmekte olan bir eylem ("While I was cooking") sırasında başka kısa bir olay ("went out") gerçekleştiğinde Past Continuous kullanılır.'
      },
      {
        id: 'a2-gq4',
        type: 'error',
        topic: 'Future Going To',
        question: 'Hangi cümle dilbilgisi açısından DOĞRUDUR?',
        options: [
          'Look at those dark clouds! It is going to snow soon.',
          'Look at those dark clouds! It going to snows soon.',
          'Look at those dark clouds! It is go to snow soon.',
          'Look at those dark clouds! It are going to snow soon.'
        ],
        answer: 'Look at those dark clouds! It is going to snow soon.',
        explanation: 'Gözle görülür kanıta dayalı gelecek tahmininde "It + is going to + V1 (snow)" yapısı kullanılır.'
      },
      {
        id: 'a2-gq5',
        type: 'fill',
        topic: 'Quantifiers',
        question: 'We don\'t have _______ time before the flight boards, so hurry up!',
        options: ['much', 'many', 'a few', 'several'],
        answer: 'much',
        explanation: '"Time" (zaman) sayılamayan bir isimdir. Olumsuz cümlelerde sayılamayan isimlerle "much" kullanılır.'
      }
    ]
  },

  {
    id: 'B1',
    name: 'B1 • Intermediate',
    trName: 'Orta Seviye',
    subtitle: 'Present Perfect, koşul cümleleri (If Clause 1-2), edilgen çatı (Passive) ve zorunluluk kipleri.',
    color: 'from-violet-500 to-indigo-600',
    badgeBg: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    accentText: 'text-violet-400',
    ringColor: 'ring-violet-500/40',
    boss: {
      name: 'Dragon of Conditionals',
      trTitle: 'Koşul ve Zaman Ejderhası',
      emoji: '🐉',
      hp: 140,
      quote: '"Have you ever..." ile "Did you..." arasındaki farkı bilmeyen ateşime dayanamaz!'
    },
    grammarLessons: [
      {
        id: 'b1-g1',
        title: 'Present Perfect vs. Past Simple',
        trTitle: 'Yakın/Belirsiz Geçmiş ve Etkisi Süren Olaylar',
        formula: 'Subject + have / has + V3 (Past Participle)',
        explanation: 'Geçmişte başlamış ve hala devam eden (since/for) veya zamanı belirtilmeyip etkisi/deneyimi bugüne ulaşan olaylarda Present Perfect kullanılır. Net geçmiş zaman zarfı (yesterday, in 2019) varsa Past Simple zorunludur!',
        proTip: '"For" süreç bildirir (for 5 years), "Since" başlangıç noktasını bildirir (since 2020 / since I was a child).',
        examples: [
          { en: 'I have lived in Istanbul for six years.', tr: 'Altı yıldır İstanbul\'da yaşıyorum (Hala oradayım).' },
          { en: 'She has already finished her project.', tr: 'Projesini çoktan bitirdi.' },
          { en: 'Have you ever tried sushi?', tr: 'Hiç suşi denedin mi?' }
        ]
      },
      {
        id: 'b1-g2',
        title: 'First & Second Conditionals',
        trTitle: 'Gerçek Olasılıklar (Type 1) & Hayali Durumlar (Type 2)',
        formula: 'Type 1: If + Present, will + V1  |  Type 2: If + Past Simple, would + V1',
        explanation: 'Type 1 gerçekleşmesi muhtemel gelecek koşullarını anlatır. Type 2 ise şu anki gerçekliğin tersini, hayali veya imkansıza yakın durumları anlatır (Past Simple kullanılır ama anlam şimdiki/gelecek zamandır!).',
        proTip: 'Type 2\'de tüm öznelerle "were" tercih edilir: "If I were you, I would accept the offer." (Senin yerinde olsaydım...)',
        examples: [
          { en: 'If it rains tomorrow, we will cancel the picnic.', tr: 'Yarın yağmur yağarsa pikniği iptal edeceğiz (Type 1).' },
          { en: 'If I had more free time, I would learn Spanish.', tr: 'Daha fazla boş vaktim olsaydı İspanyolca öğrenirdim (Type 2 - şu an vaktim yok).' }
        ]
      },
      {
        id: 'b1-g3',
        title: 'Passive Voice (Edilgen Çatı)',
        trTitle: 'İşi Yapanın Değil, Yapılan İşin Ön Planda Olduğu Cümleler',
        formula: 'Object + be (am/is/are/was/were/has been) + V3 (+ by Subject)',
        explanation: 'Eylemi kimin yaptığı bilinmiyorsa veya önemli değilse nesne başa alınır ve zamanın "be" çekimi + fiilin 3. hali (V3) kullanılır.',
        proTip: 'Zaman ne olursa olsun Passive yapının değişmez imzası "BE + V3" ikilisidir.',
        examples: [
          { en: 'Millions of emails are sent every second.', tr: 'Her saniye milyonlarca e-posta gönderilir.' },
          { en: 'This bridge was built in 1988.', tr: 'Bu köprü 1988 yılında inşa edildi.' }
        ]
      }
    ],
    vocabList: [
      {
        id: 'b1-v1',
        word: 'persuade',
        phonetic: '/pəˈsweɪd/',
        type: 'Fiil',
        tr: 'İkna etmek, razı etmek',
        synonym: 'convince',
        example: 'It took hours to persuade him to join our team.',
        exampleTr: 'Onu ekibimize katılmaya ikna etmek saatler sürdü.',
        clozeOptions: ['persuade', 'hesitate', 'pretend', 'avoid']
      },
      {
        id: 'b1-v2',
        word: 'reliable',
        phonetic: '/rɪˈlaɪ.ə.bəl/',
        type: 'Sıfat',
        tr: 'Güvenilir, sağlam',
        synonym: 'trustworthy, dependable',
        example: 'We need a reliable source of information for our report.',
        exampleTr: 'Raporumuz için güvenilir bir bilgi kaynağına ihtiyacımız var.',
        clozeOptions: ['reliable', 'temporary', 'jealous', 'awkward']
      },
      {
        id: 'b1-v3',
        word: 'postpone',
        phonetic: '/pəʊstˈpəʊn/',
        type: 'Fiil',
        tr: 'Ertelemek (put off)',
        synonym: 'delay, put off',
        example: 'They decided to postpone the outdoor concert due to heavy rain.',
        exampleTr: 'Şiddetli yağmur nedeniyle açık hava konserini ertelemeye karar verdiler.',
        clozeOptions: ['postpone', 'achieve', 'expand', 'deliver']
      },
      {
        id: 'b1-v4',
        word: 'consequence',
        phonetic: '/ˈkɒn.sɪ.kwəns/',
        type: 'İsim',
        tr: 'Sonuç (genelde olumsuz), netice',
        synonym: 'result, outcome',
        example: 'Every decision we make has a consequence.',
        exampleTr: 'Aldığımız her kararın bir sonucu vardır.',
        clozeOptions: ['consequence', 'ingredient', 'equipment', 'permission']
      },
      {
        id: 'b1-v5',
        word: 'give up',
        phonetic: '/ɡɪv ʌp/',
        type: 'Phrasal Verb',
        tr: 'Vazgeçmek, bırakmak, pes etmek',
        synonym: 'quit, stop trying',
        example: 'Never give up on your dreams even when things get tough.',
        exampleTr: 'İşler zorlaşsa bile hayallerinden asla vazgeçme.',
        clozeOptions: ['give up', 'look after', 'run out', 'take off']
      },
      {
        id: 'b1-v6',
        word: 'significant',
        phonetic: '/sɪɡˈnɪf.ɪ.kənt/',
        type: 'Sıfat',
        tr: 'Önemli, kayda değer, belirgin',
        synonym: 'important, notable',
        example: 'There has been a significant increase in renewable energy use.',
        exampleTr: 'Yenilenebilir enerji kullanımında kayda değer bir artış oldu.',
        clozeOptions: ['significant', 'ordinary', 'grateful', 'narrow']
      },
      {
        id: 'b1-v7',
        word: 'afford',
        phonetic: '/əˈfɔːd/',
        type: 'Fiil',
        tr: 'Maddi gücü yetmek, karşılayabilmek',
        synonym: 'have enough money for',
        example: 'We cannot afford to buy a house in the city center right now.',
        exampleTr: 'Şu anda şehir merkezinde bir ev almaya maddi gücümüz yetmez.',
        clozeOptions: ['afford', 'admit', 'remind', 'suffer']
      },
      {
        id: 'b1-v8',
        word: 'encouragement',
        phonetic: '/ɪnˈkʌr.ɪdʒ.mənt/',
        type: 'İsim',
        tr: 'Teşvik, cesaretlendirme, destek',
        synonym: 'support, motivation',
        example: 'Her teacher\'s encouragement gave her the confidence to apply.',
        exampleTr: 'Öğretmeninin teşviki ona başvurma özgüveni verdi.',
        clozeOptions: ['encouragement', 'entertainment', 'disappointment', 'punishment']
      }
    ],
    sentencePuzzles: [
      {
        id: 'b1-sp1',
        trPrompt: 'Senin yerinde olsaydım bu iş teklifini hemen kabul ederdim.',
        grammarTopic: 'Second Conditional (Type 2)',
        correctWords: ['If', 'I', 'were', 'you', 'I', 'would', 'accept', 'this', 'job', 'offer'],
        distractors: ['am', 'will', 'accepted'],
        hint: 'Hayali durumlarda (Type 2): "If I were you, I would + V1" kalıbı kullanılır.'
      },
      {
        id: 'b1-sp2',
        trPrompt: '2018 yılından beri aynı teknoloji şirketinde çalışıyor.',
        grammarTopic: 'Present Perfect (Since/For)',
        correctWords: ['She', 'has', 'worked', 'at', 'the', 'same', 'tech', 'company', 'since', '2018'],
        distractors: ['worked', 'for', 'is'],
        hint: 'Geçmişte başlayıp hala süren eylemlerde "has + V3" ve başlangıç yılıyla "since" kullanılır.'
      },
      {
        id: 'b1-sp3',
        trPrompt: 'Bu tarihi saray on yedinci yüzyılda inşa edildi.',
        grammarTopic: 'Past Simple Passive',
        correctWords: ['This', 'historical', 'palace', 'was', 'built', 'in', 'the', 'seventeenth', 'century'],
        distractors: ['built', 'is', 'has'],
        hint: 'Geçmiş zaman edilgen (Passive) yapıda tekil özne için "was + V3 (built)" kullanılır.'
      },
      {
        id: 'b1-sp4',
        trPrompt: 'Henüz e-postalarıma cevap vermedi.',
        grammarTopic: 'Present Perfect (Yet)',
        correctWords: ['He', 'has', 'not', 'replied', 'to', 'my', 'emails', 'yet'],
        distractors: ['already', 'did', 'reply'],
        hint: '"Yet" (henüz) olumsuz Present Perfect cümlenin sonunda yer alır: "has not + V3 ... yet".'
      },
      {
        id: 'b1-sp5',
        trPrompt: 'Eğer şimdi acele etmezsek son treni kaçıracağız.',
        grammarTopic: 'First Conditional (Unless / If not)',
        correctWords: ['If', 'we', 'do', 'not', 'hurry', 'now', 'we', 'will', 'miss', 'the', 'last', 'train'],
        distractors: ['would', 'missed', 'willn\'t'],
        hint: 'Type 1 koşul cümlesinde "If" kısmında geniş zaman (do not hurry), ana cümlede "will + V1" kullanılır.'
      }
    ],
    grammarQuizzes: [
      {
        id: 'b1-gq1',
        type: 'fill',
        topic: 'Present Perfect vs Past Simple',
        question: 'I _______ my keys! I can\'t get into my apartment right now.',
        options: ['have lost', 'lost', 'was losing', 'had lost'],
        answer: 'have lost',
        explanation: 'Olayın sonucu şu anı doğrudan etkilediği için ("I can\'t get into my apartment right now") Present Perfect ("have lost") kullanılır.'
      },
      {
        id: 'b1-gq2',
        type: 'fill',
        topic: 'Second Conditional',
        question: 'If we _______ a car, we wouldn\'t have to wait for the bus in the rain.',
        options: ['had', 'have', 'would have', 'will have'],
        answer: 'had',
        explanation: 'Ana cümlede "wouldn\'t have to" (Type 2) olduğu için "If" yan cümlesinde Past Simple ("had") kullanılmalıdır.'
      },
      {
        id: 'b1-gq3',
        type: 'fill',
        topic: 'Passive Voice',
        question: 'All flights _______ cancelled this morning because of the thick fog.',
        options: ['were', 'have', 'did', 'had'],
        answer: 'were',
        explanation: '"This morning" geçmiş zamanlı edilgen yapıda çoğul özne ("All flights") ile "were cancelled" (iptal edildi) kullanılır.'
      },
      {
        id: 'b1-gq4',
        type: 'error',
        topic: 'Used to',
        question: 'Geçmişteki bir alışkanlığı anlatan hangi cümle DOĞRUDUR?',
        options: [
          'I used to drink a lot of soda, but now I prefer water.',
          'I use to drank a lot of soda, but now I prefer water.',
          'I am used to drink a lot of soda in the past.',
          'I used to drinking a lot of soda when I was ten.'
        ],
        answer: 'I used to drink a lot of soda, but now I prefer water.',
        explanation: 'Geçmişte yapılıp artık bırakılmış alışkanlıklar için "used to + V1 (drink)" kullanılır.'
      },
      {
        id: 'b1-gq5',
        type: 'fill',
        topic: 'Modals of Deduction / Advice',
        question: 'You _______ bring an umbrella; the weather forecast says it will be sunny all day.',
        options: ['don\'t have to', 'mustn\'t', 'couldn\'t', 'shouldn\'t have'],
        answer: 'don\'t have to',
        explanation: '"Gerek yok / zorunda değilsin" anlamında "don\'t have to" kullanılır. "Mustn\'t" ise yasak bildirir.'
      }
    ]
  },

  {
    id: 'B2',
    name: 'B2 • Upper-Intermediate',
    trName: 'İyi Orta Seviye',
    subtitle: 'Third Conditional, Wish Clauses, Reported Speech, Relative Clauses ve akıcı bağlaçlar.',
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    accentText: 'text-amber-400',
    ringColor: 'ring-amber-500/40',
    boss: {
      name: 'Phantom of Past Regrets',
      trTitle: '3. Tip Koşullar ve Pişmanlıklar Hayaleti',
      emoji: '👻',
      hp: 160,
      quote: '"If you had studied harder, you would have defeated me!" Bakalım başarabilecek misin?'
    },
    grammarLessons: [
      {
        id: 'b2-g1',
        title: 'Third Conditional & Wish Clauses',
        trTitle: 'Geçmişteki Pişmanlıklar ve Keşkeler (Type 3 & I Wish)',
        formula: 'If + had V3, would/could have + V3  |  I wish + Subject + had V3',
        explanation: 'Geçmişte yaşanmış ve artık değiştirilemeyecek olayların tersini hayal ederken ("öyle olsaydı böyle olurdu") Type 3 kullanılır. Geçmişle ilgili "keşke" derken de "I wish / If only + Past Perfect (had V3)" kullanılır.',
        proTip: '"If" cümlesinin içinde ASLA "would have" kullanılmaz! "If" tarafı her zaman "had + V3" alır.',
        examples: [
          { en: 'If I had set my alarm, I wouldn\'t have missed the flight.', tr: 'Alarmımı kurmuş olsaydım uçağı kaçırmazdım.' },
          { en: 'I wish I had listened to your advice earlier.', tr: 'Keşke tavsiyeni daha önce dinleseydim.' }
        ]
      },
      {
        id: 'b2-g2',
        title: 'Relative Clauses (Defining & Non-Defining)',
        trTitle: 'Sıfat Cümlecikleri (Who, Which, Whose, Where)',
        formula: 'Insan: who/that | Nesne: which/that | İyelik: whose | Yer: where (+ Tam Cümle)',
        explanation: 'İsimleri niteleyen yan cümleciklerdir. Bir yer ismi (city, hotel) orada bir eylem yapılıyorsa "where", ama nesne/özne konumundaysa veya edat varsa "which" alır!',
        proTip: 'Virgülle ayrılan (Non-defining) ekstra bilgi cümlelerinde "that" kesinlikle kullanılamaz, sadece "who" veya "which" kullanılır.',
        examples: [
          { en: 'The woman whose car was stolen called the police.', tr: 'Arabası çalınan kadın polisi aradı.' },
          { en: 'The cafe where we met for the first time has closed down.', tr: 'İlk kez buluştuğumuz kafe kapandı.' }
        ]
      },
      {
        id: 'b2-g3',
        title: 'Reported Speech (Indirect Speech)',
        trTitle: 'Dolaylı Anlatım ve Zaman Kayması (Backshift)',
        formula: 'Present -> Past | Past / Present Perfect -> Past Perfect (had V3) | will -> would',
        explanation: 'Birinin söylediği sözü aktarırken ana fiil geçmişteyse (said, told, asked) cümledeki zaman bir derece geçmişe kayar. Soru aktarırken soru dizilimi düz cümleye döner (asked where I lived).',
        proTip: '"Tell" fiilinden sonra mutlaka kime söylendiği gelir (told me), "Say" fiilinden sonra ise nesne gelmez veya "said to me" kullanılır.',
        examples: [
          { en: 'She said that she had already seen that movie.', tr: 'O filmi çoktan izlemiş olduğunu söyledi.' },
          { en: 'He asked me whether I would attend the conference.', tr: 'Bana konferansa katılıp katılmayacağımı sordu.' }
        ]
      }
    ],
    vocabList: [
      {
        id: 'b2-v1',
        word: 'inevitable',
        phonetic: '/ɪˈnev.ɪ.tə.bəl/',
        type: 'Sıfat',
        tr: 'Kaçınılmaz, mukadder',
        synonym: 'unavoidable, certain',
        example: 'Technological change is inevitable in the modern workplace.',
        exampleTr: 'Modern iş dünyasında teknolojik değişim kaçınılmazdır.',
        clozeOptions: ['inevitable', 'optional', 'fragile', 'reluctant']
      },
      {
        id: 'b2-v2',
        word: 'controversial',
        phonetic: '/ˌkɒn.trəˈvɜː.ʃəl/',
        type: 'Sıfat',
        tr: 'Tartışmalı, polemik yaratan',
        synonym: 'debatable, disputed',
        example: 'The new urban policy became a highly controversial topic.',
        exampleTr: 'Yeni kentsel politika oldukça tartışmalı bir konu haline geldi.',
        clozeOptions: ['controversial', 'identical', 'obedient', 'punctual']
      },
      {
        id: 'b2-v3',
        word: 'overcome',
        phonetic: '/ˌəʊ.vəˈkʌm/',
        type: 'Fiil',
        tr: 'Üstesinden gelmek, aşmak, yenmek',
        synonym: 'conquer, defeat',
        example: 'She managed to overcome her fear of public speaking.',
        exampleTr: 'Topluluk önünde konuşma korkusunun üstesinden gelmeyi başardı.',
        clozeOptions: ['overcome', 'exaggerate', 'neglect', 'surrender']
      },
      {
        id: 'b2-v4',
        word: 'reluctant',
        phonetic: '/rɪˈlʌk.tənt/',
        type: 'Sıfat',
        tr: 'İsteksiz, gönülsüz, çekimser',
        synonym: 'unwilling, hesitant',
        example: 'Many investors were reluctant to take risks during the crisis.',
        exampleTr: 'Pek çok yatırımcı kriz sırasında risk세 almaya isteksizdi.',
        clozeOptions: ['reluctant', 'enthusiastic', 'fluent', 'deliberate']
      },
      {
        id: 'b2-v5',
        word: 'come up with',
        phonetic: '/kʌm ʌp wɪð/',
        type: 'Phrasal Verb',
        tr: 'Bir fikir/çözüm üretmek, bulmak',
        synonym: 'devise, invent, propose',
        example: 'We need to come up with a creative marketing strategy by Friday.',
        exampleTr: 'Cuma gününe kadar yaratıcı bir pazarlama stratejisi bulmamız gerekiyor.',
        clozeOptions: ['come up with', 'put up with', 'get away with', 'look down on']
      },
      {
        id: 'b2-v6',
        word: 'substantial',
        phonetic: '/səbˈstæn.ʃəl/',
        type: 'Sıfat',
        tr: 'Önemli miktarda, büyük, hatırı sayılır',
        synonym: 'considerable, significant',
        example: 'The company invested a substantial amount of money in AI research.',
        exampleTr: 'Şirket yapay zeka araştırmalarına hatırı sayılır miktarda para yatırdı.',
        clozeOptions: ['substantial', 'superficial', 'trivial', 'scarce']
      },
      {
        id: 'b2-v7',
        word: 'deteriorate',
        phonetic: '/dɪˈtɪə.ri.ə.reɪt/',
        type: 'Fiil',
        tr: 'Kötüleşmek, bozulmak',
        synonym: 'worsen, decline',
        example: 'Diplomatic relations between the two countries began to deteriorate.',
        exampleTr: 'İki ülke arasındaki diplomatik ilişkiler kötüleşmeye başladı.',
        clozeOptions: ['deteriorate', 'flourish', 'accelerate', 'cooperate']
      },
      {
        id: 'b2-v8',
        word: 'acknowledge',
        phonetic: '/əkˈnɒl.ɪdʒ/',
        type: 'Fiil',
        tr: 'Kabul etmek,承認/onaylamak, takdir etmek',
        synonym: 'admit, recognize',
        example: 'The manager refused to acknowledge that the schedule was unrealistic.',
        exampleTr: 'Yönetici, takvimin gerçekçi olmadığını kabul etmeyi reddetti.',
        clozeOptions: ['acknowledge', 'contradict', 'postpone', 'interrupt']
      }
    ],
    sentencePuzzles: [
      {
        id: 'b2-sp1',
        trPrompt: 'Gerçeği bilseydim sana hemen söylerdim (Geçmişte).',
        grammarTopic: 'Third Conditional (Type 3)',
        correctWords: ['If', 'I', 'had', 'known', 'the', 'truth', 'I', 'would', 'have', 'told', 'you'],
        distractors: ['knew', 'will', 'tell'],
        hint: 'Geçmişin tersini kurgularken (Type 3): "If + had V3, would have + V3" kullanılır.'
      },
      {
        id: 'b2-sp2',
        trPrompt: 'Keşke dün gece o kadar çok kahve içmeseydim.',
        grammarTopic: 'Wish Clauses (Past Regret)',
        correctWords: ['I', 'wish', 'I', 'had', 'not', 'drunk', 'so', 'much', 'coffee', 'last', 'night'],
        distractors: ['did', 'drink', 'would'],
        hint: 'Geçmişteki pişmanlıklar için "I wish + Subject + had (not) + V3" kullanılır.'
      },
      {
        id: 'b2-sp3',
        trPrompt: 'Bana bir sonraki toplantının ne zaman başlayacağını sordu.',
        grammarTopic: 'Reported Questions',
        correctWords: ['She', 'asked', 'me', 'when', 'the', 'next', 'meeting', 'would', 'start'],
        distractors: ['will', 'did', 'starts'],
        hint: 'Dolaylı sorularda "will -> would" olur ve yardımcı fiil özneden sonra gelir (düz cümle sırası).'
      },
      {
        id: 'b2-sp4',
        trPrompt: 'Kitapları yirmi dile çevrilen yazar ödülü kazandı.',
        grammarTopic: 'Relative Clauses (Whose)',
        correctWords: ['The', 'author', 'whose', 'books', 'were', 'translated', 'won', 'the', 'award'],
        distractors: ['who', 'which', 'whom'],
        hint: 'İyelik (yazarın kitapları -> whose books) bildiren sıfat cümleciklerinde "whose + isim" kullanılır.'
      },
      {
        id: 'b2-sp5',
        trPrompt: 'Şiddetli fırtınaya rağmen uçak zamanında indi.',
        grammarTopic: 'Connectors of Contrast (Despite)',
        correctWords: ['Despite', 'the', 'heavy', 'storm', 'the', 'plane', 'landed', 'on', 'time'],
        distractors: ['Although', 'However', 'Because'],
        hint: '"Despite" bağlacından sonra tam cümle değil, isim tamlaması (the heavy storm) gelir.'
      }
    ],
    grammarQuizzes: [
      {
        id: 'b2-gq1',
        type: 'fill',
        topic: 'Third Conditional',
        question: 'If the goalkeeper _______ the ball, our team would have won the championship.',
        options: ['had caught', 'caught', 'would have caught', 'has caught'],
        answer: 'had caught',
        explanation: 'Ana cümlede "would have won" (Type 3) olduğu için "If" cümlesinde Past Perfect ("had caught") kullanılmalıdır.'
      },
      {
        id: 'b2-gq2',
        type: 'fill',
        topic: 'Relative Clauses',
        question: 'The research institute _______ my sister works has just developed a new vaccine.',
        options: ['where', 'which', 'whose', 'who'],
        answer: 'where',
        explanation: 'Enstitüde bir eylem gerçekleştiği için ("in which my sister works" = "where my sister works") yer bildiren "where" kullanılır.'
      },
      {
        id: 'b2-gq3',
        type: 'fill',
        topic: 'Future Perfect',
        question: 'By the end of this year, she _______ at the university for a decade.',
        options: ['will have taught', 'will teach', 'is teaching', 'has taught'],
        answer: 'will have taught',
        explanation: '"By + gelecek zaman" (By the end of this year) ifadesi gelecekte bir noktada tamamlanmış olacak süreyi anlatır ve Future Perfect ("will have + V3") gerektirir.'
      },
      {
        id: 'b2-gq4',
        type: 'error',
        topic: 'Gerund & Infinitive / Used to',
        question: 'Hangi cümle "alışkın olmak" anlamında dilbilgisi açısından DOĞRUDUR?',
        options: [
          'I am used to waking up early for morning shifts.',
          'I am used to wake up early for morning shifts.',
          'I used to waking up early right now.',
          'I get use to wake up early every day.'
        ],
        answer: 'I am used to waking up early for morning shifts.',
        explanation: '"Be / Get used to" (bir şeye alışkın olmak / alışmak) yapısındaki "to" edattır ve ardından gelen fiil "-ing" (Gerund) alır!'
      },
      {
        id: 'b2-gq5',
        type: 'fill',
        topic: 'Causatives (Ettirgen Çatı)',
        question: 'We need to _______ our roof _______ before the winter rains start.',
        options: ['have / repaired', 'make / repair', 'get / repair', 'had / repairing'],
        answer: 'have / repaired',
        explanation: 'Bir işi başkasına yaptırmak (Causative) anlamında "have + something (nesne) + V3 (repaired)" yapısı kullanılır.'
      }
    ]
  },

  {
    id: 'C1',
    name: 'C1 • Advanced',
    trName: 'İleri Seviye',
    subtitle: 'Devrik cümleler (Inversion), Mixed Conditionals, Cleft Sentences, Past Modals ve akademik kelimeler.',
    color: 'from-rose-500 to-pink-600',
    badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    accentText: 'text-rose-400',
    ringColor: 'ring-rose-500/40',
    boss: {
      name: 'Valkyrie of Inversion',
      trTitle: 'Devrik Yapılar ve Akademik Üslup Efendisi',
      emoji: '⚔️',
      hp: 180,
      quote: '"Never have I seen such courage!" Devrik cümlelerin ve karma koşulların ustası mısın?'
    },
    grammarLessons: [
      {
        id: 'c1-g1',
        title: 'Negative Inversion (Devrik Cümleler)',
        trTitle: 'Vurgu İçin Olumsuz Zarflarla Devrik Yapı Kurma',
        formula: 'Never / Seldom / Not only / Little + Auxiliary (do/did/have/had) + Subject + Verb',
        explanation: 'Cümleye güçlü ve edebi/akademik bir vurgu katmak için olumsuz veya kısıtlayıcı zarflar (Never, Rarely, Not only, Hardly... when, No sooner... than, Little) cümle başına alındığında cümle tıpkı soru cümlesi gibi devrik (Yardımcı Fiil + Özne) kurulur!',
        proTip: '"Not only" veya "Little" cümle başındaysa hemen arkasından "did / have / had / is" gibi bir yardımcı fiil gelmek zorundadır.',
        examples: [
          { en: 'Never have I witnessed such a breathtaking performance.', tr: 'Hayatımda böylesine nefes kesici bir performansa asla tanık olmadım.' },
          { en: 'Not only did she finish the report early, but she also fixed the errors.', tr: 'Raporu sadece erken bitirmekle kalmadı, aynı zamanda hataları da düzeltti.' },
          { en: 'Little did they know that the plan had already changed.', tr: 'Planın çoktan değiştiğinden hiç haberleri yoktu.' }
        ]
      },
      {
        id: 'c1-g2',
        title: 'Mixed Conditionals (Karma Koşul Cümleleri)',
        trTitle: 'Geçmişteki Koşulun Şimdiki Sonucu (Type 3 + Type 2)',
        formula: 'If + Past Perfect (had V3 - Geçmiş), would + V1 (now - Şimdi)',
        explanation: 'Geçmişte gerçekleşmiş (veya gerçekleşmemiş) bir olayın "bugünkü / şu anki" sonucunu anlatırken If kısmında Type 3 (had V3), ana cümlede ise Type 2 (would + V1) birleştirilir.',
        proTip: 'Cümlenin sonunda "now, today, right now" gibi ipuçları varsa ana cümle "would have V3" değil, "would + V1 (be)" olur!',
        examples: [
          { en: 'If I had accepted that job in Berlin, I would live in Germany now.', tr: 'Berlin\'deki o işi (geçmişte) kabul etseydim, şu anda Almanya\'da yaşıyor olurdum.' },
          { en: 'If she weren\'t so fearless, she wouldn\'t have climbed that mountain yesterday.', tr: '(Genel olarak) bu kadar korkusuz olmasaydı, dün o dağa tırmanmazdı.' }
        ]
      },
      {
        id: 'c1-g3',
        title: 'Past Modals of Deduction & Regret',
        trTitle: 'Geçmişe Yönelik Çıkarım ve Eleştiri (Must/Can\'t/Should Have V3)',
        formula: 'must have V3 (%95 çıkarım) | can\'t have V3 (imkansız) | should have V3 (yapmalıydı ama yapmadı)',
        explanation: 'Geçmişteki bir olay hakkında güçlü tahmin yürütürken "must have V3" (olmalı) ve "can\'t/couldn\'t have V3" (olamaz); geçmişte yapılmayan bir şeyi eleştirirken "should / ought to have V3" kullanılır.',
        proTip: '"Mustn\'t have V3" diye bir çıkarım kalıbı YOKTUR! Olumsuz geçmiş çıkarım her zaman "can\'t have V3" veya "couldn\'t have V3" ile yapılır.',
        examples: [
          { en: 'The streets are soaking wet; it must have rained heavily last night.', tr: 'Sokaklar sırılsıklam; dün gece şiddetli yağmur yağmış olmalı.' },
          { en: 'You should have backed up your files before updating the system.', tr: 'Sistemi güncellemeden önce dosyalarını yedeklemeliydin (ama yedeklemedin).' }
        ]
      }
    ],
    vocabList: [
      {
        id: 'c1-v1',
        word: 'ubiquitous',
        phonetic: '/juːˈbɪk.wɪ.təs/',
        type: 'Sıfat',
        tr: 'Her yerde bulunan, çok yaygın',
        synonym: 'omnipresent, pervasive',
        example: 'Smartphones have become ubiquitous in modern society.',
        exampleTr: 'Akıllı telefonlar modern toplumda her yerde bulunur hale geldi.',
        clozeOptions: ['ubiquitous', 'ambiguous', 'obsolete', 'sporadic']
      },
      {
        id: 'c1-v2',
        word: 'mitigate',
        phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
        type: 'Fiil',
        tr: 'Hafifletmek, azaltmak, yatıştırmak',
        synonym: 'alleviate, reduce',
        example: 'Planting more trees helps mitigate the effects of climate change.',
        exampleTr: 'Daha fazla ağaç dikmek iklim değişikliğinin etkilerini hafifletmeye yardımcı olur.',
        clozeOptions: ['mitigate', 'aggravate', 'provoke', 'jeopardize']
      },
      {
        id: 'c1-v3',
        word: 'scrutinize',
        phonetic: '/ˈskruː.tɪ.naɪz/',
        type: 'Fiil',
        tr: 'Titizlikle incelemek, didik didik etmek',
        synonym: 'examine closely, inspect',
        example: 'Auditors will scrutinize every financial transaction of the firm.',
        exampleTr: 'Denetçiler firmanın her finansal işlemini titizlikle inceleyecek.',
        clozeOptions: ['scrutinize', 'overlook', 'fabricate', 'speculate']
      },
      {
        id: 'c1-v4',
        word: 'ambiguous',
        phonetic: '/æmˈbɪɡ.ju.əs/',
        type: 'Sıfat',
        tr: 'Muğlak, belirsiz, iki anlamlı',
        synonym: 'vague, unclear, equivocal',
        example: 'The wording of the contract was deliberately left ambiguous.',
        exampleTr: 'Sözleşmenin ifadeleri kasıtlı olarak muğlak bırakılmıştı.',
        clozeOptions: ['ambiguous', 'explicit', 'coherent', 'transparent']
      },
      {
        id: 'c1-v5',
        word: 'unprecedented',
        phonetic: '/ʌnˈpres.ɪ.den.tɪd/',
        type: 'Sıfat',
        tr: 'Eşi benzeri görülmemiş, emsalsiz',
        synonym: 'unmatched, extraordinary',
        example: 'The scientific discovery led to unprecedented medical breakthroughs.',
        exampleTr: 'Bilimsel keşif, eşi benzeri görülmemiş tıbbi atılımlara yol açtı.',
        clozeOptions: ['unprecedented', 'conventional', 'redundant', 'mediocre']
      },
      {
        id: 'c1-v6',
        word: 'meticulous',
        phonetic: '/məˈtɪk.jə.ləs/',
        type: 'Sıfat',
        tr: 'Çok titiz, kılı kırk yaran, özenli',
        synonym: 'thorough, fastidious',
        example: 'Restoring ancient paintings requires meticulous attention to detail.',
        exampleTr: 'Antik tabloları restore etmek detaylara çok titiz bir dikkat gerektirir.',
        clozeOptions: ['meticulous', 'negligent', 'reckless', 'arbitrary']
      },
      {
        id: 'c1-v7',
        word: 'plausible',
        phonetic: '/ˈplɔː.zə.bəl/',
        type: 'Sıfat',
        tr: 'Makul, akla yatkın, inandırıcı',
        synonym: 'believable, credible',
        example: 'Scientists proposed a plausible explanation for the anomaly.',
        exampleTr: 'Bilim insanları anomali için akla yatkın bir açıklama önerdiler.',
        clozeOptions: ['plausible', 'absurd', 'futile', 'hostile']
      },
      {
        id: 'c1-v8',
        word: 'jeopardize',
        phonetic: '/ˈdʒep.ə.daɪz/',
        type: 'Fiil',
        tr: 'Tehlikeye atmak, riske sokmak',
        synonym: 'endanger, imperil',
        example: 'A single security breach could jeopardize the entire operation.',
        exampleTr: 'Tek bir güvenlik ihlali tüm operasyonu tehlikeye atabilir.',
        clozeOptions: ['jeopardize', 'consolidate', 'facilitate', 'cultivate']
      }
    ],
    sentencePuzzles: [
      {
        id: 'c1-sp1',
        trPrompt: 'Raporu sadece erken bitirmekle kalmadı, aynı zamanda sunumu da hazırladı.',
        grammarTopic: 'Negative Inversion (Not only... but also)',
        correctWords: ['Not', 'only', 'did', 'she', 'finish', 'the', 'report', 'early', 'but', 'she', 'also', 'prepared', 'the', 'presentation'],
        distractors: ['finished', 'was', 'does'],
        hint: '"Not only" cümle başına geldiğinde devrik yapı kurulur: "Not only + did + she + finish...".'
      },
      {
        id: 'c1-sp2',
        trPrompt: 'Haritayı yanımıza almış olsaydık şu anda kaybolmuş olmazdık.',
        grammarTopic: 'Mixed Conditional (Past -> Present)',
        correctWords: ['If', 'we', 'had', 'brought', 'the', 'map', 'we', 'would', 'not', 'be', 'lost', 'now'],
        distractors: ['been', 'brought', 'have'],
        hint: 'Geçmiş koşul (had brought) + şimdiki sonuç (would not be lost now) karma koşul cümlesidir.'
      },
      {
        id: 'c1-sp3',
        trPrompt: 'Toplantının iptal edildiğinden hiç haberimiz yoktu.',
        grammarTopic: 'Negative Inversion (Little did...)',
        correctWords: ['Little', 'did', 'we', 'know', 'that', 'the', 'meeting', 'had', 'been', 'cancelled'],
        distractors: ['knew', 'do', 'were'],
        hint: '"Little" olumsuz anlam taşıdığı için başta olduğunda "Little did we know..." şeklinde devrik olur.'
      },
      {
        id: 'c1-sp4',
        trPrompt: 'Telefonunu evde unutmuş olmalı çünkü aramalara cevap vermiyor.',
        grammarTopic: 'Past Modals of Deduction',
        correctWords: ['He', 'must', 'have', 'left', 'his', 'phone', 'at', 'home'],
        distractors: ['should', 'leave', 'has'],
        hint: 'Geçmişe dair güçlü çıkarım için "must have + V3 (left)" kullanılır.'
      },
      {
        id: 'c1-sp5',
        trPrompt: 'Beni en çok şaşırtan şey onun sakin tepkisiydi.',
        grammarTopic: 'Wh- Cleft Sentences',
        correctWords: ['What', 'surprised', 'me', 'most', 'was', 'his', 'calm', 'reaction'],
        distractors: ['That', 'Which', 'were'],
        hint: 'Vurgu cümlesinde (Cleft Sentence) "What + fiil ... + was + vurgulanan öğe" kullanılır.'
      }
    ],
    grammarQuizzes: [
      {
        id: 'c1-gq1',
        type: 'fill',
        topic: 'Inversion (No sooner... than)',
        question: 'No sooner _______ the contract than a better offer arrived from a rival company.',
        options: ['had he signed', 'he had signed', 'did he signed', 'has he signed'],
        answer: 'had he signed',
        explanation: '"No sooner ... than" kalıbı cümle başında Past Perfect devrik yapı ("had + subject + V3") alır.'
      },
      {
        id: 'c1-gq2',
        type: 'fill',
        topic: 'Mixed Conditionals',
        question: 'If she hadn\'t wasted all her savings last year, she _______ able to afford this apartment right now.',
        options: ['would be', 'would have been', 'will be', 'had been'],
        answer: 'would be',
        explanation: 'Koşul geçmişte ("last year - hadn\'t wasted"), sonuç ise şu anda ("right now") olduğu için Mixed Conditional ("would be") kullanılır.'
      },
      {
        id: 'c1-gq3',
        type: 'fill',
        topic: 'Past Modals of Deduction',
        question: 'You _______ seen Sarah at the office this morning; she flew to Tokyo two days ago!',
        options: ['can\'t have', 'mustn\'t have', 'shouldn\'t have', 'needn\'t have'],
        answer: 'can\'t have',
        explanation: 'Geçmişte bir şeyin gerçekleşmiş olmasının imkansız olduğunu ("görmüş olamazsın") belirtirken "can\'t have + V3" kullanılır.'
      },
      {
        id: 'c1-gq4',
        type: 'error',
        topic: 'Participle Clauses',
        question: 'Hangi cümle ileri seviye bağlaç/ortaç yapısı açısından DOĞRUDUR?',
        options: [
          'Having finished her master\'s thesis, she decided to take a month off.',
          'Finished her master\'s thesis, she decided to take a month off.',
          'Having been finish her master\'s thesis, she took a month off.',
          'Being finish her master\'s thesis, she decided to take a month off.'
        ],
        answer: 'Having finished her master\'s thesis, she decided to take a month off.',
        explanation: 'Ana eylemden daha önce tamamlanmış etken bir eylemi kısaltırken Perfect Participle ("Having + V3") kullanılır.'
      },
      {
        id: 'c1-gq5',
        type: 'fill',
        topic: 'It\'s high time',
        question: 'It is high time the municipality _______ serious measures against air pollution.',
        options: ['took', 'takes', 'will take', 'has taken'],
        answer: 'took',
        explanation: '"It\'s (high/about) time + Subject + V2 (Past Simple)" yapısı "artık bir şeyin yapılmasının vakti çoktan geldi" anlamında şimdiki zamana yönelik eleştiri bildirir.'
      }
    ]
  },

  {
    id: 'C2',
    name: 'C2 • Proficiency',
    trName: 'Uzman Seviye (Mastery)',
    subtitle: 'Subjunctive Mood, ileri devrik ve vurgulu yapılar, edebi/akademik nüanslar ve C2 sözvarlığı.',
    color: 'from-fuchsia-500 to-purple-600',
    badgeBg: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30',
    accentText: 'text-fuchsia-400',
    ringColor: 'ring-fuchsia-500/40',
    boss: {
      name: 'Archmage of Subjunctive & Nuance',
      trTitle: 'C2 Dilbilim Başbüyücüsü',
      emoji: '👑',
      hp: 200,
      quote: '"Be that as it may, it is imperative that a challenger prove their mastery!"'
    },
    grammarLessons: [
      {
        id: 'c2-g1',
        title: 'The Mandative Subjunctive Mood',
        trTitle: 'Resmi Gereklilik ve İstek Kipi (That + Subject + Yalın Fiil)',
        formula: 'It is imperative / essential / vital / demanded + that + Subject + V1 (bare infinitive / be)',
        explanation: 'C2 resmi ve akademik İngilizcede "recommend, demand, insist, imperative, vital, crucial" gibi kelime ve sıfatlardan sonra gelen "that" cümleciğinde özne tekil (he/she/it) veya geçmiş zaman olsa bile fiil hiçbir ek almadan YALIN (V1 / be) kullanılır!',
        proTip: 'Olumsuz Subjunctive yapıda "doesn\'t / didn\'t" kullanılmaz; doğrudan "not + V1" gelir: "...insisted that he not be late."',
        examples: [
          { en: 'It is imperative that every candidate submit the dossier on time.', tr: 'Her adayın dosyayı zamanında teslim etmesi şarttır (submits değil, submit!).' },
          { en: 'The board demanded that the CEO be present at the inquiry.', tr: 'Kurul, CEO\'nun soruşturmada hazır bulunmasını talep etti (is/was değil, be!).' }
        ]
      },
      {
        id: 'c2-g2',
        title: 'Advanced Fronting & Concession Clauses',
        trTitle: 'Öne Alma (Fronting) ve Zıtlık Yapıları (Try as he might / Albeit)',
        formula: 'Adjective/Verb + as/though + Subject + Verb/Aux  |  Such + be + Noun + that...',
        explanation: '"Although" yerine sıfat veya fiili cümle başına alarak yapılan "Much as I respect him...", "Try as she might...", "Strange though it may seem..." yapıları ile "albeit" (her ne kadar ... olsa da) C2 seviyesinin imzasıdır.',
        proTip: '"Such was the force of the explosion that..." yapısında "Such" başa geldiği için "was" özneden önce gelir.',
        examples: [
          { en: 'Try as he might, he could not decipher the ancient manuscript.', tr: 'Ne kadar çabalarsa çabalasın antik el yazmasını çözemedi.' },
          { en: 'He accepted the position, albeit with some initial hesitation.', tr: 'Başlangıçta biraz tereddütle de olsa pozisyonu kabul etti.' }
        ]
      },
      {
        id: 'c2-g3',
        title: 'Prepositional & Conditional Inversion (Were / Had / Should)',
        trTitle: '"If" Kullanmadan Kurulan Resmi Koşul Yapıları',
        formula: 'Should + S + V1 (Type 1) | Were + S + to V1 (Type 2) | Had + S + V3 (Type 3)',
        explanation: 'Koşul cümlelerinde "If" bağlacı atılarak yardımcı fiil (Should, Were, Had) cümle başına çekilir. Olumsuz olduğunda "not" asla kısaltılmaz, özneden sonra ayrı yazılır: "Had it not been for..." (Eğer ... olmasaydı).',
        proTip: '"But for" ve "Were it not for" (Şu an ... olmasa) ile "Had it not been for" (Geçmişte ... olmasaydı) yapılarını birbirine karıştırmayın!',
        examples: [
          { en: 'Had it not been for your timely intervention, the project would have collapsed.', tr: 'Zamanında müdahaleniz olmasaydı proje çökerdi.' },
          { en: 'Were the government to raise interest rates, inflation might slow down.', tr: 'Hükümet faiz oranlarını artıracak olsa enflasyon yavaşlayabilir.' }
        ]
      }
    ],
    vocabList: [
      {
        id: 'c2-v1',
        word: 'ephemeral',
        phonetic: '/ɪˈfem.ər.əl/',
        type: 'Sıfat',
        tr: 'Geçici, kısa ömürlü, fani',
        synonym: 'fleeting, transient, short-lived',
        example: 'Fame on social media is often ephemeral and unpredictable.',
        exampleTr: 'Sosyal medyadaki şöhret çoğu zaman geçici ve öngörülemezdir.',
        clozeOptions: ['ephemeral', 'perpetual', 'innate', 'mundane']
      },
      {
        id: 'c2-v2',
        word: 'quintessential',
        phonetic: '/ˌkwɪn.tɪˈsen.ʃəl/',
        type: 'Sıfat',
        tr: 'En tipik, özünü yansıtan, mükemmel örnek',
        synonym: 'archetypal, classic, ideal',
        example: 'She is the quintessential diplomat: tactful, eloquent, and composed.',
        exampleTr: 'O, bir diplomatın en mükemmel örneğidir: nazik, belagatli ve soğukkanlı.',
        clozeOptions: ['quintessential', 'superfluous', 'perfunctory', 'erratic']
      },
      {
        id: 'c2-v3',
        word: 'obfuscate',
        phonetic: '/ˈɒb.fʌs.keɪt/',
        type: 'Fiil',
        tr: 'Bulandırmak, kasıtlı olarak karmaşıklaştırmak',
        synonym: 'obscure, confuse, muddle',
        example: 'Politicians sometimes use technical jargon to obfuscate the real issue.',
        exampleTr: 'Politikacılar bazen asıl meseleyi bulandırmak için teknik jargon kullanırlar.',
        clozeOptions: ['obfuscate', 'elucidate', 'corroborate', 'ameliorate']
      },
      {
        id: 'c2-v4',
        word: 'panacea',
        phonetic: '/ˌpæn.əˈsiː.ə/',
        type: 'İsim',
        tr: 'Her derde deva, tüm sorunların tek çözümü',
        synonym: 'cure-all, universal remedy',
        example: 'Artificial intelligence is a powerful tool, but it is not a panacea for all economic ills.',
        exampleTr: 'Yapay zeka güçlü bir araçtır ancak tüm ekonomik sorunlar için her derde deva bir çözüm değildir.',
        clozeOptions: ['panacea', 'dichotomy', 'conundrum', 'catalyst']
      },
      {
        id: 'c2-v5',
        word: 'ostensibly',
        phonetic: '/ɒˈsten.sə.bli/',
        type: 'Zarf',
        tr: 'Görünüşte, zahiren, sözde (gerçekte farklı)',
        synonym: 'apparently, seemingly',
        example: 'The summit was ostensibly about trade, yet security dominated the talks.',
        exampleTr: 'Zirve görünüşte ticaret hakkındaydı, ancak görüşmelere güvenlik damgasını vurdu.',
        clozeOptions: ['ostensibly', 'unanimously', 'inadvertently', 'unequivocally']
      },
      {
        id: 'c2-v6',
        word: 'idiosyncrasy',
        phonetic: '/ˌɪd.i.əˈsɪŋ.krə.si/',
        type: 'İsim',
        tr: 'Kişiye özgü tuhaf huy, kendine has özellik',
        synonym: 'peculiarity, quirk, eccentricity',
        example: 'Every great writer has stylistic idiosyncrasies that make their prose unique.',
        exampleTr: 'Her büyük yazarın düzyazısını benzersiz kılan kendine has üslup özellikleri vardır.',
        clozeOptions: ['idiosyncrasy', 'hegemony', 'discrepancy', 'trajectory']
      },
      {
        id: 'c2-v7',
        word: 'magnanimous',
        phonetic: '/mæɡˈnæn.ɪ.məs/',
        type: 'Sıfat',
        tr: 'Yüce gönüllü, bağışlayıcı,寬/alicenap',
        synonym: 'generous, forgiving, noble',
        example: 'The champion was magnanimous in victory, praising his opponent\'s skill.',
        exampleTr: 'Şampiyon zaferinde yüce gönüllü davrandı ve rakibinin yeteneğini övdü.',
        clozeOptions: ['magnanimous', 'vindictive', 'parsimonious', 'recalcitrant']
      },
      {
        id: 'c2-v8',
        word: 'juxtaposition',
        phonetic: '/ˌdʒʌk.stə.pəˈzɪʃ.ən/',
        type: 'İsim',
        tr: 'Yan yana koyma (zıtlık/kıyas oluşturacak şekilde)',
        synonym: 'contrast, side-by-side placement',
        example: 'The film uses a striking juxtaposition of wealth and extreme poverty.',
        exampleTr: 'Film, zenginlik ve aşırı yoksulluğun çarpıcı bir yan yana gelişini kullanıyor.',
        clozeOptions: ['juxtaposition', 'proliferation', 'ramification', 'predicament']
      }
    ],
    sentencePuzzles: [
      {
        id: 'c2-sp1',
        trPrompt: 'Zamanında müdahalen olmasaydı müzakereler tamamen çökmüş olurdu.',
        grammarTopic: 'Inverted Conditional (Had it not been for)',
        correctWords: ['Had', 'it', 'not', 'been', 'for', 'your', 'timely', 'intervention', 'negotiations', 'would', 'have', 'collapsed'],
        distractors: ['If', 'was', 'hadn\'t'],
        hint: '"If it had not been for" kalıbı C2 devrik yapıda "Had it not been for..." olarak kurulur.'
      },
      {
        id: 'c2-sp2',
        trPrompt: 'Komite, tüm tanıkların derhal dinlenmesinde ısrar etti.',
        grammarTopic: 'Mandative Subjunctive (Passive)',
        correctWords: ['The', 'committee', 'insisted', 'that', 'all', 'witnesses', 'be', 'questioned', 'immediately'],
        distractors: ['were', 'are', 'would'],
        hint: '"Insist that..." subjunctive yapısında edilgen fiil "be + V3 (be questioned)" olarak yalın kalır.'
      },
      {
        id: 'c2-sp3',
        trPrompt: 'Ne kadar uğraşırsa uğraşsın şifreli mesajı çözemedi.',
        grammarTopic: 'Concessive Fronting (Try as she might)',
        correctWords: ['Try', 'as', 'she', 'might', 'she', 'could', 'not', 'decipher', 'the', 'encrypted', 'message'],
        distractors: ['Although', 'tried', 'Even'],
        hint: '"Try as + Subject + might" kalıbı "Ne kadar çabalarsa çabalasın" anlamında C2 zıtlık yapısıdır.'
      },
      {
        id: 'c2-sp4',
        trPrompt: 'Fırtınanın şiddeti o kadar büyüktü ki yüzlerce ağaç kökünden söküldü.',
        grammarTopic: 'Inversion with Such (Such + be + Noun)',
        correctWords: ['Such', 'was', 'the', 'ferocity', 'of', 'the', 'storm', 'that', 'hundreds', 'of', 'trees', 'fell'],
        distractors: ['So', 'it', 'were'],
        hint: '"Such + be (was/were) + the + Noun + that..." devrik bir sebep-sonuç cümlesidir.'
      },
      {
        id: 'c2-sp5',
        trPrompt: 'Herhangi bir aksaklık çıkacak olursa lütfen doğrudan benimle iletişime geçin.',
        grammarTopic: 'Type 1 Conditional Inversion (Should)',
        correctWords: ['Should', 'any', 'complications', 'arise', 'please', 'contact', 'me', 'directly'],
        distractors: ['arises', 'Would', 'arose'],
        hint: '"If any complications should arise" yapısı devrik olduğunda "Should + Subject + V1 (arise)" olur.'
      }
    ],
    grammarQuizzes: [
      {
        id: 'c2-gq1',
        type: 'fill',
        topic: 'Mandative Subjunctive',
        question: 'The supreme court mandated that the confidential documents _______ unsealed before Friday.',
        options: ['not be', 'are not', 'were not', 'don\'t be'],
        answer: 'not be',
        explanation: '"Mandate that..." sonrasında Subjunctive (dilek/gereklilik) kipi kullanılır; olumsuz edilgen hali yardımcı fiil almadan "not be + V3" şeklinde kurulur.'
      },
      {
        id: 'c2-gq2',
        type: 'fill',
        topic: 'Inverted Conditionals',
        question: '_______ the central bank to tighten monetary policy further, small enterprises might face severe liquidity shortages.',
        options: ['Were', 'Had', 'Should', 'Unless'],
        answer: 'Were',
        explanation: 'Devamında "to tighten ... might face" (Type 2) olduğu için devrik koşul cümlesi "Were + Subject + to V1" ile başlar.'
      },
      {
        id: 'c2-gq3',
        type: 'fill',
        topic: 'Advanced Concession',
        question: 'Ingenious _______ the proposal appeared on paper, it proved impractical in real-world testing.',
        options: ['though', 'despite', 'however', 'nevertheless'],
        answer: 'though',
        explanation: 'Sıfatın cümle başına alındığı devrik zıtlık yapısında "Adjective (Ingenious) + as/though + Subject + Verb" kullanılır.'
      },
      {
        id: 'c2-gq4',
        type: 'error',
        topic: 'Negative Inversion & Subjunctive',
        question: 'Hangi C2 cümlesi dilbilgisi açısından TAMAMEN DOĞRUDUR?',
        options: [
          'Under no circumstances should sensitive credentials be transmitted over unencrypted channels.',
          'Under no circumstances sensitive credentials should be transmitted over unencrypted channels.',
          'Not until the audit was completed they realized the scale of the discrepancy.',
          'Scarcely had the lecture began when the fire alarm went off.'
        ],
        answer: 'Under no circumstances should sensitive credentials be transmitted over unencrypted channels.',
        explanation: '"Under no circumstances" cümle başında olduğunda yardımcı fiil ("should") özneden önce gelir (Inversion).'
      },
      {
        id: 'c2-gq5',
        type: 'fill',
        topic: 'Discourse Markers & Prepositional Phrases',
        question: '_______ the initial skepticism from critics, the symphony was hailed as a modern masterpiece.',
        options: ['Notwithstanding', 'Albeit', 'Whereas', 'Concurrently'],
        answer: 'Notwithstanding',
        explanation: '"Notwithstanding + Noun Phrase" (-e rağmen / buna karşın) resmi C2 metinlerinde "Despite" yerine kullanılan güçlü bir edat/bağlaçtır.'
      }
    ]
  }
];

export const PLACEMENT_QUESTIONS = [
  {
    id: 'pq-1',
    level: 'A1',
    question: 'Where _______ your brother work? — He works at a hospital in Ankara.',
    options: ['does', 'is', 'do', 'has'],
    answer: 'does',
    weight: 1
  },
  {
    id: 'pq-2',
    level: 'A2',
    question: 'We didn\'t _______ anywhere last weekend because the weather was terrible.',
    options: ['go', 'went', 'gone', 'going'],
    answer: 'go',
    weight: 2
  },
  {
    id: 'pq-3',
    level: 'B1',
    question: 'If I _______ enough money right now, I would travel around the world.',
    options: ['had', 'have', 'will have', 'would have'],
    answer: 'had',
    weight: 3
  },
  {
    id: 'pq-4',
    level: 'B2',
    question: 'If you had told me about the deadline earlier, I _______ helped you finish the report.',
    options: ['would have', 'will have', 'would', 'had'],
    answer: 'would have',
    weight: 4
  },
  {
    id: 'pq-5',
    level: 'C1',
    question: 'Rarely _______ such a meticulous analysis of the economic crisis.',
    options: ['have we seen', 'we have seen', 'saw we', 'we did see'],
    answer: 'have we seen',
    weight: 5
  },
  {
    id: 'pq-6',
    level: 'C2',
    question: 'The regulatory board insisted that the audit _______ conducted by an independent party.',
    options: ['be', 'is', 'was', 'would'],
    answer: 'be',
    weight: 6
  }
];

export const BADGES_LIST = [
  {
    id: 'first_win',
    title: 'İlk Kıvılcım',
    desc: 'İlk oyun modunu başarıyla tamamladın!',
    icon: 'Sparkles',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 'combo_5',
    title: 'Ateş Serisi (5x)',
    desc: 'Üst üste 5 soruyu hatasız yanıtladın!',
    icon: 'Flame',
    color: 'text-orange-400 bg-orange-500/10 border-orange-500/30'
  },
  {
    id: 'vocab_hunter',
    title: 'Kelime Avcısı',
    desc: 'En az 10 kelimeyi ezberledin ve doğru eşleştirdin!',
    icon: 'BookOpen',
    color: 'text-sky-400 bg-sky-500/10 border-sky-500/30'
  },
  {
    id: 'grammar_architect',
    title: 'Gramer Mimarı',
    desc: 'Cümle İnşaatçısı modunda 5 cümleyi hatasız kurdun!',
    icon: 'Puzzle',
    color: 'text-violet-400 bg-violet-500/10 border-violet-500/30'
  },
  {
    id: 'boss_slayer',
    title: 'Boss Avcısı',
    desc: 'Bir seviyenin Boss Savaşını kazandın!',
    icon: 'Swords',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  },
  {
    id: 'c2_master',
    title: 'C2 Dil Efsanesi',
    desc: 'C2 Uzman seviyesinde bir oyun modunu tamamladın!',
    icon: 'Crown',
    color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30'
  }
];
