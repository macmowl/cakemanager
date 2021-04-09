import NewHeader from '../../../components/new-header';
import RadioInput from '../../../components/RadioInput';
import CheckBoxInput from '../../../components/CheckBoxInput';
import DecoTag from '../../../components/DecoTag';
import { DECO_TAGS } from '../../../utils/constants';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from "next-auth/client";
import Loading from '../../../components/Loading';
import Link from 'next/link';

const CakeEdit = ({ cake }) => {
    const router = useRouter();
    const [ form, setForm ] = useState(cake);
    const [ nbrPers, setNbrPers ] = useState(0);
    const [ deco, setDeco ] = useState([]);
    const [ delivery, setDelivery ] = useState({});
    const [session, loading] = useSession();

    const handleChange = (e) =>  {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm({
            ...form,
            [e.target.name]: value
        });
    }
    const getToday = () => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        return today = yyyy + '-' + mm + '-' + dd;
    }

    useEffect(() => {
        const date = delivery.date ? delivery.date : getToday()
        const time = delivery.time ? delivery.time : '14:00'
        
        setForm({
            ...form,
            nbrPersons: nbrPers,
            decoration: deco,
            deliveryDate: `${date}T${time}:00.228+00:00`
        })
    }, [nbrPers, deco, delivery])

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCake();
    }

    const updateCake = async () => {
        try {
            const res = await fetch(`/api/cakes`, {
                method: 'PUT',
                headers: {
                    'Accept': "application.json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push('/cakes')
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) return <Loading />

    return (
        <div className="flex flex-col justify-center">
            <NewHeader title={'Edit cake'} closeLink={`/cakes/${cake._id}`}/>
            <form onSubmit={handleSubmit} className="container px-5 py-8 flex flex-col self-center sm:max-w-sm">
                <input 
                    type="text"
                    placeholder="Strawberry, Vanilla, Raspberry, ..."
                    className="border-gray-400 border"
                    name="tastes"
                    onChange={handleChange}
                    value={cake.tastes}
                />
                <div className="flex items-center w-full relative">
                    <div className="personContainer border-gray-400 border flex items-center relative">
                        <div onClick={() => setNbrPers(6)} className="flex bg-gray-100 items-center h-full cursor-pointer leading-normal rounded rounded-r-none border-r-2 px-5 whitespace-no-wrap text-grey-dark">6</div>
                        <div onClick={() => setNbrPers(8)} className="flex bg-gray-100 items-center h-full cursor-pointer leading-normal border-r-2 px-5 whitespace-no-wrap text-grey-dark">8</div>
                        <div onClick={() => setNbrPers(10)} className="flex bg-gray-100 items-center h-full cursor-pointer leading-normal border-r-2 px-5 whitespace-no-wrap text-grey-dark">10</div>
                        <input
                            type="number"
                            className="flex-shrink flex-grow flex-auto leading-normal w-px px-3 relative"
                            placeholder="other"
                            name="nbrPersons"
                            onChange={(e) => setNbrPers(+e.target.value)}
                        />
                    </div>
                    <p className="ml-3">persons</p>
                </div>	
                <div>
                    <h2>Shape</h2>
                    <div className="flex flex-row justify-between">
                        <div>
                            <RadioInput name="shape" id="circle" value="circle" onChange={handleChange} checked={form.shape === 'circle'} >Circle</RadioInput>
                            <RadioInput name="shape" id="square" value="square" onChange={handleChange} checked={form.shape === 'square'} >Square / Rectangle</RadioInput>
                            <RadioInput name="shape" id="halfSphere" value="halfSphere" onChange={handleChange} checked={form.shape === 'halfSphere'} >Half-sphere</RadioInput>
                        </div>
                        <CheckBoxInput name="vegan" onChange={handleChange} checked={form.vegan} >Vegan<img src="/icon_vegan.svg" alt="Vegan" /></CheckBoxInput>
                    </div>
                </div>
                <div>
                    <h2>Decorations</h2>
                    <div className="flex flex-wrap">
                        {DECO_TAGS.map((deco, index) => (
                            <DecoTag
                                key={index}
                                value={deco.ingredient}
                                id={deco.ingredient}
                                name="decoration"
                                checked={deco.ingredient === form.decoration[index]}
                                onChange={() => setDeco(oldDeco => [...oldDeco, deco.ingredient])}
                            >
                                {deco.ingredient}
                            </DecoTag>
                        ))}
                    </div>
                    
                </div>
                <div>
                    <h2>Specific needs</h2>
                    <textarea
                        className="py-1"
                        placeholder="A birthday word, a rainbow unicorn, ..."
                        name="specificities"
                        onChange={handleChange}
                        value={cake.specificities}
                    ></textarea>
                </div>
                <div className="flex flex-row space-x-4">
                        <input
                            type="date"
                            placeholder={getToday()}
                            name="deliveryDate"
                            className="border-gray-400 border"
                            onChange={(e) => setDelivery({...delivery, date: e.target.value})}
                        />
                        <input
                            type="time"
                            placeholder="14:00"
                            name="time"
                            className="border-gray-400 border"
                            onChange={(e) => setDelivery({...delivery, time: e.target.value})}
                        />
                    </div>
                    <CheckBoxInput name="isForDelivery" onChange={handleChange} checked={form.isForDelivery}>The client wants to be delivered</CheckBoxInput>
                    <div className="flex space-x-4">
                        <Link href={`/cakes/${cake._id}`}>
                            <a className="rounded-md bg-gray-300 text-gray-500 h-10 mt-5 flex-1 text-center pt-2">Cancel</a>
                        </Link>
                        <button className="rounded-md bg-blue-400 text-white h-10 mt-5 flex-shrink-0 w-52">Update this new cake</button>
                    </div>
                    
            </form>
            
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    if(session) {
        const res = await fetch(`${process.env.URI}/api/cakes/${ctx.query.cakeId}`);
        const { data } = await res.json();

        return {
            props: {
                cake: data,
            }
        }
    } else {
        ctx.res.writeHead(302, { Location: '/'});
        ctx.res.end()
        return {}
    }
}

export default CakeEdit
