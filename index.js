import sharp from "sharp";
import fs from "fs";
import params from "./params.js";

const getFileExtension = (fileName) => {
  return fileName.split(".").pop();
};

const getFileNameWithoutExtension = (fileName) => {
  return fileName.split(".").shift();
};

const convertAndResize = async (img, size) => {
  const fileName = getFileNameWithoutExtension(img.name);
  await sharp(`${params.input.dir}/${img.name}`)
    .webp({ quality: 75 })
    .resize({ width: size })
    .toFile(`./output-images/${fileName}-${size}.webp`);
};

const main = async () => {
  const inputImages = fs
    .readdirSync(params.input.dir, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => {
      return { name: dirent.name, ext: getFileExtension(dirent.name) };
    });
  inputImages.forEach(async (img) => {
    params.output.sizes.forEach(
      async (size) => await convertAndResize(img, size)
    );
  });
};

main();
