const BASE_URL = "http://localhost:3000";

const currentUser = document.getElementById("current");
currentUser.addEventListener("click", async (e) => {
  e.preventDefault();
  jwt = localStorage.getItem("jwt");
  try {
    const req = await fetch(`${BASE_URL}/current`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `bearer ${jwt}`,
      },
    });
    const resp = await req.json();
    document.getElementById("current_user").innerHTML = JSON.stringify(resp);
  } catch (error) {
    console.log(error);
  }
});

const logout = document.getElementById("logout");
logout.addEventListener("click", async (e) => {
  e.preventDefault();
  return await fetch(`${BASE_URL}/logout`, {
    method: "GET",
    mode: "cors",
    hearders: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .then((msg) => {
      document.getElementById("current_user").innerHTML = "";
      localStorage.clear();
      console.log(msg);
    })
    .catch((err) => console.log(err));
});

const signup = document.forms["signup"];
signup.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(signup);
  [...formData.entries()].forEach((e) => {
    formData.append(e[0], e[1]);
  });

  try {
    const req = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      mode: "cors",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    const res = await req.json();
    console.log(res.errors);
    if (!res.errors) {
      document.getElementById("jwt").innerHTML = JSON.stringify(res.jwt);
    } else {
      console.log(res.errors);
      document.getElementById("signinErrors").innerHTML = JSON.stringify(
        res.errors
      );
    }
    console.log(res);
    signup.reset();
  } catch (error) {
    console.log(error);
  }
});

// !!!!! RAILS does not want headers: { "Content-type": "application/json"} when formdata !!!!!

/// POST LOGIN
const login = document.forms["login"];
login.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(login);
  [...formData.entries()].forEach((e) => {
    formData.append(e[0], e[1]);
  });

  try {
    const req = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      mode: "cors",
      body: formData,
      headers: {
        // "X-CSRF-Token": getCookie("CSRF-TOKEN"),
        Accept: "application/json",
      },
    });
    const res = await req.json();
    if (!res.errors) {
      document.getElementById("jwt").innerHTML = JSON.stringify(res.jwt);
      localStorage.setItem("jwt", res.jwt);
    } else {
      console.log(res);
    }
    login.reset();
  } catch (error) {
    console.log(error);
  }
});

const users = document.getElementById("users");
users.addEventListener("click", async (e) => {
  e.preventDefault();
  jwToken = localStorage.getItem("jwt");
  try {
    const request = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `bearer ${jwToken}`,
      },
    });
    if (request) {
      const response = await request.json();
      if (!response.error) {
        document.getElementById("users_list").innerHTML =
          JSON.stringify(response);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
