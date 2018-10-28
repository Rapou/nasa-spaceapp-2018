function Earth(){

	var data = {
		speed: 104400,
		maxSpeedDiff: 172800,
		frequencyMax: 4000,
		move: null,
		frequency : null, 
		direction : "up"
	},

	interval = null,

	eFunction = function(sense){
			
		if(sense == "up"){
			data.frequency += data.move / 16;  
		}else{
			data.frequency -= data.move / 16;  
		}

	}, 

	moveEarth = function(){
		if(data.direction == "up"){
			if(data.frequency < data.frequencyMax){
				eFunction("up");
			}else{
				data.direction = "down";
				eFunction("down");
			}
		}else{
			if(data.frequency > 50){
				eFunction("down");
			}else{
				data.direction = "up";
				eFunction("up");
			}
		}
	};

	data.move = data.speed / data.maxSpeedDiff * 100;
	data.frequency = data.frequencyMax / 100 * data.move;

	interval = setInterval(moveEarth, 40);


	this.getFrequency = function(){
		return data.frequency;
	}

}