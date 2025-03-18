<template>
  <div class="w-full mb-4">
    <div class="image-upload-preview mb-4" v-if="previewImage?.length > 0">
      <img :src="previewImage" alt="" class="size-80 mx-auto rounded-full border object-cover object-center" />
    </div>

    <label v-if="label" :for="id" class="w-full mb-2 flex justify-left gap-2">
      <span v-if="label">{{ label }}</span>
    </label>

    <input
      @change="preview($event)"
      :id="id"
      type="file"
      :name="name"
      :accept="accept"
      class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
      :placeholder="label"
      :required="required"
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
  name: 'v-input-image',

  emits: ['update:modelValue'],

  props: {
    label: String,
    id: String,
    name: { type: String, required: true, default: 'image' },

    accept: { type: Array, default: () => [] },
    required: { type: Boolean, default: true },

    modelValue: { type: [String, Number], default: '' },
    image: String,

    errors: { type: Array, default: () => [] },
  },

  computed: {
    hasErrors() {
      return Object.keys(this.errors).length > 0;
    }
  },

  methods: {
    preview(event) {
      const reader = new FileReader()

      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e) => {
        this.previewImage = e.target.result
      }

      this.$emit('update:modelValue', event.target.files[0])
    },
  },

  data() {
    return {
      previewImage: 'https://via.placeholder.com/70x70',
    }
  },

  mounted() {
    this.previewImage = this.image
  },
}
</script>
