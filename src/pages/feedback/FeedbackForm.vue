<script setup>
import { onMounted, ref } from 'vue'
import { useFeedbackStore } from '../../stores/useFeedbackStore'

const feedbackStore = useFeedbackStore();
const questions = ref([
  {
    questionIdx: null,
    question: '',
    type: '', // 'SUBJECTIVE' or 'MULTIPLE_CHOICE'
    sortOrder: 0,
    choices: []
  }
])

const addQuestion = () => {
  questions.value.push({
    questionIdx: null,
    question: '',
    type: '',
    sortOrder: questions.value.length,
    choices: []
  })
}

const removeQuestion = (index) => {
  questions.value.splice(index, 1)
  // Update sortOrder for remaining questions
  questions.value.forEach((q, idx) => {
    q.sortOrder = idx
  })
}

const setType = (index, type) => {
  questions.value[index].type = type
  if (type === 'SUBJECTIVE') {
    questions.value[index].choices = []
  }
}

const addOption = (qIndex) => {
  questions.value[qIndex].choices.push({
    choiceIdx: null,
    text: ''
  })
}

const removeOption = (qIndex, oIndex) => {
  questions.value[qIndex].choices.splice(oIndex, 1)
}

const saveForm = async () => {
  const formData = {
    templateIdx: null, // This should be set if modifying existing template
    deleteQuestions: [], // This should be populated with questions to delete if modifying
    insertQuestions: questions.value.map(question => ({
      questionIdx: question.questionIdx,
      question: question.question,
      type: question.type,
      sortOrder: question.sortOrder,
      choices: question.choices.map(choice => ({
        choiceIdx: choice.choiceIdx,
        text: choice.text
      }))
    }))
  }
  
  console.log('폼 데이터 저장됨:', formData)
  const response = await feedbackStore.createFeedbackTemplate(formData);
  console.log(response);
}

onMounted(async () => {
  const response = await feedbackStore.fetchFeedbackTemplate();
  console.log(response);
  if (response.data && response.data.data && response.data.data.questions) {
    questions.value = response.data.data.questions.map(q => ({
      questionIdx: q.questionIdx,
      question: q.question,
      type: q.type,
      sortOrder: q.sortOrder,
      choices: q.choices ? q.choices.map(c => ({
        choiceIdx: c.choiceIdx,
        text: c.text
      })) : []
    }));
  }
})
</script>

<style scoped>
</style>

<template>
  <div class="bg-gray-50 p-8">
    <div v-for="(question, qIndex) in questions" :key="qIndex" class="mb-8 border-b pb-6">
      <label class="block font-bold mb-1">질문 {{ qIndex + 1 }}</label>

      <!-- 질문 내용 -->
      <label class="block text-gray-700">질문 내용:</label>
      <input
        type="text"
        class="border border-gray-300 p-2 rounded w-full mb-3"
        v-model="question.question"
      />

      <!-- 질문 유형 -->
      <div class="flex space-x-8 mb-4">
        <!-- 주관식 -->
        <label class="inline-flex items-center space-x-2">
          <input
            type="radio"
            class="form-radio h-5 w-5 text-blue-600"
            :checked="question.type === 'SUBJECTIVE'"
            @change="setType(qIndex, 'SUBJECTIVE')"
          />
          <span class="text-gray-700 font-medium">주관식</span>
        </label>

        <!-- 객관식 -->
        <label class="inline-flex items-center space-x-2">
          <input
            type="radio"
            class="form-radio h-5 w-5 text-blue-600"
            :checked="question.type === 'MULTIPLE_CHOICE'"
            @change="setType(qIndex, 'MULTIPLE_CHOICE')"
          />
          <span class="text-gray-700 font-medium">객관식</span>
        </label>
      </div>

      <!-- 객관식 보기 항목 (객관식일 때만 표시) -->
      <div v-if="question.type === 'MULTIPLE_CHOICE'" class="mb-4">
        <label class="block font-medium mb-2">객관식 보기 항목</label>
        <div v-for="(option, oIndex) in question.choices" :key="oIndex" class="flex mb-2 space-x-2">
          <input
            type="text"
            class="border border-gray-300 p-2 rounded w-full"
            v-model="option.text"
            placeholder="보기 항목 입력"
          />
          <button class="bg-red-500 w-20 text-white px-3 py-1 rounded" @click="removeOption(qIndex, oIndex)">삭제</button>
        </div>
        <button class="bg-green-500 h-10 text-white px-3 py-1 rounded" @click="addOption(qIndex)">보기 항목 추가</button>
      </div>

      <!-- 질문 삭제 -->
      <div class="flex justify-end">
        <button class="bg-red-500 h-10 text-white px-4 py-1 rounded" @click="removeQuestion(qIndex)">질문 삭제</button>
      </div>
    </div>

    <!-- 질문 추가 버튼 -->
    <div class="mb-6">
      <button class="bg-blue-600 text-white px-6 py-2 rounded" @click="addQuestion">질문 추가</button>
    </div>

    <!-- 저장 버튼 -->
    <div class="flex justify-end">
      <button class="bg-green-600 text-white px-6 py-2 rounded" @click="saveForm">저장</button>
    </div>
  </div>
</template>