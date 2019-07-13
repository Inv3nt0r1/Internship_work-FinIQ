var cart = [];

function add_to_cart(id) {
    var iterator;
    var flag = false;
    var quantity_id = "quantity_input_id" + id.substring(21);
    var quantity = document.getElementById(quantity_id).value;
    for (iterator = 0; iterator < cart.length; iterator++) {
        if (cart[iterator].product_ids == id) {
            flag = true;
            var total = Number(cart[iterator].product_quantity) + Number(quantity);
            cart[iterator].product_quantity = total;
            break;
        }
    }

    if (flag == false) {
        var item = new Object();
        item.product_ids = id;
        item.product_quantity = quantity;
        cart.push(item);
    }

    window.alert("Added Successfully!");
}

function remove_product(id) {
    var iterator;
    id = "add_to_cart_button_id" + id.substring(24);
    //window.alert(id);
    for (iterator = 0; iterator < cart.length; iterator++) {
        if (id == cart[iterator].product_ids) {
            cart.splice(iterator, 1);
            var main_container = document.getElementById("products_container");
            if (cart.length == 1) {
                while (main_container.firstChild) {
                    main_container.removeChild(main_container.firstChild);
                }
                document.getElementById("heading_info").innerHTML = "Your Cart is Empty. Redirecting you to home page in 5 seconds. Happy Shopping!";
                setTimeout('Redirect()', 5000);

            }
            checkout();
            break;
        }
    }
}

function Redirect() {
    window.location = "index.html";
}


function checkout() {
    //window.alert("in checkout!");
    var main_container = document.getElementById("products_container");
    while (main_container.firstChild) {
        main_container.removeChild(main_container.firstChild);
    }
    document.getElementById("heading_info").innerHTML = "Items in your cart:";
    var iterator;
    for (iterator = 0; iterator < cart.length; iterator++) {
        var obj = JSON.parse(text);
        var product_id = Number(cart[iterator].product_ids.substring(21));

        //window.alert(obj.mobile_phones[product_id].name);

        if (iterator % 2 == 0) {
            var row_div = document.createElement("div");
            row_div.setAttribute('class', 'row');
            //creating image div
        }

        var img_div = document.createElement("div");
        img_div.classList.add('col-sm-2', 'col-md-2', 'col-lg-2')
        var image = document.createElement("img");
        image.src = "images/" + obj.mobile_phones[product_id].image;
        //adding image div to row div
        img_div.appendChild(image);
        row_div.appendChild(img_div);

        //creating description div
        var des_div = document.createElement("div");
        des_div.classList.add('col-sm-4', 'col-md-4', 'col-lg-4');

        var product_name = document.createElement("h2");
        var product_name_text = document.createTextNode(obj.mobile_phones[product_id].name);
        product_name.appendChild(product_name_text);

        var product_description = document.createElement("h5");
        var product_description_text = document.createTextNode(obj.mobile_phones[product_id].description);
        product_description.appendChild(product_description_text);

        var product_price = document.createElement("h4");
        var product_price_text = document.createTextNode(" Price: Rs. " + obj.mobile_phones[product_id].price + "/-");
        product_price.appendChild(product_price_text);

        var _br = document.createElement("BR");

        var quantity_bought = document.createElement("h5");
        var quantity_bought_text = document.createTextNode("Quantity: " + cart[iterator].product_quantity);
        quantity_bought.appendChild(quantity_bought_text);

        var remove_product_button = document.createElement("input");
        remove_product_button.type = "button";
        remove_product_button.classList.add('btn', 'btn-primary')
        remove_product_button.value = "Remove product";
        remove_product_button.id = "remove_product_button_id" + product_id;
        remove_product_button.setAttribute("onClick", "remove_product(this.id)");

        /*
        var quantity_input = document.createElement("input");
        quantity_input.type = "text";
        quantity_input.classList.add("form-control");
        quantity_input.id = "quantity_input_id" + obj.mobile_phones[product_id].id;
        quantity_input.setAttribute("value", "1");
        quantity_input.style.width = "90px";
        quantity_input.style.margin = "2px";
        */
        //<input type="text" class="form-control" id="usr" value="1" style="width:20px">
        //button.onclick = myfunction(this.id);
        des_div.appendChild(product_name);
        des_div.appendChild(product_description);
        des_div.appendChild(product_price);
        //des_div.appendChild(_br);
        des_div.appendChild(quantity_bought);
        //des_div.appendChild(quantity_input);
        des_div.appendChild(remove_product_button);
        //des_div.appendChild(button);
        row_div.appendChild(des_div);

        if (iterator % 2 == 1 || (iterator + 1) == cart.length) {
            product_container.appendChild(row_div);
        }
        if ((iterator + 1) == cart.length) {
            var proceed_to_pay_button = document.createElement("input");
            proceed_to_pay_button.type = "button";
            proceed_to_pay_button.classList.add('btn', 'btn-info', 'btn-block')
            proceed_to_pay_button.style.margin = "10px";
            proceed_to_pay_button.value = "Proceed to pay";
            proceed_to_pay_button.id = "proceed_pay_btn";
            proceed_to_pay_button.setAttribute("onClick", "payment()");
            //proceed_to_pay_button.onclick = checkout;
            product_container.appendChild(_br);
            product_container.appendChild(_br);
            product_container.appendChild(proceed_to_pay_button);
        }
    }
}

function payment() {
    var proceed_to_pay_button = document.getElementById("proceed_pay_btn");
    proceed_to_pay_button.className = '';
    proceed_to_pay_button.classList.add('btn', 'btn-primary', 'btn-block', 'disabled');
    proceed_to_pay_button.removeAttribute("onClick")
    proceed_to_pay_button.value = "Do the payment below!";
    var total_price = 0;
    var iterator;
    for (iterator = 0; iterator < cart.length; iterator++) {
        var obj = JSON.parse(text);
        var product_id = Number(cart[iterator].product_ids.substring(21));
        total_price = total_price + Number(cart[iterator].product_quantity) * Number(obj.mobile_phones[product_id].price);
        //window.alert(total_price);
    }

    var total_heading = document.createElement("h2");
    var total_heading_text = document.createTextNode("Your Total: Rs." + total_price + "/-");
    total_heading.appendChild(total_heading_text);
    product_container.appendChild(total_heading);


}