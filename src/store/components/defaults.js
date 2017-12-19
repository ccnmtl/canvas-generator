export default {
  state: {
    info: {
      // COURSE INFO
      title: "Global Food Systems",
      url: "https://courseworks2.columbia.edu/courses/29191/",
      semester: "U6411 // SPRING 2017",
      //TIME INFO
      startDate: null,
      dateType: "Week",
      dateLength: "12",
      //TEACHERS
      prof: {
        name: 'Professor Name',
        email: 'professor@sipa.columbia.edu',
        office: 'Office Hours: Monday 3:00-6:00 pm (IAB Room 1234)',
        imgSrc: "http://via.placeholder.com/350x150"
      },
      ta: {
        name: 'TA Name',
        email: 'ta@sipa.columbia.edu',
        office: 'Office Hours: Tuesday 1:00-3:00 pm (IAB Room 1234)',
        imgSrc: "http://via.placeholder.com/350x150"
      },
      //DISPLAY PARAMETERS
      video:"https://vimeo.com/199382848/1dd8fc0f31",
      image:"http://assets.ce.columbia.edu/i/ce/intl/intl-fp@2x.jpg",
      meetings: "Tuesday 9:00-10:50 am (IAB Room 411)",
      discussions: "Thursday 9:00-10:50 am (IAB Room 411)",
      description: "Here you’ll find course materials and a range of tools to help you get the most out of the class. \n Please begin by reading the course syllabus, where you’ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester."
    },

    weekDefault: {
      title: 'Sustainable Agriculture and Food Systems: Key Concepts and Historical Perspective',
      date:"",
      description: "This session will cover the foundational topics in food systems.",
      imgSrc: 'https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/week1' + '.png',
      body: "We will begin with an overview of the course objectives and content, the methods of instruction, the assignments, and the grading system. We will then present and discuss “The Big Picture,” starting with the historical context of the current global food system, including the “Green Revolution.” Which institutions have shaped and will shape global food systems? We will briefly discuss the concept of Sustainable Intensification. We will also consider the recently agreed SDGs and how they could contribute to more sustainable and equitable global food systems. And we will discuss some of the forces shaping food systems around the world.",
      required:'<span ><p><strong>Lecture Slides:</strong></p><p><strong>Download PDF:&nbsp;</strong><a href="https://courseworks2.columbia.edu/courses/29191/files/1032282/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">GFS Week 6 Africa (February 21, 2017) Final.pdf<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></p><p><strong>Required Readings / Viewings:</strong></p><ul><li>Sanchez, P.A. (2002) Soil fertility and hunger in Africa.&nbsp;<em>Science&nbsp;</em><strong>295</strong>: 2019-2020.</li><li>Download PDF:&nbsp;<a href="https://courseworks2.columbia.edu/courses/29191/files/929036/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">Soil_Fertility_and_Hunger_in_Africa_2002.pdf<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></li><li><strong>Familiarize yourself with the work of the Alliance for an African Green Revolution (AGRA):&nbsp;</strong><a href="http://www.agra.org/" target="_blank" style="color: rgb(0, 142, 226);">http://www.agra.org/&nbsp;(Links to an external site.)</a></li></ul><p><strong>Supplementary Resources</strong></p><ul><li>Listen: --“African Land Fertile Ground for Crops and Investors.” NPR. June 15, 2012.&nbsp;<a href="http://www.npr.org/2012/06/15/155095598/african-land-fertile-ground-for-crops-and-investors" target="_blank" style="color: rgb(0, 142, 226);">http://www.npr.org/2012/06/15/155095598/african-land-fertile-ground-for-crops-and-investors&nbsp;(Links to an external site.)</a></li><li>Download mp3:&nbsp;<a href="https://courseworks2.columbia.edu/courses/29191/files/1009373/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">20120615_atc_06.mp3<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></li></ul></span>',
      videoNumber: 1,
    },
    videoDefault: {
      title: "All that Glitters is not Gold (18 minutes)",
      description: "‘All that Glitters is not Gold’ features various communities’ representatives concern about the introduction of genetically engineered ‘Golden’ rice in the Philippines.",
      source: "https://www.youtube.com/watch?v=GxSGKD50ioE"
    },
    discussionDefault: {
      due: "Feb 4, 2017",
      available: "Jan 1",
      link: '', //context.rootState.courseUrl + 'discussion_topics/', TODO put this in a getter so it can call rootState?
      points: 10
    },
    assignmentDefault: {
      due: "Feb 4, 2017",
      available: "Jan 1",
      link: '', //context.rootState.courseUrl + 'discussion_topics/', TODO put this in a getter?
      points: 10
    },
    profDefault: {
      name: 'Placeholder Name',
      email: 'professor@sipa.columbia.edu',
      office: 'Office Hours: Monday 3:00-6:00 pm (IAB Room 1234)',
      imgSrc: "http://via.placeholder.com/200x200"
    }

  },
  getters: {
    dWeek: state => state.weekDefault,
    dVideo: state => state.videoDefault,
    dInfo: state => state.info,
    dProf: state => state.profDefault
  }
}
