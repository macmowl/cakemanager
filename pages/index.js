import Cake from '../components/Cake-item';
import CakeInfos from '../components/Cake-infos';
import { useRouter } from 'next/router';


const cakes = ({ cakes }) => {
    const router = useRouter();

    const cakesCount = (cakesList) => {
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

        return (
            <>
            <div className="absolute bg-gradient-to-r from-green-400 to-blue-500 header-cakes"></div>
            <button onClick={handleAdd} className="absolute bottom-4 right-4 font-semibold bg-blue-400 text-white addCake">
                <img src="/icon_add.svg" alt="add cake" />
            </button>
            <div className="container px-5 py-8 flex flex-col justify-self-center">
                
                <div className="flex justify-between text-white">
                    <div>
                        <h1>Hello, Elrond</h1>
                        <p className="text-sm font-light">What will you do today?</p>
                    </div>
                    <img src="avatar.png" alt="avatar" className="rounded-full border-2 border-white"/>
                </div>
                <div className="md:flex md:flex-row md:justify-between">
                    <CakeInfos cakeNumber={cakes.length} nbrPersons={cakesCount(cakes)} />
                    <div className="md:mt-4 md:flex-grow md:bg-gray-100">
                        <Cake cakes={cakes}/>
                    </div>
                    
                </div>
                
            </div>
        </>
        )
}

export const getServerSideProps = async (ctx) => {
    const res = await fetch(`${process.env.URI}/api/cakes`);
    const { data } = await res.json();
    
    return {
      props: {
        cakes: data
      }
    }
  }

export default cakes
