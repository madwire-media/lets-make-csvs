const fs = require('fs');
const readline = require('readline');

module.exports = {
  removeFirstLine: function(srcPath, done) {
    var destPath = generateRando() + ".tmp"


    var rl = readline.createInterface({
      input: fs.createReadStream(srcPath)
    });
    var output = fs.createWriteStream(destPath);
    var firstRemoved = false;

    rl.on('line', (line) => {
      if (!firstRemoved) {
        firstRemoved = true;
        return;
      }
      output.write(line + '\n');
    }).on('close', () => {
      fs.unlink(srcPath, function(err){
        if(err) return done(err)
        fs.rename(destPath, srcPath, function(err){
          if(err) return done(err)
          return done(null);
        })
      })
    })
  },
  insertFirstLine: function(srcPath, insertString, done) {
    var destPath = generateRando() + ".tmp"
    var firstAdded = false;

    var rl = readline.createInterface({
      input: fs.createReadStream(srcPath)
    });

    var output = fs.createWriteStream(destPath);


    rl.on('line', (line) => {

      if (!firstAdded) {
        firstAdded= true;
        line = insertString+ "\n" + line

      }
      output.write(line + '\n');
    }).on('close', (f) => {
      if(!firstAdded)
        // Seems like if it's an empty-ish file, above never fires.  So let's append the file
        console.log('append')
        fs.appendFile(destPath, insertString +"\n", function (err) {
          if(err) return done(err)

          return finish()
        })
      } else {
        return finish()
      }
      function finish(){
        console.log('unlink')
        fs.unlink(srcPath, function(err){
          if(err) return done(err)
          console.log('rename')
          setTimeout(function(){
            fs.rename(destPath, srcPath, function(err){
              if(err) return done(err)
              return done(null);
            })
          },1500)

        })
      }
    })
  }
}

function generateRando(len) {
  if(typeof len != "number") len =12
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
