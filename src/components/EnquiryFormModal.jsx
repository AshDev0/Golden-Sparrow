import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle } from 'lucide-react';
import usePageTracking from '../hooks/usePageTracking';

export default function EnquiryForm({ productName = '', onClose = null }) {
  const pageInfo = usePageTracking();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: productName ? `Enquiry about ${productName}` : '',
    message: '',
    productName: productName
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://goldensparrowuae.com/wp-json/custom/v1/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          product_name: formData.productName || '',
          source: 'website_enquiry_form',
          source_page: {
            url: pageInfo.url,
            pathname: pageInfo.pathname,
            search: pageInfo.search,
            title: pageInfo.title,
            referrer: pageInfo.referrer,
            timestamp: new Date().toISOString()
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          productName: ''
        });
      } else {
        throw new Error(result.message || 'Failed to send enquiry');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setErrors({
        submit: 'Failed to send your enquiry. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-elegant max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-3">
          Thank You!
        </h3>
        <p className="text-neutral-600 mb-6">
          Your enquiry has been sent successfully. We'll get back to you within 1 hour.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-accent-500 text-white rounded-md font-medium hover:bg-accent-600 transition-colors"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-elegant max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Mail className="w-6 h-6 text-accent-600" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          Get in Touch
        </h3>
        <p className="text-neutral-600">
          Send us your enquiry and we'll respond promptly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {errors.submit}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-neutral-300'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-300'
              }`}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-neutral-300'
              }`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
              errors.subject ? 'border-red-300 bg-red-50' : 'border-neutral-300'
            }`}
            placeholder="What's this enquiry about?"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
            Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors resize-none ${
                errors.message ? 'border-red-300 bg-red-50' : 'border-neutral-300'
              }`}
              placeholder="Please describe your requirements or questions..."
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-md font-medium hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${onClose ? 'flex-1' : 'w-full'} px-6 py-3 bg-accent-500 text-white rounded-md font-medium hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Enquiry
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}