<template>
  <div class="flex h-screen">
    <!-- 좌측 IM HR 소개 -->
    <div class="w-1/2 bg-gradient-to-b from-blue-500 to-blue-600 text-white flex flex-col justify-center items-center">
      <h1 class="text-5xl font-bold mb-4">IM HR</h1>
      <p class="text-lg text-center w-3/4 leading-relaxed">
        기업의 모든 이해 관계자 가치를 높이고 <br />
        지속가능한 미래를 실현합니다.
      </p>
    </div>

    <!-- 우측 회원가입 폼 -->
    <div class="w-1/2 flex justify-center items-center bg-white">
      <div class="w-[400px] border-2 border-blue-300 rounded-xl p-8">
        <h2 class="text-xl font-bold text-center mb-6">관리자 회원 가입</h2>

        <form @submit.prevent="submitForm" class="space-y-4">
          <input v-model="form.name" type="text" placeholder="이름" class="input" />
          <input v-model="form.username" type="text" placeholder="아이디" class="input" />
          <input v-model="form.password" type="password" placeholder="비밀번호" class="input" />
          <input v-model="form.confirmPassword" type="password" placeholder="비밀번호 확인" class="input" />
          <input v-model="form.company" type="text" placeholder="회사명" class="input" />
          <input v-model="form.businessNumber" type="text" placeholder="사업자 등록 번호" class="input" />

          <button type="button" class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            사업자 등록 증명
          </button>

          <button type="submit" class="w-full py-2 border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-50">
            회원가입
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-gray-500">
          <router-link to="/login" class="hover:underline">로그인</router-link>
          &nbsp;|&nbsp;
          <router-link to="/find-id" class="hover:underline">아이디찾기</router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- 라우터 링크 예시 -->
  <!-- 실제 사용 시 주석 해제 -->
  <!-- <router-link :to="{ name: 'productDetail', params: { productId: 1 } }">상품 상세</router-link> -->
  <!-- <router-link :to="{ name: 'productDetail', params: { productId: 1 } }">상품 상세</router-link> -->
  <!-- <router-link :to="{ name: 'productDetail', params: { productId: 1 } }">상품 상세</router-link> -->
  <!-- <router-link :to="{ name: 'productDetail', params: { productId: 1 } }">상품 상세</router-link> -->
  <!-- <router-link :to="{ name: 'productDetail', params: { productId: 1 } }">상품 상세</router-link> -->
  <!-- <router-link :to="{ name: 'productDetail', params: { productId: 1 } }">상품 상세</router-link> -->
  <!-- <router-link :to="{ name: 'productDetail', params: { productId: 1 } }">상품 상세</router-link> --> 
  <router-link :to="'/products/1'"></router-link>//얘랑
    <router-link :to="{ name: 'productDetail', params: { productId: 1 } }"></router-link>//얘의 차이 

</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params);
// console.log(route.params.productId); // 1
const form = ref({
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
  company: '',
  businessNumber: ''
})

const submitForm = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  // 실제 회원가입 API 연동
  console.log('회원가입 정보:', form.value)
  alert('회원가입 완료!')
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200;
}
</style>
