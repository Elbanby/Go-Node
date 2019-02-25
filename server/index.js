const http = require('http');
const process = require('process');
const PORT = process.env.PORT || 4000;

const date = new Date();


const users = {};
// this function fakes data and returns an object
function getSystemData() {
  const timestamp = {
    reqtime: `${date.getHours()} - ${date.getMinutes()} - ${date.getSeconds()}`,
    reqDate: `${date.getDate()}/${date.getMonth()}/${date.getYear()}`
  }

  const data = {
    users: getLoggedUsers(),
    lastLogin: timestamp
  }

  // This function returns a random array of 3 users
  function getLoggedUsers() {
    const username = ["John","Mark","Maria","Sam","Donald","Richard","Jonathan","Hary","Gurprit","Mohamed", "Devon", "Dragon", "John","Williams", "Smith" ,"Farouk","Karol"];
    let loggedUsers = [];
    for (let i = 0 ; i < 4 ; i++) {
      let rand = Math.floor(Math.random() * (username.length -1) );
      loggedUsers = uniquePush(loggedUsers, username[rand], username);
    }
    return loggedUsers;
  }

  /* Unique push makes sure to only push unique values.
     Becarful, it is a recursive function with no base conditon.
     The only gurantee that it won't get hung in an infnite loop is
     the flush function below.
  */
  //// TODO: Add base condition instead of dependency on flush!!!!!
  function uniquePush(array, value, alldata) {
    if (isUnique(value)) {
      array.push(value);
    } else {
      let rand = Math.floor(Math.random() * (alldata.length -1) );
      uniquePush(array, alldata[rand], alldata);
    }
    return array;
  }

  function isUnique(data) {
    if (users[data] == undefined) {
      users[data] = data
      return data
    }
    return false;
  }

  return data;
}

function flushUsers() {
  for (let key in users) {
    delete users[key]
  }
}

http.createServer((req, res) => {
  if (req.url == "/systeminfo") {
    res.writeHead(200, {"Content-Type": "application/json" });
    res.write(JSON.stringify(getSystemData()));
    res.end(flushUsers());
  }
}).listen(PORT);

console.log("Listening on port: " + PORT);
