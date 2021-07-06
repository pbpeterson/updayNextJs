import styles from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { GoMarkGithub, GoX } from 'react-icons/go'
import { useSession, signIn, signOut } from 'next-auth/client'

export function Header(){
  const [session] = useSession()

  return(
    <header className={styles.container}>
     <Link href='/'>
       <a>
        <Image src="/images/updayNext.svg" alt="logo" width="181" height="30"/>
        </a>
     </Link>
     {!session ? (<button  onClick={()=> signIn('github')} className={`${styles.loginButton} btn`}>
       <p>Sign in with Github</p> 
       <GoMarkGithub size='1.5rem'/>
     </button>) : (     <button onClick={() => signOut()}  className={styles.loginButton}>
      <GoMarkGithub className={styles.GitIcon} size='1.5rem'/>
       <p>{session.user?.name}</p> 
       <GoX size='1.5rem'/>
     </button>)}

    </header>
  )
}
