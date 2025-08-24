import React, { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to the server)
    console.log('Form submitted:', formData);
    alert('Your message has been sent successfully!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="container py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="text-center mb-4 mb-md-5">
            <h1 className="display-5 display-md-4 fw-bold mb-3">Contact Us</h1>
            <p className="lead px-2 px-md-0">
              If you have any questions or need assistance, feel free to reach out to us using the form below.
            </p>
          </div>
          
          <div className="row g-4 g-md-5">
            {/* Contact Information */}
            <div className="col-12 col-lg-4">
              <div className="bg-light rounded-3 p-4 h-100">
                <h4 className="h5 fw-bold mb-3 text-primary">Get in Touch</h4>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-envelope text-primary me-3"></i>
                    <strong>Email</strong>
                  </div>
                  <p className="text-muted mb-0 ms-4">support@auctionpro.com</p>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-phone text-primary me-3"></i>
                    <strong>Phone</strong>
                  </div>
                  <p className="text-muted mb-0 ms-4">+1 (555) 123-4567</p>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-clock text-primary me-3"></i>
                    <strong>Business Hours</strong>
                  </div>
                  <p className="text-muted mb-0 ms-4">
                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                    <span className="d-block">Sat-Sun: 10:00 AM - 4:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label htmlFor="name" className="form-label fw-medium">Name *</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      
                      <div className="col-12 col-md-6">
                        <label htmlFor="email" className="form-label fw-medium">Email *</label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label fw-medium">Subject *</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Enter the subject"
                          required
                        />
                      </div>
                      
                      <div className="col-12">
                        <label htmlFor="message" className="form-label fw-medium">Message *</label>
                        <textarea
                          className="form-control form-control-lg"
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="6"
                          placeholder="Write your message here"
                          required
                          style={{ resize: 'vertical', minHeight: '150px' }}
                        ></textarea>
                      </div>
                      
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-lg w-100">
                          <i className="fas fa-paper-plane me-2"></i>
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

