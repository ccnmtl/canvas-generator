export default {
  state: {
    cases: [{
        category: "City Management & Urbanization",
        cases: [{
            name: "Big Data For Public Safety",
            id: 1,
            thumbnail: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/images/FROMCOMPSTAT-caseicon.jpg",
            writtenCase: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Case_Big+Data+for+Public+Safety.pdf",
            videoCase: "https://player.vimeo.com/video/93228175",
            originalDocuments: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Original+Documents_Big+Data+for+Public+Safety.pdf",
            transcripts: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Transcripts_Big+Data+for+Public+Safety.pdf",
            aditionalInterviews: ["https://player.vimeo.com/video/92979900", "https://player.vimeo.com/video/92946515", "https://player.vimeo.com/video/92979899"],
            shortDescription: 'Case that examines the use of "Big Data" and technology in the delivery of city services in NY. Includes interviews with Senior officials, including NYPD Police Commissioner William Bratton and others.',
            description: 'This case traces the development of big data analytics in New York City from Commissioner Bratton’s work in the early 90s to the work of Michael Flowers and the famous “geek squad" under Mayor Bloomberg. Includes interviews with senior officials, including NYPD Police Commissioner William Bratton and others. Key issues include transparency and community pushback, scalability, and adaptability to other areas of government, such as the New York Fire Department.'
          },
          {
            name: "Other Case Name",
            id: 2,
            writtenCase: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Case_Big+Data+for+Public+Safety.pdf",
            videoCase: "",
            originalDocuments: "",
            transcripts: "",
            aditionalInterviews: ["", "", ""],
            description: ''
          }
        ]
      },
      {
        category: "Economic Development & Finance",
        cases: [{
            name: "Finance Case",
            writtenCase: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Case_Big+Data+for+Public+Safety.pdf",
            videoCase: "",
            originalDocuments: "",
            transcripts: "",
            aditionalInterviews: ["", "", ""],
            description: ''
          },
          {
            name: "Other Finance Case",
            writtenCase: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Case_Big+Data+for+Public+Safety.pdf",
            videoCase: "",
            originalDocuments: "",
            transcripts: "",
            aditionalInterviews: ["", "", ""],
            description: ''
          },
          {
            name: "Finance 3",
            writtenCase: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Case_Big+Data+for+Public+Safety.pdf",
            videoCase: "",
            originalDocuments: "",
            transcripts: "",
            aditionalInterviews: ["", "", ""],
            description: ''
          }
        ]
      },

    ]
  },
  getters: {
    getCases: state => state.cases,
  },
  mutations: {}
}
