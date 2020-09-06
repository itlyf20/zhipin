import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/actions'
import './register.css'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
}from 'antd-mobile'

const ListItem=List.Item

class Register extends Component{
    state={
        username:'',
        password:'',
        cpassword:'',
        type:'dashen'
    }
    //处理注册逻辑并收集数据
    register=()=>{
        this.props.register(this.state)
    }
    //处理输入数据的改变，更新对应的状态
    headleChange=(name,val)=>{
        //更新状态
        this.setState({
            [name]:val 
        })
    }
    //跳转到登录页面
    toLogin=()=>{
        // 路由跳转到登录页面
        this.props.history.replace('/login')
    }
    render(){
        const {type}=this.state
        const {msg,redirectTo}=this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return(
            <div className="box">
                <NavBar>飞哥直聘</NavBar>
                <h1 className="title">注册界面</h1>
                <WingBlank className="inputs">
                    <List>
                    {msg?<div className="errmsg">{msg}</div>:null}
                        <InputItem onChange={val=>{this.headleChange('username',val)}}>账号：</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={val=>{this.headleChange('password',val)}}>密码：</InputItem>
                        <InputItem type="password" onChange={val=>{this.headleChange('cpassword',val)}}>确认密码：</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型：</span>
                            <Radio checked={type==='dashen'} onChange={()=>this.headleChange('type','dashen')}>大神</Radio>
                            &nbsp; &nbsp; &nbsp;
                            <Radio checked={type==='laoban'} onChange={()=>this.headleChange('type','laoban')}>老板</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        &nbsp; &nbsp; &nbsp;
                        <Button type="primary" onClick={this.register}>注册</Button>
                        &nbsp; &nbsp; &nbsp;
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {register}
)(Register)