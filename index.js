const fileman = require("./lib/fileman.js")
const fs = require('fs')
module.exports = lmcsv

function lmcsv(filename){
  this.columns = []
  this.filename = filename
  fs.writeFileSync(filename, "placeholder\n");

}

lmcsv.prototype.writeRow = function(data, cb){
    var that = this

    if(typeof cb != "function") cb = function(err){ }
    let header = ""
    let row = ""

    Object.keys(data).forEach(function(col_key, i){
      if(!this.columns.includes(col_key)) this.columns.push(col_key)
    }.bind(this))

    this.columns.forEach(function(column, i){
      if(typeof column === "string"){
        // Replace quotes in string
        column.replace(/"/g,'""')
        // add header data
        header += `"${column}",`
      }
      if(typeof data[column] === "string"){
        // Replace quotes in string
        data[column].replace(/"/g,'""')
        // add row data
        row += `"${data[column]}",`
      } else {
        row += `" ",`
      }

    })
    // remove trailing commas
    header = header.slice(0, -1)
    row = row.slice(0,-1)



    fileman.removeFirstLine(that.filename, function(err){
      if(err) return cb(err)

      fileman.insertFirstLine(that.filename, header, function(err){
        if(err) return cb(err)

        fs.appendFile(that.filename,row, function (err) {
          if (err) return cb(err);
          
          return cb(null)
        });

      })
    })
}
