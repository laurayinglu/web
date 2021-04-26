// YOU CAN USE THIS FILE AS REFERENCE FOR SERVER DEVELOPMENT

// include the express module
var express = require("express");

// create an express application
var app = express();

// helps in extracting the body portion of an incoming request stream
var bodyparser = require('body-parser');

// fs module - provides an API for interacting with the file system
var fs = require("fs");

// helps in managing user sessions
var session = require('express-session');

// native js function for hashing messages with the SHA-256 algorithm
var crypto = require('crypto');

// include the mysql module
var mysql = require("mysql");

// var link = require("./link.js")

var xml2js = require("xml2js");
var parser = new xml2js.Parser();

// get information from xml file
var db; // database
fs.readFile(__dirname + '/dbconfig.xml', function (err, data){
  if(err) throw err;
  parser.parseString(data, function(err, result) {
    if(err) throw err;
    db = mysql.createConnection({
      host: result.dbconfig.host[0],
      user: result.dbconfig.user[0],
      password: result.dbconfig.password[0],
      database: result.dbconfig.database[0],
      port: result.dbconfig.port[0]
    });

    db.connect(function(err) {
      if(err) throw err;
      console.log("Linked!");
    });
  });
});

// apply the body-parser middleware to all incoming requests
app.use(bodyparser());

// use express-session
// in mremory session is sufficient for this assignment
app.use(session({
  secret: "csci4131secretkey",
  saveUninitialized: true,
  resave: false
}));

// server listens on port 9007 for incoming connections
app.listen(process.env.PORT||9445, () => console.log('Listening on port 9445!'));

app.get('/',function(req, res) {
  res.sendFile(__dirname + '/client/welcome.html');
});


// // GET method route for the events page.
// It serves events.html present in client folder
app.get('/events',function(req, res) {
  if(!req.session.value) {
    res.redirect('/login');
  } else {
    res.sendFile(__dirname + '/client/events.html');
  }
});

// GET method route for the addEvent page.
// It serves addEvent.html present in client folder
app.get('/addEvent',function(req, res) {
  //Add Details
  if(!req.session.value) {
    res.redirect('/login');
  } else {
    res.sendFile(__dirname + '/client/addEvent.html');
  }
});

//GET method for stock page
app.get('/stock', function (req, res) {
  //Add Details
  if(!req.session.value) {
    res.redirect('/login');
  } else {
    res.sendFile(__dirname + '/client/stock.html');
  }
});

app.get('/welcome', function (req, res) {
  //Add Details
  if(!req.session.value) {
    res.redirect('/login');
  } else {
    res.sendFile(__dirname + '/client/welcome.html');
  }
});

// GET method route for the login page.
// It serves login.html present in client folder
app.get('/login',function(req, res) {
  //Add Details
  if(!req.session.value)
    res.sendFile(__dirname + '/client/login.html');
  else
    res.redirect('/events');
});

// GET method to return the list of events
// The function queries the tbl_events table for the list of events and sends the response back to client
app.get('/getListOfEvents', function(req, res) {
  //Add Details
  db.query('SELECT * FROM tbl_events', function (err, result) {
    if(err) {
      throw err;
    } else {
      res.send(result);
    }
  })
});


// GET method to return the list of users
// The function queries the tbl_events table for the list of events and sends the response back to client
app.get('/getListOfUsers', function(req, res) {
  //Add Details
  if(!req.session.value) {

  } else {
    db.query('SELECT * FROM tbl_accounts', function (err, result) {
      if(err) {
        throw err;
      } else {
        var objArray = [];
        for(var i in result) {
          var obj = {
            id: result[i].acc_id,
            name: result[i].acc_name,
            login: result[i].acc_login,
            password: result[i].acc_password
          };
          objArray.push(obj);

        }
        res.json(objArray);
        //res.send(result);
      }
    })
  }
});


app.get('/userLogin', function(req, res) {
  if (!req.session.value) {
    res.redirect('/login');
  } else {
    var obj = {login: req.session.value};
    res.json(obj);
  }
});

// GET method to add user
// The function queries the tbl_events table for the list of events and sends the response back to client
app.post('/addUser', function(req, res) {
  if(!req.session.value) {
    res.redirect('/login');
  } else {
    var insertRow = {
      acc_name: req.body.name,
      acc_login: req.body.login,
      acc_password: crypto.createHash('sha256').update(req.body.password).digest('base64')
    };

    db.query('SELECT * FROM tbl_accounts WHERE acc_login = ?',req.body.login, function(err, result) {
        if(result.length == 0) {
          //insert into table
          db.query('INSERT tbl_accounts SET ?', insertRow, function(err, result) {
            if(err) 
              throw err;
            else {
              res.send({flag:true, id: result.insertId});
            }
          });

          // var obj = {
          //   id: result.acc_id,
          //   name: result.acc_name,
          //   login: result.acc_login,
          //   password: result.acc_password
          // };
          //     // find the insertId to send
          //     //res.json(obj);
          // res.send({flag:true, id: obj.id});


        } else {
          // login already exists
          res.send({flag:false});
        }
      })
  }
  
});

