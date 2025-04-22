<script setup>
import { defineEmits, onMounted, ref } from 'vue'
import { useMemberStore } from '../../stores/useMemberStore'
import { useRouter } from 'vue-router'
import { Menu, Bell } from 'lucide-vue-next'
import { useStompStore } from '../../stores/useStompStore'
import { useNotificationStore } from "../../stores/useNotificationStore"

const memberStore = useMemberStore();
const NotificationStore = useNotificationStore();

const emit = defineEmits(['toggle-sidebar', 'toggle-noti']);

const router = useRouter();

const handleLogout = async () => {
  try {
    await memberStore.logout();
  } catch (e) {
    console.log(e)
  } finally {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userInfo')
    router.push('/login')
  }
}

const stomp = useStompStore()
const me = ref({});
onMounted(async () => {
  // fetchMember가 비동기 함수라면 await 사용
  try {
    me.value = await memberStore.fetchMember();

  } catch (error) {
    router.push('/login')
  }
  // if(!memberStore.userInfo){
  //   member.value=memberStore.fetchMember();

  // }else{
  //   member.value=memberStore.userInfo
  //   console.log("왜 있지?")
  // }
  stomp.connect(me.value)
})
</script>

<template>
  <header class="bg-white shadow-md w-full h-16 flex items-center px-6 fixed top-0 left-0 z-20">
    <div class="flex items-center gap-3">
      <router-link to="/" class="text-slate-800 font-bold text-2xl md:text-5xl ml-2 mb-1">IMHR</router-link>

      <button @click="emit('toggle-sidebar')" class="p-3 rounded hover:bg-slate-100 transition" aria-label="사이드바 열기">
        <Menu class="w-11 h-11 text-slate-800 mt-0.5" />
      </button>
    </div>

    <!-- 🔹 오른쪽 사용자 영역 -->
    <div class="flex items-center gap-4 ml-auto mr-2 mb-1">
      <router-link to="/mypage"
        class="text-slate-700 text-base md:text-3xl font-medium hover:underline mr-2 font-semibold">
        {{ me.name }}
      </router-link>

      <button @click="$emit('toggle-noti')" class="relative">
        <Bell class="w-7 h-7 text-slate-800 hover:opacity-80 transition" />
      </button>

      <!-- 로그아웃 버튼 -->
      <button @click="handleLogout" type="button"
        class="hidden md:inline-block border-2 border-slate-800 py-1.5 px-4 text-sm text-slate-800 rounded hover:bg-slate-100 transition font-semibold">
        로그아웃
      </button>
    </div>
  </header>
</template>