import React from 'react';
import Son from './son.jsx';

function Test( value){
    console.log( value)
    return <div> { value.text } </div>
}
export default class Children extends React.Component{
    constructor(props){
        super( props)
        this.aaaa = "jjjjjjj";
    }
   
    render(){
        let obj = {
            getFiled: ()=>{ console.log("getFiled") },
            value: "value"
        }
        console.log(this.context)
        return(
            <>
                <Test text="text" a="aaa"/>
                <Son obj={ obj } />
            </>
        )
    }
}