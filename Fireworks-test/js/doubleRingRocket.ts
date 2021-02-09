namespace Fireworks {
    export class DoubleRingRocket extends Rocket {

        constructor(_name: string, _particleShape: string, _particleCount: number, _dimension: number, _color: string, _explosionCenter: Vector, _velocity?: Vector) {
            super(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity);
        }

        draw(): void {

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
                _context.save();
                explosionRadius = _canvasWidth / 3;
                let a: number = 2 * Math.PI * i / this.particleCount;
                position = new Vector(this.explosionCenter.x + explosionRadius * Math.sin(a), this.explosionCenter.y + explosionRadius * Math.cos(a));
                let particle: Particle = new Particle(position, this.particleShape, radiusParticle, this.color);
                particle.draw(_context, radiusParticle);
                _context.restore();
                explosionRadius = explosionRadius / 2;
                position = new Vector(this.explosionCenter.x + explosionRadius * Math.sin(a), this.explosionCenter.y + explosionRadius * Math.cos(a));
                particle = new Particle(position, this.particleShape, radiusParticle, this.color);
                particle.draw(_context, radiusParticle);
                
            }
            _context.restore();
        }
    }
}