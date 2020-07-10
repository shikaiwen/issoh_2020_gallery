


    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // // 创建新的音频上下文接口
    // var audioCtx = new AudioContext();
    // $("#b1").click(function(){

    //     // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
    //     var oscillator = audioCtx.createOscillator();
    //     // 创建一个GainNode,它可以控制音频的总音量
    //     var gainNode = audioCtx.createGain();
    //     // 把音量，音调和终节点进行关联
    //     oscillator.connect(gainNode);

    //     // audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
    //     gainNode.connect(audioCtx.destination);

    //     // 指定音调的类型，其他还有square|triangle|sawtooth
    //     oscillator.type = 'sine';
    //     // 设置当前播放声音的频率，也就是最终播放声音的调调
    //     oscillator.frequency.value = 196.00;
    //     // 当前时间设置音量为0
    //     gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    //     // 0.01秒后音量为1
    //     gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
    //     // 音调从当前时间开始播放
    //     oscillator.start(audioCtx.currentTime);
    //     // 1秒内声音慢慢降低，是个不错的停止声音的方法
    //     gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
    //     // 1秒后完全停止声音
    //     oscillator.stop(audioCtx.currentTime + 1);
    // })


var audioMap ={
    // award:{file:"5d0c79ff76f0a82047.mp3",buffer:""},
    award:{file:"award-short.mp3",buffer:""},
    select:{file:"10864.mp3",buffer:""},


    // extra
    a:{file:"开场音乐.mp3",buffer:""},
    b:{file:"抽奖音乐.mp3",buffer:""},
    c:{file:"获奖音乐.mp3",buffer:""},
    d:{file:"社长抽奖出场音乐.mp3",buffer:""},
    e:{file:"社长退场讲话音乐.mp3",buffer:""},
    f:{file:"主持人.mp3",buffer:""},
    g:{file:"主持人-notitle.mp3",buffer:""},


    k:{file:"周星驰笑声.mp3",buffer:""},
    l:{file:"小黄人笑声.mp3",buffer:""},
    m:{file:"曾小贤笑声.mp3",buffer:""},
    n:{file:"支付宝到账.mp3",buffer:""},


}

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var context = new AudioContext();

var AudioHolder = {}


function doRandomAudio(){
    var doReal = ()=>{
      var num = randEx(0,3)
      var startKey = "k";
      var adKey = String.fromCharCode(startKey.charCodeAt(0) + num);
    //   if(window.audioMap[adKey] && !window.audioMap[adKey].played){
      if(window.audioMap[adKey] ){
        playByKey(adKey)
        // window.audioMap[adKey].played = true;
      }
    }

    setTimeout(function(){
      doReal()
    },1000)

}


$(function(){
    loadAll()
})

// $("#b1").click(function(){
//     playSound(window.dogBarkingBuffer)
// })

// loadDogSound("select.mp3");
// loadDogSound("10864.mp3");

function playByKey(key){
    
    playSoundByName(audioMap[key])
}

function playSound() {
    return playSoundByName(audioMap.select)
}

AudioHolder.playSelectAudio = function(){
    return playSoundByName(audioMap.select)
}

AudioHolder.playAwardAudio = function(){
    return playSoundByName(audioMap.award)
}


function loadDogSound(url){
    var request = new XMLHttpRequest();
    var url = "audios/" + url
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {

        context.decodeAudioData(request.response, function(buffer) {

            window.buffer = buffer
        }, function(error){
            console.log(error)
        });

    }
    request.send();
}



function playSoundByName(item) {
    //   source.stop();

    // stop it if has source obj
      if(item.source){
        item.source.stop()
        return;
      }
      
      var source = context.createBufferSource(); // creates a sound source
      source.buffer = item.buffer;                    // tell the source which sound to play
      source.connect(context.destination);       // connect the source to the context's destination (the speakers)
      source.start(0);                           // play the source now

      var keys = Object.keys(window.audioMap)

      var values = keys.filter(k=>{
          var eq = item == window.audioMap[k];
          return eq;
      }
    )

    // if(values.length == 1){
    //     if(["a","b","c","d","e"].includes(values[0])){
    //         values[0].source.loop = true;
    //     }
    // }

      item.source = source;
      source.onended = function(){
          item.source = null
      }
      return source;
}





function loadAll() {
    for(var key in audioMap){

        var item = audioMap[key];

        (function(i){

            var request = new XMLHttpRequest();
            var url = "audios/" + item.file
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
        
            // Decode asynchronously
            request.onload = function() {
        
                context.decodeAudioData(request.response, function(buffer) {
                    i.buffer = buffer;
                }, function(error){
                    console.log(error)
                });
        
            }

            request.send();

        })(item)
    }



// for(var key in audioMap){
//     $.ajax({
//         url: "audios/award.wav",
//         dataType:"arraybuffer",
//         beforeSend: function( xhr ) {
//             xhr.responseType = 'arraybuffer';
//         },
//         complete :function(response){
//             context.decodeAudioData(response.responseText, function(buffer) {
//                 window.dogBarkingBuffer = buffer;
//                 var source = context.createBufferSource(); // creates a sound source
//                 source.buffer = window.dogBarkingBuffer;                    // tell the source which sound to play
//                 source.connect(context.destination);       // connect the source to the context's destination (the speakers)
              
//                 audioMap[key][0] = source
//             }, function(error){
//                   console.log(error)
//               });
//         }
//     })
// }

 


//   var request = new XMLHttpRequest();
//   request.open('GET', url, true);
//   request.responseType = 'arraybuffer';

//   // Decode asynchronously
//   request.onload = function() {

//     context.decodeAudioData(request.response, function(buffer) {
//       window.dogBarkingBuffer = buffer;

//       var source = context.createBufferSource(); // creates a sound source
//       source.buffer = window.dogBarkingBuffer;                    // tell the source which sound to play
      
//       source.connect(context.destination);       // connect the source to the context's destination (the speakers)

//     }, function(error){
//         console.log(error)
//     });

//   }
//   request.send();
}

