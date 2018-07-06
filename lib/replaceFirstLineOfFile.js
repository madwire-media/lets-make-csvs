const fs = require('fs');

module.exports = function (filename, newFirstLine, cb) {
  var firstLineRemoved = false;
  var writeFile = "./" + generateRando(15)+".tmp"

  const file = fs.createReadStream(filename);
  const file2 = fs.createWriteStream(writeFile)

  file.on('data', (chunk) => {
    //console.log('chunk')
    var firstLineChunkLength

    const newFirstLineBuff = new Buffer.alloc(newFirstLine.length)
    newFirstLineBuff.write(newFirstLine)

    if (!firstLineRemoved) {
      chunk.forEach(function(e, i) {
        if (e === 10 && !firstLineRemoved) {
          firstLineChunkLength = i + 1
          firstLineRemoved = true
        }
      })
      if (typeof firstLineChunkLength === "number") {
        var copyToBuff = new Buffer.alloc(chunk.length - firstLineChunkLength)
        chunk.copy(copyToBuff, 0, firstLineChunkLength)
        file2.write(Buffer.concat([newFirstLineBuff, copyToBuff]))
      }
    } else {
      file2.write(chunk);
    }
  });
  file.on('end', () => {
    file2.close(() =>{
        fs.rename(writeFile, filename,function(err){
          if(err) {
            console.log("error on temp file rename", writeFile, "->", filename, err)
            return cb(err)
          }
          return cb(null);
        })
    })
    
  })

}

function generateRando(len) {
  if(typeof len != "number") len =12
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
