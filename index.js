import sharp from "sharp";
import { existsSync } from "fs";
import { appendFile, readdir, mkdir } from "fs/promises";
import { basename, extname } from "path";
import params from "./params.js";

const convert = async (inputImg, outputDir) => {
  const newFileName = `${outputDir}/${basename(inputImg, extname(inputImg))}`;
  try {
    await sharp(inputImg)
      .webp({ quality: params.compress.quality })
      .toFile(`${newFileName}.webp`);
    console.log("🎉 ~ success for", newFileName);
  } catch (error) {
    console.log("🚫 ~ error for", inputImg);
    throw error;
  }
};

const convertAndResize = async (inputImg, outputDir, size) => {
  const newFileName = `${outputDir}/${basename(inputImg, extname(inputImg))}`;
  try {
    if (!existsSync(`${newFileName}.webp`))
      await sharp(inputImg)
        .webp({ quality: params.compress.quality })
        .toFile(`${newFileName}.webp`);
    await sharp(inputImg)
      .webp({ quality: params.compress.quality })
      .resize({ width: size })
      .toFile(`${newFileName}-${size}.webp`);
    console.log("🎉 ~ success for", newFileName);
  } catch (error) {
    console.log("🚫 ~ error for", inputImg);
    throw error;
  }
};

const optimizeImage = async (inputImg, outputDir) => {
  try {
    if (!params.resize.enabled) await convert(inputImg, outputDir);
    else
      params.resize.sizes.forEach(
        async (size) => await convertAndResize(inputImg, outputDir, size)
      );
  } catch (error) {
    await appendFile(
      `${params.output.dir}/errors.txt`,
      `${inputImg}\n`,
      "utf8"
    );
  }
};

const direntIsImage = (dirent) => {
  return (
    dirent.isFile() && [".jpg", ".jpeg", ".png"].includes(extname(dirent.name))
  );
};

const parseDir = async (inputDir, outputDir) => {
  // Read input directory
  const inputDirEntries = await readdir(inputDir, { withFileTypes: true });
  inputDirEntries.forEach(async (dirent) => {
    // path to this file or directory
    const newInput = `${inputDir}/${dirent.name}`;
    if (dirent.isDirectory()) {
      // if this is a directory, create a new directory in the output directory
      // and call parseDir recursively
      const newOutput = `${outputDir}/${dirent.name}`;
      if (!existsSync(newOutput)) await mkdir(newOutput);
      await parseDir(newInput, newOutput);
    } else if (direntIsImage(dirent)) {
      // if this is an image file, optimize it
      await optimizeImage(newInput, outputDir);
    }
  });
};

const main = async () => {
  if (!existsSync(params.input.dir)) await mkdir(params.input.dir);
  if (!existsSync(params.output.dir)) await mkdir(params.output.dir);

  await parseDir(params.input.dir, params.output.dir);
};

await main();
