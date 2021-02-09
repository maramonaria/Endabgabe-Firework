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
    let rocketminions: RocketMinion[]; // will contain all existing rockets from database
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
        previewCanvas = <HTMLCanvasElement>document.querySelector("canvas[id=preview]");
        previewCanvas.width = viewportWidth / 100 * 20;
        previewCanvas.height = viewportWidth / 100 * 20;
        previewContext = <CanvasRenderingContext2D>previewCanvas.getContext("2d");

        // get previously created rockets from database
        let databaseLength: number = 3;
        let database: string[][] = [["bluefire", "basic", "20", "doublering", "50", "ff0000"], 
                                    ["halo", "heart", "10", "singlering", "20", "00fa00"],
                                    ["Rocky", "star", "20", "scatter", "40", "fffc00"]
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
        miniCanvas.setAttribute("draggable", "true");
        miniCanvas.setAttribute("index", "rocket" + _index);
        miniCanvas.width = viewportWidth / 100 * 7;
        miniCanvas.height = viewportWidth / 100 * 7;


        let miniContext: CanvasRenderingContext2D = <CanvasRenderingContext2D>miniCanvas.getContext("2d");
        
    
        console.log(_rocketData);
        let rocket: RocketMinion = new RocketMinion (_rocketData[0], _rocketData[1], parseInt(_rocketData[2]), _rocketData[3], parseInt(_rocketData[4]), "#" + _rocketData[5]);
        rocketminions.push(rocket);
        rocket.drawPreview(miniContext, miniCanvas.width, miniCanvas.height);
        

        if (section)
            section.appendChild(miniCanvas);
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

        let preview: RocketMinion;
        let name: string = "" + formData.get("Name");
        let particleShape: string = "" + formData.get("ParticleShape");
        let particleCount: number = 0 + parseInt("" + formData.get("ParticleCount"));
        let explosionShape: string = "" + formData.get("ExplosionShape");
        let height: number = parseInt("" + formData.get("HeightSlider"));
        let color: string = "" + formData.get("Color");

        previewContext.save();
        preview = new RocketMinion(name, particleShape, particleCount, explosionShape, height, color);
        preview.drawPreview(previewContext, previewCanvas.width, previewCanvas.height);
        previewContext.restore();
    }

    function onWindowResize(): void {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
      }

}