import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {

  const router = useRouter();
  const { message } = router.query;

  return (
    <section title="Unauthorized Page">
      <div className='container'>
        <h1 className="text-xl">Access Denied</h1>
        {message && <div className="mb-4 text-red">{message}</div>}
      </div>
    </section>
  );
}