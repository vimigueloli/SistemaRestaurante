import React, {useState, useEffect} from 'react'
import styles from './css.module.css'

export function Produto(props){
    const [selecionado,setSelecionado] = useState(false)
    const [obs,setObs] = useState('')
    const handleChange = event =>{
        setObs(document.getElementById(props.numero).value)   
    }
    const handleSelection = () =>{
        if(selecionado == false){
            setSelecionado(true)
        }else{
            setSelecionado(false)
        }   
    }
    var precoProduto = new Intl.NumberFormat("pt-BR",
                        { style: "currency", currency: "BRL",
                          minimumFractionDigits: 2 });
    const valor = precoProduto.format(`${props.preco}`)
    
    return(
            <>
        {

            selecionado ?
            <div className={styles.container2} >
                <div className={styles.content} >
                    <div className={styles.nome} >
                        <h1>{props.nome}</h1>
                    </div>
                    <div className={styles.ing}>
                        <h1>{props.ingredientes}</h1>
                    </div>
                    <input type='text' 
                        id ={props.numero}
                        placeholder={'Alguma alteração?'}  
                        className={styles.obs}
                        onChange={handleChange}
                        onClick={event=> event.preventDefault()}
                    />
                    <div className={styles.valor}>
                        <div className={styles.add} onClick={handleSelection}>
                            Excluir
                        </div>
                        <h1>
                            {valor}
                        </h1>
                        
                    </div>
                    
                </div>
            <h1 className={styles.id}>
                    {props.numero}
            </h1>
            </div> :
            <div className={styles.container}  >
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
                        onChange={handleChange}
                    />
                    <div className={styles.valor}>
                        <div className={styles.add2} onClick={handleSelection}>
                            Add
                        </div>
                        <h1>
                            {valor}
                        </h1>
                        
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