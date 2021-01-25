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
        hidden: [ 'excluded-row' ], // this only works if visible is set to *
        customRows: {  // Here you can either define totally custom rows, or replace default rows with changed versions 
          testConfigRow: {
            id: 8,
            name: "Config Row",
            type: "config-row",
            icon: "document-copy",
            pages: ['syllabus'],
            array: [
              ['instructor-expanded-list']
            ]          
          },
        }
      },
      slots: {
        visible: '*', // * show all slots, an Array can be used to show specific slots
        hidden: [ 'slot-name' ], // this only works if visible is set to *
        customSlots: {}
      },
      optionalPages: [], // Array of pages that don't show by default
      pageDefaults: {}, // Overrides the default page data
    }
  }
}
