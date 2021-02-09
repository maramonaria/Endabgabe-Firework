namespace Fireworks {

    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleLoad);

    export let fireworkCanvas: HTMLCanvasElement | null;
    export let crc2: CanvasRenderingContext2D;
    export let viewportWidth: number;
    export let viewportHeight: number;
    export let previewCanvas: HTMLCanvasElement;
    export let previewContext: CanvasRenderingContext2D;
    

    let form: HTMLFormElement;
    let rocketminions: Rocket[]; // will contain all existing rockets from database
    let rockets: Rocket[] = []; // rockets that are currently doing their thing on screen


    function handleLoad(_event: Event): void {
        console.log("Fireworks starting");

        onWindowResize(); //get vieport measurements

        fireworkCanvas = <HTMLCanvasElement>document.querySelector("canvas[id=bgsky]");
        if (!fireworkCanvas)
            return;
        fireworkCanvas.width = viewportWidth / 100 * 60;
        fireworkCanvas.height = viewportHeight;
        crc2 = <CanvasRenderingContext2D>fireworkCanvas.getContext("2d");

        // Drop functionality for main canvas
        fireworkCanvas.addEventListener("drop", handleDrop);
        fireworkCanvas.addEventListener("dragover", handleDragOver);

        previewCanvas = <HTMLCanvasElement>document.querySelector("canvas[id=preview]");
        previewCanvas.width = viewportWidth / 100 * 20;
        previewCanvas.height = viewportWidth / 100 * 20;
        previewContext = <CanvasRenderingContext2D>previewCanvas.getContext("2d");

        // get previously created rockets from database
        let databaseLength: number = 3;
        let database: string[][] = [["bluefire", "basic", "20", "1", "doublering", "ff0000"], 
                                    ["halo", "heart", "10", "2", "singlering", "00fa00"],
                                    ["Rocky", "star", "20", "3", "scatter", "fffc00"]
                                ];

        // clear all pre-existing rocketminions from array and html

        rocketminions = [];
        let section: HTMLElement | null = document.getElementById("rockets");
        if (section) {
            while (section.childElementCount > 1) {
                if (section.lastChild) {
                    section.lastChild.remove();
                }       
            }
        }

        //create the rocket minions
        for (let r: number = 0; r < databaseLength; r++) {
            let datastring: string[] = database[r];
            createRocketMinion(datastring, r.toString());
        }
        

        form = <HTMLFormElement>document.querySelector("form");
        form.addEventListener("change", handleChange);

        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[id=submitbutton]");
        submit.addEventListener("click", sendRocket);

        updatePreview();
    }

    function createRocketMinion(_rocketData: string[], _index: string): void {
        let section: HTMLElement | null = document.getElementById("rockets");
        
        let miniCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
        miniCanvas.setAttribute("id", "rocketminion");
        miniCanvas.setAttribute("index", _index);
        miniCanvas.width = viewportWidth / 100 * 7;
        miniCanvas.height = viewportWidth / 100 * 7;

        // Drag and Drop functionality
        miniCanvas.draggable = true;
        miniCanvas.addEventListener("dragstart", handleDragStart);



        let miniContext: CanvasRenderingContext2D = <CanvasRenderingContext2D>miniCanvas.getContext("2d");
        
        console.log(_rocketData);
        //let rocket: RocketMinion = new RocketMinion (_rocketData[0], _rocketData[1], parseInt(_rocketData[2]), _rocketData[3], parseInt(_rocketData[4]), "#" + _rocketData[5]);
        let rocket: Rocket;
        let explosionCenter: Vector = new Vector(miniCanvas.width / 2, miniCanvas.height / 2);
        switch (_rocketData[4]) {
            case "scatter":
                rocket = new ScatterRocket(_rocketData[0], _rocketData[1], parseInt(_rocketData[2]), parseInt(_rocketData[3]), _rocketData[5], explosionCenter);
                rocketminions.push(rocket);
                rocket.drawPreview(miniContext, miniCanvas.width, miniCanvas.height);
                break;
            case "singlering":
                rocket = new SingleRingRocket(_rocketData[0], _rocketData[1], parseInt(_rocketData[2]), parseInt(_rocketData[3]), _rocketData[5], explosionCenter);
                rocketminions.push(rocket);
                rocket.drawPreview(miniContext, miniCanvas.width, miniCanvas.height);
                break;
            case "doublering":
                rocket = new DoubleRingRocket(_rocketData[0], _rocketData[1], parseInt(_rocketData[2]), parseInt(_rocketData[3]), _rocketData[5], explosionCenter);
                rocketminions.push(rocket);
                rocket.drawPreview(miniContext, miniCanvas.width, miniCanvas.height);
                break;
        }   

        if (section)
            section.appendChild(miniCanvas);
    }

    function handleDragStart(_event: DragEvent): void {
        if (!_event.dataTransfer)
            return;

        let target: HTMLCanvasElement = <HTMLCanvasElement>_event.target;

        let minionIndex: string | null = target.getAttribute("index");
        console.log("Index of rocket is ", minionIndex);
        //let rocket: Rocket = rocketminions[minionIndex];

        if (!minionIndex)
            return;
        _event.dataTransfer.setData("rocket", minionIndex);
    }

    function handleDragOver(_event: DragEvent): void {
        _event.preventDefault();  
    }

    function handleDrop(_event: DragEvent): void {
        if (!_event.dataTransfer)
            return;
        
        let minionIndex: string = _event.dataTransfer.getData("rocket");
        console.log(minionIndex);
        let rocket: Rocket = rocketminions[parseInt(minionIndex)];

        // get the mouse position of the drop
        let mousePos: Vector;
        let rect: DOMRect | undefined;
        if (fireworkCanvas) {
            rect = fireworkCanvas.getBoundingClientRect();
        }
        if (rect == undefined)
            return;
        let x: number = _event.clientX - rect.left;
        let y: number = _event.clientY - rect.top;
        mousePos = new Vector(x, y);

        // rocket will explode at the drop position
        rocket.explosionCenter = mousePos.copy();

        // but it starts flying up from the bottom of the canvas
        rocket.position = new Vector(x, 0);

        rockets.push(rocket);
        // now start exploding!!
    }


    async function sendRocket(_event: Event): Promise<void> {
        console.log("Send rocket");
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        await fetch("fireworks.html?" + query.toString());
        console.log("QUERY" + query);
        alert("Rocket info sent!");
    }

    function handleChange(_event: Event): void {
        updatePreview();
    }

    function updatePreview(): void {
        previewContext.save();
        previewContext.fillStyle = "#03040a";
        previewContext.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
        previewContext.restore();

        let formData: FormData = new FormData(form);

        let preview: Rocket;
        let name: string = "" + formData.get("Name");
        let particleShape: string = "" + formData.get("ParticleShape");
        let particleCount: number = 0 + parseInt("" + formData.get("ParticleCount"));
        let explosionShape: string = "" + formData.get("ExplosionShape");
        let dimension: number = parseInt("" + formData.get("DimensionSlider"));
        let color: string = "" + formData.get("Color");

        let explosionCenter: Vector = new Vector(previewCanvas.width / 2, previewCanvas.height / 2);

        previewContext.save();

        switch (explosionShape) {
            case "scatter":
                preview = new ScatterRocket(name, particleShape, particleCount, dimension, color, explosionCenter);
                preview.drawPreview(previewContext, previewCanvas.width, previewCanvas.height);
                break;
            case "singlering":
                preview = new SingleRingRocket(name, particleShape, particleCount, dimension, color, explosionCenter);
                preview.drawPreview(previewContext, previewCanvas.width, previewCanvas.height);
                break;
            case "doublering":
                preview = new DoubleRingRocket(name, particleShape, particleCount, dimension, color, explosionCenter);
                preview.drawPreview(previewContext, previewCanvas.width, previewCanvas.height);
                break;
        }
        previewContext.restore();
    }

    function onWindowResize(): void {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
      }

}