const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

signupBtn.addEventListener("click", () => {
  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  axios
    .post("http://localhost:3002/api/v1/auth/signup", formData)
    .then((res) => {
      console.log(res);
      alert("User created successfully!");
      window.location.href = "login.html";
    })
    .catch((err) => {
      console.log(err);
      alert("User creation failed!");
    });
});

loginBtn.addEventListener("click", () => {
  console.log("Login button clicked");
  const formData = {
    email: document.getElementById("login-email").value,
    password: document.getElementById("login-password").value,
  };

  axios
    .post("http://localhost:3002/api/v1/auth/login", formData)
    .then((res) => {
      console.log("Response Data:", res.data);
      const token = res.data.token;
      localStorage.setItem("token", token); 
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      console.log(err);
      alert("User login failed!");
    });
});
