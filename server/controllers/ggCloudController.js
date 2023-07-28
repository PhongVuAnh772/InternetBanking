const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const path = require("path");
require("dotenv").config()


const storage = new Storage({
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
});
const bucketName = process.env.PROJECT_ID;

const createBucket = (req, res) => {
  try {
    storage.createBucket(bucketName);
    console.log(`Bucket ${bucketName} created.`);

    res
      .status(200)
      .json({ message: `Bucket ${bucketName} created.`, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the bucket.",
      success: false,
    });
  }
};

const uploadImageToBucket = (req, res) => {
  const filePathSpecified = req.body.filePathSpecified;

  try {
    const bucket = storage.bucket(bucketName);

    // Chuyển đổi định dạng base64 thành tệp hình ảnh
    const imageBuffer = Buffer.from(filePathSpecified, "base64");
    const imagePath = path.join(__dirname, "imagefront.jpg"); // Đường dẫn để lưu tệp hình ảnh
    fs.writeFileSync(imagePath, imageBuffer);

    const options = {
      destination: "imagefront.jpg",
      gzip: true,
      // metadata: {
      //   contentType: "image/jpeg",
      // },
    };

    bucket.upload(imagePath, options, (err, file) => {
      if (err) {
        res.status(500).json({
          error: `An error occurred while uploading files. Error: ${err.message}`,
          success: false,
        });
      } else {
        storage
          .bucket(bucketName)
          .file("imagefront.jpg")
          .getSignedUrl({
            version: "v2",
            action: "read",
            expires: Date.now() + 1000 * 60 * 60, // one hour
          })
          .then(([downloadUrl]) => {
            const signURL = downloadUrl;
            // fs.unlinkSync(imagePath);
            res.status(200).json({
              message: "Image uploaded successfully",
              success: true,
              data: signURL,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: `An error occurred while generating the signed URL. Error: ${error.message}`,
              success: false,
            });
          });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while uploading files. Error: ${error.message}, success: false `,
    });
  }
};

const uploadImageBackToBucket = (req, res) => {
  const filePathSpecified = req.body.filePathSpecified;

  try {
    const bucket = storage.bucket(bucketName);

    // Chuyển đổi định dạng base64 thành tệp hình ảnh
    const imageBuffer = Buffer.from(filePathSpecified, "base64");
    const imagePath = path.join(__dirname, "imageback.jpg"); // Đường dẫn để lưu tệp hình ảnh
    fs.writeFileSync(imagePath, imageBuffer);

    const options = {
      destination: "imageback.jpg",
      gzip: true,
      // metadata: {
      //   contentType: "image/jpeg",
      // },
    };

    bucket.upload(imagePath, options, (err, file) => {
      if (err) {
        res.status(500).json({
          error: `An error occurred while uploading files. Error: ${err.message}`,
          success: false,
        });
      } else {
        storage
          .bucket(bucketName)
          .file("imageback.jpg")
          .getSignedUrl({
            version: "v2",
            action: "read",
            expires: Date.now() + 1000 * 60 * 60 * 24, // one hour
          })
          .then(([downloadUrl]) => {
            const signURL = downloadUrl;
            fs.unlinkSync(imagePath);
            res.status(200).json({
              message: "Image uploaded successfully",
              success: true,
              data: signURL,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: `An error occurred while generating the signed URL. Error: ${error.message}`,
              success: false,
            });
          });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while uploading files. Error: ${error.message}, success: false `,
    });
  }
};

module.exports = {
  createBucket,
  uploadImageToBucket,
  uploadImageBackToBucket,
};
