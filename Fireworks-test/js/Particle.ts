namespace Fireworks {
    export class Particle {
        public position: Vector;
        public velocity: Vector;
        shape: string;
        size: number; //width of particle
        color: string;
        exploded: boolean = false;
        gravity: number = 0.06;
        public lifetime: number;

        constructor(_position: Vector, _shape: string, _size: number, _color: string, _velocity?: Vector) {
            this.position = _position.copy();
            this.shape = _shape;
            this.size = _size;
            this.color = _color;
            if (!_velocity) {
                this.velocity = new Vector(0, 0);
            }
            else {
                this.velocity = _velocity.copy();
            }   

            this.lifetime = 100 + Math.random() * 20;
        }

        explode(): void {
            this.exploded = true;
        }

        move(_timeslice: number): void {

            let offset: Vector = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
        }

        draw(_context: CanvasRenderingContext2D): void {

            _context.save();

            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = _context.createRadialGradient(0, 0, this.size / 6, 0, 0, this.size);
            gradient.addColorStop(0, "white");
            _context.translate(this.position.x, this.position.y);

            _context.fillStyle = gradient;

            if (this.exploded) {
                
                gradient.addColorStop(.6, this.color);
                // create Particle depending on shape
                switch (this.shape) {
                    case "basic":
                        _context.save();
                        particle.arc(0, 0, this.size, 0, 2 * Math.PI);
                        _context.fill(particle);
                        _context.restore();
                        break;
                    case "heart":
                        _context.save();
                        _context.beginPath();
                        let _particleSize: number = this.size * 2;
                        let topCurveHeight: number = - _particleSize * 1 / 6;

                        _context.moveTo(0, topCurveHeight);
                        //top left curve
                        _context.bezierCurveTo(0, -_particleSize / 2, -_particleSize / 2, - _particleSize / 2, - _particleSize / 2, topCurveHeight);
                        //bottom left curve
                        _context.bezierCurveTo(-_particleSize / 2, (_particleSize + topCurveHeight) / 2, 0, (_particleSize + topCurveHeight) / 2, 0, _particleSize / 2);
                        // bottom right curve
                        _context.bezierCurveTo(0, (_particleSize + topCurveHeight) / 2, _particleSize / 2, (_particleSize + topCurveHeight) / 2, _particleSize / 2, topCurveHeight);
                        // top right curve
                        _context.bezierCurveTo(_particleSize / 2, - _particleSize / 2, 0, - _particleSize / 2, 0, topCurveHeight);

                        _context.closePath();
                        _context.fill();
                        _context.restore();

                        break;
                    case "star":
                        let particleSize: number = this.size * 1.5;
                        _context.save();
                        _context.beginPath();
                        _context.moveTo(0, particleSize);
                        let points: number = 5;
                        for (let i: number = 0; i < 2 * points + 1; i++) {
                            let r: number = (i % 2 == 0) ? particleSize : (particleSize / 2);
                            let a: number = Math.PI * i / points;
                            _context.lineTo(0 + r * Math.sin(a), 0 + r * Math.cos(a));
                        }
                        _context.closePath();
                        _context.fill();
                        _context.restore();

                        break;
                }
            }
            else {
                gradient.addColorStop(1, "HSLA(0,0%,100%,0)");
                _context.save();
                particle.arc(0, 0, this.size, 0, 2 * Math.PI);
                _context.fill(particle);
                _context.restore();
            }

            _context.restore();
        }
    }
}