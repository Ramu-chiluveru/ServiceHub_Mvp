import { useNavigate,useLocation } from "react-router-dom";

export default function Footer()
{

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  
  return( 
  <>
    {
        (path == '/login' || path == '/register') ? (
           <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">ServiceHub</div>
              <p className="text-gray-400">
                Connecting you with trusted service providers in your area.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Home Services</li>
                <li>Professional Services</li>
                <li>Crafts & Art</li>
                <li>Repairs & Maintenance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ServiceHub. All rights reserved.</p>
          </div>
        </div>
      </footer> 
        ) 
        : 
        (
          <footer className="bg-white text-center py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} ServiceHub. All rights reserved.
          </footer>
      )
      
    } 
  </>
  );
}