var mysqlQuery = require('../../config');
/**
 * This function represent to insert record to Vendor master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

function addNewInvoice(req, res) {
    var param = req.body;
    var query1 = "INSERT INTO `vendor_master`(`vendorname`, `email`, `phno`, `panno`, `gstno`, `address`, `status`) VALUES ('" + param.vendorname + "','" + param.email + "','" + param.phno + "','" + param.panno + "','" + param.gstno + "','" + param.address + "',1)";
    mysqlQuery.excecuteQuery(query1, function (error, result1) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            query2 = "INSERT INTO `invoice_header`(`vendorid`, `paymthd`, `issuedate`, `duedate`, `subtotal`, `sgst`, `cgst`, `amttax`, `paid`, `status`) VALUES (" + result1.insertId + ",'" + param.paymthd + "','" + param.issuedate + "','" + param.duedate + "','" + param.subtotal + "','" + param.sgst + "','" + param.cgst + "','" + param.amttax + "','" + param.paid + "',1)";
            mysqlQuery.excecuteQuery(query2, function (error, result2) {
                if (error) {
                    return res.json({
                        error: true,
                        message: error
                    })
                } else {
                    for (var i = 0; i < param.itemArray.length; i++) {
                        var query3 = "INSERT INTO `invoice_details`(`invoiceid`,`item`, `description`, `price`, `qty`, `discount`, `amount`, `status`) VALUES (" + result2.insertId + ",'" + param.itemArray[i].item + "','" + param.itemArray[i].description + "','" + param.itemArray[i].price + "','" + param.itemArray[i].qty + "','" + param.itemArray[i].discount + "','" + param.itemArray[i].amount + "',1)";
                        mysqlQuery.excecuteQuery(query3, function (error, result) {
                            if (error) {
                                return res.json({
                                    error: true,
                                    message: error
                                })
                            } else {
                                return res.json({
                                    error: false,
                                    message: "Record Inserted Successfully"
                                });
                            }
                        });
                        // }
                        // alert(object.id + ',' + object.Title);

                        //     if(i < param.itemArray.length - 1){  
                        //         query2 += ' UNION ALL';
                        //    }
                        // var query = "SELECT * FROM `invoice_details` WHERE invoice_details.itemid=" + query3.insertId
                        // query2 += query;
                    }

                }
            });
        }
    });
}

/**
 * This function represent to update data to bank mis data from imported excel sheet
 * @param {object} req 
 * @param {string} res 
 * @author Arjun
 */
// function addNewInvoice(req, res) {
//     var param = req.body
//     var functionArray = []
//     for (let element of param) {
//         functionArray.push(insertAllData(element, param))
//     }
//     Promise.all(functionArray).then(result => {
//         return res.json({
//             error: false,
//             result: result
//         })
//     }).catch(exp => {
//         return res.json({
//             error: true,
//             error: exp
//         })
//     })

// }
/**
 * This sub function represent to for updating data to mis bank table from imported excel
 * @param {object} element 
 * @param {string} param 
 * @author Arjun
 */
// function insertAllData(element, param) {
//     return new Promise(function (resolve, reject) {
//         var query1 = "INSERT INTO `vendor_master`(`vendorname`, `email`, `phno`, `panno`, `gstno`, `address`, `status`) VALUES ('" + param.vendorname + "','" + param.email + "','" + param.phno + "','" + param.panno + "','" + param.gstno + "','" + param.address + "',1)";
//         mysqlQuery.excecuteQuery(query1, function (error, result1) {
//             if (error) {
//                 return reject(error, null)
//             } else {
//                 query2 = "INSERT INTO `invoice_header`(`vendorid`, `paymthd`, `issuedate`, `duedate`, `subtotal`, `sgst`, `cgst`, `amttax`, `paid`, `status`) VALUES (" + result1.insertId + ",'" + param.paymthd + "','" + param.issuedate + "','" + param.duedate + "','" + param.subtotal + "','" + param.sgst + "','" + param.cgst + "','" + param.amttax + "','" + param.paid + "',1)";
//                 mysqlQuery.excecuteQuery(query2, function (error, result2) {
//                     if (error) {
//                         return reject(error, null)
//                     } else {

//                         var query3 = "INSERT INTO `invoice_details`(`invoiceid`,`item`, `description`, `price`, `qty`, `discount`, `amount`, `status`) VALUES (" + result2.insertId + ",'" + element['item'] + "','" + element['description'] + "','" + element['price'] + "','" + element['qty'] + "','" + element['discount'] + "','" + element['amount'] + "',1)";
//                         mysqlQuery.excecuteQuery(query3, function (error, result) {
//                             if (error) {
//                                 return reject(error, null)
//                             } else {
//                                 return resolve("Record Inserted Successfully");

//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     })
// }

