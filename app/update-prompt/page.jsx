'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter,useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdatePrompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false)
  const [post, setpost] = useState({
    prompt: '',
    tag: ''
  });  

  const searchParam = useSearchParams();
  const promptId = searchParam.get('id');

  useEffect( () => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json();


        setpost({
            prompt: data.prompt,
            tag: data.tag
        })
    }
    if(promptId) getPromptDetails();

  }, [promptId])
  

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try{
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if(response.ok) {
        router.push('/');
      }
      
    }catch (error) {
      console.log(error);
    }finally {
      setSubmitting(false);
    }

  }
  return (
    <Form 
      type = "Edit"
      post = {post}
      setpost = {setpost}
      submitting = {submitting}
      handleSubmit = {updatePrompt}
    />
  )
}

export default UpdatePrompt