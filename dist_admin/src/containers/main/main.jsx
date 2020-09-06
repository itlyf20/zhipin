import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info'
import DaShenInfo from '../dashen-info/dashen-info'
import DaShen from '../dashen/dashen'
import LaoBan from '../laoban/laoban'
import Message from '../message/message'
import Chat from '../chat/chat'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import {connect} from 'react-redux'


import {getRedirectTo} from '../../utils/index'
import {getUser} from '../../redux/actions'
import '../../components/nav-footer/nav-footer.css'

class Main extends Component{
    // 给组件对象添加属性；包含所有的组件相关信息数据
    navlist=[
        {
            path:'/laoban',
            component:LaoBan,
            title:'大神列表',
            icon:'dashen',
            text:'大神'
        },
        {
            path:'/dashen',
            component:DaShen,
            title:'老板列表',
            icon:'laoban',
            text:'老板'
        },
        {
            path:'/message',
            component:Message,
            title:'消息列表',
            icon:'message',
            text:'消息'
        },
        {
            path:'/personal',
            component:Personal,
            title:'用户中心',
            icon:'personal',
            text:'个人'
        }
    ]
    componentDidMount(){
        const userid=Cookies.get('userid')
        const {_id}=this.props.user
        if(userid&&!_id){
            // 发送异步请求获取user信息
            this.props.getUser()
        }
    }
    
    render(){
        // 读取cookie中的userid
        const userid=Cookies.get('userid')
        // 如果没有，自动重定向到登录界面
        if(!userid){
            return <Redirect to='/login'/>
        }
        // 如果有，读取redux中的user状态
        const {user}=this.props
        //如果user没有_id，返回null（不做任何显示）
        if(!user._id){
            return null
        }else{
            let path=this.props.location.pathname
            if(path==='/'){
                // 得到一个重定向的路由路径
                path=getRedirectTo(user.type,user.header)
                return <Redirect to={path}></Redirect>
            }
        }
        // 如果有_id，显示对应的页面

        // 获取所有组件的数组
        const {navlist}=this
        const path=this.props.location.pathname
        const currentNav=navlist.find(nav=>nav.path===path) //得到当前的nav，可能没有
        if(currentNav){
            if(user.type==='laoban'){
                navlist[1].hide=true
            }else{
                navlist[0].hide=true
            }
        }

        return(
            <div>
                {
                    currentNav ? <NavBar className="sticky-header">{currentNav.title}</NavBar> : null
                }
                <Switch>
                    {
                        navlist.map(nav=><Route key={nav.path} path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/laobaninfo' component={LaobanInfo}></Route>
                    <Route path='/dasheninfo' component={DaShenInfo}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>
                    <Route component={NotFound}/>
                </Switch>
                {
                    currentNav ? <NavFooter navlist={navlist}/> : null
                }
            </div>
        )
    }
}
export default  connect(
    state=>({user:state.user}),
    {getUser}
)(Main)