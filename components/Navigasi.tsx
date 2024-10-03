
"use client";

// import React, { useState } from 'react'
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { useSession, signOut } from 'next-auth/react'
// import Link from 'next/link'
import { LoginButton, RegisterButton } from './Modal';


const Navigation: React.FC = () => {
    const { data: session } = useSession()
    // const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <Navbar rounded>
            <Navbar.Brand href="https://flowbite-react.com">
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
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <>

                        <div className='flex gap-2'>
                            <LoginButton />
                            <RegisterButton />
                        </div>

                    </>
                )}

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/">Home</Navbar.Link>
                <Navbar.Link href="/about">About</Navbar.Link>
                <Navbar.Link href="/services">Services</Navbar.Link>
                {session && (
                    <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
                )}
                {session?.user.role === 'admin' && (
                    <Navbar.Link href="/user">User</Navbar.Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Navigation

