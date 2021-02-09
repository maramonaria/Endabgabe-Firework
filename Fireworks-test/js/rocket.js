"use strict";
var Fireworks;
(function (Fireworks) {
    class Rocket {
        constructor(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity) {
            this.exploded = false;
            this.name = _name;
            this.particleShape = _particleShape;
            this.particleCount = _particleCount;
            this.dimension = _dimension;
            this.color = _color;
            this.explosionCenter = _explosionCenter.copy();
            this.position = new Fireworks.Vector(this.explosionCenter.x, 0);
            this.velocity = new Fireworks.Vector(0, 0);
        }
        explode() {
            this.exploded = true;
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
        }
        drawPreview(_context, _canvasWidth, _canvasHeight) {
            //draw in the name of the rocket
            _context.save();
            _context.font = "15px Arial";
            _context.fillStyle = this.color;
            _context.fillText(this.name, 5, _canvasHeight - 5);
            _context.restore();
        }
    }
    Fireworks.Rocket = Rocket;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=Rocket.js.map