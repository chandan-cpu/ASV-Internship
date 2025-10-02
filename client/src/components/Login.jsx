// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from './axios'
import './Login.css';
import { KeyRound } from 'lucide-react';
// import api from '../services/api'; // Add this import

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        role: '',    // Initialize as empty string
        password: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
    const fromRegistration = location.state?.fromRegistration || false;
    console.log(fromRegistration);
    const serviceType = location.state.serviceType || 'healthcare';

    console.log(serviceType);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [backendError, setBackendError] = useState('');
    const [backendSuccess, setBackendSuccess] = useState('');

    // Available roles - Fixed values
    const roles_healthCare = [
        { value: 'patient', label: 'Patient/Client' },
        { value: 'doctor', label: 'Doctor' },
    ];

    const roles_salon = [
        { value: 'customer', label: 'Client' },
        { value: 'salon', label: 'Salon Professional' },
    ];

    const roles_consultancy = [
        { value: 'client', label: 'Client' },
        { value: 'consultant', label: 'Consultant' },
    ];

    // Dynamic roles based on serviceType
    const roles = serviceType === 'healthcare'
        ? roles_healthCare
        : serviceType === 'salon'
            ? roles_salon
            : roles_consultancy;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear errors when user starts typing
        if (backendError) setBackendError('');
    };

    const loginUser = async (userData) => {
        try {
            const response = await api.post('/login', userData);
            return response.data;
        } catch (error) {
            console.error('Login API call failed:', error);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBackendError('');
        setBackendSuccess('');
        setIsSubmitting(true);

        try {
            const userData = {
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                role: formData.role,
                serviceType: serviceType
            };

            console.log('Sending to backend:', userData);

            const result = await loginUser(userData);

            console.log('Login successful:', result);
            setBackendSuccess('Login successful! Redirecting...');

            // Navigate to appropriate dashboard
            setTimeout(() => {
                const dashboardPath = formData.role === 'patient' || formData.role === 'customer' || formData.role === 'client'
                    ? '/dashboard'
                    : `/${formData.role}-dashboard`;

                navigate(dashboardPath, {
                    state: {
                        user: result.user,
                        serviceType: serviceType
                    }
                });
            }, 1500);

        } catch (error) {
            console.error('Login failed:', error);
            setBackendError(error.message || 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <button className="back-button" onClick={handleBack} disabled={isSubmitting}>
                    &larr; Back to Services
                </button>

                <div className="login-header">
                    <div className='login-title'>  <KeyRound className='icon' />LOGIN</div>
                    <p className='welcome-message'>Welcome back to our {serviceType} service</p>
                    {fromRegistration && (
                        <p className="from-registration">Continue with your {serviceType} account</p>
                    )}
                </div>

                {backendError && (
                    <div className="backend-message error">
                        ⚠️ {backendError}
                    </div>
                )}

                {backendSuccess && (
                    <div className="backend-message success">
                        ✅ {backendSuccess}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            minLength="6"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">I am a: *</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                        >
                            <option value="">Select your role</option>
                            {roles.map(role => (
                                <option key={role.value} value={role.value}>
                                    {role.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="submit-button1"
                        disabled={isSubmitting || !formData.email || !formData.password || !formData.role}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span>
                                Logging in...
                            </>
                        ) : (
                            'Log In'
                        )}
                    </button>

                    <div class="divider">or continue with</div>

                    <div class="social-login">
                        <div class="social-btn facebook">
                            <i class="fab fa-facebook-f"></i>
                        </div>
                        <div class="social-btn twitter">
                            <i class="fab fa-twitter"></i>
                        </div>
                        <div class="social-btn google">
                            <i class="fab fa-google"></i>
                        </div>
                    </div>

                    <div className="register-redirect">
                        Don't have an account?{' '}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/register', {
                                    state: { serviceType: serviceType }
                                });
                            }}
                            style={{ pointerEvents: isSubmitting ? 'none' : 'auto' }}
                        >
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;