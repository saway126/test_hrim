<template>
    <div class="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
      <img :src="profileImage" class="w-24 h-24 rounded-full object-cover" alt="프로필" />
      <div>
        <h3 class="text-xl font-semibold">{{ name }}</h3>
        <p class="text-gray-600">{{ email }}</p>
        <p class="text-gray-600">{{ phone }}</p>
        <p class="text-gray-600">{{ team }} / {{ role }}</p>
        <span class="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">{{ status }}</span>
        <p class="text-gray-400 text-sm mt-1">등록일: {{ createdAt }}</p>
      </div>
      <div class="md:ml-auto">
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">수정</button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['profileImage', 'name', 'email', 'phone', 'team', 'role', 'status', 'createdAt'])
  </script>
  