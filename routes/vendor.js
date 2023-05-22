const express =require('express')

const router= express.Router()
const{postControll,getVendor,updateVendor,viewVendor,deleteVendor}=require('../controllers/VendorController')

// create new vendor data
router.post('/postVendor/:id',postControll)

// get 
router.get('/getVendor/:id',getVendor)

// view vendor
router.get('/viewVendor/:id',viewVendor)

// edit and update vendor
router.put('/updateVendor/:id',updateVendor)

// delete vendor
router.delete('/deleteVendor/:id',deleteVendor) 

module.exports=router