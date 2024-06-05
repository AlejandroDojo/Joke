const JokesController = require('./../controller/jokesController');

module.exports = (app) => {
    app.get('/api/jokes', JokesController.jokes);
    app.get('/api/jokes/random', JokesController.random);
    app.get('/api/jokes/:_id', JokesController.jokeId);
    app.post('/api/jokes/new', JokesController.newJoke);
    app.put('/api/jokes/update/:_id', JokesController.updateJoke);
    app.delete('/api/jokes/delete/:_id', JokesController.deleteJoke); 
}