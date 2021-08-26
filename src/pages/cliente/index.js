import React from 'react'
import styles from './css.module.css'
import { Produto } from '../../modules/produto'

export function Cliente(){
    return(
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Faça seu Pedido</h1>
            </div>
            <div className ={styles.container}>
                <div className={styles.menu}>
                    <input type='text' placeholder='Seu Nome' className={styles.nome,styles.entrada} />
                    <input type='text' placeholder='nº' className={styles.mesa,styles.entrada} />
                    <input type='text' placeholder='buscar por ...' className={styles.busca,styles.entrada} />
                    <h3>id</h3>
                </div>
                <div className={styles.produtos}>
                    <Produto />
                    <Produto />
                    <Produto />
                    <Produto />
                    <Produto />
                    <Produto />
                    <Produto />
                    <Produto />
                    <Produto />
                    <Produto />
                    <Produto />
                </div>
                <div>
                    <div>
                        <div>
                            <h3>
                                resumo:
                            </h3>
                        </div>
                    </div>
                    <div>
                        <h3>
                            total: 
                        </h3>
                        <div>
                            <h3>
                                pago:
                            </h3>
                            <input type="text" />
                        </div>
                        <h3>
                            troco:
                        </h3>
                    </div>
                    <div>
                        <div className={styles.botao}>
                            <h3>cancelar</h3>
                        </div>
                        <div className={styles.botao}>
                            <h3>finalizar</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}