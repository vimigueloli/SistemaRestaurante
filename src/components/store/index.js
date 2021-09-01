import { createStore } from 'redux'

/*-----------------------------------cardapio--------------------------------------*/
const cardapio = [
    {
        id: 1,
        nome: "XBurguer",
        preco: 12.5,
        ingredientes: "Sanduiche de pão, carne, queijo, alface e tomate",
        state: false,
        obs: " ",
        ordem: 0
    },
    {
        id: 2,
        nome: "XBacon",
        preco: 16.5,
        ingredientes: "Sanduiche de pão, carne, bacon, queijo, alface e tomate",
        state: false,
        obs: " ",
        ordem: 1
    },
    {
        id: 3,
        nome: "XChedder",
        preco: 16.5,
        ingredientes: "Sanduiche de pão, carne, queijo chedder,alface e tomate",
        state: false,
        obs: " ",
        ordem: 2
    },
    {
        id: 4,
        nome: "XEgg",
        preco: 16.5,
        ingredientes: "Sanduiche de pão, carne, queijo, ovo, alface e tomate",
        state: false,
        obs: " ",
        ordem: 3
    },
    {
        id: 5,
        nome: "Refri 500ml",
        preco: 8.5,
        ingredientes: "Copo de refrigerante de 500 ml com sabor a escolha",
        state: false,
        obs: " ",
        ordem: 4
    },
    {
        id: 6,
        nome: "Refri 350ml",
        preco: 7.5,
        ingredientes: "Copo de refrigerante de 350 ml com sabor a escolha",
        state: false,
        obs: " ",
        ordem: 5
    },
    {
        id: 7,
        nome: "Refri 200ml",
        preco: 6.5,
        ingredientes: "Copo de refrigerante de 200 ml com sabor a escolha",
        state: false,
        obs: " ",
        ordem: 6
    },
    {
        id: 8,
        nome: "Batata frita grande",
        preco: 5.5,
        ingredientes: "350g de batata frita",
        state: false,
        obs: " ",
        ordem: 7
    },
    {
        id: 9,
        nome: "Batata frita media",
        preco: 4.5,
        ingredientes: "250g de batata frita",
        state: false,
        obs: " ",
        ordem: 8
    },
    {
        id: 10,
        nome: "Batata frita pequena",
        preco: 3.5,
        ingredientes: "150g de batata frita",
        state: false,
        obs: " ",
        ordem: 9
    },
    {
        id: 11,
        nome: "Combo simples",
        preco: 22.5,
        ingredientes: "XBurguer, batata frita grande e refrigerante de 500ml com sabor a escolha",
        state: false,
        obs: " ",
        ordem: 10
    },
    {
        id: 12,
        nome: "Combo Bacon",
        preco: 25.5,
        ingredientes: "XBacon, batata frita grande com bacon e refrigerante de 500ml com sabor a escolha",
        state: false,
        obs: " ",
        ordem: 11
    },
    {
        id: 13,
        nome: "Combo chedder",
        preco: 25.5,
        ingredientes: "XChedder, batata frita grande com chedder e refrigerante de 500ml com sabor a escolha",
        state: false,
        obs: " ",
        ordem: 12
    },
]

/*-----------estado inicial da store------------*/
var initial_state = {
    console: 'oi',
    cardapio: cardapio,
    cliente: [],
    pedido: []
}


/*-------------------------função que altera os dados da store de acordo com ações disparadas---------------------------*/
function reducer(state = initial_state,action){

//---------coloca um pedido "no carrinho"----------
    if(action.type == "ALTERAÇÃO"){
        var content = state.cardapio
        var lista = state.pedido
        var novo
        var tirou = false
        var preco 
        var cont = lista.length
        console.log(action.obs)
        for(let i=0;i < content.length ; i++){
            if(action.numero == content[i].ordem){
                content[i].state = action.state
                novo = content[i].nome
                preco = content[i].preco
                content[i].obs = action.obs
            }
        }
        if(action.state == true){
            return{
                ...state,
                cardapio: content,
                pedido: [...lista,{prato: novo, obs: action.obs,preco: preco, id: cont}]
            }
        }else{
            for(let i=0;i < state.pedido.length;i++){
                if(tirou == false){
                    if(lista[i].prato == novo ){
                        lista.splice(i,1)
                        tirou = true
                        i--
                    }
                }else{
                    console.log('oi')
                    lista[i].id = i
                }
            }

            return{
                ...state,
                cardapio: content,
                pedido: lista
            }
        }
        
    }
    
//---------coloca um pedido "no carrinho"----------
    if(action.type == "CLIENTE"){
        var nome = action.nome
        return{
            ...state,
            cliente:{
                nome: nome,
            } 
        }
    }

/*----------retorno do estado a cada ciclo----------*/
    return state
}

/*------------------------export da store-------------------------*/
const store = createStore(reducer)
export default store