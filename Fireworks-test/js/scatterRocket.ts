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
                //let explosionRadius: number = this.dimension * 100;

                for (let i: number = 0; i < this.particleCount; i++) {
                    //let a: number = 2 * Math.PI * i / this.particleCount;
                    //let ringPosition: Vector = new Vector(this.explosionCenter.x + explosionRadius * Math.sin(a), this.explosionCenter.y + explosionRadius * Math.cos(a));
                    //let scatterPosition: Vector = Vector.getRandom(5, 50); 

                    newVelocity = Vector.getRandom(5, 50);
                    let particle: Particle = new Particle(this.explosionCenter, this.particleShape, viewportWidth / 200, this.color, newVelocity);
                    particle.lifetime = this.dimension * 50 + Math.random() * 100;
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
                let randomX: number = (radiusParticle) + Math.random() * (_canvasWidth - radiusParticle * 2);
                let randomY: number = (_canvasHeight / 15) + Math.random() * (_canvasHeight - (_canvasHeight / 4));
                position = new Vector(randomX, randomY);
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