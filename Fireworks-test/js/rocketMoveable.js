"use strict";
var Fireworks;
(function (Fireworks) {
    class Rocket {
        constructor(_name, _particleShape, _particleCount, _dimension, _color, _explosionCenter, _velocity) {
            this.exploded = false;
            this.expired = false;
            this.particles = [];
            this.name = _name;
            this.particleShape = _particleShape;
            this.particleCount = _particleCount;
            this.dimension = _dimension;
            this.color = _color;
            this.explosionCenter = _explosionCenter.copy();
            this.position = new Fireworks.Vector(this.explosionCenter.x, Fireworks.crc2.canvas.height);
            this.velocity = new Fireworks.Vector(0, -100); // set how fast the rocket flies up to its explosion center
        }
        explode() {
            this.exploded = true;
        }
        move(_timeslice) {
            let i = 0; // index of particle in particles array
            for (let particle of this.particles) {
                if (particle.exploded) {
                    particle.lifetime -= 1;
                }
                particle.move(_timeslice);
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
        launch() {
            let startingParticle = new Fireworks.Particle(this.position, this.particleShape, Fireworks.viewportWidth / 200, this.color, this.velocity);
            this.particles.push(startingParticle);
        }
        drawPreview(_context, _canvasWidth, _canvasHeight) {
            //draw in the name of the rocket
            _context.save();
            _context.font = "15px Arial";
            _context.fillStyle = this.color;
            _context.strokeStyle = "black";
            _context.lineWidth = 2;
            _context.strokeText(this.name, 5, _canvasHeight - 5);
            _context.fillText(this.name, 5, _canvasHeight - 5);
            _context.restore();
        }
        draw() {
            for (let particle of this.particles) {
                particle.draw(Fireworks.crc2);
            }
        }
    }
    Fireworks.Rocket = Rocket;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=rocketMoveable.js.map