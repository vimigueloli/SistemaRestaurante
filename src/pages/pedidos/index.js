import React, {useState} from 'react'
import styles from './css.module.css'

export function Pedidos(){

/*-----------------------------------------html-----------------------------------------*/
    return(
        <div>
            <div onClick={()=> console.log()} className={styles.header}>
                <h1 className={styles.title}>Venha busca seu Pedido</h1>
                <div className={styles.divisor}/>
            </div>
            <div className ={styles.container}>
                <div className={styles.pedidos}>
                    <div className={styles.space} />
                    
                    <div className={styles.space} />
                </div>
                <div className={styles.footer} />
            </div>
        </div>
        
    )
}