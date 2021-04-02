import React from 'react'
import Link from 'next/link';

const NewHeader = ({ title }) => {
    return (
        <div className="flex justify-between text-white px-8 py-7 bg-gradient-to-r from-green-400 to-blue-500">
            <h1>{title}</h1>
            <Link href='/cakes'>
            <a className="block p-2 rounded-full border-white border-opacity-20 border-2">
                        <img src="/icon_close.svg" alt="Back to cakes list" />
                    </a>
            </Link>
        </div>
    )
}

export default NewHeader
