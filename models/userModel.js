const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema({

userId:{
    type:String,
    required:[true,'Name is required']
},
email:{
    type:String,
    required:[true,'Email is required'],
    unique:true
},
password:{
    type:String,
    required:[true,'Password is required']
},
vendors:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Vendor'
}]

},
{timeseries:true}
)




module.exports= mongoose.model("User",UserSchema)