import { getCsrfToken } from 'next-auth/client';

const SignIn = ({ csrfToken }) => {
  return (
    <div className="container text-center flex flex-col h-screen justify-center items-center align-end relative border-box bg-gradient-to-r from-green-400 to-blue-500">
      <div className="absolute sm:relative sm:flex sm:flex-col sm:justify-center bottom-0 flex flex-col justify-self-center">
        <p className="logo">Gelato</p>
        <div className="w-screen bg-gray-50 py-5 mt-10 sm:max-w-sm sm:rounded-md ">
          <form method="post" action={`${NEXT_PUBLIC_URI}/api/auth/callback/credentials`} className="flex flex-col space-y-4 pb-5 px-5">
            <input 
              name="csrfToken"
              type="hidden"
              defaultValue={csrfToken}
            />
            <input
              type="text"
              placeholder="Enter your username"
              id="username"
              name="username"
              className="p-3 mt-10 rounded-md border-2 border-gray-300"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              className="p-3 rounded-md border-2 border-gray-300"
              required
            />
            <button type="submit" className="bg-blue-400 p-3 rounded-md text-white">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default SignIn
