namespace Fireworks {
    export class SingleRingRocket extends Rocket {

        constructor(_name: string, _particleShape: string, _particleCount: number, _dimension: number, _color: string, _explosionCenter: Vector, _velocity?: Vector) {
            super(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity);
        }

        launch(): void {
            super.launch();
            console.log("launch: ", this.particles[1]);
        }


        move(_timeslice: number): void {
            // if startingParticle is ready to explode: initiate all exploded Particles
            if (this.particles.length == 1 && (this.particles[0].position.y - this.explosionCenter.y) < 1 && !this.particles[0].exploded) {
                this.particles.splice(0, 1);
                let newVelocity: Vector;
                let explosionRadius: number = this.dimension * 100;

                for (let i: number = 0; i < this.particleCount; i++) {
                    let a: number = 2 * Math.PI * i / this.particleCount;
                    let ringPosition: Vector = new Vector(this.explosionCenter.x + explosionRadius * Math.sin(a), this.explosionCenter.y + explosionRadius * Math.cos(a));

                    newVelocity = Vector.getDifference(this.explosionCenter, ringPosition);
                    let particle: Particle = new Particle(this.explosionCenter, this.particleShape, viewportWidth / 200, this.color, newVelocity);
                    particle.explode();
                    this.particles.push(particle);
                }
            }
            super.move(_timeslice);
        }



        drawPreview(_context: CanvasRenderingContext2D, _canvasWidth: number, _canvasHeight: number): void {
            super.drawPreview(_context, _canvasWidth, _canvasHeight);
            _context.save();

            let radiusParticle: number;
            if (_context == previewContext) {
                radiusParticle = viewportWidth / 200;
            }
            else {
               radiusParticle = _canvasWidth / 20; 
            }
            let position: Vector;

            let explosionRadius: number = _canvasWidth / 4;
            for (let i: number = 0; i < this.particleCount; i++) {
                let a: number = 2 * Math.PI * i / this.particleCount;
                position = new Vector(this.explosionCenter.x + explosionRadius * Math.sin(a), this.explosionCenter.y + explosionRadius * Math.cos(a));
                let particle: Particle = new Particle(position, this.particleShape, radiusParticle, this.color);
                particle.explode();
                particle.draw(_context);
            }
            _context.restore();
        }

        public copy(): SingleRingRocket {
            return new SingleRingRocket(this.name, this.particleShape, this.particleCount, this.dimension, this.color, this.explosionCenter, this.velocity);
        }
    }
}