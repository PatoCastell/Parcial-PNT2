import Vue from "vue"
import VueForm from "vue-form"

var options = {
    validations: {
    'no-espacios' : function(value){
        return !value.includes(' ')
     }
    }
}

Vue.use(VueForm, options)
 
