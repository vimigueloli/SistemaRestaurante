import React, {useEffect, useState} from 'react'
import styles from './css.module.css'
import { Produto } from '../../components/produto'
import { useQuery } from "graphql-hooks";
import {connect, useSelector, useDispatch} from 'react-redux'


const QUERY = `query MyQuery {
    allProdutos {
      id,
      numero,
      nome,
      preco,
      ingredientes
    }
}`



const Cliente = (state) => {
    const dispatch = useDispatch()
    const lista = state.lista
    const [searchOn,setSearchOn] = useState(false)
    const [filtro,setFilfro] = useState('NOME')

//---------motor de busca---------
    function busca(filter,type){
        for(let i =0;i < lista.length; i++){
            console.log(lista[i])
            let text
            if(type == 'NOME'){
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

//----------muda o tipo de busca que vai ser feita----------
    function handleFiltro(){
        if(filtro == 'NOME'){
            setFilfro('Nº')
        }else{
            setFilfro('NOME')
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
        busca(buscar,filtro)
    }

/* -----------------------------------------
        Implementação com o Dato CMS
/* função que habilita os estados dos produtos
    const handleCardapio = (item) => {
        let i = 0
        item.map(response => {
            response.state = false 
            response.obs = ''
            response.ordem = i
            i++
        })
        return{
            type: 'INIT',
            cardapio: item,
            back: item
        }
    }

/*requisição do conteudo do datocms
    const { loading, error, data } = useQuery(QUERY, {
        variables: {
          limit: 10
        }
    });
    if (loading) return "Loading...";
    if (error) return "Something Bad Happened";
//enviando isso para a store
    var cardapio = data.allProdutos
    dispatch(handleCardapio(cardapio))
*/
    return(
        <div>
            <div onClick={()=> console.log(state)} className={styles.header}>
                <h1 className={styles.title}>FAÇA SEU PEDIDO</h1>
                <div className={styles.divisor}/>
            </div>
            <div className ={styles.container}>
                <div className={styles.menu}>
                    
                    <input
                        type='text' 
                        id='nome'
                        placeholder='Seu Nome' 
                        className={styles.nome,styles.entrada1} 
                    />
                    <input 
                        type='text' 
                        id='mesa'
                        placeholder='nº' 
                        className={styles.mesa} 
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
                                    <div className={styles.botao} 
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
                                    <div 
                                        className={styles.filtro}
                                        onClick={handleFiltro}
                                    >
                                       <a> {filtro} </a>
                                    </div>
                                    
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
                            <h3>
                                item
                            </h3>
                            <h3>
                                item - obs
                            </h3>
                        </div>
                    </div>
                    <div className={styles.conta}>
                        <h3>
                            TOTAL: 
                        </h3>
                        <div className={styles.troco}>
                            <h3>
                                PAGO:
                            </h3>
                            <input className={styles.trocoIn} placeholder='00,00' type="text" />
                        </div>
                        <h3>
                            TROCO:
                        </h3>
                    </div>
                    <div className={styles.botoes}>
                        <div className={styles.botao}>
                            <h3>CANCELAR</h3>
                        </div>
                        <div className={styles.botao}>
                            <h3>FINALIZAR</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}


export default connect(state => ({lista: state.cardapio}))(Cliente)