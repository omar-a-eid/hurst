
document.addEventListener("DOMContentLoaded", function() {
    makeReceipt()
});

function makeReceipt()
{

    let paymentReceipt = JSON.parse(sessionStorage.getItem("paymentReceipt"));
    let productDetails = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = JSON.parse(sessionStorage.getItem("orderTotal"));  

    let paymentMethod = document.getElementById("paymentMethod");
    if (paymentReceipt && paymentReceipt.paymentMethod) 
    {
        paymentMethod.textContent = "Payment Method: " + paymentReceipt.paymentMethod;
    }

    let fullName = document.getElementById("fullName");
    if (paymentReceipt && paymentReceipt.name) 
    {
        fullName.textContent = "Full Name: " + paymentReceipt.name;
    }

    let userEmail = document.getElementById("payment_email");
    if (paymentReceipt && paymentReceipt.name) 
    {
        userEmail.textContent = "Email: " + paymentReceipt.email;
    }

    let userPhone = document.getElementById("payment_phone");
    if (paymentReceipt && paymentReceipt.name) 
    {
        userPhone.textContent ="Phone: " + paymentReceipt.phone;
    }

    let productList = document.getElementById("productList");
    let totalAmount = 0;
    if (productDetails && productDetails.length > 0) 
    {
        productDetails.forEach(product => {
            let listItem = document.createElement("li");
            listItem.textContent = `${product.productName} x ${product.qty} - $${(product.price * product.qty).toFixed(2)}`;
            listItem.classList.add("list-group-item");
            productList.appendChild(listItem);
            totalAmount += product.price * product.qty;
        });
    }

    let totalAmountElement = document.getElementById("totalAmount");
    totalAmountElement.textContent = "Order Total: $" + totalPrice;
}
