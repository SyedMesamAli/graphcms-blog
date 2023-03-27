import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react';
import { PostCard, PostWidget, Categories } from '../components';
import { PostType } from '../constants/constantTypeAndInterface';
import { getPosts } from '../services';
import { FeaturedPosts } from '../sections'
interface IProp {
  posts?: []
}

const Home: NextPage = ({ posts }: IProp) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts?.map((post: { node: PostType }) => (
            <PostCard post={post.node} />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget categories={[]} slug={''} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;

export async function getStaticProps() {
  const posts = await getPosts() || [];

  return {
    props: { posts }
  }
}