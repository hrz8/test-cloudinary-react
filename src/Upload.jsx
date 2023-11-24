import React from 'react';

class ImageUploadComponent extends React.Component {
  state = {
    previewImage: null,
  };

  handleImageChange = (event) => {
    const fileInput = event.target;
    const imageFile = fileInput.files[0];

    // Membuat pratinjau gambar menggunakan URL.createObjectURL
    const previewImage = URL.createObjectURL(imageFile);

    this.setState({
      previewImage,
    });
  };

  handleImageUpload = async () => {
    const endpoint = 'http://localhost:3008/upload';

    const fileInput = document.getElementById('imageInput');
    const imageFile = fileInput.files[0];

    const formData = new FormData();
    formData.append('image', new Blob([imageFile], { type: imageFile.type }));

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  render() {
    const { previewImage } = this.state;

    return (
      <div>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={this.handleImageChange}
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
          />
        )}
        <button onClick={this.handleImageUpload}>Upload Image</button>
      </div>
    );
  }
}

export default ImageUploadComponent;