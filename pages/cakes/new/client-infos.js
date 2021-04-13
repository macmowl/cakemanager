import Router from 'next/router';
import { useState } from 'react';
import NewHeader from '../../../components/new-header';
import { useSession, getSession } from "next-auth/client";
import Loading from '../../../components/Loading';

const ClientInfos = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        adress: '',
        zipCode: '',
        city: '',
        phone: ''
    });
    const [isHidden, setIsHidden] = useState(true);
    const [isNew, setIsNew] = useState(null);
    const [session, loading] = useSession();

    const handleChange = (e) =>  {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isHidden) {
            checkClient(form.email);
        } else {
            if(!isNew) {
                saveClient();
            } else {
                updateClient();
            }
        }
    }

    const saveClient = async () => {
        try {
            const res = await fetch(`/api/clients`, {
                method: 'POST',
                headers: {
                    'Accept': "application.json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            Router.push({
                pathname: '/cakes/new/cake-infos',
                query: { email: form.email }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateClient = async () => {
        try {
            const res = await fetch(`/api/clients/${form._id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            Router.push({
                pathname: '/cakes/new/cake-infos',
                query: { email: form.email }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const checkClient = async (email) => {
        try {
            const res = await fetch(`/api/query`, {
                method: 'POST',
                headers: {
                    'Accept': "application.json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(email)
            });
            const { success, data } = await res.json()
            setIsNew(success);
            setIsHidden(false);
            setForm(data[0]);
            
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return <Loading />

    return (
        <div className="flex flex-col justify-center">
            <NewHeader title={'Client Infos'}/>
            <form onSubmit={handleSubmit} className="container px-5 py-8 flex flex-col self-center sm:max-w-sm">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        className="border-gray-400 border"
                    />
                    
                    <div className={isHidden ? 'hidden' : 'block'}>
                        { isNew
                            ? <p className="text-xs">Client already exists. You can edit the followings if needed.</p>
                            : <p className="text-xs">Client does not exist. Fill the form to create this client</p>
                        }
                        <input
                            type="text"
                            placeholder="Firstname and lastname"
                            name="name"
                            onChange={handleChange}
                            value={form.name}
                            className="border-gray-400 border"
                            required={!isHidden}
                            autoFocus={!isHidden}
                        />
                        <input
                            type="text"
                            placeholder="Adress"
                            name="adress"
                            onChange={handleChange}
                            value={form.adress}
                            className="border-gray-400 border"
                        />
                        <div className="flex flex-row space-x-4">
                            <input
                                type="number"
                                placeholder="ZIP code"
                                name="zipCode"
                                onChange={handleChange}
                                value={form.zipCode}
                                className="border-gray-400 border"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                name="city"
                                onChange={handleChange}
                                value={form.city}
                                className="border-gray-400 border"
                            />
                        </div>
                        <input
                            type="number"
                            placeholder="Phone number"
                            name="phone"
                            onChange={handleChange}
                            value={form.phone}
                            className="border-gray-400 border"
                        />
                    </div>
                    <button className="rounded-md w-full bg-blue-400 text-white h-10 mt-5">{isHidden ? 'Check if email exists' : 'Save & continue'}</button>
            </form>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    if(!session) {
        ctx.res.writeHead(302, { Location: '/'});
        ctx.res.end()
        return {}
    }

    return {
        props: {}
    };
}

export default ClientInfos
