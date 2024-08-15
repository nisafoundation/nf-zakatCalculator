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
const getContacts = async () => {
  const token_response = await getAccessToken();
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.O_DATA_BASE_URL}/api/data/v9.2/contacts?$select=fullname,emailaddress1,telephone1,address1_city&$top=100`,
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
const getContactByEmail = async (email, token) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.O_DATA_BASE_URL}/api/data/v9.2/contacts?$filter=emailaddress1 eq \'${email}\'`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        resolve(response.data.value[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const createContactObject = (request) => {
  const contact = {};
  let languages = [];
  if (request.langArabic) languages.push("804920002");
  if (request.langEnglish) languages.push("804920000");
  if (request.langFrench) languages.push("804920001");
  if (request.langSomali) languages.push("804920003");
  if (request.langOther) languages.push("804920004");
  if (languages.length > 0) {
    contact["dcg_languagesspoken"] = languages.join(",");
  }
  let date = new Date(request.Date);
  contact["birthdate"] = date.toISOString().split("T")[0];
  contact["dcg_languagesnotes"] = request.MultiLine1.replace(/&nbsp;/g, " ");
  contact["firstname"] = request.Name;
  contact["lastname"] = request.LName;
  contact["emailaddress1"] = request.Email;
  contact["mobilephone"] = request.PhoneNumber;
  contact["dcg_safetoleaveavoicemail"] = request.Dropdown;
  contact["address1_line1"] = request.Address1;
  contact["address1_line2"] = request.Address2;
  contact["address1_city"] = request.AddressCity;
  contact["address1_country"] = request.AddressCountry;
  contact["address1_stateorprovince"] = request.AddressRegion;
  contact["address1_postalcode"] = request.AddressZip;
  contact["dcg_safetimetocallat"] = request.MultiLine;
  contact["dcg_canadianstatus"] = request.Radio;
  contact["familystatuscode"] = request.Radio1;
  contact["haschildrencode"] = request.Radio2;
  contact["dcg_childreninformation"] = request.MultiLine2;

  return contact;
};
const createCaseObject = (request) => {
  const caseData = {};
  let sources = [];
  caseData["title"] = request["Name"] + " " + request["LName"];
  caseData["caseorigincode"] = "3";
  caseData["casetypecode"] = request.Radio3;
  caseData["description"] = request.MultiLine3;

  if (request.CheckboxFriends) sources.push("804920000");
  if (request.CheckboxFacebook) sources.push("804920001");
  if (request.CheckboxInstagram) sources.push("804920002");
  if (request.CheckboxEmail) sources.push("804920003");
  if (request.CheckboxExternal) sources.push("804920004");
  if (request.CheckboxYouTube) sources.push("804920005");
  if (request.CheckboxGoogle) sources.push("804920006");
  if (request.CheckboxTV) sources.push("804920007");
  if (request.CheckboxRadio) sources.push("804920008");
  if (request.CheckboxNewspaper) sources.push("804920009");
  if (request.CheckboxMosque) sources.push("804920010");
  if (request.CheckboxShelter) sources.push("804920011");
  if (request.CheckboxSocial) sources.push("804920012");
  if (request.CheckboxNonProfit) sources.push("804920013");
  if (request.CheckboxOther) sources.push("804920014");

  if (sources.length > 0)
    caseData["dcg_howdidyouhearaboutnisahomes"] = sources.join(",");

  return caseData;
};
const createContact = async (data) => {
  const token_response = await getAccessToken();
  const contact = createContactObject(data);
  const caseData = createCaseObject(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.O_DATA_BASE_URL}/api/data/v9.2/contacts`,
    headers: {
      Authorization: `Bearer ${token_response.access_token}`,
    },
    data: { ...contact },
  };
  return await new Promise((resolve, reject) => {
    axios
      .request(config)
      .then(async () => {
        const { contactid } = await getContactByEmail(
          data.Email,
          token_response.access_token
        );
        console.log({
          ...caseData,
          "customerid_contact@odata.bind": `/contacts(${contactid})`,
        });
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${process.env.O_DATA_BASE_URL}/api/data/v9.2/incidents`,
          headers: {
            Authorization: `Bearer ${token_response.access_token}`,
          },
          data: {
            ...caseData,
            "customerid_contact@odata.bind": `/contacts(${contactid})`,
          },
        };
        try {
          const { data } = await axios.request(config);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
module.exports = { getContacts, createContact };
