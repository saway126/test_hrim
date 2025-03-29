<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <div class="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">회원가입</h2>
  
        <input
          type="text"
          placeholder="이름"
          class="w-full p-3 border border-gray-300 rounded mb-4"
          v-model="form.name"
        />
        <input
          type="email"
          placeholder="이메일"
          class="w-full p-3 border border-gray-300 rounded mb-4"
          v-model="form.email"
        />
        <input
          type="text"
          placeholder="아이디"
          class="w-full p-3 border border-gray-300 rounded mb-4"
          v-model="form.username"
        />
        <input
          type="password"
          placeholder="비밀번호"
          class="w-full p-3 border border-gray-300 rounded mb-6"
          v-model="form.password"
        />
  
        <button
          class="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          @click="submit"
        >
          회원가입
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const form = reactive({
    name: '',
    email: '',
    username: '',
    password: ''
  })
  
  const submit = () => {
    console.log('회원가입 데이터:', form)
    alert(`${form.username}님, 환영합니다! 🎉`)
  }
  </script>
  