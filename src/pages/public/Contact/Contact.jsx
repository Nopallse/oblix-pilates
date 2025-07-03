import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "../../../components/layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <PublicLayout>
      <div className="py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-fraunces font-bold mb-2 text-secondary">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 mb-10 font-montserrat">
            We'd love to hear from you. Reach out with any questions or to
            schedule a visit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-montserrat font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-montserrat font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-montserrat font-medium mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-montserrat font-medium mb-1"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="class-inquiry">Class Inquiry</option>
                    <option value="membership">Membership Information</option>
                    <option value="private-sessions">Private Sessions</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-montserrat font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full p-2 border border-gray-300 rounded font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-opacity-80 text-white rounded-full px-6 py-3 transition-colors font-montserrat font-medium w-full md:w-auto"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-fraunces font-semibold mb-4 text-secondary">
                  Studio Location
                </h2>
                <div className="mb-6 text-gray-700 font-montserrat">
                  <p className="mb-1">123 Pilates Way</p>
                  <p className="mb-1">Wellness District</p>
                  <p>Jakarta, Indonesia 12345</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-fraunces font-medium text-secondary mb-2">
                    Hours
                  </h3>
                  <ul className="text-gray-700 font-montserrat">
                    <li className="flex justify-between mb-1">
                      <span>Monday - Friday</span>
                      <span>6:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between mb-1">
                      <span>Saturday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>9:00 AM - 3:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-fraunces font-semibold mb-4 text-secondary">
                  Get In Touch
                </h2>
                <ul className="text-gray-700 font-montserrat">
                  <li className="flex items-center mb-4">
                    <span className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </span>
                    <span>+62 123-456-7890</span>
                  </li>
                  <li className="flex items-center mb-4">
                    <span className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <span>info@oblixpilates.com</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                        />
                      </svg>
                    </span>
                    <span>@oblixpilates</span>
                  </li>
                </ul>

                <div className="mt-6 flex space-x-4">
                  <a
                    href="#"
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-12 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 font-montserrat">
              Google Maps Integration
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contact;