/**
 * This function represent to select all record from Vender Master table
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getAllVender(req, res) {
    var query = "SELECT `vendorid`, `vendorname`, `email`, `phno`, `panno`, `gstno`, `address`, `status` FROM `vendor_master` where  status = 1 ORDER by vendorid DESC";
    // query+= ' UNION ALL';
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            return res.json({
                error: false,
                result: result
            })
        }
    });
}

/**
 * This function represent to select all record from Invoice Master table
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

function getAllInvoice(req, res) {
    var query = "SELECT `id`, `vendorid`, `item`, `description`, `price`, `qty`, `discount`, `amount`, `sgst`, `cgst`, `amttax`, `paymthd`, `issuedate`, `duedate`, `paid` FROM `invoice_master` where status = 1 ORDER by id DESC";
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            return res.json({
                error: false,
                result: result
            })
        }
    });
}

/**
 * This function represent select record from Employee Master table for edit
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

function getVenderInvoiceById(req, res) {
    var id = req.params.id;
    // var query="SELECT * FROM `vendor_master` WHERE vendorid =" + id;
    var query = "SELECT * FROM `vendor_master` JOIN invoice_master on vendor_master.vendorid=invoice_master.vendorid WHERE vendor_master.vendorid =" + id;
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {
            return res.json({
                result: result[0]
            });
        }
    })
}

// function updateVenderById(req, res) {
//     var param = req.body;
//     var query="UPDATE vendor_master AS vm JOIN invoice_master AS im ON vm.vendorid=im.vendorid SET `vendorname`= '" + param.vendorname + "',`email`= '" + param.email + "',`phno`= '" + param.phno + "',`panno`= '" + param.panno + "', `gstno`= '" + param.gstno + "',`address`= '" + param.address + "',`item`= '" + param.item + "',`description`= '" + param.description + "',`price`= '" + param.price + "',`qty`= '" + param.qty + "', `discount`= '" + param.discount + "',`sgst`= '" + param.sgst + "',`cgst`= '" + param.cgst + "',`amttax`= '" + param.amttax + "',`paymthd`= '" + param.paymthd + "',`issuedate`= '" + param.issuedate + "',`duedate`= '" + param.duedate + "',`paid`= '" + param.paid + "' WHERE vendorid =" + param.id;
//     mysqlQuery.excecuteQuery(query, function(error, result){
//         if (!error) {
//             return res.json({
//                 error: false,
//                 message: "Vendor Updated Successfully"
//             });
//         } else {
//             return res.json({
//                 error: true,
//                 message: error
//             })
//         }
//     });
// }

/**
 * This function represent to insert record to Vendor master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function updateVenderById(req, res) {
    var param = req.body;
    var query1 = "UPDATE vendor_master SET `vendorname`= '" + param.vendorname + "',`email`= '" + param.email + "',`phno`= '" + param.phno + "',`panno`= '" + param.panno + "', `gstno`= '" + param.gstno + "',`address`= '" + param.address + "' WHERE vendorid =" + param.id;
    mysqlQuery.excecuteQuery(query1, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            var query2 = "UPDATE invoice_master SET `item`= '" + param.item + "',`description`= '" + param.description + "',`price`= '" + param.price + "',`qty`= '" + param.qty + "', `discount`= '" + param.discount + "',`sgst`= '" + param.sgst + "',`cgst`= '" + param.cgst + "',`amttax`= '" + param.amttax + "',`paymthd`= '" + param.paymthd + "',`issuedate`= '" + param.issuedate + "',`duedate`= '" + param.duedate + "',`paid`= '" + param.paid + "' WHERE vendorid =" + param.id;
            mysqlQuery.excecuteQuery(query2, function (error, result) {
                if (error) {
                    return res.json({
                        error: true,
                        message: error
                    })
                } else {
                    return res.json({
                        error: false,
                        message: "Vendor Updated Successfully"
                    });
                }
            });
        }
    });
}


/**
 * This function represent to delete record from Employee Master table
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function DeleteVenderById(req, res) {
    var param = req.body;
    var query = "UPDATE vendor_master AS vm JOIN invoice_master AS im ON vm.vendorid=im.vendorid SET vm.status=0,im.status=0 WHERE vm.vendorid =" + param.vendorid;
    // var query = "UPDATE `vendor_master` SET `status` = 0 WHERE vendorid=" + param.vendorid;
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            return res.json({
                result: result
            })
        }
    })
}

/**
 * This function represent to select all record from Client Master and Invoice Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getCommonData(req, res) {
    var query = "SELECT invoice_master.id, invoice_master.item, invoice_master.price,invoice_master.qty, client_master.clientname,client_master.email,client_master.phno,client_master.gstno FROM invoice_master JOIN client_master on invoice_master.cid=client_master.cid WHERE invoice_master.status=1 and client_master.status=1;"
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            return res.json({
                error: false,
                result: result
            })
        }
    });
}
module.exports = {
    addNewInvoice: addNewInvoice,
    getAllVender: getAllVender,
    getAllInvoice: getAllInvoice,
    getVenderInvoiceById: getVenderInvoiceById,
    updateVenderById: updateVenderById,
    DeleteVenderById: DeleteVenderById,
    getCommonData: getCommonData,
}