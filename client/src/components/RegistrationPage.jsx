
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from './axios'
import './RegistrationPage.css';
import  login  from './Login';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceType = location.state?.serviceType || 'healthcare';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Default role
    // Doctor-specific fields
    specialty: '',
    servicesOffered: [],
    phoneNumber: '',
    // Salon-specific fields
    salonServices: [],
    experience: '',
    // Consultancy-specific fields
    consultancyAreas: [],
    hourlyRate: '',
    // Common professional fields
    bio: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [backendSuccess, setBackendSuccess] = useState('');

  // Available roles
  const roles_healthCare = [
    { value: 'patient', label: 'Patient/Client' },
    { value: 'doctor', label: 'Doctor' },
  ];

  const roles_salon=[
    { value: 'customer', label: 'Client' },
    { value: 'salon', label: 'Salon Professional' },

  ];

  const roles_consultancy=[
    { value: 'client', label: 'Client' },
    { value: 'consultant', label: 'Consultant' },

  ];
const roles=serviceType==='healthcare'?roles_healthCare:(serviceType==='salon'?roles_salon:roles_consultancy);
  // Available specialties for doctors
  const doctorSpecialties = [
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Pediatrician',
    'Orthopedic',
    'Gynecologist',
    'Psychiatrist',
    'Dentist',
    'General Physician'
  ];

  // Available services for doctors
  const doctorServices = [
    'Heart Checkup',
    'ECG',
    'Consultation',
    'Dental Checkup',
    'Skin Treatment',
    'Blood Test',
    'X-Ray',
    'Ultrasound',
    'Physiotherapy',
    'Surgery Consultation'
  ];

  // Available services for salon professionals
  const salonServices = [
    'Haircut & Styling',
    'Hair Coloring',
    'Hair Treatment',
    'Manicure',
    'Pedicure',
    'Facial',
    'Makeup',
    'Massage',
    'Waxing',
    'Spa Treatment'
  ];

  // Available areas for consultants
  const consultancyAreas = [
    'Business Strategy',
    'Financial Advice',
    'Legal Consultation',
    'Career Counseling',
    'Educational Guidance',
    'Technology Consulting',
    'Marketing Strategy',
    'Health & Wellness',
    'Relationship Advice',
    'Real Estate Consulting'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle checkbox arrays
      const fieldName = name;
      setFormData(prev => ({
        ...prev,
        [fieldName]: checked
          ? [...prev[fieldName], value]
          : prev[fieldName].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear messages when user starts typing
    if (backendError) setBackendError('');
    if (backendSuccess) setBackendSuccess('');
  };

  const registerUser = async (userData) => {
    // Your backend API endpoint
    // const API_URL = 'http://localhost:5000/api/auth/register';

    try {
      const response = await api.post('/register', userData);

      return response.data;
    } catch (error) {
      console.error('API call failed:', error);

      if (error.response) {
        throw new Error(error.response.data.message || `Registration failed: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error(error.message || 'Registration failed. Please try again.');
      }
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setBackendError('');
  setBackendSuccess('');

  setIsSubmitting(true);

  try {
    // Prepare data for backend based on role
    let userData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role,
      serviceType: serviceType,
      phoneNumber: formData.phoneNumber?.toString().replace(/\D/g, '') || ''
    };

    // Add role-specific data
    if (formData.role === 'doctor') {
      userData = {
        ...userData,
        specialty: formData.specialty,
        servicesOffered: formData.servicesOffered
      };
    } else if (formData.role === 'salon') {
      userData = {
        ...userData,
        salonServices: formData.salonServices,
        experience: formData.experience
      };
    } else if (formData.role === 'consultant') {
      userData = {
        ...userData,
        consultancyAreas: formData.consultancyAreas,
        hourlyRate: formData.hourlyRate
      };
    }

    console.log('Sending to backend:', userData);

    // Call backend API
    const result = await registerUser(userData);

    // Registration successful
    console.log('Registration successful response:', result);
    setBackendSuccess('Registration link has been sent to your email. Please check and verify.');

    // Store user data in sessionStorage (optional)
    if (result.user) {
      sessionStorage.setItem('user', JSON.stringify(result.user));
    }

    // Navigate based on role after successful registration
    setTimeout(() => {
      const dashboardPath = formData.role === 'patient' 
        ? '/patient-dashboard' 
        : `/${formData.role}-dashboard`;
      navigate(dashboardPath, { 
        state: { 
          user: result.user || userData,
          registrationSuccess: true
        } 
      });
    }, 1500);

  } catch (error) {
    console.error('Registration failed:', error);
    setBackendError(error.message || 'Registration failed. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};


  const handleBack = () => {
    navigate(-1);
  };

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case 'doctor':
        return (
          <>
            <div className="form-group">
              <label htmlFor="specialty">Specialty *</label>
              <select
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                <option value="">Select your specialty</option>
                {doctorSpecialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Services Offered *</label>
              <div className="checkbox-group">
                {doctorServices.map(service => (
                  <label key={service} className="checkbox-option">
                    <input
                      type="checkbox"
                      name="servicesOffered"
                      value={service}
                      checked={formData.servicesOffered.includes(service)}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        );

      case 'salon':
        return (
          <>
            <div className="form-group">
              <label>Salon Services Offered *</label>
              <div className="checkbox-group">
                {salonServices.map(service => (
                  <label key={service} className="checkbox-option">
                    <input
                      type="checkbox"
                      name="salonServices"
                      value={service}
                      checked={formData.salonServices.includes(service)}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Years of Experience</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter years of experience"
                min="0"
                disabled={isSubmitting}
              />
            </div>
          </>
        );

      case 'consultant':
        return (
          <>
            <div className="form-group">
              <label>Consultancy Areas *</label>
              <div className="checkbox-group">
                {consultancyAreas.map(area => (
                  <label key={area} className="checkbox-option">
                    <input
                      type="checkbox"
                      name="consultancyAreas"
                      value={area}
                      checked={formData.consultancyAreas.includes(area)}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <span>{area}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="hourlyRate">Hourly Rate ($)</label>
              <input
                type="number"
                id="hourlyRate"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="Enter your hourly rate"
                min="0"
                step="0.01"
                disabled={isSubmitting}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="generic-registration-page">
      <div className="registration-container">
        <button className="back-button" onClick={handleBack} disabled={isSubmitting}>
          &larr; Back to Services
        </button>

        <div className="registration-header">
          <h1>Create Your Account</h1>
          <p>Join our {serviceType} service as a {formData.role}</p>
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

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={isSubmitting}
              />
            </div>

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
          </div>

          <div className="form-row">
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
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                disabled={isSubmitting}
              />
            </div>
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

          {renderRoleSpecificFields()}

          <div className="form-group">
            <label htmlFor="bio">Bio/Description</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              `Create ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Account`
            )}
          </button>

          <div className="login-redirect">
            Already have an account?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/login', { state: { fromRegistration: true ,
                serviceType: serviceType
                }});
              }}
              style={{ pointerEvents: isSubmitting ? 'none' : 'auto' }}
            >
              Log in
            </a>
          </div>
        </form>
      </div>
      {/* <p>{console.log(formData.role)}</p> */}
    </div>
  );
};

export default RegistrationPage;