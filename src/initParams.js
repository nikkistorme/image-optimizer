import fs from "fs";

const defaultParams = `export default ${JSON.stringify(
  {
    input: {
      dir: "./input-images",
    },
    output: {
      dir: "./output-images",
      sizes: [600, 900, 1200, 2400],
    },
  },
  null,
  2
)}`;

const main = async () => {
  if (fs.existsSync("params.js")) {
    console.log("🤖 params.js already exists");
    return;
  }
  try {
    if (!fs.existsSync("/input-images")) await fs.mkdirSync("input-images");
    if (!fs.existsSync("/output-images")) await fs.mkdirSync("output-images");
    await fs.writeFileSync("params.js", defaultParams);
  } catch (err) {
    throw err;
  }
};

main();
