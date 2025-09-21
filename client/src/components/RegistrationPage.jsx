import React, { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';

import './RegistrationPage.css';


const RegistrationPage=()=>{
  const navigate=useNavigate();

  const[formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    role:'patient',
    specialty:'',
    serviceOfferd:[],
    phoneNumber:'',
    //Salon-Specific Fields
    salonServices:[],
    experience:'',
    //Consultancy area
    consultancyArea:[],
    hourlyRate:'',
    //Comon Professional fields
    bio:''

  });

  const [isSubmitting,setIsSubmitting]=useState(false);
  const[backendError,setBackendError]=useState('');
  const [backendSuccess,setBackendSuccess]=useState('');

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
  const handleBack=()=>{
    navigate('/');
  };

  const handleSubmit= async(e)=>{
      e.preventDefault();
      setBackendError('');
      setBackendError('');


      setIsSubmitting(true);

      try{
        name:formData.name.trim(),
        email:formData.email.trim().toLowerCase(),
        password:formData.password,
        role:formData.role,
        serviceType:serviceType,
        phoneNumber:formData.phoneNumber?.toString(),replace(/\D/g,'')||''

      };

      if(formData.role==='doctor'){
        userData={
          
        }
      }


  }


  const renderRoleSpecificField=()=>{
    switch (formData.role)
    {
      case 'doctor':
        return(
          <>
          <label>Specialty</label>

          </>
        )
    }
  }

  return (
    <div className='generic-registration-page'>
      <div className='registration-container'>
        <button className='back-button' onClick={handleBack} disabled={isSubmitting}>
          &larr; Back to Services
        </button>

        <div className='registration-header'>
          <h1>Create Your Account</h1>
          {/* <p>Join our {serviceType} service as a {formData.role}</p> */}
          <p>Join our serviceType services as a formData.role</p>

        </div>
        {backendError &&(
          <div className="backend-message error">{backendError}</div>
        )}

        {backendSuccess &&(
          <div className="backend-message success">{backendSuccess}</div>
        )}

        <form className='registration-form' onSubmit={handleSubmit}>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='name'>Full Name</label>
              <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your full name'/>

            </div>
          </div>
          
        </form>


      </div>
    </div>
  )

    
}

export default RegistrationPage;