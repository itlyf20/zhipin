const mongoose=require('mongoose')
const md5=require('blueimp-md5')
//连接到指定的数据库
mongoose.connect('mongodb://localhost:27017/zpin',{useNewUrlParser: true,useUnifiedTopology: true})
//获取连接对象
const conn=mongoose.connection
//绑定连接完成监听
conn.on('connected',function(){
    console.log('数据库连接成功')
})
//定义用户对应的schema
const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String ,required:true},
    type:{type:String,required:true}
})
//定义model
const userModel=mongoose.model('user',userSchema)

//增加操作
// function saveUser(){
//     const usersModel=new userModel({username:'Bob',password: md5('654321'),type:'laoban'})
//     usersModel.save(function(err,user){
//         console.log('save()',err,user)
//     })
// }
// saveUser()

//查询
// function findUser(){
//     userModel.find(function(err,users){
//         console.log('find()',err,users)
//     })
//     userModel.findOne({_id:"5e940960eb46c40f5ca605a4"},function(err,user){
//         console.log('findOne()',err,user)
//     })
// }
// findUser()

//更新
// function updUser(){
//     userModel.findByIdAndUpdate({_id:'5e940960eb46c40f5ca605a4'},{username: 'jack'},function(err,olduser){
//         console.log('findByIdAndUpdate()',err,olduser)
//     })
// }
// updUser()

//删除
function delUser(){
    userModel.remove({_id:'5e940960eb46c40f5ca605a4'},function (err,doc) {
            console.log('remove()',err,doc)
    })
}
delUser()