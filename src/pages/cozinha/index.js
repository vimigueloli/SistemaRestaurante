import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './css.module.css'
import { Pedido } from '../../components/pedido';
import useWebSocket, { ReadyState } from 'react-use-websocket';






export function Cozinha(){
    const [pedido,setPedido] = useState([])
    // output somente exemplo de saida planejar trafego
    const [output,setOutput] = useState(true)

//----------------estabelecedo uma conexão com o web socket----------------
    const ws = new WebSocket('ws://localhost:3001');
    const { lastMessage, readyState } = useWebSocket('ws://localhost:3001', {
        onOpen: () => console.log(`Connected to App WS`),
        onMessage: () => {
            handleNewMessage()
        }
    })

//-------------------------recebe do ws----------------------------
    function handleNewMessage(){
        ws.onmessage = function(msg) {
            console.log(msg.data);
            setPedido(msg.data)
        };
        
    }

//-------------------------envia para o ws----------------------------
    const handleClickSendMessage = useCallback(() => ws.send(output), []);

    
/*-----------------------------------------html-----------------------------------------*/
    return(
        <div>
            <div onClick={handleClickSendMessage} className={styles.header}>
                <h1 className={styles.title}>Pedidos</h1>
                <div className={styles.divisor}/>
            </div>
            <div className ={styles.container}>
                <div className={styles.pedidos}>
                    <div className={styles.space} />
                        <Pedido  mensagem={pedido}/>
                    <div className={styles.space} />
                </div>
                <div className={styles.footer} />
            </div>
        </div>
        
    )
}