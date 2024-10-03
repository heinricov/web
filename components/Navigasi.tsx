
"use client";

// import React, { useState } from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSession, signOut } from 'next-auth/react'
// import Link from 'next/link'
import { LoginButton, RegisterButton } from './Modal';
import { Search } from "./input";



const Navigation: React.FC = () => {
    const { data: session } = useSession()
    // const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <Navbar rounded className="fixed w-full z-20 top-0 start-0">
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BaggScript</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {session ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{session.user.name}</span>
                            <span className="block truncate text-sm font-medium">{session.user.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        {session && (
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                        )}
                        {session?.user.role === 'admin' && (
                            <Dropdown.Item>User</Dropdown.Item>
                        )}
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <>

                        <div className='flex gap-2'>
                            <Search />
                            <LoginButton />
                            <RegisterButton />
                        </div>

                    </>
                )}

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/">Home</Navbar.Link>
                <Navbar.Link href="/docs">Docs</Navbar.Link>
                <Navbar.Link href="/components">Components</Navbar.Link>
                <Navbar.Link href="/license">License</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Navigation






