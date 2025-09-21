import React, { useState, useEffect } from 'react';
import './ServiceLanding.css';

const ServiceLanding = ({ onSelectService }) => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call later
  useEffect(() => {
    const mockServices = [
      {
        id: 1,
        name: "Dental Checkup",
        description: "Comprehensive dental examination and cleaning with our certified dentists",
        category: "healthcare",
        duration: 30,
        price: 50,
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        providers: ["Dr. Smith", "Dr. Johnson"]
      },
      {
        id: 2,
        name: "Haircut & Styling",
        description: "Professional haircut with styling from our expert stylists",
        category: "salon",
        duration: 45,
        price: 35,
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        providers: ["Sophie", "Michael"]
      },
      {
        id: 3,
        name: "Business Consultation",
        description: "One-on-one business strategy session with industry experts",
        category: "consultancy",
        duration: 60,
        price: 100,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        providers: ["Mr. Thompson", "Ms. Davis"]
      },
      {
        id: 4,
        name: "Skin Care Treatment",
        description: "Rejuvenating facial and skin care treatment",
        category: "salon",
        duration: 60,
        price: 75,
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        providers: ["Emma", "Jessica"]
      },
      {
        id: 5,
        name: "Legal Consultation",
        description: "Professional legal advice for your personal or business needs",
        category: "consultancy",
        duration: 45,
        price: 120,
        image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        providers: ["Atty. Wilson", "Atty. Brown"]
      },
      {
        id: 6,
        name: "Physical Therapy",
        description: "Specialized physical therapy sessions for recovery and wellness",
        category: "healthcare",
        duration: 50,
        price: 85,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        providers: ["Dr. Miller", "Dr. Garcia"]
      }
    ];

    setServices(mockServices);
    setLoading(false);
  }, []);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'salon', name: 'Salon & Spa' },
    { id: 'consultancy', name: 'Consultancy' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  if (loading) {
    return (
      <div className="service-landing">
        <div className="loading-spinner"></div>
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className="service-landing">
      <div className="hero-section">
        <h1>Book Your Appointment Easily</h1>
        <p>Choose from our professional services and book with just a few clicks</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div 
            key={service.id} 
            className="service-card"
            onClick={() => onSelectService(service)}
          >
            <div className="service-image">
              <img src={service.image} alt={service.name} />
              <span className="service-category">{service.category}</span>
            </div>
            <div className="service-content">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-meta">
                <span className="duration">⏱️ {service.duration} min</span>
                <span className="price">${service.price}</span>
              </div>
              <button className="book-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="no-services">
          <h3>No services found in this category</h3>
          <p>Please try selecting a different category</p>
        </div>
      )}
    </div>
  );
};

export default ServiceLanding;