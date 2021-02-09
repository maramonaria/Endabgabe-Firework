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

        constructor(_name: string, _particleShape: string, _particleCount: number, _dimension: number, _color: string, _explosionCenter: Vector, _velocity?: Vector) {
            this.name = _name;
            this.particleShape = _particleShape;
            this.particleCount = _particleCount;
            this.dimension = _dimension;
            this.color = _color;
            this.explosionCenter = _explosionCenter.copy();
            this.position = new Vector(this.explosionCenter.x, 0);
            this.velocity = new Vector(0, 0);
        }

        public explode(): void {
            this.exploded = true;
        }

        public move(_timeslice: number): void {
            let offset: Vector = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
        }

        public drawPreview(_context: CanvasRenderingContext2D, _canvasWidth: number, _canvasHeight: number): void {
            //draw in the name of the rocket
            _context.save();
            _context.font = "15px Arial";
            _context.fillStyle = this.color;
            _context.fillText(this.name, 5, _canvasHeight - 5);
            _context.restore();
        }

        public abstract draw(): void;
    }
}