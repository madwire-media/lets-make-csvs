# lets-make-csvs
Let's make CSV's from row objects


# What
I wanted to create an iterative CSV, one row at a time.  But I also want ot add properties.

This module will make a CSV one row at a time. It will also modify the CSV header as it goes. Because it uses Node pipes and buffers, it can handle super large files.  

# Usage

`npm install https://github.com/madwire-media/lets-make-csvs.git`

###### Use a github token, because this module is probably private

# example
var lmcsv = require("lets-make-csvs")


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

### CSV result:
Open the result in your Excel or Google Sheets and you should see something like this:
| A   | B    | C      | D   | E    | F   |
|:--- |:---- |:------ |:--- |:---- |:--- |
| h1  | h2   | h3     | h4  | h5   |     |
| bar | boot |        |     |      |     |
|     | bar  | bzzoot | baz |      |     |
|     |      |        |     | what |     |
|     |      |        |     |      |     |
