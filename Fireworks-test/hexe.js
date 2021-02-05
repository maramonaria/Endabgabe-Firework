"use strict";
window.addEventListener("load", handleLoad);
let anweisungscounter = 1;
let tempEndcondChecked;
let stirEndcondChecked;
let form;
function handleLoad(_event) {
    form = document.querySelector("form");
    let fieldsets = document.querySelectorAll("fieldset");
    // Install listeners on fieldsets
    for (let i = 0; i < fieldsets.length; i++) {
        let fieldset = fieldsets[i];
        fieldset.addEventListener("change", handleInfoChange);
        fieldset.addEventListener("input", handleInfoChange);
    }
    let buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener("click", handleInfoChange);
    }
    let submit = document.querySelector("button[id=submitbutton]");
    submit.addEventListener("click", sendRecipe);
}
async function sendRecipe(_event) {
    console.log("Send recipe");
    let formData = new FormData(form);
    let query = new URLSearchParams(formData);
    await fetch("hexe.html?" + query.toString());
    alert("Recipe sent!");
}
function handleInfoChange(_event) {
    let target = _event.target;
    if (_event.type == "change") {
        switch (target.name) {
            case "Text":
                console.log(target.value);
                let title = document.getElementById("trankname");
                title.innerHTML = "Potion name: " + target.value;
                break;
            case "Area":
                let description = document.getElementById("trankbeschreibung");
                description.innerHTML = "Description/Risks: " + target.value;
                break;
            case "DatalistEffect":
                let effect = document.getElementById("trankwirkung");
                effect.innerHTML = "Effect: " + target.value;
                break;
            case "DauerStepper":
                let duration = document.getElementById("trankdauer");
                duration.innerHTML = "Duration of effect: " + target.value + " hours";
                break;
        }
    }
    else if (_event.type == "input") {
        switch (target.name) {
            case "MengenSlider":
                let quantity = document.getElementById("mengenwert");
                quantity.innerHTML = target.value + " piece(s)/drop(s)";
                break;
            case "TemperaturSlider":
                let temp = document.getElementById("temperaturwert");
                temp.innerHTML = target.value;
                break;
            case "TempEndconditionDur":
                let tempduration = document.getElementById("TempEndconditionDur");
                tempduration.innerHTML = target.value + " min";
                break;
            case "StirEndconditionDur":
                let stirduration = document.getElementById("StirEndconditionDur");
                stirduration.innerHTML = target.value + " min";
                break;
            case "intensityslider":
                let stirintensity = document.getElementById("intensitywert");
                stirintensity.innerHTML = target.value;
            case "RadiogroupEndcondition":
                tempEndcondChecked = target;
                break;
            case "RadiogroupEndconditionStir":
                stirEndcondChecked = target;
        }
    }
    else if (_event.type == "click") {
        let instructiondiv = document.getElementById("anweisungsdiv");
        let p = document.createElement("p");
        switch (target.id) {
            case "addZutat":
                let select = document.getElementById("zutatenSelect");
                let quantity = document.getElementById("mengenwert");
                p.innerHTML = anweisungscounter + ". Add " + quantity.innerText + " of " + select.value + ".";
                instructiondiv.append(p);
                anweisungscounter += 1;
                break;
            case "addTempinstruction":
                let temp = document.getElementById("temperaturwert");
                let tempConditionStr = "stop when ";
                if (tempEndcondChecked.id == "endradio1") {
                    let tempduration = document.getElementById("TempEndconditionDur");
                    tempConditionStr += tempduration.innerHTML + " have passed.";
                }
                else if (tempEndcondChecked.id == "endradio2") {
                    let consistency = document.getElementById("DatalistConsistencyTemp");
                    tempConditionStr += "the potion has reached a " + consistency.value + " consistency.";
                }
                else if (tempEndcondChecked.id == "endradio3") {
                    let color = document.getElementById("tempcolor");
                    tempConditionStr += "the color of the potion is " + color.value + ".";
                }
                p.innerHTML = anweisungscounter + ". Bring temperature to " + temp.innerText + " °C, " + tempConditionStr;
                instructiondiv.append(p);
                anweisungscounter += 1;
                break;
            case "addStirinstruction":
                let stirintensity = document.getElementById("intensitywert");
                let stirConditionStr = "stop when ";
                if (stirEndcondChecked.id == "endradio1stir") {
                    let tempduration = document.getElementById("StirEndconditionDur");
                    stirConditionStr += tempduration.innerHTML + " have passed.";
                }
                else if (stirEndcondChecked.id == "endradio2stir") {
                    let consistency = document.getElementById("DatalistConsistencyStir");
                    stirConditionStr += "the potion has reached a " + consistency.value + " consistency.";
                }
                else if (stirEndcondChecked.id == "endradio3stir") {
                    let color = document.getElementById("stircolor");
                    stirConditionStr += "the color of the potion is " + color.value + ".";
                }
                p.innerHTML = anweisungscounter + ". Stir with an intensity of " + stirintensity.innerText + ", " + stirConditionStr;
                instructiondiv.append(p);
                anweisungscounter += 1;
                break;
        }
    }
}
//# sourceMappingURL=hexe.js.map