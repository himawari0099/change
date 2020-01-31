var target = document.getElementById("select");
var dfTxt = document.getElementById("defaultText");
var children = target.children;
var cttBtn = document.getElementsByClassName("content__btn");

// console.log(children[evt]);

target.onclick = function(evt){
    // console.log(evt.target.textContent);
    dfTxt.value = evt.target.textContent;
}


/* ================= 方言変換処理 ================= */

$(function(){

    var dfTxt = $("#defaultText");
    var contentType; //どの方言か
    var dfTxtVal; //元の文章
    var textOut; //変更後の文章

    //============= 福岡弁 言い換え ==============
    var fukuoka = [

        { default: 'ございます', changed: 'ござす'},
        { default: 'ですか', changed: 'やか'}, 
        { default: 'いくら', changed: 'なぼ'}, 
        { default: 'さようなら', changed: 'さいなら'}, 
        { default: 'してた', changed: 'しとったと'}, 
        { default: 'そうみたい', changed: 'そーのごたぁ'}, 
        { default: 'だね', changed: 'やね'}, 
        { default: 'してた', changed: 'しとったと'}, 
        { default: 'ちょっと', changed: 'ちょー'}, 
        { default: '待って', changed: '待て'}, 
        { default: 'やって', changed: 'やっち'}, 
        { default: 'どうして', changed: 'なして'}, 
        { default: 'どういう', changed: 'どげんゆ'}, 
        { default: 'すみません', changed: 'すんまっせん'}, 
        { default: 'なさい', changed: 'ばい'}, 

    ];

    //============= 甲州弁 言い換え ==============
    var koshu = [

        { default: 'ございます', changed: 'ごいす'},
        { default: 'いくらですか', changed: 'なんぼでぇ'}, 
        { default: 'さようなら', changed: 'わりいね'},
        { default: 'ありがとう', changed: 'わりいね'}, 
        { default: 'すいません', changed: 'わりィね'}, 
        { default: 'ごめんなさい', changed: '悪かったじゃん'}, 
        { default: 'いま何時ですか', changed: '今いく時でェ'}, 
        { default: '元気にしてた', changed: '元気けェ'}, 
        { default: 'そうみたいだね', changed: 'ほうだっちゅうじゃん'}, 
        { default: 'ちょっと待って', changed: 'ちょっくら待ちょー'}, 
        { default: '真面目にやって', changed: 'ちょうきにしろ'}, 
        { default: 'どうして', changed: 'どォいで'}, 
        { default: 'どういう意味', changed: 'どォいうこ'},
    ];


    //content__btnを押したとき
    $(".content__btn input").on("click", function(){

        contentType = $(this).val(); //どの方言か を取得

        dfTxtVal = dfTxt.val(); //元の文章

        //福岡弁 選択時
        if(contentType == "福岡弁"){

            fukuoka.forEach( function(value){
                
                if( dfTxtVal.indexOf(value.default) != -1 ){

                    dfTxtVal = dfTxtVal.replace(value.default, value.changed);

                }

            });

        //甲州弁 選択時
        }else if(contentType == "甲州弁"){

            koshu.forEach( function(value){
                
                if( dfTxtVal.indexOf(value.default) != -1 ){

                    dfTxtVal = dfTxtVal.replace(value.default, value.changed);

                }

            });

        }else{
            textOut = "選択されていません";
        }

        textOut = dfTxtVal;

        //#textOutに出力
        $("#textOut").text(textOut);
        

    });

});

/* ================= /方言変換処理 ================= */
    





/* ================= 読み上げ機能 ================= */
function speech() {

    // unsupported.
    if (!'SpeechSynthesisUtterance' in window) {
        alert('Web Speech API には未対応です.');
        return;
    }

    var syaberi = new SpeechSynthesisUtterance();
    syaberi.volume = 1;
    syaberi.rate = 1.2;
    syaberi.pitch = 1.7;
    syaberi.text = document.querySelector('#textOut').value;
    syaberi.lang = document.querySelector('ja-JP');
    syaberi.onend = function (event) {
        console.log('speech end. time=' + event.elapsedTime + 's');
    }
    speechSynthesis.speak(syaberi);
};