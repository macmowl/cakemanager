import { useSession } from 'next-auth/client';
import Signin from '../components/Signin.js';
import {useRouter} from 'next/router';
import Loading from '../components/Loading.js';

const Index = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return <Loading />

  if (session) router.push('/cakes')
  if (!session) router.push('/auth/signin')

  return (
    <>
    </>
  )
}

export default Index