import type { CefrLevel } from "@/data/curriculum";

export type GrammarQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type GrammarLesson = {
  moduleId: string;
  level: CefrLevel;
  title: string;
  rule: string;
  formula: string;
  examples: Array<{ german: string; uzbek: string }>;
  tip: string;
  questions: GrammarQuestion[];
};

const q = (id: string, prompt: string, options: string[], answer: string, explanation: string): GrammarQuestion => ({
  id,
  prompt,
  options,
  answer,
  explanation,
});

export const grammarLessons: GrammarLesson[] = [
  {
    moduleId: "a1-1", level: "A1", title: "sein fe’li va darak gap",
    rule: "Nemischa darak gapda tuslangan fe’l doim ikkinchi o‘rinda turadi. sein fe’li shaxsga qarab bin, bist, ist, sind yoki seid bo‘ladi.",
    formula: "Ega + sein + ma’lumot",
    examples: [{ german: "Ich bin Aziz.", uzbek: "Men Azizman." }, { german: "Sie sind Lehrerin.", uzbek: "Siz o‘qituvchisiz." }],
    tip: "Rasmiy Sie doim bosh harf bilan yoziladi va sind bilan keladi.",
    questions: [
      q("a1-1-1", "Ich ___ aus Usbekistan.", ["bin", "bist", "ist", "seid"], "bin", "ich bilan sein fe’lining bin shakli ishlatiladi."),
      q("a1-1-2", "Qaysi gap to‘g‘ri?", ["Ich Aziz bin.", "Ich bin Aziz.", "Bin ich Aziz.", "Ich sein Aziz."], "Ich bin Aziz.", "Darak gapda tuslangan fe’l ikkinchi o‘rinda turadi."),
    ],
  },
  {
    moduleId: "a1-2", level: "A1", title: "Egalik olmoshlari",
    rule: "mein, dein, sein va ihr egalikni bildiradi. Ot ayol jinsida yoki ko‘plikda bo‘lsa, odatda -e qo‘shimchasi keladi.",
    formula: "mein Bruder · meine Schwester · meine Eltern",
    examples: [{ german: "Das ist meine Mutter.", uzbek: "Bu mening onam." }, { german: "Sein Bruder spricht Deutsch.", uzbek: "Uning akasi nemischa gapiradi." }],
    tip: "Otning artiklini birga yodlang: der Bruder → mein Bruder, die Schwester → meine Schwester.",
    questions: [
      q("a1-2-1", "Das ist ___ Schwester.", ["mein", "meine", "meinen", "meiner"], "meine", "die Schwester ayol jinsidagi ot, shu sababli meine ishlatiladi."),
      q("a1-2-2", "Er heißt Ali. ___ Vater ist Arzt.", ["Sein", "Ihr", "Dein", "Unser"], "Sein", "Er uchun egalik olmoshi sein bo‘ladi."),
    ],
  },
  {
    moduleId: "a1-3", level: "A1", title: "Hozirgi zamonda fe’l tuslanishi",
    rule: "Muntazam fe’llarda o‘zakka shaxs qo‘shimchasi qo‘shiladi: -e, -st, -t, -en, -t, -en.",
    formula: "ich lerne · du lernst · er lernt · wir lernen",
    examples: [{ german: "Ich arbeite heute.", uzbek: "Men bugun ishlayman." }, { german: "Wann lernst du Deutsch?", uzbek: "Sen qachon nemis tilini o‘rganasan?" }],
    tip: "Fe’lning o‘zagini topish uchun infinitivdagi -en ni olib tashlang: lernen → lern-.",
    questions: [
      q("a1-3-1", "Du ___ jeden Tag Deutsch.", ["lerne", "lernst", "lernt", "lernen"], "lernst", "du bilan muntazam fe’l -st qo‘shimchasini oladi."),
      q("a1-3-2", "Wir ___ um sieben Uhr.", ["arbeitet", "arbeite", "arbeiten", "arbeitest"], "arbeiten", "wir bilan fe’l infinitiv shakliga teng: arbeiten."),
    ],
  },
  {
    moduleId: "a1-4", level: "A1", title: "Akkusativ va möchten",
    rule: "Bevosita obyekt Akkusativda keladi. Erkak jinsidagi der artikli den ga, ein esa einen ga o‘zgaradi.",
    formula: "Ich möchte + einen/den + erkak jinsidagi ot",
    examples: [{ german: "Ich kaufe einen Apfel.", uzbek: "Men olma sotib olaman." }, { german: "Wir möchten die Fahrkarte.", uzbek: "Biz chiptani xohlaymiz." }],
    tip: "Akkusativda faqat erkak jinsidagi artikl aniq ko‘rinib o‘zgaradi: der → den.",
    questions: [
      q("a1-4-1", "Ich möchte ___ Kaffee.", ["ein", "einen", "eine", "einem"], "einen", "der Kaffee erkak jinsida; Akkusativda einen bo‘ladi."),
      q("a1-4-2", "Wir kaufen ___ Brot.", ["der", "den", "das", "dem"], "das", "das Brot o‘rta jinsda va Akkusativda artikl o‘zgarmaydi."),
    ],
  },
  {
    moduleId: "a2-1", level: "A2", title: "Dativ va joylashuv",
    rule: "Wo? savoliga javob beruvchi joylashuv in, an, auf kabi ikki kelishikli predloglardan keyin Dativda keladi.",
    formula: "in + dem = im · an + dem = am",
    examples: [{ german: "Der Tisch steht im Wohnzimmer.", uzbek: "Stol mehmonxonada turibdi." }, { german: "Das Bild hängt an der Wand.", uzbek: "Rasm devorda osilib turibdi." }],
    tip: "Wo? — Dativ, Wohin? — Akkusativ qoidasini yo‘nalish predloglarida tekshirib boring.",
    questions: [
      q("a2-1-1", "Das Sofa steht ___ Wohnzimmer.", ["im", "ins", "in die", "am"], "im", "Joylashuv Wo? savoliga javob beradi: in dem → im."),
      q("a2-1-2", "Das Bild hängt an ___ Wand.", ["die", "der", "den", "dem"], "der", "die Wand Dativda der Wand bo‘ladi."),
    ],
  },
  {
    moduleId: "a2-2", level: "A2", title: "Modal fe’llar: sollen va müssen",
    rule: "Modal fe’l ikkinchi o‘rinda tuslanadi, asosiy fe’l esa infinitivda gap oxiriga boradi.",
    formula: "Ega + modal fe’l + ... + infinitiv",
    examples: [{ german: "Du sollst viel Wasser trinken.", uzbek: "Sen ko‘p suv ichishing kerak." }, { german: "Ich muss zum Arzt gehen.", uzbek: "Men shifokorga borishim kerak." }],
    tip: "sollen — tavsiya yoki birovning ko‘rsatmasi; müssen — kuchli zarurat.",
    questions: [
      q("a2-2-1", "Du ___ im Bett bleiben.", ["sollst", "sollen", "soll", "sollt"], "sollst", "du bilan sollen fe’li sollst bo‘ladi."),
      q("a2-2-2", "Qaysi gap to‘g‘ri?", ["Ich muss gehen heute.", "Ich gehen muss heute.", "Ich muss heute gehen.", "Ich heute gehen muss."], "Ich muss heute gehen.", "Modal fe’l ikkinchi, infinitiv esa oxirgi o‘rinda turadi."),
    ],
  },
  {
    moduleId: "a2-3", level: "A2", title: "Ajraluvchi fe’llar",
    rule: "Hozirgi zamonda ajraluvchi old qo‘shimcha gap oxiriga ketadi. Modal fe’l bilan esa infinitiv ajralmaydi.",
    formula: "Ich rufe dich an. · Ich möchte dich anrufen.",
    examples: [{ german: "Der Zug kommt um neun Uhr an.", uzbek: "Poyezd soat to‘qqizda yetib keladi." }, { german: "Wir steigen am Bahnhof aus.", uzbek: "Biz vokzalda tushamiz." }],
    tip: "Lug‘atda ajralish nuqtasini belgilang: an|kommen, aus|steigen, ein|steigen.",
    questions: [
      q("a2-3-1", "Der Bus ___ um 8 Uhr ___.", ["kommt / an", "ankommt / —", "an / kommt", "kommen / an"], "kommt / an", "ankommen hozirgi zamonda ajralib, an gap oxiriga boradi."),
      q("a2-3-2", "Ich möchte morgen ___.", ["ab fahren", "fahre ab", "abfahren", "fährt ab"], "abfahren", "Modal fe’ldan keyin ajraluvchi fe’l infinitivda birga yoziladi."),
    ],
  },
  {
    moduleId: "a2-4", level: "A2", title: "Perfekt zamoni",
    rule: "Perfekt haben yoki sein yordamchi fe’li va Partizip II bilan yasaladi. Harakat/holat o‘zgarishi fe’llari ko‘pincha sein oladi.",
    formula: "Ega + haben/sein + ... + Partizip II",
    examples: [{ german: "Ich habe Deutsch gelernt.", uzbek: "Men nemis tilini o‘rgandim." }, { german: "Wir sind nach Berlin gefahren.", uzbek: "Biz Berlinga bordik." }],
    tip: "Yordamchi fe’l ikkinchi, Partizip II esa gap oxirida turadi.",
    questions: [
      q("a2-4-1", "Wir ___ nach Hause gegangen.", ["haben", "sind", "werden", "sein"], "sind", "gehen harakat fe’li bo‘lgani uchun Perfektda sein oladi."),
      q("a2-4-2", "Ich habe ein Buch ___.", ["lesen", "gelesen", "gelest", "las"], "gelesen", "lesen fe’lining Partizip II shakli gelesen."),
    ],
  },
  {
    moduleId: "b1-1", level: "B1", title: "weil va deshalb bilan sabab",
    rule: "weil ergash gapida fe’l oxirga ketadi. deshalb yangi bosh gapni boshlaydi va undan keyin darhol fe’l keladi.",
    formula: "..., weil + ega + ... + fe’l. · Deshalb + fe’l + ega ...",
    examples: [{ german: "Ich lerne Deutsch, weil ich in Berlin arbeiten möchte.", uzbek: "Berlinda ishlamoqchi bo‘lganim uchun nemischa o‘rganaman." }, { german: "Ich habe morgen eine Prüfung. Deshalb lerne ich heute.", uzbek: "Ertaga imtihonim bor. Shuning uchun bugun o‘qiyman." }],
    tip: "weil va deshalb ma’nodosh, lekin gap tartibi boshqa.",
    questions: [
      q("b1-1-1", "Ich bewerbe mich, weil ich die Stelle interessant ___.", ["finde", "finden", "ich finde", "gefunden"], "finde", "weil ergash gapida tuslangan fe’l oxirda turadi."),
      q("b1-1-2", "Ich brauche Erfahrung. Deshalb ___ ich ein Praktikum.", ["ich mache", "mache ich", "ich ein Praktikum mache", "machen"], "mache ich", "deshalb birinchi o‘rinni egallaydi; fe’l undan keyin keladi."),
    ],
  },
  {
    moduleId: "b1-2", level: "B1", title: "Bilvosita savollar",
    rule: "Bilvosita so‘roq gaplarda ob, wann, warum, wie kabi so‘zlardan keyin fe’l ergash gap oxiriga boradi.",
    formula: "Ich weiß nicht, ob/wann/warum + ega + ... + fe’l.",
    examples: [{ german: "Ich weiß nicht, ob die Nachricht stimmt.", uzbek: "Xabar to‘g‘riligini bilmayman." }, { german: "Kannst du sagen, wann der Film beginnt?", uzbek: "Film qachon boshlanishini ayta olasanmi?" }],
    tip: "Ha/yo‘q savoli bilvosita bo‘lsa ob ishlatiladi.",
    questions: [
      q("b1-2-1", "Weißt du, wann der Kurs ___?", ["beginnt", "der Kurs beginnt", "beginnen", "hat begonnen"], "beginnt", "Bilvosita savolda fe’l ergash gap oxirida turadi."),
      q("b1-2-2", "Ich frage mich, ___ das wahr ist.", ["dass", "ob", "denn", "deshalb"], "ob", "Ha/yo‘q mazmunidagi bilvosita savol ob bilan boshlanadi."),
    ],
  },
  {
    moduleId: "b1-3", level: "B1", title: "Infinitiv mit zu",
    rule: "Bir ega bilan bajariladigan maqsad yoki reja ko‘pincha zu + infinitiv orqali ifodalanadi.",
    formula: "..., um ... zu + infinitiv · versuchen, ... zu + infinitiv",
    examples: [{ german: "Wir sparen Energie, um die Umwelt zu schützen.", uzbek: "Atrof-muhitni himoya qilish uchun energiyani tejaymiz." }, { german: "Ich versuche, weniger Plastik zu benutzen.", uzbek: "Kamroq plastik ishlatishga harakat qilaman." }],
    tip: "Ajraluvchi fe’lda zu o‘rtaga kiradi: einzukaufen, anzurufen.",
    questions: [
      q("b1-3-1", "Wir fahren mit dem Rad, um CO₂ ___ reduzieren.", ["zu", "um", "für", "—"], "zu", "um ... zu konstruksiyasida infinitivdan oldin zu keladi."),
      q("b1-3-2", "Ich versuche, früher ___.", ["aufstehen", "zu aufstehen", "aufzustehen", "stehe auf"], "aufzustehen", "Ajraluvchi aufstehen fe’lida zu old qo‘shimcha va o‘zak orasiga kiradi."),
    ],
  },
  {
    moduleId: "b1-4", level: "B1", title: "Garchi va qarama-qarshilik",
    rule: "obwohl ergash gapni boshlaydi va fe’l oxirga ketadi. trotzdem esa bosh gapda kelib, undan keyin fe’l turadi.",
    formula: "Obwohl ..., + fe’l ... · ..., trotzdem + fe’l + ega ...",
    examples: [{ german: "Obwohl es regnet, gehen wir spazieren.", uzbek: "Yomg‘ir yog‘ayotgan bo‘lsa ham, sayr qilamiz." }, { german: "Es regnet. Trotzdem gehen wir spazieren.", uzbek: "Yomg‘ir yog‘yapti. Shunga qaramay sayr qilamiz." }],
    tip: "obwohl va trotzdemni bir gapda birga ishlatmang.",
    questions: [
      q("b1-4-1", "Obwohl er müde ___, arbeitet er weiter.", ["ist", "er ist", "sein", "war er"], "ist", "obwohl ergash gapida tuslangan fe’l oxirga ketadi."),
      q("b1-4-2", "Es ist teuer. Trotzdem ___ ich es.", ["ich kaufe", "kaufe ich", "ich es kaufe", "kaufen"], "kaufe ich", "trotzdemdan keyin darhol tuslangan fe’l keladi."),
    ],
  },
  {
    moduleId: "b2-1", level: "B2", title: "Rasmiy yozuvda otlashtirish",
    rule: "Rasmiy uslubda fe’l va sifatlardan yasalgan otlar fikrni ixcham beradi va doim bosh harf bilan yoziladi.",
    formula: "entscheiden → die Entscheidung · durchführen → die Durchführung",
    examples: [{ german: "Nach der Prüfung der Unterlagen melden wir uns.", uzbek: "Hujjatlar tekshirilgach, siz bilan bog‘lanamiz." }, { german: "Die Durchführung dauert zwei Wochen.", uzbek: "Amalga oshirish ikki hafta davom etadi." }],
    tip: "-ung bilan tugagan otlarning artikli deyarli doim die.",
    questions: [
      q("b2-1-1", "Qaysi ot to‘g‘ri yozilgan?", ["die entscheidung", "die Entscheidung", "der Entscheidung", "das Entscheidenung"], "die Entscheidung", "Nemis tilidagi barcha otlar bosh harf bilan yoziladi; -ung otlari die oladi."),
      q("b2-1-2", "durchführen fe’lidan yasalgan otni toping.", ["die Durchführung", "der Durchführer", "das Durchfahren", "die Führung durch"], "die Durchführung", "Rasmiy matnda durchführen → die Durchführung shakli keng ishlatiladi."),
    ],
  },
  {
    moduleId: "b2-2", level: "B2", title: "Passiv jarayonlar",
    rule: "Vorgangspassiv harakat yoki jarayonni ta’kidlaydi: werden + Partizip II. Bajaruvchi von + Dativ bilan berilishi mumkin.",
    formula: "Ega + werden + ... + Partizip II",
    examples: [{ german: "Die Daten werden analysiert.", uzbek: "Ma’lumotlar tahlil qilinmoqda." }, { german: "Die Studie wurde von einem Team durchgeführt.", uzbek: "Tadqiqot jamoa tomonidan o‘tkazildi." }],
    tip: "Hozirgi zamon: wird gemacht; o‘tgan zamon: wurde gemacht.",
    questions: [
      q("b2-2-1", "Die Ergebnisse ___ morgen veröffentlicht.", ["werden", "wurden", "haben", "sind"], "werden", "Hozirgi zamon Passiv: werden + Partizip II."),
      q("b2-2-2", "Die Maschine ___ 2020 entwickelt.", ["wird", "wurde", "hat", "ist worden"], "wurde", "2020 o‘tgan vaqtni bildiradi; Präteritum Passivda wurde ishlatiladi."),
    ],
  },
  {
    moduleId: "b2-3", level: "B2", title: "Sifat qo‘shimchalari",
    rule: "Sifat qo‘shimchasi artikl, jins, son va kelishikka bog‘liq. Aniq artikldan keyin ko‘pincha -e yoki -en keladi.",
    formula: "der neue Film · den neuen Film · mit dem neuen Film",
    examples: [{ german: "Wir sehen einen interessanten Film.", uzbek: "Biz qiziqarli film ko‘ryapmiz." }, { german: "Sie spricht mit der bekannten Autorin.", uzbek: "U mashhur yozuvchi ayol bilan gaplashmoqda." }],
    tip: "Dativ va ko‘plikda sifat deyarli har doim -en oladi.",
    questions: [
      q("b2-3-1", "Das ist ein interessant___ Buch.", ["e", "er", "es", "en"], "es", "ein + das Buch Nominativda sifat -es oladi."),
      q("b2-3-2", "Wir sprechen mit dem bekannt___ Künstler.", ["e", "en", "er", "es"], "en", "Dativda aniq artikldan keyin sifat -en oladi."),
    ],
  },
  {
    moduleId: "b2-4", level: "B2", title: "Konjunktiv II",
    rule: "Konjunktiv II istak, muloyim so‘rov va real bo‘lmagan shartni bildiradi. Ko‘p fe’llarda würde + infinitiv ishlatiladi.",
    formula: "würde + infinitiv · hätte · wäre · könnte",
    examples: [{ german: "Ich würde gern in Deutschland studieren.", uzbek: "Men Germaniyada o‘qishni istardim." }, { german: "Wenn ich Zeit hätte, käme ich mit.", uzbek: "Vaqtim bo‘lsa edi, birga borardim." }],
    tip: "haben, sein va modal fe’llarda hätte, wäre, könnte kabi maxsus shakllar tabiiyroq.",
    questions: [
      q("b2-4-1", "Wenn ich mehr Zeit ___, würde ich reisen.", ["habe", "hätte", "hatte", "haben würde"], "hätte", "Real bo‘lmagan shartda haben fe’lining Konjunktiv II shakli hätte."),
      q("b2-4-2", "___ Sie mir bitte helfen?", ["Könnten", "Können", "Konnten", "Würden können"], "Könnten", "Könnten Sie ...? muloyim iltimos shaklidir."),
    ],
  },
  {
    moduleId: "c1-1", level: "C1", title: "Partizipial atributlar",
    rule: "Partizip I faol, davom etayotgan; Partizip II esa ko‘pincha tugallangan yoki passiv ma’noni sifat kabi ifodalaydi.",
    formula: "die steigenden Preise · die veröffentlichte Studie",
    examples: [{ german: "Die schnell wachsende Stadt braucht Wohnraum.", uzbek: "Tez o‘sayotgan shaharga uy-joy kerak." }, { german: "Die gestern veröffentlichten Daten sind eindeutig.", uzbek: "Kecha e’lon qilingan ma’lumotlar aniq." }],
    tip: "Partizip sifat vazifasida oddiy sifat kabi kelishik qo‘shimchasini oladi.",
    questions: [
      q("c1-1-1", "die gestern ___ Ergebnisse", ["veröffentlichen", "veröffentlichten", "veröffentlichende", "veröffentlicht"], "veröffentlichten", "Natijalar e’lon qilingan: Partizip II va ko‘plikdagi -en qo‘shimchasi kerak."),
      q("c1-1-2", "die ständig ___ Nachfrage", ["steigende", "gestiegene", "steigen", "stieg"], "steigende", "Davom etayotgan faol jarayon Partizip I bilan ifodalanadi."),
    ],
  },
  {
    moduleId: "c1-2", level: "C1", title: "Nominal uslub va predloglar",
    rule: "Akademik va rasmiy matnda wegen, aufgrund, trotz, angesichts kabi predloglar ko‘pincha Genitiv bilan ishlatiladi.",
    formula: "aufgrund + Genitiv · trotz + Genitiv · angesichts + Genitiv",
    examples: [{ german: "Aufgrund der hohen Kosten wurde das Projekt verschoben.", uzbek: "Yuqori xarajatlar sabab loyiha kechiktirildi." }, { german: "Trotz des Widerstands wurde die Reform beschlossen.", uzbek: "Qarshilikka qaramay islohot qabul qilindi." }],
    tip: "der/das → des + otga -(e)s; die/ko‘plik → der.",
    questions: [
      q("c1-2-1", "Aufgrund ___ neuen Gesetzes ...", ["das", "des", "dem", "den"], "des", "das Gesetz Genitivda des Gesetzes bo‘ladi."),
      q("c1-2-2", "Trotz ___ schwierigen Lage blieb sie ruhig.", ["die", "der", "den", "des"], "der", "die Lage Genitivda der Lage bo‘ladi."),
    ],
  },
  {
    moduleId: "c1-3", level: "C1", title: "Modal zarralar va ohang",
    rule: "doch, ja, eben, wohl kabi modal zarralar gapning faktik ma’nosini emas, so‘zlovchining munosabati va ohangini o‘zgartiradi.",
    formula: "Komm doch mit! · Das ist ja interessant. · Er kommt wohl später.",
    examples: [{ german: "Versuchen Sie es doch noch einmal.", uzbek: "Yana bir marta urinib ko‘ring-da." }, { german: "Das ist ja überraschend!", uzbek: "Bu-ku hayratlanarli!" }],
    tip: "Modal zarralarni so‘zma-so‘z tarjima qilishdan ko‘ra vaziyatdagi ohangini o‘rganing.",
    questions: [
      q("c1-3-1", "Komm ___ mit! (do‘stona undash)", ["doch", "wohl", "etwa", "eben"], "doch", "Buyruq gapdagi doch taklifni yumshatadi va undash ma’nosini beradi."),
      q("c1-3-2", "Er ist ___ schon zu Hause. (taxmin)", ["ja", "wohl", "doch", "mal"], "wohl", "wohl bu yerda ehtimol/taxmin ma’nosini beradi."),
    ],
  },
  {
    moduleId: "c1-4", level: "C1", title: "Murakkab bog‘lovchi vositalar",
    rule: "insofern als, zumal, wohingegen va nicht zuletzt murakkab fikrlar orasidagi aniq mantiqiy munosabatni ko‘rsatadi.",
    formula: "A, wohingegen B. · A, zumal + ergash gap.",
    examples: [{ german: "Die Methode ist effizient, wohingegen der alte Ansatz viel Zeit kostet.", uzbek: "Usul samarali, eski yondashuv esa ko‘p vaqt oladi." }, { german: "Der Vorschlag überzeugt, zumal er kostengünstig ist.", uzbek: "Taklif ishontiradi, ayniqsa u arzon bo‘lgani uchun." }],
    tip: "Bog‘lovchini ma’nosiga qarab tanlang: qarama-qarshilik, qo‘shimcha sabab yoki cheklov.",
    questions: [
      q("c1-4-1", "A modeli arzon, ___ B modeli tezroq.", ["wohingegen", "zumal", "sodass", "indem"], "wohingegen", "wohingegen ikki holatni qarama-qarshi qo‘yadi."),
      q("c1-4-2", "Die Lösung ist sinnvoll, ___ sie leicht umzusetzen ist.", ["wohingegen", "zumal", "dennoch", "andernfalls"], "zumal", "zumal qo‘shimcha va ayniqsa muhim sababni kiritadi."),
    ],
  },
  {
    moduleId: "c2-1", level: "C2", title: "Idioma va registr",
    rule: "Idiomalar butun birlik sifatida tushuniladi. Ularni rasmiy, neytral yoki so‘zlashuv registriga mos qo‘llash kerak.",
    formula: "etwas auf den Punkt bringen · den Nagel auf den Kopf treffen",
    examples: [{ german: "Sie hat das Problem auf den Punkt gebracht.", uzbek: "U muammoning mohiyatini aniq ifodaladi." }, { german: "Mit dieser Kritik trifft er den Nagel auf den Kopf.", uzbek: "Bu tanqid bilan u aynan nishonga urdi." }],
    tip: "Idiomani tarkibiy so‘zlarga ajratib emas, kontekst va registri bilan yodlang.",
    questions: [
      q("c2-1-1", "‘Mohiyatini aniq ifodalamoq’ uchun mos ibora?", ["auf den Punkt bringen", "um den heißen Brei reden", "ins Wasser fallen", "auf Eis legen"], "auf den Punkt bringen", "auf den Punkt bringen — fikrning mohiyatini aniq va ixcham aytish."),
      q("c2-1-2", "‘den Nagel auf den Kopf treffen’ nimani anglatadi?", ["xato qilmoq", "aynan to‘g‘ri topmoq", "mavzuni almashtirmoq", "sukut saqlamoq"], "aynan to‘g‘ri topmoq", "Ibora vaziyat yoki muammoni juda aniq baholashni bildiradi."),
    ],
  },
  {
    moduleId: "c2-2", level: "C2", title: "Konjunktiv I va bilvosita nutq",
    rule: "Konjunktiv I jurnalistik va rasmiy matnda boshqa birovning gapini masofa saqlab yetkazadi.",
    formula: "Er sagt, er sei ... · Sie erklärt, sie habe ...",
    examples: [{ german: "Der Minister sagte, die Lage sei stabil.", uzbek: "Vazir vaziyat barqaror ekanini aytdi." }, { german: "Sie erklärte, sie habe davon nichts gewusst.", uzbek: "U bundan bexabar bo‘lganini bildirdi." }],
    tip: "Konjunktiv I Indikativ bilan bir xil ko‘rinsa, aniqlik uchun Konjunktiv II ishlatilishi mumkin.",
    questions: [
      q("c2-2-1", "Er behauptet, die Studie ___ fehlerfrei.", ["ist", "sei", "wäre", "war"], "sei", "sein fe’lining Konjunktiv I shakli sei."),
      q("c2-2-2", "Sie sagt, sie ___ alles geprüft.", ["hat", "habe", "hätte", "hatte"], "habe", "Bilvosita nutqda haben fe’lining Konjunktiv I shakli habe."),
    ],
  },
  {
    moduleId: "c2-3", level: "C2", title: "Ritorik tuzilmalar",
    rule: "Parallelizm, uchlik va ritorik savollar nutqning ta’sirini oshiradi; biroq ular mazmunni almashtirmasligi kerak.",
    formula: "Wir brauchen Mut, Ausdauer und Vertrauen. · Wer, wenn nicht wir?",
    examples: [{ german: "Nicht weil es einfach ist, sondern weil es notwendig ist.", uzbek: "Oson bo‘lgani uchun emas, zarur bo‘lgani uchun." }, { german: "Wer, wenn nicht wir, sollte handeln?", uzbek: "Biz bo‘lmasak, kim harakat qilishi kerak?" }],
    tip: "Ta’sirchanlik uchun bir xil grammatik qoliplarni ongli ravishda takrorlang.",
    questions: [
      q("c2-3-1", "Qaysi jumlada parallelizm bor?", ["Wir prüfen, bewerten und entscheiden.", "Vielleicht regnet es.", "Das Buch liegt dort.", "Er kam gestern."], "Wir prüfen, bewerten und entscheiden.", "Uch fe’l bir xil grammatik shaklda ketma-ket kelib parallel tuzilma yaratgan."),
      q("c2-3-2", "‘Wer, wenn nicht wir?’ qanday vosita?", ["ritorik savol", "bilvosita savol", "buyruq gap", "shart gap"], "ritorik savol", "Javob talab qilmaydigan, tinglovchini ishontirishga xizmat qiladigan savol ritorik savoldir."),
    ],
  },
  {
    moduleId: "c2-4", level: "C2", title: "Ma’no nozikligi va tahrir",
    rule: "Yuqori darajadagi tahrirda takror, ortiqcha nominalizatsiya, noaniq olmosh va registr nomuvofiqligi bartaraf etiladi.",
    formula: "aniq fe’l + aniq ega + kontekstga mos registr",
    examples: [{ german: "Die Analyse verdeutlicht den Zusammenhang.", uzbek: "Tahlil bog‘liqlikni aniq ko‘rsatadi." }, { german: "Die Ergebnisse legen nahe, dass ...", uzbek: "Natijalar ... degan xulosaga ishora qiladi." }],
    tip: "Kuchli matn har doim murakkab emas; u maqsadga mos, aniq va izchil bo‘ladi.",
    questions: [
      q("c2-4-1", "Eng aniq va ixcham variantni tanlang.", ["Die Durchführung einer Analyse wurde vorgenommen.", "Man hat eine Analyse gemacht gehabt.", "Das Team analysierte die Daten.", "Es kam zur Analyse durch das Team."], "Das Team analysierte die Daten.", "Aniq ega va kuchli fe’l ortiqcha nominalizatsiyani yo‘qotadi."),
      q("c2-4-2", "Ilmiy ehtiyotkor xulosa uchun mos ifoda?", ["Das beweist für immer, dass ...", "Die Ergebnisse legen nahe, dass ...", "Jeder weiß natürlich, dass ...", "Es ist hundertprozentig klar, dass ..."], "Die Ergebnisse legen nahe, dass ...", "legen nahe ehtiyotkor, dalilga tayangan ilmiy xulosa beradi."),
    ],
  },
];

export function grammarForModule(moduleId: string) {
  return grammarLessons.find((lesson) => lesson.moduleId === moduleId);
}

export function grammarQuestionsForLevel(level: CefrLevel) {
  return grammarLessons.filter((lesson) => lesson.level === level).flatMap((lesson) => lesson.questions);
}
