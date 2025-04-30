package com.example.be12hrimimhrbe.domain.activity;

import com.example.be12hrimimhrbe.domain.activity.model.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ActivityRepository extends MongoRepository<Activity, String> {

    // 사용자별 활동 전체 조회
    List<Activity> findByMemberId(String memberId);

    // 회사별 활동 전체 조회
    List<Activity> findByCompanyId(String companyId);

    // 상태 필터링 추가 예시
    List<Activity> findByCompanyIdAndStatus(String companyId, String status);

    // 페이징 예시
    Page<Activity> findByCompanyId(String companyId, Pageable pageable);

    Page<Activity> findByStatus(String status, Pageable pageable);
}
