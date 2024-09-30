import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../login.css'; 
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate(); 

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="/" className="icon" ><GoogleIcon /></a>
            <a href="/" className="icon" ><FacebookIcon /></a>
            <a href="/" className="icon" ><GitHubIcon /></a>
            <a href="/" className="icon" ><LinkedInIcon /></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}> {/* Sử dụng handleSignIn */}
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="/" className="icon" ><GoogleIcon /></a>
            <a href="/" className="icon" ><FacebookIcon /></a>
            <a href="/" className="icon" ><GitHubIcon /></a>
            <a href="/" className="icon" ><LinkedInIcon /></a>
          </div>
          <span>or use your email for login</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="/">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login" onClick={toggleForm}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1 style={{width:"200px"}}>Wellcome to MOVIE RATTING!</h1>
            <br/>
            <br/>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" id="register" onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
