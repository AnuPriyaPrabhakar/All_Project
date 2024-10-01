package com.ponsun.kyc.Master.DirectorsList.domain;


import com.ponsun.kyc.Master.DirectorsList.request.CreateDirectorsListRequest;
import com.ponsun.kyc.Master.DirectorsList.request.UpdateDirectorsListRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_board_directors_list")
public class DirectorsList extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "authorityId")
    private Integer authorityId;

    @Column(name = "kycId")
    private Integer kycId;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "middleName")
    private String middleName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "pan")
    private String pan;

    @Column(name = "nationality")
    private Integer nationality;

    @Column(name = "citizenship")
    private Integer citizenship;

    @Column(name = "domicile")
    private Integer domicile;

    @Column(name = "isDirector")
    private Integer isDirector;

    @Column(name = "isShareHolders")
    private Integer isShareHolders;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;

    @Column(name = "isScreening")
    private Integer isScreening;


    public static DirectorsList create(final CreateDirectorsListRequest createDirectorsListRequest){
        final DirectorsList directorsList = new DirectorsList();
        directorsList.setAuthorityId(createDirectorsListRequest.getAuthorityId());
        directorsList.setKycId(createDirectorsListRequest.getKycId());
        directorsList.setFirstName(createDirectorsListRequest.getFirstName());
        directorsList.setMiddleName(createDirectorsListRequest.getMiddleName());
        directorsList.setLastName(createDirectorsListRequest.getLastName());
        directorsList.setPan(createDirectorsListRequest.getPan());
        directorsList.setNationality(createDirectorsListRequest.getNationality());
        directorsList.setCitizenship(createDirectorsListRequest.getCitizenship());
        directorsList.setDomicile(createDirectorsListRequest.getDomicile());
        directorsList.setIsDirector(createDirectorsListRequest.getIsDirector());
        directorsList.setIsShareHolders(createDirectorsListRequest.getIsShareHolders());
        directorsList.setUid(createDirectorsListRequest.getUid());
        directorsList.setIsScreening(createDirectorsListRequest.getIsScreening());
        directorsList.onCreate();
        directorsList.setStatus(Status.ACTIVE);
        return directorsList;
    }

    public void update(final UpdateDirectorsListRequest request){
        this.setAuthorityId(request.getAuthorityId());
        this.setKycId(request.getKycId());
        this.setFirstName(request.getFirstName());
        this.setMiddleName(request.getMiddleName());
        this.setLastName(request.getLastName());
        this.setPan(request.getPan());
        this.setNationality(request.getNationality());
        this.setCitizenship(request.getCitizenship());
        this.setDomicile(request.getDomicile());
        this.setIsDirector(request.getIsDirector());
        this.setIsShareHolders(request.getIsShareHolders());
        this.setUid(request.getUid());
        this.setIsScreening(request.getIsScreening());
        this.onCreate();
        this.setStatus(Status.ACTIVE);
    }
}
