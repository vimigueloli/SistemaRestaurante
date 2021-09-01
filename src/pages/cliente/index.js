import React, {useState, useCallback} from 'react'
import styles from './css.module.css'
import { Produto } from '../../components/produto'
import {connect, useDispatch} from 'react-redux'



const Cliente = (state) => {
    const dispatch = useDispatch()
    const lista = state.state.cardapio
    const pedidos = state.state.pedido
    const cliente = state.state.cliente
    const precoTotal = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL",minimumFractionDigits: 2 });
    const total = precoTotal.format(calcTotal())
    var resumo = geraResumo(0)
    var output = geraResumo(1)
    const [troco,setTroco] = useState(precoTotal.format(0.0))
    const [searchOn,setSearchOn] = useState(false)
    const [filtro,setFilfro] = useState({type:'NOME', state: true})
    

//----------------estabelecedo uma conexão com o web socket----------------
    var ws = new WebSocket('ws://localhost:3001')

//-------------------------envia para o ws----------------------------
    const handleClickSendMessage = useCallback(() => {
        if(cliente.nome !== undefined){
            if(cliente.nome !== ''){
                var comparativo = precoTotal.format(0)
                if(total == comparativo){
                    window.alert("você não selecionou nenhum produto")
                }else{
                    output = geraResumo(1)
                    ws.send(output)
                    window.alert('Pedido realizado com sucesso')
                    reset()
                }
            }else{
                window.alert("por favor insira o seu nome")
            }
        }else{
            window.alert("por favor insira o seu nome")
        }
        
    }, [output,]);
    
//-------regista o nome da pessoa---------
    function handleNome(){
        var nome = document.getElementById('nome').value
        dispatch(regCliente(nome))
    }

//-------envia o nome da pessoa para store---------
    function regCliente(nome){
        return{
            type: "CLIENTE",
            nome: nome
        }
    }

//----------muda o tipo de busca que vai ser feita----------
    function handleFiltro(){
        if(filtro.state == true){
            setFilfro({type:'Nº', state: false})
        }else{
            setFilfro({type:'NOME', state: true})
        }
    }

//-----------ativa a busca por produtos------------- 
    const handleSubmit = event =>{
        event.preventDefault()
        
        if(document.getElementById('busca').value == ''){
        }else{
            setSearchOn(true)
            let buscar = document.getElementById('busca').value
            busca(buscar)
        }
        document.getElementById('busca').value = ''
    }

//-----------tira os produtos do estado de busca-------------
    function volta(){
        setSearchOn(false)
        let buscar = document.getElementById('busca').value
        busca(buscar)
    }

//---------motor de busca---------
    function busca(filter){
        for(let i =0;i < lista.length; i++){
            console.log(lista[i])
            let text
            if(filtro.state == true){
                text = lista[i].nome
            }else{
                text = `${lista[i].id}`
            }
            if(text.toUpperCase().indexOf(filter.toUpperCase())>-1) {
                document.getElementById(lista[i].id).style.display = "";
            }else{
                document.getElementById(lista[i].id).style.display = "none";
            }
        }
    }

//------------calcula o total-------------
    function calcTotal(){
        var total = 0
        pedidos.map(response=>{
            total = total + response.preco
        })
        return total
    }

//------------calcula o total-------------
    function geraResumo(config){
        var saida =[]
        var controle = `${cliente.nome}/`
        pedidos.map(response=>{
            if(response.obs ==''){
                saida = [...saida, {desc: `${response.prato} -${precoTotal.format(response.preco)}`}]
                controle = [...controle, `${response.prato} /`]
            }else{
                saida = [...saida, {desc: `${response.prato} (${response.obs}) -${precoTotal.format(response.preco)}`}]
                controle = `${controle}${response.prato} (${response.obs}) /`
            }
        })

        controle = `${controle} cozinha`
        console.log(saida)
        if(config == 0){
            return saida
        }else{
            return controle
        }

    }

//------------calcula o troco-------------
    function handleTroco(){
        var output = []
        var input =  document.getElementById('pago').value
        input = input.replace(",",".")
        input = parseFloat(input)
        var subtotal = total.replace('R$',' ')
        subtotal = subtotal.replace(',','.')
        console.log(subtotal)
        subtotal = parseFloat(subtotal)
        input = input - subtotal
        var compare = `- ${input}` 
        if(compare == '- NaN'){
            console.log('oi')
            window.alert("por favor insira somente numeros separados por (,) ou (.) no campo")
            document.getElementById('pago').value = ''
            output = precoTotal.format(0)
        }else{
            if(input < 0){
                input = input * -1
                output = `faltam ${precoTotal.format(input)}`
            }else{
                output = precoTotal.format(input)
            }
        }
        return output
    }

//------------reseta a compra-------------
    function reset(){
       document.location.reload()
    }


/*-----------------------------------------html-----------------------------------------*/
    return(
        <div>
            <div onClick={()=> console.log(pedidos)} className={styles.header}>
                <h1 className={styles.title}>FAÇA SEU PEDIDO</h1>
                <div className={styles.divisor}/>
            </div>
            <div className ={styles.container}>
                <div className={styles.menu}>
                    
                    <input
                        type={'text'} 
                        id={'nome'}
                        placeholder='Seu Nome' 
                        className={styles.nome,styles.entrada1} 
                        onChange={()=>handleNome()}
                    />
                    <form className={styles.form} id={'form'} onSubmit={handleSubmit}>

                            {
                                searchOn ?
                                <>
                                    <input 
                                        type='text' 
                                        id='busca'
                                        placeholder='Buscar por ...' 
                                        className={styles.entrada} 
                                        disabled={true}
                                    /> 
                                    <div className={styles.filtro} 
                                    onClick={() => volta()}>
                                        x
                                    </div>
                                </> :
                                <>
                                    <input 
                                        type='text' 
                                        id='busca'
                                        placeholder='Buscar por ...' 
                                        className={styles.entrada} 
                                        onClick={() =>{
                                            console.log("input")
                                        }}
                                    /> 
                                    <button 
                                        className={styles.filtro}
                                        onClick={handleFiltro}
                                    >
                                        {filtro.type} 
                                    </button>
                                    
                                </>
                            }
                            
                        
                    </form>
                </div>
                <div className={styles.produtos}>
                    <div className={styles.space} />
                    {
                        
                        lista.map(response => <Produto key={response.id}
                            nome={response.nome}
                            id={response.id}
                            ingredientes={response.ingredientes}
                            numero={response.id}
                            preco={response.preco}
                            ordem={response.ordem}
                        />)
                    }
                    <div className={styles.space} />
                </div>
                <div className={styles.outMenu}>
                    <div className={styles.resumo}>
                        <div className={styles.resContent}>
                            <h3>
                                RESUMO:
                            </h3>
                            {
                                resumo.map(response => <h3 key={response.desc}>
                                        {response.desc}
                                    </h3>
                                )
                                
                            }
                        </div>
                    </div>
                    <div className={styles.conta}>
                        <h3 onChange={()=> handleTroco()}>
                            TOTAL: {total}
                        </h3>
                        <div className={styles.troco}>
                            <h3>
                                PAGO: R$
                            </h3>
                            <input 
                                className={styles.trocoIn} 
                                id={'pago'} 
                                placeholder='00,00' 
                                type="text" 
                                onChange={()=>{
                                    setTroco(handleTroco())
                                }}
                            />
                        </div>
                        <h3 className={styles.troco}>
                            TROCO: {troco}
                        </h3>
                    </div>
                    <div className={styles.botoes}>
                        <button className={styles.botao} onClick={()=>{reset()}}>
                            <h3>CANCELAR</h3>
                        </button>
                        <button className={styles.botao} onClick={handleClickSendMessage}>
                            <h3>FINALIZAR</h3>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}


export default connect(state => ({state: state}))(Cliente)