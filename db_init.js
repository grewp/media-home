
//giving a really rudimentary seed function (only one dim) for my db

seed = function seed (data) {
	let database = new loki('movies.db', { autoload: true, autosave: true });
	//database.addCollection('movies'); 
	let movies = database.getCollection('movies');
	console.log(data);
	data.forEach(function (element) {
		console.log(element);
		movies.insert({
			name: element,
			ID: '',
			owned: ''
		});
	})

	database.close();

}

module.exports = seed;

//debug
// movies.insert({
//     name: 'Back to the Future',
//     ID: 'tt0088763',
//     owned: 'yes'
// });
