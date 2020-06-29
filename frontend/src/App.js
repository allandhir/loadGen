import React, {Component} from 'react';
import './App.css';
import logo from './img/k8s.png';

import Service1 from './components/service1';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
         spinTime: 0
    }
}
    setSpinTime = (t) =>{
      this.setState({
    spinTime: t
  })
  }
  render(){
    const {spinTime} = this.state
  return (
    <div className="App">
      <header className="App-header"> 
        <br /> <br />
        <img style={{animation: `App-logo-spin infinite ${spinTime}s linear`}} src={logo} className="App-logo" alt="logo" />

        <Service1 spintime={this.setSpinTime}/>

      </header>
    </div>
    );
  }
}
export default App;
