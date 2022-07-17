const ImageUtil = {
  getImageThumbnail: (url, size) => {
    if (!url) return url;

    const imgSize = size || 'w_300';

    return url.replace('/image/upload', `/image/upload/${imgSize}`);
  },
};

module.exports = ImageUtil;
