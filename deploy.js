var child_process = require('child_process');
var inquirer = require("inquirer");
var nodegit = require("nodegit");
var open = require("open");

var DEBUG = false;
var URL = 'cil.shanghai.minglabs.com';
var ansibleFolder = __dirname + '/ansible/';

function forb(aFood) {
  return function(answers) {
    return answers[aFood];
  }
}

inquirer.prompt([{
  type: "list",
  name: "forb",
  message: "Where you want to deploy to?",
  choices: [
    "stage"
  ]
}, {
  type: "confirm",
  name: "updatelatest",
  message: "Do you want to updated the current." + URL + "?",
  default: function() {
    return false;
  }
}, ], function(answers) {

  var forb = (answers.forb == 'stage') ? "deploy-stage.yml" : "deploy.yml";

  var vars = {
    "updatecurrent": answers.updatelatest,
  };
  var params = [];

  nodegit.Repository.open('./').then(function(repository) {
    repository.getHeadCommit().then(function(commit) {
      var id = commit.id().tostrS();
      var url1 = "http://" + id + "." + URL;
      var url2 = "http://current." + URL;
      vars.gitid = id;
      params.push(ansibleFolder + forb); //file
      params.push("--extra-vars", JSON.stringify(vars)) // vars
      params.push("--limit", "stage"); // server
      params.push("-i", "server"); // inventory file name
      if(DEBUG){
        params.push('-vvvv');
      }

      var wc = child_process.spawn('ansible-playbook', params, {
        cwd: ansibleFolder,
        stdio: 'inherit',
        env: process.env
      });
      wc.on('close', function(code) {
        if (answers.updatelatest) {
          open(url2);
          console.log('U can access to build under:');
          console.log('1: '+ url1);
          console.log('2: '+ url2);
        } else {
          open(url1);
          console.log('U can access to build under:');
          console.log('1: '+ url1);
        }
      });
    });
  }).catch(function(e){
    console.log(e);
  });



});
