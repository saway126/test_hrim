import { defineStore } from 'pinia';
import axios from 'axios';

export const useNotificationStore = defineStore('notification', {
    state: () => (
        {
            notifications:[],
        }),

    actions: {
        async getMyNotifications(page){
            const response =await axios("/api/notification/list",{
                params: { page: page }
            });
            if(this.notifications.length===0)
                this.notifications=response.data.data;
            else{
                this.notifications.push(...response.data.data);
            }
        },
    }
})