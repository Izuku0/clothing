import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../routes/utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

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
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                
                <FormInput label='Display name' type="text" required onChange={handleChange} name='displayName' value={displayName}/>

                
                <FormInput label='email' type="email" required onChange={handleChange} name='email' value={email}/>

                
                <FormInput label='password' type="password" required onChange={handleChange} name='password' value={password}/>

                
                <FormInput label='confirm password' type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <Button type="submit">SignUp</Button>
            </form>
        </div>
    );
};

export default SignUpForm;