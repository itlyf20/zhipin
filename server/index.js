const express=require('express')

const app=express()

const bodyParser=require('body-parser')
//加载对应的cookie的插件，npm install cookie-parser --save
const cookieParser = require('cookie-parser');
const router=require('./router/router')
//挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }))
// 设置cookie
app.use(cookieParser());
//处理json格式参数
app.use(bodyParser.json())
app.use('/',router)

app.listen(3001,()=>{
    console.log('http://localhost:3001')
})