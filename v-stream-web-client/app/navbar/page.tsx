'use client';

import Image from 'next/image';

import styles from './navbar.module.css';
import Link from 'next/link';
import SignIn from './sign-in';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChangedHelper } from '../firebase/firebase';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  });
  return (
    <div>
      <nav className={styles.nav}>
        <Link href='/'>
          <Image src='/v_stream_logo.svg' alt='logo' width={90} height={60} />
        </Link>
        <SignIn user={user} />
      </nav>
    </div>
  );
}
