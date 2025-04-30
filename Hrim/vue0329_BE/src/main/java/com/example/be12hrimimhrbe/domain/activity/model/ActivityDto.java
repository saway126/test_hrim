package com.example.be12hrimimhrbe.domain.activity.model;

import lombok.*;

import java.time.format.DateTimeFormatter;

public class ActivityDto {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ActivityListResp {
        private String activityId;
        private String title;
        private String startDate;
        private String memberId;
        private String memberName;

        private String status;
        private String type;
        private String description;

        public static ActivityListResp to(Activity activity, String memberName) {
            String formattedDate = activity.getCreatedAt()
                    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            return ActivityListResp.builder()
                    .activityId(activity.getId())
                    .title(activity.getTitle())
                    .startDate(formattedDate)
                    .memberId(activity.getMemberId())
                    .memberName(memberName)
                    .description(activity.getContent()) // `description` -> `content`로 변경
                    .build();
        }

        public static ActivityListResp findType(Activity activity, ActivityListResp index) {
            index.setType(activity.getType());
            return index;
        }

        public static ActivityListResp findStatus(Activity activity, ActivityListResp index) {
            switch (activity.getStatus()) {
                case "PENDING" -> index.setStatus("대기 중");
                case "APPROVED" -> index.setStatus("승인");
                case "REJECTED" -> index.setStatus("승인 반려");
            }
            return index;
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ActivityItemResponse {
        private String activityId;
        private String title;
        private String startDate;

        private String memberId;
        private String memberName;
        private String memberRole;

        private String status;
        private String type;
        private String content;
        private String fileUrl;

        public static ActivityItemResponse of(Activity activity, String memberName, String memberRole) {
            return ActivityItemResponse.builder()
                    .activityId(activity.getId())
                    .title(activity.getTitle())
                    .startDate(activity.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                    .memberId(activity.getMemberId())
                    .memberName(memberName)
                    .memberRole(memberRole)
                    .status(activity.getStatus())
                    .type(activity.getType())
                    .content(activity.getContent())
                    .fileUrl(activity.getImagePath())
                    .build();
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ActivityReportDetailResp {
        private String title;
        private String performedAt;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ActivityRegistReq {
        private String type;
        private String title;
        private String description; // backend에서는 Activity.content로 매핑
        private int performance;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ActivityApprovalResp {
        private String type;
        private String title;
        private String userName;
        private String userId;
        private String fileUrl;
        private String description;
    }
}
