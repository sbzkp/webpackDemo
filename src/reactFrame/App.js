// index.jsx是用来测试点击时，动态加载的
// import Index from './index.jsx';
// 这个是用来测试手写useEffect的
import SelfUseEffect from './selfUseEffect.jsx';
import ReactDOM from 'react-dom/client';
import React from 'react';
import TestUnmount from './TestUnmount.jsx'
import Parent from './context/praent.jsx'


ReactDOM.createRoot(document.getElementById('dynamic-example')).render( <Parent /> )
