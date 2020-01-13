import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export default class Field extends Component {

    fieldParams = ["name", "type", "required", "payman", "errorMessage"]


    handleClick = () => {
        let newObj = {}
        newObj.value = {};

        newObj.key = document.querySelectorAll('.modelsName')[0].value
        for (let i = 0; i < this.props.count; i++) {
            let name = document.querySelectorAll('.name')[i].value

            newObj.value[name] = {};
            
            var e = document.getElementById("chooseType");
            var selectedType = e.options[e.selectedIndex].text;
            
            var bool = document.getElementById("isRequired");
            var isRequired = bool.options[e.selectedIndex].text;

            newObj.value[name][this.fieldParams[1]] = selectedType;
            newObj.value[name][this.fieldParams[2]] = isRequired;
            // newObj[name] = {};

            let payman = document.querySelectorAll('.payman')[i].value
            let err = document.querySelectorAll('.error')[i].value
            if (payman !== undefined && err !== undefined) {
                newObj.value[name][this.fieldParams[3]] = payman;
                newObj.value[name][this.fieldParams[4]] = err;
            }
        }
        console.log(newObj)
        fetch('/main', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newObj)
        })
    }

    render() {

        let field = []
        for (let i = 0; i < this.props.count; i++) {
            field.push(
                <div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">{this.fieldParams[0]}</label>
                        <input type="text" className="form-control name" />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">{this.fieldParams[1]}</label>
                        <select class="form-control" id="chooseType">
                            <option>Choose type ...</option>
                            <option>String</option>
                            <option>Number</option>
                            <option>Boolean</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">{this.fieldParams[2]}</label>
                        <select class="form-control" id="isRequired">
                            <option>Choose type ...</option>
                            <option>true</option>
                            <option>false</option>
                        </select>
                    </div>
                    <div>
                        <p>if (<input type="text" className="payman" />) throw new error <input type="text" className="error" /> </p>
                    </div>
                    <hr />
                </div>
            )

        }
        console.log(this.props.count)
        return (
            <div>
                <div className="form-group">
                        <label for="exampleFormControlInput1" >Model's name</label>
                        <input type="text" className="form-control modelsName" />
                    </div>
                {field}
                <Link className="btn btn-success" onClick={() => { this.handleClick() }} to='/chooseModels'>Create Model and go to models list</Link>
            </div>
        )
    }
}