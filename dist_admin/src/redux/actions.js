/**
 * 包含n个action creator
 * 异步action
 * 同步action
 */
import {reqRegister,reqLogin,reqUpdate,reqUser,reqUserList} from '../api'
import {AUTH_SUCCESS,ERR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST} from './action-types'

//授权成功的同步action
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
//错误提示信息的同步action
const errMsg=(msg)=>({type:ERR_MSG,data:msg})
//接收用户的同步action
const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
//重置用户的同步action
export const resetUser=(msg)=>({type:RESET_USER,data:msg})

//接收用户列表同步action
export const receiveUserList=(userlist)=>({type:RECEIVE_USER_LIST,data:userlist})

//注册
export const register=(user)=>{
    const {username,password,cpassword,type}=user
    //做表单的前提验证
    if(!username){
        return errMsg('用户名不能为空')
    }
    if(password!==cpassword){
        return errMsg('两次密码要一致')
    }
    return async dispatch=>{
        //发送注册的异步请求
       const response=await reqRegister({username,password,type})
       const result=response.data
       if(result.code===0){
            //分发授权成功的action
            dispatch(authSuccess(result.data))
       }else{
            //分发错误信息的action
            dispatch(errMsg(result.msg))
       }
    }
}
//登录
export const login=(user)=>{
    const {username,password}=user
    //做表单的前提验证
    if(!username){
        return errMsg('用户名不能为空')
    }
    if(!password){
        return errMsg('密码不能为空')
    }
    return async dispatch=>{
        //发送注册的异步请求
       const response=await reqLogin({username,password})
       const result=response.data
       if(result.code===0){
        //分发授权成功的action
        dispatch(authSuccess(result.data))
        }else{
                //分发错误信息的action
                dispatch(errMsg(result.msg))
        }
    }
}
//更新
export const updateuser=(user)=>{
    return async dispatch=>{
        const response=await reqUpdate(user)
        const result=response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户异步action
export const getUser=()=>{
    return async dispatch=>{
        // 执行异步ajax请求
        const response=await reqUser()
        const result=response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户列表异步action
export const getUserList=(type)=>{
    return async dispatch=>{
        //执行异步ajax请求
        const response=await reqUserList(type)
        const result=response.data
        //得到结构后，分发一个同步action
        if(result.code===0){
            dispatch(receiveUserList(result.data))
        }
    }
}