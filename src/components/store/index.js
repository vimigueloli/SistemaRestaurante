import {createStore} from 'redux'



var initial_state = []
  

const cardapio = [
    {
        id: 1,
        nome: "Hamburguer",
        preco: 16.25,
        ingredientes: "pão, carne, queijo, alface e tomate",
        state: false,
        url: '../../assets/hamburguer.png',
        obs: "",
        ordem: 0
    },
    {
        id: 2,
        nome: "Refri 500ml",
        preco: 10.5,
        ingredientes: "Copo de refrigerante de 500 ml com sabor a escolha",
        state: false,
        obs: "",
        ordem: 1
    },
    {
        id: 3,
        nome: "Batata frita grande",
        preco: 8.5,
        ingredientes: "350g de batata frita",
        state: false,
        obs: "",
        ordem: 2
    },

    {
        id: 4,
        nome: "XBacon",
        preco: 16.5,
        ingredientes: "Sanduiche de pão,carne,bacon,queijo,salada e tomate",
        state: false,
        obs: "",
        ordem: 3
    },
    {
        id: 5,
        nome: "Combo simples",
        preco: 22.5,
        ingredientes: "Hamburguer, batata frita grande e refrigerante de 500ml com sabor a escolha",
        state: false,
        obs: "",
        ordem: 4
    }
]



initial_state = {
    console: 'oi',
    cardapio: cardapio,
    backup: []
}

function reducer(state = initial_state,action){
    /*if(action.type == "INIT"){
        var content = action.cardapio
        //console.log(content)
        return{
            ...state,
            cardapio: content,
            backup: action.back
            
        }
    }*/
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