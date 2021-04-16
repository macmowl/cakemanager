import { useState, useEffect } from 'react';
import Link from 'next/link';
import Moment from 'react-moment';
import Modal from '../../../components/Modal';
import { useRouter } from 'next/router';

const Cake = ({ cake }) => {
    const router = useRouter();
    const [form, setForm] = useState(cake);
    const [showModal, setShowModal] = useState(false);
    console.log(cake)

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

    const deleteCake = async () => {
        try {
            const res = await fetch(`/api/cakes/${cake._id}`, {
                method: 'DELETE'
            })
            router.push('/cakes');
        } catch (error) {
            
        }
    }

        return (
            <>
            <div className="absolute bg-gradient-to-r from-green-400 to-blue-500 header-cake"></div>
            <Modal
                onClose={() => setShowModal(false)}
                show={showModal}
                >
                    <div className="text-center mt-4">
                        <p className="text-lg">Delete this cake?</p>
                        <button onClick={deleteCake} className="rounded-md bg-red-500 text-white h-10 mt-5 flex-shrink-0 w-52">Delete</button>
                    </div>
                
            </Modal>
            <div className="flex flex-col justify-center">
                
                <div className="container px-5 py-8 flex flex-col self-center sm:max-w-sm">
                    <div className="flex justify-between pb-8">
                        <Link href="/cakes">
                            <a className="block p-2 rounded-full border-white border-opacity-20 border-2">
                                <img src="/icon_back.svg" alt="Back to cakes list" />
                            </a>
                        </Link>
                        <div className="flex">
                            <button onClick={() => setShowModal(true)} className="block p-2 rounded-full border-white border-opacity-20 border-2"><img src="/icon_delete.svg" alt="Delete this cake" /></button>
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
                            <p className="font-semibold">{cake.client.name}</p>
                        </div> 
                        {cake.client.phone
                            ? <div className="flex">
                                    <img src="/icon_client_phone.svg" alt="Phone's client" className="mr-2"/>
                                    <p>{cake.client.phone}</p>
                                </div>
                            : null
                        }
                        
                        <div className="flex items-start">
                            <img src="/icon_client_location.svg" alt="Adress's client" className="mr-2"/>
                            <div>
                            {cake.client.zipCode
                                ? <p>{cake.client.adress}</p>
                                : null
                            }
                            {cake.client.zipCode
                                ? <p>{cake.client.zipCode} - {cake.client.city}</p>
                                : null
                            }
                            </div>
                        </div>
                        <form>
                            <h2>State</h2>
                            <select
                                className="w-full h-10 bg-white border rounded-md px-2 border-gray-400"
                                onChange={handleChange}
                                value={form.state}
                            >
                                <option value="Not started">Not started</option>
                                <option value="Mold">Mold</option>
                                <option value="Done">Done</option>
                                <option value="Gone">Gone</option>
                            </select>
                        </form>
                        <p className="text-sm text-gray-400 font-light text-center mt-4">Created on <Moment format="D MMMM YY">{cake.createdAt}</Moment> by {cake.creator.username}</p>
                    </div>
                </div>
                
            </div>
            </>
        )
}

export const getServerSideProps = async (ctx) => {
    const resCake = await fetch(`${NEXT_PUBLIC_URL}/api/cakes/${ctx.query.cakeId}`);
    // const resCake = await fetch(`https://gelatoapp.vercel.app/api/cakes/${ctx.query.cakeId}`);
    NEXT_PUBLIC_URL
    const { data } = await resCake.json();
    console.log(data)
    return {
        props: {
            cake: data,
        }
    }
}

export default Cake
