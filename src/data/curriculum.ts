import { extendedVocabulary } from "@/data/extended-vocabulary";

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type VocabularyWord = {
  id: string;
  level: CefrLevel;
  german: string;
  uzbek: string;
  phonetic: string;
  partOfSpeech: string;
  category: string;
  example: string;
  exampleUzbek: string;
};

export type CourseModule = {
  id: string;
  level: CefrLevel;
  order: number;
  title: string;
  description: string;
  minutes: number;
  focus: string;
};

export const levels: {
  id: CefrLevel;
  name: string;
  description: string;
  goal: string;
  hours: string;
}[] = [
  { id: "A1", name: "Boshlang‘ich", description: "Oddiy so‘zlar va kundalik iboralar", goal: "O‘zingizni tanishtirish", hours: "80–100 soat" },
  { id: "A2", name: "Elementar", description: "Tanish mavzularda sodda muloqot", goal: "Kundalik vaziyatlarda gaplashish", hours: "100–150 soat" },
  { id: "B1", name: "O‘rta", description: "Sayohat, ish va fikrlarni ifodalash", goal: "Mustaqil suhbat qurish", hours: "150–200 soat" },
  { id: "B2", name: "Yuqori o‘rta", description: "Murakkab matn va ravon munozara", goal: "Erkin va aniq muloqot", hours: "200–250 soat" },
  { id: "C1", name: "Ilg‘or", description: "Akademik va professional nemis tili", goal: "Nozik ma’nolarni ifodalash", hours: "250–300 soat" },
  { id: "C2", name: "Mukammal", description: "Deyarli ona tili darajasidagi nazorat", goal: "Har qanday kontekstda erkinlik", hours: "300+ soat" },
];

const moduleSeeds: Record<CefrLevel, Array<[string, string, string]>> = {
  A1: [
    ["Birinchi muloqot", "Salomlashish, tanishuv va xayrlashish", "Sprechen"],
    ["Men va oilam", "Oila, kasb, mamlakat va tillar", "Wortschatz"],
    ["Kun tartibi", "Vaqt, kunlar va kundalik fe’llar", "Grammatik"],
    ["Shaharda", "Do‘kon, transport va yo‘l so‘rash", "Dialog"],
  ],
  A2: [
    ["Uy va turmush", "Xonalar, jihozlar va qo‘shnilar", "Wortschatz"],
    ["Sog‘liq", "Shifokor, tana va tavsiyalar", "Hören"],
    ["Sayohat", "Mehmonxona, chipta va reja", "Dialog"],
    ["O‘tgan zamon", "Perfekt bilan tajriba aytish", "Grammatik"],
  ],
  B1: [
    ["Ish va ta’lim", "Rezyume, suhbat va o‘qish", "Schreiben"],
    ["Media va jamiyat", "Yangiliklar va fikr bildirish", "Lesen"],
    ["Atrof-muhit", "Muammo, sabab va yechim", "Sprechen"],
    ["Munozara", "Dalil keltirish va xulosa", "Dialog"],
  ],
  B2: [
    ["Professional aloqa", "Rasmiy yozishmalar va taqdimot", "Schreiben"],
    ["Fan va texnologiya", "Jarayon va tendensiyalar", "Lesen"],
    ["Madaniyat", "Asarlarni tahlil qilish", "Sprechen"],
    ["Murakkab grammatika", "Passiv, Konjunktiv va bog‘lovchilar", "Grammatik"],
  ],
  C1: [
    ["Akademik til", "Ilmiy uslub va argumentatsiya", "Schreiben"],
    ["Iqtisod va siyosat", "Murakkab ijtimoiy mavzular", "Lesen"],
    ["Uslub va ohang", "Rasmiylik va nozik farqlar", "Sprechen"],
    ["Erkin nutq", "Tez va tabiiy ifoda", "Hören"],
  ],
  C2: [
    ["Til mahorati", "Idioma, kinoya va metaforalar", "Wortschatz"],
    ["Chuqur tahlil", "Murakkab matnlarni sintez qilish", "Lesen"],
    ["Notiqlik", "Ishontiruvchi va ta’sirchan nutq", "Sprechen"],
    ["Mukammal aniqlik", "Uslubiy tahrir va nuans", "Schreiben"],
  ],
};

export const courseModules: CourseModule[] = levels.flatMap((level) =>
  moduleSeeds[level.id].map(([title, description, focus], index) => ({
    id: `${level.id.toLowerCase()}-${index + 1}`,
    level: level.id,
    order: index + 1,
    title,
    description,
    focus,
    minutes: 12 + index * 3,
  })),
);

