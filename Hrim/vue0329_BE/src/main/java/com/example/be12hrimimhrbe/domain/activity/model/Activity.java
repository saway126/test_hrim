package com.example.be12hrimimhrbe.domain.activity.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "activity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    private String id;

    private String title;
    private String content;
    private String memberId;   // 사용자 ID 참조 (Mongo에서는 ID 직접 저장)
    private String companyId;  // 회사 ID 참조

    private int score;
    private String imagePath;

    private String status; // 상태: PENDING, APPROVED, REJECTED

    @CreatedDate
    private LocalDateTime createdAt; // 자동 생성 시간
}
