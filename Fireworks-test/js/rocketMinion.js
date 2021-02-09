"use strict";
var Fireworks;
(function (Fireworks) {
    class RocketMinion {
        //public explosionCenter: Vector;
        constructor(_name, _particleShape, _particleCount, _explosionShape, _height, _color) {
            this.name = _name;
            this.particleShape = _particleShape;
            this.particleCount = _particleCount;
            this.explosionShape = _explosionShape;
            this.height = _height;
            this.color = _color;
        }
        drawPreview(_context, _canvasWidth, _canvasHeight) {
            //draw in the name of the rocket
            _context.save();
            _context.font = "15px Arial";
            _context.fillStyle = this.color;
            _context.fillText(this.name, 5, _canvasHeight - 5);
            _context.restore();
            let position;
            let explosionRadius;
            let centerX = _canvasWidth / 2;
            let centerY = _canvasHeight / 2;
            let center = new Fireworks.Vector(centerX, centerY);
            let radiusParticle;
            if (_context == Fireworks.previewContext) {
                radiusParticle = Fireworks.viewportWidth / 200;
            }
            else {
                radiusParticle = _canvasWidth / 20;
            }
            switch (this.explosionShape) {
                case "scatter":
                    _context.save();
                    for (let i = 0; i < this.particleCount; i++) {
                        let randomX = (radiusParticle) + Math.random() * (_canvasWidth - radiusParticle * 2);
                        let randomY = (_canvasHeight / 15) + Math.random() * (_canvasHeight - (_canvasHeight / 4));
                        position = new Fireworks.Vector(randomX, randomY);
                        let particle = new Fireworks.Particle(position, this.particleShape, radiusParticle, this.color);
                        particle.draw(_context, radiusParticle);
                    }
                    _context.restore();
                    break;
                case "singlering":
                    _context.save();
                    explosionRadius = _canvasWidth / 4;
                    for (let i = 0; i < this.particleCount; i++) {
                        let a = 2 * Math.PI * i / this.particleCount;
                        position = new Fireworks.Vector(centerX + explosionRadius * Math.sin(a), centerY + explosionRadius * Math.cos(a));
                        let particle = new Fireworks.Particle(position, this.particleShape, radiusParticle, this.color);
                        particle.draw(_context, radiusParticle);
                    }
                    _context.restore();
                    break;
                case "doublering":
                    _context.save();
                    for (let i = 0; i < this.particleCount; i++) {
                        _context.save();
                        explosionRadius = _canvasWidth / 3;
                        let a = 2 * Math.PI * i / this.particleCount;
                        position = new Fireworks.Vector(centerX + explosionRadius * Math.sin(a), centerY + explosionRadius * Math.cos(a));
                        let particle = new Fireworks.Particle(position, this.particleShape, radiusParticle, this.color);
                        particle.draw(_context, radiusParticle);
                        _context.restore();
                        explosionRadius = explosionRadius / 2;
                        position = new Fireworks.Vector(centerX + explosionRadius * Math.sin(a), centerY + explosionRadius * Math.cos(a));
                        particle = new Fireworks.Particle(position, this.particleShape, radiusParticle, this.color);
                        particle.draw(_context, radiusParticle);
                    }
                    _context.restore();
                    break;
            }
        }
    }
    Fireworks.RocketMinion = RocketMinion;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=rocketMinion.js.map