var App = (function(axios, Planet, Asteroids){
	var rootElement = document.getElementById("app"),
		datasource = {
			planets : [],
			asteroids : []
		}, 
		components = {
			PlanetComponents: [],
			AsteroidsComponent: null,
		},
		methods ={
			initPlanets: function(){
				var i; 
				for(i = 0; i < datasource.planets.length; i++){
					components.PlanetComponents.push(new Planet(datasource.planets[i], rootElement));
				}
			},

			initAsteroids: function(){
				components.AsteroidsComponentnew = new Asteroids(datasource.asteroids, rootElement);
			},

			start: function(){
				var today = new Date();

				axios.get('data/planets.json', {})
				  	.then(function (response) {
				  		datasource.planets = response.data;
				  		methods.initPlanets();
				  	})
				  	.catch(function (error) {
				    	console.log(error);
				  	});

			  	axios.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + '&end_date=' + today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + '&api_key=MvTrTPmE571iG1WTiRqY1MsLQWcCsUq6dK6aeENT', {})
				  	.then(function (response) {
				  		datasource.asteroids = response.data;
				  		methods.initAsteroids();
				  	})
				  	.catch(function (error) {
				    	console.log(error);
				  	});
			}
		};

	return {
		start: methods.start
	};

})(axios, Planet, Asteroids);