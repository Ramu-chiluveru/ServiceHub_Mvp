import React, { useState,useEffect } from 'react';
import { Plus, Edit3, Trash2, MapPin, Star, DollarSign, Clock, ToyBrick } from 'lucide-react';
import Cookies from 'js-cookie';
import PopupForm from './PopupForm';
import { useNavigate } from 'react-router-dom';

import ConfirmPopup from './ConfirmPopup';

const NewService = () => {
  const [services, setServices] = useState([]);

  const [plusClicked,setPlusClicked] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });
  const [close,onClose] = useState({
      confirm : false,
      id : ''
    });

  const categories = ['Plumbing', 'Carpentry', 'Cleaning', 'Electrical', 'Painting', 'Landscaping', 'Repair', 'Other'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(()=>{
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const endpoint = `${BASE_URL}/api/provider/services`;

    const fetchServices = async() => {
      try 
      {
        const res = await fetch(endpoint,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => res.ok ? res.json() : [])
        .then(data => {console.log(`res: ${JSON.stringify(data)}`);setServices(data)})
        .catch(error => console.log(error));
        console.log(services);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    fetchServices();

  },[close.confirm]);

  const handleEdit = (service) => {
    setEditingService(service);
    console.log(`service: ${JSON.stringify(service)}`);
  };

  const handleDelete = async (id) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const endpoint = `${BASE_URL}/api/provider/service/${id}`;

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setServices(services.filter(service => service.id !== id));
      console.log(`Service with id ${id} deleted`);
    } else {
      const errorText = await response.text();
      console.error("Failed to delete:", errorText);
      alert(`Failed to delete service: ${errorText}`);
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    alert("An error occurred while deleting the service.");
  }
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
        {(plusClicked || editingService != null) && (
        <div onClick={() => setPlusClicked(false)}>
          <PopupForm onClose={() => setPlusClicked(false)} setEditingService={setEditingService} service={editingService}/>
        </div>
      )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.servicename}</h3>
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
                      // onClick={() => handleDelete(service.id)}
                      onClick={() => onClose({confirm:true,id:service.id})}
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
                    {service.price}
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

      {close.confirm && <ConfirmPopup message={"Are you sure to cancel the request?"} id={close.id} onClose={onClose}/> }

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