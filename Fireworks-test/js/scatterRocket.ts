namespace Fireworks {
    export class ScatterRocket extends Rocket {

        constructor(_name: string, _particleShape: string, _particleCount: number, _dimension: number, _color: string, _explosionCenter: Vector, _velocity?: Vector) {
            super(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity);
        }

        move(_timeslice: number): void {
            // if startingParticle is ready to explode: initiate all exploded Particles
            if (this.particles.length == 1 && (this.particles[0].position.y - this.explosionCenter.y) < 1 && !this.particles[0].exploded) {
                this.particles.splice(0, 1);
                let newVelocity: Vector;

                for (let i: number = 0; i < this.particleCount; i++) {
                    newVelocity = Vector.getRandom(5, 100);
                    let particle: Particle = new Particle(this.explosionCenter, this.particleShape, viewportWidth / 200, this.color, newVelocity);
                    particle.lifetime = this.dimension * 80 + Math.random() * 80;
                    particle.explode();
                    this.particles.push(particle);
                }
            }
            super.move(_timeslice);
        }

        drawPreview(_context: CanvasRenderingContext2D, _canvasWidth: number, _canvasHeight: number): void {
            _context.save();

            let radiusParticle: number;
            if (_context == previewContext) {
                radiusParticle = viewportWidth / 300;
            }
            else {
               radiusParticle = _canvasWidth / 30; 
            }
            let position: Vector;
            for (let i: number = 0; i < this.particleCount; i++) {
                position = this.explosionCenter.copy();
                position.add(Vector.getRandom(2, this.dimension / 10 * _canvasWidth));
                let particle: Particle = new Particle(position, this.particleShape, radiusParticle, this.color);
                particle.explode();
                particle.draw(_context);
            }
            _context.restore();
            super.drawPreview(_context, _canvasWidth, _canvasHeight);
        }

        public copy(): ScatterRocket {
            return new ScatterRocket(this.name, this.particleShape, this.particleCount, this.dimension, this.color, this.explosionCenter, this.velocity);
        }
    }
}