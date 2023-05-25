import LightspeedRetailSDK from "lightspeed-retail-sdk";
import dotenv from "dotenv";
dotenv.config();

const api = new LightspeedRetailSDK({
  accountID: process.env.LIGHTSPEED_ACCOUNT_ID,
  clientID: process.env.LIGHTSPEED_CLIENT_ID,
  clientSecret: process.env.LIGHTSPEED_CLIENT_SECRET,
  refreshToken: process.env.LIGHTSPEED_REFRESH_TOKEN,
});

export default api;
