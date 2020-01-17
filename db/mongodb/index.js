// 

const mongoose = require('mongoose');
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect('mongodb://localhost:27017/badmovies', { useNewUrlParser: true });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('**** YOURE CONNECTED TO MONGO ****');
})

const badMovieSchema = new mongoose.Schema({
  title: {type: String, unique: true},
  vote_average: Number,
  id: Number,
  release_date: String,
  overview: String,
  poster_path: String
})


const BadMovie = mongoose.model('BadMovie', badMovieSchema);


module.exports.db = db

module.exports.BadMovie = BadMovie;
