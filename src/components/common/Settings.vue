<template>
  <div data-hidden class="settings-shadow">
    <transition appear name="slide">
      <div class="settings-inner">
        <h2>
          Slot Settings
          <span @click="$store.dispatch('setSettingsVisibility', false)"><i class="el-icon-close" /></span>
        </h2>

      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Settings",
  props: [
    'type',
    'data',
  ],
  data() {
    return {
      showSettings: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-shadow {
  width: 100%;
  height: 100%;
  background: #00000099;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  .settings-inner {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    background: #FFF;
    width: 30%;
    max-width: 340px;

    h2 {
      text-align: center;
      padding: 12px 0 25px;

      span {
        float: right;

      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
  right: 0;
}
.slide-enter,
.slide-leave-to
{
  opacity: 0;
  right: -340px;
}
</style>
