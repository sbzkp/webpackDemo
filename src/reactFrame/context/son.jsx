import React from 'react';

export default class Son extends React.Component{
    handleClick = ()=>{
        console.log("//////////////////////")
        console.log( this.refObj)
    }
    render(){
        console.log( this.context )
        return(
            <>
            <button onClick={()=>{ this.handleClick() }}>点击</button>
            <div ref={( ref )=>{  this.refObj = ref}  }> 孙子</div>
            </>
        )
    }
}
