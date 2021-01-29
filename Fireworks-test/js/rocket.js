"use strict";
var Fireworks;
(function (Fireworks) {
    class Rocket {
        constructor(_position) {
            // console.log("Moveable constructor");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new Fireworks.Vector(0, 0);
            this.velocity = new Fireworks.Vector(0, 0);
        }
    }
    Fireworks.Rocket = Rocket;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=rocket.js.map