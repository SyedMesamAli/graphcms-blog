import React from 'react'
import { Loader } from '../../components'
import { getPosts, getPostDetails } from '../../services'

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from '../../components'
import { PostType } from '../../constants/constantTypeAndInterface'
import { useRouter } from 'next/router'

interface PostDetailsType extends PostType {
    content: {
        raw: {
            children: []
        }
    }
}

export interface PropType {
    post: PostDetailsType
}

const PostDetails = ({ post }: PropType) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }
    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className='col-span-1 lg:col-span-8'>
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </div>
                <div className='col-span-1 lg:col-span-4'>
                    <div className='relative lg:sticky top-8'>
                        <PostWidget categories={post.categories.map((category: { slug: string }) => category.slug)} slug={post.slug} />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetails

interface Params {
    params: {
        slug: string;
    }
}

export async function getStaticProps({ params }: Params) {
    const data = await getPostDetails(params.slug)

    return {
        props: { post: data }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts();

    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true
    }
}