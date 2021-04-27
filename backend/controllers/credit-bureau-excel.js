// const excel = require("exceljs");
const fs = require('fs');
const { exec, execSync } = require('child_process');
const excel = require('excel4node');
const RequestIp = require('@supercharge/request-ip');

exports.heatmap_download = (req, res, next) => {
    let headersSet = false;
    let wb = new excel.Workbook();
    let ws = wb.addWorksheet('credit-bureau-data');
    con.query("SELECT household_id FROM household_base_data WHERE household_number = 'MP001LE000400'", (err, result, fields) => {
        let household_id = result[0].household_id;
        console.log(result);
        con.query("SELECT max(pull_number) max_pull_number from credit_bureau_base_data WHERE household_id = '" + household_id + "'", (err, result, fields) => {
            // console.log(result);
            let pull_number = result[0].max_pull_number;
            console.log('inside 1st query:',household_id, pull_number);
            if(pull_number >= 1) {
                // enter heatmap values for header
                ws.cell(1,1).string('Name');
		        ws.cell(2,1).string('Account Status');
		        ws.cell(3,1).string('Loan Type');
		        ws.cell(4,1).string('Loan Amount');
		        ws.cell(5,1).string('Lender');
		        ws.cell(6,1).string('Date of Disbursement');
                
                console.log("inside while");
                let alert_description_query = "SELECT distinct c.alert_description, c.alert_id FROM credit_bureau_alert_base_data a, credit_bureau_alert_detail b, credit_bureau_alert_master c WHERE a.household_id = '" + household_id + "' AND a.pull_number = '" + pull_number + "' AND a.household_id = b.household_id AND a.trade_line_no = b.trade_line_no AND b.pull_number = '" + pull_number + "' AND b.alert_id = c.alert_id AND c.status='A' ORDER BY a.trade_line_no, c.alert_id";
                con.query(alert_description_query, (err, result, fields) => {
                    console.log("inside while query");
                    let i = 1;
                    for(let i = 1; i <= result.length; i++) {
                        ws.cell(i,1).string(result[0].alert_description);
                        // i += 1;
                        console.log
                        if(i == result.length){
                            headersSet = true;
                        }
                    }
                    
                    // res.status(200).json({
                    //     result: result
                    // });
                })
                if(headersSet) {
                    wb.write(`download.xlsx`, res);
                }
                let first_alert_id_query = "SELECT min(c.alert_id) first_alert_id FROM credit_bureau_alert_base_data a, credit_bureau_alert_detail b, credit_bureau_alert_master c WHERE a.household_id = '" + household_id + "' AND a.pull_number = '" + pull_number + "' AND a.household_id = b.household_id AND a.trade_line_no = b.trade_line_no AND b.pull_number = '" + pull_number + "' AND b.alert_id = c.alert_id ORDER BY a.trade_line_no, c.alert_id";
                con.query(first_alert_id_query, (err, result, fields) => {
                    let first_alert_id = result[0].first_alert_id;
                    let heat_map_query = "SELECT a.*, ifnull(b.color_indicator, 'FFF') color_indicator FROM (SELECT a.applicant_name, a.account_status, a.account_type, a.disbursed_amount, a.credit_guarantor, a.disbursed_date, c.alert_description, b.alert_level, c.alert_id FROM credit_bureau_alert_base_data a, credit_bureau_alert_detail b, credit_bureau_alert_master c WHERE a.household_id = '" + household_id + "' AND a.pull_number = '" + pull_number + "' AND a.household_id = b.household_id AND a.trade_line_no = b.trade_line_no AND b.pull_number = '" + pull_number + "' AND b.alert_id = c.alert_id ORDER BY a.trade_line_no, c.alert_id) a left join credit_bureau_alert_level_color_map b on a.alert_level = b.alert_level";
                    con.query(heat_map_query, (err, result, fields) => {
                        let i = 0;
                        // while (result)
                        //     {
                        //         if (result[0].alert_id == first_alert_id)
                        //         {
                        //             i = i + 1;
                        //             heat_map[1][i] = result[0].applicant_name;
                        //             heat_map[-4][i] = strtoupper(substr(result[0].account_status,0,1));
                        //             heat_map[-3][i] = result[0].account_type;
                        //             heat_map[-2][$i] = number_format(ceil(result[0].disbursed_amount/1000));
                        //             heat_map[-1][i] = result[0].credit_guarantor;
                        //             heat_map[0][i] = substr(result[0].disbursed_date,2,2);
                        //         }
                        //         heat_map[result[0].alert_id][i] = result[0].color_indicator;
                        //         let alert_id = result[0].alert_id;
                        //     }
                    })
                })
            }
            
        })
    })
}

