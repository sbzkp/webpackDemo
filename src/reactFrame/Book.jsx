import React from "react";
// import { mockData } from './mockData';

export default class Book extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            bookList: [],
            currentTab: "bookInfo",
            selectData: [],
            currentBookData: {},
        }
        this.returnFunction = this.debounce( this.handleSelectChange );
    }
   
    componentDidMount(){
        const self = this;
        // this.api1().then(data=>{
        //     data.map(( item, index)=>{
        //         item.uuid = index;
        //     })
        //     this.setState({
        //         bookList: data
        //     })
        //      this.setState({
        //         selectData: self.getSelectData( data )
        //     })
        // })
       
    }
    api1 = ()=>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve( [] )
            }, 3000)
        })
    }
    getSelectData = ( list )=>{
        return list.map(item=>{
            return { label: item.name, value: item.uuid }
        })
    }
    debounce = ( fn )=>{
        this.timer = null ;
        return ( value)=>{
            console.log(this)
            if ( this.timer ) {
                clearTimeout( this.timer)
            }
            this.timer  = setTimeout(()=>{
                console.log( '111111' )
                fn( value );
                this.timer = null
            },1000)
        }
    }
    componentWillUnmount(){
        console.log( this.timer )
        // if (timer) {
        //     clearTimeout( timer)
        // }
    }
    handleSelectChange = ( value)=>{
        // console.log( "////////////" )
        // let current = this.state.bookList.filter( item=>{
        //     return item.uuid === value
        // }) || []
        // this.setState({
        //     currentBookData: current[0] || {}
        // })
    }
    renderTab = ( )=>{
        const { currentTab } = this.state;
        switch (currentTab) {
            case "bookInfo":
                
                break;
            case "bookDetail":
                break;
                
            default:
                break;
        }
    }
    render(){
        const { selectData =[], currentBookData={}, currentTab="bookInfo", show=true } = this.state;
        return(
            <div>
                <input 
                    // dataSource={ selectData }
                    onChange={ this.returnFunction }
                />
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