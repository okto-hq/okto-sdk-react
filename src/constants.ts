import { BuildType, type Theme, type BrandData } from "./types";

export const baseUrls = {
  [BuildType.PRODUCTION]: "https://apigw.okto.tech",
  [BuildType.STAGING]: "https://3p-bff.oktostage.com",
  [BuildType.SANDBOX]: "https://sandbox-api.okto.tech",
};

export const onBoardingUrls = {
  [BuildType.PRODUCTION]: "https://3p.okto.tech/login_screen/#/login_screen",
  [BuildType.STAGING]: "https://3p.oktostage.com/#/login_screen",
  [BuildType.SANDBOX]: "https://okto-sandbox.firebaseapp.com/#/login_screen",
};

export const widgetUrls = {
  [BuildType.PRODUCTION]: "https://3p.okto.tech/login_screen#/home",
  [BuildType.STAGING]: "https://3p.oktostage.com/#/home",
  [BuildType.SANDBOX]: "https://okto-sandbox.firebaseapp.com/#/home",
};

export const oktoLogo =
  "https://okto-sandbox.firebaseapp.com/assets/assets/png_assets/Okto.png";

export const AUTH_DETAILS_KEY = "AUTH_DETAILS";

export const defaultTheme: Theme = {
  textPrimaryColor: "0xFFFFFFFF",
  textSecondaryColor: "0xB3FFFFFF",
  textTertiaryColor: "0xffA8A8A8",
  accent1Color: "0xFF905BF5",
  accent2Color: "0x80905BF5",
  strokeBorderColor: "0xFFACACAB",
  strokeDividerColor: "0x4DA8A8A8",
  surfaceColor: "0xFF262528",
  backgroundColor: "0xFF000000",
};

export const defaultBrandData: BrandData = {
  title: "",
  subtitle: "",
  iconUrl: "",
};

export const JOB_RETRY_INTERVAL = 5000; //5s
export const JOB_MAX_RETRY = 12; //retry for 60s (12 * 5 = 60)
