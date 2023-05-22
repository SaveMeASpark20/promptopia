'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"



const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {

  const [copied, setCopied] = useState("");

  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout( () => setCopied(""), 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-star items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.emai}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={ handleCopy }>
          <Image
            src={copied === post.prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
              }
              width={12}
              height={12} 
              alt="copy"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>
      <p className="font-inter text-sm blue-gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}  
      </p>
      <div>
        {session?.user.id === post.creator._id && pathName === '/profile'
          &&  (
            <div className="flex justify-center gap-5">
              <p
                className="font-inter text-sm
                green_gradient cursor-pointer"
                onClick={handleEdit}>
                Edit
              </p>

              <p
                className="font-inter text-sm
                orange_gradient cursor-pointer"
                onClick={handleDelete}>
                Delete
              </p>
            </div>
          )}
      </div>
    </div>
  )
}

export default PromptCard