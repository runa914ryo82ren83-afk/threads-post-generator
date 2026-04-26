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

const CATEGORY_ALIAS = {
  "note初心者の悩み": "note初心者の悩み",
  "有料記事が売れない理由": "売れない理由",
  "低単価から抜け出す考え方": "低単価から抜け出す",
  "無料記事の書き方": "無料記事に詰め込みすぎ",
  "固定記事・導線": "固定記事・導線",
  "るナースの失敗談": "るナースの失敗談",
  "看護師・夜勤・本業との両立": "看護師・夜勤・本業との両立",
  "AI×note": "AI×note",
  "継続・毎日投稿": "継続・毎日投稿",
  "何者か開示・自己紹介": "何者か開示",
  "価値観・本音": "価値観・本音",
  "直接投稿向けテーマ": "直接投稿",
  "間接投稿向けテーマ": "間接投稿",
};

const TEMPLATE_LIBRARY = {
  "note初心者の悩み": [
    {
      post1: `毎日noteを書いてるのに、反応がない。\n\nビューも増えないし、スキも増えない。\n\n「このまま続けても意味あるのかな」\n\nそう思って、投稿前に下書きを閉じる日があった。\n\nでも止まっていた原因は、やる気の問題じゃなかった。`,
      post2: `見直したのは、文章力より先に流れだった。\n\n昔のわたしは、1本ずつ単発で書いていた。\n\nだから読んだ人が次に何を読めばいいか分からなかった。\n\n今日書く記事の次に読んでほしい記事を、1つだけ先に決める。\n\nそれだけでも投稿の迷いはかなり減る。\n\n不安になってる人は、まずここからで大丈夫。`,
    },
    {
      post1: `書くネタはあるのに、投稿ボタンが押せない。\n\n「もっと上手く書けるはず」って考えて、夜だけ過ぎていく。\n\n昔のわたしは、ここで何度も止まってた。\n\n完璧を目指してる間に、読者に届くチャンスを逃してた。`,
      post2: `先に決めるべきなのは、完璧な文章じゃない。\n\nこの記事で読んだ人に、どんな一歩をしてほしいか。\n\nそこを決めると、言葉は自然に整っていく。\n\n投稿は練習で育つ。\n\n止まっている人ほど、小さく出して続ければ大丈夫。`,
    },
  ],
  "売れない理由": [
    {
      post1: `有料記事を出したのに、まったく売れない。\n\nこれ、かなりメンタルにくる。\n\n「やっぱりわたしには無理かも」\n\nそう思って、価格だけ何度も下げていた。`,
      post2: `売れなかった理由は、値段だけじゃなかった。\n\n無料部分で満足されて、次に進む理由が作れていなかった。\n\n大事なのは、全部書き切ることより、続きを読みたくなる順番を作ること。\n\n流れを変えると、同じ内容でも反応は変わる。\n\n売れなくて苦しい人は、構成から見直してみて。`,
    },
    {
      post1: `丁寧に書いた有料記事ほど、売れない時期があった。\n\n内容は悪くないはずなのに、購入につながらない。\n\n当時のわたしは、文章力のせいにしていた。`,
      post2: `実際に足りなかったのは、購入前の安心感だった。\n\n誰に向けた記事か、何が変わる記事か。\n\nここが曖昧だと、人は決めきれない。\n\n先に読者のゴールを明確にすると、案内文は自然に書ける。\n\n売れない時ほど、言葉より設計を整えるのが近道。`,
    },
  ],
  "低単価から抜け出す": [
    {
      post1: `300円の記事ばかり増えて、疲れていた。\n\n安いと買ってもらいやすいと思っていたけど、ずっと消耗していた。\n\n昔のわたしは、単価を上げることが怖かった。`,
      post2: `低単価から抜ける時に必要なのは、勇気だけじゃない。\n\n価格の前に、読んだ後の変化を言語化すること。\n\n何を持ち帰れる記事なのかが明確になると、価格の説明がしやすくなる。\n\n遠回りしてる人は、まず価値の設計から始めてみて。`,
    },
    {
      post1: `高単価にしたいのに、申し訳なさが先に出る。\n\nその気持ち、すごくわかる。\n\nわたしも長く「安くしないと選ばれない」と思っていた。`,
      post2: `でも選ばれる理由は、安さだけじゃない。\n\n読者が迷わず進める導線と、結果が見える内容があると、単価は上げられる。\n\n値上げは強気になることじゃなく、価値を正しく渡すこと。\n\n怖さがある人ほど、少しずつ段階を作れば大丈夫。`,
    },
  ],
  "無料記事に詰め込みすぎ": [
    {
      post1: `無料記事で全部伝えようとして、毎回長文になっていた。\n\n有益なはずなのに、売上にはつながらない。\n\n頑張るほど空回りしていた。`,
      post2: `無料記事の役割は、完結させることだけじゃない。\n\n読んだ人が「次も読みたい」と思える余白を残すことが大事。\n\n全部を詰め込むより、次に進む理由を1つ置く。\n\nこれだけで有料記事の見え方は変わる。`,
    },
    {
      post1: `親切にしようとして、無料部分が重くなっていた。\n\n当時のわたしは、出し惜しみしないことが正解だと思っていた。`,
      post2: `今は、無料と有料の役割を分けて書いている。\n\n無料では悩みを整理して、有料では解決の手順を深く渡す。\n\nこの分け方にしてから、読者の動きがはっきりした。\n\n詰め込みすぎてる人は、役割分担から見直してみて。`,
    },
  ],
  "固定記事・導線": [
    {
      post1: `せっかく読まれても、次に進まれない。\n\n原因は投稿の質じゃなくて、入口の弱さだった。\n\n固定記事を後回しにして、かなり遠回りした。`,
      post2: `固定記事は、自己紹介だけの場所じゃない。\n\n初めて来た人に「どこから読めばいいか」を示す案内板。\n\n最初の3行とリンクの順番を整えるだけで、流れは変わる。\n\n売上より前に、迷わせない導線を作るのが大事。`,
    },
    {
      post1: `投稿数は増えているのに、結果がついてこない。\n\nそんな時、固定記事を見直したら原因が見えた。\n\n読者が回遊する道が用意できていなかった。`,
      post2: `導線はセンスより設計。\n\nどの記事から読んでも、次の一歩が分かる形にする。\n\nこの土台があると、毎日の投稿が資産として積み上がる。\n\n頑張ってるのに伸びない人ほど、固定記事を整えてみて。`,
    },
  ],
  "るナースの失敗談": [
    {
      post1: `頑張ってるのに結果が出なくて、泣いた夜がある。\n\n投稿数だけ増やして、肝心の流れは放置していた。\n\n今思うと、焦りで空回りしていた。`,
      post2: `失敗して気づいたのは、才能より順番だった。\n\n読者の悩みから書いて、次の行動までつなぐ。\n\nこの基本を外すと、どれだけ書いても届きにくい。\n\n遠回りした経験があるからこそ、今はここを最優先にしてる。`,
    },
    {
      post1: `売れない理由を、ずっと自分の能力不足だと思っていた。\n\nでも実際は、努力の向きがズレていただけだった。`,
      post2: `わたしが変えたのは、量より設計。\n\n誰に向ける投稿かを先に決めるだけで、言葉選びが変わる。\n\n失敗は無駄じゃなくて、改善ポイントを見つける材料だった。\n\n同じ場所で悩む人にこそ伝えたい。`,
    },
  ],
  "看護師・夜勤・本業との両立": [
    {
      post1: `夜勤明けは、正直なにもしたくない。\n\nそれでもnoteを続けたいと思って、5分だけ書く日にした。\n\n完璧にやるより、止めないことを選んだ。`,
      post2: `両立で大事なのは、気合いより仕組み。\n\n休憩中にメモを残して、帰宅後は整えるだけにする。\n\nこの流れにすると、本業が忙しい日でも続けやすい。\n\n時間がない人ほど、作業を分けると楽になる。`,
    },
    {
      post1: `本業がしんどい日は、副業まで手が回らない。\n\nわたしも何度もそこで止まりかけた。\n\nでも看護師の経験は、そのまま発信の価値になる。`,
      post2: `毎日長く書かなくてもいい。\n\n一つの体験を短く言語化して残すだけで、信頼は積み上がる。\n\n現場の気づきは、同じ悩みを持つ人の助けになる。\n\n無理なく続ける形を先に作っていこう。`,
    },
  ],
  "AI×note": [
    {
      post1: `AIで下書きは早くなったのに、反応が落ちた時期があった。\n\n読みやすいのに、なぜか刺さらない。\n\n原因はすぐに分からなかった。`,
      post2: `足りなかったのは、わたしの体験だった。\n\nAIの文章を土台にして、現場で感じたことを必ず入れる。\n\nこの一手間で、言葉の温度が戻る。\n\nAIは代わりに書く道具じゃなく、整理を助ける相棒として使うのがちょうどいい。`,
    },
    {
      post1: `AIに任せすぎると、きれいだけど記憶に残らない文章になる。\n\nわたしはそれで何度も投稿を直した。`,
      post2: `先に決めるのは、誰のどんな悩みを書くか。\n\n軸を決めてからAIを使うと、ブレない下書きが作れる。\n\n最後は自分の言葉で締める。\n\nこの順番にしてから、投稿が自然になった。`,
    },
  ],
  "継続・毎日投稿": [
    {
      post1: `毎日投稿してるのに、手応えがない。\n\n続ける意味が分からなくなる日ってある。\n\nわたしも何度もそうだった。`,
      post2: `それでも続けられたのは、目標を下げたから。\n\n完璧な一本より、今日の一本を出す。\n\n投稿の質は、継続の中で整っていく。\n\n止まりそうな人は、まず小さく続けるところからで大丈夫。`,
    },
    {
      post1: `休みたくなる日は、投稿のハードルが急に高くなる。\n\n「今日は無理かも」で終わる日が続いていた。`,
      post2: `わたしが決めた最低ラインは、三行だけでも出すこと。\n\nゼロにしないと、翌日戻りやすくなる。\n\n毎日投稿は根性勝負じゃない。\n\n続けられる条件を先に作ることが一番効く。`,
    },
  ],
  "何者か開示": [
    {
      post1: `わたしは特別な実績がある人じゃなかった。\n\n看護師として働きながら、手探りでnoteを続けてきた。\n\n遠回りしたからこそ、伝えられることがある。`,
      post2: `発信で大切にしているのは、背伸びしないこと。\n\nできたことも失敗も、そのまま言葉にする。\n\n同じように迷う人に、次の一歩が見える投稿を届けたい。\n\nこれからも等身大で続けていく。`,
    },
    {
      post1: `最初のわたしは、肩書きも自信もなかった。\n\nそれでも続ける中で、誰に何を届けたいかが見えてきた。`,
      post2: `何者かを語る時は、すごさより軸を伝える。\n\nわたしは、売るためだけじゃなく、悩みを言語化する投稿を大事にしている。\n\nこの軸があると、言葉がぶれにくくなる。\n\n自己紹介は更新しながら育てればいい。`,
    },
  ],
  "価値観・本音": [
    {
      post1: `うまくいかない日は、強い言葉を使いたくなる。\n\nでもそんな時ほど、わたしは丁寧な言葉を選ぶようにしてる。\n\n焦りは文章に出るから。`,
      post2: `売上を追うことは大事。\n\nでも先に信頼を失う書き方をすると、長く続かない。\n\nわたしは、読んだ人が安心して次に進める投稿を積み上げたい。\n\n遠回りに見えても、それが一番早いと感じてる。`,
    },
    {
      post1: `結果が出ない時期は、自分を責めやすい。\n\nわたしも「向いてないかも」と何度も思った。`,
      post2: `それでも続けてこれたのは、比べる相手を昨日の自分にしたから。\n\n少しでも前に進めたら、それで十分。\n\n本音で書いた言葉は、必要な人にちゃんと届く。\n\n不安な人は、今日の一歩だけ見れば大丈夫。`,
    },
  ],
  "直接投稿": [
    {
      post1: `低単価の記事から抜け出したいのに、値上げが怖い。\n\n昔のわたしは、ここでずっと止まってた。\n\n売れない理由を価格だけで考えていた。`,
      post2: `変えるべきだったのは、値段より導線だった。\n\n無料記事から有料記事へ自然につながる流れを作ると、反応は変わる。\n\nわたしが遠回りして見つけた「売れる文章の並べ方」はここにまとめました👇`,
    },
    {
      post1: `有料記事の案内を書くたびに、売り込みが怖くなる。\n\nその気持ちが強いと、必要な人にも届かなくなる。`,
      post2: `案内は押し売りじゃなく、必要な情報への道案内。\n\nわたしはこの形に変えてから、自然に届けられるようになった。\n\n高単価へ進むために整えた流れをまとめました👇`,
    },
  ],
  "間接投稿": [
    {
      post1: `毎日頑張ってるのに、売上につながらない。\n\n努力不足だと思って、自分を責めていた。\n\nでも原因は別の場所にあった。`,
      post2: `足りなかったのは、記事同士のつながりだった。\n\n読んだ人が次に進みやすい導線を作ると、反応は少しずつ変わる。\n\nわたしが遠回りして気づいた売れるnoteの「あるルール」は、固定記事にまとめています👇`,
    },
    {
      post1: `無料記事を丁寧に書いても、なぜか結果が出ない。\n\nわたしは長くこの壁にぶつかっていた。`,
      post2: `投稿単体で考えるのをやめて、全体の流れで設計したら景色が変わった。\n\n最初に読む記事と次に読む記事を決めるだけで、読者の迷いが減る。\n\n最初に見てほしい考え方を固定記事に置いています👇`,
    },
  ],
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
    const tree = buildTreePosts({
      theme,
      mode,
      seed: Date.now() + index * 113,
    });

    return {
      number,
      time: slot.time,
      patternType: slot.type,
      theme,
      ...finalizeTreeSetText({
        post1: sanitizeText(tree.post1),
        post2: sanitizeText(tree.post2),
      }),
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

function buildTreePosts({ theme, mode, seed }) {
  const category = resolveCategory(theme, mode);
  const templates = TEMPLATE_LIBRARY[category] || TEMPLATE_LIBRARY["note初心者の悩み"];
  const start = Math.abs(seed) % templates.length;

  for (let i = 0; i < templates.length; i += 1) {
    const pair = templates[(start + i) % templates.length];
    const candidate = appendModeLink({
      post1: pair.post1,
      post2: pair.post2,
      mode,
    });
    if (validatePostPair(candidate)) return candidate;
  }

  return appendModeLink({
    post1: templates[0].post1,
    post2: templates[0].post2,
    mode,
  });
}

function resolveCategory(theme, mode) {
  const themeRecord = DEFAULT_THEME_POOL.find((item) => item.text === theme);
  const mapped = themeRecord ? CATEGORY_ALIAS[themeRecord.category] : "";
  if (mapped) return mapped;
  if (mode === "direct") return "直接投稿";
  if (mode === "indirect") return "間接投稿";
  return "note初心者の悩み";
}

function appendModeLink({ post1, post2, mode }) {
  if (mode === "direct") {
    return { post1, post2: `${post2}\n\n${PAID_ARTICLE_LINK}` };
  }
  if (mode === "indirect") {
    return { post1, post2: `${post2}\n\n${FIXED_ARTICLE_LINK}` };
  }
  return { post1, post2 };
}

function validatePostPair({ post1, post2 }) {
  const forbiddenLineOnly = ["正直、", "昔のわたしは、"];
  const allText = `${post1}\n${post2}`;
  if (allText.includes("同じように迷ってる読者")) return false;
  if (allText.includes("1/2") || allText.includes("2/2")) return false;
  if (/(?:^|\n)(?:は|が|を|に|へ|で|と|も|の|や|か|ね|よ|な|だ[。]?)(?:\n|$)/m.test(allText)) return false;
  if (/[ぁ-んァ-ン一-龥ー]\n[ぁ-んァ-ン一-龥ー]/.test(allText)) return false;
  if (forbiddenLineOnly.some((line) => allText.includes(`\n${line}\n`) || allText.startsWith(`${line}\n`))) return false;
  if (/(内部|生成|構成ルール|禁止ワード)/.test(allText)) return false;

  const post1Lines = new Set(post1.split("\n").map((line) => line.trim()).filter((line) => line.length >= 8));
  const duplicated = post2
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length >= 8 && post1Lines.has(line));
  return duplicated.length === 0;
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

function finalizeTreeSetText({ post1, post2 }) {
  const forbiddenPhrases = [
    "同じように迷ってる読者",
    "テーマを見たまま",
    "ずっと外してた",
    "テーマ名",
    "4行メモ",
    "内部",
    "生成",
    "構成",
    "1投稿目",
    "2投稿目",
  ];

  let nextPost1 = post1;
  let nextPost2 = post2;

  forbiddenPhrases.forEach((phrase) => {
    nextPost1 = nextPost1.replaceAll(phrase, "この部分");
    nextPost2 = nextPost2.replaceAll(phrase, "この部分");
  });

  nextPost2 = nextPost2.replaceAll("同じように迷ってる読者は、まずここからで大丈夫。", "同じように迷ってる人は、まずここからで大丈夫。");
  nextPost2 = nextPost2.replaceAll("読者は、まずここからで大丈夫。", "人は、まずここからで大丈夫。");

  if (nextPost1.includes("頑張る場所を間違えてた。") && nextPost2.includes("頑張る場所を間違えてた。")) {
    nextPost2 = nextPost2.replace("頑張る場所を間違えてた。", "進め方の順番を見直した。");
  }
  if (nextPost1.includes("見直す場所が違った。") && nextPost2.includes("見直す場所が違った。")) {
    nextPost2 = nextPost2.replace("見直す場所が違った。", "見直すタイミングを変えた。");
  }
  if (nextPost1.includes("努力不足じゃなかった。") && nextPost2.includes("努力不足じゃなかった。")) {
    nextPost2 = nextPost2.replace("努力不足じゃなかった。", "足りなかったのは量じゃなかった。");
  }

  return { post1: nextPost1, post2: nextPost2 };
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
