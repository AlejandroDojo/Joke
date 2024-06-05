const Joke = require('./../models/jokesModels');

// Obtener todos los chistes
module.exports.jokes = (req, res) => {
    return Joke.find()
        .then((jokes) => {
            return res.status(200).json(jokes);
        })
        .catch((error) => {
            return res.status(406).json({message: 'Is there a error', error});
        })
}

// Obtener chiste Aleatorio
module.exports.random = (req, res) => {
    return Joke.find()
        .then((jokes) => {
            const random = Math.floor(Math.random() * ((jokes.length-1) - 0 + 1) + 0); // random
            return res.status(200).json(jokes[random]);
        })
        .catch((error) => {
            return res.status(406).json({message: 'Is there a error', error});
        })
}

// Obtener un solo chiste
module.exports.jokeId = (req, res) => {
    const {_id} = req.params;

    Joke.findOne({_id})
        .then((joke) => {
            if(!joke) {
                return res.status(404).json({message: "We dont have that joke!"});
            }
            return res.status(202).json({
                id: joke._id,
                setup: joke.setup,
                punchline: joke.punchline
            });
        })
        .catch((error) => {
            return res.status(406).json({message: 'Something goes wrong', error});
        })
}
// Crear un chiste
module.exports.newJoke = (req, res) => {
    const {setup, punchline} = req.body;

    if (setup === "" || punchline === "") {
        return res.status(406).json({message: "You need to put something larger than 10"});
    }
    const newJoke = {
        setup: setup,
        punchline: punchline
    }
    return Joke.create(newJoke)
        .then((createdJoke) => {
            return res.status(201).json(createdJoke);
        })
        .catch((error) => {
            res.status(500).json({message: "Something goes wrong", error})
        })
}

// Actualizar un chiste
module.exports.updateJoke = (req, res) => {
    //new Date().toLocaleString()
    const {setup, punchline} = req.body;
    const {_id} = req.params
    let currentTime = new Date().toLocaleString()
    const updatedJoke = {
        setup: setup,
        punchline: punchline,
        updatedAt: currentTime
    }

    return Joke.findByIdAndUpdate({_id: _id}, updatedJoke, {returnOriginal: false})
        .then((currentJoke) => {
            return res.status(200).json(currentJoke)
        })
        .catch((error) => {
            return res.status(406).json({message: "Is there a error", error})
    })
}

// Eliminar un chiste
module.exports.deleteJoke = (req, res) => {
    return Joke.deleteOne({_id: req.params._id})
        .then((removedJoke) => {
            console.log("The user ", removedJoke, " has been deleted.");
            return res.status(204).json(removedJoke);
        })
        .catch((error) => res.status(500).json({message: "Is there a error", error}))
}