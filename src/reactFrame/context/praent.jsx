import React from 'react';
import Children from './children.jsx';
const MyContext = React.createContext('default-value')

export default class Praent extends React.Component{
    handleClick = ()=>{
        console.log("//////////////////////")
        console.log( this.refObj)
    }
    render(){
        console.log(this.context)
        return(
            <MyContext.Provider value="new-value">
                <button onClick={()=>{ this.handleClick() }}>点击</button>
                <Children ref={( ref )=>{  this.refObj = ref}  } />
            </MyContext.Provider>
        )
    }
}

Praent.contextType = MyContext;
