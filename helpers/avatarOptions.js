const fs = require("fs").promises;
const Jimp = require("jimp");

const resizeAvatar = async (path) => Jimp.read(path)
  .then((img) => {
    return img.resize(250, 250).quality(60).write(path);
  })
  .catch((err) => {
    console.error(err);
  });

const replaceAvatar = async (originalname, path, avatarURL) => {
  const [, extension] = originalname.split(".");
  const avatarPathArray = avatarURL.split("/");
  const avatarNewFile = `${
    avatarPathArray[avatarPathArray.length - 1]
        }.${extension}`;
    
  await resizeAvatar(path);
  await fs.rename(path, `./public/avatars/${avatarNewFile}`);
//   await fs.unlink(path);
};

module.exports = {
  replaceAvatar,
};