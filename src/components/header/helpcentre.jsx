import React, { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import  Cookies from 'js-cookie';

export default function HelpCentrePage() {
  const [activeTab, setActiveTab] = useState('faq');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userEmail = Cookies.get("email");

  const faqs = [
    {
      question: "How do I book a service?",
      answer: "To book a service, navigate to the service page, select your preferred date and time, and proceed to checkout. You'll receive a confirmation email once your booking is complete."
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled time. Go to 'My Bookings' in your account to make changes."
    },
    {
      question: "How do payments work?",
      answer: "Payments are processed securely at the time of booking. We accept all major credit cards and PayPal. Your payment information is never stored on our servers."
    },
    {
      question: "What if I need to contact the service provider?",
      answer: "After booking, you'll receive the service provider's contact information. You can also message them directly through our platform."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      if (!userEmail) {
        throw new Error('You must be logged in to submit a support request');
      }

      const response = await fetch('http://localhost:8080/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          email: userEmail,
          message
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit support request');
      }
      
      setMessage('');
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <HelpCircle className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Help Centre</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('faq')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'faq' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                FAQs
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'contact' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Contact Support
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'faq' && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h2>
                <p className="text-gray-500 mb-4">Find answers to common questions about our services.</p>
                
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
                        onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${openQuestion === index ? 'transform rotate-180' : ''}`} />
                      </button>
                      {openQuestion === index && (
                        <div className="p-4 bg-white text-gray-700">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'contact' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">Contact Support</h2>
                <p className="text-gray-500 mb-6">Can't find what you're looking for? Send us a message and we'll get back to you as soon as possible.</p>
                
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {submitSuccess && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">Your message has been sent successfully! We'll get back to you soon.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending...' : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Live Chat
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Still need help?</h2>
          <p className="text-gray-500 mb-4">Visit our comprehensive help center or call our customer service team.</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.open('https://help.servicehub.com', '_blank')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Visit Help Center
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Call Support: (800) 123-4567
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}