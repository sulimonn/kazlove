export default function createPreview(file) {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  return file;
}
