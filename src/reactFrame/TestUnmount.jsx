import React from "react";
import Book from './Book.jsx';

export default class TestUnmount extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            show: true
        }
    }
   


    componentWillUnmount(){
        console.log( timer)
        // if (timer) {
        //     clearTimeout( timer)
        // }
    }

    render(){
        const { selectData =[], currentBookData={}, currentTab="bookInfo", show=true } = this.state;
        return(
            <div>
                { show && 
                    <Book  />
                }
                <button onClick={()=>{   this.setState({ show: !show}  ) } }> { show ? "消失": "展示" }</button>

                {/* <div> 
                    <div onClick={ this.setState( { current: "bookInfo"}) } > tab1 </div>
                    <div onClick={ this.setState({ current: "bookDetail"} ) } > tab2 </div>
                    {
                        this.renderTab()
                    }

                </div> */}

            </div>
        )
    }
}