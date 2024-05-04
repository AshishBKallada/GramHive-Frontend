import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/User/Sidebar/Sidebar';
import PostCard from '../../Components/User/PostCard/PostCard';
import Story from '../../Components/User/Story/Story';
import { useSelector } from 'react-redux';

function Home() {


    const [posts, setPosts] = useState([]);
    const [likeMap, setLikeMap] = useState([]);

    const user = useSelector((state) => state.user.user)
    const userId = user._id;
    console.log('USER', userId);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts/home/${userId}`)
                if (response.ok) {
                    const data = await response.json();
                    console.log('HOME POSTS', data);
                    let id = [];
                    await data.posts.forEach(async (post) => {
                        console.log('ewrwe')
                        await post.likes.forEach((like) => {
                            console.log(like,'ooertoier')
                            id.push(like.user._id);
                        });
                    });
                    setLikeMap(id);
                    setPosts(data.posts)
                }
            } catch (error) {

            }
        }
        fetchPosts();
    }, [])
    return (
        <div className='' style={{ position: 'relative' }}>
            <Sidebar />
            <div className='w-[60%] ml-[20%] z-10 '>
                <Story />
            </div>

            <div className='scroll-smooth static overflow-scroll' style={{ marginLeft: '400px', height: 'calc(100vh - 8rem)', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
    <PostCard posts={posts} setPosts={setPosts} likeMap={likeMap} setLikeMap={setLikeMap} />
</div>


        </div>
    );
}

export default Home;
