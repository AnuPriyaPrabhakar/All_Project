package com.ponsun.kyc.Master.DirectorsList.services;

import com.ponsun.kyc.Master.DirectorsList.data.DirectorListDto;
import com.ponsun.kyc.Master.DirectorsList.data.DirectorsListValidator;
import com.ponsun.kyc.Master.DirectorsList.domain.DirectorsList;
import com.ponsun.kyc.Master.DirectorsList.domain.DirectorsListRepository;
import com.ponsun.kyc.Master.DirectorsList.domain.DirectorsListWrapper;
import com.ponsun.kyc.Master.DirectorsList.request.CreateDirectorsListRequest;
import com.ponsun.kyc.Master.DirectorsList.request.UpdateDirectorsListRequest;
import com.ponsun.kyc.Master.DirectorsSignAuthority.domain.DirectorsSignAuthorityRepository;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.CreateDirectorsSignAuthorityRequest;
import com.ponsun.kyc.Master.DirectorsSignAuthority.service.DirectorsSignAuthorityWriteService;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DirectorsListWritePlatformServiceImpl implements DirectorsListWritePlatformService {
    private final DirectorsListRepository directorsListRepository;
    private final DirectorsListWrapper directorsListWrapper;
    private final DirectorsSignAuthorityWriteService directorsSignAuthorityWriteService;
    @Override
    @Transactional
    public Response createDirectorsList(DirectorListDto createDirectorsdtoRequest) {
        try {
            List<CreateDirectorsListRequest> createDirectorsListRequest = createDirectorsdtoRequest.getCreateDirectorsListRequest();

            Integer kycId= createDirectorsListRequest.get(0).getKycId();
            Integer uid  =  createDirectorsListRequest.get(0).getUid();

            this.deActivate(kycId,uid);
            this.directorsSignAuthorityWriteService.deActivate(kycId, uid);

            CreateDirectorsSignAuthorityRequest  request1 =  createDirectorsdtoRequest.getCreateDirectorsSignAuthorityRequests();
            Response response= this.directorsSignAuthorityWriteService.createSignAuthority(request1);
            Integer id = (Integer) response.getId();

            List<DirectorsList> directorsLists = new ArrayList<>();

            for (CreateDirectorsListRequest request : createDirectorsListRequest) {
                DirectorsList directorsList = new DirectorsList();
                request.setAuthorityId(id);
                directorsLists.add(directorsList.create(request));
            }
            this.directorsListRepository.saveAllAndFlush(directorsLists);

            return Response.of(kycId);

        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response updateDirectorsList(Integer id, UpdateDirectorsListRequest updateDirectorsListRequest) {
        try {
            final DirectorsList directorsList = this.directorsListWrapper.findOneWithNotFoundDetection(id);
            directorsList.update(updateDirectorsListRequest);
            this.directorsListRepository.saveAndFlush(directorsList);

            return Response.of(Long.valueOf(directorsList.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response deActivate(Integer kycId, Integer euid) {
        try {
            List<DirectorsList> DirectorsLists = this.directorsListWrapper.findKycIdNotFoundDetection(kycId);
            Response response = null;
            for (DirectorsList directorsList : DirectorsLists) {
                directorsList.setEuid(euid);
                directorsList.setStatus(Status.DELETE);
                directorsList.setUpdatedAt(LocalDateTime.now());
                response = Response.of(directorsList.getId());
            }
            return response;
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}
