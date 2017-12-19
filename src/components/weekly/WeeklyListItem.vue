<template lang="html">
  <div class="content-box">
    <div class="grid-row top-xs">
      <div class="col-xs-4">
        <div class="styleguide-section__grid-demo-element">
          <a :title="'Week ' + index" :href='url + "pages/week-" + index' :data-api-endpoint='url + "pages/week-" + index' data-api-returntype="Page">
            <img class="crop STV1_WeeklyIconIMG" :src="server + 'week' + index + '.png'" alt=""  />
          </a>
        </div>
      </div>
      <div class="col-xs-8">
        <div class="styleguide-section__grid-demo-element">
          <a :title="'Week ' + index" :href='url + "pages/week-" + index' :data-api-endpoint='url + "pages/week-" + index' data-api-returntype="Page">
            <div class="STV1_Welcome">Week {{index}}: {{data.title}} </div>
          </a>
          <p>{{data.description}}</p>
          <p>{{data.date}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'

export default {
  data(){
    return{
      url: store.courseUrl.replace(/\/?(\?|#|$)/, '/$1'),
      server: this.$store.state.imageServer
    }
  },
  methods: {
    resizeUrl(url) {

      // If using, put :src="resizeUrl(data.imgSrc)" above

      let parts = url.split('/')
      return 'https://i.scaley.io/350x160/' + parts.slice(2).join('/');
      // let parts = url.split('/')
      // parts[2] += '.rsz.io'
      // parts[parts.length - 1] += '?width=350&height=150&mode=crop'
      // return parts.join('/')
    }
  },
  props: ['data', 'index'],
  mounted(){
    setInterval( () => {
      this.url = store.courseUrl.replace(/\/?(\?|#|$)/, '/$1')
    }, 1000);
  }
}
</script>

<style lang="css">
  .crop {
    /*width: 350px;
    height: 150px;
    object-fit: cover;*/
  }
</style>
