import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';


const particlesOptions={
  particles: {
    number:{
      value:30,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}

const initialState ={
      input: 'http://www.top10listland.com/wp-content/uploads/Brad-Pitt.jpg',
      imageUrl: '',
      box:{},
      route:'signin',     
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
}

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  } 
 
  loadUser = (data) => {
      this.setState({user:
      {
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
      }
  })
  }

  calculateFaceLoaction=(data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
  
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol:width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

   onButtonSubmit =() =>{  
        this.setState({imageUrl: this.state.input});
        
          fetch('https://quiet-everglades-21118.herokuapp.com/imageurl',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                  input: this.state.input
                })
              })
        .then(response => response.json())
        .then(response => {
            if(response){
              fetch('https://quiet-everglades-21118.herokuapp.com/image',{
                  method:'put',
                  headers:{'Content-Type':'application/json'},
                  body:JSON.stringify({
                  id:this.state.user.id
                })
              })
              .then(response => response.json())
              .then(count =>{
                      this.setState(Object.assign(this.state.user,{entries:count}))
                  })   
                  .catch(console.log)    
            }
          this.displayFaceBox(this.calculateFaceLoaction(response))
        })
        .catch(err => console.log(err));
        }

  onRouteChange=(route) => {
    if(route === 'signin'){
      this.setState(initialState)
    } 
    this.setState({route:route})
  }

  render() {
    const {imageUrl, route, box, user, input} =this.state;
    return (
      <div className="App">
         <Particles className='particles'
            params={particlesOptions}         
         />
         <Navigation route={route} onRouteChange={this.onRouteChange}/>
         {route === 'home'
           ?<div>
              <Logo/>
              <Rank name={user.name} entries={user.entries}/>
               <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                inputUrl = {input}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />         
            </div>
            :(route === 'signin'?
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>           
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )               
          }
      </div>        
    );
  }
}

export default App;


 

  








// 
//        






