var split = new SplitText("#quote", {type:"chars", charsClass:"char char++", position: "absolute"});
var childs = document.getElementsByClassName("char");

for (var i = 0; i < childs.length; i++) {
  childs[i].style.display = "inline";
  childs[i].style.width = "100%";
  childs[i].style.top = 0;
  childs[i].style.left = 0;
}

var t1 = new TimelineLite;
var t2 = new TimelineLite;
var chars = split.chars;
var inner = document.getElementById("container");

TweenLite.set("#quote", {perspective:400});

t1.staggerFrom(chars, 1.5, {opacity:0, scale:0,  ease:Back.easeOut}, .02, "+=0");
t2.to(container, 40, {rotation:"-360"});

$("#restart").click(function () {
  t1.restart();
  t2.restart();
});