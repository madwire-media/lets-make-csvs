const async = require('async')
let lmcsv = require("./index.js")

let csv = new lmcsv("test.csv")


let myobj = [{
  "id": 1,
  "first_name": "Hartley",
  "last_name": "Mulvenna",
  "email": "hmulvenna0@delicious.com",
  "gender": "Male",
  "ip_address": "6.25.240.135",
  "hobbies": ["fishing", "camping", "hiking"]
}, {
  "id": 2,
  "first_name": "Antonio",
  "last_name": "Pigne",
  "email": "apigne1@feedburner.com",
  "gender": "Male",
  "ip_address": "102.234.210.24",
  "hobbies": ["bowling", "music"],
  "farm animals":{
    "pigs":3,
    "cows":{
      "male":2,
      "female":1
    },
    "horses":1
  }
}, {
  "id": 3,
  "first_name": "Gamaliel",
  "last_name": "Graser",
  "email": "ggraser2@nymag.com",
  "SAT score": 1420
}, {
  "id": 4,
  "first_name": "Celestyna",
  "last_name": "Pawels",
  "email": "cpawels3@home.pl",
  "gender": "Female",
  "ip_address": "18.17.253.197",
  "age": 22
}, {
  "id": 5,
  "first_name": "Mommy",
  "last_name": "Caitlin",
  "email": "mcaitlin4@smh.com.au",
  "gender": "Female",
  "ip_address": "213.145.160.242"
}, {
  "id": 6,
  "first_name": "Nettle",
  "last_name": "Mordey",
  "email": "nmordey5@ox.ac.uk",
  "gender": "Female",
  "ip_address": "178.58.2.233",
  "occupation":"Engineer"
}]
//
// async.eachSeries(myobj, function eachRow(row, cb) {
//   csv.writeRow(row, function(err) {
//     if (err) return cb(err)
//     return cb(null)
//   })
// }, function endEachRow(err) {
//   if (err) throw err
//   console.log("done")
// })

csv.writeRowArray(myobj, function(err){
  console.log('done')
})
