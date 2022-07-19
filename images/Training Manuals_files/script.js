// Get status of "hasRun" variable from sessionStorage
let hasRun = JSON.parse(sessionStorage.getItem("hasRun"));

/* If "hasRun" is null/undefined, declare variables and add products to objects and array. Else, skip */
console.log("hasRun is - " + hasRun);

if (hasRun == false || hasRun == undefined || hasRun == null) {
    console.log("hasRun is false/null")
    // Create empty array for product objects
    let productArray = [];

    // Declare other variables
    let cartContentsArray = [];
    let cartSubTotal = 0;
    let cartTotal = 0;
    let numOfCartItems = 0;
    let addDeliveryAmount = 0;
    let subtractCouponAmount = 0;

    // Create constructor function to add product info to objects
    function productObj(pname, price, image) {
        this.pname = pname;
        this.price = price;
        this.image = image
    }

    // Add product info to objects
    let product1 = new productObj("training-manuals", 1500.00, "images/manuals.jpeg");
    let product2 = new productObj("assessment-manuals", 4500.00, "images/selfAssessments.jpeg");
    let product3 = new productObj("consults", 950.00, "images/consultsShop/consult1.jpeg");
    let product4 = new productObj("certification", 1900.00, "images/certification.jpeg");

    // Add product objects to array
    productArray = [product1, product2, product3, product4];

    /* Set the "hasRun" variable to true, now that products have been added to array and other variables have been declared. We don't need this to run a second time. */
    hasRun = true;

    // Add arrays and variable values to sessionStorage so they will be available on any page of website
    sessionStorage.setItem("hasRun", JSON.stringify(hasRun));
    sessionStorage.setItem("productArray", JSON.stringify(productArray));
    sessionStorage.setItem("cartSubTotal", JSON.stringify(cartSubTotal));
    sessionStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    sessionStorage.setItem("numOfCartItems", JSON.stringify(numOfCartItems));
    sessionStorage.setItem("cartContentsArray", JSON.stringify(cartContentsArray));

    sessionStorage.setItem("addDeliveryAmount", JSON.stringify(addDeliveryAmount));
    sessionStorage.setItem("subtractCouponAmount", JSON.stringify(subtractCouponAmount));

    console.log("Products have been added to array and sessionStorage.");

}; 

// Set sessionstorage
function setSessionStorage() {
    sessionStorage.setItem("hasRun", JSON.stringify(hasRun));
    sessionStorage.setItem("productArray", JSON.stringify(productArray));
    sessionStorage.setItem("cartSubTotal", JSON.stringify(cartSubTotal));
    sessionStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    sessionStorage.setItem("numOfCartItems", JSON.stringify(numOfCartItems));
    sessionStorage.setItem("cartContentsArray", JSON.stringify(cartContentsArray));
    sessionStorage.setItem("addDeliveryAmount", JSON.stringify(addDeliveryAmount));
    sessionStorage.setItem("subtractCouponAmount", JSON.stringify(subtractCouponAmount));
};

// Set sessionstorage
function getSessionStorage() {
    hasRun = JSON.parse(sessionStorage.getItem("hasRun"));
    productArray = JSON.parse(sessionStorage.getItem("productArray"));
    cartSubTotal = JSON.parse(sessionStorage.getItem("cartSubTotal"));
    cartTotal = JSON.parse(sessionStorage.getItem("cartTotal"));
    numOfCartItems = JSON.parse(sessionStorage.getItem("numOfCartItems"));
    cartContentsArray = JSON.parse(sessionStorage.getItem("cartContentsArray"));
    addDeliveryAmount = JSON.parse(sessionStorage.getItem("addDeliveryAmount"));
    subtractCouponAmount = JSON.parse(sessionStorage.getItem("subtractCouponAmount"));

};

// Update cart total in top right corner
function updateCartItemsText() {
    // Fetch # of cart items from sessionStorage
    numOfCartItems = JSON.parse(sessionStorage.getItem("numOfCartItems"));
    let selectCartText = document.querySelector(".cart-text");
    // Update & show number of cart items
    if (numOfCartItems > 0 && selectCartText) {
        selectCartText.innerHTML = numOfCartItems;
    }
};

/* This function is called when user clicks the "Add to cart" button on one of the product details pages. It creates a button that says "Go to cart" next to "Add to cart" button. Clicking "Go to cart" takes the user to the 
"shoppingCart.html" page where they can see the contents of their cart. */
function createGoToCart() {
    let selectButtonDiv = document.querySelector(".priceAndButton");

    /* If the "priceAndButton" div exists (i.e. because user is on one of the product details pages), create button that says "Go to cart" */
    if (selectButtonDiv) {
        console.log("createGotoCart has run");
        let createButton = document.createElement("button");

        // Add button to Bootstrap classes for styling
        createButton.className = "btn btn-outline-primary goToCart";
        createButton.innerHTML = "Go to Cart";

        /* Add event listener, so that clicking the button takes user to shopping cart page. Learned to use location.href
         to direct user to new page here: 
         https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage */

        createButton.addEventListener("click", function() {
            
            window.location.href = "shoppingCart.html";
        })

        // Add button to parent div
        selectButtonDiv.appendChild(createButton);
    
    // End of if statement
    }

// createGoToCart() function ends
}

