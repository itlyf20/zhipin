import React,{Component} from 'react'

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {NavBar,InputItem,Button,TextareaItem} from 'antd-mobile'
import {updateuser} from '../../redux/actions'

import HeaderSelector from '../../components/header-selector/header-selector'
class DaShenInfo extends Component{
    state={
        header:'',
        post:'',
        info:''
    }
        //更新hander状态
        setHeader=(header)=>{
            this.setState({
                header
            })
        }

        headleChange=(name,value)=>{
            this.setState({
                [name]:value
            })
        }
    
        save=()=>{
            this.props.updateuser(this.state)
        }
    render(){
        // 如何信息已经完善，自动重定向到对应的页面
        const {header,type}=this.props.user
        if(header){
            const path=type==='dashen'? '/dashen':'/laoban'
            return <Redirect to={path}></Redirect>
        }
        return(
            <div>
            <NavBar>大神信息完善</NavBar>
            <HeaderSelector setHeader={this.setHeader}/>
            <InputItem placeholder="请输入求职的职位" onChange={val=>{this.headleChange('post',val)}}>求职职位:</InputItem>
            <TextareaItem 
                    title="个人介绍"
                    rows={3} onChange={val=>{this.headleChange('info',val)}}>
                </TextareaItem>
            <Button type="primary" onClick={this.save}>保存</Button>
        </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {updateuser}
)(DaShenInfo)