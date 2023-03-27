import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services'


type PropType = {
    slug: string
}

const CommentsForm = ({ slug }: PropType) => {
    const [error, setError] = useState(false)
    const [localStorage, setLocalStorage] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const commentEl: React.MutableRefObject<any> = useRef();
    const nameEl: React.MutableRefObject<any> = useRef();
    const emailEl: React.MutableRefObject<any> = useRef();
    const storeDataEl: React.MutableRefObject<any> = useRef();


    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name')
        emailEl.current.value = window.localStorage.getItem('email')
    }, [])

    const handleCommentSubmit = () => {
        setError(false);

        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { checked: storeData } = storeDataEl.current;


        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = {
            name, email, comment, slug
        }

        if (storeData) {
            window.localStorage.setItem('name', name)
            window.localStorage.setItem('email', email)
        } else {
            window.localStorage.removeItem(name)
            window.localStorage.removeItem(email)
        }

        submitComment(commentObj)
            .then(res => {
                setShowSuccessMessage(true)
                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 3000)
            })
    }

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Leave a Reply
            </h3>
            <div className='grid grid-cols-1 gap-4 mb-4 '>
                <textarea ref={commentEl}
                    className='p-4 outline-none w-full rounded-lg focus:right-2 focus:ring-gray-200 bg-gray-100 text-gray-700 '
                    placeholder='Comment'
                    name='comment' />

            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 '>
                <input ref={nameEl} type='text'
                    className='py-2 px-4 outline-none w-full rounded-lg focus:right-2 focus:ring-gray-200 bg-gray-100 text-gray-700 '
                    placeholder='Name'
                    name='name'
                />
                <input ref={emailEl} type='text'
                    className='py-2 px-4 outline-none w-full rounded-lg focus:right-2 focus:ring-gray-200 bg-gray-100 text-gray-700 '
                    placeholder='Email'
                    name='email'
                />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4 '>
                <div>
                    <input ref={storeDataEl} type='checkbox'
                        id='storeData'
                        name='storeData' value='true' />
                    <label
                        className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save my email and name for the next time I comment.</label>
                </div>
            </div>
            {error && <p className='text-xs text-red-500'>All fields are required.</p>}
            <div className='mt-8'>
                <button type='button' onClick={handleCommentSubmit}
                    className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'>
                    Post Comment
                </button>
                {showSuccessMessage &&
                    <span className='text-xl float-right font-semibold mt-3 text-green-500 '>
                        Comment submitted for review.
                    </span>}
            </div>
        </div>
    )
}

export default CommentsForm