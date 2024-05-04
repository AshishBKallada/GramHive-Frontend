import React, { useState, useEffect } from 'react'
import UserProfiles from '../../Components/User/UserProfiles/UserProfiles'
import { useParams } from 'react-router-dom';
import Sidebar from '../../Components/User/Sidebar/Sidebar';
import { useLoading } from '../../Context/LoadingContext';
import LoadingSpinner from '../../Components/External/LoadingSpinner';

function OtherUserProfile() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const { isLoading, setLoading } = useLoading();

    console.log('userID', userId);

    useEffect(() => {
        setLoading(true)
        const fetchUserData = async () => {
            const response = await fetch(`http://localhost:3000/getsearchuser/${userId}`)
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
    console.log('userData', userData);
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
