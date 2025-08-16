import React, { useState } from 'react';
import { Plus, Edit3, Trash2, MapPin, Star, DollarSign, Clock } from 'lucide-react';
import PopupForm from './PopupForm';

const NewService = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Emergency Plumbing Repair',
      category: 'Plumbing',
      price: 80,
      location: 'Midtown',
      rating: 4.9,
      reviews: 203,
      description: 'Quick response plumbing services available 24/7'
    },
    {
      id: 2,
      name: 'Custom Woodwork',
      category: 'Carpentry',
      price: 75,
      location: 'Workshop District',
      rating: 4.9,
      reviews: 67,
      description: 'Handcrafted furniture and custom wood pieces'
    },
    {
      id: 3,
      name: 'Professional House Cleaning',
      category: 'Cleaning',
      price: 50,
      location: 'Downtown',
      rating: 4.8,
      reviews: 156,
      description: 'Thorough residential cleaning services'
    }
  ]);

  const [plusClicked,setPlusClicked] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });

  const categories = ['Plumbing', 'Carpentry', 'Cleaning', 'Electrical', 'Painting', 'Landscaping', 'Repair', 'Other'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {

    console.log(`${JSON.stringify(formData)}`);
    if (!formData.name || !formData.category || !formData.price || !formData.location || !formData.description) {
      return;
    }
    
    if (editingService) 
    {
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...formData, price: parseFloat(formData.price) }
          : service
      ));
      setEditingService(null);
    } 
    else{
      console.log(`${JSON.stringify(formData)}`)
      const newService = 
      {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        rating: 0,
        reviews: 0
      };




      setServices([...services, newService]);
    }
    setFormData({ name: '', category: '', price: '', location: '', description: '' });
    setShowAddForm(false);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      location: service.location,
      description: service.description
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingService(null);
    setFormData({ name: '', category: '', price: '', location: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Total Services: <span className="font-semibold text-gray-900">{services.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Service Button */}
        {/* <div className="mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            <span>Add New Service</span>
          </button>
        </div> */}

        {plusClicked && (
        <div onClick={() => setPlusClicked(false)}>
          <PopupForm onClose={() => setPlusClicked(false)} reqId={null} categories={categories}/>
        </div>
      )}

        {/* Add/Edit Service Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter service name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Hour ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your service..."
                  rows="3"
                  required
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin size={16} className="mr-1" />
                      {service.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Star size={16} className="mr-1 text-yellow-500" />
                      {service.rating > 0 ? `${service.rating} (${service.reviews} reviews)` : 'No reviews yet'}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-lg font-semibold text-blue-600">
                    <DollarSign size={18} />
                    {service.price}/hour
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {service.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Clock size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first service</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto transition-colors duration-200"
            >
              <Plus size={20} />
              <span>Add Your First Service</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating Add Button (Mobile) */}
      {/* <div className="fixed bottom-6 right-6 md:hidden">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus size={24} />
        </button>
      </div> */}
       <button
            onClick={() => setPlusClicked(true)}
            className={`fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-40 transform hover:scale-110 active:scale-95 ${
              plusClicked ? 'rotate-45 bg-red-500' : 'rotate-0'
            }`}
          >
              <Plus className="h-6 w-6 transition-transform duration-300" />
          </button>
    </div>
  );
};

export default NewService;