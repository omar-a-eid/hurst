
document.addEventListener("DOMContentLoaded", function() {
    receiptHandling() 
});

let placeOrderBtn = document.getElementById('pay-btn');
// console.log(placeOrderBtn);


/***************************************** validate payment and pilling data ************************************/

function receiptHandling() 
{

        placeOrderBtn.addEventListener('click', function(event) {
            event.preventDefault();
            let nameInput = document.querySelector('input[placeholder="Your name here..."]');
            let emailInput = document.querySelector('input[placeholder="Email address here..."]');
            let phoneInput = document.querySelector('input[placeholder="Phone here..."]');

            let name = nameInput.value.trim();
            let email = emailInput.value.trim();
            let phone = phoneInput.value.trim();
            let address = document.querySelector('.custom-textarea').value;
            let total = sessionStorage.getItem('orderTotal');

            if (!name || !email || !phone) 
            {
                let alertMessage = `
                <div class="alert alert-danger" 
                role="alert"
                style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999;">
                <strong>Error!</strong> Please fill out all required fields (name, email, and phone) before placing an order!
                </div>
                `;

                document.body.insertAdjacentHTML("afterbegin", alertMessage);

                setTimeout(function () {
                    document.querySelector(".alert").remove();
                }, 3000);
                return;
            }

            if (!isValidEmail(email)) 
            {
                

                let alertMessage = `
                <div class="alert alert-danger" 
                role="alert"
                style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999;">
                <strong>Error!</strong> Please enter a valid email address!
                </div>
                `;

                document.body.insertAdjacentHTML("afterbegin", alertMessage);

                setTimeout(function () {
                    document.querySelector(".alert").remove();
                }, 3000);
                return;
            }

            let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

            if (cartItems.length === 0) 
            {
                let alertMessage = `
                <div class="alert alert-danger" 
                role="alert"
                style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999;">
                <strong>Error!</strong> Your cart is empty. Please add items before placing an order!
                </div>
                `;

                document.body.insertAdjacentHTML("afterbegin", alertMessage);

                setTimeout(function () {
                    document.querySelector(".alert").remove();
                }, 3000);

                return;
            }

            let paymentReceipt = {
                paymentMethod: "Direct Bank Transfer",
                name: name,
                email: email,
                phone: phone,
                address: address,
                total: total
            };

            sessionStorage.setItem("paymentReceipt", JSON.stringify(paymentReceipt));
            window.location.href = "receipt.html";
        });

    function isValidEmail(email) 
    {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}


