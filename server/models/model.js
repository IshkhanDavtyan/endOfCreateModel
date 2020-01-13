const mongoose = require('mongoose')
const fs = require('fs');
const validator = require('validator')



try{


    let file = JSON.parse(fs.readFileSync('selectedObject.json'));
    for(let [key,val] of Object.entries(file)){
      
      for(let[vk,vv] of Object.entries(val) ){

      
      if(vv.payman!==undefined){
        vv.validate = (value)=>{
          if(eval(vv.payman)){
            throw new Error(vv.errorMessage)
          }
        }
      }}
      
    const objectSchema = mongoose.Schema(val)
    const objectModel = mongoose.model(key,objectSchema)
    module.exports = objectModel
    }
    
    


}
catch(e){
    
}