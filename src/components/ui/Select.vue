<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="w-full mb-2 flex justify-left gap-2">
      <span v-if="label">{{ label }}</span>
    </label>

    <select
      class="input w-full"
      @change="$emit('update:modelValue', $event.target.value)"
      :id="id"
      :title="label"
      :required="required"
      :disabled="disabled"
    >
      <option v-if="placeholder.length > 0" value="" selected>{{ placeholder }}</option>

      <option
        v-for="option in options"
        :key="option[idKey]"
        :value="option[idKey]"
        :selected="option[idKey] === selected"
      >
        {{ option[valueKey] }}
      </option>
    </select>

    <div v-show="hasErrors" class="text-sm text-red-500">
      <ul>
        <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-select',

  emits: ['update:modelValue'],

  props: {
    label: String,
    id: String,
    placeholder: { type: String, default: '- вибрати -' },
    modelValue: { type: [String, Number], default: '' },

    selected: { type: [String, Number], default: -1 },
    required: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },

    options: { type: Array, default: () => [] },

    idKey: { type: String, default: 'id' },
    valueKey: { type: String, default: 'name' },

    errors: { type: Array, default: () => [] },
  },

  computed: {
    hasErrors() {
      return Object.keys(this.errors).length > 0
    },
  },
}
</script>
