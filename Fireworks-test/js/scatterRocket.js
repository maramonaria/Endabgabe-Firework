"use strict";
var Fireworks;
(function (Fireworks) {
    class ScatterRocket extends Fireworks.Rocket {
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
            for (let i = 0; i < this.particleCount; i++) {
                let randomX = (radiusParticle) + Math.random() * (_canvasWidth - radiusParticle * 2);
                let randomY = (_canvasHeight / 15) + Math.random() * (_canvasHeight - (_canvasHeight / 4));
                position = new Fireworks.Vector(randomX, randomY);
                let particle = new Fireworks.Particle(position, this.particleShape, radiusParticle, this.color);
                particle.draw(_context, radiusParticle);
            }
            _context.restore();
        }
    }
    Fireworks.ScatterRocket = ScatterRocket;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=scatterRocket.js.map