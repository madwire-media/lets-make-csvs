const replaceFirstLineOfFile = require("file-firstline-replace")
const fs = require('fs')
const async = require('async')

module.exports = lmcsv

function lmcsv(filename) {
  this.columns = []
  this.filename = filename
  fs.writeFileSync(filename, "\n");
}

lmcsv.prototype.writeRowArray = writeRowArray

function writeRowArray(data, cb){
  var that = this
  lmcsv.prototype.writeRow(data[0], function(err){
    if(err) return cb(err)
    return cb(null)
  })
  async.eachSeries(data, function eachRow(row, cb){
    console.log(this.columns)

  }.bind(this), function endEachRow(err){
    if(err) return cb(err)
    return cb(null)
  })
}

lmcsv.prototype.writeRow = writeRow

var oldheader = ""

function writeRow(data, cb) {
  var that = this

  if (typeof cb != "function") cb = function(err) {}
  let header = ""
  let row = ""

//  console.log('-->',this.columns)

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
      if(s === "") s = " "
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
    if(oldheader === header) return cb(null)
    oldheader = header


    // TODO: Warning - multiple async writes at the same time here could create a problem. Implement header lock.
    replaceFirstLineOfFile(that.filename, header, function(err) {
      if (err) return cb(err)
      return cb(null)
    })
  })
}
