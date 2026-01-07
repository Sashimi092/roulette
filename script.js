// ★★★ ここで確率を設定します ★★★
// weight（重み）の数字が大きいほど当たりやすくなります。
// 0 にすると絶対に当たりません。
const items = [
    // --- ① 確率「大」グループ (weight: 2) ---
    { name: "大和", weight: 2 },
    { name: "島田", weight: 2 },
    { name: "加藤田", weight: 2 },
    { name: "横山", weight: 2 },
    { name: "藤谷", weight: 2 },
    { name: "田村", weight: 2 },
    { name: "秋田", weight: 2 },
    { name: "石川", weight: 2 },
    { name: "藤本", weight: 2 },
    { name: "中村", weight: 2 },
    { name: "酒井", weight: 2 },
    { name: "初鹿", weight: 2 },


    // --- ② 確率「小」グループ (weight: 1) ---
    { name: "田口", weight: 1 },
    { name: "関", weight: 1 },

    // --- ③ 確率「0」グループ (weight: 0) ---
    // ルーレットの盤面には表示されますが、絶対に止まりません
    { name: "須田", weight: 0 },
    { name: "市川", weight: 0 },
    { name: "原沢", weight: 0 },
    { name: "横川", weight: 0 },
];
// ★★★★★★★★★★★★★★★★★★★★★

const resultDiv = document.getElementById('result');
const startBtn = document.getElementById('startBtn');
const board = document.getElementById('board');

let shuffleTimer;

startBtn.addEventListener('click', () => {
    // 1. ボタン無効化
    startBtn.disabled = true;
    resultDiv.style.opacity = '0.7';

    // パラパラ演出（ここは全データからランダム表示）
    if (shuffleTimer) clearInterval(shuffleTimer);
    shuffleTimer = setInterval(() => {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        resultDiv.textContent = randomItem.name; 
    }, 50);

    // 2. ★確率計算ロジック★
    // 全体の重みの合計を計算
    let totalWeight = 0;
    for (let i = 0; i < items.length; i++) {
        totalWeight += items[i].weight;
    }

    // 0 〜 totalWeight の間でランダムな数値を決める
    let randomValue = Math.random() * totalWeight;
    let winnerIndex = -1;

    // 重みを引き算していき、当たりのインデックスを特定する
    for (let i = 0; i < items.length; i++) {
        if (randomValue < items[i].weight) {
            winnerIndex = i;
            break;
        }
        randomValue -= items[i].weight;
    }
    
    // 万が一のエラー回避（全て0の場合など）
    if (winnerIndex === -1) winnerIndex = 0;

    const winnerName = items[winnerIndex].name;


    // --- 角度の計算 ---
    const anglePerItem = 360 / items.length;
    // 重み抽選で決まった winnerIndex の場所へ回す
    const targetBaseAngle = 360 - (winnerIndex * anglePerItem) + (anglePerItem / 2);
    const extraSpins = 360 * 5; 
    const targetRotation = extraSpins + targetBaseAngle;
    const spinDuration = 3500; 

    // 3. アニメーション適用
    board.style.transition = 'none';
    board.style.transform = 'rotate(0deg)';
    
    setTimeout(() => {
        board.style.transition = `transform ${spinDuration}ms ease-out`;
        board.style.transform = `rotate(${targetRotation}deg)`;
    }, 20);

    // 4. 結果表示
    setTimeout(() => {
        clearInterval(shuffleTimer);
        resultDiv.textContent = `[ ${winnerName} ]`;
        resultDiv.style.opacity = '1';
        startBtn.disabled = false;
    }, spinDuration); 
});