const { Storage } = require("@google-cloud/storage");
const ggConfig = require("../controllers/ggcloud.json");
const projectId = "vp-bank-f38c8";
const fs = require("fs");
const path = require("path");
const credentials = {
  type: "service_account",
  project_id: "vp-bank-f38c8",
  private_key_id: "5d325f97dbb40f5b98284873f4a73136b8fbf8dc",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCHQiGW16usAFlI\ncixPGSWEnkw0bjib5vLjK+ZKtmQvuOnQXsL6a8vt+WaFtrFeuJnZh/WD75Rk8RB9\nRYRRzt/1LndhuHeTcAfsbt5DnRVlwk5oiUwms84xwCTj6PaQPTsJP0QdNgerrPG/\nyVYwzJOOXLkyYwE1E4vvr+VGBOedbAQZEuPP4mCwYPdxBXw68xt/ZK6YCvYM+32F\ntUKZJ4IC2Br7A1tNvvycvEv0kmJKXkf1IyZMqdhBoOoC/fEClsUmgUU5pejoynhe\ntD1Wgs4phAs45JgA6Cd9HpVKDGCjcH5LY9hGT0nxA3vqA92ERMwYg1UMrjDxyPOc\nFeYgRkpZAgMBAAECggEAD/Rehu8AuoS+A1woWtoyAT806PhZaBZpbx+GBikWj0SG\nHASZhjWB9Bu3mq0upegriavOa5YukGuZENXK4mV/KGonPdknDbao0JxRTnNwizTM\nz+rmFyideWPbViDsOJ5oYNJcI//0Dq2TRJaouo/fFetdExL3mP2pw4ehiU1Zzsk7\nmjE3MqQGSxlvrdhKGfMamzx7ux8mw/VpbtHLkW7DBid/1NViYzXcc9fARDwM+25E\niyAo3wDjZGIQGA22TbLwhy/SsqY2WowGyn2L/5Hkbqj3VaezsOdCoQIK9789VfZW\nesdbJJLLY1iGNBYKehMrKQuB2I4MvtiGxKHYa2ruQwKBgQC6oER20WhzqlaLWtZE\nIdvLll/5DTgxcg4FAIXa5jiy24RgHtnH1y+jgUp6IU1VLR9UYUNZu86xJ/8TSnkX\npxMNIfOFPpqp6Y5pDHGTbAi1VDNzCoAT4CCoktIfQG7DWpK4x/MkAy2ea9L1sb4B\nRoBNCzSXjQoJIUQpWRpJcQE/7wKBgQC5iZobVfXUexjAhacMtWxEsHh3O1mNWSM8\nziGZf0tzk0Q7eEuUEpejXLVr5V+aTZpZ8QFLrLKbLYUDLLHf2eAjCwyemd6F/PyZ\nZWxS0W26b4Eb5PlkbtWV2v5b2Z/UlLp0qGtTUZarKvxQ4i5L5zcVwQD0kVhPlvzp\nv9Mo3ulSNwKBgC7PQBzlTWOll+uALzoLnAumfhADxtJwHyAWD3zmPdZuxPcvBcTg\nLmy+YyXa8ICqvq71bmU1fBRnSc1W4qSSHW8v0tra5wQzNqsWme42LMD+i6ERQyq5\nDrf5i4aXLLEHKMH8NPoVaf3QYauKl3POcSPh6aERmTDNDUGpvbQqCfw1An90rxU8\nG9N+zevDKErmszJkAJfCZJDtVCHVG84Fuwi4puVCgWUGuqqjEqsGMDrvz95Csk8e\nSH4LGZWNaY50OZG8eDZ3iE1p9rDlx+NYMl3P4lBQOrCdeRbaJ9/P5A2go+ifdUwK\nGkWnYGFOfPCgy8jY5Yi0RrRDWbG1T+58xbP3AoGBAJXbJUneC5dZuPdtHoTIYRuQ\n2Ry57FMaaEMq+r9ALVgnKJIPVeK+ltcDwbu/SFN0anIFgD1V/EMJZIm42/DYfvBj\nDTFUEC4B6HEQviZmBnT6Fc+k692QH7b/HkZr6S0FIeVPdf598jpiykWhqENvleva\n99sM8eTPSWoq43469G34\n-----END PRIVATE KEY-----\n",
  client_email: "vp-bank-f38c8@appspot.gserviceaccount.com",
  client_id: "110495644651755419364",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/vp-bank-f38c8%40appspot.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
const storage = new Storage({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
});
const bucketName = "vp-bank-f38c8";

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
