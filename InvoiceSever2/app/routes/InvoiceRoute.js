var express = require('express');
var router = express.Router();
var InvoiceController = require('../controllers/InvoiceController');
router.post('/add',InvoiceController.addNewInvoice);
router.get('/readv',InvoiceController.getAllVender);
router.get('/read',InvoiceController.getAllInvoice);
router.get('/read/:id',InvoiceController.getVenderInvoiceById);
router.post('/update',InvoiceController.updateVenderById);
router.put('/delete',InvoiceController.DeleteVenderById);
router.get('/readcd',InvoiceController.getCommonData);
module.exports = router;