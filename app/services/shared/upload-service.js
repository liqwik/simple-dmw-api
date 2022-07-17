const UploadService = function ({ storageProvider }) {
  /**
     Response: {
          "public_id": "tcnyvq9ejt4qbn4kzqi8",
          "version": 1575301204,
          "signature": "8d9b39f892b3115854de85dcad97935c4c30ca5a",
          "width": 960,
          "height": 600,
          "format": "jpg",
          "resource_type": "image",
          "created_at": "2019-12-02T15:40:04Z",
          "tags": [],
          "bytes": 102926,
          "type": "upload",
          "etag": "89cb4fa8d23f1ba3fbcd8ce9732974a5",
          "placeholder": false,
          "url": "http://res.cloudinary.com/home-delivery-dokkgkt1/image/upload/v1575301204/tcnyvq9ejt4qbn4kzqi8.jpg",
          "secure_url": "https://res.cloudinary.com/home-delivery-dokkgkt1/image/upload/v1575301204/tcnyvq9ejt4qbn4kzqi8.jpg",
          "original_filename": "upload_cb40cd8dd77f98314343f3c271135286"
      }
     */
  const uploadFile = async (file, opts) => {
    if (file) {
      const fileOpts = { quality: '75', fetch_format: 'auto', ...opts };

      try {
        // File upload
        const image = await storageProvider.uploader.upload(file, fileOpts);

        return {
          url: image.secure_url,
          fileName: image.public_id,
          format: image.format,
        };
      } catch (err) {
        throw new Error(err);
      }
    }

    throw new Error('Service is not available');
  };

  const uploadFiles = async (files) => {
    const result = [];
    const fileLength = files.length;

    // eslint-disable-next-line no-loops/no-loops, no-plusplus
    for (let i = 0; i < fileLength; i++) {
      // eslint-disable-next-line no-await-in-loop
      const img = await uploadFile(files[i].path);

      result.push(img);
    }

    return result;
  };

  return {
    uploadFile,
    uploadFiles,
  };
};

module.exports = UploadService;
