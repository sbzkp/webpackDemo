// import _ from 'lodash';
// import Icon from './icon.jpg';
// // import printMe from './print'
// import react from 'react';
// import $ from 'jquery';
// import math from './math.js';
// const { cube } = math;


// function getComponent() {
//     const element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return import('lodash').then(({ default: _ }) => {
//         const element = document.createElement('div');
//         element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//         return element;
//     }).catch((error) => 'An error occurred while loading the component');
// }

// getComponent().then((component) => {
//   document.body.appendChild(component);
// });

// function component() {
//     const element = document.createElement('div');
//     element.classList.add('hello');
//     // lodash（目前通过一个 script 引入）对于执行这一行是必需的
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     console.log("----------------------------")
//     const myIcon = new Image();
//     myIcon.src = Icon;
//     element.appendChild(myIcon);
//     element.innerHTML = [
//       'Hello webpack!',
//       '5 cubed is equal to 数字' + cube(5)
//     ].join('\n\n');

//     // const btn = document.createElement('button');
//     // btn.innerHTML = 'Click me and check the console!';
//     // btn.onclick = printMe;
//     // element.appendChild(btn);
//     // element.classList.add('hello');
//     return element;
// }

// if (module.hot) {
//     module.hot.accept('./print.js', function() {
//         console.log('Accepting the updated printMe module!');
//         printMe();
//     })
// }

// console.log( $('#test') )
// $("#test").css("color","red");  

  
// document.body.appendChild(component());
  
import axios from 'axios';
window.onload = function(){
  document.getElementById("button").onclick =  function(){
      console.log("//////////////////");
      axios.get('http://localhost:3000/test')
      .then(function (response) {
          console.log(" test")
          console.log(response);
      })

      axios.get('http://localhost:3000/time')
      .then(function (response) {
          console.log("time ")
          console.log(response);
      })
  }
}
