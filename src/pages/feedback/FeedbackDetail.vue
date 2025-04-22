<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFeedbackStore } from '../../stores/useFeedbackStore'
import { useMemberStore } from '../../stores/useMemberStore'

const route = useRoute()
const router = useRouter()
const feedbackStore = useFeedbackStore();
const memberStore = useMemberStore();
const userId = route.params.id
const templateIdx = null;
const userInfo = ref({});

const feedbackItems = ref([])

onMounted(async () => {
  // Fetch feedback template questions
  const response = await feedbackStore.fetchFeedbackTemplate()
  if (response.data && response.data.data && response.data.data.questions) {
    feedbackItems.value = response.data.data.questions.map(q => ({
      templateIdx: templateIdx,
      questionIdx: q.questionIdx,
      question: q.question,
      type: q.type,
      choices: q.choices || [],
      answer: '',
      choiceIdx: null,
      score: null
    }))
  }
  const memberResponse = await memberStore.staffShort(userId)
  console.log(memberResponse)
  userInfo.value = memberResponse.data.data;
})

const goBack = () => {
  router.back()
}

const submitFeedback = () => {
  const answers = feedbackItems.value.map(item => ({
    templateIdx: item.templateIdx,
    questionIdx: item.questionIdx,
    choiceIdx: item.choiceIdx,
    answer: item.answer,
    score: item.score
  }))

  console.log('✅ 저장할 피드백:', {
    userId,
    answers
  })

  // 여기에 axios.post(`/api/feedback/${userId}`, { answers }) 가능!
  alert('피드백이 저장되었습니다!')
  router.back()
}
</script>

<template>
  <div class="bg-white p-8 rounded shadow-md max-w-3xl mx-auto">
    <!-- 상단: 사원 정보 표시 -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-slate-800 mb-1">사원 피드백 작성</h2>
      <p class="text-slate-600 text-sm">👤 대상 사원 이름(ID): <span class="font-semibold">{{ userInfo.name }}({{ userInfo.memberId }})</span></p>
    </div>

    <!-- 피드백 항목 입력 -->
    <div v-for="(item, index) in feedbackItems" :key="index" class="mb-6">
      <label class="block font-semibold text-gray-800 mb-2">
        항목 {{ index + 1 }}: {{ item.question }}
      </label>

      <!-- 주관식 답변 -->
      <div v-if="item.type === 'SUBJECTIVE'" class="mb-4">
        <label class="text-gray-600 block mb-1">내용 입력</label>
        <textarea
          class="w-full p-3 border border-gray-300 rounded"
          v-model="item.answer"
          rows="3"
          placeholder="이 동료에 대한 피드백을 작성해주세요"
        ></textarea>
      </div>

      <!-- 객관식 답변 -->
      <div v-else-if="item.type === 'MULTIPLE_CHOICE'" class="mb-4">
        <div class="space-y-2">
          <div v-for="choice in item.choices" :key="choice.choiceIdx" class="flex items-center">
            <input
              type="radio"
              :id="'choice-' + choice.choiceIdx"
              :value="choice.choiceIdx"
              v-model="item.choiceIdx"
              class="mr-2"
            />
            <label :for="'choice-' + choice.choiceIdx">{{ choice.text }}</label>
          </div>
        </div>
      </div>

      <!-- 점수 입력 (선택적) -->
      <div v-if="item.type === 'SUBJECTIVE'" class="mt-2">
        <label class="text-gray-600 block mb-1">점수 (1-5)</label>
        <input
          type="number"
          v-model="item.score"
          min="1"
          max="5"
          class="w-20 p-2 border border-gray-300 rounded"
        />
      </div>
    </div>

    <div class="text-right mt-8 flex gap-3 justify-end">
      <button class="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500" @click="goBack">
        취소
      </button>
      <button class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600" @click="submitFeedback">
        저장
      </button>
    </div>
  </div>
</template>

<style scoped></style>