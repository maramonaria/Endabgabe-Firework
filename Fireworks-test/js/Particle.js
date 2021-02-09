"use strict";
var Fireworks;
(function (Fireworks) {
    class Particle {
        constructor(_position, _shape, _size, _color, _velocity) {
            this.position = _position.copy();
            this.shape = _shape;
            this.size = _size;
            this.color = _color;
            if (!_velocity) {
                this.velocity = new Fireworks.Vector(0, 0);
                this.exploded = true;
            }
            else {
                this.velocity = _velocity.copy();
                this.exploded = false;
            }
        }
        draw(_context, _particleSize) {
            _context.save();
            // create Particle depending on shape
            let particle = new Path2D();
            let gradient = _context.createRadialGradient(0, 0, _particleSize / 6, 0, 0, _particleSize);
            gradient.addColorStop(0, "white");
            gradient.addColorStop(.6, this.color);
            _context.fillStyle = gradient;
            _context.translate(this.position.x, this.position.y);
            switch (this.shape) {
                case "basic":
                    _context.save();
                    particle.arc(0, 0, _particleSize, 0, 2 * Math.PI);
                    _context.fill(particle);
                    _context.restore();
                    break;
                case "heart":
                    _context.save();
                    _context.beginPath();
                    _particleSize = _particleSize * 2;
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
                    _context.moveTo(0, _particleSize);
                    let points = 5;
                    for (let i = 0; i < 2 * points + 1; i++) {
                        let r = (i % 2 == 0) ? _particleSize : (_particleSize / 2);
                        let a = Math.PI * i / points;
                        _context.lineTo(0 + r * Math.sin(a), 0 + r * Math.cos(a));
                    }
                    _context.closePath();
                    _context.fill();
                    _context.restore();
                    break;
            }
            _context.restore();
        }
    }
    Fireworks.Particle = Particle;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=Particle.js.map