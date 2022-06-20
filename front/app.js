/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const BASE_URL = 'http://localhost:3000';

const { signup } = document.forms;
signup.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(signup);
  [...formData.entries()].forEach((elt) => {
    formData.append(elt[0], elt[1]);
  });

  try {
    const req = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      mode: 'cors',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });
    const res = await req.json();
    if (!res.error) {
      console.log(res);
      document.getElementById('jwt').innerHTML = JSON.stringify(res.jwt);
      localStorage.setItem('jwt', res.jwt);
    } else {
      console.log(res.error);
      document.getElementById('signinErrors').innerHTML = `ActiveRecord: ${JSON.stringify(res.error)}`;
    }
    signup.reset();
  } catch (error) {
    console.error(error);
  }
});

// !!!!! RAILS does not want headers: { "Content-type": "application/json"} when formdata !!!!!

/// POST LOGIN
const { login } = document.forms;
login.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(login);
  [...formData.entries()].forEach((elt) => {
    formData.append(elt[0], elt[1]);
  });

  try {
    const req = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });
    const res = await req.json();
    if (!res.error) {
      document.getElementById('jwt').innerHTML = JSON.stringify(res.jwt);
      localStorage.setItem('jwt', res.jwt);
    } else {
      console.log(res.error);
      document.getElementById('loginErrors').innerHTML = JSON.stringify(res.error);
    }
    login.reset();
  } catch (error) {
    console.error(error);
  }
});

const users = document.getElementById('users');
users.addEventListener('click', async (e) => {
  e.preventDefault();
  const jwToken = localStorage.getItem('jwt');
  try {
    const request = await fetch(`${BASE_URL}/users`, {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `bearer ${jwToken}`,
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

const currentUser = document.getElementById('current');
currentUser.addEventListener('click', async (e) => {
  e.preventDefault();
  const jwToken = localStorage.getItem('jwt');
  try {
    const req = await fetch(`${BASE_URL}/current`, {
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `bearer ${jwToken}`,
      },
    });
    const resp = await req.json();
    if (resp) {
      console.log(resp);
      document.getElementById('current_user').innerHTML = JSON.stringify(resp);
    }
  } catch (error) {
    console.error(error);
  }
});

const logout = document.getElementById('logout');
logout.addEventListener('click', async (e) => {
  e.preventDefault();
  const jwToken = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}/logout`, {
    mode: 'cors',
    hearders: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `bearer ${jwToken}`,
    },
  })
    .then((res) => res.json())
    .then((msg) => {
      document.getElementById('current_user').innerHTML = '';
      document.getElementById('jwt').innerHTML = '';
      document.getElementById('users_list').innerHTML = '';

      localStorage.clear();
      console.log(msg);
    })
    .catch((err) => console.error(err));
});
