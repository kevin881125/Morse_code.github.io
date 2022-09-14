var morseCode = "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----"

var morselist = morseCode.split("|")
for(var i=0 ; i<morselist.length;i++ ){
  morselist[i]=morselist[i].split(";")
  $("ul.translist").append("<li>"+morselist[i][0]+"  "+morselist[i][1]+"</li>")
}

function findcode(letter){
  for(var i=0;i<morselist.length;i++){
    if(morselist[i][0]==letter){
      return morselist[i][1]
    }
  }
  return letter
}
function findLetter(code){
  for(var i=0;i<morselist.length;i++){
    if(morselist[i][1]==code){
      return morselist[i][0]
    }
  }
  return code
}
function translateToMorse(text){
  text = text.toUpperCase()
  var result =""
  for(var i=0;i<text.length;i++){
    result+= findcode(text[i])+" "
  }
  return result
}
function translateToEng(text){
  text = text.split(" ")
  var result =""
  for(var i=0;i<text.length;i++){
    result+= findLetter(text[i])
  }
  return result
}

$("#btnMorse").click(function(){
  var input = $("#input").val()
  var result = translateToMorse(input)
  $("#output").val(result)
  $("#output").css({
    backgroundColor: "#292B73"
  }).animate({
    backgroundColor: "transparent"
  },500)
  $(".sysbol").velocity({
    rotateZ:["0deg","-360deg"]
  })
})
$("#btnEng").click(function(){
  var input = $("#output").val()
  var result = translateToEng(input)
  $("#input").val(result)
  $("#input").css({
    backgroundColor: "#292B73"
  }).animate({
    backgroundColor: "transparent"
  },500)
  $(".sysbol").velocity({
    rotateZ:["0deg","-360deg"]
  })
})

$("#input").keyup(function(){
  var text = $("#input").val()
  var newtext = text.toUpperCase().split(" ").join("")
  $("#input").val(newtext)
})
function play(texts,nowindex){
  var word=texts[nowindex]
  var lasttime=300
  if(word=="."){
    $("audio.short")[0].play()
    lasttime=300
  }else if(word=="-"){
    $("audio.long")[0].play()
    lasttime=500
  }else{
    lasttime=1000
   }
  $(".playlist span").removeClass("playing")
   $(".playlist span").eq(nowindex).addClass("playing")
  if(texts.length>nowindex){
    setTimeout(function(){
      play(texts,nowindex+1)
    },lasttime)
  }else{
    $(".playlist").html("")
  }
}
$("audio.short")[0].volune=0.3
$("audio.long")[0].volune=0.3
$("#btnPlay").click(function(){
  var textx= $("#output").val()
  play(textx,0)
  $(".playlist").html("")
  for(var i=0 ;i<textx.length;i++){
    $(".playlist").append("<span>"+textx[i]+"</span>")
  }
})