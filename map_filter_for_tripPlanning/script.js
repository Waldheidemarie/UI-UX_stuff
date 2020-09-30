var h = (window.innerHeight / 2),
  searchText = $(".search-text");

TweenMax.set(".right.featured-item, .left.featured-item, .outer-left.featured-item, .outer-left2.featured-item, .right2.featured-item, .left2.featured-item", {
  scale: 0.6
});
TweenMax.set(".featured", {
  autoAlpha: 0,
  visibility: "visible"
});
TweenMax.set(".sights-markers .icon", {
  autoAlpha: 0,
  visibility: "visible"
});
TweenMax.set(".filters", {
  y: -h + 50,
  opacity: 1
});

//search part, intro
function sceneOne() {
  var tl = new TimelineMax(),
    st = new SplitText(searchText, {
      type: "chars"
    });

  tl.add("begin");
  tl.to(".initial", 0.1, {
    autoAlpha: 0,
    display: "none",
    ease: Sine.easeOut
  }, "begin+=1");
  tl.staggerFromTo(st.chars, 1, {
    opacity: 0
  }, {
    opacity: 1,
    ease: Power4.easeOut
  }, 0.08, "begin+=1.25");
  tl.to("button.sights", 1, {
    className: "+=selected"
  }, "begin+=3");
  tl.to("button.mag", 0.2, {
    className: "+=selected"
  }, "begin+=4");
  tl.to("button.mag", 0.2, {
    className: "-=selected"
  }, "begin+=4.2");
  tl.to(".search", 0.4, {
    autoAlpha: 0,
    ease: Sine.easeOut
  }, "begin+=4.2");
  tl.to(".search", 0.1, {
    display: "none"
  }, "begin+=4.2");
  tl.to(".filters", 0.5, {
    height: "40px",
    y: 0,
    ease: Power3.easeOut
  }, "begin+=4.2");
  tl.to(".grad", 2, {
    opacity: 0.3,
    rotation: 360,
    ease: Linear.easeNone
  }, "begin+=4.2");
  tl.to(".map", 0.5, {
    x: -30,
    y: -30,
    ease: Sine.easeOut
  }, "begin+=4.2");
  tl.to(".grad", 0.15, {
    autoAlpha: 0,
    ease: Sine.easeIn
  }, "begin+=5");
  tl.staggerFromTo(".sights-markers .icon", 1, {
    autoAlpha: 0,
    scale: 0
  }, {
    autoAlpha: 1,
    scale: 1,
    ease: Back.easeOut
  }, 0.15, "begin+=4.5");
  tl.to(".featured", 0.25, {
    autoAlpha: 1,
    ease: Sine.easeOut
  }, "begin+=5.25");

  tl.timeScale(1.05);

  return tl;
}

//switcher, selector
function sceneTwo() {
  var tl = new TimelineMax(),
    boxS = "0 2px 10px 3px rgba(150, 150, 150, 0.5)";

  tl.add("start");
  tl.to(".mouse", 0.2, {
    opacity: 1,
    ease: Sine.easeOut
  }, "start");
  tl.to(".mouse", 0.7, {
    x: 1020,
    y: 150,
    ease: Sine.easeOut
  }, "start+=0.1");
  tl.to(".icon-circle-right", 0.1, {
    fill: "#bbb",
    ease: Sine.easeOut
  }, "start+=0.8");
  tl.to(".icon-circle-right", 0.1, {
    fill: "black",
    ease: Sine.easeIn
  }, "start+=0.9");
  tl.to(".map", 0.5, {
    x: -60,
    y: -20,
    ease: Sine.easeOut
  }, "start+=1.5");
  tl.to(".m1", 0.5, {
    scale: 0.6,
    fill: "#862d40",
    ease: Sine.easeOut
  }, "start+=1.5");
  tl.to(".m4", 0.5, {
    scale: 1.8,
    fill: "#e62e09",
    ease: Sine.easeOut
  }, "start+=1.5");

  //move the things
  tl.add( moveOver(".left", ".mid", ".right", 0), "start+=1" );
  
  //tl.timeScale(0.5);

  return tl;
}

function sceneThree() {
  var tl = new TimelineMax();
  
  tl.add("start2");
  //back one
  tl.to(".mouse", 0.8, {
    x: 330,
    ease: Sine.easeOut
  }, "start2");
  tl.to(".icon-circle-left", 0.1, {
    fill: "#bbb",
    ease: Sine.easeOut
  }, "start2+=0.8");
  tl.to(".icon-circle-left", 0.1, {
    fill: "black",
    ease: Sine.easeIn
  }, "start2+=0.9");
  tl.to(".map", 0.5, {
    x: -30,
    y: -30,
    ease: Sine.easeOut
  }, "start2+=0.8");
  tl.to(".m1", 0.5, {
    scale: 1,
    fill: "#e62e09",
    ease: Sine.easeOut
  }, "start2+=0.8");
  tl.to(".m4", 0.5, {
    scale: 1,
    fill: "#862d40",
    ease: Sine.easeOut
  }, "start2+=0.8");
  
  //move back
  tl.add( moveBack(".left", ".mid", ".right"), "start2+=1.3" );
  
  return tl;
}

