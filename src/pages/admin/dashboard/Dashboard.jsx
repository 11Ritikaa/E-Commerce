import { useContext } from 'react';
import { FaUserTie } from 'react-icons/fa';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';

function Dashboard() {
    const context = useContext(myContext);
    const { mode, totalOrders, totalProducts, totalUsers } = context;

    return (
        <Layout>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container mx-auto mb-10 flex flex-col items-center">
                    <div className="flex flex-wrap justify-center -m-4 text-center">
                        <div className="p-6 w-full md:w-1/4 sm:w-1/2">
                            <div className={`border-2 shadow-md p-8 rounded-xl ${mode === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}>
                                <div className="text-green-500 w-12 h-12 mb-4 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="title-font font-bold text-3xl">{totalProducts}</h2>
                                <p className="text-green-500 font-semibold">Total Products</p>
                            </div>
                        </div>
                        <div className="p-6 w-full md:w-1/4 sm:w-1/2">
                            <div className={`border-2 shadow-md p-8 rounded-xl ${mode === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}>
                                <div className="text-green-500 w-12 h-12 mb-4 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="title-font font-bold text-3xl">{totalOrders}</h2>
                                <p className="text-green-500 font-semibold">Total Orders</p>
                            </div>
                        </div>
                        <div className="p-6 w-full md:w-1/4 sm:w-1/2">
                            <div className={`border-2 shadow-md p-8 rounded-xl ${mode === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}>
                                <div className="text-green-500 w-12 h-12 mb-4 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="title-font font-bold text-3xl">{totalUsers}</h2>
                                <p className="text-green-500 font-semibold">Total Users</p>
                            </div>
                        </div>
                    </div>
                </div>
                <DashboardTab />
            </section>
        </Layout>
    );
}

export default Dashboard;
