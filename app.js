const NG_WORDS_FALLBACK = ["絶対に稼げる", "今すぐ買って", "誰でも100%", "放置で月収100万", "知らないと損"];
const PAID_ARTICLE_LINK = "https://note.com/ru_nurse/n/n48303b5f6ddb";
const FIXED_ARTICLE_LINK = "https://note.com/runa_ai_vlog/n/nd39117f18cc0";

const THEME_STORAGE_KEY = "threadsThemeSelectionHistoryV1";
const THEME_CATALOG = {
  "note初心者の悩み": [
    "毎日書いてるのに反応がなくて不安になる日",
    "投稿する前に消してしまう夜の迷い",
    "プロフィールを見直すタイミングが分からないまま進む",
    "読まれてるのに売上につながらない朝",
    "最初の1本目で完璧を目指して止まってしまう",
    "読者の悩みより自分の話を先にしてしまう癖",
    "いいねが少ないだけで向いてないと感じる瞬間",
    "書くネタはあるのに投稿ボタンが押せない理由",
  ],
  "有料記事が売れない理由": [
    "値段を下げても売れなかった昔のわたし",
    "有料にした瞬間だけ読者が離れる感覚",
    "無料部分で満足されて終わってしまう流れ",
    "読みやすいのに購入されない文章の並び",
    "売り込みたくなくて案内が弱くなる問題",
    "いい内容なのに最後の一歩が押せない構成",
    "実体験を書いても価値が伝わらない見せ方",
    "価格よりも先に整えるべきことを後回しにしていた話",
  ],
  "低単価から抜け出す考え方": [
    "300円の記事だけが増えて疲れていた時期",
    "安くすれば安心だと思っていた思い込み",
    "単価を上げる前に必要だった小さな準備",
    "高単価にすると申し訳なくなる気持ちとの向き合い方",
    "値段を決める前に決めるべき読者のゴール",
    "単価より導線を変えたら空気が変わった話",
    "安く出すクセを手放せたきっかけ",
    "低単価の安心感が成長を止めていたこと",
  ],
  "無料記事の書き方": [
    "無料記事で全部説明してしまっていた失敗",
    "読者が次に進みたくなる無料部分の作り方",
    "有益だけど売れない文章になっていた理由",
    "無料記事に入れるべき問いかけの置き方",
    "冒頭で離脱されない話の入り方を試した日",
    "無料記事の終わり方で反応が変わった経験",
    "読むだけで終わらせない一文の工夫",
    "無料で信頼を作りつつ有料へつなぐ考え方",
  ],
  "固定記事・導線": [
    "プロフィールに来た読者が次に進めない状態",
    "固定記事の最初の3行を変えたら流れが整った話",
    "導線を一本化しただけで迷わせなくなった日",
    "固定記事に置く順番で伝わり方が変わる",
    "どの記事から読んでも迷わない入口の作り方",
    "固定記事を放置して遠回りしていた頃",
    "読者が迷わないリンク配置を見直した夜",
    "努力を結果に変える導線の土台づくり",
  ],
  "るナースの失敗談": [
    "頑張ってるのに空回りして泣いた日のこと",
    "投稿数だけ増やして疲れていた頃のわたし",
    "読者目線を忘れて自己満足で終わっていた話",
    "売れない理由を才能のせいにしていた過去",
    "無料で出し切って有料が薄くなった失敗",
    "途中で型を崩して迷子になった体験",
    "続けるほど自信をなくした時期に戻って気づいたこと",
    "遠回りしてから分かったシンプルな基本",
  ],
  "看護師・夜勤・本業との両立": [
    "夜勤明けでも5分だけ書くと決めた日",
    "本業の疲れで投稿を諦めそうになる夜",
    "看護師の経験がnoteで価値になると気づいた瞬間",
    "シフト勤務でも続けるためにやめたこと",
    "休憩時間のメモが投稿の軸になった話",
    "忙しい日こそ短くても続ける意味",
    "本業優先でも副業を止めない工夫",
    "時間がない人ほど導線を先に作るべき理由",
  ],
  "AI×note": [
    "AIに任せすぎて自分の言葉が消えた失敗",
    "AI下書きをるナース文体に戻すコツ",
    "AIで時短しても売れない時に見直した点",
    "AIを使う日ほど体験談を先に置く理由",
    "AIに書かせる前に決めるべき読者の悩み",
    "AIで量は増えたのに反応が落ちた原因",
    "AIの提案をそのまま使わなくなったきっかけ",
    "AIと自分の役割を分けると書きやすくなる話",
  ],
  "継続・毎日投稿": [
    "続けるだけで変わると信じていた頃の盲点",
    "毎日投稿がつらい日に守る最低ライン",
    "完璧を捨てたら続けやすくなった話",
    "休みたくなる日に投稿を終える小さな手順",
    "反応ゼロの日でも止めない理由",
    "積み上げが実感に変わるまでのしんどさ",
    "続けるために最初に捨てたこだわり",
    "毎日投稿で心が折れないための視点",
  ],
  "何者か開示・自己紹介": [
    "るナースがnoteを続ける理由を改めて話す日",
    "看護師の現場経験が投稿ににじむ瞬間",
    "わたしが最初に副業でつまずいた背景",
    "遠回りしたからこそ伝えたい読者への約束",
    "るナースとして発信する軸のつくり方",
    "最初は何者でもなかったわたしの一歩目",
    "読者に伝える肩書きより先に決めた価値観",
    "自己紹介を更新して気づいた現在地",
  ],
  "価値観・本音": [
    "うまくいかない日ほど丁寧に書くと決めている",
    "売上より信頼を先に積むと楽になる話",
    "焦っている時ほど読者の気持ちに戻る理由",
    "強い言葉よりやさしい言葉を選ぶ理由",
    "結果が出る前の自分を責めないでほしい日",
    "不安なままでも投稿していいと思えた夜",
    "遠回りも経験として残ると信じている",
    "できない日があっても続ける価値は消えない",
  ],
  "直接投稿向けテーマ": [
    "低単価記事から抜け出せない理由を言語化する日",
    "高単価記事が怖くて出せない壁の越え方",
    "無料で出しすぎると売れなくなる流れをほどく",
    "セールスなしで売れる文章の並べ方を見直す",
    "300円記事から抜け出したい人が最初に変える点",
    "有料記事の価値を自然に伝える導入の作り方",
  ],
  "間接投稿向けテーマ": [
    "売れない原因は努力不足じゃないと気づいた話",
    "無料記事で読者を満足させすぎていた頃",
    "売れるnoteにあるルールを見落としていた失敗",
    "毎日投稿しても売れない理由を分解してみる",
    "努力の方向性を間違えていた過去のわたし",
    "固定記事を整えるだけで変わる最初の一歩",
  ],
};

