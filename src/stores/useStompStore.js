// src/stores/stompStore.js
import { defineStore } from 'pinia';
import { Client } from '@stomp/stompjs';
import { useNotificationStore } from './useNotificationStore';
import { useMemberStore } from './useMemberStore';

export const useStompStore = defineStore('stomp', {
  state: () => ({
    stompClient: null,
    connected: false,
    receivedMessages: [],
  }),

  actions: {
    connect(member) {
      const NotificationStore = useNotificationStore();
      const memberStore = useMemberStore();

      this.stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {},
        reconnectDelay: 5000,
        onConnect: () => {
          this.connected = true;
          console.log('🔌 STOMP 연결됨');

          let webSocketIdx = 0;
          if (member) webSocketIdx = member.idx;

          this.stompClient.subscribe(`/topic/notification/${webSocketIdx}`, (msg) => {
            const data = JSON.parse(msg.body);

            let lastNotificationId = null;

            const showNotification = (data) => {
              // 중복 확인
              if (lastNotificationId === data.id) return;

              // 새로운 알림으로 판단될 때만 진행
              lastNotificationId = data.id;

              const notification = new Notification(data.title, {
                body: data.content,
                icon: '/src/assets/icon/알림.png',
                image: '/src/assets/icon/imhr.png',
              });

              notification.addEventListener('click', () => {
                window.open(data.url);
              });
            };

            NotificationStore.notifications.unshift(data);

            if (Notification.permission === 'default') {
              Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                  showNotification(data);
                } else {
                  alert('알림 권한이 거부되었습니다.');
                }
              });
            } else if (Notification.permission === 'granted') {
              showNotification(data);
            } else if (Notification.permission === 'denied') {
              alert('알림 권한이 거부되었습니다.');
            }
          });
        },
        onStompError: (frame) => {
          console.error('❌ STOMP 오류:', frame);
        },
      });

      this.stompClient.activate();
    },

    activityApprove(title, content, member, url) {
      if (this.connected && this.stompClient) {
        const payload = JSON.stringify({
          member: member,
          title: title,
          content: content,
          url: url,
        });

        this.stompClient.publish({
          destination: `/app/notification/activity/${member.idx}`,
          body: payload,
          headers: {
            'content-type': 'application/json',
          },
        });
      } else {
        console.warn('❗ STOMP 연결되지 않음');
      }
    },

    signupApprove(title, content, companyCode) {
      if (this.connected && this.stompClient) {
        
        const payload = JSON.stringify({
          title: title,
          content: content,
        });

        this.stompClient.publish({
          destination: `/app/notification/signup/${companyCode}`,
          body: payload,
          headers: {
            'content-type': 'application/json',
          },
        });
      } else {
        console.warn('❗ STOMP 연결되지 않음');
      }
    },

    activityApproveReq(title,content,companyIdx,activityIdx){
      if (this.connected && this.stompClient) {
        
        const payload = JSON.stringify({
          title: title,
          content: content,
          activityIdx:activityIdx,
        });

        this.stompClient.publish({
          destination: `/app/notification/activityReq/${companyIdx}`,
          body: payload,
          headers: {
            'content-type': 'application/json',
          },
        });
      } else {
        console.warn('❗ STOMP 연결되지 않음');
      }
    },

    test() {
      console.log("test");
    },
  },
});
