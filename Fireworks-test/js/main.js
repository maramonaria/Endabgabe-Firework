"use strict";
var Fireworks;
(function (Fireworks) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleLoad);
    let form;
    let rocketminions; // will contain all existing rockets from database
    let rockets = []; // rockets that are currently doing their thing on screen
    function handleLoad(_event) {
        console.log("Fireworks starting");
        onWindowResize(); //get vieport measurements
        Fireworks.fireworkCanvas = document.querySelector("canvas[id=bgsky]");
        if (!Fireworks.fireworkCanvas)
            return;
        Fireworks.fireworkCanvas.width = Fireworks.viewportWidth / 100 * 60;
        Fireworks.fireworkCanvas.height = Fireworks.viewportHeight;
        Fireworks.crc2 = Fireworks.fireworkCanvas.getContext("2d");
        Fireworks.previewCanvas = document.querySelector("canvas[id=preview]");
        Fireworks.previewCanvas.width = Fireworks.viewportWidth / 100 * 20;
        Fireworks.previewCanvas.height = Fireworks.viewportWidth / 100 * 20;
        Fireworks.previewContext = Fireworks.previewCanvas.getContext("2d");
        // get previously created rockets from database
        let databaseLength = 3;
        let database = [["bluefire", "basic", "20", "doublering", "50", "ff0000"],
            ["halo", "heart", "10", "singlering", "20", "00fa00"],
            ["Rocky", "star", "20", "scatter", "40", "fffc00"]
        ];
        // clear all pre-existing rocketminions from array and html
        rocketminions = [];
        let section = document.getElementById("rockets");
        if (section) {
            while (section.childElementCount > 1) {
                if (section.lastChild) {
                    section.lastChild.remove();
                }
            }
        }
        //create the rocket minions
        for (let r = 0; r < databaseLength; r++) {
            let datastring = database[r];
            createRocketMinion(datastring, r.toString());
        }
        form = document.querySelector("form");
        form.addEventListener("change", handleChange);
        let submit = document.querySelector("button[id=submitbutton]");
        submit.addEventListener("click", sendRocket);
        updatePreview();
    }
    function createRocketMinion(_rocketData, _index) {
        let section = document.getElementById("rockets");
        let miniCanvas = document.createElement("canvas");
        miniCanvas.setAttribute("id", "rocketminion");
        miniCanvas.setAttribute("draggable", "true");
        miniCanvas.setAttribute("index", "rocket" + _index);
        miniCanvas.width = Fireworks.viewportWidth / 100 * 7;
        miniCanvas.height = Fireworks.viewportWidth / 100 * 7;
        let miniContext = miniCanvas.getContext("2d");
        console.log(_rocketData);
        let rocket = new Fireworks.RocketMinion(_rocketData[0], _rocketData[1], parseInt(_rocketData[2]), _rocketData[3], parseInt(_rocketData[4]), "#" + _rocketData[5]);
        rocketminions.push(rocket);
        rocket.drawPreview(miniContext, miniCanvas.width, miniCanvas.height);
        if (section)
            section.appendChild(miniCanvas);
    }
    async function sendRocket(_event) {
        console.log("Send rocket");
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        await fetch("fireworks.html?" + query.toString());
        console.log("QUERY" + query);
        alert("Rocket info sent!");
    }
    function handleChange(_event) {
        updatePreview();
    }
    function updatePreview() {
        Fireworks.previewContext.save();
        Fireworks.previewContext.fillStyle = "#03040a";
        Fireworks.previewContext.fillRect(0, 0, Fireworks.previewCanvas.width, Fireworks.previewCanvas.height);
        Fireworks.previewContext.restore();
        let formData = new FormData(form);
        let preview;
        let name = "" + formData.get("Name");
        let particleShape = "" + formData.get("ParticleShape");
        let particleCount = 0 + parseInt("" + formData.get("ParticleCount"));
        let explosionShape = "" + formData.get("ExplosionShape");
        let height = parseInt("" + formData.get("HeightSlider"));
        let color = "" + formData.get("Color");
        Fireworks.previewContext.save();
        preview = new Fireworks.RocketMinion(name, particleShape, particleCount, explosionShape, height, color);
        preview.drawPreview(Fireworks.previewContext, Fireworks.previewCanvas.width, Fireworks.previewCanvas.height);
        Fireworks.previewContext.restore();
    }
    function onWindowResize() {
        Fireworks.viewportWidth = window.innerWidth;
        Fireworks.viewportHeight = window.innerHeight;
    }
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=main.js.map