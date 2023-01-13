const fs = require("fs").promises;
const Jimp = require("jimp");
const path = require('path');
const { uuid } = require("uuidv4");

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const resizeAvatar = async (path) => Jimp.read(path)
  .then((img) => {
    return img.resize(250, 250).quality(60).write(path);
  })
  .catch((err) => {
    console.error(err);
  });

const replaceAvatar = async (originalname, tempUpload) => {

  await resizeAvatar(tempUpload);

  try {
    const [, extension] = originalname.split(".");
    const newName = `${uuid()}.${extension}`;
    const resultUpload = path.join(avatarsDir, newName);
    await fs.rename(tempUpload, resultUpload);
    return resultUpload;
  } catch (error) {
    await fs.unlink(path);
    throw error;
  }
};

module.exports = {
  replaceAvatar,
};