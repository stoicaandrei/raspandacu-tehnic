import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const uploadFile = async (
  file: File,
  fileName: string,
  slug: string
) => {
  const storage = getStorage();
  const fileRef = ref(storage, `${slug}/${fileName}`);
  await uploadBytes(fileRef, file);

  return getDownloadURL(fileRef);
};
