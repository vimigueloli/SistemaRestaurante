import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Cliente from './pages/cliente'
import {Cozinha} from './pages/cozinha'
import {Pedidos} from './pages/pedidos'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Cliente} />
                <Route path='/cozinha' exact component={Cozinha} />
                <Route path='/pedidos' exact component={Pedidos} />
            </Switch>
        </BrowserRouter>
    )
}
