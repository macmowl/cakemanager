import Cake from '../components/Cake-item';

const cakes = ({ cakes }) => {
    let nbrPersons = 0;
    for (let i = 0; i < cakes.length; i++) {
        nbrPersons += cakes[i].nbrPersons;
    }

    return (
        <>
        <div className="absolute bg-gradient-to-r from-green-400 to-blue-500 header-cakes"></div>
        <div className="container px-5 py-8 flex flex-col justify-self-center">
            
            <div className="flex justify-between sm:max-w-sm text-white">
                <div>
                    <h1>Hello, Elrond</h1>
                    <p className="text-sm font-light">What will you do today?</p>
                </div>
                <img src="avatar.png" alt="avatar" className="rounded-full border-2 border-white"/>
            </div>
            <div className="flex justify-around my-8 py-8 rounded-md shadow-lg bg-white">
                <div className="text-center">
                    <img src="icon_cake.svg" alt="Number of cakes" />
                    <p className="text-gray-400 my-1">cakes</p>
                    <p className="text-blue-400 font-semibold text-lg">{cakes.length}</p>
                </div>
                <div className="text-center">
                    <img src="icon_persons.svg" alt="Total number of persons" />
                    <p className="text-gray-400 my-1">persons</p>
                    <p className="text-blue-400 font-semibold text-lg">{nbrPersons}</p>
                </div>
            </div>
            <Cake cakes={cakes}/>
        </div>
    </>
    )
}

export const getServerSideProps = async () => {
    const res = await fetch(`${process.env.URI}/api/cakes`);
    const { data } = await res.json();
    
    return {
      props: {
        cakes: data
      }
    }
  }

export default cakes
