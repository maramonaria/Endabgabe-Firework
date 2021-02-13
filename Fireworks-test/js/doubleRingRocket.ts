namespace Fireworks {
    export class DoubleRingRocket extends Rocket {

        constructor(_name: string, _particleShape: string, _particleCount: number, _dimension: number, _color: string, _explosionCenter: Vector, _velocity?: Vector) {
            super(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity);
        }

        move(_timeslice: number): void {
            // if startingParticle is ready to explode: initiate all exploded Particles
            if (this.particles.length == 1 && (this.particles[0].position.y - this.explosionCenter.y) < 1 && !this.particles[0].exploded) {
                this.particles.splice(0, 1);

                let explosionRadiusBig: number = 30; //larger ring
                let explosionRadiusSmall: number = 20; //smaller ring

                let ringPosition: Vector;
                let newVelocity: Vector;

                for (let i: number = 0; i < this.particleCount * 2; i++) {
                    let a: number = Math.PI * i / this.particleCount;
                    let particle: Particle;

                    if (i % 2 == 0) {
                        ringPosition = new Vector(this.explosionCenter.x + explosionRadiusBig * Math.sin(a), this.explosionCenter.y + explosionRadiusBig * Math.cos(a));
                        newVelocity = Vector.getDifference(this.explosionCenter, ringPosition);
                    }
                    else {
                        ringPosition = new Vector(this.explosionCenter.x + explosionRadiusSmall * Math.sin(a), this.explosionCenter.y + explosionRadiusSmall * Math.cos(a));
                        newVelocity = Vector.getDifference(this.explosionCenter, ringPosition); 
                    }
                    
                    particle = new Particle(this.explosionCenter, this.particleShape, viewportWidth / 200, this.color, newVelocity);
                    particle.lifetime = this.dimension * 60 + Math.random() * 20;
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

            let outerRadius: number = _canvasWidth / 10 * this.dimension;
            let innerRadius: number = _canvasWidth / 15 * this.dimension;

            for (let i: number = 0; i < 2 * this.particleCount; i++) {
                _context.save();
                let explosionRadius: number = (i % 2 == 0) ? outerRadius : innerRadius;
                let a: number = Math.PI * i / this.particleCount;
                let particle: Particle;
                position = new Vector(this.explosionCenter.x + explosionRadius * Math.sin(a), this.explosionCenter.y + explosionRadius * Math.cos(a));
                particle = new Particle(position, this.particleShape, radiusParticle, this.color);
                particle.explode();
                particle.draw(_context);
                _context.restore();
            }
            _context.restore();
            super.drawPreview(_context, _canvasWidth, _canvasHeight);
        }

        public copy(): DoubleRingRocket {
            return new DoubleRingRocket(this.name, this.particleShape, this.particleCount, this.dimension, this.color, this.explosionCenter, this.velocity);
        }
    }
}