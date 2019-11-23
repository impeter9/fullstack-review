const express = require('express');
let app = express();
let bodyParser = require('body-parser');
const helper = require('../helpers/github.js');
const db = require('../database/index.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.username;
  helper.getReposByUsername(username, function(error, info) {
    for (let i = 0; i < info.length; i++) {
      let obj = {
        username: info[i].owner.login,
        repo: info[i].name,
        url: info[i].html_url,
        forks: info[i].forks_count,
        stars: info[i].stargazers_count,
      }
      db.save(username, obj, function(err, data) {
        if (err) {
          throw (err);
        } else {
          console.log('Saved!')
        }
      })
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getData(function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});