namespace Fireworks {
    export abstract class Rocket {
        public position: Vector;
        public velocity: Vector;


        constructor(_position?: Vector) {
            // console.log("Moveable constructor");

            if (_position)
                this.position = _position.copy();
            else
                this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
        }

        public abstract draw(): void;
    }
}