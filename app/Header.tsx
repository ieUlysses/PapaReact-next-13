import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <header className=" p-5 bg-black">
            <p className="text-white">Header</p>

            <Link href="/" className='px-2 py-1 bg-white text-black rounded-lg'>
                Home
            </Link>

        </header>
    )
}

export default Header