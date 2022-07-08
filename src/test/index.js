
// window.onload(()=>{
    console.log("========================")
    // console.log( cube)
    console.log( document.body )
    function component() {
        const element = document.createElement('div');
        element.classList.add('hello');

        element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to 数字' 
        // + cube(5)
        ].join('\n\n');

        return element;
    }
    
    
    document.body.appendChild(component());
// })
  