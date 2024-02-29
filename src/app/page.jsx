"use client"

import Link from "next/link";
import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (!session) {
        setIsRedirecting(true);
      }
    }, 1000); 

    return () => clearTimeout(timeoutId);
  }, [session]);

  if (isRedirecting) {
    redirect("/login");
    return null;
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <div className={styles.container}>
      {session ? User({ session, handleSignOut }) : Guest()}
    </div>
  )
}

// Guest

function Guest() {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>
        Guest Homepage
      </h3>

      <div className="flex justify-center">
        <Link className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray" href={'/login'}>Sign In</Link>
      </div>
    </main>
  )
}

// Authorize User

function User({ session, handleSignOut }) {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>
        Authorize User Homepage
      </h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50"> Sign Out</button>
      </div>

      <div className="flex justify-center">
        <Link className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50" href={'/profile'}>Profile Page</Link>
      </div>
    </main>
  )
}