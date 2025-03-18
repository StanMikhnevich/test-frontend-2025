<template>
  <ul class="pagination w-full flex flex-row justify-center items-center gap-2">
    <li>
      <button v-if="page > 1" @click="prev" class="btn btn-sm">←</button>
    </li>
    <li>
      <button @click="next" class="btn btn-sm">→</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'v-pagination',

  emits: ['update:modelValue'],

  props: {
    page: { type: Number, default: 1 },
  },

  methods: {
    prev() {
      this.$emit('update:modelValue', this.page - 1);
    },
    next() {
      this.$emit('update:modelValue', this.page + 1);
    }
  }

}
</script>
