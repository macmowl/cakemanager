import { signIn } from 'next-auth/client';

const Signin = () => {
    return (
        <div className="bg-gradient-to-r h-full text-center from-green-400 to-blue-500 header-cakes pt-10">
                <h1 className="center text-white mb-3">You are not signed in</h1>
                <button onClick={signIn} className="center p-2 rounded-md bg-white">Sign in</button>
        </div>
    )
}

export default Signin
