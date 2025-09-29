import axios from "axios";
import React, { useState } from "react";

export default function MultiUpload() {
  const [images, setImages] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const uploadImages = async () => {
    const cloudName = "hoangvanchung"; 
    const uploadPreset = "cloudAPI"; 

    const uploadPromises = images.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      return res.data;
    });

    const results = await Promise.all(uploadPromises);
    const uploadedUrls = results.map((r) => r.secure_url);
    setUrls(uploadedUrls);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleChange} />
      <button onClick={uploadImages}>Upload</button>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {urls.map((url, i) => (
          <img key={i} src={url} alt="" width={100} />
        ))}
      </div>
    </div>
  );
}
