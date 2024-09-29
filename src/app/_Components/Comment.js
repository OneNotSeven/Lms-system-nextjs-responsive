"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { appBaseUrl } from '@/schema/appurl';

const Comment = ({ courseid,commentsList}) => {

  const [userid, setUserId] = useState(null)
  const [stuDetails, setstuDetails] = useState(null)
  const [postingStatus, setpostingStatus] = useState()
  const [comments, setComments] = useState(commentsList);
  const [refresh, setrefresh] = useState(false)

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const jwtVerify = async () => {
        try {
            const responseVerify = await fetch(`${appBaseUrl}/api/tokengetter`, {
                method: "POST"
            }).then(res => res.json())

            if (responseVerify.success==true) {
                setUserId(responseVerify.verifytoken.userid)
            }
        } catch (error) {
            // console.error("Error verifying token:", error)
        }
    }

    jwtVerify()
  }, [])
  
  useEffect(() => {
    if (!userid) return
    
    const fetchStudent = async() => {
      const Data = await fetch(`${appBaseUrl}/api/editprofile`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({profileId:userid})
      })
      const res = await Data.json()
      if (res.success == true) {
        
        setstuDetails(res.message[0])
        // console.log("commnet user",res.message[0])
      }
    }
    fetchStudent()
    
  }, [userid])

  
  
  

  const handleDropdownToggle = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const newCommentObj = {
      profilePicture: "/profiledummy.png", 
      name: stuDetails?.name || "invalid user", 
      dateTime: new Date().toISOString().split('T')[0],
      dateTimeTitle: new Date().toLocaleDateString(),
      date: new Date().toLocaleDateString(),
      text: newComment
    };
    setpostingStatus(true);
    setComments([...comments, newCommentObj]);
    const commentSave = await fetch(`${appBaseUrl}/api/comment`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({userId:userid,courseid:courseid,name:stuDetails.name,text:newComment,profilePicture:"/profiledummy.png"})
      
    })
    const res = await commentSave.json()
    if (res.success == true) {
      setpostingStatus(false)
      setrefresh(true)
    }
    // console.log("comment saved res",res)
    setNewComment("");
  };

  const handleCommentDelete = async (index) => {
    // Get the comment ID from the comment list
    const commentId = comments[index]._id; // Assuming each comment has a unique `_id` field

    // Send DELETE request to the server
    const response = await fetch(`${appBaseUrl}/api/comment`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseid: courseid, commentId: commentId }),
    });

    const result = await response.json();

    if (result.success) {
        // Remove the comment from local state
        setComments(comments.filter((_, i) => i !== index));
        setrefresh(!refresh); // Trigger a refresh to update the comments from server
    } else {
        // console.error('Failed to delete comment:', result.error);
    }

    if (activeDropdown !== null) {
        setActiveDropdown(null);
    }
};

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full dark:bg-gray-900 py-8 lg:py-16 antialiased"
    >
      <div className="max-w-2xl px-4 font-[Poppins]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments?.length || 0})</h2>
        </div>

        {/* Comment Section */}
        {comments?.map((comment, index) => (
          <article
            key={index}
            className={`p-6 mb-3 text-base bg-white rounded-lg dark:bg-gray-900 ${index === comments.length - 1 ? '' : 'border-t border-gray-200 dark:border-gray-700'}`}
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={comment.profilePicture}
                    alt={comment.name}
                  />
                 <span className='truncate'>{comment.name}</span> 
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time pubdate dateTime={comment.dateTime} title={comment.dateTimeTitle}>
                    {comment.date}
                  </time>
                </p>
              </div>
              <button
                onClick={() => handleDropdownToggle(`dropdownComment${index}`)}
                aria-expanded={activeDropdown === `dropdownComment${index}`}
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>
              {activeDropdown === `dropdownComment${index}` && (
                <div className="absolute z-10 w-36 right-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      {userid == comment.userId ?
                      
                      <button
                        onClick={() => handleCommentDelete(index)}
                        className="block py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                         Remove
                        </button>
                        :null
                    }
                    </li>
                    {userid != comment.userId ?
                    
                    <li>
                      <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                      :null
                  }
                  </ul>
                </div>
              )}
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
            <div className="flex items-center mt-4 space-x-4">
              <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                </svg>
                { userid==comment.userId && postingStatus==true?"posting":null}
              </button>
            </div>
          </article>
        ))}

        <form onSubmit={handleCommentSubmit} className="mb-6 mt-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <input
              id="comment"
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            />
          </div>
          <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}}
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Comment;
