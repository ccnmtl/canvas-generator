<template>
  <div id="app">
    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center uk-grid-match" uk-grid>
      <div>
        <div class="uk-background-primary uk-padding uk-light">
          <h1>EXPORT/IMPORT COURSEBUILDER</h1>
          <hr>
          <p>
          If you have finished building your class or want to save the data you have previously submitted into the coursebuilder, click the "Export Coursebuilder Data" button to
          save a ".json" file that you can import at a later date (using the import section below).  If you have completed your class and would like to import it directly into Canvas as an ".imscc" file, use the "Export Canvas Package" button below
  to generate an export of your class.
          </p>
          <button
            class="uk-button-large uk-button-default"
            type="button"
            name="button"
            @click="exportJSON"
          >Export Coursebuilder Data
          </button>
          <button
            class="uk-button-large uk-button-default"
            type="button"
            name="button"
            style="margin-left: 10px"
            @click="exportIMSCC"
          >Export Canvas Package</button>
          <hr>
          <p>
            If you have previously saved an export file from this version of Coursebuilder you can use the input below to import all of the data into this
            session. Warning! This will overwrite all information you have currently entered.
          </p>
          <!-- uk-box-shadow-large if shadow needed -->
              <div class=" uk-padding-small uk-box-shadow-large uk-padding-remove-bottom">
                    <h4>Select a ".json" file from a previous data export</h4>
                      <form>
                      <button
                        class="uk-button uk-button-default"
                        v-if="hasImportData"
                        @click.prevent="performImport"
                      >File read successfully! Click here to confirm import.</button>
                      <div class="uk-margin" uk-margin>
                        <input
                          style="display:inline-block;"
                          class="uk-padding"
                          type="file"
                          accept=".json"
                          name="import-file"
                          @change="onImportFileChange"
                        />
                        <!-- <input style="display:inline-block;" class="uk-padding" type="file" name="import-file2" @change="onImportFileChange2" /> -->
                        <br />
                        <br />
                      </div>
                    </form>
                    <hr>
              </div>



        </div>
      </div>
      <div>
        <div class="uk-background-secondary uk-padding uk-light">
          <h1>EXPORT/IMPORT CANVAS</h1>
           <hr>

          <p>
            If you have completed your class and would like to import it directly into Canvas as an ".imscc" file, use the button below
            to generate an export of your class.
          </p>


          <hr>
          <div class="uk-box-shadow-large uk-padding-small uk-padding-remove-bottom">
                    <h4>Select an ".imscc" file from a canvas course export</h4>
                      <form>
                        <button
                        class="uk-button uk-button-default"
                        v-if="importModuleList.length > 0 && !isCourseBuilder"
                        @click.prevent="performPackageImport"
                      >Canvas file read successfully! Click here to confirm import.</button>
                      <button
                        class="uk-button uk-button-default"
                        v-if="isCourseBuilder"
                        @click.prevent="performCBPackageImport"
                      >Coursebuilder imscc read successfully! Click here to confirm import.</button>
                      <br> <hr>
                      <button
                        class="uk-button uk-button-default"
                        v-if="importModuleList.length > 0"
                        @click.prevent="performPackageExport"
                      >Click Here to export canvas package with new data</button>
                      <div class="uk-margin" uk-margin>
                        <input
                          style="display:inline-block;"
                          class="uk-padding"
                          type="file"
                          accept=".imscc"
                          name="import-file"
                          @change="onImportPacakgeFileChange"
                        />
                        <!-- <input style="display:inline-block;" class="uk-padding" type="file" name="import-file2" @change="onImportFileChange2" /> -->
                        <br />
                        <br />
                      </div>
                    </form>
              </div>
        </div>
          
      </div>
    </div>

    <container-component v-show="false" cid="home" ref="home"/>

    <container-component :cid="`activity-${act.id}`"
      v-for="act in weeks"
      :key="act.id"
      :ref="`activity-${act.id}`"
      :defaultRows="defRows"
      v-show="false" />

    <container-component v-show="false" cid="syllabus" ref="syllabus"/>
    <container-component v-show="false" cid="activities-list" ref="list"/>


    <zoom v-show="false" ref="zoom" />
    <!-- <syllabus v-show="false" ref="syllabus" /> -->
    <!-- <list v-show="false" ref="list" /> -->
    <div v-for="n in (weeks.length)" :key="`week-${n}`">
      <week-view v-show="false" :idx="n-1" :ref="'week'+ n" />
    </div>
    <div v-for="n in (info.students.length)" :key="`student-${n}`">
      <student-view v-show="false" :idx="n-1" :ref="'student'+ n" />
    </div>
    <students-list v-show="false" ref="studentsList" />

  </div>
