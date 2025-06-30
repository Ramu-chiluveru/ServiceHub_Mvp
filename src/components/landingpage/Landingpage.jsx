import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link,useNavigate } from 'react-router-dom';
import  Cookies from 'js-cookie';


export default function Landingpage() {
  const navigate = useNavigate();

  if(phoneCookies.get("token") !== undefined)
  {
    navigate("/home");
  }

   const [menuOpen, setMenuOpen] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX(prev => (prev <= -100 ? 0 : prev - 1));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 text-gray-800 font-sans">

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-[url('/hero-bg.svg')] bg-cover">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
        >
          Connecting Services and Creativity to Your Doorstep
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg text-gray-700 mb-8 max-w-xl mx-auto"
        >
          ServiceHub helps skilled professionals register, verify, and provide services nearby. Local artisans and vendors can also sell their creative products directly to customers.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center gap-4"
        >
          <button className="cursor-pointer bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700">Join as a Service Provider</button>
          <button className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">Find a Service</button>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-16 px-6 bg-white">
        <h3 className="text-3xl font-semibold text-center mb-12 text-blue-700">How It Works</h3>
        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
          {[
            { step: 'Register', icon: '📝', desc: 'Create your account and tell us about your skills or products.' },
            { step: 'Verify', icon: '✅', desc: 'Upload verification documents to build trust.' },
            { step: 'Offer Services/Products', icon: '💼', desc: 'Start receiving service or product orders nearby.' },
            { step: 'Customer Request', icon: '📍', desc: 'Customers raise requests for services or place product orders close to them.' }
          ].map(({ step, icon, desc }) => (
            <motion.div
              key={step}
              className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h4 className="text-xl font-semibold mb-2">{step}</h4>
              <p className="text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Animated Services Showcase */}
      <section className="py-10 overflow-hidden bg-gradient-to-r from-green-50 to-blue-50">
        <div className="whitespace-nowrap" style={{ transform: `translateX(${scrollX}%)`, transition: 'transform 0.3s linear' }}>
          <div className="inline-block px-10 text-lg font-medium text-gray-700 animate-slide inline-flex space-x-10">
            {[ 'Electricians', 'Plumbers', 'AC Repair', 'TV Technicians', 'Craftsmen', 'Makeup Artists', 'Painters', 'Furniture Makers', 'Decor Artists', 'Clay Potters', 'Handmade Artists' ].map((service, idx) => (
              <span key={idx} className="inline-block px-4 py-2 bg-white rounded-xl shadow text-blue-600 border border-blue-200">{service}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section id="services" className="py-16 px-6 bg-gray-100">
        <h3 className="text-3xl font-semibold text-center mb-12 text-green-700">Available Services</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            'Electricians',
            'Plumbers',
            'AC / Refrigerator / TV Repair',
            'Painters',
            'Craftsmen',
            'Makeup Artists',
            'Carpenters',
            'Catering & Decor'
          ].map(service => (
            <div key={service} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-lg font-semibold text-gray-800 flex justify-center items-center">{service}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Marketplace */}
      <section id="marketplace" className="py-16 px-6 bg-white">
        <h3 className="text-3xl font-semibold text-center mb-12 text-purple-700">Creative Marketplace</h3>
        <p className="text-center max-w-3xl mx-auto mb-10 text-gray-600">Local vendors and artisans can showcase and sell their creative work, including handmade crafts, pottery, decorations, and more—directly to nearby customers.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {['Clay Pots', 'Handmade Crafts', 'Wall Art', 'Decor Pieces', 'Jewelry', 'Knitted Goods'].map(product => (
            <div key={product} className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition text-center">
              <h4 className="text-lg font-medium text-gray-800">{product}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section id="register" className="py-20 px-6 bg-blue-50 text-center">
        <h3 className="text-3xl font-bold mb-4">Get Started Today</h3>
        <p className="text-gray-600 mb-6">Join ServiceHub to offer or access nearby services and local creative products. It's easy, safe, and fast.</p>
        <div className="flex justify-center gap-4">
          <Link to={"/register"} className="cursor-pointer bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700">Register Now</Link>
          <Link to={"/login"} className="cursor-pointer bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-100">Login</Link>
        </div>
      </section>
    </div>
  );
}
