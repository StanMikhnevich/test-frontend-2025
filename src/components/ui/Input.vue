<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="w-full mb-2 flex justify-left gap-2">
      <span v-if="label">{{ label }}</span>
    </label>

    <input
      class="input"
      :type="type"
      @change="$emit('update:modelValue', $event.target.value)"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
    />

    <div v-show="hasErrors" class="text-sm text-red-500">
      <ul>
        <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-input',

  emits: ['update:modelValue'],

  props: {
    label: String,
    placeholder: String,
    id: String,

    type: { type: String, default: 'text' },

    errors: { type: Array, default: () => [] },

    modelValue: { type: [String, Number], default: '' },

    autofocus: { type: Boolean, default: false },
    required: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
  },

  computed: {
    hasErrors() {
      return Object.keys(this.errors).length > 0
    },
  },
}
</script>
