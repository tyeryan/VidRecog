import shell from 'shelljs'

const processImage = async (imageName) => {
  try {
    const filepath = "./tmp/" + imageName
    console.log("Going to run shell script now")
    shell.exec('./script', {
      filepath : filepath
    })
    console.log("Finished running shell script")
    // const parsedJson = await storage.bucket('journey-storage').upload(filepath, {
    //   gzip: true,
    //   metadata: {
    //     cacheControl: 'no-cache',
    //   },
    // });
    return parsedJson;
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  processImage
};