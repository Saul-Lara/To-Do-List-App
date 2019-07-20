// User click in the button Add
document.getElementById('AddItem').addEventListener('click', function(){
	console.log('button clicked');
	var value = document.getElementById('Item').value;
	if(value){
		console.log(value);
	}else{
		$("body").overhang({
		  type: "error",
		  message: "Whoops! Empty Field!",
		  duration: 2
		});
	}
});