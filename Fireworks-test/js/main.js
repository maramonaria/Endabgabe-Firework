"use strict";
var Fireworks;
(function (Fireworks) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleLoad);
    let form;
    let rocketminions; // will contain all existing rockets from database
    let rockets = []; // rockets that are currently doing their thing on screen
    let url = "https://rocketsciencecenter.herokuapp.com";
    // get previously created rockets from database
    let database = [["bluefire", "basic", "20", "1", "doublering", "#ff0000"],
        ["halo", "heart", "10", "2", "singlering", "#00fa00"],
        ["Rocky", "star", "10", "3", "singlering", "#fffc00"]
    ];
    async function handleLoad() {
        console.log("Fireworks starting");
        onWindowResize(); //get vieport measurements
        Fireworks.fireworkCanvas = document.querySelector("canvas[id=bgsky]");
        if (!Fireworks.fireworkCanvas)
            return;
        Fireworks.fireworkCanvas.width = Fireworks.viewportWidth / 100 * 60;
        Fireworks.fireworkCanvas.height = Fireworks.viewportHeight;
        Fireworks.crc2 = Fireworks.fireworkCanvas.getContext("2d");
        // Drop functionality for main canvas
        Fireworks.fireworkCanvas.addEventListener("drop", handleDrop);
        Fireworks.fireworkCanvas.addEventListener("dragover", handleDragOver);
        Fireworks.previewCanvas = document.querySelector("canvas[id=preview]");
        Fireworks.previewCanvas.width = Fireworks.viewportWidth / 100 * 20;
        Fireworks.previewCanvas.height = Fireworks.viewportWidth / 100 * 20;
        Fireworks.previewContext = Fireworks.previewCanvas.getContext("2d");
        //let response: Response = await fetch("Data.json");
        //response.headers.set("Access-Control-Allow-Origin", "*");
        //let offer: string = await response.text();
        //let data: Data = JSON.parse(offer);
        //console.log(data);
        setupRocketMinions();
        form = document.querySelector("form");
        form.addEventListener("change", handleChange);
        let submit = document.querySelector("button[id=submitbutton]");
        submit.addEventListener("click", sendRocket);
        updatePreview();
        window.setInterval(update, 20);
    }
    async function sendRocket(_event) {
        console.log("Send rocket");
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        alert(responseText);
        handleLoad();
        form.reset();
        updatePreview();
    }
    function setupRocketMinions() {
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
        for (let r = 0; r < database.length; r++) {
            let datastring = database[r];
            createRocketMinion(datastring, r.toString());
        }
    }
    function createRocketMinion(_rocketData, _index) {
        let section = document.getElementById("rockets");
        let miniCanvas = document.createElement("canvas");
        miniCanvas.setAttribute("id", "rocketminion");
        miniCanvas.setAttribute("index", _index);
        miniCanvas.width = Fireworks.viewportWidth / 100 * 7;
        miniCanvas.height = Fireworks.viewportWidth / 100 * 7;
        // Drag and Drop functionality
        miniCanvas.draggable = true;
        miniCanvas.addEventListener("dragstart", handleDragStart);
        let miniContext = miniCanvas.getContext("2d");
        let rocket;
        let explosionCenter = new Fireworks.Vector(miniCanvas.width / 2, miniCanvas.height / 2);
        switch (_rocketData[4]) {
            case "scatter":
                rocket = new Fireworks.ScatterRocket(_rocketData[0], _rocketData[1], parseInt(_rocketData[2]), parseInt(_rocketData[3]), _rocketData[5], explosionCenter);
                rocketminions.push(rocket);
                rocket.drawPreview(miniContext, miniCanvas.width, miniCanvas.height);
                break;
            case "singlering":
                rocket = new Fireworks.SingleRingRocket(_rocketData[0], _rocketData[1], parseInt(_rocketData[2]), parseInt(_rocketData[3]), _rocketData[5], explosionCenter);
                rocketminions.push(rocket);
                rocket.drawPreview(miniContext, miniCanvas.width, miniCanvas.height);
                break;
            case "doublering":
                rocket = new Fireworks.DoubleRingRocket(_rocketData[0], _rocketData[1], parseInt(_rocketData[2]), parseInt(_rocketData[3]), _rocketData[5], explosionCenter);
                rocketminions.push(rocket);
                rocket.drawPreview(miniContext, miniCanvas.width, miniCanvas.height);
                break;
        }
        if (section)
            section.appendChild(miniCanvas);
    }
    function handleDragStart(_event) {
        if (!_event.dataTransfer)
            return;
        let target = _event.target;
        let minionIndex = target.getAttribute("index");
        if (!minionIndex)
            return;
        _event.dataTransfer.setData("rocket", minionIndex);
    }
    function handleDragOver(_event) {
        _event.preventDefault();
    }
    function handleDrop(_event) {
        if (!_event.dataTransfer)
            return;
        let minionIndex = _event.dataTransfer.getData("rocket");
        console.log(minionIndex);
        let rocket = rocketminions[parseInt(minionIndex)].copy();
        // get the mouse position of the drop relative to the canvas
        let mousePos;
        let rect;
        if (Fireworks.fireworkCanvas) {
            rect = Fireworks.fireworkCanvas.getBoundingClientRect();
        }
        if (rect == undefined)
            return;
        let x = _event.clientX - rect.left;
        let y = _event.clientY - rect.top;
        mousePos = new Fireworks.Vector(x, y);
        // rocket will explode at the drop position
        rocket.explosionCenter = mousePos.copy();
        // but it starts flying up from the bottom of the canvas
        rocket.position = new Fireworks.Vector(x, Fireworks.crc2.canvas.height);
        rocket.launch();
        rockets.push(rocket);
    }
    function update() {
        console.log("update");
        Fireworks.crc2.save();
        Fireworks.crc2.fillStyle = "HSLA(231, 54%, 3%, 0.4)";
        Fireworks.crc2.fillRect(0, 0, Fireworks.crc2.canvas.width, Fireworks.crc2.canvas.height);
        Fireworks.crc2.restore();
        let i = 0;
        for (let rocket of rockets) {
            if (!rocket.expired) {
                Fireworks.crc2.save();
                rocket.move(1 / 50);
                rocket.draw();
                Fireworks.crc2.restore();
            }
            else {
                rockets.splice(i, 1);
                i -= 1;
            }
            i += 1;
        }
        console.log("rockets array:", rockets);
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
        let dimension = parseInt("" + formData.get("DimensionSlider"));
        let color = "" + formData.get("Color");
        let explosionCenter = new Fireworks.Vector(Fireworks.previewCanvas.width / 2, Fireworks.previewCanvas.height / 2);
        Fireworks.previewContext.save();
        switch (explosionShape) {
            case "scatter":
                preview = new Fireworks.ScatterRocket(name, particleShape, particleCount, dimension, color, explosionCenter);
                preview.drawPreview(Fireworks.previewContext, Fireworks.previewCanvas.width, Fireworks.previewCanvas.height);
                break;
            case "singlering":
                preview = new Fireworks.SingleRingRocket(name, particleShape, particleCount, dimension, color, explosionCenter);
                preview.drawPreview(Fireworks.previewContext, Fireworks.previewCanvas.width, Fireworks.previewCanvas.height);
                break;
            case "doublering":
                preview = new Fireworks.DoubleRingRocket(name, particleShape, particleCount, dimension, color, explosionCenter);
                preview.drawPreview(Fireworks.previewContext, Fireworks.previewCanvas.width, Fireworks.previewCanvas.height);
                break;
        }
        Fireworks.previewContext.restore();
    }
    function onWindowResize() {
        Fireworks.viewportWidth = window.innerWidth;
        Fireworks.viewportHeight = window.innerHeight;
    }
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=main.js.map