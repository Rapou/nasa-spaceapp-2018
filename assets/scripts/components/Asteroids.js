function Asteroids(asteroidsData, rootElement){

	var today = new Date(),
		data = asteroidsData.near_earth_objects[today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()],
		view = document.createElement("DIV"),
		move = "up", frequencyMax = 4000,
		activeAsteroid = 0,
		width = view.offsetWidth, note = 'A1', time = "8n";

		findNoteAndTime = function(){
			if(data[activeAsteroid].absolute_magnitude_h > 27){
				note = "A6";
			}else{
				if(data[activeAsteroid].absolute_magnitude_h > 25){
					note = "A5";
				}else{
					note = "A3";
				}
			}

			if(data[activeAsteroid].estimated_diameter.kilometers.estimated_diameter_min < 0.1){
				time = "16n";
			}else{
				if(data[activeAsteroid].estimated_diameter.kilometers.estimated_diameter_min < 0.2){
					time = "12n";
				}else{
					time = "8n";
				}
			}
		},

		randomAsteroid = function(){
			var randTime = Math.floor(Math.random() * Math.floor(100)) * 1000,
				randPosition = Math.floor(Math.random() * Math.floor(5)) + 1;

			findNoteAndTime();
			
			view.classList.add("position-" + randPosition);

			setTimeout(function(){
				synth.triggerAttackRelease(note, time);
				view.classList.add("move");
				setTimeout(function(){
					view.classList.remove("move");
					view.classList.remove("position-" + randPosition);
					
					if((activeAsteroid + 1) == data.length){
						activeAsteroid = 0;
					}else{
						activeAsteroid += 1;
					}

					randomAsteroid();
				}, 800);
			}, randTime);
		};

	view.classList.add("asteroids");
	rootElement.appendChild(view);

	var synth = new Tone.FMSynth({
		"modulationIndex" : 12.22,
		"envelope" : {
			"attack" : 0.01,
			"decay" : 0.2
		},
		"modulation" : {
			"type" : "sawtooth"
		},
		"modulationEnvelope" : {
			"attack" : 0.2,
			"decay" : 0.01
		},
		"volume":{
			'volume'  : -12
		}
	}).toMaster();

	randomAsteroid();
	

};