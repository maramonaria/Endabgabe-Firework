namespace Fireworks {
    export abstract class Rocket {
        public position: Vector;
        public velocity: Vector;
        public explosionCenter: Vector;
        public name: string;
        public particleShape: string;
        public particleCount: number;
        public dimension: number;
        public color: string;
        public exploded: boolean = false;
        public expired: boolean = false;
        protected particles: Particle[] = [];

        constructor(_name: string, _particleShape: string, _particleCount: number, _dimension: number, _color: string, _explosionCenter: Vector, _velocity?: Vector) {
            this.name = _name;
            this.particleShape = _particleShape;
            this.particleCount = _particleCount;
            this.dimension = _dimension;
            this.color = _color;
            this.explosionCenter = _explosionCenter.copy();
            this.position = new Vector(this.explosionCenter.x, crc2.canvas.height);
            this.velocity = new Vector(0, - 500); // set how fast the rocket flies up to its explosion center
        }

        public explode(): void {
            this.exploded = true;
        }

        public move(_timeslice: number): void {
                        
            let i: number = 0; // index of particle in particles array
            for (let particle of this.particles) {
                if (particle.exploded) {
                particle.lifetime -= 1;
                }
                particle.move(_timeslice);
                particle.draw(crc2);

                if (particle.lifetime < 1) {
                    this.particles.splice(i, 1);
                    i -= 1;
                }
                i += 1;
            }     
            
            if (this.particles.length < 1) {
                this.expired = true;
                return;
            }   
        }

        public launch(): void {
            let startingParticle: Particle = new Particle(this.position, this.particleShape, viewportWidth / 200, this.color, this.velocity);
            this.particles.push(startingParticle);
        }

        public drawPreview(_context: CanvasRenderingContext2D, _canvasWidth: number, _canvasHeight: number): void {
            //draw in the name of the rocket
            _context.save();
            _context.font = "15px Arial";
            _context.fillStyle = this.color;
            _context.fillText(this.name, 5, _canvasHeight - 5);
            _context.restore();
        }

        public draw(): void {
            for (let particle of this.particles) {
                particle.draw(crc2);
            }
        }

        public abstract copy(): Rocket;
    }
}