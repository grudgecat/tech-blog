//LOGIN FORM 
const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form 
  event.preventDefault();

  // Get data from form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in. Please check your password and try again.');
    }
  }
};
  
//SIGN UP FORM
const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form 
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(email, password);
  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in. An account with that email address may already exist.');
    }
  }
};
  
if(document
    .querySelector('.login-form')) {
      document
      .querySelector('.login-form')
      .addEventListener('submit', loginFormHandler);
    };

if(document
  .querySelector('.signup-form')) {
  document
  .querySelector('.signup-form') 
  .addEventListener('submit', signupFormHandler);
};




 