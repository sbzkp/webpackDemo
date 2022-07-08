import React from 'react'
import ReactDOM from 'react-dom/client';

// 存储状态的数组
let state = []
// 存储更改状态方法的数组
let setters = []
// 用来记录状态和更改状态方法对应关系的下标
let stateIndex = 0

function createSetter(index) {
  return function (newState) {
    state[index] = newState
    render()
  }
}

function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  // 采用闭包缓存每个state对应的setState
  setters.push(createSetter(stateIndex))
  const value = state[stateIndex]
  const setter = setters[stateIndex]
  // 每创建完一组都要+1，用来作为下一组状态的索引
  stateIndex++
  return [value, setter]
}

// 因为状态更改要刷新视图，因此这里用ReactDom.render方法来模拟更改状态后刷新视图的操作
function render() {
  // 每次调用render都要重置stateIndex，否则对应的索引无限递增将无法正确匹配state和setState之间的关系
  stateIndex = 0
  // 每次调用render都要重置effectIndex，否则对应的索引无限递增会导致callback匹配不到对应的依赖数组
  effectIndex = 0
  ReactDOM.createRoot(document.getElementById('root')).render( <App /> )
}

// 用来存储每次调用useEffect时传入的依赖数组
let prevDepsAry = []
// 用索引记录每个回调函数对应的依赖数组
let effectIndex = 0

console.log("==========================")
function useEffect(callback, depsAry) {
  debugger
  // 先判断参数类型是否正确
  // 如果callback不是函数类型，直接报错
  if(Object.prototype.toString.call(callback) !== '[object Function]') throw new Error(`${callback} 必须是一个函数类型`)
  // 判断依赖数组有没有传入
  if(depsAry === undefined) {
    // 没传入则每次函数重新调用都要执行回调函数
    callback()
  } else {
    // 判断depsAry是否是一个数组类型，如果不是，直接报错
    if(Object.prototype.toString.call(depsAry) !== '[object Array]') throw new Error(`${depsAry} 必须是一个数组类型`)
    // 是数组类型，则需要获取上一次的依赖数组，逐项对比是否发生改变
    let prevDeps = prevDepsAry[effectIndex]
    // 判断是否发生改变，判断prevDeps是否存在
    const hasChanged = prevDeps ? depsAry.every((dep, index) => dep === prevDeps[index]) === false : true
    if(hasChanged) {
      // 有依赖发生改变，调用callback
      callback()
    }
    // 同步本次更改后的依赖数组
    prevDepsAry[effectIndex] = depsAry
    effectIndex++
  }
}

// 手动实现useState useEffect
function App() {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState('useState')

  useEffect(() => {
    console.log('useEffect');
  }, [])

  useEffect(() => {
    console.log('useEffect count');
  }, [count])

  useEffect(() => {
    console.log('useEffect every time');
  })
  console.log("///////////////", prevDepsAry)

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => setTitle('useState Success')}>修改标题</button>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>count++</button>
    </div>
  )
}

export default App


// https://blog.csdn.net/IT_bar/article/details/116949480