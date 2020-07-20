const IMAGE_SERVER = "https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/"

export default {
  state: {
    theme: { option: "Open Gov Hub", banner: 'OGH', slim: 'OGH_Slim', logo: IMAGE_SERVER + "govhub_logo_small.png", rightLogo: IMAGE_SERVER + "govhub_bubbles70.png", primary: "color-ogh-blue" },

    themeOptions: [
      // { option: "SIPA", banner: 'SIPA', wide: 'WIDE', slim: 'SIPA_Slim', logo: IMAGE_SERVER + "SipaLogo2.png", primary: "color-columbia-blue" },
      { option: "Acountability Lab", banner: 'Banner_AL', slim: 'Banner_AL_Slim', logo: "" },
      { option: "Center for Open Data Enterprise", banner: 'Banner_CODE', slim: 'Banner_CODE_Slim', logo: "" },
      { option: "Collaborating for Resilience", banner: 'Banner_CORE', slim: 'Banner_CORE_Slim', logo: "" },
      { option: "Dullah Omar Institute", banner: 'Banner_DOI', slim: 'Banner_DOI_Slim', logo: "" },
      { option: "Feedback Labs", banner: 'Banner_Feedback', slim: 'Banner_Feedback_Slim', logo: "" },
      { option: "Global Integrity", banner: 'Banner_GI', slim: 'Banner_GI_Slim', logo: IMAGE_SERVER + "GI_Logo.png" },
      { option: "Open Government Partnership", banner: 'Banner_OGP', slim: 'Banner_OGP_Slim', logo: "" },
      { option: "Pact", banner: 'Banner_Pact', slim: 'Banner_Pact_Slim', logo: "" },
      { option: "PSAM", banner: 'Banner_PSAM', slim: 'Banner_PSAM_Slim', logo: "" },
      { option: "Rapid Results Institute", banner: 'Banner_RRI', slim: 'Banner_RRI_Slim', logo: "" },
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
