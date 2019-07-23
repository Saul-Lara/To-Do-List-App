// User click in the button Add
document.getElementById('AddItem').addEventListener('click', function(){
	var value = document.getElementById('Item').value;
	if(value){
		addItem(value);
		document.getElementById('Item').value = '';
	}else{
		$("body").overhang({
		  type: "error",
		  message: "Whoops! Empty Field!",
		  duration: 2
		});
	}
});

// Function that allow remove items of list
function removeItem() {
	var item = this.parentNode.parentNode // li tag (Item)
	var parent = item.parentNode;  // accessing the list

	$("body").overhang({
	  type: "confirm",
	  primary: "#40D47E",
	  accent: "#27AE60",
	  yesColor: "#3498DB",
	  message: "Do you want to continue?",
	  callback: function (value) {
	    var response = value ? "Yes" : "No";
	    if (response == "Yes") {
	    	parent.removeChild(item); // Removing item of list
	    }	    
	  }
	});
}

// Function that allow add items in list
function addItem(text) {
	var list = document.getElementById('ToDo');

	var item = document.createElement('li'); // Create a list
	item.innerText = text;

	var buttons = document.createElement('div'); // Create a div
	buttons.classList.add('Buttons');				// Add a class

	var remove = document.createElement('button'); // Create a button
	remove.classList.add('Remove');
	remove.innerHTML = '<span class="fas fa-trash"></span>';
	remove.addEventListener('click', removeItem);	// Add click event for remove item

	var complete = document.createElement('button');
	complete.classList.add('Complete');
	complete.innerHTML = '<span class="far fa-check-square"></span>';

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);
	list.insertBefore(item, list.childNodes[0]); // Insert the item in first place
}