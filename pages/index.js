import { useState } from 'react';
import Link from 'next/link';

const Index = () => {
  const [form, setForm] = useState({ email: '', password: ''});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('logged in');
  };


  return (
    <div className="container text-center flex flex-col h-screen content-center items-center align-end relative border-box bg-gradient-to-r from-green-400 to-blue-500">
      <div className="absolute sm:relative bottom-0 flex flex-col justify-self-center">
        <img src='logo.svg' alt="Cake Manager" className="mb-20 sm:mb-10"/>
        <div className="w-screen bg-gray-50 pb-5 sm:max-w-sm sm:rounded-md ">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 pb-5 px-5">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              className="p-3 mt-10 rounded-md border-2 border-gray-300"
            />
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              className="p-3 rounded-md border-2 border-gray-300"
            />
            <button type="submit" className="bg-blue-400 p-3 rounded-md text-white">Login</button>
          </form>
          <Link href='/'>
            <a className="text-red-400 underline">Forgot your password?</a>
          </Link>
        </div>
      </div>
      
    </div>
  )
}

export default Index
