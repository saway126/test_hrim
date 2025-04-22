<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useMemberStore } from "../../stores/useMemberStore";

const route = useRoute();
const router = useRouter();
const memberStore = useMemberStore();

const menus = [
  "회사 정보",
  "ESG 지표 관리",
  "ESG 성과 등록",
  "ESG 성과 분석",
  "공급망진단",
  "리포트 관리",
  "처교실",
  "시스템러",
];
const idx  = route.params.id;
const user = ref({});

const approveUser = async () => {
  const response = await memberStore.approveMember(user.value.idx);
  if(response.data.isSuccess){
    alert("✅ 회원 승인 처리 완료!");
    router.push("/staffSearch");
  }
};

const rejectUser = async () => {
  const confirmDelete = confirm("정말 이 사용자를 삭제하시겠습니까?");
  if (confirmDelete) {
    const response = await memberStore.rejectMember(user.value.idx);
    if(response.data.isSuccess) {
      alert("❌ 회원 삭제 처리 완료!");
      router.push("/staffSearch"); // 목록 페이지로 이동
    }
  }
};

onMounted(async () => {
  const response = await memberStore.staffDetail(idx);
  console.log(response);
  user.value = response.data.data.info;
})
</script>

<template>
  <div class="flex min-h-screen">
    <!-- 본문 -->
    <main class="flex-1 bg-gray-50">
      <!-- 내용 -->
      <section
        class="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-72px)]"
      >
        <div
          class="w-full max-w-md border border-blue-200 rounded-xl bg-white p-8 shadow-md"
        >
          <h2 class="text-xl font-semibold mb-6 text-center text-gray-700">
            회원 상세 정보
          </h2>
          <div class="space-y-4 text-gray-700 text-base">
            <div><strong>이름 :</strong> {{ user.name }}</div>
            <div><strong>아이디 :</strong> {{ user.memberId }}</div>
            <div><strong>이메일 :</strong> {{ user.email }}</div>
          </div>
        </div>

        <div class="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            @click="approveUser"
          >
            승인
          </button>

          <button
            class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            @click="rejectUser"
          >
            반려(탈퇴)
          </button>
        </div>
      </section>
    </main>
  </div>
</template>
