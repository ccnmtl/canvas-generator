<template>
  <div id="app">
    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center uk-grid-match" uk-grid>
      <div>
        <div class="uk-background-primary uk-padding uk-light">
          <h1>IMPORT</h1>
          <p>
            If you have previously saved an export file from this version of Coursebuilder you can use the input below to import all of the data into this
            session. Warning! This will overwrite all information you have currently entered.
          </p>
              <div class="uk-box-shadow-large uk-padding-small uk-padding-remove-bottom">
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
              </div>
               <div class="uk-box-shadow-large uk-padding-small uk-padding-remove-bottom" v-if="false">
                    <h4>Select an ".imscc" file from a canvas course export</h4>
                      <form>
                      <button
                        class="uk-button uk-button-default"
                        v-if="hasPacakgeImportData"
                        @click.prevent="performPackageImport"
                      >File read successfully! Click here to confirm import.</button>
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
      <div>
        <div class="uk-background-secondary uk-padding uk-light">
          <h1>EXPORT</h1>
          <p>
            If you have completed your class or want to save the data you have previously submitted, click the export button to
            save a ".json" file that you can import at a later date (using the import section to the left).
          </p>
          <br />
          <br />
          <br />
          <button
            class="uk-button-large uk-button-default"
            type="button"
            name="button"
            @click="exportJSON"
          >Export</button>
          <!-- <button class="uk-button-large uk-button-default" type="button" name="button" @click="testChildren">Test</button> -->
          <button
            class="uk-button-large uk-button-default"
            type="button"
            name="button"
            @click="exportIMSCC"
          >IMSCC</button>
        </div>
      </div>
    </div>

    <home-view v-show="false" ref="home"></home-view>
    <syllabus-view v-show="false" ref="syllabus"></syllabus-view>
    <list-view v-show="false" ref="list"></list-view>
    <div v-for="n in (weeks.length)" :key="n">
      <week-view v-show="false" :idx="n-1" :ref="'week'+ n"></week-view>
    </div>

    <div class="clearfix"></div>

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left uk-margin-medium-top" uk-grid>
      <div class="uk-background-muted uk-padding">
        <p>Copyright © Columbia University. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../bus"
import saveFile from "../util/save-file"
import mutations from "../store/mutations"
import JSZip from "jszip"
import JSZipUtils from "jszip-utils"

import homeView from "./render/homeView"
import syllabusView from "./render/syllabusView"
import weekView from "./render/weekView"
import listView from "./render/listView"

import headings from "../store/export-headings"
import moment from "moment"

