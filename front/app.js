/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const BASE_URL = 'http://localhost:3000';

// !! RAILS does not want headers: { "Content-type": "application/json"} when formdata !!

function setResponse(id, res) {
  console.log(res);
  if (!res.error) {
    document.getElementById(id).innerHTML = ''
    document.getElementById('jwt').innerHTML = JSON.stringify(res.jwt);
  } else {
    document.getElementById('jwt').innerHTML = ''
    document.getElementById(id).innerHTML = JSON.stringify(
      res.error,
    );
  }
}

HTMLElement.prototype.awaitForSubmit = function() {
  return new Promise((resolve) => {
    this.addEventListener("submit", (e) => {
      e.preventDefault()
      resolve();
    });
  });
};

// SIGNUP => POST
const { signup } = document.forms;

const doSignUp = async () => {
  await signup.awaitForSubmit()
  const formData = new FormData(signup);
  [...formData.entries()].forEach((elt) => {
    formData.append(elt[0], elt[1]);
  });

  try {
    const req = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });
    const res = await req.json();
    setResponse('signinErrors', res);
    signup.reset();
    doSignUp();
  } catch (error) {
    console.error(error);
  }
}
doSignUp();


// LOGIN => POST
const { login } = document.forms;
// const login = document.forms["login"];
login.addEventListener('submit', async (e)=> {
  e.preventDefault()
  const formData = new FormData(login);
    [...formData.entries()].forEach((elt) => {
      formData.append(elt[0], elt[1]);
    });

  try {
    const req = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });
    const res = await req.json();
    setResponse('loginErrors', res)
    login.reset();
  } catch (error) {
    console.error(error);
  }
})
  

const currentUser = document.getElementById('current');
currentUser.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const req = await fetch(`${BASE_URL}/current`, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });
    const resp = await req.json();
    document.getElementById('current_user').innerHTML = JSON.stringify(resp);
  } catch (error) {
    console.error(error);
  }
});

const logout = document.getElementById('logout');
logout.addEventListener('click', async (e) => {
  e.preventDefault();
  return fetch(`${BASE_URL}/logout`, {
    credentials: 'include',
    hearders: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then((msg) => {
      document.getElementById('jwt').innerHTML = '';
      document.getElementById('current_user').innerHTML = '';
      document.getElementById('users_list').innerHTML = '';
      console.log(msg.message);
    })
    .catch((err) => console.error(err));
});

const users = document.getElementById('users');
users.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const request = await fetch(`${BASE_URL}/users`, {
      // method: 'GET', default values
      // mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (request) {
      const response = await request.json();
      if (!response.error) {
        document.getElementById('users_list').innerHTML = JSON.stringify(response);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// send the CRSF cookie for POST/PUT/PATCH requests
// function getCSRFToken() {
//   const splitCookies = document.cookie.split("; ");
//   return splitCookies
//     .find((cookie) => cookie.startsWith("CSRF-TOKEN="))
//     .split("=")[1];
// }
