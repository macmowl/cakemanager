import { signIn } from 'next-auth/client';
import PropTypes from 'prop-types';

const Signin = ({message}) => {
    return (
        <div className="h-screen flex flex-col justify-between px-4 bg-gradient-to-r text-center from-green-400 to-blue-500 py-20">
            <p className="logo">Gelato</p>
            <div className="self-center">
                <h2 className="center text-white mb-10">{message}</h2>
                <button onClick={signIn} className="center p-2 rounded-md bg-white w-full">Sign in</button>
            </div>
                
        </div>
    )
}

Signin.defaultProps = {
    message: 'You are not signed in'
}

Signin.propTypes = {
    message: PropTypes.string
}

export default Signin
