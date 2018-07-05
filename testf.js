var replaceFirstLineOfFile = require("./lib/replaceFirstLineOfFile.js")

replaceFirstLineOfFile("./test2.csv", "STUFF!!", function(err){
  if(err) throw err
  console.log('hixx')
})
