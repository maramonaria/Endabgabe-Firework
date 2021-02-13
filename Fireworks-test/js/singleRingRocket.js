"use strict";
var Fireworks;
(function (Fireworks) {
    class SingleRingRocket extends Fireworks.Rocket {
        constructor(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity) {
            super(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity);
        }
        launch() {
            super.launch();
        }
        move(_timeslice) {
            // if startingParticle is ready to explode: initiate all exploded Particles
            if (this.particles.length == 1 && (this.particles[0].position.y - this.explosionCenter.y) < 1 && !this.particles[0].exploded) {
                this.particles.splice(0, 1);
                let newVelocity;
                //let explosionRadius: number = this.dimension * 100;
                for (let i = 0; i < this.particleCount; i++) {
                    let a = 2 * Math.PI * i / this.particleCount;
                    //let ringPosition: Vector = new Vector(this.explosionCenter.x + explosionRadius * Math.sin(a), this.explosionCenter.y + explosionRadius * Math.cos(a));
                    let ringPosition = new Fireworks.Vector(this.explosionCenter.x + 30 * Math.sin(a), this.explosionCenter.y + 30 * Math.cos(a));
                    newVelocity = Fireworks.Vector.getDifference(this.explosionCenter, ringPosition);
                    let particle = new Fireworks.Particle(this.explosionCenter, this.particleShape, Fireworks.viewportWidth / 200, this.color, newVelocity);
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
            let explosionRadius = _canvasWidth / 7 * this.dimension;
            for (let i = 0; i < this.particleCount; i++) {
                let a = 2 * Math.PI * i / this.particleCount;
                position = new Fireworks.Vector(this.explosionCenter.x + explosionRadius * Math.sin(a), this.explosionCenter.y + explosionRadius * Math.cos(a));
                let particle = new Fireworks.Particle(position, this.particleShape, radiusParticle, this.color);
                particle.explode();
                particle.draw(_context);
            }
            _context.restore();
            super.drawPreview(_context, _canvasWidth, _canvasHeight);
        }
        copy() {
            return new SingleRingRocket(this.name, this.particleShape, this.particleCount, this.dimension, this.color, this.explosionCenter, this.velocity);
        }
    }
    Fireworks.SingleRingRocket = SingleRingRocket;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=singleRingRocket.js.map