/* Adds cost of delivery and subtracts discounts where applicable */
function addDeliveryInfo() {
    let selectShippingButton = document.querySelector(".shippingButton");
    // Check if user is on shipping page
    if (selectShippingButton) {
        console.log("addDeliveryInfo has run");
        // Get cart sub total from session storage
        cartSubTotal = JSON.parse(sessionStorage.getItem("cartSubTotal"));
        addDeliveryAmount = JSON.parse(sessionStorage.getItem("addDeliveryAmount"));
        subtractCouponAmount = JSON.parse(sessionStorage.getItem("subtractCouponAmount"));

        let collectOrDeliver = document.getElementById("collect-or-deliver").value;

        /* Check radio button selection */
        let couponChosen = document.querySelector("input[name='coupon-radio']:checked").value;
        // Change selection from string to number on form selection
        subtractCouponAmount = Number(couponChosen);
        addDeliveryAmount = Number(collectOrDeliver);

        // Calculate total | add delivery fee & subtract coupon
        cartTotal = cartSubTotal + addDeliveryAmount - subtractCouponAmount;

        // Update session storage with new total
        sessionStorage.setItem("addDeliveryAmount", JSON.stringify(addDeliveryAmount));
        sessionStorage.setItem("subtractCouponAmount", JSON.stringify(subtractCouponAmount));
        sessionStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    }
}

// Create order number
function createOrderNumber() {
    let num1 = Math.floor(Math.random() * 1000) + 1;
    num1 = num1.toString();

    let num2 = Math.floor(Math.random() * 1000) + 1;
    num2 = num2.toString();

    let orderNum = "order" + num1 + num2;
    sessionStorage.setItem("orderNum", JSON.stringify(orderNum));
}

/* Display contents of shopping cart */
function showCart() {
    let selectCartDiv = document.querySelector(".cartContents");

    // Check if cartContents div exists
    if (selectCartDiv) {
        console.log("showcart function has run - cart empty.");
        
        // Get cart contents from session storage
        cartContentsArray = JSON.parse(sessionStorage.getItem("cartContentsArray"));

        /* Check if there are items in cart */
        if (cartContentsArray.length == 0) {
            selectCartDiv = document.querySelector(".cartContents");
            let createPara = document.createElement("p");

            // Create message if cart is empty
            createPara.innerHTML = "Your shopping cart is empty.";
            createPara.style.color = "red";

            selectCartDiv.appendChild(createPara);

        } else {
            // Display products in shopping cart
            console.log("showcart function has run - cart has items.");

            // Declare variables
            productArray = JSON.parse(sessionStorage.getItem("productArray"));

            let createPara3 = document.createElement("p");
            let createPara4 = document.createElement("p");
            let createPara5 = document.createElement("p");
            let createShippingButton = document.createElement("button");

            let selectCartPageDiv = document.querySelector(".cartPage");
            let createCartSummaryDiv = document.createElement("div");

            // For loop to display each product in cart
            for (let i = 0; i <= cartContentsArray.length - 1; i++) {
                
                let createDiv = document.createElement("div");
                let createImg = document.createElement("img");
                let createPara = document.createElement("p");
                let createPara2 = document.createElement("p");
                let selectCartDiv = document.querySelector(".cartContents");

                // Create a variable referencing cart items
                let ref = cartContentsArray[i];

                // Create contents of each cart item
                createImg.src = productArray[ref].image;
                createImg.alt = productArray[ref].pname;

                createPara.innerHTML = productArray[ref].pname + "<br><b>In stock</b>";
                createPara2.innerHTML = "R " + productArray[ref].price;
                createPara2.className = "itemPricePara";

                // Add shadow around div
                createDiv.className = "cartItem shadow-sm";

                createDiv.appendChild(createImg);
                createDiv.appendChild(createPara);
                createDiv.appendChild(createPara2);
                
                // Append elements to parent div
                selectCartDiv.appendChild(createDiv);
            }

            // Fetch subtotal from session storage
            cartSubTotal = JSON.parse(sessionStorage.getItem("cartSubTotal"));

            // Fetch # of cart items from session storage
            let numOfCartItems = JSON.parse(sessionStorage.getItem("numOfCartItems"));

            // Calculate vat
            let vatAmount = cartSubTotal * 0.15;

            // Add VAT to subtotal
            cartSubTotal = vatAmount + cartSubTotal;

            // Create "Cart Summary" on right side of Shopping cart page
            createPara3.innerHTML = "Cart Summary";
            createPara3.style.fontWeight = "bold";

            /* Round number to 2 decimal places */
            createPara4.innerHTML = "Incl. VAT(15%): R " + vatAmount.toFixed(2); 
            createPara4.style.fontSize = "14px";
            createPara4.style.marginTop = "20px";
            createPara4.style.marginBottom = "0px";

            // Add subtotal & number of cart items
            createPara5.innerHTML = "<b>SubTotal:</b> <span style='font-size:13px;'>(" + numOfCartItems + " item/s )</span> R " + cartSubTotal.toFixed(2);
            createPara5.style.borderBottom = "1px dotted #b3b3b3";

            // Add shadow & add elements to parent div
            createCartSummaryDiv.className = "cartSummary shadow-sm";
            createCartSummaryDiv.appendChild(createPara3);
            createCartSummaryDiv.appendChild(createPara4);
            createCartSummaryDiv.appendChild(createPara5);

            // Get cart total from session storage
            cartTotal = JSON.parse(sessionStorage.getItem("cartTotal"));
           
            /* Check if total is calculated else skip displaying total & create "Confirm order" button, & create "Proceed to shipping" button */
            if (cartTotal > 0) {
                console.log("Cart total is being calculated");

                // Get amounts from sessionStorage
                addDeliveryAmount = JSON.parse(sessionStorage.getItem("addDeliveryAmount"));
                subtractCouponAmount = JSON.parse(sessionStorage.getItem("subtractCouponAmount"));

                // Assign variables
                let createPara6 = document.createElement("p");
                let createPara7 = document.createElement("p");
                let createPara8 = document.createElement("p");

                let createConfirmOrderButton = document.createElement("button");

                // Add delivery fee and coupon
                createPara7.innerHTML = "Delivery fee R " + addDeliveryAmount;
                createPara8.innerHTML = "Less coupon discount - R " + subtractCouponAmount; 
                createPara8.style.borderBottom = "1px dotted #b3b3b3"

                // Display final total
                createPara6.innerHTML = "Total R " + cartTotal.toFixed(2);

                // Create "Confirm order" button
                createConfirmOrderButton.innerHTML = "Confirm Order";
                createConfirmOrderButton.className = "btn btn-primary confirmOrder";
                
                // Append paragraphs to parent div
                createCartSummaryDiv.appendChild(createPara7);
                createCartSummaryDiv.appendChild(createPara8);
                createCartSummaryDiv.appendChild(createPara6);
                createCartSummaryDiv.appendChild(createConfirmOrderButton);

            } else {
                // if no total, create "Proceed to shipping" button
                createShippingButton.innerHTML = "Proceed to shipping";
                createShippingButton.className = "btn btn-primary toShipping";
                createCartSummaryDiv.appendChild(createShippingButton);
            }
            // Add cart summary div to parent div
            selectCartPageDiv.appendChild(createCartSummaryDiv);
        }
    }
}


