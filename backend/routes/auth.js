const express = require("express");
const md5 = require('md5');
const RequestIp = require('@supercharge/request-ip');
const jwt = require("jsonwebtoken");

const router = express.Router();

const entity_id = 1;

router.post("/login", (req, res, next) => {
    let queryResult = [];
    let password = md5(req.body.password);
    req.ip = RequestIp.getClientIp(req);
    console.log("body post : ", req.body);                                                                              
    let callQuery = "CALL user_login_controller('"+req.body.username+"', '"+password+"', '', '', '', "+entity_id+")";
    con.query(callQuery, (err, result, fields) => {
        console.log("body query : ",req.body)
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results1:", result);
            queryResult = result;
        }
        if(!result) {
            res.status(404).json({
                message: "User does not exist"
            })
        } else {
            con.query("SELECT action_message, userid FROM user_login_controller a, user_master b WHERE a.username = '" + req.body.username + "' and a.username = b.username", (err, result, fields) => {
                if(err) {
                    console.log("err", err);
                } else {
                    console.log("results2:", result, Array.from(result));
                    let result_status = 0;
                    if(result.action_message == "You have sucessfully logged in!" || result.action_message == "You are already logged in.") {
                        result_status = 1;
                    } else {
                        result_status = 0;
                    }
                    const token = jwt.sign({userId: result[0].userid}, 'secret_key_for_creating_jwt_token',
                    { expiresIn: '1h'});
                    // console.log('last_result: ', result[0].action_message, result[0].userid);
                    res.status(200).json({
                        message : result[0].action_message,
                        userid : result[0].userid,
                        status : result_status,
                        token: token
                    });
                }
            });  
        } 
    });
});

module.exports = router;