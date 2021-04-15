import Cake from '../../components/Cake-item';
import CakeInfos from '../../components/Cake-infos';
import { useRouter } from 'next/router';
import { useSession, signOut, getSession } from "next-auth/client";
import Loading from '../../components/Loading';


const Cakes = ({ user, cakes }) => {
    const router = useRouter();
    const [session, loading] = useSession();

    const cakesCount = () => {
        let nbrPersons = 0;
        for (let i = 0; i < cakes.length; i++) {
            nbrPersons += cakes[i].nbrPersons;
        }
        return nbrPersons
    }

    const handleAdd = (e) => {
        e.preventDefault();
        router.push('/cakes/new/client-infos');
    }

    if (loading) return <Loading />

    return (
        <div className="flex justify-center">
            <div className="absolute bg-gradient-to-r from-green-400 to-blue-500 header-cakes"></div>
            <button onClick={handleAdd} className="absolute bottom-4 right-4 font-semibold bg-blue-400 text-white addCake">
                <img src="/icon_add.svg" alt="add cake" />
            </button>
            <div className="container px-5 py-8 flex flex-col sm:max-w-sm">
                <div className="flex justify-between text-white">
                    <div>
                        <h1>Hello, {user.name}</h1>
                        <p className="text-sm font-light">What will you do today?</p>
                    </div>
                    <img src="avatar.png" onClick={signOut}alt="avatar" className="rounded-full border-2 border-white"/>
                </div>
                <div className="md:justify-between">
                    <CakeInfos cakeNumber={cakes.length} nbrPersons={cakesCount(cakes)} />
                    <div className="md:mt-4 md:flex-grow md:bg-gray-100">
                        <Cake cakes={cakes}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const session = await getSession(ctx);
    if(session) {
        // const res = await fetch(process.env.URI + '/api/cakes');
        // const { data } = await res.json();
        return {
            props: {
                // cakes: data,
                cakes: {},
                // user: session.user,
                user: {}
            }
        }
    } else {
        ctx.res.writeHead(302, { Location: '/'});
        ctx.res.end()
        return {}
    }
    
  }

export default Cakes
