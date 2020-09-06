# 1.antd-mobile的按需加载

### 安装：

> npm install antd-mobile --save

### 处理index.html页面，实现加载延迟的问题

```html
<script>
        if ('addEventListener' in document) {
          document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
          }, false);
        }
        if(!window.Promise) {
          document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
        }
</script>
```

### 实现按需打包

#### 下载依赖：

> npm i --save babel-plugin-import
>
> npm i react-app-rewired@2.0.2-next.0 --save-dev(版本号是必须加上)

#### 定义加载配置js模块：config-overrides.js

```javascript
const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override(config, env) {
      config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
      return config;
};
```

#### 修改package.json文件中的scripts

```json
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
  },
```

# 2.引入路由

### 安装：

> npm install --save react-router-dom

### 应用：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Switch} from 'react-router-dom'

import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path='/register' component={Register}></Route>
      <Route path='/login' component={Login}></Route>
      <Route component={Main}></Route>
    </Switch>
  </HashRouter>
  ,document.getElementById('root')
);
```

# 引用Redux

### 下载相关的依赖包

> npm install --save redux@3.7.2 react-redux redux-thunk
>
> npm install --save-dev redux-devtools-extension

# 数据收集

antd-mobile中直接就有一个收集数据的，在类组件中定义每一个输入框对应的value并放在state中

然后通过onChange={val=>{this.headleChange('password',val)}}来获取对应的数据，并可以做更新他的状态 

同样也可以收集单选框的值：onChange={()=>this.headleChange('type','dashen')}

