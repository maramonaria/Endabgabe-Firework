namespace Fireworks {
    export class Particle {
        public position: Vector;
        public velocity: Vector;
        shape: string;
        size: number; //width of particle
        color: string;
        exploded: boolean;

        constructor(_position: Vector, _shape: string, _size: number, _color: string, _velocity?: Vector) {
            this.position = _position.copy();
            this.shape = _shape;
            this.size = _size;
            this.color = _color;
            if (!_velocity) {
                this.velocity = new Vector(0, 0);
                this.exploded = true;
            }
            else {
                this.velocity = _velocity.copy(); 
                this.exploded = false;
            }   
        }

        draw(_context: CanvasRenderingContext2D, _particleSize: number): void {

            _context.save();
            
            // create Particle depending on shape
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = _context.createRadialGradient(0, 0, _particleSize / 6, 0, 0, _particleSize);
            gradient.addColorStop(0, "white");
            gradient.addColorStop(.6, this.color);
            _context.fillStyle = gradient;
            _context.translate(this.position.x, this.position.y);

            switch (this.shape) {
                case "basic":
                    _context.save();
                    particle.arc(0, 0, _particleSize, 0, 2 * Math.PI);
                    _context.fill(particle);
                    _context.restore();
                    break;
                case "heart":
                    _context.save();
                    _context.beginPath();
                    _particleSize = _particleSize * 2;
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
                    _context.save();
                    _context.beginPath();
                    _context.moveTo(0, _particleSize);
                    let points: number = 5;
                    for (let i: number = 0; i < 2 * points + 1; i++) {
                        let r: number = (i % 2 == 0) ? _particleSize : (_particleSize / 2);
                        let a: number = Math.PI * i / points;
                        _context.lineTo(0 + r * Math.sin(a), 0 + r * Math.cos(a));
                    }
                    _context.closePath();
                    _context.fill();
                    _context.restore();

                    break;
            }
            _context.restore();

        }


    }
}