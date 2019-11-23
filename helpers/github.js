const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, saveDatabase) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let url = 'https://api.github.com/users/'+ username +'/repos'
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  function callback(error, response, body) {
    if(error){
      console.log(error)
      saveDatabase(error, null);
    }
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      saveDatabase(null, info);
    }
  };

  request(options, callback);
}

//GET https://api.github.com/users/:username/repos

module.exports.getReposByUsername = getReposByUsername;