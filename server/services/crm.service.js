const axios = require("axios");
const qs = require("qs");
const getDataForAccessToken = () =>
  qs.stringify({
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: process.env.SCOPE,
    redirect_uri: process.env.REDIRECT_URI,
  });
const getAccessToken = async () => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: getDataForAccessToken(),
  };
  return await new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const getAccounts = async () => {
  const token_response = await getAccessToken();
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.O_DATA_BASE_URL}/api/data/v9.2/accounts`,
    headers: {
      Authorization: `Bearer ${token_response.access_token}`,
    },
  };
  return await new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
module.exports = { getAccounts };
