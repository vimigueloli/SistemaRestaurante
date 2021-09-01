import React from 'react'
import styles from './css.module.css'

export function Pedido(props){
    const decode = props.mensagem.replace(/,/gi,'')
    const dados = decode.split('/')
    const nome = dados[0]
    const pratos = setPratos()
    

//----------------------separa os pratos da string recebida------------------------
    function setPratos(){
        var output =[]
        for(let i=1;i < (dados.length-1);i++){
            output = [...output, dados[i]] 
        }
        return output
    }

    return(
        <div className={styles.container} id={decode} dados={props.mensagem}>
            <div className={styles.nome}>
                {nome}
            </div>
            <div className={styles.produtos}>
            {
                pratos.map(response=> <div className={styles.texto}>
                    {response}
                </div>)
            }
            </div>
            <button className={styles.botao} id={props.mensagem} onClick={props.onClick}>
                entregar
            </button>
        </div>
    )
}
