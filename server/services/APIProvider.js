const axios = require("axios");

const sendRequest = async () => {
  const url = "https://api.httzip.com/api/bank/id-lookup";
  const apiKey = "htt946f8ed2-6c62-4806-8774-bdd71b608576zip";
  const apiSecret = "htt5e755fb2-068b-401f-a2ae-9341dc8df049zip";
  const csrfToken = "qt4G0OOzLrcJ4cBdTGyoNXTWHuBl2QjlKMKMy1gG";

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: "https://httzip.com",
          Referer: "https://httzip.com/",
          "Sec-Ch-Ua":
            '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Ch-Ua-Platform": '"Windows"',
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67",
          "X-Api-Key": apiKey,
          "X-Api-Secret": apiSecret,
          "X-Csrf-Token": csrfToken,
        },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};


sendRequested();
