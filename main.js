'use strtic';
{
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');


    let startTime;
    // 外でも使うので外で定義する　再代入するのでletを使う
    let timeoutId;
    let elapsedTime  = 0;

    // countUp()の定義をかいてく
    function countUp(){
        // console.log(Date.now()-startTime);
        // 現在の時刻からstartを押したときの時間

        const d =  new Date(Date.now()-startTime + elapsedTime);
        const n = String(d.getMinutes()).padStart(2,'0');
// 桁をそろえるためにpadStartをつかう、padStartは文字列に対してしかつかえないのでStringで囲む
        const s = String(d.getSeconds()).padStart(2,'0');
        const ns = String(d.getMilliseconds()).padStart(3,'0');
        timer.textContent = `${n}:${s}:${ns}`;

        timeoutId = setTimeout(() => {
            countUp();
        },10);
        // 10ミリ秒後に countUp();を呼び出す
    }

function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');

}

function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
    // console.log('START: ' + start.disabled);

    // console.log('STOP: ' + stop.disabled);
}

function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
}




setButtonStateInitial();


// startをクリックしたときに以下の処理をする
    start.addEventListener('click', () => {
        if(start.classList.contains('inactive') === true){
            return
        }


        setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });

    stop.addEventListener('click', () => {

        if(stop.classList.contains('inactive') === true){
            return
        }
        setButtonStateStopped();
        clearTimeout(timeoutId);
        elapsedTime +=Date.now() -startTime;
        // タイマーがストップしたときの時間
        // を保持
        
    });

    reset.addEventListener('click', () => {

        if(reset.classList.contains('inactive') === true){
            return
        }
        setButtonStateInitial();
        timer.textContent =`00:00.000`;
        elapsedTime = 0;
        
    });

    
}