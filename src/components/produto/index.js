import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './css.module.css'

export function Produto(props){
    const dispatch = useDispatch()
    const state = useSelector(state => state.cardapio[props.ordem].state)
    const precoProduto = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL",minimumFractionDigits: 2 });
    const valor = precoProduto.format(`${props.preco}`)

//-----------muda o estado do produto na store-----------
    function handleAlteracao(state) {
        let obs = (document.getElementById(`0${props.ordem}`).value)
        return{
            type: 'ALTERAÇÃO',
            state: state,
            numero: props.ordem,
            obs: obs
        }
    }

//----------verifica o estado atual do produto----------
    const handleSelection = () =>{
        if(state == false){
            dispatch(handleAlteracao(true))
        }else{
            document.getElementById(props.numero).value = ''
            dispatch(handleAlteracao(false))
        }   
    }
    
/*---------------------------------html--------------------------------------*/
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
                        id ={`0${props.ordem}`}
                        placeholder={'Antes da seleção'}  
                        className={styles.obs}
                        disabled={true}
                    />
                    <div className={styles.valor}>
                        <button className={styles.add} onClick={handleSelection}>
                            Excluir
                        </button>
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
                        id ={`0${props.ordem}`}
                        placeholder={'Alguma alteração?'}  
                        className={styles.obs}
                    />
                    <div className={styles.valor}>
                        <button className={styles.add} onClick={handleSelection}>
                            Add
                        </button>
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