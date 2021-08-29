import {createStore} from 'redux'



var initial_state = []
  



initial_state = {
    console: 'oi',
    cardapio: [],
    backup: []
}

function reducer(state = initial_state,action){
    if(action.type == "INIT"){
        var content = action.cardapio
        //console.log(content)
        return{
            ...state,
            cardapio: content,
            backup: action.back
            
        }
    }
    if(action.type == "BUSCA"){
        var content = action.cardapio
        console.log(content)
        return{
            ...state,
            cardapio: content,
        }
    }
    
    if(action.type == "ALTERAÇÃO"){
        var content = state.cardapio
        console.log(action.obs)
        for(let i=0;i < content.length ; i++){
            if(action.numero == content[i].ordem){
                content[i].state = action.state
                content[i].obs = action.obs
            }
        }
        return{
            ...state,
            cardapio: content
        }
    }
    
    return state
}

const store = createStore(reducer)

export default store