//helper function timelines
//can call to move between them
function moveOver(left, middle, right, ymid) {
  var tl = new TimelineMax(),
    boxS = "0 2px 10px 3px rgba(150, 150, 150, 0.5)";

  tl.add("start1");

  //move the things
  tl.to(left + ".featured-item", 0.1, {
    background: "none",
    boxShadow: "none",
    ease: Sine.easeOut
  }, "start1+=0.6");
  tl.to(left + ".featured-item", 0.3, {
    x: 388,
    width: 600,
    y: ymid,
    scale: 1,
    ease: Sine.easeOut
  }, "start1+=0.9");
  tl.to(left + ".featured-item", 0.3, {
    background: "white",
    boxShadow: boxS,
    ease: Sine.easeOut
  }, "start1+=1.2");
  tl.fromTo(left + " .select-item", 0.5, {
    opacity: 0,
    display:"none"
  }, {
    opacity: 1,
    display:"block",
    ease: Sine.easeOut
  }, "start1+=1.2");
  tl.to(left + " .featured-img", 0.3, {
    float: "right",
    ease: Sine.easeOut
  }, "start1+=0.9");
  tl.to(left + " h1", 0.1, {
    marginBottom: "+=15",
    ease: Sine.easeOut
  }, "start1+=0.9");
  tl.staggerFromTo(left + " .stagger", 0.8, {
    autoAlpha: 0,
    display: "none"
  }, {
    autoAlpha: 1,
    display: "block",
    ease: Sine.easeOut
  }, 0.1, "start1+=1.2");
  tl.to(middle + ".featured-item", 0.3, {
    x: 1046,
    width: 300,
    scale: 0.6,
    ease: Sine.easeOut
  }, "start1+=0.9");
  tl.to(middle + " .featured-img", 0.3, {
    float: "none",
    ease: Sine.easeOut
  }, "start1+=0.7");
  tl.to(middle + " .stagger", 0.2, {
    autoAlpha: 0,
    display: "none",
    ease: Sine.easeOut
  }, "start1+=0.7");
  tl.to(middle + " .select-item", 0.2, {
    autoAlpha: 0,
    display: "none",
    ease: Sine.easeOut
  }, "start1+=0.7");
  tl.to(middle + " h1", 0.1, {
    marginBottom: "0",
    ease: Sine.easeOut
  }, "start1+=0.9");
  tl.to(right + ".featured-item", 0.3, {
    autoAlpha: 0,
    scale: 0.3,
    ease: Sine.easeOut
  }, "start1+=0.9");

  return tl;
}

//can call to move between them
function moveBack(left, middle, right) {
  var tl = new TimelineMax(),
    boxS = "0 2px 10px 3px rgba(150, 150, 150, 0.5)";

  tl.add("start41");
  //move the things
  tl.to(right + ".featured-item", 0.3, {
    autoAlpha: 1,
    scale: 0.6,
    ease: Sine.easeIn
  }, "start41+=0.1");
  tl.to(middle + ".featured-item", 0.3, {
    x: 388,
    width: 600,
    scale: 1,
    ease: Sine.easeIn
  }, "start41");
  tl.to(middle + " h1", 0.1, {
    marginBottom: "+=15",
    ease: Sine.easeIn
  }, "start41");
  tl.to(middle + " .featured-img", 0.3, {
    float: "right",
    ease: Sine.easeIn
  }, "start41");
  tl.staggerTo(middle + " .stagger", 0.3, {
    autoAlpha: 1,
    display: "block",
    ease: Sine.easeIn
  }, 0.1, "start41+=0.3");
  tl.to(middle + " .select-item", 0.2, {
    autoAlpha: 1,
    display: "block",
    ease: Sine.easeIn
  }, "start41+=0.3");
  
  //left one
  tl.to(left + ".featured-item", 0.3, {
    x: 40,
    width: 300,
    y: 0,
    scale: 0.6,
    ease: Sine.easeIn
  }, "start41");
  tl.to(left + " .stagger", 0.1, {
    autoAlpha: 0,
    display: "none",
    ease: Sine.easeIn
  }, "start41");
  tl.to(left + " h1", 0.1, {
    marginBottom: 0,
    ease: Sine.easeIn
  }, "start41");
  tl.to(left + " .select-item", 0.5, {
    opacity: 0,
    display:"none",
    ease: Sine.easeIn
  }, "start41");
  tl.to(left + " .featured-img", 0.3, {
    float: "none",
    ease: Sine.easeIn
  }, "start41");
 
  //tl.timeScale(0.6);

  return tl;
}


