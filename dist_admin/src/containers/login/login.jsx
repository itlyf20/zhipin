import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'

import './login.css'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
}from 'antd-mobile'

class Login extends Component{
    state={
        username:'',
        password:''
    }
    //处理注册逻辑并收集数据
    login=()=>{
       this.props.login(this.state)
    }
    //处理输入数据的改变，更新对应的状态
    headleChange=(name,val)=>{
        //更新状态
        this.setState({
            [name]:val 
        })
    }
    //跳转到注册页面
    toRegister=()=>{
        // 路由跳转到注册页面
        this.props.history.replace('/register')
    }
    render(){
        const {msg,redirectTo}=this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return(
            <div className="box">
                <NavBar>飞哥直聘</NavBar>
                <h1 className="title">登录界面</h1>
                <WingBlank className="inputs">
                    <List>
                        {msg?<div className="errmsg">{msg}</div>:null}
                        <InputItem onChange={val=>{this.headleChange('username',val)}}>账号：</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={val=>{this.headleChange('password',val)}}>密码：</InputItem>
                        <WhiteSpace/>
                        &nbsp; &nbsp; &nbsp;
                        <Button type="primary" onClick={this.login}>登录</Button>
                        &nbsp; &nbsp; &nbsp;
                        <Button onClick={this.toRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(Login)