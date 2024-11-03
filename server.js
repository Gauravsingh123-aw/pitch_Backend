const exp=require('express')
const app=exp()
app.use(exp.json())

const userApp=require('./API/User_api.js')
const founderapp=require('./API/Founder_api.js')
const investorapp=require('./API/Investor_api.js')
//route level middleware
app.use('/user-api',userApp);
app.use('/founder-api',founderapp);
app.use('/investor-api',investorapp)



// Error handlingl middleware
app.use((err,req,res,next)=>{
    res.send({message:"error occured",payload:err.message})
})



app.listen(4000,()=>console.log('server is runninng on port 4000'));

