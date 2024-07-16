// import React, { useState } from 'react';
// import axios from 'axios';
// import './upload.css';

// const ImageUpload = () => {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setResult(null);
//     setError(null);
//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageUrl(reader.result);
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     setIsLoading(true);

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setResult(response.data.result);
//       setError(null);
//     } catch (err) {
//       setError('Error uploading file');
//       setResult(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="upload-section">
//         <h1>Upload an Image</h1>
//         <form onSubmit={handleSubmit}>
//           <input type="file" onChange={handleFileChange} />
//           <button type="submit">Upload</button>
//         </form>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {isLoading && <div className="spinner"></div>}
//         {result && (
//           <div className="result-box">
//             <h2>Result:</h2>
//             <p>{result}</p>
//           </div>
//         )}
//       </div>
//       <div className="image-section">
//         {imageUrl && <img src={imageUrl} alt="Uploaded" />}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;







import React, { useState } from 'react';
import axios from 'axios';
import './upload.css';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);
    setError(null);
    setImageUrl(null); // Reset image preview on new file selection
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data.result);
      setError(null);
    } catch (err) {
      setError('Error uploading file');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="upload-section">
        <h1>Upload an Image</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {isLoading && <div className="spinner"></div>}
        {result && (
          <div className="result-box">
            <h2>Result:</h2>
            <ul>
              {result.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="image-section">
        {imageUrl && <img src={imageUrl} alt="Uploaded" />}
      </div>
    </div>
  );
};

export default ImageUpload;






