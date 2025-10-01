// import React from 'react'
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        role: '',
        password: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
    const serviceType = location.state?.serviceType || 'healthcare';

    const handleBack = () => {
        navigate('/');
    }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [backendError, setBackendError] = useState('');
    const [backendSuccess, setBackendSuccess] = useState('');

    // Available roles
    const roles_healthCare = [
        { value: 'patient', label: 'Patient/Client' },
        { value: 'doctor', label: 'Doctor' },
    ];

    const roles_salon = [
        { value: 'Customer', label: 'Client' },
        { value: 'salon', label: 'Salon Professional' },

    ];

    const roles_consultancy = [
        { value: 'Client', label: 'Client' },
        { value: 'consultant', label: 'Consultant' },

    ];

    const roles = serviceType === 'healthcare' ? roles_healthCare : (serviceType === 'salon' ? roles_salon : roles_consultancy);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const registerUser=async(userData)=>{
        try {
             const response = await api.post('/login', userData);
             return response.data;

        }catch (error) {
            console.error('API call failed:', error);
        }
    }

    const handleSubmit = async () => {
        // Implement login logic here
        e.preventDefault();
        setBackendError('');
        setBackendSuccess('');

        setIsSubmitting(true);
        try {
            let userData={
                email:formData.email,
                password:formData.password,
                role:formData.role
            }

            // You can add your login logic here, e.g., API call

        } catch (error) {
            setBackendError('An error occurred during login.');
        } finally {
            setIsSubmitting(false);
        }

           console.log('Sending to backend:', userData);

           
    // Call backend API
    const result = await registerUser(userData);


  }

    return (
        <div>
            <button className="back-button" onClick={handleBack} disabled={isSubmitting}>
                &larr; Back to Services
            </button>

            <div className="Login-header">
                <h1>Log In</h1>
                {/* <p>Join our {serviceType} service as a</p> */}
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

            <form action="" className='Login-form' onSubmit={handleSubmit}>
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
                        placeholder="Create a password (min 6 characters)"
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
                        {roles.map(role => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner"></span>
                            Logging in...
                        </>
                    ) : (
                        `Log in${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}`
                    )}
                </button>


            </form>
        </div>
    )
}
export default Login;
