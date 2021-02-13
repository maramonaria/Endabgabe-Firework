"use strict";
var Fireworks;
(function (Fireworks) {
    class DoubleRingRocket extends Fireworks.Rocket {
        constructor(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity) {
            super(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity);
        }
        move(_timeslice) {
            // if startingParticle is ready to explode: initiate all exploded Particles
            if (this.particles.length == 1 && (this.particles[0].position.y - this.explosionCenter.y) < 1 && !this.particles[0].exploded) {
                this.particles.splice(0, 1);
                let explosionRadiusBig = 30; //larger ring
                let explosionRadiusSmall = 20; //smaller ring
                let ringPosition;
                let newVelocity;
                for (let i = 0; i < this.particleCount * 2; i++) {
                    let a = Math.PI * i / this.particleCount;
                    let particle;
                    if (i % 2 == 0) {
                        ringPosition = new Fireworks.Vector(this.explosionCenter.x + explosionRadiusBig * Math.sin(a), this.explosionCenter.y + explosionRadiusBig * Math.cos(a));
                        newVelocity = Fireworks.Vector.getDifference(this.explosionCenter, ringPosition);
                    }
                    else {
                        ringPosition = new Fireworks.Vector(this.explosionCenter.x + explosionRadiusSmall * Math.sin(a), this.explosionCenter.y + explosionRadiusSmall * Math.cos(a));
                        newVelocity = Fireworks.Vector.getDifference(this.explosionCenter, ringPosition);
                    }
                    particle = new Fireworks.Particle(this.explosionCenter, this.particleShape, Fireworks.viewportWidth / 200, this.color, newVelocity);
                    particle.lifetime = this.dimension * 50 + Math.random() * 20;
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
            let outerRadius = _canvasWidth / 3;
            let innerRadius = _canvasWidth / 5;
            for (let i = 0; i < 2 * this.particleCount; i++) {
                _context.save();
                let explosionRadius = (i % 2 == 0) ? outerRadius : innerRadius;
                let a = Math.PI * i / this.particleCount;
                let particle;
                position = new Fireworks.Vector(this.explosionCenter.x + explosionRadius * Math.sin(a), this.explosionCenter.y + explosionRadius * Math.cos(a));
                particle = new Fireworks.Particle(position, this.particleShape, radiusParticle, this.color);
                particle.explode();
                particle.draw(_context);
                _context.restore();
            }
            _context.restore();
            super.drawPreview(_context, _canvasWidth, _canvasHeight);
        }
        copy() {
            return new DoubleRingRocket(this.name, this.particleShape, this.particleCount, this.dimension, this.color, this.explosionCenter, this.velocity);
        }
    }
    Fireworks.DoubleRingRocket = DoubleRingRocket;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=doubleRingRocket.js.map