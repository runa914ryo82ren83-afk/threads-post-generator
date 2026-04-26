const NG_WORDS_FALLBACK = ["絶対に稼げる", "今すぐ買って", "誰でも100%", "放置で月収100万", "知らないと損"];
const DEFAULT_PAID_ARTICLE_LINK = "https://note.com/ru_nurse/n/n48303b5f6ddb";
const DEFAULT_FIXED_ARTICLE_LINK = "https://note.com/runa_ai_vlog/n/nd39117f18cc0";

const DEFAULT_THEMES = [
  "note初心者が挫折する理由",
  "有料記事を出すのが怖い理由",
  "ビューが伸びない人の共通点",
  "売れる記事と読まれる記事の違い",
  "固定記事を整えるべき理由",
  "無料記事で全部出しすぎる人が売れない理由",
  "noteのプロフィールを整えるべき理由",
  "毎日投稿しても売れない人の共通点",
  "文章力より導線が大事な理由",
  "有料記事の価格を下げても売れない理由",
  "AIで文章を書いても売れない理由",
  "自分の経験に価値がないと思ってしまう理由",
  "0→1達成に必要な考え方",
  "副業で遠回りする人の共通点",
  "noteで売れる無料部分の作り方",
  "読者が続きを読みたくなる文章の作り方",
  "note初心者がまず直すべき場所",
  "セールスなしで売れる導線の考え方",
  "るナースが副業で遠回りして気づいたこと",
  "看護師でもnote副業を続けられる理由",
];

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

const HOOK_CANDIDATES = [
  "あの、ちょっといいですか",
  "ちょっと聞いてほしい",
  "これだけは言わせてください",
  "ちょっとだけいいですか",
  "ちょっと待ってください",
  "これ、先に言わせて",
  "ちょっと待って",
  "それ、もったいないです",
  "それ、遠回りかもです",
  "それ、ズレてるかもです",
  "それ、しんどくなるやつです",
  "それ、効率よくないです",
  "それ、わたしも失敗しました",
  "それ、続けると変わらないです",
  "それ、気づかないと損です",
  "それ、時間ムダにします",
  "ちょっと危ないです",
  "それ、非効率かもです",
  "そのままだと止まります",
  "それ、結果出にくいです",
  "それ、やってる人多いです",
];

const TARGET_PHRASES = [
  "頑張ってnote書いてるのに、ビューが伸びなくて悩んでる人",
  "note毎日投稿してるのに、全然反応がない人",
  "note頑張ってるのに、スキが増えない人",
  "これでいいのかなって思いながらnote書いてる人",
  "noteがまだ売れたことがない人",
  "note頑張ってるのに、ずっと0円のままの人",
  "自分には有料記事にできることないと思ってる人",
  "自分の経験に価値ないと思ってる人",
  "これでお金もらっていいのかなって思ってる人",
  "自信なくて有料記事出せない人",
  "自分の記事に自信なくて止まってる人",
  "有料にしたいけど怖くて出せない人",
];

const CLIFF_ENDINGS = [
  "でも、本当に直すべき場所はそこじゃなかった。",
  "わたしはずっと、ここを勘違いしてた。",
  "売れない理由は、思ってたよりシンプルだった。",
  "ここに気づくまで、かなり遠回りした。",
  "正直、もっと早く知りたかった。",
  "でも、ある日やっと原因が見えた。",
  "これ、昔のわたしに一番言いたいこと。",
  "実は、頑張る場所を間違えてただけだった。",
  "この差に気づいた瞬間、noteの見え方が変わった。",
  "答えは、努力の量じゃなかった。",
  "ここを間違えると、どれだけ書いても苦しくなる。",
  "わたしが3年遠回りした原因、これだった。",
];

const APPEAL_PHRASES = [
  "これ、noteで悩んでる人に読んでほしい",
  "note初心者さんへ",
  "有料記事が怖い人に届いてほしい",
  "ビューが伸びなくて悩んでる人に向けて書いてます",
  "これ、0→1で止まってる人に届いてほしいです",
  "noteで結果出てない人へ",
  "自信なくて止まってる人へ",
  "今のまま続けていいのかなって悩んでる人へ",
  "note初心者の人へ",
  "頑張ってるのに売れない人、もったいないです",
];

