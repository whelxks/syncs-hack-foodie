export const getContentTypeFromUri = (uri: string) => {
  const extension = (uri.split('.').pop() ?? '').toLowerCase();
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    default:
      return 'image/jpeg'; // default fallback
  }
};
