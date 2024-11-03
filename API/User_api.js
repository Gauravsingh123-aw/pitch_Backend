const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
 
userApp.get('/users', expressAsyncHandler(async (req,res)=>{
    res.send({message:"send"})
}))

module.exports=userApp