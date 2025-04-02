<template>
    <div class="flex h-screen">
      <!-- 좌측 설명 -->
      <div class="w-1/2 bg-gradient-to-b from-blue-500 to-blue-600 text-white flex flex-col justify-center items-center">
        <h1 class="text-5xl font-bold mb-4">IM HR</h1>
        <p class="text-lg text-center w-3/4 leading-relaxed">
          기업의 모든 이해 관계자 가치를 높이고 <br />
          지속가능한 미래를 실현합니다.
        </p>
      </div>
  
      <!-- 우측 로그인 -->
      <div class="w-1/2 flex justify-center items-center bg-white">
        <div class="w-[400px] border-2 border-blue-300 rounded-xl p-8">
          <h2 class="text-center text-gray-700 mb-4">
            <span class="font-bold text-blue-600">IMHR</span> 에 오신걸 환영합니다.
          </h2>
  
          <form @submit.prevent="login" class="space-y-3">
            <input v-model="form.username" type="text" placeholder="아이디" class="input" />
            <input v-model="form.password" type="password" placeholder="비밀번호" class="input" />
  
            <!-- 사용자 유형 선택 -->
            <div class="flex justify-center items-center space-x-4">
              <label class="flex items-center space-x-1 text-sm">
                <input type="radio" v-model="form.role" value="admin" />
                <span>관리자</span>
              </label>
              <label class="flex items-center space-x-1 text-sm">
                <input type="radio" v-model="form.role" value="user" />
                <span>임직원</span>
              </label>
            </div>
  
            <!-- 로그인 버튼 -->
            <button type="submit"
                    class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              로그인
            </button>
  
            <!-- 회원가입 버튼들 -->
            <button type="button"
                    @click="goToSignUp('company')"
                    class="w-full py-2 border border-blue-400 text-blue-600 rounded hover:bg-blue-50">
              기업 회원가입
            </button>
  
            <button type="button"
                    @click="goToSignUp('employee')"
                    class="w-full py-2 border border-blue-400 text-blue-600 rounded hover:bg-blue-50">
              사원 회원가입
            </button>
          </form>
  
          <!-- 하단 링크 -->
          <div class="mt-4 text-center text-sm text-gray-500">
            <router-link to="/find-id" class="hover:underline">아이디 찾기</router-link>
            &nbsp;|&nbsp;
            <router-link to="/reset-password" class="hover:underline">비밀번호 재설정</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const form = ref({
    username: '',
    password: '',
    role: 'admin' // 기본값
  })
  
  const login = () => {
    console.log('로그인 정보:', form.value)
    alert(`${form.value.role === 'admin' ? '관리자' : '임직원'} 로그인 시도`)
  }
  
  const goToSignUp = (type) => {
    if (type === 'company') {
      router.push('/register/company')
    } else {
      router.push('/register/employee')
    }
  }
  </script>
  
  <style scoped>
  .input {
    @apply w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200;
  }
  </style>
  