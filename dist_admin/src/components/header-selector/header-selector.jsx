import React,{Component} from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSerlector extends Component{
    static propTypes={
        setHeader:PropTypes.func.isRequired
    }
    state={
        icon:null
    }
    constructor(props){
        super(props)
        //准备需要显示的列表数据
        this.headerList=[]
        for(let i=0;i<20;i++){
            this.headerList.push({
                text:'头像'+(i+1),
                icon:require(`../../assets/images/头像${i+1}.png`) //不能使用import
            })
        }
    }
    headleClick=({icon,text})=>{
        this.setState({icon})
        this.props.setHeader(text)
    }

    render(){
        const {icon}=this.state
        const listHeader=!icon ?'请选择头像':(
            <div>
                已选择头像：<img src={icon} alt="header"/>
            </div>
        )
        return(
            <List renderHeader={()=>listHeader}>
                <Grid 
                data={this.headerList} 
                columnNum={5}
                onClick={this.headleClick}>
                </Grid>
            </List>
        )
    }
}