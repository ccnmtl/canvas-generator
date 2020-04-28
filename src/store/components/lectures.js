export default {
    state: {
        classes: [
            {
                courseTitle: "",
                courseID: "",
                sessions: [
                    {
                        id: 1,
                        title: "",
                        description: "",
                        readings: [""],
                        lectures: [""],
                        videos: [
                            {
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