const DEFAULT_THEME_POOL = Object.entries(THEME_CATALOG).flatMap(([category, topics], categoryIndex) =>
  topics.map((text, topicIndex) => ({
    id: `${categoryIndex + 1}-${topicIndex + 1}`,
    category,
    text,
  })),
);

const POST_SLOTS = [
  { time: "6:27", type: "朝の感情・共感型" },
  { time: "7:02", type: "注意喚起型" },
  { time: "7:37", type: "誰こいつ型" },
  { time: "8:08", type: "勘違い指摘型" },
  { time: "11:28", type: "問いかけ型" },
  { time: "12:13", type: "共感型" },
  { time: "12:32", type: "小さな行動提案型" },
  { time: "13:05", type: "失敗談型" },
  { time: "16:28", type: "気づき共有型" },
  { time: "17:01", type: "価値観共有型" },
  { time: "17:33", type: "勘違い指摘型" },
  { time: "18:36", type: "黄金の型" },
  { time: "19:12", type: "実績×気づき型" },
  { time: "19:34", type: "固定記事への自然導線型" },
  { time: "20:07", type: "直誘導寄り" },
  { time: "20:39", type: "間接誘導型" },
  { time: "21:02", type: "何者か開示型" },
  { time: "21:42", type: "共感＋背中押し型" },
  { time: "22:05", type: "本音型" },
  { time: "22:47", type: "締め投稿型" },
];

