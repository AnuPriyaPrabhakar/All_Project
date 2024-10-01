
package com.ponsun.kyc.Master.ApplicantForm.services;
import com.ponsun.kyc.Master.ApplicantForm.domain.*;
import com.ponsun.kyc.Master.ApplicantForm.dto.ApplicantFormDto;
import com.ponsun.kyc.Master.ApplicantForm.dto.ApplicantFormPayload;
import com.ponsun.kyc.Master.ApplicantForm.request.CreateApplicantFormRequest;
import com.ponsun.kyc.Master.ApplicantForm.request.UpdateApplicantFormRequest;
import com.ponsun.kyc.Master.ApplicantFormDetails.data.ApplicantFormDetailsData;
import com.ponsun.kyc.Master.ApplicantFormDetails.domain.ApplicantFormDetails;
import com.ponsun.kyc.Master.ApplicantFormDetails.domain.ApplicantFormDetailsRepository;
import com.ponsun.kyc.Master.ApplicantFormDetails.request.CreateApplicantFormDetailsRequest;
import com.ponsun.kyc.Master.ApplicantFormDetails.request.UpdateApplicantFormDetailsRequest;
import com.ponsun.kyc.Master.ApplicantFormDetails.services.ApplicantFormDetailsWriteService;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicantFormWriteServiceImpl implements ApplicantFormWriteService {
    private final ApplicantFormRepository applicantFormRepository;
    private final ApplicantFormWrapper applicantFormWrapper;
    private final ApplicantFormDetailsWriteService applicantFormDetailsWriteService;
    private final ApplicantFormReadService applicantFormReadService;
    private final ApplicantFormLogRepository applicantFormLogRepository;
    private final ApplicantFormDetailsRepository applicantFormDetailsRepository;

    @Override
    @Transactional

    public Response createApplicantFormList(ApplicantFormPayload applicantFormPayloads) {
        try {
            ApplicantFormDto formDto = applicantFormPayloads.getApplicantFormDto();
            ModelMapper modelMapper = new ModelMapper();

            CreateApplicantFormRequest request = modelMapper.map(formDto, CreateApplicantFormRequest.class);
            Integer kycId = request.getId();
            ApplicantForm applicantForm = ApplicantForm.create(request);

            if (kycId == 0) {

                applicantForm = this.applicantFormRepository.saveAndFlush(applicantForm);
                kycId = applicantForm.getId();

            } else {
                this.updateApplicantForm(kycId);
                this.applicantFormDetailsWriteService.deActivate(kycId, applicantForm.getEuid());//ApplicantFormDetails Deactivation
            }

            List<ApplicantFormDetailsData> applicantFormDetailsData = formDto.getApplicantFormDetailsData();
            List<ApplicantFormDetails> applicantFormDetails = new ArrayList<>();

            for (ApplicantFormDetailsData detailsData : applicantFormDetailsData) {
                ApplicantFormDetails applicantFormDet = new ApplicantFormDetails();
                CreateApplicantFormDetailsRequest detailsRequest = modelMapper.map(detailsData, CreateApplicantFormDetailsRequest.class);
                detailsRequest.setKycId(kycId);
                applicantFormDetails.add(applicantFormDet.create(detailsRequest));
            }
            this.applicantFormDetailsRepository.saveAllAndFlush(applicantFormDetails);

            Response response = Response.of(kycId);
            return response;
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response updateApplicantForm(Integer id, ApplicantFormPayload applicantFormPayloads) {
        try {
            ApplicantFormDto formDto = applicantFormPayloads.getApplicantFormDto();
            ModelMapper modelMapper = new ModelMapper();

            UpdateApplicantFormRequest request = modelMapper.map(formDto, UpdateApplicantFormRequest.class);
            Integer kycId = request.getId();

            ApplicantForm applicantForm;

            if (id != null && id > 0) {
                applicantForm = this.applicantFormRepository.findById(id)
                        .orElseThrow(() -> new Exception("ApplicantForm not found"));
                this.applicantFormDetailsWriteService.deActivate(id, applicantForm.getEuid());
                deActivate(id, applicantForm.getEuid());
            }

            if (kycId == 0) {
                applicantForm = new ApplicantForm();
            } else {
                applicantForm = this.applicantFormRepository.findById(kycId)
                        .orElseThrow(() -> new Exception("ApplicantForm not found"));
            }

            applicantForm.update(request);

            // Increment the number of prints
            int currentMaxPrints = applicantFormReadService.getmaxNumberOfPrint(id);
            applicantForm.setNumberOfPrint(currentMaxPrints + 1);

            applicantForm = this.applicantFormRepository.saveAndFlush(applicantForm);
            kycId = applicantForm.getId();

            List<ApplicantFormDetailsData> applicantFormDetailsData = formDto.getApplicantFormDetailsData();
            for (ApplicantFormDetailsData detailsData : applicantFormDetailsData) {
                UpdateApplicantFormDetailsRequest detailsRequest = modelMapper.map(detailsData, UpdateApplicantFormDetailsRequest.class);
                detailsRequest.setKycId(kycId);
                Response response = this.applicantFormDetailsWriteService.updateFormDetailsList(kycId, detailsRequest);
            }

            Response response = Response.of(kycId);
            return response;
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    @Transactional
    public Response updateApplicantForm(Integer id) {
        try{
//                this.applicantFormValidator.validateUpdateApplicantForm(updateApplicantFormRequest);
            ApplicantForm applicantForm = this.applicantFormWrapper.findOneWithNotFoundDetection(id);
            applicantForm.setNumberOfPrint(applicantFormReadService.getmaxNumberOfPrint(id)+1);
            this.applicantFormRepository.saveAndFlush(applicantForm);
            return Response.of(Long.valueOf(applicantForm.getId()));
        }catch (DataIntegrityViolationException e){
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response deActivate(Integer kycId, Integer euid) {
        try {
            Optional<ApplicantForm> optionalApplicantForm = this.applicantFormWrapper.findKycIdNotFoundDetection(kycId);
            if (optionalApplicantForm.isPresent()) {
                ApplicantForm applicantForm = optionalApplicantForm.get();
                applicantForm.setEuid(euid);
                applicantForm.setStatus(Status.DELETE);
                applicantForm.setUpdatedAt(LocalDateTime.now());
                return Response.of(applicantForm.getId());
            } else {
                throw new Exception("ApplicantForm not found for deactivation");
            }
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public Response updateIsCompleted(Integer id, String status) {
        try {
            final ApplicantForm applicantForm = this.applicantFormWrapper.findOneWithNotFoundDetection(id);
            if (status.equals("Submit")) {
                applicantForm.setIsCompleted(1);
                applicantForm.onUpdate();
            }
            this.applicantFormRepository.saveAndFlush(applicantForm);
            return Response.of(Long.valueOf(applicantForm.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}
