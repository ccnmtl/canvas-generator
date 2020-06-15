export default {
    state: {
        classes: [
            {
                courseTitle: " Quantitative Techniques",
                courseID: "1",
                sessions: [
                    {
                        id: 1,
                        title: "Sampling and Adjustment",
                        thumbnail: "https://sipa-web-images.s3.amazonaws.com/resized-images/sipa-image-rJ4ckfSp8.jpg",
                        description: "We start by considering how we can make valid inferences about a population from random and non-random samples. Even surveying video gamers can lead us to accurate predictions about election outcomes if we make the right adjustments.",
                        readings: [
                            { text: "Dear Media, Stop Freaking Out About Donald Trump’s Polls", url: "http://fivethirtyeight.com/features/dear-media-stop-freaking-out-about-donald-trumps-polls/" },
                        ],
                        lectures: [
                            { text: "", url: "" },
                        ],
                        additional: {
                            use: true,
                            materials: [
                                {
                                    name: "Additional Readings",
                                    contents: [
                                        { text: "Dear Media, Stop Freaking Out About Donald Trump’s Polls", url: "http://fivethirtyeight.com/features/dear-media-stop-freaking-out-about-donald-trumps-polls/" },
                                        { text: "What's the Matter With Polling?", url: "http://www.nytimes.com/2015/06/21/opinion/sunday/whats-the-matter-with-polling.html" },
                                        { text: "Opinion polls and margin of error (in portuguese)", url: "http://www.brasilpost.com.br/andre-barrence/pesquisas-e-margens-de-erro_b_6037564.html" },
                                        { text: "The incorrect margins of error in election polls based on quota samplings (in portuguese)", url: "https://docs.google.com/file/d/0BxScxA-VbhdibXlQNXFMWS1lbG8/preview?pli=1" },

                                    ]
                                }
                            ]
                        },
                        videos: [
                            {
                                title: "MODULE 1: Population and Sample",
                                url: "https://vimeo.com/116909515",
                                description: " Dr. Gelman introduces the goal of our work in statistics - to make inferences about a population from a sample."
                            },

                        ]
                    },
                    {
                        id: 2,
                        title: "",
                        thumbnail: "",
                        description: "",
                        readings: [
                            { text: "", url: "" },
                        ],
                        lectures: [
                            { text: "", url: "" },
                        ],
                        additional: {
                            use: true,
                            materials: [
                                {
                                    name: "",
                                    contents: [
                                        { text: "", url: "" },
                                    ]
                                }
                            ]
                        },
                        videos: [
                            {
                                title: "",
                                url: "",
                                description: ""
                            },

                        ]
                    },

                ]
            },
            {
                courseTitle: "Public Management Innovation",
                courseID: "2",
                sessions: [
                    {
                        id: 1,
                        title: "",
                        thumbnail: "",
                        description: "",
                        readings: [
                            { text: "", url: "" },
                        ],
                        lectures: [
                            { text: "", url: "" },
                        ],
                        additional: {
                            use: true,
                            materials: [
                                {
                                    name: "",
                                    contents: [
                                        { text: "", url: "" },
                                    ]
                                }
                            ]
                        },
                        videos: [
                            {
                                title: "",
                                url: "",
                                description: ""
                            },

                        ]
                    },

                ]
            },

        ]
    },
    getters: {
        getClasses: state => state.classes,
    },
    mutations: {
    }
}