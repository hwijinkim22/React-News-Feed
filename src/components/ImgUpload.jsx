// import React from 'react';
// import supabase from '../supabaseClient';

// const ImgUpload = () => {
//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);

//   const handleImageChange = (event) => {
//     setImageFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const bucket = 'your-storage-bucket'; // 버킷 이름으로 변경
//     const fileName = imageFile.name;

//     const { data, error } = await supabaseClient.storage.from(bucket).upload(fileName, imageFile);

//     if (error) {
//       console.error('Upload error:', error);
//       return;
//     }

//     const publicUrl = supabaseClient.storage.from(bucket).getPublicUrl(fileName);

//     setImageUrl(publicUrl.data.publicUrl);
//   };

//   return <div>ImgUpload</div>;
// };

// export default ImgUpload;
