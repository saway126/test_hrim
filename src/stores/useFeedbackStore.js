import { defineStore } from 'pinia';
import axios from 'axios';

export const useFeedbackStore = defineStore('feedback', {
    state: () => ({
        feedbackList: [],
        feedbackForm: {
            title: '',
            description: '',
            questions: [],
        },
    }),
    actions: {
        async fetchFeedbackTemplate() {
            const response = await axios.get('/api/feedback/template');
            return response;
        },
        async createFeedbackTemplate(form) {
            const response = await axios.post('/api/feedback/create', form);
            return response;
        },
    }
})
