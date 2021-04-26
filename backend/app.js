const express = require('express');
// const bodyParser = require('body-parser');
const mysql = require('mysql');

const authRoute = require("./routes/auth");
const navMenuRoute = require("./routes/nav-menu");
const checkAuth = require("./middleware/check-auth");

// var password = 'xyz';
// console.log('Normal password : ', password);
// console.log('Hashed password : ', md5(password));


const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password1234",
    database: 'dev_uat_customer'
});

con.connect(function(err) {
    if (err) throw err;
    // con.query("SELECT * FROM user_login_controller", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    //   });
    console.log("Connected!");
  });

global.con = con;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     res.setHeader("Access-Control-Allow-Methods",
     "GET, POST, PATCH, DELETE, OPTIONS");
    //  const remoteAddress = req.connection.remoteAddress;
    
    // const callFunction = "user_login_controller(?,?,?,?,?,?)";
    // con.query("CALL user_login_controller('cs01', 'xyz', '', '', '', 1)", (err, result, fields) => {
    //     if (err) {
    //         console.log("err:", err);
    //     } else {
    //         console.log("results:", result);

    //     }
    // });
    // con.query("SELECT action_message, userid FROM user_login_controller a, user_master b WHERE a.username = 'sanku' and a.username = b.username", (err, result, fields) => {
    //     if(err) {
    //         console.log("err", err);
    //     } else {
    //         console.log("results:", result);
    //     }
    // });
    next();
});

// app.post('/api/users', (req, res, next) => {
//     console.log('post request working', req.body);
//     console.log(req.ip);
//     res.status(201).json({
//         message: 'new data added'
//     });
// });

app.get('/api/users',checkAuth, (req, res, next) => {
    const users = [
        {
            id: 1,
            email: 'sanku@navadhan.com',
            password: 'abc',
            initials: 'S'
        },
        {
            id: 2,
            email: 'vishal@navadhan.com',
            password: 'xyz',
            initials: 'VS'
        }
      ]
      console.log(req.ip);
    res.status(200).json({
        message: 'user retrieved successfully',
        user: users,
    });
});

// app.get("/user/menu", checkAuth, (req, res, next) => {
//     let userMenu = [];
//     con.query("SELECT menu_id from user_menu_map WHERE userid = " + req.userData.userId + " AND status = 'A'", (err, result, fields) => {
//         console.log(result);
//         result.forEach((element) => {
//             con.query("SELECT * from menu_master WHERE menu_id = " + element.menu_id, (err, result, fields) => {
//                 console.log("each:", result);
//                 userMenu.push(result[0]);
//                 console.log("each:", userMenu);
//             });
//         });
//         console.log("final: ", userMenu)
//         res.status(200).json({
//             result: userMenu
//         });
//     });
// }); 

app.use(authRoute);
app.use(navMenuRoute);

module.exports = app;