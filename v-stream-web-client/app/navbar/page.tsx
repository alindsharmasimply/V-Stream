import Image from 'next/image';

import styles from './navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div>
      <nav className={styles.nav}>
        <Link href='/'>
          <Image src='/v_stream_logo.svg' alt='logo' width={90} height={60} />
        </Link>
      </nav>
    </div>
  );
}
