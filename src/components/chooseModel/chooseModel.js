import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class ChooseModel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('/chooseModel').then(res => res.json()).then(data => {
            this.setState({
                data: data.arrKeys
            })
        })
    }

    postModelsName = (name) => {
        fetch('/selectedObject', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
    }

    deleteModel = (name)=>{
        fetch('/deleteModel', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
        let newData = this.state.data.filter((dat)=>dat!==name)
        this.setState({
            data: newData
        })
    }



    render() {
        let modelsArray = []

        const allModels = () => {
            for (let i = 0; i < this.state.data.length; i++)
            modelsArray.push(
                <div>
                    <Link to='/createData' onClick={() => { this.postModelsName(this.state.data[i]) }}>{this.state.data[i]}</Link>
                    <button className = 'btn btn-danger' onClick = {()=>{this.deleteModel(this.state.data[i])}}>Delete</button>
                </div>
            )

        }
        allModels()

        console.log(this.state.data)
        console.log(modelsArray)

        return (
            <div>
                <h1>Choose model</h1>
                {modelsArray}
                <Link to='/count'><button className='btn btn-success'>Do you want to create new Model</button></Link>
            </div>
        )
    }
}