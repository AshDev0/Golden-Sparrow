import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { submitEnquiry, ApiError } from "../services/api";
import usePageTracking from "../hooks/usePageTracking";
 
// Notification component for proper React state management
const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
 
    return () => clearTimeout(timer);
  }, [onClose]);
 
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
 
  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in max-w-md`}
    >
      <div className="flex justify-between items-start">
        <span className="pr-4">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 font-bold text-lg leading-none"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};
 
const EnquiryPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const pageInfo = usePageTracking();
 
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    interest: "Buying",
  });
 
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  // Check if required fields (Name and Phone) are filled
  const isFormValid =
    formData.name.trim().length > 0 && formData.phone.trim().length > 0;
 
  // Validation rules
  const validateForm = () => {
    const newErrors = {};
 
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
 
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
 
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
 
    return newErrors;
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
 
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const newErrors = validateForm();
 
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
 
    setIsSubmitting(true);
 
    try {
      // Prepare submission data with page_url that matches WordPress backend expectations
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        interest: formData.interest,
        category: formData.category,
        page_url: pageInfo.url || (typeof window !== "undefined" ? window.location.href : "")
      };
 
 
      // Submit the enquiry using the API service
      const result = await submitEnquiry(submissionData);
 
      // Redirect to thank you page on success
 
      // Reset form on successful submission
      setFormData({
        name: "",
        phone: "",
        email: "",
        category: "",
        interest: "Buying",
      });
 
      // Close popup and redirect to thank you page
      onClose();
      navigate("/thank-you");
    } catch (error) {
      console.error("Submission error:", error);
 
      let errorMessage = "Something went wrong. Please try again.";
 
      // Handle specific API errors
      if (error instanceof ApiError) {
        errorMessage = error.message;
      }
 
      // For now, just log the error. Could be enhanced with proper error handling UI
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
 
  // Handle escape key to close popup
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
 
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when popup is open
      document.body.style.overflow = "hidden";
    }
 
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
 
  // Don't render if not open
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Popup Container */}
      <div
        className="bg-white shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 p-2"
          aria-label="Close popup"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
 
        {/* Form Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Enquire Now</h2>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name Field */}
            <div>
              <label
                htmlFor="popup-name"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Your Name{" "}
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </label>
              <input
                type="text"
                id="popup-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                autoComplete="off"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
 
            {/* Phone Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Phone number{" "}
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </label>
              <PhoneInput
                country={"ae"}
                value={formData.phone}
                onChange={(phone) =>
                  setFormData((prev) => ({ ...prev, phone }))
                }
                onFocus={() => {
                  if (errors.phone) {
                    setErrors((prev) => ({ ...prev, phone: "" }));
                  }
                }}
                inputStyle={{
                  width: "100%",
                  height: "48px",
                  fontSize: "16px",
                  borderColor: errors.phone ? "#ef4444" : "#d1d5db",
                  backgroundColor: errors.phone ? "#fef2f2" : "#ffffff",
                }}
                buttonStyle={{
                  borderColor: errors.phone ? "#ef4444" : "#d1d5db",
                  backgroundColor: "#f9fafb",
                }}
                dropdownStyle={{
                  maxHeight: "200px",
                }}
                searchStyle={{
                  padding: "8px",
                  fontSize: "14px",
                }}
                enableSearch={true}
                searchPlaceholder="Search countries"
                placeholder="Enter phone number"
                specialLabel=""
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>
 
            {/* Email Field */}
            <div>
              <label
                htmlFor="popup-email"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Customer Email ID{" "}
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </label>
              <input
                type="email"
                id="popup-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                autoComplete="off"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
 
            {/* Category Field */}
            {/* <div>
              <label
                htmlFor="popup-category"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                What service are you looking for?
              </label>
              <div className="relative inline-block w-full">
                <select
                  name="category"
                  id="popup-category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full appearance-none px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white text-sm ${
                    errors.category
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                >
                  <option value="" disabled>
                    Select Machinery You're Looking For:
                  </option>
                  <option value="Excavators">Excavators</option>
                  <option value="Off Road Trucks">Off Road Trucks</option>
                  <option value="Loaders">Loaders</option>
                  <option value="Cranes">Cranes</option>
                  <option value="Bulldozers">Bulldozers</option>
                  <option value="Compactors">Compactors</option>
                  <option value="Generator sets">Generator Sets</option>
                  <option value="Manlifts">Manlifts</option>
                  <option value="Material Handling">Material Handling</option>
                  <option value="Aggregate Equipment">
                    Aggregate Equipment
                  </option>
                  <option value="Motor Graders">Motor Graders</option>
                  <option value="Drilling Equipment">Drilling Equipment</option>
                  <option value="Transport Trucks">Transport Trucks</option>
                  <option value="Pumps">Pumps</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M5.516 7.548L10 12.03l4.484-4.482L16 8.061 10 14.061 4 8.061z" />
                  </svg>
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div> */}
 
            {/* Interest Selection */}
            <fieldset className="bg-[#F5F1E6] rounded-lg p-4 w-[80%] mx-auto overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                {/* Left label */}
                <p className="text-sm font-semibold text-[#9E3F2E] shrink-0">
                  I am interested in:
                </p>
 
                {/* Options */}
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="interest"
                      value="Buying"
                      checked={formData.interest === "Buying"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#9E3F2E] focus:ring-[#9E3F2E] border-gray-300"
                    />
                    <span>Buying</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="interest"
                      value="Renting"
                      checked={formData.interest === "Renting"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#9E3F2E] focus:ring-[#9E3F2E] border-gray-300"
                    />
                    <span>Renting</span>
                  </label>
                </div>
              </div>
            </fieldset>
 
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-1/2 mx-auto flex justify-center items-center font-semibold py-3 px-6 rounded-md transition-colors duration-200 mt-6 ${
                isFormValid && !isSubmitting
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
 
            {/* Footer Text */}
            <p className="text-center italic text-sm text-gray-600 mt-4">
              Quick response always , we'll call you{" "}
              <span className="font-semibold">within 1 hour</span>
            </p>
 
          </form>
        </div>
      </div>
 
    </div>
  );
};
 
export default EnquiryPopup;