$(document).ready(function () {
    
    // Update number of items in shopping cart
    updateCartItemsText();

    // Display contents of shopping cart
    showCart(); 

    // Training manual | productArray[1]    
    $(".trainingProduct").click(function () {
        // Get variables from sessionStorage
        getSessionStorage();

        console.log("Cart subtotal is: " + cartSubTotal);
        // Add price of product to subtotal
        cartSubTotal += Number(productArray[1].price);
        // Increment number of cart items
        numOfCartItems += 1;
        // Add array position for this product to cartContentsArray
        cartContentsArray.push(1);
        // Save variables in sessionstorage
        setSessionStorage();
        // Create "Go to Cart" button next to "Add to cart" button on product details page for product
        createGoToCart();
        // Alert user when adding product to cart
        alert(productArray[1].pname + " has been added to your shopping cart. Your current total is R" + cartSubTotal);
        // Prevent page from refreshing and losing cart items
        return false;
    });

    // Assessment manual | productArray[0]  
    $(".assessmentProduct").click(function () {
        getSessionStorage();

        cartSubTotal += Number(productArray[0].price);
        numOfCartItems += 1;
        cartContentsArray.push(0);

        setSessionStorage();
        createGoToCart();
        alert(productArray[0].pname + " has been added to your shopping cart. Your current total is R" + cartSubTotal);

        return false;
    });

    // Consults | productArray[2] 
    $(".consultsProduct").click(function () {
        getSessionStorage();

        cartSubTotal += Number(productArray[2].price);
        numOfCartItems += 1;
        cartContentsArray.push(2);

        setSessionStorage();
        createGoToCart();
        alert(productArray[2].pname + " has been added to your shopping cart. Your current total is R" + cartSubTotal);

        return false;
    });

    // Corporate certification | productArray[3] 
    $(".certificatesProduct").click(function () {
        getSessionStorage();

        cartSubTotal += Number(productArray[3].price);
        numOfCartItems += 1;
        cartContentsArray.push(3);

        setSessionStorage();
        createGoToCart();
        alert(productArray[3].pname + " has been added to your shopping cart. Your current total is R" + cartSubTotal);

        return false;
    });

    // Redirect user to shipping.html
    $(".toShipping").click(function() {
        window.location.href = "shipping.html";
    });

    /* Call "addDeliveryInfo()" when user clicks on the "Submit" button */
    $(".shippingButton").click(function() {
        addDeliveryInfo();
        
        window.location.href = "shoppingCart.html";
    }); 

    /* Creates order number" & create alert to user with message and order number */
    $(".confirmOrder").click(function() {
        createOrderNumber();
        orderNum = JSON.parse(sessionStorage.getItem("orderNum"));
        alert("Your order was successful! Your order number is: " + orderNum);
    });
});
