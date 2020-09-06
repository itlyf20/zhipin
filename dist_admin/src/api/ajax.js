//封装ajax请求
//函数的返回值是pormise对象

import axios from 'axios'

export default function ajax(url,data={},type='GET'){
    // 拼请求参数串
    if(type==='GET'){
        let paramStr=''
        Object.keys(data).forEach(key=>{
            paramStr+=key+'='+data[key]+'&'
        })//得到这个对象所有key的数组
        if(paramStr){
            paramStr=paramStr.substring(0,paramStr.length-1)
        }
        // 发ajax请求
        return axios.get(url+'?'+paramStr)
    }else{
        return axios.post(url,data)
    }
}