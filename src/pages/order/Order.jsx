import { useContext, useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import ProgressBar from '../../components/progressBar/ProgressBar';

function Order() {
  const userid = JSON.parse(localStorage.getItem('user'))?.uid;
  const context = useContext(myContext);
  const { mode, loading, setLoading } = context;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setLoading(true);

    // Set up a real-time listener for the orders collection
    const q = query(collection(fireDB, 'order'), where('userid', '==', userid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersArray);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [setLoading, userid]);

  useEffect(() => {
    orders.forEach(order => {
      if (order.status === 'Order Received') {
        const dispatchTimer = setTimeout(async () => {
          await updateDoc(doc(fireDB, 'order', order.id), { status: 'Order Dispatched' });
        }, 2 * 60 * 1000); // 2 minutes

        const deliverTimer = setTimeout(async () => {
          await updateDoc(doc(fireDB, 'order', order.id), { status: 'Order Delivered' });
        }, 5 * 60 * 1000); // 5 minutes

        return () => {
          clearTimeout(dispatchTimer);
          clearTimeout(deliverTimer);
        };
      }
    });
  }, [orders]);

  return (
    <Layout>
      {loading && <Loader />}
      {orders.length > 0 ? (
        <div className="h-full pt-10">
          {orders.map((order, index) => (
            <div key={index} className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="w-5/6">
                {/* Progress Bar */}
                <ProgressBar status={order.status} />
                {/* Order Details */}
                {order.cartItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="rounded-lg mb-6 bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
                    <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                        <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description.split('\n').map((line, idx) => (<span key={idx}>{line}<br /></span>))}</p>
                        <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders</h2>
      )}
    </Layout>
  );
}

export default Order;