//select this section
function sceneFour() {
  var tl = new TimelineMax();
  
  tl.add("scFour");
  tl.to(".mouse", 0.8, {
    x: 417,
    y: 327,
    ease: Sine.easeOut
  }, "scFour");
  tl.to(".mouse", 0.2, {
    x: 475,
    y: 325,
    ease: Sine.easeOut
  }, "scFour+=1");
  tl.to(".sagrada .select-circ", 0.1, {
    background: "#33c513",
    ease: Sine.easeOut
  }, "scFour+=1");
  tl.to(".sagrada .check2", 0.1, {
    opacity:1,
    ease: Sine.easeOut
  }, "scFour+=1");
  tl.to(".sagrada .select-item", 0.1, {
    background: "#eee",
    ease: Sine.easeOut
  }, "scFour+=1");
  tl.to(".sagrada .select-item", 0.4, {
    position: "absolute",
    y: -300,
    borderTop: 0,
    ease: Sine.easeOut
  }, "scFour+=1.2");
  tl.to(".sagrada.mid", 0.4, {
    background: "none",
    boxShadow: "none",
    ease: Sine.easeOut
  }, "scFour+=1.2");
  tl.to(".featured-item.left, .featured-item.right, .featured-item.outer-left", 0.1, {
    autoAlpha: 0,
    ease: Sine.easeOut
  }, "scFour+=1.2");
  tl.to(".sagrada-hide", 0.2, {
    opacity: 0,
    ease: Sine.easeOut
  }, "scFour+=1.2");
  tl.to(".sagrada .select-circ", 0.1, {
    background: "#ccc",
    ease: Sine.easeOut
  }, "scFour+=1");
   tl.call(function() {
    $(".sagrada .rest").replaceWith('<span class="rest2">Sight selected: La Sagrada Familia</span>');
  });
  tl.to("button.sights", 1, {
    className: "-=selected"
  }, "scFour+=1.2");
  tl.to("button.food", 1, {
    className: "+=selected"
  }, "scFour+=1.2");
  tl.to("section.food-featured", 0.4, {
    opacity: 1,
    ease: Sine.easeOut
  }, "scFour+=1.6");
  tl.to(".map", 0.5, {
    x: 0,
    y: 0,
    ease: Sine.easeOut
  }, "scFour+=1.2");
  tl.to(".m1", 0.5, {
    scale: 0.6,
    fill: "#862d40",
    x: "+=50",
    y: "+=100",
    ease: Sine.easeOut
  }, "scFour+=1.2");
  tl.to(".m2", 0.5, {
    scale: 1.8,
    x: "-=50",
    y: "+=100",
    fill: "#e62e09",
    ease: Sine.easeOut
  }, "scFour+=1.2");
  tl.to(".m3", 0.5, {
    x: "-=10",
    y: "+=50",
    ease: Sine.easeOut
  }, "scFour+=1.2");
  tl.to(".m4", 0.5, {
    x: "+=20",
    y: "+=80",
    ease: Sine.easeOut
  }, "scFour+=1.2");
  
  tl.timeScale(1.1);
  
  return tl;
}

//switcher, selector
function sceneFive() {
  var tl = new TimelineMax();

  tl.add("sc5");
  tl.to(".mouse", 0.2, {
    opacity: 1,
    ease: Sine.easeOut
  }, "sc5");
  tl.to(".mouse", 0.7, {
    x: 1020,
    y: 150,
    ease: Sine.easeOut
  }, "sc5+=0.1");
  tl.to(".icon-circle-right", 0.1, {
    fill: "#bbb",
    ease: Sine.easeOut
  }, "sc5+=0.8");
  tl.to(".icon-circle-right", 0.1, {
    fill: "black",
    ease: Sine.easeIn
  }, "sc5+=0.9");
  tl.to(".map", 0.5, {
    x: -60,
    y: -20,
    ease: Sine.easeOut
  }, "sc5+=1.5");
  tl.to(".m2", 0.5, {
    scale: 1,
    fill: "#862d40",
    ease: Sine.easeOut
  }, "sc5+=1.5");
  tl.to(".m4", 0.5, {
    scale: 1.8,
    fill: "#e62e09",
    ease: Sine.easeOut
  }, "sc5+=1.5");

  //move the things
  tl.add( moveOver(".left2", ".mid2", ".right2", 57), "sc5+=1" );
  
  //tl.timeScale(0.5);

  return tl;
}

