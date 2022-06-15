import { FaGithub } from 'react-icons/fa'
import { FiX} from 'react-icons/fi'
import styles from './styles.module.scss'
import { signIn, signOut, useSession } from 'next-auth/react'

export function SignInButton(){

    const { data: session, status }= useSession();

    console.log(session)

    return session ? (
        <button onClick={() => signOut()} className={styles.signInButton} type="button">
            <FaGithub color='#04d361'/> 
            {session.user.name}
            <FiX className={styles.closeIcon} color='#737380'/>
        </button>
    ) : (
        <button onClick={() => signIn('github')} className={styles.signInButton} type="button">
            <FaGithub color='#eba417'/> 
            Sign in with Github
        </button>
    )

}