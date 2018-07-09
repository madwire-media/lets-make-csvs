# lets-make-csvs
Let's make CSV's from row objects


# What
I wanted to create an iterative CSV, one row at a time.  But I also want ot add properties.

This module will make a CSV one row at a time. It will also modify the CSV header as it goes. Because it uses Node pipes and buffers, it can handle super large files.  

# Usage

`npm install https://github.com/madwire-media/lets-make-csvs.git`

###### Use a github token, because this module is probably private

# example
```javascript
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

async.eachSeries(myobj, function eachRow(row, cb) {
  csv.writeRow(row, function(err) {
    if (err) return cb(err)
    return cb(null)
  })
}, function endEachRow(err) {
  if (err) throw err
  console.log("done")
})

```

output:
```csv
"id","first_name","last_name","email","gender","ip_address","hobbies","activites","crimes","age"
"1","Hartley","Mulvenna","hmulvenna0@delicious.com","Male","6.25.240.135","["fishing","camping","hiking"]
"2","Antonio","Pigne","apigne1@feedburner.com","Male","102.234.210.24"," ","["bowling","crime"]
"3","Gamaliel","Graser","ggraser2@nymag.com","Male","32.18.140.241"," "," ","{"theft":"misdemeanor","treason":"felony","attempted murder":"misdemeanor"}
"4","Celestyna","Pawels","cpawels3@home.pl","Female","18.17.253.197"," "," "," ","22"
"5","Mommy","Caitlin","mcaitlin4@smh.com.au","Female","213.145.160.242"," "," "," "," "
"6","Nettle","Mordey","nmordey5@ox.ac.uk","Female","178.58.2.233"," "," "," "," "
```

### CSV result:
Open the result in your Excel or Google Sheets and you should see something like this:

|    |            |           |                          |        |                 |                                |                                                    |           |     |            |
|----|------------|-----------|--------------------------|--------|-----------------|--------------------------------|----------------------------------------------------|-----------|-----|------------|
| id | first_name | last_name | email                    | gender | ip_address      | hobbies                        | farm animals                                       | SAT score | age | occupation |
| 1  | Hartley    | Mulvenna  | hmulvenna0@delicious.com | Male   | 6.25.240.135    | ["fishing","camping","hiking"] |                                                    |           |     |            |
| 2  | Antonio    | Pigne     | apigne1@feedburner.com   | Male   | 102.234.210.24  | ["bowling","music"]            | {"pigs":3,"cows":{"male":2,"female":1},"horses":1} |           |     |            |
| 3  | Gamaliel   | Graser    | ggraser2@nymag.com       |        |                 |                                |                                                    | 1420      |     |            |
| 4  | Celestyna  | Pawels    | cpawels3@home.pl         | Female | 18.17.253.197   |                                |                                                    |           | 22  |            |
| 5  | Mommy      | Caitlin   | mcaitlin4@smh.com.au     | Female | 213.145.160.242 |                                |                                                    |           |     |            |
| 6  | Nettle     | Mordey    | nmordey5@ox.ac.uk        | Female | 178.58.2.233    |                                |                                                    |           |     | Engineer   |


### Todo:
- https://www.npmjs.com/package/tmp
