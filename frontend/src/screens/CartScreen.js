import { parseRequestUrl, rerender } from './../util';
import { getProduct } from './../api';
import { getCartItems, setCartItems } from './../localStorage';

//Функция добавления товара в корзину
const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product ===item.product);
    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map((x) => x.product === existItem.product ? item : x);
        }        
    } else {
        cartItems = [...cartItems, item];
    }

    setCartItems(cartItems);

    if (forceUpdate) {
        rerender(CartScreen);
    }    
};

//Функция удаления товара с корзины
const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if (id === parseRequestUrl().id) {
        document.location.hash = '/cart';
    } else {
        rerender(CartScreen);
    }
};

const CartScreen = {

    after_render: () => {
        //Начало добавления событий на селекты
        //Выбираем все элементы с классом qty-select
        const qtySelects = document.getElementsByClassName('qty-select');

        //Перебираем весь массив qtySelects и на каждый select вешаем событие chgange
        Array.from(qtySelects).forEach((qtySelect) => {
            qtySelect.addEventListener('change', (e) => {
                //Находим товар с данным id по id селекта
                const item = getCartItems().find((x) => x.product === qtySelect.id);
                //Меняем в localStorage qty данного товара. Запускаем rerender компонента, для этого ставим forceUpdate = true
                addToCart({...item, qty: Number(e.target.value)}, true);
            });
        });

        //Начало добавления событий на кнопки удаления
        //Выбираем все кнопки с классом delete-button
        const deleteButtons = document.getElementsByClassName('delete-button');

        //Перебираем все элементы массива deleteButtons
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', () => {
                removeFromCart(deleteButton.id);
            });
        });
        //Добавление события на кнопку Proced To Checkout
        document.getElementById("checkout-button").addEventListener('click', () => {
            document.location.hash = '/signin';
        });

    },

    render: async () => {
        const request = parseRequestUrl();
        if (request.id) {
            const product = await getProduct(request.id); 
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1
            });
        }

        const cartItems = getCartItems();

        return `
            <div class="content cart">
                <div class="cart-list">
                    <ul class="cart-list-container">
                        <li>
                            <h3>Shopping Cart</h3>
                            <div>Price</div>
                        </li>
                        ${
                            cartItems.length === 0 
                            ? '<div>Cart is empty. <a href="/#/">Go Shopping</a></div>'
                            : cartItems.map(item => `
                                <li>
                                    <div class="cart-image">
                                        <img src="${item.image}" alt="${item.name}"/>
                                    </div>
                                    <div class="cart-name">
                                        <div>
                                            <a href="/#/product/${item.product}">
                                                ${item.name}
                                            </a>
                                        </div>
                                        <div>
                                            Qty:
                                            <select class="qty-select" id="${item.product}">
                                                ${[...Array(item.countInStock).keys()].map((x) => 
                                                    item.qty === x + 1
                                                        ? `<option selected value="${x + 1}">${x + 1}</option>`
                                                        : `<option value="${x + 1}">${x + 1}</option>`
                                                )}
                                            </select>
                                            <button type="button" class="delete-button" id="${item.product}">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div class="cart-price">
                                        $${item.price}
                                    </div>
                                </li>
                            `).join('\n')
                        }
                    </ul>                
                </div>
                <div class="cart-action">
                    <h3>
                        Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
                        :
                        $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </h3>
                    <button id="checkout-button" class="primary fw">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        `;
    }
};

export default CartScreen;