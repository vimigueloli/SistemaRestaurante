import React from 'react'
import styles from './css.module.css'

export function Pedido(props){
    return(
        <div className={styles.container}>
            {props.mensagem}
        </div>
    )
}
