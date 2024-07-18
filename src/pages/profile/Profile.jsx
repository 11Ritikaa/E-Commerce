import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../redux/wishlistSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const wishlistItems = useSelector((state) => state.wishlist) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user || !user.displayName || !user.email) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="text-center p-4 bg-white shadow-md rounded-lg">
          <p className="text-lg font-medium text-gray-700">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-900 mb-6">Profile</h1>

        {/* Personal Information Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">Personal Information</h2>
          <div className="mb-4">
            <p className="text-gray-700 text-lg">
              Name: <span className="font-medium">{user.displayName}</span>
            </p>
            <p className="text-gray-700 text-lg">
              Email: <span className="font-medium">{user.email}</span>
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <ul className="flex space-x-4 p-4">
              <li className={`cursor-pointer ${activeTab === 'orders' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`} onClick={() => setActiveTab('orders')}>
                Orders
              </li>
              <li className={`cursor-pointer ${activeTab === 'buyAgain' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`} onClick={() => setActiveTab('buyAgain')}>
                Buy Again
              </li>
              <li className={`cursor-pointer ${activeTab === 'customerCare' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`} onClick={() => setActiveTab('customerCare')}>
                Customer Care
              </li>
              <li className={`cursor-pointer ${activeTab === 'terms' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`} onClick={() => setActiveTab('terms')}>
                Terms & Conditions
              </li>
              <li className={`cursor-pointer ${activeTab === 'return' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`} onClick={() => setActiveTab('return')}>
                How to Return
              </li>
              <li className={`cursor-pointer ${activeTab === 'wishlist' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`} onClick={() => setActiveTab('wishlist')}>
                Wishlist
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'orders' && (
              <>
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Orders</h2>
                <Link to="/order" className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  View All Orders
                </Link>
              </>
            )}
            {activeTab === 'buyAgain' && (
              <>
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Buy Again</h2>
                <p className="text-gray-700">Check out the products you can purchase again <Link to="/allproducts" className="text-green-600">here</Link>.</p>
              </>
            )}
            {activeTab === 'customerCare' && (
              <>
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Customer Care</h2>
                <p className="text-gray-700">For any issues or inquiries, please contact us at: <a href="mailto:support@example.com" className="text-green-600">support@example.com</a></p>
              </>
            )}
            {activeTab === 'terms' && (
              <>
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Terms & Conditions</h2>
                <p className="text-gray-700">Read our <Link to="/terms" className="text-green-600">Terms & Conditions</Link>.</p>
              </>
            )}
            {activeTab === 'return' && (
              <>
                <h2 className="text-2xl font-semibold text-green-900 mb-4">How to Return</h2>
                <p className="text-gray-700">Learn about our return process <Link to="/return" className="text-green-600">here</Link>.</p>
              </>
            )}
            {activeTab === 'wishlist' && (
              <>
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Wishlist</h2>
                {wishlistItems.length === 0 ? (
                  <p className="text-gray-700">Your wishlist is empty.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        <img className="w-full h-48 object-cover" src={item.imageUrl} alt={item.title} />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-gray-700">₹{item.price}</p>
                          <button
                            onClick={() => dispatch(removeFromWishlist(item.id))}  // Corrected syntax
                            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Remove from Wishlist
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Logout Button */}
          <div className="p-6 border-t border-gray-200">
            <button
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
