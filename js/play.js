let audio = document.querySelector("audio"),//获取音频对象
    play = document.getElementById("play"),//获取播放按钮
    next = document.querySelector(".next"),//获取下一曲按钮
    prev = document.querySelector(".prev"),//获取上一曲按钮
    stop = document.querySelector(".stop"),//获取停止按钮
    presentTime = document.getElementById("presentTime"),//获取当前播放时间的标签
    totalTime = document.getElementById("totalTime"),//获取总播放时间的标签
    curProgrees = document.getElementById("curProgrees"),//获取进度条
    progrees = document.querySelector("#progrees"),//获取进度条总宽度
    li = document.querySelectorAll("#playerList ul li"),//获取歌曲列表
    img = document.querySelector(".playerImg img"),//获取图片
    imgarr = ["起风了-买辣椒也用券.jpg", "数码宝贝冒险歌和音乐集.jpg", "不仅仅是喜欢-孙语赛.萧全.jpg", "-867508051.jpg", "易峰情书-李易峰.jpg"],//图片
    arrMusic = ["video/买辣椒也用券 - 起风了 [mqms2].mp3", "video/和田光司 (わだ こうじ) - Butter-Fly (蝴蝶) (tri.Version) [mq.mp3", "video/孙语赛萧全 - 不仅仅是喜欢 [mqms2].mp3", "video/尤长靖 - 昨日青空.mp3", "video/李易峰 - 记得我爱你 [mqms2](1).mp3"];

let pler = document.getElementById("player");

play.addEventListener("click", player);//播放暂停
next.addEventListener("click", nextMusic);//下一曲
prev.addEventListener("click", prevMusic);//上一曲
stop.addEventListener("click", stopPlay);//停止


let flag = true; //定义播放标杆
let nt = Math.floor(Math.random() * arrMusic.length);//随机产生第一次播放的歌曲
for (let i = 0; i < li.length; i++) { //点那首放那首
    li[i].onclick = function () {
        audio.src = arrMusic[i];
        console.log(i);
        flag = true;
        nt = i;
        player();
    }
}
audio.src = arrMusic[nt];//第一次随机切换歌曲地址或点击那首切换那首


function player() { //创建播放函数
    if (flag) {
        audio.play();
        play.title = "暂停";
        play.className = "play2";
        img.style.animationDuration = "20s";
        img.style.animationPlayState = "running";
        theProgress();
        playTime();
        list();
    } else {
        play.title = "播放";
        play.className = "play1";
        audio.pause();
        img.style.animationPlayState = "paused";
    }
    flag = !flag;
}

function nextMusic() { //创建切换下一曲
    nt++;
    if (nt === arrMusic.length) {
        nt = 0;
    }
    audio.src = arrMusic[nt];
    console.log(nt);
    flag = true;
    player();
    list();
}

function prevMusic() { //创建切换上一曲
    nt--;
    if (nt < 0) {
        nt = arrMusic.length - 1;
    }
    audio.src = arrMusic[nt];
    flag = true;
    player();
    list();
}

function stopPlay() { //设置暂停播放
    audio.currentTime = 0;
    flag = false;
    player();
}

function list() { //创建歌曲列表选中切换
    for (let i = 0; i < li.length; i++) {
        li[i].className = '';
    }
    li[nt].className = 'active';
    img.src = "images/" + imgarr[nt];//第一次随机切换歌曲图片或点击那首切换对应图片
    pler.style.backgroundImage = "url(images/" + imgarr[nt] + ")";//第一次随机切换歌曲图片或点击那首切换对应图
}

list();


function theProgress() {//进度条
    let timer = null;
    if (flag) {
        //开启计时器
        timer = setInterval(function () {
            if (audio.currentTime >= audio.duration) {
                clearInterval(timer);
                nextMusic();
            } else {
                curProgrees.style.width = 550 * (audio.currentTime / audio.duration) + "px";
            }
        }, 30)
    } else {
        //关闭计时器
        clearInterval(timer);
    }

}

//时间
let m = n = 0;


progrees.onclick  = function (event) {//进度条拖动播放
        let e = event || window.event;
        curProgrees.style.width = e.clientX - 599 + "px";
        audio.currentTime = ((e.clientX - 599) / 550) * audio.duration;
        flag = true;
        player();
        console.log(audio.currentTime);
};

function playTime() { //显示时间
    //当前时间
    let timer1 = null;
    if (flag) {
        timer1 = setInterval(function () {
            //总时间
            if (Math.floor(audio.duration % 60) < 10) {
                m = "0" + Math.floor(audio.duration % 60);
            } else {
                m = Math.floor(audio.duration % 60);
            }
            if (Math.floor(audio.currentTime % 60) < 10) {
                n = "0" + Math.floor(audio.currentTime % 60);
            } else {
                n = Math.floor(audio.currentTime % 60);
            }
            totalTime.innerHTML = "0" + Math.floor(audio.duration / 60) + "：" + m;
            presentTime.innerHTML = "0" + Math.floor(audio.currentTime / 60) + "：" + n;
        }, 1000)
    } else {
        clearInterval(timer1);
    }
}




