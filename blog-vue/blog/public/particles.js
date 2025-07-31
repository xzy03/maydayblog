/* eslint-disable no-empty */
/* eslint-disable no-constant-condition */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
(function(name, factory) {
    if (typeof window === "object") {
        window[name] = factory();
    }
})("Particles", function() {
    var _w = window,
        _b = document.body,
        _d = document.documentElement;

    var random = function(min, max) {
        return Math.random() * (max - min) + min;
    };

    var screenInfo = function() {
        var width = Math.max(0, _w.innerWidth || _d.clientWidth || _b.clientWidth),
            height = Math.max(0, _w.innerHeight || _d.clientHeight || _b.clientHeight);
        return { width: width, height: height };
    };

    var Factory = function(options) {
        this._canvas = null;
        this._ctx = null;
        this._width = 0;
        this._height = 0;
        this._particles = [];
        this._mouse = { x: null, y: null, radius: 100 };

        this._options = {
            maxParticles: 150,
            color: 'hsl',
            connectDistance: 120,
            mouseEffectRadius: 100,
            particleSize: [2, 4],
            lineWidth: 0.5,
            lineOpacity: 0.6
        };

        this._onDraw = this._onDraw.bind(this);
        this.setOptions(options);
        this.init();
    };

    Factory.prototype = {
        constructor: Factory,

        setOptions: function(options) {
            if (typeof options === "object") {
                for (var key in options) {
                    if (Object.prototype.hasOwnProperty.call(options, key)) {
                        this._options[key] = options[key];
                    }
                }
            }
        },

        init: function() {
            var canvas = document.createElement("canvas");
            canvas.style.position = "fixed";
            canvas.style.top = "0";
            canvas.style.left = "0";
            canvas.style.zIndex = "-1";
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            _b.appendChild(canvas);

            this._canvas = canvas;
            this._ctx = canvas.getContext("2d");

            this._width = canvas.width = _w.innerWidth;
            this._height = canvas.height = _w.innerHeight;

            // 初始化粒子
            for (var i = 0; i < this._options.maxParticles; i++) {
                this._particles.push(this.createParticle());
            }

            // 绑定事件
            _w.addEventListener("resize", this._onResize.bind(this));
            _w.addEventListener("mousemove", this._onMouseMove.bind(this));
            _w.addEventListener("mouseleave", this._onMouseLeave.bind(this));

            this._onDraw();
        },

        createParticle: function() {
            var size = random(this._options.particleSize[0], this._options.particleSize[1]);
            var x = random(0, this._width);
            var y = random(0, this._height);
            var vx = random(-0.5, 0.5);
            var vy = random(-0.5, 0.5);
            var color = this._options.color === 'hsl'
                ? 'hsla(' + ~~random(0, 360) + ', 80%, 60%, 0.8)'
                : this._options.color;

            return { x: x, y: y, vx: vx, vy: vy, size: size, color: color, life: 0 };
        },

        _onMouseMove: function(e) {
            this._mouse.x = e.clientX;
            this._mouse.y = e.clientY;
        },

        _onMouseLeave: function() {
            this._mouse.x = null;
            this._mouse.y = null;
        },

        _onResize: function() {
            var screen = screenInfo();
            this._width = screen.width;
            this._height = screen.height;
            this._canvas.width = this._width;
            this._canvas.height = this._height;
        },

        _drawParticle: function(p) {
            var ctx = this._ctx;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        },

        _updateParticle: function(p) {
            p.x += p.vx;
            p.y += p.vy;

            // 边界反弹
            if (p.x <= p.size || p.x >= this._width - p.size) p.vx *= -1;
            if (p.y <= p.size || p.y >= this._height - p.size) p.vy *= -1;

            // 鼠标吸引
            if (this._mouse.x !== null && this._mouse.y !== null) {
                let dx = p.x - this._mouse.x;
                let dy = p.y - this._mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this._mouse.radius) {
                    let force = (this._mouse.radius - dist) / this._mouse.radius;
                    p.x -= dx * force * 0.5;
                    p.y -= dy * force * 0.5;
                }
            }
        },

        _connectParticles: function() {
            var particles = this._particles,
                ctx = this._ctx,
                distance = this._options.connectDistance,
                opacity = this._options.lineOpacity;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < distance) {
                        let alpha = 1 - dist / distance;
                        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (alpha * opacity) + ')';
                        ctx.lineWidth = this._options.lineWidth;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        },

        _onDraw: function() {
            var ctx = this._ctx;
            ctx.clearRect(0, 0, this._width, this._height);

            for (var i = 0; i < this._particles.length; i++) {
                var p = this._particles[i];
                this._updateParticle(p);
                this._drawParticle(p);
            }

            this._connectParticles();

            requestAnimationFrame(this._onDraw);
        }
    };
    return Factory;
});

new Particles({
    maxParticles: 150,       // 粒子数量
    color: 'hsl',            // 粒子颜色模式 ('hsl' 或 'rgba')
    connectDistance: 120,    // 粒子连接距离
    mouseEffectRadius: 100,  // 鼠标效果半径
    particleSize: [6, 8],    // 粒子大小
    lineWidth: 0.5,          // 粒子连接线宽度
    lineOpacity: 0.6         // 粒子连接线透明度
});
