"use strict";
var Fireworks;
(function (Fireworks) {
    window.addEventListener("load", handleLoad);
    let form;
    let data;
    function handleLoad(_event) {
        console.log("Fireworks starting");
        generateRockets(data);
        form = document.querySelector("form");
        let fieldset = document.querySelector("fieldset");
        console.log("Fieldset:", fieldset);
        fieldset.addEventListener("change", handleInfoChange);
        fieldset.addEventListener("input", handleInfoChange);
        let submit = document.querySelector("button[id=submitbutton]");
        submit.addEventListener("click", sendRocket);
    }
    function generateRockets(_data) {
        console.log("generate Rockets");
    }
    async function sendRocket(_event) {
        console.log("Send rocket");
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        await fetch("fireworks.html?" + query.toString());
        console.log("QUERY" + query);
        alert("Rocket info sent!");
    }
    function handleInfoChange(_event) {
        let target = _event.target;
        if (_event.type == "change") {
            console.log("Change " + target);
        }
        else if (_event.type == "input") {
            console.log("Input " + target);
        }
    }
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=main.js.map