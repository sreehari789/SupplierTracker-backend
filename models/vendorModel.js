const mongoose=require('mongoose')

const VendorSchema= new mongoose.Schema({
    vendorName: {
        type: String,
        required: true
      },
      bankAccountNo: {
        type: String,
        required: true
      },
      bankName: {
        type: String,
        required: true
      },
      addressLine1: {
        type: String
      },
      city: {
        type: String
      },
      country: {
        type: String
      },
      zipCode: {
        type: String
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
})

module.exports=mongoose.model('Vendor',VendorSchema)