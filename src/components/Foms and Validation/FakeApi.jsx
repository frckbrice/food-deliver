
const Register = (data) => {
  const dataFromLS = JSON.parse(localStorage.getItem('form')); 

  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      if (data.email === dataFromLS.email) {
        alert('FAIL! This email already exist');
        reject({
          errors: {
            email: 'email-test@email.com is already used',
          },
        });
      } else {
        alert('SUCCESSFULL ! Congratulation', 'color: green');
        resolve({
          message: 'Registration successful',
          success: 'true',
        });
      }
    },2000)
  })
}

export default Register;
