const IMAGE_SERVER = "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/"

export default {
  state: {
    theme: { option: "Open Gov Hub", banner: 'OGH', slim: 'OGH_Slim', logo: IMAGE_SERVER + "govhub_logo_small.png", primary: "color-ogh-blue" },

    themeOptions: [
      // { option: "SIPA", banner: 'SIPA', wide: 'WIDE', slim: 'SIPA_Slim', logo: IMAGE_SERVER + "SipaLogo2.png", primary: "color-columbia-blue" },
      { option: "Acountability Lab", banner: 'Banner_AL', slim: 'Banner_AL_Slim', logo: IMAGE_SERVER + "AL_Logo.png" },
      { option: "Center for Open Data Enterprise", banner: 'Banner_CODE', slim: 'Banner_CODE_Slim', logo: IMAGE_SERVER + "Code_Logo.png" },
      { option: "Collaborating for Resilience", banner: 'Banner_CORE', slim: 'Banner_CORE_Slim', logo: IMAGE_SERVER + "Core_Logo.png" },
      { option: "Development Gateway", banner: 'Banner_DG', slim: 'Banner_DG_Slim', logo: IMAGE_SERVER + "DG_Logo.png" },
      { option: "Dullah Omar Institute", banner: 'Banner_DOI', slim: 'Banner_DOI_Slim', logo: IMAGE_SERVER + "DOI_Logo.png" },
      { option: "Feedback Labs", banner: 'Banner_Feedback', slim: 'Banner_Feedback_Slim', logo: IMAGE_SERVER + "Feedback_Logo.png" },
      { option: "Global Integrity", banner: 'Banner_GI', slim: 'Banner_GI_Slim', logo: IMAGE_SERVER + "GI_Logo.png" },
      { option: "Open Government Partnership", banner: 'Banner_OGP', slim: 'Banner_OGP_Slim', logo: IMAGE_SERVER + "OGP_Logo.png" },
      { option: "Pact", banner: 'Banner_Pact', slim: 'Banner_Pact_Slim', logo: IMAGE_SERVER + "Pact_Logo.png" },
      { option: "PSAM", banner: 'Banner_PSAM', slim: 'Banner_PSAM_Slim', logo: IMAGE_SERVER + "PSAM_Logo.png" },
      { option: "Rapid Results Institute", banner: 'Banner_RRI', slim: 'Banner_RRI_Slim', logo: IMAGE_SERVER + "RRI_Logo.png" },
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
