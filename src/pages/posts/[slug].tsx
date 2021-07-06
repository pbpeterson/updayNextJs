import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { getPrismicClient } from "../../services/prismic"
import {RichText} from 'prismic-dom'
import styles from './Post.module.scss'
import { useRouter } from "next/dist/client/router"

type Post = {
  date: string;
  title: string;
  contentText: string
}

interface PostDataProps{
  postData : Post
}

export default function Post({postData}: PostDataProps){
  const router = useRouter()

  return(
    <main className={styles.main}>
      <h1>{postData.title}</h1>
      <span>{new Date(postData.date).toLocaleDateString('pt-BR',{
        day:'2-digit',
        month:'long',
        year:'numeric'
      })}</span>
      <div dangerouslySetInnerHTML={{__html: postData.contentText}}/>
      <button onClick={()=>router.push('/posts')}>Voltar </button>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async({ req, params }) =>{

  const session = await getSession({req})
  const { slug } = params;


  if(!session){
    return{
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('publications', slug, {})

  const postData = {
    date: response.last_publication_date,
    title: RichText.asText(response.data.title),
    contentText: RichText.asHtml(response.data.content)
  }


  return{
    props:{
      postData
    }
  }

}