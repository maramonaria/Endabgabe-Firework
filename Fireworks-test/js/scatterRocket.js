"use strict";
var Fireworks;
(function (Fireworks) {
    class ScatterRocket extends Fireworks.Rocket {
        constructor(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity) {
            super(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity);
        }
        move(_timeslice) {
            // if startingParticle is ready to explode: initiate all exploded Particles
            if (this.particles.length == 1 && (this.particles[0].position.y - this.explosionCenter.y) < 1 && !this.particles[0].exploded) {
                this.particles.splice(0, 1);
                let newVelocity;
                for (let i = 0; i < this.particleCount; i++) {
                    newVelocity = Fireworks.Vector.getRandom(5, 100);
                    let particle = new Fireworks.Particle(this.explosionCenter, this.particleShape, Fireworks.viewportWidth / 200, this.color, newVelocity);
                    particle.lifetime = this.dimension * 80 + Math.random() * 80;
                    particle.explode();
                    this.particles.push(particle);
                }
            }
            super.move(_timeslice);
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
                position = this.explosionCenter.copy();
                position.add(Fireworks.Vector.getRandom(2, this.dimension / 10 * _canvasWidth));
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