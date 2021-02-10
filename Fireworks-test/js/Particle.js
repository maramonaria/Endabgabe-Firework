"use strict";
var Fireworks;
(function (Fireworks) {
    class Particle {
        constructor(_position, _shape, _size, _color, _velocity) {
            this.exploded = false;
            this.gravity = 0.06;
            this.lifetime = Particle.maxLifetime;
            this.position = _position.copy();
            this.shape = _shape;
            this.size = _size;
            this.color = _color;
            if (!_velocity) {
                this.velocity = new Fireworks.Vector(0, 0);
            }
            else {
                this.velocity = _velocity.copy();
            }
            this.lifetime = 100 + Math.random() * 20;
        }
        explode() {
            this.exploded = true;
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
        }
        draw(_context) {
            _context.save();
            let particle = new Path2D();
            let gradient = _context.createRadialGradient(0, 0, this.size / 6, 0, 0, this.size);
            gradient.addColorStop(0, "white");
            _context.translate(this.position.x, this.position.y);
            _context.fillStyle = gradient;
            if (this.exploded) {
                gradient.addColorStop(.6, this.color);
                // create Particle depending on shape
                switch (this.shape) {
                    case "basic":
                        _context.save();
                        particle.arc(0, 0, this.size, 0, 2 * Math.PI);
                        _context.fill(particle);
                        _context.restore();
                        break;
                    case "heart":
                        _context.save();
                        _context.beginPath();
                        let _particleSize = this.size * 2;
                        let topCurveHeight = -_particleSize * 1 / 6;
                        _context.moveTo(0, topCurveHeight);
                        //top left curve
                        _context.bezierCurveTo(0, -_particleSize / 2, -_particleSize / 2, -_particleSize / 2, -_particleSize / 2, topCurveHeight);
                        //bottom left curve
                        _context.bezierCurveTo(-_particleSize / 2, (_particleSize + topCurveHeight) / 2, 0, (_particleSize + topCurveHeight) / 2, 0, _particleSize / 2);
                        // bottom right curve
                        _context.bezierCurveTo(0, (_particleSize + topCurveHeight) / 2, _particleSize / 2, (_particleSize + topCurveHeight) / 2, _particleSize / 2, topCurveHeight);
                        // top right curve
                        _context.bezierCurveTo(_particleSize / 2, -_particleSize / 2, 0, -_particleSize / 2, 0, topCurveHeight);
                        _context.closePath();
                        _context.fill();
                        _context.restore();
                        break;
                    case "star":
                        _context.save();
                        _context.beginPath();
                        _context.moveTo(0, this.size);
                        let points = 5;
                        for (let i = 0; i < 2 * points + 1; i++) {
                            let r = (i % 2 == 0) ? this.size : (this.size / 2);
                            let a = Math.PI * i / points;
                            _context.lineTo(0 + r * Math.sin(a), 0 + r * Math.cos(a));
                        }
                        _context.closePath();
                        _context.fill();
                        _context.restore();
                        break;
                }
            }
            else {
                gradient.addColorStop(1, "#03040a");
                _context.save();
                particle.arc(0, 0, this.size, 0, 2 * Math.PI);
                _context.fill(particle);
                _context.restore();
            }
            _context.restore();
        }
    }
    Particle.maxLifetime = 50 + Math.random() * 50;
    Fireworks.Particle = Particle;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=Particle.js.map