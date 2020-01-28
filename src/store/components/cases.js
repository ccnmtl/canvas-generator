export default {
  state: {
    cases: [
        {
            category: "City Management & Urbanization",
            cases:         
            [{
                name: "Big Data For Public Safety",
                id: 1,
                thumbnail: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/images/FROMCOMPSTAT-caseicon.jpg",
                writtenCase: "https://cu-coursebuilder.s3.amazonaws.com/static/cases/Case_Big+Data+for+Public+Safety.pdf",
                videoCase:"",
                originalDocuments:"",
                transcripts:"",
                aditionalInterviews: ["","",""],
                shortDescription:'Case that examines the use of "Big Data" and technology in the delivery of city services in NY. Includes interviews with Senior officials, including NYPD Police Commissioner William Bratton and others.',
                description:''
            },
            {
                name: "Other Case Name",
                id: 2,
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
            },
            {
                name: "Finance 3",
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