import { useState } from "react";
import { useSession, getSession } from "next-auth/client";
import Loading from '../../components/Loading';
import Link from 'next/link';

const SignUp = () => {
    const [form, setForm] = useState(null);
    const [session, loading] = useSession();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async () => {
        try {
            const res = await fetch(`/api/admins`, {
                method: 'POST',
                headers: {
                    'Accept': "application.json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const { success } = res.json();
            if (success) {
                router.push('/cakes');
            } else {
                console.log('error on signup new admin')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) return <Loading />

    return (
        <div className="container text-center flex flex-col h-screen justify-center items-center align-between relative border-box bg-gradient-to-r from-green-400 to-blue-500">
            <div className="flex w-screen justify-start items-start p-4 z-10">
                <Link href="/cakes">
                    <a className="block p-2 rounded-full border-white border-opacity-20 border-2">
                        <img src="/icon_back.svg" alt="Back to cakes list" />
                    </a>
                </Link>
            </div>
            <div className="absolute sm:relative sm:flex sm:flex-col sm:justify-center bottom-0 flex flex-col justify-self-center">
                <p className="logo">Gelato</p>
                <p className="text-white">Sign up</p>
                <div className="w-screen bg-gray-50 py-5 mt-10 sm:max-w-sm sm:rounded-md ">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 pb-5 px-5">
                        <input
                            type="text"
                            placeholder="Enter a username"
                            id="username"
                            name="username"
                            className="p-3 mt-10 rounded-md border-2 border-gray-300"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Enter an email"
                            id="email"
                            name="email"
                            className="p-3 mt-10 rounded-md border-2 border-gray-300"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter a password"
                            id="password"
                            name="password"
                            className="p-3 rounded-md border-2 border-gray-300"
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="bg-blue-400 p-3 rounded-md text-white">Create a new admin</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    if (!session) {
        ctx.res.writeHead(302, { Location: '/'});
        ctx.res.end()
        return {}
    }

    return {
        props: {}
    }
}

export default SignUp
