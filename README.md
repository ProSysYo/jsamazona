JS AMAZONA

1. Create Folder Structure
    1.1 create root folder as jsamazona
    1.2 add frontend and backend folder
    1.3 create src folder in frontend
    1.4 create index.html with heading jsamazona in src
    1.5 run npm init in frontend folder
    1.6 npm install live-server
    1.7 add start command as live-server src --verbose
    1.8 run npm start
    1.9 check result
2. Design Website
    2.1 create style.css
    2.2 link style.css to index.html
    2.3 create div.grid-container
    2.4 create header, main and footer
    2.5 style html, body
    2.6 style grid-container, header, main and footer
3. Create Static Home Screen
    3.1 create ul.products
    3.2 create li
    3.3 create div.product
    3.4 add .product-image, .product-name, .product-brand, .product-price
    3.5 style ul.products and internal divs
    3.6 duplicate 2 times to show 3 products
4. Render Dynamic Home Screen
    create data.js
    export an array of 6 products
    create screens/HomeScreen.js
    export HomeScreen as an object with render() method
    implement render()
    import data.js
    return products mapped to lis inside an ul
    create app.js
    link it to index.html as module
    set main id to main-container
    create router() function
    set main_container innerHTML to HomeScreen.render()
    set load event of window to router() function
5. Build Url Router
    create routes as route:screen object for home screen
    create utils.js
    export parseRequestURL()
    set url as hash address split by slash
    return resource, id and verb of url
    update router()
    set request as parseRequestURL()
    build parsedUrl and compare with routes
    if route exists render it, else render Error404
    create screens/Error404.js and render error message
6. Create Node.JS Server
    run npm init in root jsamazona folder
    npm install express
    create server.js
    add start command as node backend/server.js
    require express
    move data.js from frontend to backend
    create route for /api/products
    return products in data.js
    run npm start
7. Load Products From Backend
    edit HomeScreen.js
    make render async
    fetch products from '/api/products' in render()
    make router() async and call await HomeScreen.render()
    use cors on backend
    check the result
8. Add Webpack
    cd frontend
    npm install -D webpack webpack-cli webpack-dev-server
    npm uninstall live-server
    "start": "webpack-dev-server --mode development --watch-content-base --open"
    move index.html, style.css and images to frontend folder
    rename app.js to index.js
    update index.html
    add script main.js before body tag
    npm start
    npm install axios
    change fetch to axios in HomeScreen
9. Install Babel For ES6 Syntax
    npm install -D babel core, cli, node, preset-env
    Create .babelrc and set presets to @babel/preset-env
    npm install -D nodemon
    set start: nodemon --watch backend --exec babel-node backend/server.js
    convert require to import in server.js
    npm start
10.
11.
12.Create Rating Component
    create components/Rating.js
    link to fontawesome.css in index.html
    create div.rating
    define Rating object with render()
    if !props.value return empty div
    else use fa fa-star, fa-star-half-o and fa-star-o
    last span for props.text || ''
    style div.rating, span and last span
    Edit HomeScreen
    Add div.product-rating and use Rating component
13. Product Screen
    get product id from request
    implement /api/product/:id api
    send Ajax request to product api
14. Product Screen UI
    create back to result link
    create div.details with 3 columns
    column 1 for product image
    column 2 for product information
    column 3 form product action
    style .details and all columns
    create add to cart button with add-button id
15. Product Screen Action
    after_render() to add event to the button
    add event handler for the button
    redirect user to cart/:product_id
    implement after_render in index.js
16. Add To Cart Action
    create CartScreen.js
    parseRequestUrl
    getProduct(request.id)
    addToCart
    getCartItems
    cartItems.find
    if existItem update qty
    else add item
    setCartItems
17. Cart Screen UI
    cartItems = getCartItems()
    create 2 columns for cart items and cart action
    cartItems.length === 0 ? cart is empty
    show item image, name, qty and price
    cart action
    Subtotal
    Proceed to Checkout button
    Add CSS Style
18. Update and Delete Cart Items
    add qty select next to each item
    after_render()
    add change event to qty select
    getCartItems() and pass to addToCart()
    set force to true to addToCart()
    create rerender() as (component, areaName = 'content')
    component.render and component.after_render
    if force is true then rerender()
    add delete button next to each item
    add click event to qty button
    call removeFromCart(deleteButton.id)
    implement removeFromCart(id)
    setCartItems( getCartItems().filter)
    if id === parseRequestUrl().id? redirect to '/cart'
    else rerender(CartScreen);
19. Connect To MongoDB and Create Admin User
    npm install mongoose
    connect to mongodb
    create config.js
    npm install dotenv
    export MONGODB_URL
    create models/userModel.js
    create userSchema and userModel
    create userRoute
    create createadmin route