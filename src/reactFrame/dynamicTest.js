import createLoadable from './createLoadable'
// import  './DynamicTest.css';

const DynamicTest = createLoadable({
	// loader(func),返回动态导入的文件路径
	// 其中 /* webpackChunkName: "DynamicTest" */ 是webpack规定的，来命名打包后文件的名字
	loader: () => import(/* webpackChunkName: "DynamicTest" */ './DynamicTest'),
	// loading(reactComponent) react组件，props是loading（正在加载）以及err(发生错误)
	// 我们可以根据其props进行样式定制化
	loading: ({ loading, err }) => loading ? 'loading' : err ? 'error' : null,
	// delay(ms) 延迟加载的时间
	delay: 5000,
});


export default DynamicTest;