const SLOT_THEME_RULES = {
  "6:27": ["継続・毎日投稿", "看護師・夜勤・本業との両立", "価値観・本音"],
  "7:02": ["note初心者の悩み", "有料記事が売れない理由", "無料記事の書き方"],
  "7:37": ["直接投稿向けテーマ"],
  "8:08": ["note初心者の悩み"],
  "11:28": ["note初心者の悩み", "継続・毎日投稿", "価値観・本音"],
  "12:13": ["間接投稿向けテーマ"],
  "12:32": ["継続・毎日投稿", "無料記事の書き方", "AI×note"],
  "13:05": ["るナースの失敗談"],
  "16:28": ["AI×note", "低単価から抜け出す考え方", "有料記事が売れない理由"],
  "17:01": ["価値観・本音"],
  "17:33": ["有料記事が売れない理由", "note初心者の悩み", "無料記事の書き方"],
  "18:36": ["低単価から抜け出す考え方", "有料記事が売れない理由"],
  "19:12": ["看護師・夜勤・本業との両立", "るナースの失敗談", "継続・毎日投稿"],
  "19:34": ["固定記事・導線"],
  "20:07": ["直接投稿向けテーマ"],
  "20:39": ["間接投稿向けテーマ"],
  "21:02": ["何者か開示・自己紹介"],
  "21:42": ["価値観・本音", "看護師・夜勤・本業との両立", "継続・毎日投稿"],
  "22:05": ["価値観・本音"],
  "22:47": ["継続・毎日投稿", "価値観・本音", "看護師・夜勤・本業との両立"],
};

const docsState = { ngWords: NG_WORDS_FALLBACK };
const uiState = { treeSets: [] };

const dom = {
  themeInput: document.getElementById("themeInput"),
  fillRecommendedBtn: document.getElementById("fillRecommendedBtn"),
  clearThemesBtn: document.getElementById("clearThemesBtn"),
  generateBtn: document.getElementById("generateBtn"),
  copyAllBtn: document.getElementById("copyAllBtn"),
  results: document.getElementById("results"),
  status: document.getElementById("status"),
  postTemplate: document.getElementById("postTemplate"),
};

init();

async function init() {
  await loadDocs();

  dom.fillRecommendedBtn.addEventListener("click", () => {
    const recommendedThemes = generateRecommendedThemes({ shouldPersist: true });
    dom.themeInput.value = recommendedThemes.join("\n");
    showGlobalStatus("今日の20テーマを入力しました。", true);
  });

  dom.clearThemesBtn.addEventListener("click", () => {
    dom.themeInput.value = "";
    showGlobalStatus("テーマ一覧をクリアしました。", true);
  });

  dom.generateBtn.addEventListener("click", () => {
    uiState.treeSets = generateTwentyTreeSets(dom.themeInput.value);
    renderTreeSets(uiState.treeSets);
    dom.copyAllBtn.disabled = uiState.treeSets.length === 0;
    showGlobalStatus(`${uiState.treeSets.length}件のツリー投稿を生成しました。`, true);
  });

  dom.copyAllBtn.addEventListener("click", async () => {
    if (!uiState.treeSets.length) {
      showGlobalStatus("先に投稿を生成してください。", false);
      return;
    }

    await handleCopyAction({
      button: dom.copyAllBtn,
      text: collectAllTreeSetsText(uiState.treeSets),
      successMessage: "20セットをまとめてコピーしました。",
      failMessage: "コピーできませんでした。手動で選択してください。",
    });
  });
}

async function loadDocs() {
  const ngWords = await fetchText("docs/ng-words.md");
  const ngWordCandidates = parseMarkdownBullets(ngWords);
  if (ngWordCandidates.length) docsState.ngWords = ngWordCandidates;
}

