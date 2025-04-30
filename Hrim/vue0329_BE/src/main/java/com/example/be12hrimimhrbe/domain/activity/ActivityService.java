package com.example.be12hrimimhrbe.domain.activity;

import com.example.be12hrimimhrbe.domain.activity.model.Activity;
import com.example.be12hrimimhrbe.domain.activity.model.ActivityDto;
import com.example.be12hrimimhrbe.domain.member.Member;
import com.example.be12hrimimhrbe.domain.member.MemberRepository;
import com.example.be12hrimimhrbe.global.LocalImageService;
import com.example.be12hrimimhrbe.global.response.BaseResponse;
import com.example.be12hrimimhrbe.global.response.BaseResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final MemberRepository memberRepository;
    private final LocalImageService localImageService;

    @Value("${file.upload-path}")
    private String uploadPath;

    public BaseResponse<List<ActivityDto.ActivityListResp>> activityList(Member loginMember, int page, int size) {
        Optional<Member> memberOpt = memberRepository.findById(loginMember.getId());
        if (memberOpt.isEmpty()) {
            throw new RuntimeException("회원 정보 없음");
        }

        Member user = memberOpt.get();
        List<ActivityDto.ActivityListResp> result = new ArrayList<>();

        if (user.getIsAdmin()) {
            var pageable = PageRequest.of(page, size);
            List<Activity> activities = activityRepository.findAll(pageable).getContent();

            for (Activity activity : activities) {
                Optional<Member> activityMemberOpt = memberRepository.findById(activity.getMemberId());
                String memberName = activityMemberOpt.map(Member::getName).orElse("알 수 없음");

                var dto = ActivityDto.ActivityListResp.to(activity, memberName);
                dto = ActivityDto.ActivityListResp.findType(activity, dto);
                dto = ActivityDto.ActivityListResp.findStatus(activity, dto);
                result.add(dto);
            }

            return new BaseResponse<>(BaseResponseMessage.ADMIN_ACTIVITYLIST_FIND, result);
        } else {
            List<Activity> activities = activityRepository.findByMemberId(user.getId());

            for (Activity activity : activities) {
                var dto = ActivityDto.ActivityListResp.to(activity, user.getName());
                dto = ActivityDto.ActivityListResp.findType(activity, dto);
                dto = ActivityDto.ActivityListResp.findStatus(activity, dto);
                result.add(dto);
            }

            return new BaseResponse<>(BaseResponseMessage.USER_ACTIVITYLIST_FIND, result);
        }
    }

    public BaseResponse<ActivityDto.ActivityItemResponse> getDetail(String activityId, Member loginMember) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("활동 없음"));

        Member member = memberRepository.findById(activity.getMemberId())
                .orElseThrow(() -> new RuntimeException("멤버 없음"));

        String fileUrl = "http://localhost:8080/img" + activity.getImagePath();

        var result = ActivityDto.ActivityItemResponse.of(activity, member.getName(), member.getRole());
        result.setFileUrl(fileUrl);

        return new BaseResponse<>(BaseResponseMessage.SWGGER_SUCCESS, result);
    }

    public BaseResponse<Activity> regist(ActivityDto.ActivityRegistReq dto, MultipartFile imgFile, Member loginMember) {
        String uploadFilePath = localImageService.upload(imgFile);

        String type = switch (dto.getType()) {
            case "기부" -> "DONATION";
            case "봉사" -> "VOLUNTEER";
            case "교육" -> "EDUCATION";
            default -> throw new IllegalArgumentException("유효하지 않은 활동 타입");
        };

        Activity activity = Activity.builder()
                .memberId(loginMember.getId())
                .companyId(loginMember.getCompany().getId())
                .type(type)
                .title(dto.getTitle())
                .content(dto.getDescription())
                .imagePath(uploadFilePath)
                .score(dto.getPerformance())
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();

        Activity saved = activityRepository.save(activity);
        return new BaseResponse<>(BaseResponseMessage.ACTIVITY_REGIST_SUCCESS, saved);
    }

    public BaseResponse<String> activityApprovalAgree(Member admin, String activityId) {
        if (!admin.getIsAdmin()) {
            return new BaseResponse<>(BaseResponseMessage.ACTIVITY_APPROVAL_FALSE);
        }

        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("활동 없음"));

        if (!"PENDING".equals(activity.getStatus())) {
            return new BaseResponse<>(BaseResponseMessage.MY_ACTIVITY_PROCESSED);
        }

        activity.setStatus("APPROVED");
        activityRepository.save(activity);

        return new BaseResponse<>(BaseResponseMessage.SWGGER_SUCCESS, activity.getId());
    }

    public BaseResponse<String> activityApprovalOppose(Member admin, String activityId) {
        if (!admin.getIsAdmin()) {
            return new BaseResponse<>(BaseResponseMessage.ACTIVITY_APPROVAL_FALSE);
        }

        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("활동 없음"));

        if (!"PENDING".equals(activity.getStatus())) {
            return new BaseResponse<>(BaseResponseMessage.MY_ACTIVITY_PROCESSED);
        }

        activity.setStatus("REJECTED");
        activityRepository.save(activity);

        return new BaseResponse<>(BaseResponseMessage.ACTIVITY_APPROVAL_OPPOSE, activity.getId());
    }

    public BaseResponse<String> activityDelete(Member loginMember, String activityId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("활동 없음"));

        if (!loginMember.getId().equals(activity.getMemberId())) {
            return new BaseResponse<>(BaseResponseMessage.ACTIVITY_DELETE_FALSE);
        }

        activityRepository.delete(activity);
        return new BaseResponse<>(BaseResponseMessage.ACTIVITY_DELETE_SUCCESS);
    }
}
