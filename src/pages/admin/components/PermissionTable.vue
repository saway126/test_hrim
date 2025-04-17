<template>
    <div class="bg-white p-6 rounded-xl shadow">
      <h4 class="text-lg font-semibold mb-4">접근 권한</h4>
      <div class="grid grid-cols-2 gap-4">
        <label v-for="(permission, index) in permissionList" :key="index">
          <input type="checkbox" class="mr-2" v-model="checkedPermissions" :value="permission" />
          {{ permission }}
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue'
  const props = defineProps({
    permissionList: Array,
    modelValue: Array
  })
  const checkedPermissions = ref(props.modelValue)
  </script>
  