<script setup>
import { ref } from 'vue'
import LogoSection from '../common/LogoSection.vue'
import { useMemberStore } from '../../stores/useMemberStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const memberStore = useMemberStore()

const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  uuid: route.params.uuid
})

const uuid_present = ref(true);
if(form.value.uuid == null) uuid_present.value = false;

const changePassword = async () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  console.log('비밀번호 변경:', form.value.password)
  const response = await memberStore.changePW(form.value)
  if(response.data.isSuccess) {
    alert('비밀번호가 성공적으로 변경되었습니다.')
    router.push("/login")
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <!-- 왼쪽 브랜드 영역 -->
    <LogoSection />

    <!-- 우측 비밀번호 재설정 영역 -->
    <div class="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-xl font-semibold text-center mb-6">비밀번호 재설정</h2>

        <form @submit.prevent="changePassword" class="space-y-4">
          <div v-if="!uuid_present">
            <label class="text-sm text-gray-700 block mb-1">이전 비밀번호</label>
            <input v-model="form.oldPassword" type="password" placeholder="이전 비밀번호"
                   class="input" />
          </div>
          <div>
            <label class="text-sm text-gray-700 block mb-1">새 비밀번호</label>
            <input v-model="form.newPassword" type="password" placeholder="새로운 비밀번호"
                   class="input" />
            <input v-model="form.confirmPassword" type="password" placeholder="비밀번호 확인"
                   class="input mt-2" />
          </div>

          <button type="submit"
                  class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition">
            비밀번호 변경
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-slate-400">
          <router-link to="/login" class="hover:underline">로그인</router-link>
          &nbsp;|&nbsp;
          <router-link to="/find-id" class="hover:underline">아이디 찾기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500;
}
</style>