async function fetchText(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  }
}

function parseMarkdownBullets(text) {
  return text
    .split("\n")
    .filter((line) => /^[-*]\s+/.test(line.trim()))
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean);
}

function parseThemeLines(themesText) {
  const themes = themesText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (themes.length) return [...new Set(themes)];
  return generateRecommendedThemes({ shouldPersist: true });
}

function generateTwentyTreeSets(themesText) {
  const themes = parseThemeLines(themesText);

  return POST_SLOTS.map((slot, index) => {
    const number = index + 1;
    const theme = themes[index % themes.length];
    const mode = getAutoMode(slot.time);
    const tree = buildTreePosts({ slot, theme, mode, seed: Date.now() + index * 113 });

    return {
      number,
      time: slot.time,
      patternType: slot.type,
      theme,
      post1: sanitizeText(tree.post1),
      post2: sanitizeText(tree.post2),
    };
  });
}

function generateRecommendedThemes({ shouldPersist }) {
  const history = getThemeHistory();
  const previousIds = new Set(history.lastThemeIds || []);
  const previousSignature = history.lastSignature || "";
  const requiredCount = POST_SLOTS.length;
  let picked = [];

  for (let attempt = 0; attempt < 5; attempt += 1) {
    picked = pickThemesForSlots(previousIds, Date.now() + attempt * 941);
    const signature = buildThemeSignature(picked);
    if (signature !== previousSignature) break;
  }

  if (picked.length < requiredCount) {
    picked = DEFAULT_THEME_POOL.slice(0, requiredCount);
  }

  if (shouldPersist) {
    setThemeHistory({
      lastThemeIds: picked.map((theme) => theme.id),
      lastSignature: buildThemeSignature(picked),
      updatedAt: new Date().toISOString(),
    });
  }

  return picked.map((theme) => theme.text);
}

function pickThemesForSlots(previousIds, baseSeed) {
  const usedIds = new Set();
  return POST_SLOTS.map((slot, index) => {
    const categories = SLOT_THEME_RULES[slot.time] || Object.keys(THEME_CATALOG);
    return pickThemeForSlot({ categories, usedIds, previousIds, seed: baseSeed + index * 101 }) || fallbackTheme({ usedIds, seed: baseSeed + index * 307 });
  }).filter(Boolean);
}

function pickThemeForSlot({ categories, usedIds, previousIds, seed }) {
  const categorySet = new Set(categories);
  const inCategory = DEFAULT_THEME_POOL.filter((theme) => categorySet.has(theme.category));
  const nonUsed = inCategory.filter((theme) => !usedIds.has(theme.id));
  const preferred = nonUsed.filter((theme) => !previousIds.has(theme.id));
  const picked = pickBySeed(preferred.length ? preferred : nonUsed, seed);
  if (!picked) return null;
  usedIds.add(picked.id);
  return picked;
}

function fallbackTheme({ usedIds, seed }) {
  const candidates = DEFAULT_THEME_POOL.filter((theme) => !usedIds.has(theme.id));
  const picked = pickBySeed(candidates, seed);
  if (!picked) return null;
  usedIds.add(picked.id);
  return picked;
}

function pickBySeed(list, seed) {
  if (!list.length) return null;
  return list[Math.abs(seed) % list.length];
}

function buildThemeSignature(themes) {
  return themes
    .map((theme) => theme.id)
    .slice()
    .sort()
    .join("|");
}

function getThemeHistory() {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function setThemeHistory(history) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(history));
  } catch {
    // ignore storage quota and private mode errors
  }
}

function getAutoMode(time) {
  if (["7:37", "20:07"].includes(time)) return "direct";
  if (["12:13", "20:39"].includes(time)) return "indirect";
  return "normal";
}

