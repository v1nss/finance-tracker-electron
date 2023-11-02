// let form = document.forms[0];
let displayButton = document.querySelector("form button");

function addField(element){

    if(element.previousElementSibling.value.trim() === ""){
        return false;
    }

    let div = document.createElement("div");
    div.setAttribute("class", "field");

    let field = document.createElement("input");
    field.setAttribute("type", "number");
    field.setAttribute("name", "notes[]");

    let plus = document.createElement("span");
    plus.setAttribute("onclick", "addField(this)");
    let plusText = document.createTextNode("+");
    plus.appendChild(plusText);

    let minus = document.createElement("span");
    minus.setAttribute("onclick", "deleteField(this)");
    let minusText = document.createTextNode("-");
    minus.appendChild(minusText);

    form.insertBefore(div, displayButton);
    div.appendChild(field);
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
	// prevent the form to communicate with the server.
	event.preventDefault();

	// Fetch the values from the input fields.
	let data = new FormData(form);

	// Storing the values inside an array so we can handle them.
	// we don't want empty values.
	let notes = [];
    // let expenses = [];
	data.forEach( function(value){
		if(value !== ""){
			notes.push(value);
		}
	});
    // data.forEach( function(text){
	// 	if(value !== ""){
	// 		expenses.push(text);
	// 	}
	// });

	// Output the values on the screen.
	let out = "";
	for(let note of notes){
        // for(let expense of expenses){
        //     out += `
        //     <p>${expense}</p>
        
			
		// `;
        // }
        out += `
            
               <p>${note}</p>
			
		`;
            
		
	}
	document.querySelector(".notes").innerHTML = out;

	// Delete all input elements except the last one.
	let inputFields = document.querySelectorAll(".field");
	inputFields.forEach(function(element, index){
		if(index == inputFields.length - 1){
			element.children[0].value = "";
		}else{
			element.remove();
		}
	});
}