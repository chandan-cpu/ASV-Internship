// LandingPage.jsx
import React, { useState } from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ onSelectService }) => {
//   const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const serviceCategories = [
    {
      id: 'healthcare',
      title: 'Healthcare',
      description: 'Medical appointments, check-ups.',
      icon: '🏥',
      color: '#4CA1AF'
    },
    {
      id: 'salon',
      title: 'Salon',
      description: 'Hair, beauty & wellness.',
      icon: '💇',
      color: '#FF6B6B'
    },
    {
      id: 'consultancy',
      title: 'Consultancy',
      description: 'Expert advice & meetings',
      icon: '💼',
      color: '#36B37E'
    }
  ];

  const steps = [
    'Select Service',
    'Choose Provider & Time',
    'Confirm & Pay'
  ];

  const handleServiceSelect=(serviceId)=>{
    //// Navigate to registration page with service type as state
    navigate('/register',{state:{serviceType:serviceId}})
  };

  return (
    <div className="landing-page">
        <div className="balls-container">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
    </div>
      <div className="hero-section">
        <h1>Book Your Time, Your Way</h1>
        <p className="subtitle">Select a service to get started</p>
      </div>

      <div className="services-section">
        <div className="services-grid">
          {serviceCategories.map(category => (
            <div 
              key={category.id}
              className={`service-card`}
              style={{ '--accent-color': category.color }}
              onClick={() => {
                handleServiceSelect(category.id)
              }}
            //   onMouseEnter={() => handleServiceSelect(category.id)}
            //   onMouseLeave={() => handleServiceSelect(null)}
            >
              <div className="service-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className="select-button">Select</div>
            </div>
          ))}
        </div>
      </div>

      <div className="process-section">
        <h2>How It Works</h2>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <h3>{step}</h3>
                <p>..</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;