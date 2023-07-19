"use client";

import {useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';


import Profile from '@components/Profile';

const OtherProfile = ({params}) => {
    const [posts, setPosts] = useState([]);

    const searchParam = useSearchParams();
    const username = searchParam.get('name');

    useEffect(() => {
      const fetchPosts = async () => {
        try{
          const response = await fetch(`/api/users/${params.id}/posts`);
          const data = await response.json();
          setPosts(data);
          console.log(posts);

        }catch(error){
          console.log(error);
        }
          
      }
        if(params?.id) fetchPosts();
      },[params.id])



  return (
    <Profile
        name= {posts[0]?.creator?.username}
        desc= "Welcome to your personalize profile page"
        data={posts} 
    /> 
  )  
}

export default OtherProfile