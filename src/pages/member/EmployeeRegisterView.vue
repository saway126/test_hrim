<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useMemberStore } from '../../stores/useMemberStore';
import { useStompStore } from '../../stores/useStompStore';
import LogoSection from '../common/LogoSection.vue';


const memberStore = useMemberStore();
const stomp = useStompStore();
const router = useRouter();

const form = ref({
  name: '',
  memberId: '',
  email: '',
  password: '',
  confirmPassword: '',
  companyCode: '',
  employeeCode: '',
})

const submit = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }
  console.log('임직원 회원가입:', form.value)
  const response = await memberStore.personalSignup(form.value);
  console.log(response);
  if(response.data.isSuccess){
    console.log("test")
    stomp.test()
    alert('회원가입이 완료되었습니다!');
    stomp.signupApprove("회원가입 요청","회원가입 요청이 있습니다.",response.data.data.companyCode);
    router.push("/login");
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <LogoSection />

    <div class="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-xl font-semibold text-center mb-6">임직원 회원가입</h2>

        <form @submit.prevent="submit" class="space-y-3">
          <input v-model="form.name" type="text" placeholder="이름" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />
          <input v-model="form.memberId" type="text" placeholder="ID" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />
          <input v-model="form.email" type="email" placeholder="이메일" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />
          <input v-model="form.password" type="password" placeholder="비밀번호" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />
          <input v-model="form.confirmPassword" type="password" placeholder="비밀번호 확인" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />
          <input v-model="form.companyCode" type="text" placeholder="회사코드" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />
          <input v-model="form.employeeCode" type="text" placeholder="사원코드(선택)" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />

          <button type="submit"
                  class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition">
            회원가입
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-slate-400">
          <router-link to="/login" class="hover:underline">로그인</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>