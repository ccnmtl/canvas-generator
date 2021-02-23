export default {
  data() {
    return {
      orgTitle: 'Istari',
      colors: {
        primary: '#1e87f0',
        secondary: '#777'
      },
      splash: {
        image: 'https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/CCB_logo_istari.png'
      },
      themes: {
        visible: '*', // * show all themes, an Array can be used to show specific themes
        hidden: [ 'theme-name' ] // this only works if visible is set to *
      },
      pages: {
        visible: '*', // * show all pages, an Array can be used to show specific pages
        hidden: [ 'page-name' ] // this only works if visible is set to *
      },
      rows: {
        visible: '*', // * show all slots, an Array can be used to show specific slots
        hidden: ['excluded-row', 'weekly-activity-list-intro' ], // this only works if visible is set to *
        customRows: {  // Here you can either define totally custom rows, or replace default rows with changed versions 
          
        }
      },
      cols: {
        visible: '*', // * show all slots, an Array can be used to show specific slots
        hidden: ['activity-image', 'home-banner-col', 'case-list', 'activity-list-intro', 'test' ], // this only works if visible is set to *
        customCols: {}
      },
      slots: {
        visible: '*', // * show all slots, an Array can be used to show specific slots
        hidden: ['slot-name', 'list-slot', 'case-slot', 'name-value-slot', 'activity-item-list-slot', 'activity-video-list-slot'], // this only works if visible is set to *
        customSlots: {}
      },
      optionalPages: [], // Array of pages that don't show by default
      pageDefaults: {}, // Overrides the default page data
    }
  }
}
