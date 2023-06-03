'use client';
import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick}) => {
    return (
      <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    )
  }

const Feed = () => {

  const [searchText, setsearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResult, setSearchedResult] = useState([])

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();
      
      setPosts(data);
    }
  
    fetchPosts();
  },[])

  const filteredPrompt = (searchtext) => {
    const compareSearch = new RegExp(searchtext, "i");
    console.log(searchtext)
    return posts.filter((item) => 
      compareSearch.test(item.creator.username) ||
      compareSearch.test(item.prompt) ||
      compareSearch.test(item.tag) 
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value)
    
    
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPrompt(e.target.value);
        setSearchedResult(searchResult);
      }, 500)
    )
  }

  const handleTagClick = (tag) => {
    setsearchText(tag);
    const searchResultTag = filteredPrompt(tag);
    setSearchedResult(searchResultTag);
  }
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange= {handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchedResult}
         handleTagClick={ handleTagClick }/>
       ) : (
        <PromptCardList
          data={posts}
          handleTagClick ={ handleTagClick }
        />
         )
      }
    </section>
  )
}

export default Feed