const docsState = { ngWords: NG_WORDS_FALLBACK };
const uiState = { treeSets: [] };

const dom = {
  postMode: document.getElementById("postMode"),
  themeInput: document.getElementById("themeInput"),
  paidArticleLink: document.getElementById("paidArticleLink"),
  fixedArticleLink: document.getElementById("fixedArticleLink"),
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
  dom.paidArticleLink.value = DEFAULT_PAID_ARTICLE_LINK;
  dom.fixedArticleLink.value = DEFAULT_FIXED_ARTICLE_LINK;

  dom.fillRecommendedBtn.addEventListener("click", () => {
    dom.themeInput.value = DEFAULT_THEMES.join("\n");
    showGlobalStatus("おすすめテーマを入力しました。", true);
  });

  dom.clearThemesBtn.addEventListener("click", () => {
    dom.themeInput.value = "";
    showGlobalStatus("テーマ一覧をクリアしました。", true);
  });

  dom.generateBtn.addEventListener("click", () => {
    uiState.treeSets = generateTwentyTreeSets({
      themesText: dom.themeInput.value,
      mode: dom.postMode.value,
      paidArticleLink: dom.paidArticleLink.value.trim() || DEFAULT_PAID_ARTICLE_LINK,
      fixedArticleLink: dom.fixedArticleLink.value.trim() || DEFAULT_FIXED_ARTICLE_LINK,
    });
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

  return themes.length ? themes : DEFAULT_THEMES;
}

function generateTwentyTreeSets({ themesText, mode, paidArticleLink, fixedArticleLink }) {
  const themes = parseThemeLines(themesText);
  return POST_SLOTS.map((slot, index) => {
    const number = index + 1;
    const theme = themes[index % themes.length];
    const tree = buildTreePosts({
      number,
      theme,
      slot,
      mode,
      paidArticleLink,
      fixedArticleLink,
      seed: Date.now() + index * 97,
    });
    return {
      number,
      time: slot.time,
      patternType: slot.type,
      theme,
      modeLabel: getModeLabel(mode),
      post1: sanitizeText(tree.post1),
      post2: sanitizeText(tree.post2),
    };
  });
}

function buildTreePosts({ number, theme, slot, mode, paidArticleLink, fixedArticleLink, seed }) {
  const hook =
    slot.time === "6:27"
      ? "おはるナース☀️"
      : pickRandom(HOOK_CANDIDATES, seed + 1);

  const target = pickRandom(TARGET_PHRASES, seed + 2);
  const cliff = pickRandom(CLIFF_ENDINGS, seed + 3);
  const appeal = pickRandom(getAppealPhrasesByMode(mode), seed + 4);
  const post2CloseLine = pickRandom(getCloseLinesByMode(mode), seed + 5);
  const post2Link = getLinkForMode({ mode, paidArticleLink, fixedArticleLink });

  const post1Lines = [
    `${hook}`,
    `${target}へ。`,
    `${theme}で止まるの、わたしも何回もあった。`,
    getTypeLead(slot.type, theme),
    cliff,
  ];

  const post2Lines = [
    `答えは、${getTypeAnswer(slot.type, theme, mode)}。`,
    getTypeReason(slot.type, mode),
    getTypeAction(slot.type, theme, mode),
    `${getTypeClose(slot.type, mode)}`,
    `${appeal}`,
    post2CloseLine,
  ];

  if (post2Link) post2Lines.push(post2Link);

  return {
    post1: post1Lines.join("\n\n"),
    post2: post2Lines.join("\n\n"),
  };
}

function getModeLabel(mode) {
  if (mode === "direct") return "有料記事への案内";
  if (mode === "indirect") return "固定記事への案内";
  return "通常投稿";
}

function getTypeLead(type, theme) {
  const map = {
    "朝の感情・共感型": "朝は焦るよね。今日も頑張りたいのに、頭がまとまらない。",
    注意喚起型: `${theme}、そのまま続けると消耗しやすい。`,
    "誰こいつ型": "わたしは看護師しながら副業で失敗を重ねて、やっと0→1を越えた。",
    勘違い指摘型: "がんばってる人ほど、やさしい勘違いで遠回りしやすい。",
    問いかけ型: "いま、どこで一番つまずいてる？",
    共感型: "昼休みにこれ読んでる人、多分ちょっと疲れてるよね。",
    "小さな行動提案型": "今日は大きく変えなくていい。1つだけでいい。",
    失敗談型: "昔のわたしは、時間だけ使って結果が出なかった。",
    気づき共有型: "夕方って、急に頭がクリアになる瞬間がある。",
    価値観共有型: "わたしは、完璧さより続けられる設計を大事にしてる。",
    "黄金の型": "続く人と止まる人の差って、才能より順番だった。",
    "実績×気づき型": "note開始5日で初収益、19,800円記事、200記事以上で見えたことがある。",
    "固定記事への自然導線型": "迷う人ほど、読む順番を先に置いておくとラクになる。",
    "直誘導寄り": "必要な人には、深掘りした導線を最初から渡したほうが早い。",
    "間接誘導型": "詳しい流れは別でまとめておくと、読者の負担が減る。",
    "何者か開示型": "はじめましての人へ。わたしは看護師しながらnote副業を続けてる。",
    "共感＋背中押し型": "今日しんどかった人ほど、ここから軽く立て直せる。",
    本音型: "正直、わたしも不安がゼロの日なんてほぼない。",
    "締め投稿型": "今日できたことが小さくても、それは前進。",
  };
  return map[type] || `${theme}でつまずく人は多い。`;
}

function getAppealPhrasesByMode(mode) {
  if (mode === "direct") {
    return [
      "100円・300円のループから抜けたい人へ。",
      "低単価の記事を量産して疲れた人へ。",
      "高単価にしたいのに怖くて止まってる人へ。",
      "無料記事に全部書いてしまう人へ。",
      "セールス感を出さずに売れる導線を作りたい人へ。",
      "文章力がないから売れないと思っていた人へ。",
      "自分の経験に価値がないと思っていた人へ。",
      "noteで月数万円を目指したい人へ。",
    ];
  }

  if (mode === "indirect") {
    return [
      "努力してるのに売れないと悩んでる人へ。",
      "毎日投稿してるのに反応がなくて苦しい人へ。",
      "無料記事を有益にしてるのに売れない人へ。",
      "売れない原因がわからず遠回りしてる人へ。",
      "頑張る方向を見直したい人へ。",
      "理想と現実のギャップが作れず悩んでる人へ。",
    ];
  }

  return APPEAL_PHRASES;
}

function getCloseLinesByMode(mode) {
  if (mode === "direct") {
    return [
      "低単価の記事から抜け出したい人だけ、ここにまとめてあります👇",
      "セールスなしで高単価記事を売るための文章の並べ方を、ここにまとめました👇",
      "わたしが遠回りして見つけた「売れる文章の並べ方」はここに置いてあります👇",
      "本気で今の状況を変えたい人だけ読んでください👇",
    ];
  }

  if (mode === "indirect") {
    return [
      "わたしが遠回りして気づいた「あるルール」は、固定にまとめています👇",
      "同じように迷ってる人は、まず固定から読んでみてください👇",
      "売れない原因を整理した記事を、固定に置いてあります👇",
      "noteで遠回りしたくない人に向けて、固定にまとめました👇",
    ];
  }

  return ["必要な人にだけ届けばうれしいです。"];
}

function getLinkForMode({ mode, paidArticleLink, fixedArticleLink }) {
  if (mode === "direct") return paidArticleLink;
  if (mode === "indirect") return fixedArticleLink;
  return "";
}

function getTypeAnswer(type, theme, mode) {
  if (mode === "direct") {
    return "売れない原因は文章力や実績不足じゃなく、売れる順番で文章を並べていないこと";
  }
  if (mode === "indirect") {
    return "売れない原因は努力不足じゃなく、努力の方向がズレていたこと";
  }
  if (type === "黄金の型") return `売れる人は「悩み→理由→次の一歩」の順で書いて、売れない人は情報を先に並べること`;
  if (type === "固定記事への自然導線型") return `${theme}の前に、プロフィール固定記事で読む順番を示すこと`;
  if (type === "実績×気づき型") return `実績を先に誇るより、失敗と気づきを先に開示すること`;
  if (type === "直誘導寄り") return `${theme}の解決策を2投稿目で出して、必要な人にだけ次の導線を渡すこと`;
  if (type === "間接誘導型") return `本文で全部を詰め込まず、詳しくまとめた場所を自然に示すこと`;
  return `${theme}で悩む相手を1人に絞って、1投稿目で感情、2投稿目で解決を出すこと`;
}

function getTypeReason(type, mode) {
  if (mode === "direct") {
    return "無料記事にノウハウを全部詰め込むと、読者は満足してしまって次に進まない。理想と現実のギャップを順番で見せると必要な人だけが動く。";
  }
  if (mode === "indirect") {
    return "毎日投稿しても売れない時は、努力の量より方向の見直しが必要。無料記事で少し物足りなさを残すと、読者が次の行動を選びやすくなる。";
  }
  if (type === "朝の感情・共感型") return "朝は判断力が散りやすい。だから短く、やさしく、ひとつに絞るほうが届く。";
  if (type === "問いかけ型") return "問いがあると、読む人の頭が動く。そこで初めて次の一文が入る。";
  return "読者は情報量より、今の自分に必要かどうかで読むか決めてる。";
}

function getTypeAction(type, theme, mode) {
  if (mode === "direct") {
    return "わたしは低単価を量産して消耗したあと、無料記事→固定→有料記事の順に導線を整えたら、押し売りせずに必要な人だけが進んでくれるようになった。";
  }
  if (mode === "indirect") {
    return "わたしも遠回りして、無料記事で読者を満足させすぎていたと気づいた。まず原因を整理してから順番を変えたら、反応が少しずつ変わった。";
  }
  if (type === "小さな行動提案型") return `今日やることは1つだけ。${theme}について「誰の悩みか」を1行で先に書く。`;
  if (type === "締め投稿型") return "明日の下書きは、冒頭1行だけ先にメモして寝る。それだけで継続しやすい。";
  return `次の投稿では、${theme}の答えを1つだけに絞って書く。`;
}

function getTypeClose(type, mode) {
  if (mode === "direct") return "セールス感を出さなくても、必要な人には届く導線は作れる。";
  if (mode === "indirect") return "いきなり売り込むより、まず原因に気づくと遠回りが減る。";
  if (type === "朝の感情・共感型") return "今日もペースは人それぞれでいい。";
  if (type === "締め投稿型") return "今日もおつかれさま。焦らず積み上げよう。";
  return "押し売りしなくても、必要な人にはちゃんと届く。";
}

function pickRandom(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function sanitizeText(text) {
  let next = text.replace(/\b私\b/g, "わたし").replace(/\n{3,}/g, "\n\n").trim();
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
    typeNode.textContent = `型：${treeSet.patternType} / モード：${treeSet.modeLabel}`;
    post1Node.value = treeSet.post1;
    post2Node.value = treeSet.post2;

    copyPost1Btn.addEventListener("click", async () => {
      await handleCopyAction({
        button: copyPost1Btn,
        text: treeSet.post1,
        successMessage: `No.${treeSet.number} の投稿1をコピーしました。`,
        failMessage: "コピーできませんでした。手動で選択してください。",
        feedbackNode,
      });
    });

    copyPost2Btn.addEventListener("click", async () => {
      await handleCopyAction({
        button: copyPost2Btn,
        text: treeSet.post2,
        successMessage: `No.${treeSet.number} の投稿2をコピーしました。`,
        failMessage: "コピーできませんでした。手動で選択してください。",
        feedbackNode,
      });
    });

    copyTreeBtn.addEventListener("click", async () => {
      await handleCopyAction({
        button: copyTreeBtn,
        text: formatTreeSetText(treeSet),
        successMessage: `No.${treeSet.number} のツリーをコピーしました。`,
        failMessage: "コピーできませんでした。手動で選択してください。",
        feedbackNode,
      });
    });

    dom.results.append(node);
  });
}

function formatTreeSetText(treeSet) {
  return `【${treeSet.time}】\nNo.${treeSet.number}\nテーマ：${treeSet.theme}\n型：${treeSet.patternType}\nモード：${treeSet.modeLabel}\n\n投稿1（1/2）\n${treeSet.post1}\n\n投稿2（2/2）\n${treeSet.post2}`;
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
