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

	var complete = document.createElement('button');
	complete.classList.add('Complete');
	complete.innerHTML = '<span class="far fa-check-square"></span>';

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);
	list.insertBefore(item, list.childNodes[0]); // Insert the item in first place
}