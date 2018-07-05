function lmcsv(filename) {
  this.columns = []
  this.filename = filename
  //fs.writeFileSync(filename, "\n");
}

lmcsv.prototype.writeRow = writeRow
lmcsv.prototype.writeRowArray = writeRowArray

function writeRow(row, cb){
  console.log("wr->",this.filename)
  return cb(null)
}

function writeRowArray(rows, cb){
  console.log("wra->",this.filename)
  writeRow(rows[0], function(err){
    return cb(null)
  })
}


var csv = lmcsv("test.csv")
writeRow({foo:"bar"}, function(err){
  setTimeout(function(){
    writeRowArray({foo:"bar"}, function(err){

    })
  },10)
})
