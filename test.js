var lmcsv = require("./index.js")


var csv = new lmcsv("test.csv")
csv.writeRow({h1: "bar", h2:"boot"}, function(err){
  if(err) throw err
  csv.writeRow({h2: "bar", h3:"bzzoot", h4:"baz"}, function(err){
    if(err) throw err
    csv.writeRow({ h5: "what"}, function(err){
      if(err) throw err

    })
  })

})
