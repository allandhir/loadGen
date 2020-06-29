import React, { Component } from 'react'
import axios from 'axios';
import './service1.css';
class service1 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             readyReplicas: '',
             stime: 7
        }
    }
    genLoad = e =>{
      e.preventDefault()
      axios.get('/genLoad').then(response =>{
        console.log(response)
    }).catch(error=>{
        console.log(error)
    })
      this.props.spintime(this.state.stime)
  }
    stopLoad = e =>{
      e.preventDefault()
      axios.get('/stopLoad').then(response =>{
        console.log(response)
    }).catch(error=>{
        console.log(error)
    })
      this.props.spintime(0)
  }

  getReadyReplicas = e =>{
    e.preventDefault()
    axios.get('/readyReplicas').then(res => this.setState({readyReplicas: res.data}, ()=>console.log("getReadyReplicas: "+res.data)))
}

    render() {
        const { readyReplicas } = this.state;

        return (

            <div id="service1">
                <h1>SERVICE 1</h1>
        <h2> readyReplicas: {readyReplicas}</h2>

        <button className="butt" onClick={this.genLoad}>genLoad</button> <br/>
        <button className="butt" onClick={this.getReadyReplicas}>getReadyReplicas</button> <br/>
        <button className="butt" onClick={this.stopLoad}>stopLoad</button> 
        <br /> <br />
            </div>

        )
    }
}

export default service1
