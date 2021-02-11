namespace Fireworks {
    export class ScatterRocket extends Rocket {

        constructor(_name: string, _particleShape: string, _particleCount: number, _dimension: number, _color: string, _explosionCenter: Vector, _velocity?: Vector) {
            super(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity);
        }

        drawPreview(_context: CanvasRenderingContext2D, _canvasWidth: number, _canvasHeight: number): void {
            _context.save();

            let radiusParticle: number;
            if (_context == previewContext) {
                radiusParticle = viewportWidth / 200;
            }
            else {
               radiusParticle = _canvasWidth / 20; 
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