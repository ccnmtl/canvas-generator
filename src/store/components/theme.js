const IMAGE_SERVER = "https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/"

export default {
  state: {
    theme: { option: "Open Gov Hub", banner: 'OGH', slim: 'OGH_Slim', logo: IMAGE_SERVER + "govhub_logo_small.png", rightLogo: IMAGE_SERVER + "govhub_bubbles70.png", primary: "color-ogh-blue" },
,
    themeOptions: [
      // { option: "Default", banner: '', slim: '', logo: IMAGE_SERVER + "SipaLogo2.png" },
      // { option: "Columbia", banner: 'CU01', slim: 'CU01_Slim', wide: 'STV1_BannerBlue', logo: IMAGE_SERVER + "CU_Default_Logo.png", primary: "color-columbia-blue" },
      // { option: "SIPA", banner: 'SIPA', wide: 'WIDE', slim: 'SIPA_Slim', logo: IMAGE_SERVER + "SipaLogo2.png", primary: "color-columbia-blue" },
      // { option: "Social Work", banner: 'SSW', slim: 'SSW_Slim', logo: IMAGE_SERVER + "SSW_logo.png", primary: "color-columbia-blue" },
      // { option: "Mailman", banner: 'MM', slim: 'MM_Slim', logo: IMAGE_SERVER + "MM_logo2.png", primary: "color-columbia-blue" },
      { option: "Open Gov Hub", banner: 'OGH', slim: 'OGH_Slim', logo: IMAGE_SERVER + "govhub_logo_small.png", rightLogo: IMAGE_SERVER + "govhub_bubbles70.png", primary: "color-ogh-blue" },
    ]
  },
  getters: {
    getTheme: state => state.theme,
    getThemeOptions: state => state.themeOptions,
    getGraphics: state => state,
  },
  mutations: {
    updateTheme: (state, payload) => {
      state.theme = payload
    }
  }
}
