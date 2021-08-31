import React, { useState, useEffect, useCallback, useMemo, useRef, useImperativeHandle } from 'react';
import styles from './css.module.css'
import { Entregas } from '../../components/entregas';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { w3cwebsocket as W3CWebSocket } from "websocket";



export function Pedidos(){
    const [pedido,setPedido] = useState('')
//
    const client = new W3CWebSocket('ws://localhost:3001');
    



//----------------recebendo pedidos------------------
    client.onmessage = (mensagem) =>{
        if(mensagem.data != pedido){
            handleSetPedido(mensagem.data)
        }
    }
    function handleSetPedido(input){
        var decode = input.replace(/,/gi,'')
        var dados = decode.split('/')
        var estado = dados[dados.length -1] 
        console.log(`*${estado}*`)
        if(estado == ' pedido'){
            setPedido(input)
        }
    }

/*-----------------------------------------html-----------------------------------------*/
    return(
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Pedidos</h1>
                <div className={styles.divisor}/>
            </div>
            <div className ={styles.container}>
                <div className={styles.pedidos}>
                    <div className={styles.space} />
                        <Entregas mensagem={pedido} key={pedido}/>
                    <div className={styles.space} />
                </div>
                <div className={styles.footer} />
            </div>
        </div>
        
    )
}