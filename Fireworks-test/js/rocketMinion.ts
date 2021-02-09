namespace Fireworks {
    export class RocketMinion {
        name: string;
        explosionShape: string;
        height: number;
        particleShape: string;
        particleCount: number;
        color: string;
        //public explosionCenter: Vector;

        constructor(_name: string, _particleShape: string, _particleCount: number, _explosionShape: string, _height: number, _color: string) {
            this.name = _name;
            this.particleShape = _particleShape;
            this.particleCount = _particleCount;
            this.explosionShape = _explosionShape;
            this.height = _height;
            this.color = _color;
        }

        public drawPreview(_context: CanvasRenderingContext2D, _canvasWidth: number, _canvasHeight: number): void {

            //draw in the name of the rocket
            _context.save();
            _context.font = "15px Arial";
            _context.fillStyle = this.color;
            _context.fillText(this.name, 5, _canvasHeight - 5);
            _context.restore();

            let position: Vector;
            let explosionRadius: number;
            let centerX: number = _canvasWidth / 2;
            let centerY: number = _canvasHeight / 2;
            let center: Vector = new Vector(centerX, centerY);

            let radiusParticle: number;
            if (_context == previewContext) {
                radiusParticle = viewportWidth / 200;
            }
            else {
               radiusParticle = _canvasWidth / 20; 
            }
            

            switch (this.explosionShape) {
                case "scatter":
                    _context.save();
                    for (let i: number = 0; i < this.particleCount; i++) {
                        let randomX: number = (radiusParticle) + Math.random() * (_canvasWidth - radiusParticle * 2);
                        let randomY: number = (_canvasHeight / 15) + Math.random() * (_canvasHeight - (_canvasHeight / 4));
                        position = new Vector(randomX, randomY);
                        let particle: Particle = new Particle(position, this.particleShape, radiusParticle, this.color);
                        particle.draw(_context, radiusParticle);
                    }
                    _context.restore();
                    break;
                case "singlering":
                    _context.save();
                    explosionRadius = _canvasWidth / 4;
                    for (let i: number = 0; i < this.particleCount; i++) {
                        let a: number = 2 * Math.PI * i / this.particleCount;
                        position = new Vector(centerX + explosionRadius * Math.sin(a), centerY + explosionRadius * Math.cos(a));
                        let particle: Particle = new Particle(position, this.particleShape, radiusParticle, this.color);
                        particle.draw(_context, radiusParticle);
                    }
                    _context.restore();
                    break;
                case "doublering":
                    _context.save();

                    for (let i: number = 0; i < this.particleCount; i++) {
                        _context.save();
                        explosionRadius = _canvasWidth / 3;
                        let a: number = 2 * Math.PI * i / this.particleCount;
                        position = new Vector(centerX + explosionRadius * Math.sin(a), centerY + explosionRadius * Math.cos(a));
                        let particle: Particle = new Particle(position, this.particleShape, radiusParticle, this.color);
                        particle.draw(_context, radiusParticle);
                        _context.restore();
                        explosionRadius = explosionRadius / 2;
                        position = new Vector(centerX + explosionRadius * Math.sin(a), centerY + explosionRadius * Math.cos(a));
                        particle = new Particle(position, this.particleShape, radiusParticle, this.color);
                        particle.draw(_context, radiusParticle);
                        
                    }
                    _context.restore();
                    break;
            }
        }
    }
}