export default {
  name: "Export",
  data() {
    return {
      hasImportData: false,
      fullscreenLoading: false,
      exportData: {}
    }
  },
  computed: {
    loading: {
      get() {
        return this.$store.getters.loading
      },
      set(payload) {
        this.$store.commit("updateLoading", payload)
      }
    }
  },
  components: { homeView, syllabusView, weekView, listView },
  mixins: [mutations],
  mounted() {
    let manifest = this.readLocalXML("../../static/files/Clean Course/course_settings/course_settings.xml")
    console.log(manifest)
  },
  methods: {
    // openFullScreen() {
    //     this.fullscreenLoading = true;
    //     setTimeout(() => {
    //       this.fullscreenLoading = false;
    //     }, 2000);
    // },
    testChildren() {
      this.updateProp("url", this.parseUrl(this.info.url))
      setTimeout(() => {
        let code = this.$refs.home.returnCode()
        console.log(code)
      }, 50)
    },
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
    exportIMSCC() {
      let serializer = new XMLSerializer()
      let footer = "</body> </html>"
      this.updateProp("url", this.parseUrl(this.info.url))

      JSZipUtils.getBinaryContent("static/files/clean-course.imscc", (err, data) => {
        if (err) {
          throw err // or handle err
        }

        JSZip.loadAsync(data).then(zip => {
          console.log(zip)
          zip.file("wiki_content/home.html", headings.home + this.$refs.home.returnCode() + footer)
          zip.file("wiki_content/weekly-activities.html", headings.list + this.$refs.list.returnCode() + footer)
          zip.file("course_settings/syllabus.html", headings.syllabus + this.$refs.syllabus.returnCode() + footer)

          let redirect_url = '<lticm:property name="url">' + this.info.url + "pages/weekly-activities</lticm:property>"

          zip.file("ccb-weekly-redirect.xml", headings.redirect_top + redirect_url + headings.redirect_bottom)

          // Add info to manifest
          zip
            .file("imsmanifest.xml")
            .async("string")
            .then(data => {
              let parser = new DOMParser()
              let manifest = parser.parseFromString(data, "text/xml")

              //add weeks
              for (let i = 1; i <= this.weeks.length; i++) {
                let title = "<title>Week " + i + "</title>"
                let iden = '<meta name="identifier" content="ccb-week' + i + '"/>'
                let el = document.getElementById("week-box" + (i - 1))
                let code = el.innerHTML.replace(/\bdata-v-\S+\"/gi, "")
                zip.file(
                  "wiki_content/week-" + i + ".html",
                  headings.top + title + iden + headings.bottom + code + footer
                )
                addResource({
                  xml: manifest,
                  iden: "ccb-week-" + i,
                  link: "wiki_content/pages/week-" + i
                })
              }

              this.weeks.forEach((week, weekIndex) => {
                week.discussions.forEach((discussion, discussionIndex) => {
                  addResource({
                    xml: manifest,
                    type: "discussion",
                    iden: discussion.id,
                    meta: discussion.id + "-meta"
                  })

                  let discussionTemplate = this.readLocalXML("../../static/files/xml-templates/discussion.xml")
                  let discussionMetaTemplate = this.readLocalXML("../../static/files/xml-templates/discussion_meta.xml")

                  let discussionTitle = discussionTemplate.getElementsByTagName("title")[0]
                  let discussionTopicMeta = discussionMetaTemplate.getElementsByTagName("topicMeta")[0]
                  let discussionTopicID = discussionMetaTemplate.getElementsByTagName("topic_id")[0]
                  let discussionMetaTitle = discussionMetaTemplate.getElementsByTagName("title")[0]

                  discussionTitle.innerHTML = discussionMetaTitle.innerHTML =
                    "Session " + (weekIndex + 1) + " - Discussion " + (discussionIndex + 1)
                  discussionTopicMeta.setAttribute("identifier", discussion.id + "-meta")
                  discussionTopicID.innerHTML = discussion.id

                  let discussionString = serializer.serializeToString(discussionTemplate)
                  let discussionMetaString = serializer.serializeToString(discussionMetaTemplate)
                  zip.file(discussion.id + ".xml", discussionString)
                  zip.file(discussion.id + "-meta" + ".xml", discussionMetaString)
                })

                week.assignments.forEach((assignment, assignmentIndex) => {
                  addResource({
                    xml: manifest,
                    type: "assignment",
                    iden: assignment.id
                  })

                  let assignmentHTML = document.implementation.createHTMLDocument()
                  assignmentHTML.title = "Session " + (weekIndex + 1) + " - Assignment " + (assignmentIndex + 1)
                  zip.file(assignment.id + "/" + assignment.id + ".html", assignmentHTML.documentElement.innerHTML)

                  let assignmentSettings = this.readLocalXML("../../static/files/xml-templates/assignment_settings.xml")
                  let assignmentTag = assignmentSettings.getElementsByTagName("assignment")[0]
                  let assignmentTitle = assignmentSettings.getElementsByTagName("title")[0]
                  let assignmentDue = assignmentSettings.getElementsByTagName("due_at")[0]
                  let assignmentLock = assignmentSettings.getElementsByTagName("lock_at")[0]
                  let assignmentUnlock = assignmentSettings.getElementsByTagName("unlock_at")[0]

                  console.log(assignmentUnlock)
                  console.log(moment(week.date).format())

                  assignmentTag.setAttribute("identifier", assignment.id)
                  assignmentTitle.innerHTML = "Session " + (weekIndex + 1) + " - Assignment " + (assignmentIndex + 1)
                  assignmentDue.innerHTML = assignmentLock.innerHTML = moment(assignment.due).format()
                  assignmentUnlock.innerHTML = moment(week.date).format()

                  let assignmentSettingsString = serializer.serializeToString(assignmentSettings)
                  zip.file(assignment.id + "/assignment_settings.xml", assignmentSettingsString)
                })
              })

              let manifestString = serializer.serializeToString(manifest)
              console.log(manifest)
              zip.file("imsmanifest.xml", manifestString)

              zip.generateAsync({ type: "blob" }).then(blob => {
                saveFile({
                  name: this.info.title + "_export.imscc",
                  data: blob
                })
              })
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
          default:
            break
        }

        resourceList.appendChild(resource)
      }
    },
    // old imscc exporter
    exportIMSCCOld() {
      let footer = "</body> </html>"

      this.updateProp("url", this.parseUrl(this.info.url))

      JSZipUtils.getBinaryContent("static/files/weekly-template.imscc", (err, data) => {
        if (err) {
          throw err // or handle err
        }

        JSZip.loadAsync(data).then(zip => {
          zip.file("wiki_content/home.html", headings.home + this.$refs.home.returnCode() + footer)
          zip.file("wiki_content/weekly-activities.html", headings.list + this.$refs.list.returnCode() + footer)
          zip.file("course_settings/syllabus.html", headings.syllabus + this.$refs.syllabus.returnCode() + footer)

          for (let i = 1; i <= this.weeks.length; i++) {
            let title = "<title>Week " + i + "</title>"
            let iden = '<meta name="identifier" content="' + headings.week_ids[i - 1] + '"/>'
            let el = document.getElementById("week-box" + (i - 1))
            let code = el.innerHTML.replace(/\bdata-v-\S+\"/gi, "")
            zip.file("wiki_content/week-" + i + ".html", headings.top + title + iden + headings.bottom + code + footer)
          }

          let redirect_url = '<lticm:property name="url">' + this.info.url + "pages/weekly-activities</lticm:property>"

          zip.file(
            "ic0780a1b3ec00e092caacf7b0d3865e4.xml",
            headings.redirect_top + redirect_url + headings.redirect_bottom
          )

          zip.generateAsync({ type: "blob" }).then(blob => {
            saveFile({
              name: this.info.title + "_export.imscc",
              data: blob
            })
          })
        })
      })
    },
    performImport() {
      this.$store.commit("updateInfo", this.importData.store.info)
      this.$store.commit("updateTheme", this.importData.store.theme.theme)

      this.importData.store.weeks.forEach(week => {
        if (!week.cases) week.cases = []
      })

      this.$store.commit("updateWeeks", this.importData.store.weeks)
      this.$router.push({ path: "/home" })
    },
    exportJSON() {
      this.exportData = {}
      this.exportDataIfPossible()
    },
    exportDataIfPossible() {
      console.log("here")

      let waitTime = 0

      let today = new Date()
      let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
      let time = today.getHours() + "-" + today.getMinutes()
      let dateTime = date + " " + time

      // get store
      this.exportData.store = this.$store.getters.getStore

      // save file as json
      console.log("exporting..")
      setTimeout(() => {
        saveFile({
          name: this.$store.state.info.title + " " + dateTime + ".json",
          data: JSON.stringify(this.exportData)
        })
      }, waitTime)
    },
    onImportFileChange2(changeEvent) {
      let homeHeading = `
      <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Home</title>
        <meta name="identifier" content="i95bef606c8b4f001957aa6848c66310f" />
        <meta name="editing_roles" content="teachers" />
        <meta name="workflow_state" content="active" />
        <meta name="front_page" content="true" />
      </head>
      <body>`

      let homeFooter = "</body> </html>"

      this.updateProp("url", this.parseUrl(this.info.url))

      let files = changeEvent.target.files
      JSZip.loadAsync(files[0]).then(zip => {
        zip.file("wiki_content/home.html", homeHeading + this.$refs.home.returnCode() + homeFooter)
        zip.generateAsync({ type: "blob" }).then(blob => {
          saveFile({
            name: this.info.title + "_export.imscc",
            data: blob
          })
        })
        // zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
        // });
      })
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
