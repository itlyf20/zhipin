/*
包含n个reducer函数，根据老的state和指定的action返回信息state
*/
import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST} from './action-types'
import {getRedirectTo} from '../utils'

const inituser={
    username:'',
    type:'',
    msg:'',
    redirectTo:''
}
//产生user状态的reducer
function user(state=inituser,action){
    switch(action.type){
        case AUTH_SUCCESS:
            const {type,header}=action.data
            return {...state,...action.data,redirectTo:getRedirectTo(type,header)}
        case ERR_MSG:
            return {...state,msg:action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
                return {...inituser,msg:action.data}
        default:
            return state
    }
}

const initUserList=[]
//产生userlist状态的reducer
function userList(state=initUserList,action){
    switch(action.type){
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}
//向外暴露的状态
export default combineReducers({
    user,
    userList
})
//向外暴露的状态结构：{user:{}}
