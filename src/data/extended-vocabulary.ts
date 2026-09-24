import type { CefrLevel, VocabularyWord } from "@/data/curriculum";

type NounSeed = [article: "der" | "die" | "das", noun: string, plural: string, uzbek: string, level: CefrLevel, category: string];
type VerbSeed = [german: string, uzbek: string, level: CefrLevel, category: string];
type ModifierSeed = [german: string, uzbek: string, level: CefrLevel];

const levelRank: Record<CefrLevel, number> = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };

function higherLevel(first: CefrLevel, second: CefrLevel): CefrLevel {
  return levelRank[first] >= levelRank[second] ? first : second;
}

function slug(value: string) {
  return value
    .toLocaleLowerCase("de")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function uzbekInfinitiveObject(infinitive: string) {
  const clean = infinitive.replace(/\s*\/.*$/, "").trim();
  return clean.endsWith("moq") ? `${clean.slice(0, -3)}ishni` : clean;
}

// Har bir otning birlik va ko‘plik shakli alohida o‘rganiladi: 120 × 2 = 240 birlik.
const nounSeeds: NounSeed[] = [
  ["der", "Tisch", "Tische", "stol", "A1", "Uy"],
  ["der", "Stuhl", "Stühle", "stul", "A1", "Uy"],
  ["das", "Fenster", "Fenster", "deraza", "A1", "Uy"],
  ["die", "Tür", "Türen", "eshik", "A1", "Uy"],
  ["das", "Zimmer", "Zimmer", "xona", "A1", "Uy"],
  ["die", "Küche", "Küchen", "oshxona", "A1", "Uy"],
  ["das", "Bett", "Betten", "karavot", "A1", "Uy"],
  ["die", "Lampe", "Lampen", "chiroq", "A1", "Uy"],
  ["der", "Apfel", "Äpfel", "olma", "A1", "Taom"],
  ["die", "Banane", "Bananen", "banan", "A1", "Taom"],
  ["das", "Brot", "Brote", "non", "A1", "Taom"],
  ["die", "Milch", "Milchsorten", "sut", "A1", "Taom"],
  ["der", "Käse", "Käsesorten", "pishloq", "A1", "Taom"],
  ["das", "Ei", "Eier", "tuxum", "A1", "Taom"],
  ["die", "Schule", "Schulen", "maktab", "A1", "Ta’lim"],
  ["der", "Lehrer", "Lehrer", "o‘qituvchi", "A1", "Ta’lim"],
  ["die", "Schülerin", "Schülerinnen", "o‘quvchi qiz", "A1", "Ta’lim"],
  ["das", "Heft", "Hefte", "daftar", "A1", "Ta’lim"],
  ["der", "Bleistift", "Bleistifte", "qalam", "A1", "Ta’lim"],
  ["die", "Straße", "Straßen", "ko‘cha", "A1", "Shahar"],
  ["der", "Bahnhof", "Bahnhöfe", "vokzal", "A2", "Sayohat"],
  ["der", "Flughafen", "Flughäfen", "aeroport", "A2", "Sayohat"],
  ["der", "Koffer", "Koffer", "chamadon", "A2", "Sayohat"],
  ["die", "Fahrkarte", "Fahrkarten", "yo‘l chiptasi", "A2", "Sayohat"],
  ["die", "Haltestelle", "Haltestellen", "bekat", "A2", "Sayohat"],
  ["das", "Rezept", "Rezepte", "retsept", "A2", "Sog‘liq"],
  ["die", "Apotheke", "Apotheken", "dorixona", "A2", "Sog‘liq"],
  ["der", "Termin", "Termine", "belgilangan vaqt", "A2", "Kundalik"],
  ["die", "Rechnung", "Rechnungen", "hisob", "A2", "Kundalik"],
  ["das", "Geschenk", "Geschenke", "sovg‘a", "A2", "Kundalik"],
  ["die", "Einladung", "Einladungen", "taklifnoma", "A2", "Muloqot"],
  ["der", "Geburtstag", "Geburtstage", "tug‘ilgan kun", "A2", "Kundalik"],
  ["die", "Wohnung", "Wohnungen", "kvartira", "A2", "Uy"],
  ["der", "Schlüssel", "Schlüssel", "kalit", "A2", "Uy"],
  ["der", "Vertrag", "Verträge", "shartnoma", "B1", "Ish"],
  ["die", "Bewerbung", "Bewerbungen", "ariza", "B1", "Ish"],
  ["der", "Lebenslauf", "Lebensläufe", "tarjimai hol", "B1", "Ish"],
  ["die", "Ausbildung", "Ausbildungen", "kasbiy ta’lim", "B1", "Ta’lim"],
  ["die", "Prüfung", "Prüfungen", "imtihon", "B1", "Ta’lim"],
  ["das", "Zeugnis", "Zeugnisse", "guvohnoma", "B1", "Ta’lim"],
  ["die", "Nachricht", "Nachrichten", "xabar", "B1", "Media"],
  ["der", "Bericht", "Berichte", "hisobot", "B1", "Media"],
  ["die", "Veranstaltung", "Veranstaltungen", "tadbir", "B1", "Jamiyat"],
  ["der", "Verein", "Vereine", "uyushma", "B1", "Jamiyat"],
  ["die", "Lösung", "Lösungen", "yechim", "B1", "Munozara"],
  ["der", "Vorteil", "Vorteile", "afzallik", "B1", "Munozara"],
  ["der", "Nachteil", "Nachteile", "kamchilik", "B1", "Munozara"],
  ["die", "Ursache", "Ursachen", "sabab", "B1", "Tahlil"],
  ["die", "Wirkung", "Wirkungen", "ta’sir", "B2", "Tahlil"],
  ["die", "Entwicklung", "Entwicklungen", "rivojlanish", "B2", "Akademik"],
  ["die", "Forschung", "Forschungen", "tadqiqot", "B2", "Akademik"],
  ["die", "Erkenntnis", "Erkenntnisse", "ilmiy xulosa", "B2", "Akademik"],
  ["der", "Begriff", "Begriffe", "tushuncha", "B2", "Akademik"],
  ["die", "Maßnahme", "Maßnahmen", "chora", "B2", "Rasmiy"],
  ["die", "Verantwortung", "Verantwortungen", "mas’uliyat", "B2", "Jamiyat"],
  ["die", "Fähigkeit", "Fähigkeiten", "qobiliyat", "B2", "Ish"],
  ["die", "Beziehung", "Beziehungen", "munosabat", "B2", "Jamiyat"],
  ["die", "Wahrnehmung", "Wahrnehmungen", "idrok", "C1", "Tahlil"],
  ["die", "Vorgehensweise", "Vorgehensweisen", "yondashuv", "C1", "Akademik"],
  ["die", "Stellungnahme", "Stellungnahmen", "munosabat bayoni", "C1", "Rasmiy"],
  ["der", "Sachverhalt", "Sachverhalte", "holat mohiyati", "C1", "Rasmiy"],
  ["die", "Wechselwirkung", "Wechselwirkungen", "o‘zaro ta’sir", "C1", "Akademik"],
  ["die", "Zielsetzung", "Zielsetzungen", "maqsad qo‘yish", "C1", "Akademik"],
  ["die", "Rahmenbedingung", "Rahmenbedingungen", "asosiy shart", "C1", "Rasmiy"],
  ["die", "Mehrdeutigkeit", "Mehrdeutigkeiten", "ko‘p ma’nolilik", "C2", "Uslub"],
  ["die", "Schlussfolgerung", "Schlussfolgerungen", "yakuniy xulosa", "C2", "Tahlil"],
  ["die", "Unzulänglichkeit", "Unzulänglichkeiten", "yetishmovchilik", "C2", "Tahlil"],
  ["der", "Deutungsrahmen", "Deutungsrahmen", "talqin doirasi", "C2", "Akademik"],
  ["die", "Glaubwürdigkeit", "Glaubwürdigkeiten", "ishonchlilik", "C2", "Munozara"],
  ["die", "Ausdrucksweise", "Ausdrucksweisen", "ifoda usuli", "C2", "Uslub"],
  ["das", "Haus", "Häuser", "uy", "A1", "Uy"],
  ["der", "Garten", "Gärten", "bog‘", "A1", "Uy"],
  ["das", "Auto", "Autos", "avtomobil", "A1", "Transport"],
  ["der", "Bus", "Busse", "avtobus", "A1", "Transport"],
  ["der", "Zug", "Züge", "poyezd", "A1", "Transport"],
  ["die", "Stadt", "Städte", "shahar", "A1", "Shahar"],
  ["das", "Land", "Länder", "mamlakat", "A1", "Joy"],
  ["der", "Name", "Namen", "ism", "A1", "Odamlar"],
  ["die", "Sprache", "Sprachen", "til", "A1", "Ta’lim"],
  ["das", "Wort", "Wörter", "so‘z", "A1", "Ta’lim"],
  ["der", "Arzt", "Ärzte", "shifokor", "A2", "Sog‘liq"],
  ["die", "Krankheit", "Krankheiten", "kasallik", "A2", "Sog‘liq"],
  ["das", "Medikament", "Medikamente", "dori", "A2", "Sog‘liq"],
  ["die", "Reise", "Reisen", "sayohat", "A2", "Sayohat"],
  ["das", "Hotel", "Hotels", "mehmonxona", "A2", "Sayohat"],
  ["die", "Reservierung", "Reservierungen", "band qilish", "A2", "Sayohat"],
  ["der", "Nachbar", "Nachbarn", "qo‘shni", "A2", "Uy"],
  ["die", "Freizeit", "Freizeiten", "bo‘sh vaqt", "A2", "Kundalik"],
  ["das", "Hobby", "Hobbys", "qiziqish", "A2", "Kundalik"],
  ["der", "Ausflug", "Ausflüge", "sayr", "A2", "Sayohat"],
  ["der", "Arbeitsplatz", "Arbeitsplätze", "ish joyi", "B1", "Ish"],
  ["das", "Vorstellungsgespräch", "Vorstellungsgespräche", "ish suhbati", "B1", "Ish"],
  ["die", "Kenntnis", "Kenntnisse", "bilim", "B1", "Ta’lim"],
  ["die", "Erfahrung", "Erfahrungen", "tajriba", "B1", "Ish"],
  ["die", "Umwelt", "Umwelten", "atrof-muhit", "B1", "Tabiat"],
  ["der", "Klimawandel", "Klimawandel", "iqlim o‘zgarishi", "B1", "Tabiat"],
  ["der", "Verkehr", "Verkehre", "transport harakati", "B1", "Shahar"],
  ["die", "Meinung", "Meinungen", "fikr", "B1", "Munozara"],
  ["das", "Argument", "Argumente", "dalil", "B1", "Munozara"],
  ["der", "Vorschlag", "Vorschläge", "taklif", "B1", "Muloqot"],
  ["die", "Herausforderung", "Herausforderungen", "qiyinchilik", "B2", "Ish"],
  ["die", "Voraussetzung", "Voraussetzungen", "shart", "B2", "Akademik"],
  ["der", "Zusammenhang", "Zusammenhänge", "bog‘liqlik", "B2", "Tahlil"],
  ["die", "Auswirkung", "Auswirkungen", "oqibat", "B2", "Tahlil"],
  ["der", "Fortschritt", "Fortschritte", "taraqqiyot", "B2", "Texnologiya"],
  ["die", "Technologie", "Technologien", "texnologiya", "B2", "Texnologiya"],
  ["die", "Datensicherheit", "Datensicherheiten", "ma’lumotlar xavfsizligi", "B2", "Texnologiya"],
  ["die", "Ressource", "Ressourcen", "resurs", "B2", "Iqtisod"],
  ["die", "Auseinandersetzung", "Auseinandersetzungen", "chuqur muhokama", "C1", "Akademik"],
  ["die", "Argumentation", "Argumentationen", "dalillash", "C1", "Akademik"],
  ["der", "Standpunkt", "Standpunkte", "nuqtayi nazar", "C1", "Munozara"],
  ["die", "Gegenüberstellung", "Gegenüberstellungen", "qiyoslash", "C1", "Tahlil"],
  ["die", "Nachhaltigkeit", "Nachhaltigkeiten", "barqarorlik", "C1", "Tabiat"],
  ["der", "Handlungsspielraum", "Handlungsspielräume", "harakat imkoniyati", "C1", "Rasmiy"],
  ["die", "Tragweite", "Tragweiten", "ko‘lam va jiddiy oqibat", "C2", "Tahlil"],
  ["die", "Nuance", "Nuancen", "nozik farq", "C2", "Uslub"],
  ["der", "Ermessensspielraum", "Ermessensspielräume", "qaror erkinligi", "C2", "Rasmiy"],
  ["die", "Unvereinbarkeit", "Unvereinbarkeiten", "nomuvofiqlik", "C2", "Tahlil"],
  ["die", "Widersprüchlichkeit", "Widersprüchlichkeiten", "ziddiyatlilik", "C2", "Tahlil"],
  ["das", "Deutungsmuster", "Deutungsmuster", "talqin qolipi", "C2", "Akademik"],
];

// 90 fe’l × 30 vaqt/usul ko‘rsatkichi = 2 700 foydali birikma.
const verbSeeds: VerbSeed[] = [
  ["arbeiten", "ishlamoq", "A1", "Ish"], ["lernen", "o‘rganmoq", "A1", "Ta’lim"],
  ["sprechen", "gapirmoq", "A1", "Muloqot"], ["lesen", "o‘qimoq", "A1", "Ta’lim"],
  ["schreiben", "yozmoq", "A1", "Ta’lim"], ["fragen", "so‘ramoq", "A1", "Muloqot"],
  ["antworten", "javob bermoq", "A1", "Muloqot"], ["hören", "tinglamoq", "A1", "Muloqot"],
  ["sehen", "ko‘rmoq", "A1", "Kundalik"], ["kaufen", "sotib olmoq", "A1", "Do‘kon"],
  ["kochen", "ovqat pishirmoq", "A1", "Taom"], ["reisen", "sayohat qilmoq", "A1", "Sayohat"],
  ["warten", "kutmoq", "A1", "Kundalik"], ["suchen", "qidirmoq", "A1", "Kundalik"],
  ["üben", "mashq qilmoq", "A1", "Ta’lim"],
  ["erklären", "tushuntirmoq", "A2", "Muloqot"], ["verstehen", "tushunmoq", "A2", "Muloqot"],
  ["wiederholen", "takrorlamoq", "A2", "Ta’lim"], ["beginnen", "boshlamoq", "A2", "Kundalik"],
  ["enden", "tugatmoq", "A2", "Kundalik"], ["planen", "rejalashtirmoq", "A2", "Kundalik"],
  ["besuchen", "tashrif buyurmoq", "A2", "Sayohat"], ["bestellen", "buyurtma bermoq", "A2", "Taom"],
  ["bezahlen", "to‘lamoq", "A2", "Do‘kon"], ["empfehlen", "tavsiya qilmoq", "A2", "Muloqot"],
  ["vergessen", "unutmoq", "A2", "Kundalik"], ["erinnern", "eslamoq", "A2", "Kundalik"],
  ["anrufen", "telefon qilmoq", "A2", "Muloqot"], ["abholen", "olib ketmoq", "A2", "Sayohat"],
  ["vorbereiten", "tayyorlamoq", "A2", "Kundalik"],
  ["entscheiden", "qaror qilmoq", "B1", "Hayot"], ["versuchen", "urinmoq", "B1", "Hayot"],
  ["begründen", "asoslamoq", "B1", "Munozara"], ["vergleichen", "taqqoslamoq", "B1", "Tahlil"],
  ["beschreiben", "tasvirlamoq", "B1", "Muloqot"], ["diskutieren", "muhokama qilmoq", "B1", "Munozara"],
  ["teilnehmen", "qatnashmoq", "B1", "Jamiyat"], ["organisieren", "tashkil qilmoq", "B1", "Ish"],
  ["verbessern", "yaxshilamoq", "B1", "Ta’lim"], ["vermeiden", "oldini olmoq", "B1", "Jamiyat"],
  ["schützen", "himoya qilmoq", "B1", "Tabiat"], ["sparen", "tejamoq", "B1", "Kundalik"],
  ["erreichen", "erishmoq", "B1", "Hayot"], ["erleben", "boshdan kechirmoq", "B1", "Hayot"],
  ["unterstützen", "qo‘llab-quvvatlamoq", "B1", "Jamiyat"],
  ["beurteilen", "baholamoq", "B2", "Tahlil"], ["berücksichtigen", "hisobga olmoq", "B2", "Rasmiy"],
  ["überzeugen", "ishontirmoq", "B2", "Munozara"], ["analysieren", "tahlil qilmoq", "B2", "Akademik"],
  ["darstellen", "bayon qilmoq", "B2", "Akademik"], ["nachweisen", "isbotlamoq", "B2", "Akademik"],
  ["untersuchen", "tekshirmoq", "B2", "Akademik"], ["entwickeln", "rivojlantirmoq", "B2", "Ish"],
  ["verhandeln", "muzokara qilmoq", "B2", "Ish"], ["beantragen", "rasmiy so‘ramoq", "B2", "Rasmiy"],
  ["gewährleisten", "kafolatlamoq", "B2", "Rasmiy"], ["einschätzen", "taxminiy baholamoq", "B2", "Tahlil"],
  ["hervorheben", "ta’kidlamoq", "B2", "Muloqot"], ["zusammenfassen", "umumlashtirmoq", "B2", "Akademik"],
  ["interpretieren", "talqin qilmoq", "B2", "Tahlil"],
  ["nachvollziehen", "mantiqan tushunmoq", "C1", "Tahlil"], ["veranschaulichen", "yaqqol ko‘rsatmoq", "C1", "Akademik"],
  ["bewältigen", "uddalamoq", "C1", "Hayot"], ["voraussetzen", "shart qilmoq", "C1", "Akademik"],
  ["widersprechen", "qarshi fikr bildirmoq", "C1", "Munozara"], ["erörtern", "atroflicha muhokama qilmoq", "C1", "Akademik"],
  ["verdeutlichen", "aniq ko‘rsatmoq", "C1", "Akademik"], ["einräumen", "tan olmoq", "C1", "Munozara"],
  ["abwägen", "taroziga solib baholamoq", "C1", "Tahlil"], ["widerlegen", "rad etib isbotlamoq", "C1", "Munozara"],
  ["herleiten", "kelib chiqishini asoslamoq", "C1", "Akademik"], ["präzisieren", "aniqlashtirmoq", "C1", "Uslub"],
  ["differenzieren", "farqlab tahlil qilmoq", "C1", "Tahlil"], ["reflektieren", "chuqur mulohaza qilmoq", "C1", "Tahlil"],
  ["vermitteln", "yetkazib bermoq", "C1", "Muloqot"],
  ["hinterfragen", "tanqidiy tekshirmoq", "C2", "Tahlil"], ["ergründen", "tagiga yetmoq", "C2", "Tahlil"],
  ["relativieren", "nisbiylashtirmoq", "C2", "Munozara"], ["untermauern", "dalil bilan mustahkamlamoq", "C2", "Munozara"],
  ["kontextualisieren", "kontekstga joylamoq", "C2", "Akademik"], ["problematisieren", "muammo sifatida tahlil qilmoq", "C2", "Akademik"],
  ["antizipieren", "oldindan anglamoq", "C2", "Tahlil"], ["konzipieren", "konsepsiya tuzmoq", "C2", "Ish"],
  ["vergegenwärtigen", "ongda jonlantirmoq", "C2", "Uslub"], ["instrumentalisieren", "vosita sifatida ishlatmoq", "C2", "Akademik"],
  ["legitimieren", "qonuniy asoslamoq", "C2", "Rasmiy"], ["implizieren", "yashirin ma’noni anglatmoq", "C2", "Uslub"],
  ["nuancieren", "nozik farqlamoq", "C2", "Uslub"], ["abstrahieren", "mavhumlashtirmoq", "C2", "Akademik"],
  ["synthetisieren", "yaxlit xulosa qilmoq", "C2", "Akademik"],
];

const modifiers: ModifierSeed[] = [
  ["heute", "bugun", "A1"], ["morgen", "ertaga", "A1"], ["jetzt", "hozir", "A1"],
  ["später", "keyinroq", "A1"], ["oft", "tez-tez", "A1"], ["immer", "doimo", "A1"],
  ["gern", "mamnuniyat bilan", "A1"], ["zusammen", "birgalikda", "A1"],
  ["manchmal", "ba’zan", "A2"], ["selten", "kamdan-kam", "A2"],
  ["langsam", "sekin", "A2"], ["schnell", "tez", "A2"],
  ["regelmäßig", "muntazam ravishda", "B1"], ["allein", "yolg‘iz", "B1"],
  ["noch einmal", "yana bir marta", "B1"], ["sorgfältig", "sinchkovlik bilan", "B2"],
  ["sofort", "darhol", "B2"], ["schrittweise", "bosqichma-bosqich", "C1"],
  ["eigenständig", "mustaqil ravishda", "C1"], ["unter Vorbehalt", "shartli ravishda", "C2"],
  ["jeden Tag", "har kuni", "A1"], ["am Wochenende", "dam olish kunida", "A1"],
  ["morgens", "ertalab", "A1"], ["abends", "kechqurun", "A1"],
  ["normalerweise", "odatda", "A2"], ["gemeinsam", "birgalikda", "A2"],
  ["bewusst", "ongli ravishda", "B1"], ["erfolgreich", "muvaffaqiyatli ravishda", "B1"],
  ["gründlich", "batafsil ravishda", "B2"], ["systematisch", "tizimli ravishda", "C1"],
];

const nounVocabulary: VocabularyWord[] = nounSeeds.flatMap(
  ([article, noun, plural, uzbek, level, category], nounIndex) => [
    {
      id: `noun-${nounIndex + 1}-singular`,
      level,
      german: `${article} ${noun}`,
      uzbek,
      phonetic: "de-DE audio",
      partOfSpeech: "ot · birlik",
      category,
      example: `Das Wort „${noun}“ steht hier im Singular.`,
      exampleUzbek: `“${uzbek}” so‘zi bu yerda birlik shaklida.`,
    },
    {
      id: `noun-${nounIndex + 1}-plural`,
      level,
      german: `die ${plural}`,
      uzbek: `${uzbek}lar`,
      phonetic: "de-DE audio",
      partOfSpeech: "ot · ko‘plik",
      category,
      example: `„${plural}“ ist die Pluralform von „${noun}“.`,
      exampleUzbek: `“${plural}” — “${uzbek}” so‘zining ko‘plik shakli.`,
    },
  ],
);

const chunkVocabulary: VocabularyWord[] = verbSeeds.flatMap(
  ([verb, verbUzbek, verbLevel, category], verbIndex) =>
    modifiers.map(([modifier, modifierUzbek, modifierLevel], modifierIndex) => {
      const german = `${modifier} ${verb}`;
      const uzbek = `${modifierUzbek} ${verbUzbek}`;
      return {
        id: `chunk-${verbIndex + 1}-${modifierIndex + 1}-${slug(german)}`,
        level: higherLevel(verbLevel, modifierLevel),
        german,
        uzbek,
        phonetic: "de-DE audio",
        partOfSpeech: "foydali birikma",
        category,
        example: `Wir möchten ${german}.`,
        exampleUzbek: `Biz ${modifierUzbek} ${uzbekInfinitiveObject(verbUzbek)} xohlaymiz.`,
      } satisfies VocabularyWord;
    }),
);

export const extendedVocabulary: VocabularyWord[] = [
  ...nounVocabulary,
  ...chunkVocabulary,
];

if (extendedVocabulary.length !== 2940) {
  throw new Error(`Kengaytirilgan lug‘at 2940 ta bo‘lishi kerak, hozir: ${extendedVocabulary.length}`);
}
