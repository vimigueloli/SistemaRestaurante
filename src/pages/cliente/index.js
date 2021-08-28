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



const Cliente = () => {
    
    const dispatch = useDispatch()
    const lista = useSelector(state => state.cardapio)
    //const backup = useSelector(state => state.backup)
    const busca = (item) => {
        return{
        type: 'BUSCA',
        cardapio: item
    }}

    function search(filter){
        let content = lista
        //console.log(output)
        let i = 0
        let objs = []
        content.map(response => {
            let text = response.nome
            
            if(text.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
            }else{
                objs = [...objs,response]
                content.splice(i, 1);
            }
            i++
        })

        var output =[]
        content.map(response =>{
            output = [...output,response]
        })
        objs.map(response =>{
            output = [...output,response]
        })
        console.log(output)
        return output
        
    }

    const handleSubmit = event =>{
        event.preventDefault()
        //console.log(document.getElementById('busca').value)
        if(document.getElementById('busca').value == ''){
        }else{
            let texto = search(document.getElementById('busca').value)
            dispatch(busca(texto))
        }
        document.getElementById('busca').value = ''
    }

    
    

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
            cardapio: item
        }
    }

    const { loading, error, data } = useQuery(QUERY, {
        variables: {
          limit: 10
        }
    });
    if (loading) return "Loading...";
    if (error) return "Something Bad Happened";
    
    var cardapio = data.allProdutos
    var backup = data.allProdutos
    dispatch(handleCardapio(cardapio))

    return(
        <div>
            <div onClick={()=> console.log(lista)} className={styles.header}>
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
                    <form className={styles.form} id={3} onSubmit={handleSubmit}>
                        <input 
                            type='text' 
                            id='busca'
                            placeholder='Buscar por ...' 
                            className={styles.entrada} 
                        />
                        <h3 className={styles.filtro}>id</h3>
                    </form>
                </div>
                <div className={styles.produtos}>
                    <div className={styles.space} />
                    {
                        lista.map(response => <Produto key={response.id}
                            nome={response.nome}
                            id={response.id}
                            ingredientes={response.ingredientes}
                            numero={response.numero}
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


export default connect(state => ({state: state.cardapio}))(Cliente)