// GET method to update user
// The function queries the tbl_events table for the list of events and sends the response back to client
app.post('/updateUser', function(req, res) {
  if(!req.session.value) {
    res.redirect('/login');
  } else {
    db.query('SELECT * FROM tbl_accounts WHERE acc_login = ? AND acc_id != ?', [req.body.login, req.body.id], function (err, result) {
      if(err) {
        throw err;
      } else {
        if(result.length == 0) {
          // ok to update 
          if(req.body.password != null) {
            //update name, login, and password where acc_id = req.body.id
            var rowToBeUpdated = {
              acc_name: req.body.name,
              acc_login: req.body.login,
              acc_password: crypto.createHash('sha256').update(req.body.password).digest('base64')
            };
            db.query('UPDATE tbl_accounts SET ? WHERE acc_id=?', [rowToBeUpdated, req.body.id], function(err, result) {
              if(err) throw err;
              //res.send(rowToBeUpdated);
            });
          } 
          else {
            //update name, login where acc_id = req.body.id
            var rowToBeUpdated = {
              acc_name: req.body.name,
              acc_login: req.body.login
            };

            db.query('UPDATE tbl_accounts SET ? WHERE acc_id=?', [rowToBeUpdated, req.body.id], function(err, result) {
              if(err) throw err;
              //res.send(rowToBeUpdated);
            });
            
          }
          res.send({flag:true});
        } else { // login already exists
          res.send({flag:false});
        }
      }
    })
  }
});


// post method to delete user
// The function queries the tbl_events table for the list of events and sends the response back to client
app.post('/deleteUser', function(req, res) {
  //Add Details
  if (!req.session.value) {
    res.redirect('/login');
  }
  else {
    //var id = ;
    if(req.body.login == req.session.value) {
      res.send({flag:false});
      //res.sendStatus(492);
    }
    else {
     db.query('DELETE FROM tbl_accounts WHERE acc_login = ?', req.body.login, function (err, result) {
      if(err) {
        throw err;
      } else {
        res.send({flag:true});
      }
    });
   }
  }
});


// POST method to insert details of a new event to tbl_events table
app.post('/postEvent', function(req, res) {
  //Add Details
  if (!req.session.value) {
    res.redirect('/login');
  } else {
    var insertRow = {
      event_day: req.body.day,
      event_event: req.body.event,
      event_start: req.body.start,
      event_end: req.body.end,
      event_location: req.body.location,
      event_phone: req.body.phone,
      event_info: req.body.info,
      event_url: req.body.url
    };

    //var sql = "INSERT INTO tbl_events VALUES ?";

    db.query('INSERT tbl_events SET ?', insertRow, function(err, result) {
      if(err)
        throw err;
    });

    res.redirect('/events');
  }
});

// POST method to validate user login
// upon successful login, user session is created
app.post('/sendLoginDetails', function(req, res) {
  //Add Details
  var urn = req.body.username;
  //var psd = req.body.password.toString();
  var psd = crypto.createHash('sha256').update(req.body.password).digest('base64');

  db.query('SELECT * FROM tbl_accounts WHERE acc_login = ? AND acc_password = ?', [urn, psd], function(err, result) {
    
    if(result.length > 0) {
      req.session.value = result[0].acc_login;
      res.sendStatus(200);
    }
    else {
      res.sendStatus(213);
    }

  });
  
});

// log out of the application
// destroy user session
app.get('/logout', function(req, res) {
  //Add Details
  if (!req.session.value) {
    res.redirect('/login');
    //req.send('cannot log out');
  } else {
    console.log('log out successfully!');
    req.session.destroy();
    res.redirect('/login');
  }

});

// for admin page
app.get('/admin', function(req, res) {
  if(!req.session.value) {
    res.redirect('/login');
  }
  else {
    res.sendFile(__dirname + '/client/admin.html');
  }
});

// middle ware to serve static files
app.use('/client', express.static(__dirname + '/client'));


// function to return the 404 message and error to client
app.get('*', function(req, res) {
  // add details
  res.sendFile(__dirname + '/client/404.html');
});
