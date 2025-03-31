<template>
    <div class="flex space-x-4 border-b pb-2 mb-4">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="$emit('update:modelValue', tab)"
        :class="tab === modelValue ? 'font-semibold text-blue-600' : 'text-gray-500'"
      >
        {{ tab }}
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    tabs: Array,
    modelValue: String
  })
  defineEmits(['update:modelValue'])
  </script>
  