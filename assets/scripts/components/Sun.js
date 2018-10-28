function Sun(){
	var element = document.getElementById("sun"),
		width = element.offsetWidth;
		marginTop = 0;
		marginLeft = 0;

	setInterval(function(){
		width += 2;

		element.style.width = width + "px";
		element.style.height = width + "px";

		marginTop += 0.5;
		marginLeft += 1.5;

		element.style.top = (80 - marginTop) + "px";
		element.style.left = (210 - marginLeft) + "px";
		
	}, 100);

};