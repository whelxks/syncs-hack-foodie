export const LOCAL_MACHINE_CONFIG = {
  BASE_URL: 'http://10.16.230.79:3008',
}

export const getPreSignedUrl = async ({bucket, key}: {bucket: string, key: string}) => {
  const response = await fetch(`${LOCAL_MACHINE_CONFIG.BASE_URL}/upload?bucket=${bucket}&key=${key}`);

  if (!response.ok) {
    throw new Error('Failed to fetch pre-signed URL');
  }

  const data = await response.json();
  return data.url;
};

export const uploadImage = async({presignedUrl, imageUri, contentType = 'image/jpeg'}: {presignedUrl: string; imageUri: string; contentType?: string}) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': contentType,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.status}`);
    }

  } catch (error) {
    console.error('Upload error', error);
    throw error;
  }

}

export const getItemModel = async ({bucket, key}: {bucket: string, key: string}) => {
  /* Hit local machine api with the items */
  const response = await fetch(`${LOCAL_MACHINE_CONFIG.BASE_URL}/items?bucket=${bucket}&key=${key}`);

  if (!response.ok) {
    throw new Error('Failed to fetch item model');
  }

  const itemModel = await response.json();
  /* response schema
  category: literal
  title: string
  condition: literal
  description: string
  */
  return itemModel;
}