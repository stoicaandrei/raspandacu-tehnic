import { collection, orderBy, query } from 'firebase/firestore';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { createMagazine } from 'lib/services';
import { Magazine } from 'types';

const AdminDashboardPage: NextPage = () => {
  const firestore = useFirestore();
  const magazinesCollection = collection(firestore, 'magazines');
  const magazinesQuery = query(magazinesCollection, orderBy('id', 'asc'));

  const { status, data: magazines } = useFirestoreCollectionData(
    magazinesQuery,
    {
      idField: 'id',
    }
  );

  const [slug, setSlug] = useState('');

  return (
    <div className="flex flex-col gap-5 p-5">
      <a
        href="/"
        target="_blank"
        className="w-96 rounded bg-blue-600 p-3 text-white shadow-lg"
      >
        Preview Website
      </a>

      <div className="w-1/2">
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <button onClick={() => createMagazine(slug)}>Create new</button>
        <div className="flex flex-col gap-3">
          {status === 'loading' && <div>Loading...</div>}
          {status === 'error' && <div>Error!</div>}
          {magazines?.map((magazine) => (
            <Link key={magazine.id} href={`/admin/${magazine.id}`}>
              <a>{magazine.title}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
