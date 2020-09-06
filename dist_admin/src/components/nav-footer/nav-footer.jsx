import React,{Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import './nav-footer.css'

const Item=TabBar.Item

class NavFooter extends Component{
    static propTypes={
        navlist:PropTypes.array.isRequired
    }
    render(){
        let {navlist}=this.props
        navlist=navlist.filter(nav=>!nav.hide)
        const path=this.props.location.pathname
        return (
            <TabBar>
                {
                    navlist.map((nav)=>(
                        <Item key={nav.path}
                        title={nav.text}
                        icon={{uri:require(`./images/${nav.icon}.png`)}}
                        selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                        selected={path===nav.path}
                        onPress={()=>this.props.history.replace(nav.path)}/>
                    ))
                }
            </TabBar>
        )
    }
}
export default withRouter(NavFooter)