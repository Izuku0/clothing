import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../routes/utils/firebase/firebase.utils";
const defaultFormField={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formField;
  
    const resetFormFields = () => {
      setFormField(defaultFormField);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (password !== confirmPassword) {
        alert('passwords do not match');
        return;
      }
  
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
  
        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Cannot create user, email already in use');
        } else {
          console.log('user creation... encountered an error', error);
        }
      }
    };
    const handleChange = (event) =>{
      const {name,value} =event.target;

      setFormField({...formField,[name]:value});
    };
    
    return(
        <div>
            <h1>Sign up with your email</h1>

            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" required onChange={handleChange} name='displayName' value={displayName}/>

                <label>Email</label>
                <input type="email" required onChange={handleChange} name='email' value={email}/>

                <label >Password</label>
                <input type="password" required onChange={handleChange} name='password' value={password}/>

                <label>Confirrm Password</label>
                <input type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <button type="submit">SignUp</button>
            </form>
        </div>
    );
};

export default SignUpForm;