function buildTreePosts({ slot, theme, mode, seed }) {
  const p = buildPerspective(theme, mode, seed);

  const hook = slot.time === "6:27" ? "おはるナース☀️" : pickRandom(["ちょっと聞いてほしい。", "正直、これでかなり遠回りした。", "これ、昔のわたしに一番伝えたい。"], seed + 1);

  const post1Sections = [
    hook,
    p.readerPain,
    p.readerMisunderstanding,
    "わたしもそうだった。",
    p.pastFailure,
    "でも気づいた。",
    p.cliff,
  ];

  const post2Sections = [
    p.awareness,
    "昔のわたしは、",
    p.pastFailure,
    p.concreteAction,
    "完璧じゃなくていい。",
    "同じように迷ってる読者は、まずここからで大丈夫。",
  ];

  const cta = getCtaByMode(mode, seed);
  if (cta) post2Sections.push(cta, getLinkByMode(mode));

  return {
    post1: formatRunursePost(post1Sections, 1),
    post2: formatRunursePost(post2Sections, 2),
  };
}

function formatRunursePost(sections, postNumber) {
  const formattedSections = sections
    .map((section) => formatRunurseSection(section))
    .filter(Boolean);

  const withKeywordSpacing = applyKeywordSpacing(formattedSections.join("\n\n"));
  const normalized = withKeywordSpacing.replace(/\n{3,}/g, "\n\n").trim();

  if (postNumber === 1) {
    return normalized.replace(/\n{2,}/g, "\n\n");
  }

  return normalized;
}

function formatRunurseSection(text) {
  const source = (text || "").trim();
  if (!source) return "";

  const sentences = splitKeepingPunctuation(source, "。")
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const lineGroups = sentences.map((sentence) => {
    const commaSplit = splitKeepingPunctuation(sentence, "、").flatMap((piece) => splitLongLine(piece.trim()));
    const lines = commaSplit.filter(Boolean);
    return chunkArray(lines, 2).map((chunk) => chunk.join("\n")).join("\n\n");
  });

  return lineGroups.filter(Boolean).join("\n\n");
}

function splitKeepingPunctuation(text, mark) {
  const escaped = mark.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text
    .split(new RegExp(`(${escaped})`))
    .reduce((acc, part) => {
      if (!part) return acc;
      if (part === mark && acc.length) {
        acc[acc.length - 1] += mark;
        return acc;
      }
      acc.push(part);
      return acc;
    }, []);
}

function splitLongLine(line, preferred = 18, min = 15, max = 22) {
  const clean = line.trim();
  if (!clean) return [];
  if (clean.length <= max) return [clean];

  const preferredBreaks = ["、", "。", "のに", "から", "けど", "ので", "して", "すると", "だった", "ます", "る", "た"];
  const chunks = [];
  let rest = clean;

  while (rest.length > max) {
    const breakIndex = findBreakIndex(rest, preferredBreaks, preferred, min, max);
    if (breakIndex <= 0) break;
    chunks.push(rest.slice(0, breakIndex).trim());
    rest = rest.slice(breakIndex).trim();
  }

  if (rest) chunks.push(rest);
  return chunks;
}

function findBreakIndex(text, candidates, preferred, min, max) {
  let best = -1;
  let bestDistance = Infinity;

  for (let i = min; i <= Math.min(max, text.length - 1); i += 1) {
    const left = text.slice(0, i);
    const match = candidates.some((token) => left.endsWith(token));
    if (!match) continue;
    const distance = Math.abs(preferred - i);
    if (distance < bestDistance) {
      best = i;
      bestDistance = distance;
    }
  }

  if (best !== -1) return best;
  return Math.min(max, text.length - 1);
}

function chunkArray(items, size) {
  const result = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

function applyKeywordSpacing(text) {
  const keywords = ["でも", "正直", "わたしもそうだった", "昔のわたしは", "ここで気づいた"];
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim()) continue;
    if (!keywords.some((keyword) => line.includes(keyword))) continue;
    if (i > 0 && lines[i - 1].trim()) {
      lines.splice(i, 0, "");
      i += 1;
    }
    if (i < lines.length - 1 && lines[i + 1].trim()) {
      lines.splice(i + 1, 0, "");
      i += 1;
    }
  }

  return lines.join("\n");
}

