// Check if To Do List is available in localStorage and the data is added. if isn't available data is empty.
// condition ? value_if_is_true : value_if_is_false
var data = (localStorage.getItem('ToDoList')) ? JSON.parse(localStorage.getItem('ToDoList')) : {
	ToDo:[],
	Completed:[]
};

renderList();

// User click in the button Add
document.getElementById('AddItem').addEventListener('click', function(){
	var value = document.getElementById('Item').value;
	add(value);
});

// User press enter key in the input
document.getElementById('Item').addEventListener('keydown', function(e){
	var value = this.value;
	if(e.code === 'Enter' || e.code === 'NumpadEnter'){
		add(value);
	}
});

// User click in the button Clear
document.getElementById('DeleteItems').addEventListener('click', function(){
	deleteList();
});

// Function that check if the input value is empty.
function add(value) {
	if(value){
		addItem(value);
		document.getElementById('Item').value = '';

		data.ToDo.push(value); // Add a new item to array
		dataUpdated();
	}else{
		$("body").overhang({
		  type: "error",
		  message: "Whoops! Empty Field!",
		  duration: 2
		});
	}
}

// Function that allow change items to completed list or re-add to the to do list
function completeItem() {
	var item = this.parentNode.parentNode // li tag (Item)
	var parent = item.parentNode;  // accessing the list
	var id = parent.id; // Id of list
	var value = item.innerText;

	if(id === 'ToDo'){
		data.ToDo.splice(data.ToDo.indexOf(value), 1);
		data.Completed.push(value);
	}else{
		data.Completed.splice(data.Completed.indexOf(value), 1);
		data.ToDo.push(value);
	}

	dataUpdated();

	// Check if the item should be added to completed list or should be re-add to the to do list
	// condition ? value_if_is_true : value_if_is_false
	var target = (id === 'ToDo') ? document.getElementById('Completed') : document.getElementById('ToDo');

	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]);	
}

// Function that allow remove items of list
function removeItem() {
	var item = this.parentNode.parentNode // li tag (Item)
	var parent = item.parentNode;  // accessing the list
	var id = parent.id; // Id of list
	var value = item.innerText;

	$("body").overhang({
	  type: "confirm",
	  primary: "#ebae07",
	  accent: "#c99400",
	  yesColor: "#3498DB",
	  message: "Do you want to remove this item?",
	  callback: function (value) {
	    var response = value ? "Yes" : "No";
		if (response == "Yes") {

		   	if(id === 'ToDo'){
				data.ToDo.splice(data.ToDo.indexOf(value), 1);
			}else{
				data.Completed.splice(data.Completed.indexOf(value), 1);
			}

			dataUpdated();

	    	parent.removeChild(item); // Removing item of list
	    }	    
	  }
	});
}

// Function that allow add items in list
function addItem(text, completed = false) {
	var list = (completed) ? document.getElementById('Completed') :document.getElementById('ToDo');

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
	complete.addEventListener('click', completeItem);	// Add click event for remove item

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);
	list.insertBefore(item, list.childNodes[0]); // Insert the item in first place
}

// Function that allow save items in localstorage
function dataUpdated() {
	localStorage.setItem('ToDoList', JSON.stringify(data));
}

// Function that renders the list.
function renderList() {
	if(!data.ToDo.length && !data.Completed.length) return;

	for (var i = 0; i < data.ToDo.length; i++) {
		var value = data.ToDo[i];
		addItem(value);
	}

	for (var j = 0; j < data.Completed.length; j++) {
		var value = data.Completed[j];
		addItem(value, true)
	}
}

// Function that allow clear all items in localstorage
function deleteList(){
	if(!data.ToDo.length && !data.Completed.length)return;

	$("body").overhang({
	  type: "confirm",
	  primary: "#ebae07",
	  accent: "#c99400",
	  yesColor: "#3498DB",
	  message: "Do you want to remove all items?",
	  callback: function (value) {
	    var response = value ? "Yes" : "No";
		if (response == "Yes") {
			localStorage.removeItem('ToDoList');
			location.reload();  	
	    }	    
	  }
	});
}