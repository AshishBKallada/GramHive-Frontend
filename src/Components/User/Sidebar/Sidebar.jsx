
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaCompass, FaRegPlayCircle, FaEnvelope, FaBell, FaPlusSquare, FaUserFriends, FaEllipsisH } from 'react-icons/fa';
import './Sidebar.css';
import CreatePost from '../CreatePost/CreatePost';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import SearchModal from '../../../../dummy';
import { AuthContext } from '../../../Context/AuthContext';


const Sidebar = () => {

  const [create, setshowCreate] = useState(false);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const { setToken } = useContext(AuthContext)

  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm to Logout',
      message: 'Are you sure to logout.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            Cookies.remove('token');
            setToken(null);
            navigate('/login')
          }

        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }
  return (
    <>

      <div className="sidebar">
        <div className="logo w-full">
          <img className='ml-6' src="https://fontmeme.com/permalink/240410/921064cd21a38f61c2f581450ded4de3.png" alt="" />
        </div>
        <ul className="sidebar-nav">
          <li>
            <Link to="/">
              <FaHome className="sidebar-icon" />
              Home
            </Link>
          </li>
          <li>
            <div className='ml-40'>
              {showSearch && <SearchModal onClickOutside = {()=>setShowSearch(prev=>!prev)} setShowSearch={setShowSearch} />}
            </div>
            <Link onClick={() => setShowSearch(prev => !prev)}>
              <FaSearch className="sidebar-icon" />
              Search
            </Link>


          </li>
          <li>
            <Link to="/explore">
              <FaCompass className="sidebar-icon" />
              Explore
            </Link>
          </li>
          <li>
            <Link to="/reel">
              <FaRegPlayCircle className="sidebar-icon" />
              Reel
            </Link>
          </li>
          <li>
            <Link to="/messages">
              <FaEnvelope className="sidebar-icon" />
              Messages
            </Link>
          </li>
          <li>
            <Link to="/notifications">
              <FaBell className="sidebar-icon" />
              Notifications
            </Link>
          </li>
          <li>
            <Link onClick={() => setshowCreate(prev => !prev)}>
              <FaPlusSquare className="sidebar-icon" /> Create
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FaUserFriends className="sidebar-icon" />
              Profile
            </Link>
          </li>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <li>
            <Link to="/more">
              {/* <FaEllipsisH className="sidebar-icon" /> */}
              <button className="ml-8 select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={handleLogout}>Logout</button>
            </Link>
          </li>
        </ul>

      </div>
      {create && <CreatePost setshowCreate={setshowCreate} />}

    </>
  );
};

export default Sidebar;