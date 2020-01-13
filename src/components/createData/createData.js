import React, { Component } from 'react';

export default class CreateData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            message: ''
        }
    }
    componentDidMount() {
        fetch('/main').then(res => res.json()).then(data => {
            let newObj = {}
            for(let[key,val] of Object.entries(data)){
                for(let[vk,vv] of Object.entries(val)){
                    newObj[vk] = vv
                }
            } 
            
            this.setState({ data:newObj }) 
            })
    }
    handleAddData = () => {
        let keyObject = {};
        let count = 0;
        for (let [key, value] of Object.entries(this.state.data)) {
            keyObject[key] = document.querySelectorAll('.inputData')[count].value
            count++
        }

        fetch('/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(keyObject)
        }).then(res => res.json()).then(data => {
            console.log(data.message)
            this.setState({ message: data.message })
            // document.querySelectorAll('p').forEach((tag)=>{tag.remove()})
            const p = document.createElement('p');
            const message = document.createTextNode(this.state.message)
            console.log(this.state)
            p.appendChild(message)
            document.getElementById('getMessage').appendChild(p)
        })



    }


    render() {

        if (this.state.data !== null) {
            let keyArray = [];
            for (let [key, value] of Object.entries(this.state.data)) {
                keyArray.push(key)
            }

            let inputArray = []
            const inputData = () => {
                for (let i = 0; i < keyArray.length; i++) {

                    inputArray.push(

                        <div className="form-group">
                            <label for="exampleFormControlInput1">{keyArray[i]}</label>
                            <input type="text" className="form-control inputData" />
                        </div>
                    )
                }
            }
            inputData()

            return (
                <div>
                    {inputArray}
                    <div id="getMessage"></div>
                    <button className="btn btn-success" onClick={() => { this.handleAddData() }}>Click</button>
                </div>
            )
        }
        else {
            return null
        }

    }
}