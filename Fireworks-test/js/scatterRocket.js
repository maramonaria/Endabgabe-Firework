"use strict";
var Fireworks;
(function (Fireworks) {
    class ScatterRocket extends Fireworks.Rocket {
        constructor(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity) {
            super(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity);
        }
        drawPreview(_context, _canvasWidth, _canvasHeight) {
            _context.save();
            let radiusParticle;
            if (_context == Fireworks.previewContext) {
                radiusParticle = Fireworks.viewportWidth / 300;
            }
            else {
                radiusParticle = _canvasWidth / 30;
            }
            let position;
            for (let i = 0; i < this.particleCount; i++) {
                let randomX = (radiusParticle) + Math.random() * (_canvasWidth - radiusParticle * 2);
                let randomY = (_canvasHeight / 15) + Math.random() * (_canvasHeight - (_canvasHeight / 4));
                position = new Fireworks.Vector(randomX, randomY);
                let particle = new Fireworks.Particle(position, this.particleShape, radiusParticle, this.color);
                particle.explode();
                particle.draw(_context);
            }
            _context.restore();
            super.drawPreview(_context, _canvasWidth, _canvasHeight);
        }
        copy() {
            return new ScatterRocket(this.name, this.particleShape, this.particleCount, this.dimension, this.color, this.explosionCenter, this.velocity);
        }
    }
    Fireworks.ScatterRocket = ScatterRocket;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=scatterRocket.js.map