import React from 'react'
import styles from './css.module.css'

export function Produto(props){
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.nome}>
                    <h1>{props.nome}</h1>
                </div>
                <div className={styles.ing}>
                    <h1>{props.ingredientes}</h1>
                </div>
            </div>
        </div>
    )
}