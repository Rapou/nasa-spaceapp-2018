var App = (function(axios, Earth, Planet, Asteroids, particlesJS){
	var rootElement = document.getElementById("app"),
		loading = {
			planets: true,
			asteroids: true
		},
		datasource = {
			planets : [],
			asteroids : [],
		}, 
		components = {
			PlanetComponents: [],
			AsteroidsComponent: null,
			EarthComponent : new Earth()
		},
		tmp = {},
		methods ={

			initPlanets: function(){
				var i; 
				for(i = 0; i < datasource.planets.length; i++){
					components.PlanetComponents.push(new Planet(datasource.planets[i], rootElement, components.EarthComponent));
				}
			},

			initAsteroids: function(){
				components.AsteroidsComponentnew = new Asteroids(datasource.asteroids, rootElement);
			},

			launchSystem: function(e){

	  			particlesJS.load('background', 'data/particles.json', function(){});

				document.body.classList.remove("loading");
				setTimeout(function(){
					document.body.classList.add("running");
				}, 500);
			},
			start: function(){
				var today = new Date();

				axios.get('data/planets.json', {})
				  	.then(function (response) {
				  		datasource.planets = response.data;
				  		loading.planets = false;
				  	})
				  	.catch(function (error) {
				    	console.log(error);
				  	});

			  	axios.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + '&end_date=' + today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + '&api_key=MvTrTPmE571iG1WTiRqY1MsLQWcCsUq6dK6aeENT', {})
				  	.then(function (response) {
				  		datasource.asteroids = response.data;
 				  		loading.asteroids = false;
				  	})
				  	.catch(function (error) {
				    	console.log(error);
				  	});

				document.getElementById("start").addEventListener("click", methods.launchSystem);

				StartAudioContext(Tone.context, "#start", function(){
					tmp.interval = setInterval(function(){
						if(!loading.asteroids && !loading.planets){
							methods.initPlanets();
					  		methods.initAsteroids();
				  			clearInterval(tmp.interval);
				  			tmp = {};
						}
					}, 40);
				});

			}
		};

	return {
		start: methods.start
	};
})(axios, Earth, Planet, Asteroids, particlesJS);