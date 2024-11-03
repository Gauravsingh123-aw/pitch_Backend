const exp=require('express')
const app=exp()
app.use(exp.json())
app.listen(4000,()=>console.log('server is runninng on port 4000'));