function sceneSix() {
  var tl = new TimelineMax();
  
  tl.add("sc6");
  //back one
  tl.to(".mouse", 0.8, {
    x: 330,
    ease: Sine.easeOut
  }, "sc6");
  tl.to(".icon-circle-left", 0.1, {
    fill: "#bbb",
    ease: Sine.easeOut
  }, "sc6+=0.8");
  tl.to(".icon-circle-left", 0.1, {
    fill: "black",
    ease: Sine.easeIn
  }, "sc6+=0.9");
  tl.to(".map", 0.5, {
    x: -30,
    y: -30,
    ease: Sine.easeOut
  }, "sc6+=0.8");
  tl.to(".m2", 0.5, {
    scale: 1.8,
    fill: "#e62e09",
    ease: Sine.easeOut
  }, "sc6+=0.8");
  tl.to(".m4", 0.5, {
    scale: 1,
    fill: "#862d40",
    ease: Sine.easeOut
  }, "sc6+=0.8");
  
  //move back
  tl.add( moveBack(".left2", ".mid2", ".right2"), "start2" );
  
  return tl;
}

//select and send
function sceneSeven() {
  var tl = new TimelineMax();
  
  tl.add("scSeven");
  tl.to(".mouse", 0.8, {
    x: 730,
    y: 385,
    ease: Sine.easeOut
  }, "scSeven");
  tl.to(".mouse", 0.2, {
    x: 775,
    y: 385,
    ease: Sine.easeOut
  }, "scSeven+=1");
  tl.to(".quimet .select-circ", 0.1, {
    background: "#33c513",
    ease: Sine.easeOut
  }, "scSeven+=1");
  tl.to(".quimet .check2", 0.1, {
    opacity:1,
    ease: Sine.easeOut
  }, "scSeven+=1");
  tl.to(".quimet .select-item", 0.1, {
    background: "#eee",
    ease: Sine.easeOut
  }, "scSeven+=1");
  tl.to(".scSeven .select-item", 0.4, {
    position: "absolute",
    y: -300,
    borderTop: 0,
    ease: Sine.easeOut
  }, "scSeven+=1.2");
  tl.to(".quimet.mid2", 0.4, {
    background: "none",
    boxShadow: "none",
    ease: Sine.easeOut
  }, "scSeven+=1.2");
  tl.to(".featured-item.left2, .featured-item.right2, .featured-item.outer-left2", 0.1, {
    autoAlpha: 0,
    ease: Sine.easeOut
  }, "scSeven+=1.2");
  tl.to(".quimet-hide", 0.2, {
    opacity: 0,
    height: 0,
    ease: Sine.easeOut
  }, "scSeven+=1.2");
  tl.to(".quimet .select-circ", 0.1, {
    background: "#ccc",
    ease: Sine.easeOut
  }, "scSeven+=1");
  tl.to(".icon-circles", 0.1, {
    opacity: 0,
    ease: Sine.easeIn
  }, "scSeven+=1");
  tl.to(".sights-markers", 0.2, {
    opacity: 0,
    ease: Sine.easeIn
  }, "scSeven+=1");
  
  //mobile icon stuff
  tl.to(".quimet .m-top", 0.1, {
    opacity: 0,
    ease: Sine.easeIn
  }, "scSeven+=1");
  tl.to(".quimet .phone", 0.2, {
    fill: "#20b500",
    ease: Sine.easeOut
  }, "scSeven+=1");
  tl.to(".quimet .checkmark", 0.2, {
    stroke: "#20b500",
    rotation: 120,
    transformOrigin: "50% 50%",
    ease: Sine.easeOut
  }, "scSeven+=1");
    tl.to("button.food", 0.2, {
    className: "-=selected"
  }, "scSeven+=1");
  
  //text
   tl.call(function() {
    $(".quimet .rest").replaceWith('<span class="rest2">Food selected: Quimet i Quimet</span>');
  });
  tl.call(function() {
    $(".quimet .m-rest").replaceWith('<span class="m-rest2">Itinerary Sent</span>');
  });
  tl.call(function() {
    $(".filter-buttons").replaceWith('<button class="button another">Create Another Trip</button>');
  });
  tl.fromTo(".icon-check-bright", 2.2, {
    opacity: 0, 
    scale: 0,
    rotation: 180
  }, {
    rotation: 0,
    scale: 0.5, 
    opacity: 1, 
    ease: Elastic.easeOut
  });
  
  return tl;
}

var master = new TimelineMax();
master.add(sceneOne(), "scene1");
master.add(sceneTwo(), "scene2");
master.add(sceneThree(), "scene3");
master.add(sceneFour(), "scene4");
master.add(sceneFive(), "scene5");
master.add(sceneSix(), "scene6");
master.add(sceneSeven(), "scene7");

master.timeScale(1.2);

//master.seek("scene6");