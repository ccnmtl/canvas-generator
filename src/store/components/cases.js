export default {
  state: {
    cases: [
        {
            category: "City Management & Urbanization",
            cases:         
            [{
                name: "Big Data For Public Safety",
                writtenCase: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Case_Big+Data+for+Public+Safety.pdf",
                videoCase:"",
                originalDocuments:"",
                transcripts:"",
                aditionalInterviews: ["","",""],
                description:''
            },
            {
                name: "Other Case Name",
                writtenCase: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Case_Big+Data+for+Public+Safety.pdf",
                videoCase:"",
                originalDocuments:"",
                transcripts:"",
                aditionalInterviews: ["","",""],
                description:''
            }]
        },
        {
            category: "Economic Development & Finance",
            cases:         
            [{
                name: "Finance Case",
                writtenCase: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Case_Big+Data+for+Public+Safety.pdf",
                videoCase:"",
                originalDocuments:"",
                transcripts:"",
                aditionalInterviews: ["","",""],
                description:''
            },
            {
                name: "Other Finance Case",
                writtenCase: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Case_Big+Data+for+Public+Safety.pdf",
                videoCase:"",
                originalDocuments:"",
                transcripts:"",
                aditionalInterviews: ["","",""],
                description:''
            }]
        },

    ]
  },
  getters: {
    getCases: state => state.cases,
  },
  mutations: {
  }
}