const coreVocabulary: VocabularyWord[] = [
  { id: "a1-hallo", level: "A1", german: "Hallo", uzbek: "Salom", phonetic: "[haˈloː]", partOfSpeech: "undov", category: "Muloqot", example: "Hallo, wie geht es dir?", exampleUzbek: "Salom, qalaysan?" },
  { id: "a1-danke", level: "A1", german: "danke", uzbek: "rahmat", phonetic: "[ˈdaŋkə]", partOfSpeech: "undov", category: "Muloqot", example: "Danke für deine Hilfe.", exampleUzbek: "Yordaming uchun rahmat." },
  { id: "a1-bitte", level: "A1", german: "bitte", uzbek: "iltimos / arzimaydi", phonetic: "[ˈbɪtə]", partOfSpeech: "undov", category: "Muloqot", example: "Ein Wasser, bitte.", exampleUzbek: "Bir suv, iltimos." },
  { id: "a1-familie", level: "A1", german: "die Familie", uzbek: "oila", phonetic: "[faˈmiːli̯ə]", partOfSpeech: "ot", category: "Oila", example: "Meine Familie ist groß.", exampleUzbek: "Mening oilam katta." },
  { id: "a1-wohnen", level: "A1", german: "wohnen", uzbek: "yashamoq", phonetic: "[ˈvoːnən]", partOfSpeech: "fe’l", category: "Uy", example: "Ich wohne in Berlin.", exampleUzbek: "Men Berlinda yashayman." },
  { id: "a1-lernen", level: "A1", german: "lernen", uzbek: "o‘rganmoq", phonetic: "[ˈlɛʁnən]", partOfSpeech: "fe’l", category: "Ta’lim", example: "Wir lernen Deutsch.", exampleUzbek: "Biz nemis tilini o‘rganamiz." },
  { id: "a1-heute", level: "A1", german: "heute", uzbek: "bugun", phonetic: "[ˈhɔɪ̯tə]", partOfSpeech: "ravish", category: "Vaqt", example: "Heute habe ich Zeit.", exampleUzbek: "Bugun vaqtim bor." },
  { id: "a1-essen", level: "A1", german: "essen", uzbek: "yemoq", phonetic: "[ˈɛsən]", partOfSpeech: "fe’l", category: "Taom", example: "Wir essen zusammen.", exampleUzbek: "Biz birga ovqatlanamiz." },
  { id: "a1-freund", level: "A1", german: "der Freund", uzbek: "do‘st", phonetic: "[fʁɔɪ̯nt]", partOfSpeech: "ot", category: "Odamlar", example: "Er ist mein Freund.", exampleUzbek: "U mening do‘stim." },
  { id: "a1-kaufen", level: "A1", german: "kaufen", uzbek: "sotib olmoq", phonetic: "[ˈkaʊ̯fən]", partOfSpeech: "fe’l", category: "Do‘kon", example: "Ich kaufe Brot.", exampleUzbek: "Men non sotib olyapman." },

  { id: "a2-erfahrung", level: "A2", german: "die Erfahrung", uzbek: "tajriba", phonetic: "[ɛɐ̯ˈfaːʁʊŋ]", partOfSpeech: "ot", category: "Hayot", example: "Das war eine gute Erfahrung.", exampleUzbek: "Bu yaxshi tajriba edi." },
  { id: "a2-gesund", level: "A2", german: "gesund", uzbek: "sog‘lom", phonetic: "[ɡəˈzʊnt]", partOfSpeech: "sifat", category: "Sog‘liq", example: "Obst ist gesund.", exampleUzbek: "Meva sog‘lomdir." },
  { id: "a2-verabreden", level: "A2", german: "sich verabreden", uzbek: "uchrashishga kelishmoq", phonetic: "[fɛɐ̯ˈʔapʁeːdn̩]", partOfSpeech: "fe’l", category: "Muloqot", example: "Wir verabreden uns für Freitag.", exampleUzbek: "Biz juma kuniga uchrashishga kelishdik." },
  { id: "a2-reise", level: "A2", german: "die Reise", uzbek: "sayohat", phonetic: "[ˈʁaɪ̯zə]", partOfSpeech: "ot", category: "Sayohat", example: "Die Reise dauert drei Tage.", exampleUzbek: "Sayohat uch kun davom etadi." },
  { id: "a2-leihen", level: "A2", german: "leihen", uzbek: "qarzga bermoq/olmoq", phonetic: "[ˈlaɪ̯ən]", partOfSpeech: "fe’l", category: "Kundalik", example: "Kannst du mir das Buch leihen?", exampleUzbek: "Menga kitobni berib tura olasanmi?" },
  { id: "a2-nachbar", level: "A2", german: "der Nachbar", uzbek: "qo‘shni", phonetic: "[ˈnaːxbaːɐ̯]", partOfSpeech: "ot", category: "Uy", example: "Unser Nachbar ist freundlich.", exampleUzbek: "Qo‘shnimiz xushmuomala." },
  { id: "a2-ploetzlich", level: "A2", german: "plötzlich", uzbek: "to‘satdan", phonetic: "[ˈplœt͡slɪç]", partOfSpeech: "ravish", category: "Hikoya", example: "Plötzlich begann es zu regnen.", exampleUzbek: "To‘satdan yomg‘ir yog‘a boshladi." },
  { id: "a2-empfehlen", level: "A2", german: "empfehlen", uzbek: "tavsiya qilmoq", phonetic: "[ɛmˈpfeːlən]", partOfSpeech: "fe’l", category: "Muloqot", example: "Ich empfehle dieses Hotel.", exampleUzbek: "Men bu mehmonxonani tavsiya qilaman." },
  { id: "a2-moeglich", level: "A2", german: "möglich", uzbek: "mumkin", phonetic: "[ˈmøːklɪç]", partOfSpeech: "sifat", category: "Kundalik", example: "Ist das morgen möglich?", exampleUzbek: "Bu ertaga mumkinmi?" },
  { id: "a2-umziehen", level: "A2", german: "umziehen", uzbek: "ko‘chib o‘tmoq", phonetic: "[ˈʊmˌt͡siːən]", partOfSpeech: "fe’l", category: "Uy", example: "Wir ziehen im Mai um.", exampleUzbek: "Biz may oyida ko‘chamiz." },

  { id: "b1-meinung", level: "B1", german: "die Meinung", uzbek: "fikr", phonetic: "[ˈmaɪ̯nʊŋ]", partOfSpeech: "ot", category: "Munozara", example: "Meiner Meinung nach ist das sinnvoll.", exampleUzbek: "Mening fikrimcha, bu maqsadga muvofiq." },
  { id: "b1-vermeiden", level: "B1", german: "vermeiden", uzbek: "oldini olmoq", phonetic: "[fɛɐ̯ˈmaɪ̯dn̩]", partOfSpeech: "fe’l", category: "Jamiyat", example: "Wir müssen Müll vermeiden.", exampleUzbek: "Biz chiqindini kamaytirishimiz kerak." },
  { id: "b1-entscheidung", level: "B1", german: "die Entscheidung", uzbek: "qaror", phonetic: "[ɛntˈʃaɪ̯dʊŋ]", partOfSpeech: "ot", category: "Hayot", example: "Das war eine schwere Entscheidung.", exampleUzbek: "Bu qiyin qaror edi." },
  { id: "b1-bewerben", level: "B1", german: "sich bewerben", uzbek: "ariza bermoq", phonetic: "[bəˈvɛʁbn̩]", partOfSpeech: "fe’l", category: "Ish", example: "Sie bewirbt sich um eine Stelle.", exampleUzbek: "U ish o‘rniga ariza bermoqda." },
  { id: "b1-zuverlaessig", level: "B1", german: "zuverlässig", uzbek: "ishonchli", phonetic: "[ˈt͡suːfɛɐ̯ˌlɛsɪç]", partOfSpeech: "sifat", category: "Xarakter", example: "Er ist sehr zuverlässig.", exampleUzbek: "U juda ishonchli." },
  { id: "b1-umwelt", level: "B1", german: "die Umwelt", uzbek: "atrof-muhit", phonetic: "[ˈʊmˌvɛlt]", partOfSpeech: "ot", category: "Tabiat", example: "Wir schützen die Umwelt.", exampleUzbek: "Biz atrof-muhitni himoya qilamiz." },
  { id: "b1-trotzdem", level: "B1", german: "trotzdem", uzbek: "shunga qaramay", phonetic: "[ˈtʁɔt͡sdeːm]", partOfSpeech: "ravish", category: "Bog‘lovchi", example: "Es regnet, trotzdem gehen wir raus.", exampleUzbek: "Yomg‘ir yog‘yapti, shunga qaramay tashqariga chiqamiz." },
  { id: "b1-begruenden", level: "B1", german: "begründen", uzbek: "asoslamoq", phonetic: "[bəˈɡʁʏndn̩]", partOfSpeech: "fe’l", category: "Munozara", example: "Bitte begründen Sie Ihre Antwort.", exampleUzbek: "Iltimos, javobingizni asoslang." },
  { id: "b1-fortschritt", level: "B1", german: "der Fortschritt", uzbek: "taraqqiyot", phonetic: "[ˈfɔʁtˌʃʁɪt]", partOfSpeech: "ot", category: "Ta’lim", example: "Du machst große Fortschritte.", exampleUzbek: "Sen katta yutuqlarga erishyapsan." },
  { id: "b1-gelegenheit", level: "B1", german: "die Gelegenheit", uzbek: "imkoniyat", phonetic: "[ɡəˈleːɡn̩haɪ̯t]", partOfSpeech: "ot", category: "Hayot", example: "Nutze diese Gelegenheit.", exampleUzbek: "Bu imkoniyatdan foydalan." },

  { id: "b2-herausforderung", level: "B2", german: "die Herausforderung", uzbek: "qiyinchilik / sinov", phonetic: "[hɛˈʁaʊ̯sfɔʁdəʁʊŋ]", partOfSpeech: "ot", category: "Ish", example: "Das Projekt ist eine Herausforderung.", exampleUzbek: "Loyiha katta sinovdir." },
  { id: "b2-voraussetzung", level: "B2", german: "die Voraussetzung", uzbek: "shart", phonetic: "[foˈʁaʊ̯sˌzɛt͡sʊŋ]", partOfSpeech: "ot", category: "Akademik", example: "Erfahrung ist eine wichtige Voraussetzung.", exampleUzbek: "Tajriba muhim shartdir." },
  { id: "b2-nachhaltig", level: "B2", german: "nachhaltig", uzbek: "barqaror", phonetic: "[ˈnaːxhaltɪç]", partOfSpeech: "sifat", category: "Tabiat", example: "Wir brauchen nachhaltige Lösungen.", exampleUzbek: "Bizga barqaror yechimlar kerak." },
  { id: "b2-ueberzeugen", level: "B2", german: "überzeugen", uzbek: "ishontirmoq", phonetic: "[yːbɐˈt͡sɔɪ̯ɡn̩]", partOfSpeech: "fe’l", category: "Munozara", example: "Sein Argument hat mich überzeugt.", exampleUzbek: "Uning dalili meni ishontirdi." },
  { id: "b2-zusammenhang", level: "B2", german: "der Zusammenhang", uzbek: "bog‘liqlik", phonetic: "[t͡suˈzamənˌhaŋ]", partOfSpeech: "ot", category: "Akademik", example: "Der Zusammenhang ist deutlich.", exampleUzbek: "Bog‘liqlik aniq." },
  { id: "b2-beurteilen", level: "B2", german: "beurteilen", uzbek: "baholamoq", phonetic: "[bəˈʔuɐ̯taɪ̯lən]", partOfSpeech: "fe’l", category: "Tahlil", example: "Die Lage ist schwer zu beurteilen.", exampleUzbek: "Vaziyatni baholash qiyin." },
  { id: "b2-erheblich", level: "B2", german: "erheblich", uzbek: "sezilarli", phonetic: "[ɛɐ̯ˈheːplɪç]", partOfSpeech: "sifat", category: "Rasmiy", example: "Die Kosten sind erheblich gestiegen.", exampleUzbek: "Xarajatlar sezilarli oshdi." },
  { id: "b2-beruecksichtigen", level: "B2", german: "berücksichtigen", uzbek: "hisobga olmoq", phonetic: "[bəˈʁʏkzɪçtɪɡn̩]", partOfSpeech: "fe’l", category: "Rasmiy", example: "Wir müssen alle Faktoren berücksichtigen.", exampleUzbek: "Barcha omillarni hisobga olishimiz kerak." },
  { id: "b2-allerdings", level: "B2", german: "allerdings", uzbek: "ammo / albatta", phonetic: "[ˈalɐdɪŋs]", partOfSpeech: "ravish", category: "Bog‘lovchi", example: "Die Idee ist gut, allerdings teuer.", exampleUzbek: "G‘oya yaxshi, ammo qimmat." },
  { id: "b2-verfuegbar", level: "B2", german: "verfügbar", uzbek: "mavjud", phonetic: "[fɛɐ̯ˈfyːkbaːɐ̯]", partOfSpeech: "sifat", category: "Ish", example: "Die Daten sind online verfügbar.", exampleUzbek: "Ma’lumotlar internetda mavjud." },

  { id: "c1-auseinandersetzung", level: "C1", german: "die Auseinandersetzung", uzbek: "chuqur muhokama / ziddiyat", phonetic: "[ˈaʊ̯sʔaɪ̯nandɐˌzɛt͡sʊŋ]", partOfSpeech: "ot", category: "Akademik", example: "Der Text fordert eine kritische Auseinandersetzung.", exampleUzbek: "Matn tanqidiy tahlilni talab qiladi." },
  { id: "c1-differenziert", level: "C1", german: "differenziert", uzbek: "har tomonlama farqlangan", phonetic: "[dɪfeʁɛnˈt͡siːɐ̯t]", partOfSpeech: "sifat", category: "Tahlil", example: "Sie betrachtet das Thema differenziert.", exampleUzbek: "U mavzuni har tomonlama ko‘rib chiqadi." },
  { id: "c1-nachvollziehen", level: "C1", german: "nachvollziehen", uzbek: "mantiqan tushunmoq", phonetic: "[ˈnaːxˌfɔlt͡siːən]", partOfSpeech: "fe’l", category: "Tahlil", example: "Ich kann Ihre Entscheidung nachvollziehen.", exampleUzbek: "Qaroringizni tushuna olaman." },
  { id: "c1-gewährleisten", level: "C1", german: "gewährleisten", uzbek: "kafolatlamoq", phonetic: "[ɡəˈvɛːɐ̯laɪ̯stn̩]", partOfSpeech: "fe’l", category: "Rasmiy", example: "Das System gewährleistet Sicherheit.", exampleUzbek: "Tizim xavfsizlikni kafolatlaydi." },
  { id: "c1-zwiespaeltig", level: "C1", german: "zwiespältig", uzbek: "ikki xil hissiyotli", phonetic: "[ˈt͡sviːʃpɛltɪç]", partOfSpeech: "sifat", category: "His-tuyg‘u", example: "Ich stehe dem Vorschlag zwiespältig gegenüber.", exampleUzbek: "Taklifga nisbatan fikrim ikki xil." },
  { id: "c1-angesichts", level: "C1", german: "angesichts", uzbek: "...ni hisobga olib", phonetic: "[ˈanɡəzɪçt͡s]", partOfSpeech: "predlog", category: "Rasmiy", example: "Angesichts der Lage müssen wir handeln.", exampleUzbek: "Vaziyatni hisobga olib, harakat qilishimiz kerak." },
  { id: "c1-veranschaulichen", level: "C1", german: "veranschaulichen", uzbek: "yaqqol ko‘rsatmoq", phonetic: "[fɛɐ̯ˈʔanʃaʊ̯lɪçn̩]", partOfSpeech: "fe’l", category: "Akademik", example: "Das Beispiel veranschaulicht die Theorie.", exampleUzbek: "Misol nazariyani yaqqol ko‘rsatadi." },
  { id: "c1-einwand", level: "C1", german: "der Einwand", uzbek: "e’tiroz", phonetic: "[ˈaɪ̯nˌvant]", partOfSpeech: "ot", category: "Munozara", example: "Ihr Einwand ist berechtigt.", exampleUzbek: "Sizning e’tirozingiz o‘rinli." },
  { id: "c1-bewaeltigen", level: "C1", german: "bewältigen", uzbek: "uddalamoq", phonetic: "[bəˈvɛltɪɡn̩]", partOfSpeech: "fe’l", category: "Hayot", example: "Gemeinsam bewältigen wir die Krise.", exampleUzbek: "Inqirozni birgalikda yengamiz." },
  { id: "c1-stichhaltig", level: "C1", german: "stichhaltig", uzbek: "asosli", phonetic: "[ˈʃtɪçhaltɪç]", partOfSpeech: "sifat", category: "Munozara", example: "Dafür gibt es stichhaltige Gründe.", exampleUzbek: "Buning asosli sabablari bor." },

  { id: "c2-unerlaesslich", level: "C2", german: "unerlässlich", uzbek: "mutlaqo zarur", phonetic: "[ˌʊnʔɛɐ̯ˈlɛslɪç]", partOfSpeech: "sifat", category: "Rasmiy", example: "Präzision ist dabei unerlässlich.", exampleUzbek: "Bunda aniqlik mutlaqo zarur." },
  { id: "c2-hinterfragen", level: "C2", german: "hinterfragen", uzbek: "tanqidiy savol ostiga olmoq", phonetic: "[hɪntɐˈfʁaːɡn̩]", partOfSpeech: "fe’l", category: "Tahlil", example: "Wir sollten diese Annahme hinterfragen.", exampleUzbek: "Bu taxminni tanqidiy ko‘rib chiqishimiz kerak." },
  { id: "c2-wegweisend", level: "C2", german: "wegweisend", uzbek: "yo‘l ko‘rsatuvchi / innovatsion", phonetic: "[ˈveːkˌvaɪ̯zn̩t]", partOfSpeech: "sifat", category: "Akademik", example: "Die Studie gilt als wegweisend.", exampleUzbek: "Tadqiqot innovatsion deb hisoblanadi." },
  { id: "c2-beilaeufig", level: "C2", german: "beiläufig", uzbek: "yo‘l-yo‘lakay", phonetic: "[ˈbaɪ̯ˌlɔɪ̯fɪç]", partOfSpeech: "ravish", category: "Uslub", example: "Er erwähnte es nur beiläufig.", exampleUzbek: "U buni faqat yo‘l-yo‘lakay aytdi." },
  { id: "c2-tragweite", level: "C2", german: "die Tragweite", uzbek: "ko‘lam / jiddiy oqibat", phonetic: "[ˈtʁaːkˌvaɪ̯tə]", partOfSpeech: "ot", category: "Rasmiy", example: "Niemand erkannte die Tragweite der Entscheidung.", exampleUzbek: "Qarorning ko‘lamini hech kim anglamadi." },
  { id: "c2-ergruenden", level: "C2", german: "ergründen", uzbek: "tagiga yetmoq", phonetic: "[ɛɐ̯ˈɡʁʏndn̩]", partOfSpeech: "fe’l", category: "Tahlil", example: "Die Ursache lässt sich kaum ergründen.", exampleUzbek: "Sababning tagiga yetish qiyin." },
  { id: "c2-nuanciert", level: "C2", german: "nuanciert", uzbek: "nozik farqlangan", phonetic: "[nyɑ̃ˈsiːɐ̯t]", partOfSpeech: "sifat", category: "Uslub", example: "Seine Darstellung ist äußerst nuanciert.", exampleUzbek: "Uning bayoni juda nozik farqlangan." },
  { id: "c2-infrage-stellen", level: "C2", german: "infrage stellen", uzbek: "shubha ostiga qo‘ymoq", phonetic: "[ɪnˈfʁaːɡə ˌʃtɛlən]", partOfSpeech: "ibora", category: "Munozara", example: "Die Ergebnisse stellen die Theorie infrage.", exampleUzbek: "Natijalar nazariyani shubha ostiga qo‘yadi." },
  { id: "c2-zwangsläufig", level: "C2", german: "zwangsläufig", uzbek: "muqarrar ravishda", phonetic: "[ˈt͡svaŋsˌlɔɪ̯fɪç]", partOfSpeech: "ravish", category: "Akademik", example: "Das führt nicht zwangsläufig zum Erfolg.", exampleUzbek: "Bu muqarrar ravishda muvaffaqiyatga olib kelmaydi." },
  { id: "c2-beschönigen", level: "C2", german: "beschönigen", uzbek: "yaxshiroq qilib ko‘rsatmoq", phonetic: "[bəˈʃøːnɪɡn̩]", partOfSpeech: "fe’l", category: "Uslub", example: "Man darf die Lage nicht beschönigen.", exampleUzbek: "Vaziyatni yaxshi qilib ko‘rsatmaslik kerak." },
];

export const vocabulary: VocabularyWord[] = [
  ...coreVocabulary,
  ...extendedVocabulary,
];

if (vocabulary.length !== 3000) {
  throw new Error(`Lug‘at aynan 3000 ta bo‘lishi kerak, hozir: ${vocabulary.length}`);
}

if (new Set(vocabulary.map((word) => word.id)).size !== vocabulary.length) {
  throw new Error("Lug‘atdagi har bir birlikning ID raqami noyob bo‘lishi kerak");
}

export function getLevel(level: CefrLevel) {
  return levels.find((item) => item.id === level)!;
}

export function getWord(id: string) {
  return vocabulary.find((word) => word.id === id);
}

export function wordsForLevel(level: CefrLevel) {
  return vocabulary.filter((word) => word.level === level);
}
