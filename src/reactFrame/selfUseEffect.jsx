// 手写useEffect, useState;
import React from 'react'
import ReactDOM from 'react-dom/client';
// ReactDOM.createRoot(document.getElementById('root')).render( <App /> )

// 存储状态的数组
let state = []
// 存储更改状态方法的数组
let setters = []
// 用来记录状态和更改状态方法对应关系的下标
let stateIndex = 0

function useState(initialState) {
	let value = state[stateIndex] || initialState;
	state[stateIndex] = value;
	// 如果每次都重新定义新的方法的话，不太合适 
	// 这里之所以用闭包，是因为每一次的setState的方法，要保留一个当前的index；
	let currentfunc = ()=>{
		let index = stateIndex;
		return function( newState ){
			state[index] = newState;
			reRender();
		}
	}
	let changeStateFunc = setters[stateIndex] || currentfunc();
	setters.push(changeStateFunc)
	stateIndex++;
	return [value, changeStateFunc];
}

function reRender(){
	stateIndex = 0;
	effectIndex = 0;
	ReactDOM.createRoot(document.getElementById('dynamic-example')).render( <App /> )
}

// 用来存储每次调用useEffect时传入的依赖数组
let prevDepsAry = []
// 用索引记录每个回调函数对应的依赖数组
let effectIndex = 0;

function useEffect(callback, depsArr) {
	// 不传递，所有情况都执行
	// 空数组，在挂载和卸载的时候执行
	// 传递一个值，在该值变化时，执行
	//如果useEffect第一个参数 return 一个方法，那么在卸载的时候执行
	if (depsArr) {
		let flag = depsArr.some((item)=>{ return item != prevDepsAry[effectIndex]  })
		if ( flag ) {
			callback()
		}
	} else{
		callback();
		
	}	
	effectIndex++;
}

// 手动实现useState useEffect
function App() {
	const [count, setCount] = useState(0)
	const [title, setTitle] = useState('useState')

	console.log( state )
	useEffect(() => {
		console.log('useEffect');
	}, [])

	useEffect(() => {
		console.log('useEffect count');
		console.log("count count ", count)
	}, [count])

	useEffect(() => {
		console.log('useEffect every time');
	})

	return (
		<div>y
			<h1>{title}</h1>
			<button onClick={() => setTitle('useState Success')}>修改标题</button>
			<h1>{count}</h1>
			<button onClick={() => setCount(count + 1)}>count++</button>
			<p></p>
		</div>
	)
}

export default App


// https://blog.csdn.net/IT_bar/article/details/116949480