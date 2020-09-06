import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateuser} from '../../redux/actions'

class LaobanInfo extends Component{
    state={
        header:'',
        post:'',
        info:'',
        company:'',
        salary:''
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
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="请输入招聘的职位"  onChange={val=>{this.headleChange('post',val)}}>招聘职位:</InputItem>
                <InputItem placeholder="请输入公司的名称" onChange={val=>{this.headleChange('company',val)}}>公司名称:</InputItem>
                <InputItem placeholder="请输入职位的薪资" onChange={val=>{this.headleChange('salary',val)}}>职位薪资:</InputItem>
                <TextareaItem 
                    title="职位要求"
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
)(LaobanInfo)