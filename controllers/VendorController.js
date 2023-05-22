const userModel= require('../models/userModel')
const vendorModel= require('../models/vendorModel')

//========= create a new vendor =================

const postControll= async (req,res)=>{
 
 const { vendorName, bankAccountNo, bankName, addressLine1, city, country, zipCode } = req.body;
 const userId = req.params.id
 try{
    // create new vendor
const vendor= new vendorModel({
      vendorName,
      bankAccountNo,
      bankName, 
      addressLine1, 
      city, 
      country, 
      zipCode,
      user:userId
})

await vendor.save()

await userModel.findByIdAndUpdate(userId, { $push: { vendors: vendor._id } });

res.status(200).json({message:'new vendor created successfully'})
}catch(error){
    res.status(500).send('server error')
}
}

//=========== get Vendors created by specific user ===========

const getVendor = async (req,res)=>{
try{
const userId= req.params.id
const vendors= await vendorModel.find({user:userId})
if(vendors){
    res.status(200).json({vendors})
}else{
    res.status(404).send('data is empty')
}
}catch(error){
    res.status(500).send('server error')
}}

//========= view vendor =================


const viewVendor= async (req,res)=>{
try{
const vendorId =req.params.id
const vendor= await vendorModel.findById(vendorId)
if(vendor){
    res.status(200).json({vendor})
}else{
    res.status(404).send('no data found')
}

}catch(error){
    res.status(500).send('server error')
}}


//========= update vendor =================

const updateVendor= async (req,res)=>{
try{
    const vendorId=req.params.id
    const vendorData=req.body

    const updatedVendor= await vendorModel.findByIdAndUpdate(vendorId,vendorData,{new:true})
    if(!updateVendor){
        return res.status(404).send('vendor not found')
    }else{
        res.status(200).json({
            updatedVendor,
            message:'Details updated successfully'
        })
    }
}catch(error){
    res.status(500).send('server error')
}}

//========= Delete vendor =================
const deleteVendor= async (req,res)=>{
const vendorId=req.params.id
try{
await vendorModel.findByIdAndDelete(vendorId)
res.status(200).send('Deleted successfully')
}catch(error){
    res.status(500).send('server error')
}
}


module.exports={postControll,getVendor,viewVendor,updateVendor,deleteVendor}