//Select one db to work with:

//For SQL
const sqlDb = require('../../db/sql');
//For Mongo
const mongoDb = require('../../db/mongodb') // the database connection

//My Imports
const {db, BadMovie} = require('../../db/mongodb');

module.exports = {
    saveToDb: (req, res) => {
        let movie = req.body;
        let badMovie = new BadMovie({
            title: movie.title,
            vote_average: movie.vote_average,
            id: movie.id,
            release_date: movie.release_date,
            overview: movie.overview,
            poster_path: movie.poster_path
        });

        // let query = BadMovie.find();
        // query.exec((err, docs) => {
        //     console.log('ARE THESE THE DOCUMENTS?:', docs);
        // })

        badMovie.save((err, result) => {
            if (err) {console.log('Error saving movie:', err)}
            else {
                console.log('MOVIE WAS SAVED:', result)
                let query = BadMovie.find();
                query.exec((err, docs) => {
                    res.send(docs);
                })
            }
        })
    },

    deleteFromDb: (req, res) => {
        let toDelete = req.body;
        BadMovie.deleteOne({id: toDelete.id}, (err) => {
            if (err) {
                console.log('Error deleting entry:', err);
            } else {
                console.log('Movie was deleted from DB!')

                let query = BadMovie.find();
                query.exec((err, docs) => {
                    res.send(docs);
                });
    
            }
        })
    }
}