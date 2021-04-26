exports.getUserMenu = (req, res, next) => {
    let queryResult = [];
    let fetchedUserMenu = false;
    let userMenu = [];
    con.query("SELECT menu_id from user_menu_map WHERE userid = 5 AND status = 'A'", (err, result, fields) => {
        console.log(result);
        queryResult = result;
        // result.forEach((element) => {

        // })
        // queryUserMenuData(result).then((value) => {
        //     console.log('then: ', value);
        //     // console.log("outside each:", menuData);
        //     res.status(200).json({
        //         result: "menuData"
        //     });
        // });
        result.forEach((element, index, array) => {
            console.log('each 1')
            // getUserMenuData(element, index, array).then((value) => {
            //     console.log('value 1st: ');
            //     userMenuData.push(value);
            //     console.log('userMenuData: ');
            // });
            con.query("SELECT * from menu_master WHERE menu_id = " + element.menu_id, (err, result, fields) => {
                // console.log("each:", result);
                userMenu.push(result[0]);
                console.log("each:", userMenu.length, array.length, userMenu.length == array.length);
                if(userMenu.length === array.length) {
                    console.log('inside menu compare')
                    fetchedUserMenu = true;
                    res.status(200).json({
                        result: userMenu
                    });
                    // sendUserData(userMenu, fetchedUserMenu);
                }
            }); 
            // if(index == array.length -1) {
            //     resolve(userMenuData);
            // }
            console.log('check each');
            
        });
        // if(fetchedUserMenu) {
        //     console.log(userMenu);
        //     res.status(200).json({
        //         result: "menuData"
        //     }); 
        // }
    });
    // console.log("query:", queryResult );
}

sendUserData = (data, sendRes) => {
    console.log(data);
    if(sendRes) {
        
    } 
}

// getUserMenuData = result.forEach((element) => {
//     con.query("SELECT * from menu_master WHERE menu_id = " + element.menu_id, (err, result, fields) => {
//         // console.log("each:", result);
//         userMenu.push(result[0]);
//         console.log("each:");
//     }); 
//     // console.log("before resolve");
//     // console.log("after resolve");
//     console.log('inside:', userMenu);
// });

queryUserMenuData = (result) => {
    // console.log('controller:', result);
    return new Promise((resolve, reject) => {
        let userMenuData = [];
        console.log('inside promise');
        result.forEach((element, index, array) => {
            console.log('each 1')
            getUserMenuData(element, index, array).then((value) => {
                console.log('value 1st: ');
                userMenuData.push(value);
                console.log('userMenuData: ');
            });
            con.query("SELECT * from menu_master WHERE menu_id = " + element.menu_id, (err, result, fields) => {
                // console.log("each:", result);
                userMenu.push(result[0]);
                console.log("each:");
            }); 
            if(index == array.length -1) {
                resolve(userMenuData);
            }
        });
    });
};

getUserMenuData = (element, index, array) => {
    return new Promise((resolve, reject) => {
        let userMenu = [];
        console.log('inside 2nd promise');
        con.query("SELECT * from menu_master WHERE menu_id = " + element.menu_id, (err, result, fields) => {
            // console.log("each:", result);
            userMenu.push(result[0]);
            console.log("each:");
            if(index == array.length -1) {
                resolve(userMenu);
            }
        });
    });
}
