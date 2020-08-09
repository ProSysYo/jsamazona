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