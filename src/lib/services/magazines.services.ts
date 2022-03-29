import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Magazine } from 'types';

export const createMagazine = async (slug: string) => {
  const firestore = getFirestore();
  const magazineRef = doc(firestore, 'magazines', slug);
  const magazineData: Magazine = {
    backgroundUrl: '',
    pageUrls: [],
    thumbnailUrl: '',
    leftArrowUrl: '',
    rightArrowUrl: '',
    title: slug,
    id: slug,
  };
  await setDoc(magazineRef, magazineData);
};
