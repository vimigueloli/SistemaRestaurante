import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './css.module.css'

export function Produto(props){
    const dispatch = useDispatch()
    const lista = useSelector(state => state.cardapio)
    const state = useSelector(state => state.cardapio[props.ordem].state)
    const precoProduto = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL",minimumFractionDigits: 2 });
    const valor = precoProduto.format(`${props.preco}`)

    

    

    function handleAlteracao(state) {
        let obs = (document.getElementById(props.numero).value)
        return{
            type: 'ALTERAÇÃO',
            state: state,
            numero: props.ordem,
            obs:obs
        }
    }

    const handleSelection = () =>{
        if(state == false){
            dispatch(handleAlteracao(true))
        }else{
            document.getElementById(props.numero).value = ''
            dispatch(handleAlteracao(false))
        }   
    }
    
    
    
    return(
            <>
        {

            state ?
            <div className={styles.container2} id={props.id}>
                <div className={styles.content} >
                    <div className={styles.nome} >
                        <h1>{props.nome}</h1>
                    </div>
                    <div className={styles.ing}>
                        <h1>{props.ingredientes}</h1>
                    </div>
                    <input type='text' 
                        id ={props.ordem}
                        placeholder={'Antes da seleção'}  
                        className={styles.obs}
                        disabled={true}
                    />
                    <div className={styles.valor}>
                        <div className={styles.add} onClick={handleSelection}>
                            Excluir
                        </div>
                        <div className={styles.preco}>
                            {valor}
                        </div>
                        
                    </div>
                    
                </div>
            <h1 className={styles.id}>
                    {props.numero}
            </h1>
            </div> :
            <div className={styles.container}  id={props.id}>
                <div className={styles.content}>
                    <div className={styles.nome}>
                        <h1>{props.nome}</h1>
                    </div>
                    <div className={styles.ing}>
                        <h1>{props.ingredientes}</h1>
                    </div>
                    <input type='text' 
                        id ={props.numero}
                        placeholder={'Alguma alteração?'}  
                        className={styles.obs}
                    />
                    <div className={styles.valor}>
                        <div className={styles.add} onClick={handleSelection}>
                            Add
                        </div>
                        <div className={styles.preco}>
                            {valor}
                        </div>
                        
                    </div>
                    
                </div>
                <h1 className={styles.id}>
                        {props.numero}
                </h1>
            </div>
        } 
        </>
    )
}