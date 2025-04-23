import { defineStore } from 'pinia';
import axios from 'axios';

export const useDepartmentStore = defineStore('department', {
    state: () => (
        {
            departments:[],
        }),

    actions: {
        async fetchDepartments() {
            const response = await axios.get("/api/department/list");
            return response;
        },
        async updateDepartments(CDRequest) {
            const response = await axios.post("/api/department/update", CDRequest);
            return response;
        }
    }
})