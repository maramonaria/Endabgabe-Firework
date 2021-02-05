namespace Fireworks {

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    let form: HTMLFormElement;
    let data: number[];


    function handleLoad(_event: Event): void {
        console.log("Fireworks starting");
        generateRockets(data);
        
        form = <HTMLFormElement>document.querySelector("form");
        let fieldset: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("fieldset");
        console.log("Fieldset:", fieldset);
        fieldset.addEventListener("change", handleInfoChange);
        fieldset.addEventListener("input", handleInfoChange);

        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[id=submitbutton]");
        submit.addEventListener("click", sendRocket);
    }

    function generateRockets(_data: number[]): void {
        console.log("generate Rockets");
    }

    async function sendRocket(_event: Event): Promise<void> {
        console.log("Send rocket");
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        await fetch("fireworks.html?" + query.toString());
        console.log(query);
        alert("Rocket info sent!");
    }

    function handleInfoChange(_event: Event): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;

        if (_event.type == "change") {
            console.log("Change " + target);
        }

        else if (_event.type == "input") {
            console.log("Input " + target);
        }
    }

}