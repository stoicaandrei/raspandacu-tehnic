import { doc, setDoc } from 'firebase/firestore';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { uploadFile } from 'lib/services/files.services';
import { Magazine } from 'types';

const MagazineEditPage: NextPage = () => {
  const router = useRouter();
  const { slug: _slug } = router.query;
  const slug = typeof _slug === 'string' ? _slug : '';

  const firestore = useFirestore();
  const ref = doc(firestore, 'magazines', slug);

  const updateMagazine = async (magazine: Magazine) => {
    setDoc(ref, magazine);
  };

  const { status, data: _magazine } = useFirestoreDocData(ref);
  const [magazine, setMagazine] = useState<Magazine>();
  useEffect(() => {
    if (!_magazine) return;
    setMagazine(_magazine as Magazine);
  }, [_magazine]);

  return (
    <div className="p-5">
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && <div>Error!</div>}
      {magazine && (
        <div className="flex flex-col gap-3">
          <input
            value={magazine.title}
            onChange={(e) =>
              setMagazine({ ...magazine, title: e.target.value })
            }
            className="w-96 border border-gray-500"
          />
          <div className="flex w-96 flex-col">
            Background
            <input
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const url = await uploadFile(file, file.name, slug);
                updateMagazine({ ...magazine, backgroundUrl: url });
              }}
            />
            {magazine.backgroundUrl && (
              <Image
                src={magazine.backgroundUrl}
                alt="background img"
                width="100px"
                height="100px"
              />
            )}
          </div>
          <div className="flex w-96 flex-col">
            Thumbnail
            <input
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const url = await uploadFile(file, file.name, slug);
                updateMagazine({ ...magazine, thumbnailUrl: url });
              }}
            />
            {magazine.thumbnailUrl && (
              <Image
                src={magazine.thumbnailUrl}
                alt="background img"
                width="100px"
                height="100px"
              />
            )}
          </div>
          <div className="flex w-96 flex-col">
            Left Arrow
            <input
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const url = await uploadFile(file, file.name, slug);
                updateMagazine({ ...magazine, leftArrowUrl: url });
              }}
            />
            {magazine.leftArrowUrl && (
              <Image
                src={magazine.leftArrowUrl}
                alt="background img"
                width="100px"
                height="100px"
              />
            )}
          </div>
          <div className="flex w-96 flex-col">
            Right Arrow
            <input
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const url = await uploadFile(file, file.name, slug);
                updateMagazine({ ...magazine, rightArrowUrl: url });
              }}
            />
            {magazine.rightArrowUrl && (
              <Image
                src={magazine.rightArrowUrl}
                alt="background img"
                width="100px"
                height="100px"
              />
            )}
          </div>
          <div className="flex w-96 flex-col">
            Pages
            <input
              type="file"
              multiple
              onChange={async (e) => {
                const files = e.target.files;
                if (!files || !files.length) return;

                const urls = magazine.pageUrls;

                for (const file of Array.from(files)) {
                  const url = await uploadFile(file, file.name, slug);
                  urls.push(url);
                }

                updateMagazine({ ...magazine, pageUrls: urls });
              }}
            />
            {magazine.pageUrls.map((image) => (
              <Image
                key={image}
                src={image}
                alt="background img"
                width="100px"
                height="100px"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MagazineEditPage;
