import styles from './Posts.module.scss'
import Link from 'next/link'
import Prismic from '@prismicio/client'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'

type Post = {
    uid: string;
    title: string;
    date: string;
    author: string;
}

interface PostProps{
  posts: Post[]
}

export default function Posts({posts}: PostProps){
  return(
    <div className={styles.container}>
      <div className={styles.post}>
      {posts.map((post)=>(
        <div key={post.uid} className={styles.postSection}>
          
        <Link passHref href={`/posts/${post.uid}`}>
          <a key='post'>
            <strong>{post.title}</strong>
            <div >
              <span>{post.author}</span>
              <span>{new Date(post.date).toLocaleDateString('pt-BR', {
                day:'2-digit',
                month:'long',
                year:'numeric'
              })}</span>
            </div>
        </a>
        </Link>
        </div>
      ))}
      
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async()=>{

  const prismic = getPrismicClient()
  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'publications')],
    {
      fetch:[ 'publications.title', 'publications.author', 'publications.content'],
      pageSize: 1000
    }
 )

 const posts = response.results.map((post)=>{
    return {
      uid: post.uid,
      title: post.data.title[0].text,
      date: post.first_publication_date,
      author: post.data.author[0].text,
    }
 })
 
 return {
  props: {posts}
}
}