exports.combined_download = (req, res, next) => {
    
}

exports.validate_download = (req, res, next) => {
    console.log('api console:',req.body);
        con.query("SELECT household_id from household_base_data WHERE household_number = '" + req.body.value + "'", (err, result, fields) => {
            console.log(result.length);
            if(result.length > 0) {
                res.status(200).json({
                    message: 'data available',
                });
            } else {
                res.status(404).json({
                    message: 'invalid data',
                });
            }
        });
}

exports.validate_phone_download = (req, res, next) => {
    console.log('api console:',req.body);
        con.query("SELECT DISTINCT household_number FROM household_family_detail a, household_base_data b where a.mobile_no = '" + req.body.value + "' and a.household_id = b.household_id", (err, result, fields) => {
            console.log(result.length);
            if(result.length > 1) {
                res.status(401).json({
                    message: 'Duplicate mobile number found. Report cannot be generated',
                });
            } else if (result.length == 0){
                res.status(404).json({
                    message: 'invalid data',
                });
            } else {
                res.status(200).json({
                    message: 'data available',
                    household_number: result[0].household_number
                });
            }
        });
}

exports.get_CSO_data = (req, res, next) => {
    con.query("SELECT employee_id, lower(employee_name) employee_name, employee_code FROM employee_master where status='AA' order by employee_name", (err, result, fields) => {
        res.status(200).json({
            message: 'CSO data',
            result: result
        });
    });
};

exports.validate_hhids = (req, res, next) => {
    console.log(req.body);
    let check_from_hhid = 0;
    let check_to_hhid = 0;
    let from_hhid = req.body.from_hhid;
    let to_hhid = req.body.to_hhid;
    con.query("select b.* from household_base_data a, credit_bureau_summary b where a.household_number = '" + from_hhid + "' and a.household_id = b.household_id", (err, result, fields) => {
        if(result.length == 0) {
            check_from_hhid = 0
            res.status(404).json({
                message: 'invalid from household id'
            });
        } else {
            check_from_hhid = 1
            con.query("select b.* from household_base_data a, credit_bureau_summary b where a.household_number = '" + to_hhid + "' and a.household_id = b.household_id", (err, result, fields) => {
                if(result.length == 0) {
                    check_to_hhid = 0;
                    res.status(404).json({
                        message: 'invalid to household id'
                    })
                } else {
                    check_to_hhid = 1;
                    if(from_hhid > to_hhid) {
                        res.status(400).json({
                            message: 'from household id cannot be greater than to household id'
                        });
                    } else {
                        let hhids = {
                            from_hhid: from_hhid,
                            to_hhid: to_hhid
                        }
                        res.status(200).json({
                            message: 'valid hhids',
                            result: hhids

                        });
                    }
                }
            })
        }
    })
}

exports.get_branch_data = (req, res, next) => {
    con.query("select '-Select-' branch_name, 0 branch_id union select distinct branch_name, a.branch_id from household_base_data a, branch_master b where a.branch_id = b.branch_id order by branch_name", (err, result, fields) => {
        res.status(200).json({
            message: 'branch data',
            result: result
        });
    });
}

