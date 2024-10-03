
"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

export function LoginButton() {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (result?.error) {
            setError(result.error)
        } else {
            router.push('/')
        }
    }

    function onCloseModal() {
        setOpenModal(false);
        setEmail('');
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Login</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div>
                                <TextInput
                                    id="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Your password" />
                                </div>
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="showPassword" onChange={() => setShowPassword(!showPassword)} />
                                <Label htmlFor="showPassword">Show Password</Label>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember">Remember me</Label>
                                </div>
                                <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                                    Lost Password?
                                </a>
                            </div>
                            <div className="w-full">
                                <Button type="submit">Log in</Button>
                            </div>
                            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered?&nbsp;
                                <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                                    Create account
                                </a>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export function RegisterButton() {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (name.length < 3) {
            setError('Name must be at least 3 characters long');
            return;
        }

        if (!email.endsWith('@gmail.com')) {
            setError('Email must end with @gmail.com');
            return;
        }

        if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            setError('Password must be at least 8 characters long and contain lowercase, uppercase, and numbers');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                setOpenModal(false);
                LoginButton();
            } else {
                const data = await res.json();
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    function onCloseModal() {
        setOpenModal(false);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Register</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Register to our platform</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Your name" />
                                </div>
                                <TextInput
                                    id="name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div>
                                <TextInput
                                    id="email"
                                    placeholder="name@gmail.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Your password" />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="confirmPassword" value="Confirm password" />
                                </div>
                                <TextInput
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <div className="w-full">
                                <Button type="submit">Register</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

