import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('adminToken');
        navigate('/admin')
    }
    return (
        <header className="text-gray-100 bg-black body-font shadow w-full">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                    <a
                        className="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">About</a>
                    {/* <a
                        className="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">Products</a>
                    <a className="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">Investor
                        Relations</a> */}
                    <a
                        className="hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">Contact</a>
                </nav>
              
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                    <a onClick={handleLogout} className="bg-indigo-700 hover:bg-indigo-500 text-white ml-4 py-2 px-3 rounded-lg">
                        Logout
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
