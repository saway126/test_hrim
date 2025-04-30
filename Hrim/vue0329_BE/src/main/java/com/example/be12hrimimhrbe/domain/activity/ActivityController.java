package com.example.be12hrimimhrbe.domain.activity;

import com.example.be12hrimimhrbe.domain.activity.model.Activity;
import com.example.be12hrimimhrbe.domain.activity.model.ActivityDto;
import com.example.be12hrimimhrbe.domain.member.model.CustomUserDetails;
import com.example.be12hrimimhrbe.global.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/activity")
@RequiredArgsConstructor
@Tag(name = "직원 활동내역 관리 기능")
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping("/activityList")
    @Operation(summary = "ESG활동 내역 조회", description = "ESG활동 내역을 조회하는 기능 입니다.")
    public ResponseEntity<BaseResponse<List<ActivityDto.ActivityListResp>>> activityList(
            @AuthenticationPrincipal CustomUserDetails member,
            @RequestParam int page,
            @RequestParam int size
    ) {
        return ResponseEntity.ok().body(activityService.activityList(member.getMember(), page, size));
    }

    @GetMapping("/detail/{id}")
    @Operation(summary = "ESG활동 상세 페이지 조회", description = "ESG활동 상세 조회 기능 입니다.")
    public ResponseEntity<BaseResponse<ActivityDto.ActivityItemResponse>> getDetail(
            @PathVariable String id,
            @AuthenticationPrincipal CustomUserDetails member
    ) {
        return ResponseEntity.ok().body(activityService.getDetail(id, member.getMember()));
    }

    @PostMapping("/regist")
    @Operation(summary = "ESG활동 등록", description = "ESG활동 등록 기능입니다.")
    public ResponseEntity<BaseResponse<Activity>> activityRegist(
            @RequestPart("dto") @Valid ActivityDto.ActivityRegistReq dto,
            @RequestPart(value = "file", required = false) MultipartFile imgFile,
            @AuthenticationPrincipal CustomUserDetails member
    ) {
        return ResponseEntity.ok().body(activityService.regist(dto, imgFile, member.getMember()));
    }

    @GetMapping("/ativityApproval/agree/{id}")
    @Operation(summary = "ESG활동 승인", description = "직원 ESG활동을 승인 합니다.")
    public ResponseEntity<BaseResponse<String>> ativityApprovalAgree(
            @PathVariable String id,
            @AuthenticationPrincipal CustomUserDetails member
    ) {
        return ResponseEntity.ok().body(activityService.ativityApprovalAgree(member.getMember(), id));
    }

    @GetMapping("/ativityApproval/oppose/{id}")
    @Operation(summary = "ESG활동 반려", description = "직원 ESG활동을 반려 합니다.")
    public ResponseEntity<BaseResponse<String>> ativityApprovalOppose(
            @PathVariable String id,
            @AuthenticationPrincipal CustomUserDetails member
    ) {
        return ResponseEntity.ok().body(activityService.ativityApprovalOppose(member.getMember(), id));
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "ESG활동 삭제", description = "나의 ESG활동을 삭제합니다.")
    public ResponseEntity<BaseResponse<String>> activityDelete(
            @PathVariable String id,
            @AuthenticationPrincipal CustomUserDetails member
    ) {
        return ResponseEntity.ok().body(activityService.activityDelete(member.getMember(), id));
    }
}
