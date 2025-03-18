<template>
  <div
    @click.stop="$emit('hide')"
    class="modal w-full h-full fixed top-0 left-0 fade z-10 backdrop-blur-md overflow-y-auto cursor-pointer"
    :class="bg"
    role="dialog"
    aria-modal="true"
  >
    <div
      @click.stop
      :class="w"
      class="modal-frame m-auto my-20 p-4 bg-white rounded-xl shadow-xl transform transition-all cursor-default"
    >
      <div class="modal-header flex justify-between mb-5">
        <h2 class="modal-title font-semibold text-xl">{{ title }}</h2>
        <div @click="$emit('hide')" class="cursor-pointer">&#10005;</div>
      </div>

      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-modal',

  props: {
    title: { type: String, default: 'Modal title' },
    bg: { type: String, default: 'bg-white/20' },

    w: String,
  },
}
</script>