</template>

<script>
import saveFile from "../../util/save-file"
import PageMixin from "../../components/mixins/page-mixin"
import JSZip from "jszip"
import JSZipUtils from "jszip-utils"
import validator from "validator"

import weekView from "../render/weekView"
import studentView from "../render/studentView"

import zoom from "./Zoom"
import list from "./WeeklyList"
import studentsList from "./StudentsList"
import syllabus from "./Syllabus"
import home from "./Home"

import headings from "../../store/export-headings"
import moment from "moment"
import { mapActions } from 'vuex'

import ContainerComponent from '../common/ContainerComponent.vue'
import RowTypes from '../../util/row-types'

export default {
  name: "Export",
  data() {
    return {
      hasImportData: false,
      packageImportData: {},
      importModuleList: [],
      isCourseBuilder: false,
      hasPacakgeImportData: false,
      fullscreenLoading: false,
      exportData: {},
      courseId: ''
    }
  },
  computed: {
    defRows(){
      return [
        [this.simpleBannerCol({banner: {getter: {title: 'info.title'}}})],
        [this.activityIntroCol()],
        [['activity-video-list-slot']],
        ['case-list'],
        [['activity-item-list-slot']],
      ]
    },
  },
  components: { home, syllabus, weekView, list, zoom, studentView, studentsList, ContainerComponent },
  mixins: [RowTypes, PageMixin],
  mounted() {
    let manifest = this.readLocalXML("../../static/files/Clean Course/course_settings/course_settings.xml")
    console.log(manifest)
  },
  methods: {
    ...mapActions(['updateInfo','updateTheme','updateWeeks', 'sliceWeek']),

    onImportFileChange(changeEvent) {
      let file = changeEvent.target.files[0]
      if (!file) {
        return
      }

      let reader = new FileReader()
      reader.onload = loadEvent => {
        this.importData = JSON.parse(loadEvent.target.result)
        this.hasImportData = !!this.importData
      }

      reader.readAsText(file)
    },
    performPackageExport(){
      this.updateProp("url", this.parseUrl(this.info.url))

      function processCode(code, url ){
        let output = code.replaceAll(url + '$IMS-CC-FILEBASE$', '$IMS-CC-FILEBASE$')
        output = output.replaceAll(url,'$CANVAS_COURSE_REFERENCE$/')
        output = output.replaceAll('http://www.placeholderurl.org', '$CANVAS_COURSE_REFERENCE$/')

        return output
      }
      let footer = "</body> </html>"


      JSZip.loadAsync(this.packageImportData)
        .then(zip => {
          //Remove old Sessions
          this.importModuleList.forEach( (module, index) => {
            module.sessions.forEach( session => {
              let nonDeleteStrings = ['faq', 'discussion', 'assignment', 'project']
              if (nonDeleteStrings.some(el => session.includes(el))) return
              zip.remove(session)
            })
          })

          //Add Home Page, Syllabus, And List Page
          zip.file("wiki_content/home.html", headings.home + processCode(this.$refs.home.returnCode(), this.info.url) + footer)
          zip.file(
            "course_settings/syllabus.html",
            headings.syllabus + processCode(this.$refs.syllabus.returnCode(), this.info.url) + footer
          )
          zip.file("wiki_content/modules-overview.html", headings.list + processCode(this.$refs.list.returnCode(), this.info.url) + footer)

          //Add Redirect
          let weekly_redirect_url = '<lticm:property name="url">$CANVAS_COURSE_REFERENCE$/pages/modules-overview</lticm:property>'
          zip.file(
            "ccb-weekly-redirect.xml",
            headings.weekly_redirect_top + weekly_redirect_url + headings.redirect_bottom
          )

          let manifestString = ''
          let serializer = new XMLSerializer()

          // zip
          //     .file("imsmanifest.xml")
          //     .async("string")
          //     .then(data => {
          //       console.log('chanigng manifest')
          //       let parser = new DOMParser()
          //       let manifest = parser.parseFromString(data, "text/xml")

          //       let redirect  = manifest.createElement("resource")
          //       redirect.setAttribute("type", "imsbasiclti_xmlv1p0")
          //       redirect.setAttribute('identifier', 'ccb-weekly-redirect')

          //       let redirectFile = manifest.createElement('file')
          //       redirectFile.setAttribute("href", 'ccb-weekly-redirect.xml')

          //       let xmlResources = manifest.getElementsByTagName('resources')[0]
          //       xmlResources.appendChild(redirect)


          //       manifestString = serializer.serializeToString(manifest)
          //       changeManifestFile(manifestString )
          //     })
          // //     })

          // let changeManifestFile = function(manifest){
          //   zip.file("imsmanifest.xml", manifest)
          // }

          //   zip.remove("imsmanifest.xml")
          //   console.log(manifestString)

          // zip
          //     .file("imsmanifest.xml")
          //     .async("string")
          //     .then(data => {
          //       let parser = new DOMParser()
          //       let manifest = parser.parseFromString(data, "text/xml")
          //       console.log(manifest)
 
          //     })


          //Add Week Pages
          let renderPackageWeek = (i) => {
              let footer = "</body> </html>"
              let title = "<title>" + this.weeks[(i-1)].title + "</title>"
              let iden = '<meta name="identifier" content="ccb-session' + i + '"/>'
              let code
              let activityID = this.weeks[(i-1)].id

              let convertedTitle = this.weeks[(i-1)].title.replace(/\./g,'-dot-').replace(/\s+/g, '-').toLowerCase()

              this.setStateField({field: 'selectedWeekID', value: activityID}).then( (res) => {
                console.log('id', `activity-${activityID}`)
                code = this.$refs[`activity-${activityID}`][0].returnCode()

                zip.file(
                  "wiki_content/" + convertedTitle + ".html",
                  headings.top + title + iden + headings.bottom + processCode(code, this.info.url) + footer
                )
                console.log(convertedTitle)
                if (i+1 <= this.weeks.length) renderPackageWeek(i+1)
                else returnIMSCC()
              })
            }

            renderPackageWeek(1)

            let returnIMSCC = () => {
              let today = new Date()
              let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
              let time = today.getHours() + "-" + today.getMinutes()
              let dateTime = date + " " + time

              zip.generateAsync({ type: "blob" }).then(blob => {
                saveFile({
                  name: this.info.title + " (" + dateTime + ").imscc",
                  data: blob
                })
              })
            }
        })
    },
    onImportPacakgeFileChange(changeEvent) {
      let file = changeEvent.target.files[0]
      if (!file) {
        return
      }
      this.packageImportData = file

      JSZip.loadAsync(file)
            .then(zip => {
              zip
              .file("course_settings/context.xml")
              .async("string")
              .then(data => {
                let parser = new DOMParser()
                let contextInfo = parser.parseFromString(data, "text/xml")
                this.courseId = contextInfo.querySelector('context_info > course_id').innerHTML
                this.courseTitle = contextInfo.querySelector('context_info > course_name').innerHTML
                if (this.courseTitle.includes('Migration')) this.courseTitle = this.courseTitle.replace('Migration', '')
              })

              zip
              .file("imsmanifest.xml")
              .async("string")
              .then(data => {
                let parser = new DOMParser()
                let manifest = parser.parseFromString(data, "text/xml")

                let org = manifest.querySelector('manifest > organizations > organization > item')
                let items = Array.from(org.getElementsByTagName('item'))
                let modules = items.filter(elem => elem.children.length > 1)
                let moduleList = []

                let resources = manifest.querySelector('manifest > resources')
                let resourcesItems = Array.from(resources.getElementsByTagName('resource'))

                modules.forEach( module => {
                  const resourceRefs = []
                  let moduleDiscussions = []
                  let moduleAssignments = []
                  let moduleQuizes = []

                  let moduleMainTitle = ''
                  Array.from(module.getElementsByTagName('title')).forEach((title, index) => {
                    if (index === 0) moduleMainTitle = title.innerHTML
                    const idRef = title.parentNode.getAttribute('identifierref')
                    if (idRef) {
                      const foundResource = resourcesItems.find(res => res.getAttribute('identifier') === idRef)
                      if (foundResource && foundResource.getAttribute('href')) {
                        if (foundResource.getAttribute('href').includes('wiki_content/')){
                          resourceRefs.push(foundResource.getAttribute('href'))
                        }
                        else if (foundResource.getAttribute('type') === 'associatedcontent/imscc_xmlv1p1/learning-application-resource') {
                        moduleAssignments.push({
                          id: idRef,
                          link: foundResource.getAttribute('href')
                        })
                      }
                      }
                      else if (foundResource && foundResource.getAttribute('type') === 'imsqti_xmlv1p2/imscc_xmlv1p1/assessment') {
                        moduleQuizes.push(idRef)
                      }
                      else if (foundResource && foundResource.getAttribute('type') === 'imsdt_xmlv1p1') {
                        moduleDiscussions.push(idRef)
                      }
                    }
                  })

                  let moduleTitles = []
                  for (let i=0; i<resourceRefs.length; i++){
                    let wikiTitle = resourceRefs[i];
                    let nonPageStrings = ['quiz', 'discussion', 'assignment']
                    if(!nonPageStrings.some(el => wikiTitle.includes(el))) {
                      moduleTitles.push(wikiTitle)
                    }
                  }
                  let tempModule = {
                    title: moduleMainTitle,
                    sessions: moduleTitles,
                    moduleDiscussions, moduleAssignments, moduleQuizes
                    
                  }
                  moduleList.push(tempModule)
                })
                console.log(moduleList)
                this.importModuleList = moduleList
              })

              let zipEntries = []

              zip.forEach(function (relativePath, zipEntry) { 
                zipEntries.push(zipEntry)
                });

              if(!zipEntries.includes('wiki_content/home.html')) this.isCourseBuilder = false

              zip
              .file("wiki_content/home.html")
              .async("string")
              .then(data => {
                let parser = new DOMParser()
                let home = parser.parseFromString(data, "text/html")
                let homeBanner = home.querySelectorAll('.STV1_Banner')[0]
                if (homeBanner) this.isCourseBuilder = true
                else {
                  this.isCourseBuilder = false
                }
              }, (err) => {
                this.isCourseBuilder = false
                console.log(err)
              })

            })
      this.packageImportData = file
      this.hasPackageImportData = !!this.packageImportData
    },
    performCBPackageImport() {
      JSZip.loadAsync(this.packageImportData)
        .then(zip => { 
          this.sliceWeek(this.importModuleList.length)
          this.importModuleList.forEach( (module, index) => {
            this.updateWeek(index, 'title', module.title)
            this.updateWeek(index, 'date', 'hidden')

              zip
                .file(module.sessions[0])
                .async("string")
                .then(data => {
                  let parser = new DOMParser()
                  let sessionPage = parser.parseFromString(data, "text/html")
                  let sessionTitle = sessionPage.getElementsByTagName('h3')[0].innerHTML
                  // if (sessionTitle) this.updateWeek(index, 'title', sesstionTitle)

                  let sessionBody = sessionPage.querySelectorAll('.content-slot')[0].innerHTML
                  this.updateWeek(index, 'body', sessionBody)

                  let sessionVideos = sessionPage.querySelectorAll('.grid-row')

                  console.log(sessionVideos)

                  sessionVideos.forEach( video => {
                    let source = video.querySelector('iframe').getAttribute('src')
                    let title = video.getElementsByTagName('h3')[0].innerHTML.replace('&amp;', '&')
                    let description = video.getElementsByTagName('blockquote')[0].getElementsByTagName('div')[1].innerHTML

                    this.$store.dispatch("addVideo", {index, data: {source, title, description}})
                  })
                })
            })

        })
    },
    performPackageImport() {
      this.updateProp('url', `https://courseworks2.columbia.edu/courses/${this.courseId}/`)
      this.updateProp('title', this.courseTitle)
      JSZip.loadAsync(this.packageImportData)
        .then(zip => {
          this.sliceWeek(this.importModuleList.length)
          this.importModuleList.forEach( (module, index) => {
            console.log(module.title)
            this.updateWeek(index, 'title', module.title)
            this.updateWeek(index, 'date', 'hidden')

            module.moduleAssignments.forEach ( assignment => {
              this.$store.dispatch("addAssignment", {index, data: {link: '$CANVAS_OBJECT_REFERENCE$/assignments/' + assignment.id, 
              manifestID: assignment.id, due:'hidden'}})
            })
            module.moduleQuizes.forEach ( quiz => {
              zip
                .file(quiz + '/assessment_meta.xml')
                .async("string")
                .then(data => {
                  let parser = new DOMParser()
                  let quizInfo = parser.parseFromString(data, "text/xml")
                  let quizID = quizInfo.querySelector('quiz > assignment').getAttribute('identifier')
                  this.$store.dispatch("addQuiz", {index, data: {link: '$CANVAS_OBJECT_REFERENCE$/assignments/' + quizID, 
                  manifestID: quiz, due:'hidden'}})

                })

            })
            module.moduleDiscussions.forEach ( discussion => {
              this.$store.dispatch("addDiscussion", {index, data: {link: '$CANVAS_OBJECT_REFERENCE$/discussion_topics/' + discussion, 
              manifestID: discussion, due:'hidden'}})
            })
            
            module.sessions.forEach( (session, sessionIndex) => {
              zip
                .file(session)
                .async("string")
                .then(data => {
                  let parser = new DOMParser()
                  let pageHtml = parser.parseFromString(data, "text/html")
                  let videoFrames = Array.from(pageHtml.getElementsByTagName('iframe'))

                  let pageTitle = pageHtml.getElementsByTagName('title')[0].innerHTML
                  let pageFiles = pageHtml.querySelectorAll('.instructure_file_link')
                  let pageBody = pageHtml.body.innerHTML

                  let nonBodyStrings = ['FAQ', 'PROJECT', 'ASSIGNMENT']

                  console.log(pageHtml)
                  console.log(pageBody)

                  console.log(pageFiles)
                  if (videoFrames) {
                    videoFrames.forEach(video => {

                      // If the video source starts with $CANVAS_COURSE_REFERENCE$ the browser will take it as
                      // a static file, but it's a video from courserworks2. So we need to replace the link
                      let videoSource = video.src
                      // if (videoSource.includes(`$CANVAS_COURSE_REFERENCE$`))
                      //   videoSource = videoSource
                      //     .replace(
                      //       '$CANVAS_COURSE_REFERENCE$', 'http://www.placeholderurl.org') // `${this.info.url}`


                      let data = {
                        source: videoSource,
                        title: pageTitle,
                        description: "This video lecture covers topics in " + pageTitle.replace(/[0-9]*\.?[0-9]*/, '').replace(/^ +/gm, '') + 
                        '. Please watch the entire lecture before moving on to the next video.'
                      }

                      if (pageFiles.length > 0) {
                        data.description += `<p></p><p><a href="${this.info.url + pageFiles[0].href.replace(/[^$]*/i,'')}" rel="noopener noreferrer" target="_blank">Download Handout</a></p>`
                      }

                      this.$store.dispatch("addVideo", {index, data})
                    })
                  }
                    if (videoFrames.length < 1 && !nonBodyStrings.some(el => pageTitle.toUpperCase().includes(el))) {
                      let pageText = this.weeks[index].body + '<p></p>' + pageBody
                      this.updateWeek(index, 'body', pageText)

                      if (pageFiles.length > 0 && pageTitle.includes){
                        // console.log('Adding File: ', pageFiles[0].title)
                        // let description = this.weeks[index].body += `<p></p><p><a href="${this.info.url + pageFiles[0].href.replace(/[^$]*/i,'')}" rel="noopener noreferrer" target="_blank">Download Handout: ${pageFiles[0].title}</a></p>`
                        // this.updateWeek(index, 'body', description)
                      }
                      }
                    
                  
              }, (err) => {
                console.error(err)
              })
            })

            this.$router.push({ path: "/activities" })

          })
        })
    },

    exportIMSCC() {
      let serializer = new XMLSerializer()
      let footer = "</body> </html>"

      //Clean Data
      this.updateProp("url", this.parseUrl(this.info.url))
      this.info.tas.forEach((ta, index) => {
        if (!validator.isEmail(ta.email)) this.updateUser(this.info.tas[index],'email', 'invalidemail@pleasereplace.com')
      })
      this.info.profs.forEach((prof, index) => {
        if (!validator.isEmail(prof.email)) this.updateUser(this.info.profs[index],'email', 'invalidemail@pleasereplace.com')
      })

      JSZipUtils.getBinaryContent("static/files/clean-course.imscc", (err, data) => {
        if (err) {
          throw err // or handle err
        }

        JSZip.loadAsync(data).then(zip => {
          zip.file("wiki_content/home.html", headings.home + this.$refs.home.returnCode() + footer)
          console.log(this.$refs.syllabus.returnCode())
          zip.file(
            "course_settings/syllabus.html",
            headings.syllabus + this.$refs.syllabus.returnCode() + footer
          )

          zip.file("wiki_content/activities.html", headings.list + this.$refs.list.returnCode() + footer)

          let weekly_redirect_url = '<lticm:property name="url">' + this.info.url + "pages/activities</lticm:property>"
          let zoom_redirect_url = '<lticm:property name="url">' + this.info.url + "pages/zoom</lticm:property>"
          let student_list_redirect_url = '<lticm:property name="url">' + this.info.url + "pages/students</lticm:property>"

          // if (this.info.useZoom) {
          //   zip.file("wiki_content/zoom.html", headings.zoom + this.$refs.zoom.returnCode("zoom-code") + footer)
          // }

          if(this.info.useStudents){
            zip.file(
              "wiki_content/students.html",
              headings.studentList + this.$refs.studentsList.returnCode("students-list-code") + footer
            )
            zip.file(
              "ccb-student-list-redirect.xml",
              headings.student_list_redirect_top + student_list_redirect_url + headings.redirect_bottom
            )
          }

          zip.file(
            "ccb-weekly-redirect.xml",
            headings.weekly_redirect_top + weekly_redirect_url + headings.redirect_bottom
          )
          // zip.file("ccb-zoom-redirect.xml", headings.zoom_redirect_top + zoom_redirect_url + headings.redirect_bottom)

          // Add info to manifest
          zip
            .file("imsmanifest.xml")
            .async("string")
            .then(data => {
              let parser = new DOMParser()
              let manifest = parser.parseFromString(data, "text/xml")

              //add students

              let renderRest = () => {
              console.log("rendering rest...")

              if (this.info.useStudents){
                addResource({
                  xml: manifest,
                  type: "redirect",
                  iden: "ccb-student-list-redirect",
                  link: "ccb-student-list-redirect.xml"
                })
                for (let i = 1; i <= this.info.students.length; i++) {
                  let title = "<title>Student " + i + "</title>"
                  let iden = '<meta name="identifier" content="ccb-student' + i + '"/>'
                  let el = document.getElementById("student-box" + (i - 1))
                  let code = el.innerHTML.replace(/\bdata-v-\S+\"/gi, "")
                  zip.file(
                    "wiki_content/student-" + i + ".html",
                    headings.top + title + iden + headings.bottom + code + footer
                  )
                  addResource({
                    xml: manifest,
                    iden: "ccb-student-" + i,
                    link: "wiki_content/pages/student-" + i
                  })
                }
                addResource({ xml: manifest, iden: "ccb-student-list", link: "wiki_content/pages/students" })

              }

              // addResource({ xml: manifest, iden: "ccb-zoom", link: "wiki_content/pages/zoom" })
              addResource({ xml: manifest, iden: "ccb-weekly-list", link: "wiki_content/pages/activities" })

              this.weeks.forEach((week, weekIndex) => {
                week.discussions.forEach((discussion, discussionIndex) => {
                  addResource({
                    xml: manifest,
                    type: "discussion",
                    iden: discussion.manifestID,
                    meta: discussion.manifestID + "-meta"
                  })

                  let discussionTemplate = this.readLocalXML("../../static/files/xml-templates/discussion.xml")
                  let discussionMetaTemplate = this.readLocalXML("../../static/files/xml-templates/discussion_meta.xml")

                  let discussionTitle = discussionTemplate.getElementsByTagName("title")[0]
                  let discussionTopicMeta = discussionMetaTemplate.getElementsByTagName("topicMeta")[0]
                  let discussionTopicID = discussionMetaTemplate.getElementsByTagName("topic_id")[0]
                  let discussionMetaTitle = discussionMetaTemplate.getElementsByTagName("title")[0]

                  discussionTitle.innerHTML = discussionMetaTitle.innerHTML =
                    "Session " + (weekIndex + 1) + " - Discussion " + (discussionIndex + 1)
                  discussionTopicMeta.setAttribute("identifier", discussion.manifestID + "-meta")
                  discussionTopicID.innerHTML = discussion.manifestID

                  let discussionString = serializer.serializeToString(discussionTemplate)
                  let discussionMetaString = serializer.serializeToString(discussionMetaTemplate)
                  zip.file(discussion.manifestID + ".xml", discussionString)
                  zip.file(discussion.manifestID + "-meta" + ".xml", discussionMetaString)
                })

                week.assignments.forEach((assignment, assignmentIndex) => {
                  addResource({
                    xml: manifest,
                    type: "assignment",
                    iden: assignment.manifestID
                  })

                  let assignmentHTML = document.implementation.createHTMLDocument()
                  assignmentHTML.title = "Session " + (weekIndex + 1) + " - Assignment " + (assignmentIndex + 1)
                  zip.file(assignment.manifestID + "/" + assignment.manifestID + ".html", assignmentHTML.documentElement.innerHTML)

                  let assignmentSettings = this.readLocalXML("../../static/files/xml-templates/assignment_settings.xml")
                  let assignmentTag = assignmentSettings.getElementsByTagName("assignment")[0]
                  let assignmentTitle = assignmentSettings.getElementsByTagName("title")[0]
                  let assignmentDue = assignmentSettings.getElementsByTagName("due_at")[0]
                  let assignmentLock = assignmentSettings.getElementsByTagName("lock_at")[0]
                  let assignmentUnlock = assignmentSettings.getElementsByTagName("unlock_at")[0]

                  console.log(assignmentUnlock)
                  console.log(moment(week.date).format())

                  assignmentTag.setAttribute("identifier", assignment.manifestID)
                  assignmentTitle.innerHTML = "Session " + (weekIndex + 1) + " - Assignment " + (assignmentIndex + 1)
                  assignmentDue.innerHTML = assignmentLock.innerHTML = moment(assignment.due).format()
                  assignmentUnlock.innerHTML = moment(week.date).format()

                  let assignmentSettingsString = serializer.serializeToString(assignmentSettings)
                  zip.file(assignment.manifestID + "/assignment_settings.xml", assignmentSettingsString)
                })
              })

              let manifestString = serializer.serializeToString(manifest)
              console.log(manifest)
              zip.file("imsmanifest.xml", manifestString)

              let today = new Date()
              let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
              let time = today.getHours() + "-" + today.getMinutes()
              let dateTime = date + " " + time

              zip.generateAsync({ type: "blob" }).then(blob => {
                saveFile({
                  name: this.info.title + " (" + dateTime + ").imscc",
                  data: blob
                })
              })
            }
            
            let renderWeek = (i) => {
              let title = "<title>" + this.weeks[(i-1)].title + "</title>"
              let iden = '<meta name="identifier" content="ccb-session' + i + '"/>'
              let code
              let activityID = this.weeks[(i-1)].id

              let convertedTitle = this.weeks[(i-1)].title.replace(/\./g,'-dot-').replace(/\s+/g, '-').toLowerCase()

              this.setStateField({field: 'selectedWeekID', value: activityID}).then( (res) => {
                console.log('id', `activity-${activityID}`)
                code = this.$refs[`activity-${activityID}`][0].returnCode()

                zip.file(
                  "wiki_content/" + convertedTitle + ".html",
                  headings.top + title + iden + headings.bottom + code + footer
                )
                addResource({
                  xml: manifest,
                  iden: "ccb-session-" + i,
                  link: "wiki_content/pages/" + convertedTitle
                })
                console.log(code)
                if (i+1 <= this.weeks.length) renderWeek(i+1)
                else renderRest()
              })
            }

            renderWeek(1)

            })
        })
      })

      function addResource(options) {
        let { xml, iden, link, type = "page", meta } = options
        let resource = xml.createElement("resource")
        let file = xml.createElement("file")
        resource.appendChild(file)

        let resourceList = xml.getElementsByTagName("resources")[0]

        resource.setAttribute("identifier", iden)

        switch (type) {
          case "page":
            resource.setAttribute("type", "webcontent")
            resource.setAttribute("href", link)
            file.setAttribute("href", link)
            break
          case "discussion":
            resource.setAttribute("type", "imsdt_xmlv1p1")
            resource.setAttribute("href", iden + ".xml")
            file.setAttribute("href", iden + ".xml")

            let depend = xml.createElement("dependency")
            depend.setAttribute("identifierref", meta)
            resource.appendChild(depend)

            let metaResource = xml.createElement("resource")
            let metaFile = xml.createElement("file")
            metaResource.appendChild(metaFile)
            metaResource.setAttribute("identifier", meta)
            metaResource.setAttribute("type", "associatedcontent/imscc_xmlv1p1/learning-application-resource")
            metaResource.setAttribute("href", meta + ".xml")
            metaFile.setAttribute("href", meta + ".xml")

            resourceList.appendChild(metaResource)
            break
          case "assignment":
            resource.setAttribute("type", "associatedcontent/imscc_xmlv1p1/learning-application-resource")
            resource.setAttribute("href", iden + "/" + iden + ".html")
            file.setAttribute("href", iden + "/" + iden + ".html")

            let settingsFile = xml.createElement("file")
            resource.appendChild(settingsFile)
            settingsFile.setAttribute("href", iden + "/assignment_settings.xml")
            break
          case "redirect":
            resource.setAttribute("type", "imsbasiclti_xmlv1p0")
            resource.setAttribute("href", link)
            file.setAttribute("href", link)
            break
          default:
            break
        }

        resourceList.appendChild(resource)
      }

      // add wait function?
      setTimeout(() => {
        this.exportJSON()
      }, 1500)
    },
    performImport() {
      this.$store.dispatch('updateState', this.importData.store)
      /*
      this.updateInfo(this.importData.store.info)
      this.updateTheme(this.importData.store.theme.theme)

      if (!this.info.students) this.info.students = []

      this.importData.store.weeks.forEach(week => {
        if (!week.cases) week.cases = []
      })

      this.updateWeeks(this.importData.store.weeks)
      this.$router.push({ path: "/home" })
      */
     alert('Data imported successfully!')
      this.$router.push({ path: "/home" })
    },
    exportJSON() {
      this.exportData = {}
      this.exportDataIfPossible()
    },
    exportDataIfPossible() {
      console.log("here")

      let waitTime = 0

      // get store
      this.exportData.store = this.$store.getters.getStore

      let today = new Date()
      let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
      let time = today.getHours() + "-" + today.getMinutes()
      let dateTime = date + " " + time

      // save file as json
      console.log("exporting..")
      setTimeout(() => {
        saveFile({
          name: this.$store.state.info.title + " (" + dateTime + ").json",
          data: JSON.stringify(this.exportData)
        })
      }, waitTime)
    },
    readLocalXML(path) {
      var output = null
      var xmlhttp = new XMLHttpRequest()
      xmlhttp.open("GET", path, false)
      xmlhttp.send()
      if (xmlhttp.status == 200) {
        output = xmlhttp.responseText
      }
      let parser = new DOMParser()
      let parsedXML = parser.parseFromString(output, "text/xml")
      return parsedXML
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

.export-container {
  width: 100%;
  text-align: center;
}

.export-button {
  width: 80px;
  height: 50px;
}

.center {
  text-align: center;
}
</style>
