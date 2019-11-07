# learn-redux

redux简易版

### 启动调试
```bash
npm i
npm run dev
```
访问localhost:1234，打开控制台即可

### 源码分析
```
src
├── applyMiddleware.js
├── bindActionCreators.js
├── combineReducers.js
├── compose.js
├── createStore.js
└── index.js
```
配合[文档](https://www.redux.org.cn/)观看，效果更佳

`applyMiddleware`是redux里最重要也是最难懂的地方，代码有注解，可以详细观看