
/*
<デブリ>
現在時間の取得
クリックした時の時間を取得
時差を生み出す
現在時刻をミリ秒に変換
クリックした時の時間を取得→ミリ秒に変換
時間の保存(現在orクリック)？スタートした時間ぽい(X - 進んでる時間をしたい)
基準点＝現在時刻 
条件式＝現在時刻からXX経ちました
＜フローチャート＞
関数:カウントアップを定義
・setIntervalの定義
・100ms=0.1 = ms
イベント:クリックしたら関数カウントアップ開始
・count_Upを呼び出す
時間の概念：= カウントアップで何をしたいのか
・スタートをクリックした時の時間を保持
・現在のミリ秒を取得
・現在の時間とクリックした時間を比較

タイマーに反映する:

*/

////部品
const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

//経過時間のミリ秒
let elapsed = 0;
//setInterval鍵
let setIntervalID = null;

//時間変換&ディスプレイ表示関数
function display_function () {
  const ms = elapsed % 100;
  const s = Math.floor(elapsed /1000) % 60;
  const m = Math.floor(elapsed / (1000 * 60)) % 60;
//数値→文字列化
  const msStr = ms.toString().padStart(2,'0')
  const sStr = s.toString().padStart(2,'0')
  const mStr = m.toString().padStart(2,'0')
  timer.textContent = `${mStr}:${sStr}.${msStr}`
}
//ボタン状態の初期表示
initial_bottun();

//count_Up関数
function count_Up () {
  // if (setIntervalID !== null) {return;}//？onにするとreset時にstartが機能しなくなる
  let pre = new Date()
  setIntervalID = setInterval(function(){
    const now = new Date()
    elapsed += now - pre;  //elapsedに「now - preの値を足し上げて代入、時差代入」
    pre = now;  //上の階層のpreにnowを再代入
    display_function();
  },10)
}

//クリックイベント関数
start.addEventListener ('click', () => {
  start_button();
  count_Up();
})

stop.addEventListener('click', () => {
  stop_button();
  clearInterval(setIntervalID);
  setIntervalID = null;
})

reset.addEventListener('click',() => {
  initial_bottun ();
  clearInterval(setIntervalID);//onにするとstartに鍵がかかる
  elapsed = 0;
  display_function()//stopした時のリセット表記
})

//ボタン状態関数
function initial_bottun () {
  start.disabled = false;
  start.classList.remove('transparency')
  stop.disabled = true;
  stop.classList.add('transparency');
  reset.disabled = true;
  reset.classList.add('transparency');
}

function start_button () {
  start.disabled = true;
  start.classList.add('transparency');
  stop.disabled = false;
  stop.classList.remove('transparency')
  reset.disabled = false;
  reset.classList.remove('transparency')
}

function stop_button () {
  start.disabled = false;
  start.classList.remove('transparency')
  stop.disabled = true;
  stop.classList.add('transparency');
  reset.disabled = false;
}

/*
補足
newdate()は日時の文字情報だが「new Date() - new Date() = 0」のように計算式になる
*/
