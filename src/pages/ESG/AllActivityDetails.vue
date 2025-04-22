<script setup>
import { ref,onMounted } from 'vue'
import { useRouter,useRoute } from "vue-router";
import { useActivityStore } from '../../stores/useActivityStore';
import { useMemberStore } from '../../stores/useMemberStore'
import { useStompStore } from '../../stores/useStompStore'

const activitySore = useActivityStore()
const memberStore = useMemberStore();
const route = useRoute();
const idx = route.params.idx;

const detail = ref({});
const member = ref({});
const me = ref({});

const stomp = useStompStore()

onMounted(async () => {
  me.value = await memberStore.fetchMember();

  detail.value=await activitySore.detail(idx);
  member.value = detail.value.member
})

// 승인
const agree=async()=>{
  console.log(member.value.name)
  // activitySore.agree(idx);
  stomp.sendApprove("승인 되었습니다.","["+detail.value.title+"] 활동이 승인 되었습니다.",member.value,"/activeDetails/"+idx);
  // window.location.reload();
  
}

// 반려
const oppose=async()=>{
  activitySore.oppose(idx);
  stomp.activityApprove("반려 되었습니다.","["+detail.value.title+"] 활동이 반려 되었습니다.",member.value,"/activeDetails/"+idx);
  window.location.reload();
}


const router = useRouter();
const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager')
// manager executive staff `'${{변수명}}'`
</script>

<template>
  <div class="bg-white min-h-[calc(93vh-4rem)] p-8 rounded-lg shadow-sm">
    <!-- 타이틀 -->
    <h2 class="text-2xl font-bold text-slate-800 mb-6 text-center">
      ESG 교육 상세
    </h2>

    <!-- 상세 카드 -->
    <div
      class="border border-slate-200 p-6 rounded-lg bg-gray-50 shadow-md space-y-5 max-w-3xl mx-auto"
    >
      <!-- 게시자 -->
      <div>
        <span class="font-semibold text-slate-700">게시자:</span>
        <span class="text-slate-600 ml-2">{{ member.name }}</span>
      </div>

      <!-- 제목 -->
      <div>
        <span class="font-semibold text-slate-700">제목:</span>
        <span class="text-slate-600 ml-2">{{ detail.title }}</span>
      </div>

      <!-- 첨부파일 -->
      <div>
        <span class="font-semibold text-slate-700">첨부파일:</span>
        <div class="flex gap-4 mt-2">
          <a :href="detail.fileUrl" class="text-blue-600 hover:underline text-sm"
            >
            <img class="w-[150px]" :src="detail.fileUrl" alt="활동 이미지" />
            
            </a
          >

        </div>
      </div>

      <!-- 내용 -->
      <div>
        <span class="font-semibold text-slate-700">내용:</span>
        <div
          class="mt-2 p-4 bg-white border border-slate-200 rounded-md text-slate-600 text-sm leading-relaxed"
        >
          {{ detail.content }}
        </div>
      </div>

      <!-- 버튼 -->
      <div class="flex justify-end gap-3 pt-4" v-if="me.isAdmin && detail.status==='PENDING'">
        <button @click="agree"
          class="px-4 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50"
        >
          승인
        </button>

        <button @click="oppose"
          class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
        >
          반려
        </button>
      </div>

      <div class="flex justify-end gap-3 pt-4" v-if="userRole !== 'manager'">
        <button
          class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
        >
          삭제
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>
