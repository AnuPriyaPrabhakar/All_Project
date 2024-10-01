package com.ponsun.kyc.adminconfiguration.resetpassword.services;

import com.ponsun.kyc.adminconfiguration.resetpassword.data.ResetPasswordDataValidator;
import com.ponsun.kyc.adminconfiguration.resetpassword.domain.ResetPassword;
import com.ponsun.kyc.adminconfiguration.resetpassword.domain.ResetPasswordRepository;
import com.ponsun.kyc.adminconfiguration.resetpassword.domain.ResetPasswordRepositoryWrapper;
import com.ponsun.kyc.adminconfiguration.resetpassword.request.CreateResetPasswordRequest;
import com.ponsun.kyc.adminconfiguration.resetpassword.request.UpdateResetPasswordRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResetPasswordWritePlatformServiceImpl implements ResetPasswordWritePlatformService {

    private final ResetPasswordRepository resetpasswordRepository;
    private  final ResetPasswordRepositoryWrapper resetpasswordRepositoryWrapper;
    private  final ResetPasswordDataValidator resetPasswordDataValidator;

    @Override
    @Transactional
    public Response createResetPassword(CreateResetPasswordRequest createResetPasswordRequest) {

        try {
            this.resetPasswordDataValidator.validateSaveResetPassword(createResetPasswordRequest);
            final ResetPassword resetPassword = ResetPassword.create(createResetPasswordRequest);//entity
            this.resetpasswordRepository.saveAndFlush(resetPassword);
            return Response.of(Long.valueOf(resetPassword.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response updateResetPassword(Integer id, UpdateResetPasswordRequest updateResetPasswordRequest) {
        try {
            this.resetPasswordDataValidator.validateUpdateResetPassword(updateResetPasswordRequest);
            final ResetPassword resetPassword = this.resetpasswordRepositoryWrapper.findOneWithNotFoundDetection(id);
            resetPassword.update(updateResetPasswordRequest);
            this.resetpasswordRepository.saveAndFlush(resetPassword);
            return Response.of(Long.valueOf(resetPassword.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response blockResetPassword(Integer id) {
        try {
            final ResetPassword resetPassword = this.resetpasswordRepositoryWrapper.findOneWithNotFoundDetection(id);
            resetPassword.setValid(false); // Set 'valid' to 0
            resetPassword.setStatus(Status.DELETE); // Or set the appropriate status
            resetPassword.setUpdatedAt(LocalDateTime.now());
            this.resetpasswordRepository.saveAndFlush(resetPassword);
            return Response.of(Long.valueOf(id));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response unblockResetPassword(Integer id) {
        try {
            final ResetPassword resetPassword = this.resetpasswordRepositoryWrapper.findOneWithNotFoundDetection(id);
            resetPassword.setValid(true); // Set 'valid' to 1
            resetPassword.setStatus(Status.ACTIVE); // Or set the appropriate status
            resetPassword.setUpdatedAt(LocalDateTime.now());
            this.resetpasswordRepository.saveAndFlush(resetPassword);
            return Response.of(Long.valueOf(id));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}
