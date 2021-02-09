"use strict";
var Fireworks;
(function (Fireworks) {
    class SingleRingRocket extends Fireworks.Rocket {
        constructor(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity) {
            super(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity);
        }
        draw() {
        }
        drawPreview(_context, _canvasWidth, _canvasHeight) {
            super.drawPreview(_context, _canvasWidth, _canvasHeight);
            _context.save();
            let radiusParticle;
            if (_context == Fireworks.previewContext) {
                radiusParticle = Fireworks.viewportWidth / 200;
            }
            else {
                radiusParticle = _canvasWidth / 20;
            }
            let position;
            let explosionRadius = _canvasWidth / 4;
            for (let i = 0; i < this.particleCount; i++) {
                let a = 2 * Math.PI * i / this.particleCount;
                position = new Fireworks.Vector(this.explosionCenter.x + explosionRadius * Math.sin(a), this.explosionCenter.y + explosionRadius * Math.cos(a));
                let particle = new Fireworks.Particle(position, this.particleShape, radiusParticle, this.color);
                particle.draw(_context, radiusParticle);
            }
            _context.restore();
        }
    }
    Fireworks.SingleRingRocket = SingleRingRocket;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=singleRingRocket.js.map