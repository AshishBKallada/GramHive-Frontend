import React, { useState, useEffect } from 'react'
import UserProfiles from '../../Components/User/Profile/UserProfiles'
import { useParams } from 'react-router-dom';
import Sidebar from '../../Components/User/Sidebar/Sidebar';
import { useLoading } from '../../Context/LoadingContext';
import LoadingSpinner from '../../Components/External/LoadingSpinner';

function OtherUserProfile() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const { isLoading, setLoading } = useLoading();


    useEffect(() => {
        setLoading(true)
        const fetchUserData = async () => {
            const response = await fetch(`https://bassheads.shop/getsearchuser/${userId}`)
            if (response.ok) {
                const userData = await response.json();
                console.log('userData', userData)
                setUserData(userData);
                setTimeout(() => {
                    setLoading(false);
                  }, 1000);            }
        }
        fetchUserData();

    }, [])
    return (
        <div> <Sidebar />
            {isLoading ? <LoadingSpinner /> :
                <div style={{ marginLeft: '200px' }}>
                    {userData && <UserProfiles userData={userData} />}
                </div>
            }
        </div>
    )
}

export default OtherUserProfile
