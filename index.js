const replaceFirstLineOfFile = require("./lib/replaceFirstLineOfFile.js")
const fs = require('fs')
const async = require('async')

module.exports = lmcsv

function lmcsv(filename) {
  this.columns = []
  this.filename = filename
  fs.writeFileSync(filename, "\n");
}


// lmcsv.prototype.writeRowArray = writeRowArray



// function writeRowArray(data, cb){
//   var that = this
//   async.eachSeries(data, function eachRow(row, cb){
//     console.log(row)
//     return writeRow(row, function(err){
//       if(err) return cb(err)
//       return cb(null)
//     })
//   }, function endEachRow(err){
//     if(err) return cb(err)
//     return cb(null)
//   })
// }



lmcsv.prototype.writeRow = writeRow


function writeRow(data, cb) {
  var that = this

  if (typeof cb != "function") cb = function(err) {}
  let header = ""
  let row = ""

  Object.keys(data).forEach(function(col_key, i) {

    if (!this.columns.includes(col_key)) this.columns.push(col_key)
  }.bind(this))

  this.columns.forEach(function(column, i) {
    if (typeof column === "string") {
      // Replace quotes in string
      column.replace(/"/g, '""')
      // add header data
      header += `"${column}",`
    }
    if (typeof data[column] === "string") {
      // Replace quotes in string
      var s = data[column].replace(/"/g, '""')
      // add row data
      row += `"${s}",`
    } else if(typeof data[column] === "number"){
      row += `"${data[column]}",`
    } else if(typeof data[column] === "object"){
      var s = JSON.stringify(data[column])
      s = s.replace(/"/g, '""')
      row += `"${s}",`
    } else if(typeof data[column] === "boolean"){
      row += `"${data[column].toString()}",`
    } else {
      row += `" ",`
    }
  })
  // remove trailing commas
  header = header.slice(0, -1) + "\n"
  row = row.slice(0, -1)+"\n"


  fs.appendFile(that.filename,row,function(err){
    if(err) return cb(err)
    replaceFirstLineOfFile(that.filename, header, function(err) {
      if (err) return cb(err)
      return cb(null)
    })
  })
}
