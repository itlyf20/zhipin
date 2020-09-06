import React,{Component} from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class LaoBan extends Component{
    componentDidMount(){
        //获取userlist
        this.props.getUserList('dashen')
    }
    render(){
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}
export default connect(
    state=>({userList:state.userList}),
    {getUserList}
)(LaoBan)