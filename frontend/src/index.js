import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js';
import { parseRequestUrl } from './util.js';
import Error404Screen from './screens/Error404Screen.js';
import CartScreen from './screens/CartScreen.js';
import SigninScreen from './screens/SignInScreen.js';
import Header from './components/Header';

const routes = {
    "/": HomeScreen,
    "/product/:id": ProductScreen,
    "/cart/:id": CartScreen,
    '/cart': CartScreen,
    '/signin': SigninScreen
}

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = 
    (request.resource ? `/${request.resource}` : '/') + 
    (request.id ? '/:id' : '') + 
    (request.verb ? `/${request.verb}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await Header.after_render();

    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render();    
    await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);