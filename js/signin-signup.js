document.addEventListener("DOMContentLoaded", () => {
  // Select elements from the DOM
  const container = document.querySelector(".container");
  const signInForm = document.querySelector(".sign-in-form");
  const signUpForm = document.querySelector(".sign-up-form");
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const sign_in_btn2 = document.querySelector("#sign-in-btn2");
  const sign_up_btn2 = document.querySelector("#sign-up-btn2");
  const messageBoxSignIn = document.querySelector(".sign-in-form .message-box");
  const messageBoxSignUp = document.querySelector(".sign-up-form .message-box");

  // Switch between sign in and sign up modes
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });

  sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
  });

  sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
  });

  // Handle sign in form submission
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameLogin = signInForm.querySelector('input[type="text"]').value;
    const passwordLogin = signInForm.querySelector(
      'input[type="password"]'
    ).value;

    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem(usernameLogin));

    // Validate user data and set login state in session storage
    if (userData && userData.password === passwordLogin) {
      sessionStorage.setItem("loggedUser", usernameLogin);
      messageBoxSignIn.textContent = "Login successful!";
      messageBoxSignIn.classList.add("success");
      messageBoxSignIn.classList.remove("error");
    } else {
      messageBoxSignIn.textContent = "Invalid username or password.";
      messageBoxSignIn.classList.add("error");
      messageBoxSignIn.classList.remove("success");
    }

    /*
    // Validate user data and set login state in session storage
  if (userData && userData.password === passwordLogin) {
    sessionStorage.setItem("loggedUser", usernameLogin);
    showAlert("Login successful!", "success");

    // Redirect to home page after successful login
    window.location.href = '#';
  } else {
    showAlert("Invalid username or password.", "error");
  }
    */

  });

  // Handle sign up form submission
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameSignUp = signUpForm.querySelector('input[type="text"]').value;
    const emailSignUp = signUpForm.querySelector('input[type="email"]').value;
    const passwordSignUp = signUpForm.querySelector(
      'input[type="password"]'
    ).value;
    const confirmPasswordSignUp = signUpForm.querySelectorAll(
      'input[type="password"]'
    )[1].value;

    // Validate form fields and password strength
    if (
      usernameSignUp.trim() === "" ||
      emailSignUp.trim() === "" ||
      passwordSignUp.trim() === "" ||
      confirmPasswordSignUp.trim() === ""
    ) {
      messageBoxSignUp.textContent = "Please fill in all fields.";
      messageBoxSignUp.classList.add("error");
      messageBoxSignUp.classList.remove("success");
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(emailSignUp)) {
      messageBoxSignUp.textContent = "Please enter a valid email address.";
      messageBoxSignUp.classList.add("error");
      messageBoxSignUp.classList.remove("success");
      return;
    }

    // Validate password strength
    if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(passwordSignUp)) {
      messageBoxSignUp.textContent =
        "Password must contain both letters and numbers.";
      messageBoxSignUp.classList.add("error");
      messageBoxSignUp.classList.remove("success");
      return;
    }

    // Check if passwords match
    if (passwordSignUp !== confirmPasswordSignUp) {
      messageBoxSignUp.textContent = "Passwords do not match.";
      messageBoxSignUp.classList.add("error");
      messageBoxSignUp.classList.remove("success");
      return;
    }

    // Check if username already exists
    if (localStorage.getItem(usernameSignUp)) {
      messageBoxSignUp.textContent = "Username already exists.";
      messageBoxSignUp.classList.add("error");
      messageBoxSignUp.classList.remove("success");
      return;
    }

    // Store user data in local storage
    localStorage.setItem(
      usernameSignUp,
      JSON.stringify({ email: emailSignUp, password: passwordSignUp })
    );
    messageBoxSignUp.textContent = "Registration successful!";
    messageBoxSignUp.classList.add("success");
    messageBoxSignUp.classList.remove("error");
  });

  // Handle password reset request
  document
    .querySelector("#reset-password-btn")
    .addEventListener("click", (event) => {
      event.preventDefault();
      const usernameToReset = prompt("Please enter your username:");
      if (usernameToReset) {
        const userData = JSON.parse(localStorage.getItem(usernameToReset));
        if (userData) {
          // This should be replaced with a proper password reset process
          alert(`A password reset link would be sent to ${userData.email}.`);
        } else {
          alert("Username not found.");
        }
      }
    });
});