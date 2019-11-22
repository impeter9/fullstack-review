const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  console.log('heyyyy')
  console.log(username)
  let url = 'https://api.github.com/users/'+ username +'/repos'
  console.log(url)
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  console.log('heyyyy2')
  function callback(error, response, body) {
    console.log('heyyyy3')
    if(error){
      console.log(error)
      console.log('error bro')
    }
    console.log(body);
    console.log(response.statusCode);
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      console.log(info.stargazers_count + " Stars");
      console.log(info.forks_count + " Forks");
    }
  };

  request(options, callback);
}

//GET https://api.github.com/users/:username/repos

module.exports.getReposByUsername = getReposByUsername;