"use strict";
// fireworks.js
// 这个脚本用于在网页上实现点击或触摸时的烟花效果
// 它使用了 anime.js 库来处理动画效果

// 当用户点击或触摸屏幕时，更新鼠标/触点的当前位置
// 这个函数用于获取点击位置相对于 canvas 画布的坐标
function updateCoords(e) {
  (pointerX =
    (e.clientX || e.touches[0].clientX) -
    canvasEl.getBoundingClientRect().left),
    (pointerY =
      e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top);
}

// 设置单个粒子方向
// 这个函数用于计算粒子爆炸的方向和距离
function setParticuleDirection(e) {
  var t = (anime.random(0, 180) * Math.PI) / 180,
    a = anime.random(25, 90),
    n = [-1, 1][anime.random(0, 1)] * a;
  return { x: e.x + n * Math.cos(t), y: e.y + n * Math.sin(t) };
}

// 这个函数用于生成一个粒子，包含位置、颜色、半径和爆炸方向
function createParticule(e, t) {
  var a = {};
  return (
    (a.x = e),
    (a.y = t),
    (a.color = colors[anime.random(0, colors.length - 1)]),
    (a.radius = anime.random(8, 16)),
    (a.endPos = setParticuleDirection(a)),
    (a.draw = function() {
      ctx.beginPath(),
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
        (ctx.fillStyle = a.color),
        ctx.fill();
    }),
    a
  );
}

// 创建一个圆形对象，用于表示爆炸效果，外面辐射的波纹
function createCircle(e, t) {
  var a = {};
  return (
    (a.x = e),
    (a.y = t),
    (a.color = "#F00"),
    (a.radius = 0.1),
    (a.alpha = 0.5),
    (a.lineWidth = 6),
    (a.draw = function() {
      (ctx.globalAlpha = a.alpha),
        ctx.beginPath(),
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
        (ctx.lineWidth = a.lineWidth),
        (ctx.strokeStyle = a.color),
        ctx.stroke(),
        (ctx.globalAlpha = 1);
    }),
    a
  );
}

// 绘制粒子
function renderParticule(e) {
  for (var t = 0; t < e.animatables.length; t++) {
    e.animatables[t].target.draw();
  }
}

// 动画粒子效果，主要的函数
function animateParticules(e, t) {
  for (var a = createCircle(e, t), n = [], i = 0; i < numberOfParticules; i++) {
    n.push(createParticule(e, t));
  }
  anime
    .timeline()
    .add({
      targets: n,
      x: function(e) {
        return e.endPos.x;
      },
      y: function(e) {
        return e.endPos.y;
      },
      radius: 0.1,
      duration: anime.random(600, 900),
      easing: "easeOutExpo",
      update: renderParticule,
    })
    .add({
      targets: a,
      radius: anime.random(40, 80),
      lineWidth: 0,
      alpha: { value: 0, easing: "linear", duration: anime.random(300, 400) },
      duration: anime.random(600, 900),
      easing: "easeOutExpo",
      update: renderParticule,
      offset: 0,
    });
}

// 防抖函数，用于限制函数(e)调用频率(t)
function debounce(e, t) {
  var a;
  return function() {
    var n = this, i = arguments;
    clearTimeout(a);// 清除上一次设置的定时器（如果有的话）
    // 设置新的定时器，并把它的 ID 存入 a 中
    a = setTimeout(function(){
      e.apply(n, i);
    }, t);
  };
}
var canvasEl = document.querySelector(".fireworks");
if (canvasEl) {
  var ctx = canvasEl.getContext("2d"),
    numberOfParticules = 30,
    pointerX = 0,
    pointerY = 0,
    tap = "mousedown",
    colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"],
    setCanvasSize = debounce(function() {
      (canvasEl.width = 2 * window.innerWidth),
        (canvasEl.height = 2 * window.innerHeight),
        (canvasEl.style.width = window.innerWidth + "px"),
        (canvasEl.style.height = window.innerHeight + "px"),
        canvasEl.getContext("2d").scale(2, 2);
    }, 500),
    render = anime({
      duration: 1 / 0,
      update: function() {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);// 清除画布
      },
    });
  document.addEventListener(
    tap,
    function(e) {
      "sidebar" !== e.target.id &&
        "toggle-sidebar" !== e.target.id &&
        "A" !== e.target.nodeName &&
        "IMG" !== e.target.nodeName &&
        (render.play(), updateCoords(e), animateParticules(pointerX, pointerY));
    },
    //事件触发需要执行的函数，此e是由浏览器自动创建的事件对象传递给这个回调函数
    //判断点击的目标元素是否是以下这些：id="sidebar" 的元素id="toggle-sidebar" 的元素<a> 标签（超链接）<img> 图片标签
    !1
  ),
    setCanvasSize(),// 设置画布大小
    window.addEventListener("resize", setCanvasSize, !1);
}
