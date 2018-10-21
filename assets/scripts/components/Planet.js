function Planet(planetData, rootElement){

	var data = planetData,
		view = document.createElement("DIV"),
		viewTitle = document.createElement("DIV"),
		viewVisual = document.createElement("DIV"),
		viewPlanetWrapper = document.createElement("DIV"),
		viewPlanet = document.createElement("DIV"),
		viewInfos = document.createElement("DIV"),
		state = "end", move = "up",
		frequencyMax = 4000, maxSpeedDiff = 172800, 
		moveFrequency = planetData.speed  / maxSpeedDiff * 100,
		filter, frequency = frequencyMax / 100 * moveFrequency,
		interval = null, synths = [],
		planetWidth = 0,

		mFunction = function(sense){
			
			var amt = 0.002;

			if(sense == "up"){
				frequency += moveFrequency / 16;  
			}else{
				frequency -= moveFrequency / 16;  
			}

			viewPlanetWrapper.style.left = (frequency / frequencyMax * 100)  + "%";

			viewPlanet.style.width = planetWidth * ((frequency / frequencyMax)+0.5) + "px";
			viewPlanet.style.height = planetWidth * ((frequency / frequencyMax)+0.5) + "px";


			viewInfos.innerHTML = 	"Colors : " + data.colors[0] + " " + data.colors[1] + " " + data.colors[2] + " <br/>" +
									"Chord : " + data.notes[0] + " " + data.notes[2] + " " + data.notes[2] + "<br/>" +
									"Course : " + ((frequency / frequencyMax) * 100).toFixed(2) + " %";
			
			var i; 
			for(i = 0; i < synths.length; i++){
				synths[i].FM.harmonicity.value = 1 + (frequency / frequencyMax) * amt;
			
				synths[i].filterMove.frequency.linearRampTo(frequency, 0.04);
				synths[i].panner.pan.value = (2 * (frequency / frequencyMax)) - 1;
			}
		
		}, 

		toogle = function(e){

			if(state == "end"){
				var i; 
				for(i = 0; i < synths.length; i++){
					synths[i].FM.triggerAttack(data.notes[i]);
				}
				
				interval = setInterval(function(){

					if(move == "up"){
						if(frequency < frequencyMax){
							mFunction("up");

						}else{
							move = "down";
							mFunction("down");
						}
					}else{
						if(frequency > moveFrequency){
							mFunction("down");
						}else{
							move = "up";
							mFunction("up");
						}
					}
				}, 40);
				view.classList.add("play")
				state = "start";

			}else{
    			clearInterval(interval);

    			var i; 
				for(i = 0; i < synths.length; i++){
					synths[i].FM.triggerRelease(1);
				}
				
				view.classList.remove("play")
				state = "end";
			}
		},

		initSound = function(){
			var i,
				volume =  -(Math.floor(Math.random() * Math.floor(31)) + 1);
			
			for(i = 0; i < data.notes.length; i++){

				synths[i] = {
					'FM' : null, 
					'filterMove' : null,
					'panner': null
				};

				synths[i].FM = new Tone.FMSynth({
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
						'volume' : volume
					}
				});

				synths[i].filterMove = new Tone.Filter({
					'type' : 'lowpass' ,
					'frequency' : frequency ,
					'rolloff' : -24 ,
					'Q' : 6,
					'gain' : 0
				});

				synths[i].panner = new Tone.Panner(0).toMaster();
				synths[i].FM.connect(synths[i].filterMove);
				synths[i].filterMove.connect(synths[i].panner);

			}

		},

		initViews = function(){

			view.classList.add("planet");

			viewTitle.classList.add("planet__title");
			viewTitle.innerHTML = data.name;
			view.appendChild(viewTitle);

			viewVisual.classList.add("planet__visual-wrapper");

			viewPlanetWrapper.classList.add("visual-wrapper");
			viewPlanetWrapper.style.left = moveFrequency + "%";
			viewVisual.appendChild(viewPlanetWrapper);

			viewPlanet.classList.add("visual");
			viewPlanet.classList.add("visual-" + data.sizeRatio);
			viewPlanet.style.background = data.colors[0];
			viewPlanetWrapper.appendChild(viewPlanet);

			view.appendChild(viewVisual);

			viewInfos.classList.add("planet__infos");
			viewInfos.innerHTML = 	"Colors : " + data.colors[0] + " " + data.colors[1] + " " + data.colors[2] + " <br/>" +
									"Chord : " + data.notes[0] + " " + data.notes[2] + " " + data.notes[2] + "<br/>" +
									"Course : " + moveFrequency.toFixed(2) + " %";

			view.appendChild(viewInfos);
			view.addEventListener("click", toogle);
			
			rootElement.appendChild(view);

			planetWidth = viewPlanet.offsetWidth;
			viewPlanet.style.width = planetWidth * ((moveFrequency/100)+0.5) + "px";
			viewPlanet.style.height = planetWidth * ((moveFrequency/100)+0.5) + "px";

		};

	initSound();
	initViews();	

};