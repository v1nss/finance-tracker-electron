let displayButton = document.querySelector("form button");

function addField(element){

    if(element.previousElementSibling.value.trim() === ""){
        return false;
    }

    let div = document.createElement("div");
    div.setAttribute("class", "field");

    let numfield = document.createElement("input");
	let textfield = document.createElement("input");
    numfield.setAttribute("type", "number");
    numfield.setAttribute("name", "notes[]");
	textfield.setAttribute("type", "text");
	textfield.setAttribute("name", "expenses[]");
	

    let plus = document.createElement("span");
    plus.setAttribute("onclick", "addField(this)");
    let plusText = document.createTextNode("+");
    plus.appendChild(plusText);

    let minus = document.createElement("span");
    minus.setAttribute("onclick", "deleteField(this)");
    let minusText = document.createTextNode("-");
    minus.appendChild(minusText);

    form.insertBefore(div, displayButton);
	div.appendChild(textfield);
    div.appendChild(numfield);
    div.appendChild(plus);
    div.appendChild(minus);

    element.nextElementSibling.style.display = "block";

    element.style.display = "none";
}

function deleteField(element){
    element.parentElement.remove();
}

let form = document.forms[0];
form.addEventListener("submit", fetchTextNotes);
function fetchTextNotes(event){

	event.preventDefault();

	let dataContainer = new FormData(form);

	let data = [];
	dataContainer.forEach( function(value){
		if(value !== ""){
			data.push(value);
		}
	});

	let num = data.filter(item => !isNaN(item));

	let expenses = data.filter(item => isNaN(item));
	
	num = num.map(function(str){
		return parseInt(str);
	});
	
	// Output the values on the screen.
	let out = "";
	let out1 = "";
	for(let nums of num){
        out += `
            <p>${nums}</p>
		`;
	}
	
	for(let expense of expenses){
        out1 += `
            <p>${expense}</p>
		`;
	}
	console.log(num);
	console.log(expenses);

	document.querySelector(".notes").innerHTML = out;
	document.querySelector(".notes").innerHTML = out1;

	// Delete all input elements except the last one.
	let inputFields = document.querySelectorAll(".field");
	inputFields.forEach(function(element, index){
		if(index == inputFields.length - 1){
			element.children[0].value = "";
			element.children[1].value = "";
		}else{
			element.remove();
		}
	});
}