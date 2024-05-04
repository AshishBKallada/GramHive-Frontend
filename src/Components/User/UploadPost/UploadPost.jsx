import React, { useState, useEffect } from 'react';
import TagsInput from '../TagsInput/tagsInput';
import { useNavigate } from 'react-router-dom';
import Switcher1 from '../ToggleButton/Switcher1';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../../Context/LoadingContext';
import LoadingSpinner from '../../External/LoadingSpinner';


const UploadPost = ({ initialImages }) => {

    const userId = useSelector((state) => state.user.user._id);

    const [images, setImages] = useState(initialImages);
    const [predefinedTags, setPredefinedTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [caption, setCaption] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate('');

    const { isLoading, setLoading } = useLoading();

    const handleNavigate = (e) => {
        navigate('/home')
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const predefinedTags = await response.json();
                setPredefinedTags(predefinedTags);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            images.forEach((file) => formData.append('images', file));

            formData.append('caption', caption);

            selectedTags.forEach(tag => {
                formData.append('tags', tag._id);
            });

            formData.append('isChecked', isChecked);

            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            setLoading(true)
            const response = await fetch(`http://localhost:3000/posts/addpost/${userId}`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });


            if (response.ok) {
                setLoading(false)
                console.log('response returned');
                toast.success('Post Added!', {
                    autoClose: 1500,
                    onClose: () => navigate('/profile')
                });

            }
        } catch (error) {
            console.error('Error uploading post:', error);
        }
    }
    console.log('LOADING---', isLoading);
    return (


        <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8  bg-black opacity-70 z-10 bg-no-repeat bg-cover relative items-center">
            <ToastContainer />
            {isLoading && <LoadingSpinner />}
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">
                        Create Post!
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p>
                    <br /><br />
                    <div className="flex relative ml-36">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`w-44 h-12 absolute rounded-lg border border-blue-800 shadow-md transform transition-all skew-x-8 -skew-y-12 -top-${index * 4} -left-${index * 4}`}
                            >
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Image ${index}`}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                    <br /><br /><br /><br /><br /><br /><br />
                </div>

                <div className="relative mt-8 space-y-3">
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Caption</label>
                        <input value={caption} onChange={(e) => setCaption(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" placeholder="Enter caption here" />
                    </div>
                    <TagsInput predefinedTags={predefinedTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

                </div>
                <Switcher1 cbStateChanged={setIsChecked} />
                <div className="mt-6 text-center">
                    <button onClick={handleUpload} type="submit" className="w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPost;
