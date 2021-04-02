import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Moment from 'react-moment';
import { getSession, useSession } from 'next-auth/client';

const Cake = ({ cake, client }) => {
    const [ session, loading ] = useSession();
    const router = useRouter();
    const [form, setForm] = useState(cake);

    useEffect(() => {
        updateCake();
    }, [form])

    const handleChange = (e) => {
        setForm({
            ...form,
            state: e.target.value
        });
    }

    const updateCake = async () => {
        try {
            const res = await fetch(`/api/cakes/${form._id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
        } catch (error) {
            console.log(error);
        }
    }
    if (!session) {
        return (
            <h1>You are not signed in</h1>
        )
    } else {
        return (
            <>
                <div className="absolute bg-gradient-to-r from-green-400 to-blue-500 header-cake"></div>
                <div className="container px-5 py-8 flex flex-col justify-self-center">
                    <div className="flex justify-between pb-8">
                        <Link href="/cakes">
                            <a className="block p-2 rounded-full border-white border-opacity-20 border-2">
                                <img src="/icon_back.svg" alt="Back to cakes list" />
                            </a>
                        </Link>
                        <div className="flex">
                        <Link href={`/cakes/delete`}>
                            <a className="block p-2 rounded-full border-white border-opacity-20 border-2"><img src="/icon_delete.svg" alt="Delete this cake" /></a>
                        </Link>
                        <Link href={`/cakes/${cake._id}/edit`}>
                            <a className="block p-2 rounded-full border-white border-opacity-20 border-2 ml-4"><img src="/icon_edit.svg" alt="Edit this cake" /></a>
                        </Link>
                        </div>
                    </div>
                    <h1 className="text-white text-3xl mb-2">{cake.tastes.join(', ')}</h1>
                    <p className="text-blue-900 font-semibold">{cake.nbrPersons} persons <span className="text-white text-opacity-30">|</span> {cake.shape}</p>
                    {cake.vegan
                        ? <div className="vegan rounded-full bg-white shadow-md mt-7">
                                <img src="/icon_vegan.svg" alt="Vegan cake"/>
                            </div>
                        : null
                    }
                    {cake.decoration
                        ? <div className={`${cake.vegan ? 'mt-5' : 'mt-20'} mb-5`}>
                                <h2>Decoration</h2>
                                <p>{cake.decoration.join(', ')}</p>
                            </div>
                        : null
                    } 
                    {cake.specificities
                        ? <div className="mb-5">
                                <h2>Specific needs</h2>
                                <p>{cake.specificities}</p>
                            </div>
                        : null
                    }
                    <div className="mb-5">
                        <h2>Delivery date</h2>
                        <p><Moment format="D MMMM YY HH:mm">{cake.deliveryDate}</Moment></p>
                        {cake.isForDelivery
                            ?  <div className="flex">
                                    <img src="/delivery-truck.svg" alt="For delivery" className="mr-2"/>
                                    <p className="text-red-500 text-sm font-light">The client wants to be delivered</p>
                                </div>
                            : null
                        }
                    </div>
                    <div className="mb-5">
                        <h2>Client</h2>
                        <div className="flex">
                        <img src="/icon_client_user.svg" alt="Phone's client" className="mr-2"/>
                            <p className="font-semibold">{client.name}</p>
                        </div> 
                        <div className="flex">
                            <img src="/icon_client_phone.svg" alt="Phone's client" className="mr-2"/>
                            <p>{client.phone}</p>
                        </div>
                        <div className="flex items-start">
                            <img src="/icon_client_location.svg" alt="Adress's client" className="mr-2"/>
                            <div>
                                <p>{client.adress}</p>
                                <p>{client.zipCode} - {client.city}</p>
                            </div>
                        </div>
                        <form>
                            <h2>State</h2>
                            <select
                                className="w-full h-10 bg-white border border-gray-400"
                                onChange={handleChange}
                                value={form.state}
                            >
                                <option alue="Not started">Not started</option>
                                <option value="Mold">Mold</option>
                                <option value="Done">Done</option>
                                <option value="Gone">Gone</option>
                            </select>
                        </form>
                        <p className="text-sm text-gray-400 font-light text-center mt-4">Created on <Moment format="D MMMM YY">{cake.createdAt}</Moment> by Alan</p>
                    </div>
                </div>
                
            </>
        )
    }
}

export const getServerSideProps = async (ctx) => {
    const session = getSession(ctx);

    if (!session) {
        return {
            props: {},
        }
    }
    const resCake = await fetch(`${process.env.URI}/api/cakes/${ctx.query.cakeId}`);
    const { data } = await resCake.json();
    
    const resClient = await fetch(`${process.env.URI}/api/clients/${data.client.id}`);
    const client = await resClient.json();

    return {
        props: {
            cake: data,
            client: client.data,
        }
    }
}

export default Cake