function buildPerspective(theme, mode, seed) {
  const normalPains = [
    "毎日投稿してるのに、反応が増えなくて心が折れそうになる。",
    "時間を使って書いてるのに、売上につながらなくて不安になる。",
    "頑張ってるのに変化が見えなくて、手が止まりそうになる。",
  ];
  const normalMisunderstandings = [
    "記事数を増やせば、いつか自然に売れると思ってた。",
    "文章を長くすれば価値が伝わると信じてた。",
    "知識を全部書けば、読者に喜ばれると思ってた。",
  ];

  const directPains = [
    "300円の記事は売れるのに、高単価にすると怖くて出せない。",
    "無料記事に全部書いてしまって、有料に残す内容がなくなる。",
    "セールス感が怖くて、案内文を書く手が止まる。",
  ];
  const directMisunderstandings = [
    "文章力が足りないから売れないと思ってた。",
    "価格を下げれば読者は増えると思ってた。",
    "有料にすること自体が悪いことだと思ってた。",
  ];

  const indirectPains = [
    "努力してるのに売れなくて、何を変えればいいか分からなくなる。",
    "無料記事を丁寧に書いてるのに、次の行動につながらない。",
    "毎日続けてるのに反応が薄くて、方向が合ってるか不安になる。",
  ];
  const indirectMisunderstandings = [
    "頑張る量を増やせば突破できると思ってた。",
    "有益なら読者は自然に進んでくれると思ってた。",
    "全部親切に書くほど売れると信じてた。",
  ];

  const selectedPains = mode === "direct" ? directPains : mode === "indirect" ? indirectPains : normalPains;
  const selectedMis = mode === "direct" ? directMisunderstandings : mode === "indirect" ? indirectMisunderstandings : normalMisunderstandings;

  return {
    readerPain: pickRandom(selectedPains, seed + 2),
    readerMisunderstanding: pickRandom(selectedMis, seed + 3),
    pastFailure: `テーマを見たまま書き始めて、話が散らかってしまってた。`,
    cliff: pickRandom([
      "努力不足じゃなかった。見直す場所が違った。",
      "止まる原因は根性じゃなくて、書く前の設計だった。",
      "答えはすぐ近くにあったのに、わたしはずっと外してた。",
    ], seed + 4),
    awareness: pickRandom([
      "見直す場所は、記事数じゃなくて『何につなげる投稿なのか』だった。",
      "わたしが変えたのは、書く量じゃなくて投稿の順番だった。",
      "遠回りを止めたきっかけは、読者の次の一歩を先に決めたことだった。",
    ], seed + 5),
    concreteAction: `今日はテーマ名をそのまま書かずに、
「読者の悩み」「勘違い」「わたしの失敗」「気づき」の4行メモを先に作ってから投稿する。`,
  };
}

function getCtaByMode(mode, seed) {
  if (mode === "direct") {
    return pickRandom([
      "低単価の記事から抜け出したくて、わたしが遠回りして見つけた「売れる文章の並べ方」はここにまとめました👇",
      "高単価に進むのが怖かったわたしが、少しずつ変えられた流れをここに残しました👇",
    ], seed + 6);
  }

  if (mode === "indirect") {
    return pickRandom([
      "わたしが遠回りして気づいた売れるnoteの「あるルール」は、固定記事にまとめています👇",
      "努力の方向を整えるために、最初に読んでほしい内容を固定記事に置いています👇",
    ], seed + 7);
  }

  return "";
}

function getLinkByMode(mode) {
  if (mode === "direct") return PAID_ARTICLE_LINK;
  if (mode === "indirect") return FIXED_ARTICLE_LINK;
  return "";
}

