const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  username: String,
  repo: String,
  url: String,
  forks: Number,
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (username, data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.deleteMany({username: username}, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
  var repoInstance = new Repo(data);
  repoInstance.save();
  callback(null, data);
}

let getData = (callback) => {
  Repo.find({}, callback).limit(25).sort({forks: -1});
}

module.exports.save = save;
module.exports.getData = getData;