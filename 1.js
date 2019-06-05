var fs = require('fs')
var process = require('child_process')
var p = process.exec('node /home/wizard1988/freenity.news/http/2.js', function (error, stdout, stderr) {
  if (error) console.log(error.code)
})