function pickRandom(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function sanitizeText(text) {
  let next = text.replace(/\b私\b/g, "わたし").replace(/\n{3,}/g, "\n\n").trim();
  next = next.replace(/読み手/g, "読者");
  next = sanitizeNgWords(next, docsState.ngWords);
  return next;
}

function sanitizeNgWords(text, ngWords) {
  return ngWords.reduce((acc, word) => {
    if (!word) return acc;
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "gi");
    return acc.replace(re, "[表現をやわらげる]");
  }, text);
}

function renderTreeSets(treeSets) {
  dom.results.innerHTML = "";

  treeSets.forEach((treeSet) => {
    const node = dom.postTemplate.content.firstElementChild.cloneNode(true);
    const numberNode = node.querySelector(".post-number");
    const timeNode = node.querySelector(".post-time");
    const themeNode = node.querySelector(".post-theme");
    const typeNode = node.querySelector(".post-type");
    const post1Node = node.querySelector(".post1-text");
    const post2Node = node.querySelector(".post2-text");
    const copyPost1Btn = node.querySelector(".copy-post1-btn");
    const copyPost2Btn = node.querySelector(".copy-post2-btn");
    const copyTreeBtn = node.querySelector(".copy-tree-btn");
    const feedbackNode = node.querySelector(".copy-feedback");

    numberNode.textContent = `No.${treeSet.number}`;
    timeNode.textContent = `投稿時間：${treeSet.time}`;
    themeNode.textContent = `テーマ：${treeSet.theme}`;
    typeNode.textContent = `型：${treeSet.patternType}`;
    post1Node.value = treeSet.post1;
    post2Node.value = treeSet.post2;

    copyPost1Btn.addEventListener("click", async () => {
      await handleCopyAction({ button: copyPost1Btn, text: treeSet.post1, successMessage: `No.${treeSet.number} の投稿1をコピーしました。`, failMessage: "コピーできませんでした。手動で選択してください。", feedbackNode });
    });

    copyPost2Btn.addEventListener("click", async () => {
      await handleCopyAction({ button: copyPost2Btn, text: treeSet.post2, successMessage: `No.${treeSet.number} の投稿2をコピーしました。`, failMessage: "コピーできませんでした。手動で選択してください。", feedbackNode });
    });

    copyTreeBtn.addEventListener("click", async () => {
      await handleCopyAction({ button: copyTreeBtn, text: formatTreeSetText(treeSet), successMessage: `No.${treeSet.number} のツリーをコピーしました。`, failMessage: "コピーできませんでした。手動で選択してください。", feedbackNode });
    });

    dom.results.append(node);
  });
}

function formatTreeSetText(treeSet) {
  return `【${treeSet.time}】\nNo.${treeSet.number}\nテーマ：${treeSet.theme}\n型：${treeSet.patternType}\n\n投稿1（1/2）\n${treeSet.post1}\n\n投稿2（2/2）\n${treeSet.post2}`;
}

function collectAllTreeSetsText(treeSets) {
  return treeSets.map((treeSet) => formatTreeSetText(treeSet)).join("\n\n--------------------\n\n");
}

async function handleCopyAction({ button, text, successMessage, failMessage, feedbackNode }) {
  const defaultLabel = button.dataset.defaultLabel || button.textContent;
  const ok = await safeCopy(text);

  if (ok) {
    button.textContent = "コピーしました";
    showGlobalStatus(successMessage, true);
    if (feedbackNode) {
      feedbackNode.textContent = "コピーしました";
      feedbackNode.classList.remove("error");
    }

    window.setTimeout(() => {
      button.textContent = defaultLabel;
      if (feedbackNode) feedbackNode.textContent = "";
    }, 2000);
    return;
  }

  showGlobalStatus(failMessage, false);
  if (feedbackNode) {
    feedbackNode.textContent = failMessage;
    feedbackNode.classList.add("error");
  }
}

function showGlobalStatus(message, isSuccess) {
  dom.status.textContent = message;
  dom.status.classList.toggle("error", !isSuccess);
}

async function safeCopy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.append(temp);
    temp.select();
    const success = document.execCommand("copy");
    temp.remove();
    return success;
  }
}
