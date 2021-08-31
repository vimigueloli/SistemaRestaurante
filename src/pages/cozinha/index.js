import React, { useState, useEffect, useCallback, useMemo, useRef, useImperativeHandle } from 'react';
import styles from './css.module.css'
import { Pedido } from '../../components/pedido';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import cliente from '../cliente';








export function Cozinha(){
    const [pedido,setPedido] = useState([])
//
    const ws = new WebSocket('ws://localhost:3001')
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
        if(estado == ' cozinha'){
            setPedido([...pedido,input])
        }
    }


//-------------entrega o prato que ja foi cozinhado----------------
    const handleEntrega = useCallback( event =>{
        var output = pedido
        for(let i=0;i < pedido.length ; i++){
            if(event.target.id == pedido[i]){
                output.splice(i,1)
                var decode = `${event.target.id}`
                decode = decode.replace(/,/gi,'')
                document.getElementById(decode).style.display ='none';
                decode = decode.replace(' cozinha',' pedido' )
                ws.send(decode)
                setPedido(output)
            }
        }
    },[pedido])
    

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
                        {
                            pedido.map(response => <Pedido onClick={handleEntrega}  mensagem={response} key={response}/>)
                        }
                        
                    <div className={styles.space} />
                </div>
                <div className={styles.footer} />
            </div>
        </div>
        
    )
}