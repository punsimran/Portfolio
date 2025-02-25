import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser, faLock, faCircleCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import loginImage from '../../assets/profile.png';
import toast from 'react-hot-toast';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            if (username === "simran" && password === "youmatter77") {
                setIsLoading(false);
                setIsLoginSuccessful(true);
                toast.success('Login successful!');

                setTimeout(() => {
                    onLogin();
                    navigate('/admin');
                }, 1500);
            } else {
                setIsLoading(false);
                setError('Invalid credentials');
                toast.error('Invalid credentials');
            }
        }, 1000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Logging in...</p>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className={`login-content ${isLoginSuccessful ? 'success' : ''}`}>
                <div className="image-section">
                    <img src={loginImage} alt="Portfolio Preview" className="login-image" />
                </div>
                <div className="form-section">
                    <h2 className="login-title">Portfolio Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <span className="input-icon"><FontAwesomeIcon icon={faUser} /></span>
                            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Username" />
                        </div>
                        <div className="input-group">
                            <span className="input-icon"><FontAwesomeIcon icon={faLock} /></span>
                            <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
                            <span className="password-toggle-icon" onClick={togglePasswordVisibility}><FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} /></span>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="login-button">Log In</button>
                        <div className="social-login">
                            <button className="social-button facebook"><FontAwesomeIcon icon={faFacebook} /></button>
                            <button className="social-button twitter"><FontAwesomeIcon icon={faTwitter} /></button>
                            <button className="social-button google"><FontAwesomeIcon icon={faGoogle} /></button>
                        </div>
                    </form>
                    {isLoginSuccessful && (
                        <div className="success-animation">
                            <FontAwesomeIcon icon={faCircleCheck} className="success-icon" />
                            <p>Login Successful!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
