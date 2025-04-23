<script setup>
import { X } from "lucide-vue-next";
import { ref, watch } from "vue";
import { useCampaignStore } from "../../stores/useCampaignStore";

const emit = defineEmits(["close", "confirm"]);
const props = defineProps(["visible", "campaign"]);
const members = ref([]);

const campaignStore = useCampaignStore();

watch(
  () => props.campaign?.idx, // idx => eventIdx 임
  async (newIdx) => {
    if (newIdx !== undefined) {
      try {
        members.value = await campaignStore.campaignfetchMemberList(newIdx);
      } catch (error) {
        console.error("멤버 가져오기 실패", error);
      }
    }
  },
  { immediate: true }
);

const userRole = ref(
  JSON.parse(localStorage.getItem("userInfo"))?.role || "manager"
);
// manager executive staff `'${{변수명}}'` v-if="userRole === 'manager'"
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      class="bg-white rounded-xl p-6 w-[500px] max-h-[120vh] overflow-auto shadow-lg relative"
    >
      <button
        class="absolute top-3 right-3 text-gray-500"
        @click="$emit('close')"
      >
        <X class="w-5 h-5" />
      </button>

      <h2 class="text-2xl font-bold mb-4 text-center">캠페인</h2>

      <!-- 캠페인 정보 -->
      <div class="mb-4 space-y-2 text-l text-gray-700">
        <p><strong>제목 : </strong> {{ campaign?.title || "내용 없음" }}</p>
        <p><strong>내용 : </strong> {{ campaign?.content || "내용 없음" }}</p>
        <p>
          <strong>기간 : </strong> {{ campaign?.startDate || "-" }} ~
          {{ campaign?.endDate || "-" }}
        </p>
      </div>

      <!-- 테이블 -->
      <div
        class="overflow-y-auto border-transparent border mb-4"
        style="max-height: 240px"
      >
        <table class="w-full border text-l text-center mb-4">
          <thead>
            <tr class="bg-slate-100">
              <th class="p-2 border">번호</th>
              <th class="p-2 border">사원 이름</th>
              <th class="p-2 border">사원 ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="members.length === 0">
              <td colspan="3" class="text-center text-gray-400 py-4">
                참여한 사원이 없습니다.
              </td>
            </tr>

            <tr v-for="(user, idx) in members" :key="idx">
              <td class="border p-2">{{ idx + 1 }}</td>
              <td class="border p-2">{{ user.name }}</td>
              <td class="border p-2">{{ user.memberId }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-center gap-4">
        <router-link
          @click="$emit('confirm', selected)"
          class="bg-slate-600 text-white px-6 py-2 rounded hover:bg-slate-700"
          :to="`/memberadd/${campaign?.idx}`"
          v-if="userRole === 'manager'"
        >
          {{ members.length > 0 ? '수정' : '사원 추가' }}
        </router-link>

        <button
          @click="$emit('close')"
          class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          닫기
        </button>
      </div>
    </div>
  </div>
</template>