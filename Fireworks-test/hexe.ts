window.addEventListener("load", handleLoad);
let anweisungscounter: number = 1;
let tempEndcondChecked: HTMLInputElement;
let stirEndcondChecked: HTMLInputElement;
let form: HTMLFormElement;
function handleLoad(_event: Event): void {
    
    
    
    form = <HTMLFormElement>document.querySelector("form");
    let fieldsets: NodeListOf<HTMLFieldSetElement> = document.querySelectorAll("fieldset");

    // Install listeners on fieldsets
    for (let i: number = 0; i < fieldsets.length; i++) {
        let fieldset: HTMLFieldSetElement = fieldsets[i];
        fieldset.addEventListener("change", handleInfoChange);
        fieldset.addEventListener("input", handleInfoChange);
    }

    let buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button");
    for (let i: number = 0; i < buttons.length; i++) {
        let button: HTMLButtonElement = buttons[i];
        button.addEventListener("click", handleInfoChange);
    }

    let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[id=submitbutton]");
    submit.addEventListener("click", sendRecipe);
}

async function sendRecipe(_event: Event): Promise<void> {
    console.log("Send recipe");
    let formData: FormData = new FormData(form);
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    await fetch("hexe.html?" + query.toString());
    alert("Recipe sent!");
}

function handleInfoChange(_event: Event): void {
    let target: HTMLInputElement = <HTMLInputElement>_event.target;

    if (_event.type == "change") {
        switch (target.name) {
            case "Text":
                console.log(target.value);
                let title: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("trankname");
                title.innerHTML = "Potion name: " + target.value;
                break;
            case "Area":
                let description: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("trankbeschreibung");
                description.innerHTML = "Description/Risks: " + target.value;
                break;
            case "DatalistEffect":
                let effect: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("trankwirkung");
                effect.innerHTML = "Effect: " + target.value;
                break;
            case "DauerStepper":
                let duration: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("trankdauer");
                duration.innerHTML = "Duration of effect: " + target.value + " hours";
                break;
        }
    }
    else if (_event.type == "input") {
        switch (target.name) {
            case "MengenSlider":
                let quantity: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("mengenwert");
                quantity.innerHTML = target.value + " piece(s)/drop(s)";
                break;
            case "TemperaturSlider":
                let temp: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("temperaturwert");
                temp.innerHTML = target.value;
                break;
            case "TempEndconditionDur":
                let tempduration: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("TempEndconditionDur");
                tempduration.innerHTML = target.value + " min";
                break;
            case "StirEndconditionDur":
                let stirduration: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("StirEndconditionDur");
                stirduration.innerHTML = target.value + " min";
                break;
            case "intensityslider":
                let stirintensity: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("intensitywert");
                stirintensity.innerHTML = target.value;
            case "RadiogroupEndcondition":
                tempEndcondChecked = target;
                break;
            case "RadiogroupEndconditionStir":
                stirEndcondChecked = target;
        } 
    }
    else if (_event.type == "click") {
        let instructiondiv: HTMLDivElement = <HTMLDivElement>document.getElementById("anweisungsdiv");
        let p: HTMLParagraphElement = document.createElement("p");
        switch (target.id) {
            
            case "addZutat":
                let select: HTMLSelectElement = <HTMLSelectElement>document.getElementById("zutatenSelect");
                let quantity: HTMLInputElement = <HTMLInputElement>document.getElementById("mengenwert");
                p.innerHTML = anweisungscounter + ". Add " + quantity.innerText + " of " + select.value + ".";
                instructiondiv.append(p);
                anweisungscounter += 1;
                break;

            case "addTempinstruction":
                let temp: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("temperaturwert");
                let tempConditionStr: string = "stop when ";
                if (tempEndcondChecked.id == "endradio1") {
                    let tempduration: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("TempEndconditionDur");
                    tempConditionStr += tempduration.innerHTML + " have passed.";
                }
                else if (tempEndcondChecked.id == "endradio2") {
                    let consistency: HTMLInputElement = <HTMLInputElement>document.getElementById("DatalistConsistencyTemp");
                    tempConditionStr += "the potion has reached a " + consistency.value + " consistency.";
                }
                else if (tempEndcondChecked.id == "endradio3") {
                    let color: HTMLInputElement = <HTMLInputElement>document.getElementById("tempcolor");
                    tempConditionStr += "the color of the potion is " + color.value + ".";
                }

                p.innerHTML = anweisungscounter + ". Bring temperature to " + temp.innerText + " °C, " + tempConditionStr;
                instructiondiv.append(p);
                anweisungscounter += 1;
                break;

            case "addStirinstruction":
                let stirintensity: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("intensitywert");
                let stirConditionStr: string = "stop when ";
                if (stirEndcondChecked.id == "endradio1stir") {
                    let tempduration: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("StirEndconditionDur");
                    stirConditionStr += tempduration.innerHTML + " have passed.";
                }
                else if (stirEndcondChecked.id == "endradio2stir") {
                    let consistency: HTMLInputElement = <HTMLInputElement>document.getElementById("DatalistConsistencyStir");
                    stirConditionStr += "the potion has reached a " + consistency.value + " consistency.";
                }
                else if (stirEndcondChecked.id == "endradio3stir") {
                    let color: HTMLInputElement = <HTMLInputElement>document.getElementById("stircolor");
                    stirConditionStr += "the color of the potion is " + color.value + ".";
                }
                p.innerHTML = anweisungscounter + ". Stir with an intensity of " + stirintensity.innerText + ", " + stirConditionStr;
                instructiondiv.append(p);
                anweisungscounter += 1;
                break;
        }
    }
}