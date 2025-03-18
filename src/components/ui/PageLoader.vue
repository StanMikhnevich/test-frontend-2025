<template>
  <div class="page-loader w-full absolute top-0 left-0 right-0">
    <div
      role="status"
      :style="`width: ${progress}%`"
      class="bg-blue-500 transition-all duration-500"
      :class="isVisible"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'v-page-loader',

  props: {
    loading: Boolean,
  },

  data() {
    return {
      visible: true,
      progress: 0,
      multiplier: 0.1,
      interval: 100,
      intervalId: 0,
    }
  },

  computed: {
    isVisible() {
      return {
        'h-0': !this.visible,
        'h-1': this.visible,
      }
    },
  },

  watch: {
    loading(newState) {
      this.progress = newState ? -50 : 100
      this.start()
    },
  },

  methods: {
    start() {
      this.visible = true

      let intervalId = setInterval(() => {
        let incrementBy = 0

        if (this.progress < 50) {
          incrementBy = 10
        } else if (this.progress < 75) {
          incrementBy = 5
        } else if (this.progress < 90) {
          incrementBy = 2
        } else if (this.progress < 95) {
          incrementBy = 1
        } else if (this.progress < 98) {
          incrementBy = 0.25
        } else {
          incrementBy = 0.1
        }

        this.progress = Math.min(this.progress + incrementBy * this.multiplier, 100)
      }, this.interval)

      if (this.progress === 100) {
        clearInterval(intervalId)
        this.hide()
      }
    },

    hide() {
      setTimeout(() => {
        this.visible = false
      }, 300)
    },
  },

  created() {
    this.start()
  },
}
</script>
