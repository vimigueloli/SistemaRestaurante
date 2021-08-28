import {createStore} from 'redux'


var initial_state = []






var cardapio = 2
  





initial_state = {
    cardapio: cardapio,
    console: 'oi'
}

function reducer(state = initial_state,action){
    /*if(action.type == ""){

    }*/
    return state
}

const store = createStore(reducer)

export default store