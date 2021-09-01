# Sistema Restaurante

![GitHub](https://img.shields.io/github/license/vimigueloli/SistemaRestaurante?color=brigthgreen&style=plastic) <br/>

#### Esse Projeo Foi um desafio de um processo seletivo para desenvolvedor Front-end. O objetivo era desenvolver um sistema real time de um restaurante no modelo de fast food, no qual o cliente faz seu pedido em uma tela, a cozinha recebe os pedidos em outra tela e envia os pedidos concluidos para outra tela possibilitando os clientes verem os pedidos prontos. 

#### você pode conferir as interfaces nos links: <br/>https://sistema-restaurante.vercel.app/ <br/>https://sistema-restaurante.vercel.app/cozinha <br/>https://sistema-restaurante.vercel.app/pedidos

###### Lembrando que as interfaces acima não vão funcionar completamente pela falta do Back-End

# dependências Front-End

![GitHub](https://img.shields.io/badge/dependências-react-4e8dec?style=plastic)
![GitHub](https://img.shields.io/badge/-react_redux-4e8dec?style=plastic)
![GitHub](https://img.shields.io/badge/-redux-4e8dec?style=plastic)
![GitHub](https://img.shields.io/badge/-react_router_dom-4e8dec?style=plastic)
![GitHub](https://img.shields.io/badge/-websocket-4e8dec?style=plastic)

<br/>

#### O projedo depende de algumas bibliotecas e frameworks, então para o funcionamento dele é necessário instalar essas dependências com os seguintes comandos no shell do Windows:

```
npm install react
npm install redux
npm install react-redux
npm install react-router-dom
npm install websocket
```

# dependências Back-End

![GitHub](https://img.shields.io/badge/dependências-node-689f63?style=plastic)
![GitHub](https://img.shields.io/badge/-cors-689f63?style=plastic)
![GitHub](https://img.shields.io/badge/-dotenv-689f63?style=plastic)
![GitHub](https://img.shields.io/badge/-express-689f63?style=plastic)
![GitHub](https://img.shields.io/badge/-helmet-689f63?style=plastic)
![GitHub](https://img.shields.io/badge/-morgan-689f63?style=plastic)
![GitHub](https://img.shields.io/badge/-ws-689f63?style=plastic)

<br/>

#### O projedo para a comunicação entre telas em dispositivos diferentes necessita de um server preparado para comunicação via websocket, por tanto decidi colocar aqui o tutorial de como instalar esse server e suas dependências e em seguida como coloca-lo em uso.

##### Primeiro de tudo é necessário instalar o node pelo site oficial da ferramenta: https://nodejs.org/en/
##### Em seguida é necessário baixar o codigo do servidor desse projeto disponibilizada no repositório a seguir: https://github.com/vimigueloli/server 

#### Com os arquivos baixados é necessário abrir o terminal, se direcionar para o diretório onde o server está e aplicar os seguintes comandos:

```
npm install 
npm install websocket
```

#### Após as essas instalações você pode testar a build dessa web application rodando o servidor com o comando 'npm start' no repósitório do servidor Back-End e o comando 'yarn start' no repósitorio Front-End do projeto






