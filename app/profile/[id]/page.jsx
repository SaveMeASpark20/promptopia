"use client";

import {useState, useEffect} from 'react';
import { useSession, useSearchParams } from 'next-auth/react'
import {useRouter} from 'next/navigation';


import Profile from '@components/Profile';

const OtherProfile = () => {
    const {data : session} = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    const searchParam = useSearchParams();
    const param = searchParam.get('id');

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${param}`);
          const data = await response.json();
          console.log(data);
          setPosts(data);
        }
      
        if(param) fetchPosts();
      },[param])



  return (
    <Profile
        name= "name"
        desc= "Welcome to your personalize profile page"
        data={posts} 
    /> 
  )  
}

export default OtherProfile