exports.create_data_PTS = (req, res, next) => {
    // console.log(req.body);
    let household_number = req.body.value;
    let file_created = false;
    con.query("SELECT * FROM household_base_data where household_number = '" + household_number + "'", (err, result, fields) => {
        console.log(result);
        if(result.length > 0) {
            fs.copyFile("D:\PTS\\PTS.xlsm","D:\PTS\\PTS_" + household_number + ".xlsm", (err) => {
                if (err) throw err;
                console.log('file copied to destination');
                fs.open("D:\\PTS\\run_pts_" + household_number + ".bat", "w", (err, fd) => {
                    console.log(fd);
                    let txt = "cscript D:\\PTS\\vba_codes.vbs D:\\PTS\\PTS_" + household_number + ".xlsm";
                    fs.write(fd, txt, (err, bytes) => {
                        if(err){
                            console.log(err.message);
                        }else{
                            console.log(bytes +' bytes written');
                        }
                        fs.close(fd, (err) => {
                            if (err){
                                console.error('Failed to close file', err);
                            } else {
                                console.log("\n> File Closed successfully");
                                // exec("D:\\PTS\\run_pts_" + household_number + ".bat");
                                fs.copyFile("D:\\PTS\\PTS_" + household_number + ".xlsm", "c:\\xampp\\htdocs\\cb\\PTS_" + household_number + ".xlsm", (err) => {
                                    if (err) throw err;
                                    let pts_filename = "PTS_" + household_number + ".xlsm";
                                    res.status(200).json({
                                        message: "file created",
                                        pts_filename: pts_filename
                                    });
                                });
                            }
                        });
                    });
                });
              });
        };
    });
}

exports.create_support_zip = (req, res, next) => {
    let household_number = req.body.value;
    con.query("select household_id from household_base_data where household_number = '" + household_number + "'", (err, result, fields) => {
        console.log(result);
        if(result.length > 0) {
            req.ip = RequestIp.getClientIp(req);
            // if(req.ip.substr(0,3) == "192") {

            // }
            let household_id = result[0].household_id;
            con.query("select 'Profile Pic' type, family_member_name, trim(profile_photo_filename) filename from household_family_detail where household_id= '" + household_id + "' union select 'CB' type, family_member_name, trim(filename) filename from credit_bureau_base_data a, household_family_detail b where a.household_id = '" + household_id + "' and a.pull_number = (select max(pull_number) from credit_bureau_base_data where household_id= '" + household_id + "') and a.household_id = b.household_id and a.family_member_id = b.family_member_id union select b.upload_document_type_name type, family_member_name, trim(filename) filename from household_file_upload_log a, upload_document_type_master b, household_family_detail c where a.household_id= '" + household_id + "' and a.status='A' and a.upload_document_type_id = b.upload_document_type_id and a.household_id = c.household_id and a.family_member_id = c.family_member_id", (err, result, fields) => {
                console.log(result);
                result.forEach((element, index, array) => {
                    if(element.filename != null) {
                    fs.open("c:\\xampp\\htdocs\\cb\\File_" + household_number + ".bat", "w", (err, fd) => {
                        let ext = ".7z";
                        let text = "C:\\Program Files\\7-Zip\\7z a c:\\xampp\\htdocs\\cb\\" + household_number + ".zip  c:\\xampp\\htdocs\\FTP\\" + element.filename;
                        fs.write(fd, text, (err, bytes) => {
                            if(err){
                                console.log(err.message);
                            }else{
                                console.log(bytes +' bytes written');
                            }
                            fs.close(fd, (err) => {
                                if (err){
                                    console.error('Failed to close file', err);
                                } else {
                                    console.log("\n> File Closed successfully");
                                    // execSync("c:\\xampp\\htdocs\\cb\\File_" + household_number + ".bat");
                                    res.status(200).json({
                                        message: "zip created",
                                        household_number: household_number
                                    });
                                }
                            });
                        })
                    })  
                    }
                })
            })
        }
    })
}

