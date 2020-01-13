import React,{Component} from 'react';

import {Link} from 'react-router-dom'

export default class Count extends Component{
    
      handleClick=()=>{
        
        const count = document.getElementById('exampleFormControlInput1').value
        this.props.fromChild(count)
    
      }
    render(){
        
        return (
            <div className="App">
              <div className="form-group">
                <label for="exampleFormControlInput1">How much fields you need?</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="count" />
                <Link className="btn btn-success" onClick = {()=>{this.handleClick()}} to = "/field">Click</Link>
              </div>
            </div>
          );
    }
}