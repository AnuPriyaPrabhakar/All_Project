package com.ponsun.kyc.Master.DeclarationForm.domain;



import com.ponsun.kyc.Master.DeclarationForm.request.CreateDeclarationFormRequest;
import com.ponsun.kyc.Master.DeclarationForm.request.UpdateDeclarationFormRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_declaration_form")
public class DeclarationForm extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "kycId")
    private Integer kycId;

    @Column(name = "memberName")
    private String memberName;

    @Column(name = "registeredPlace")
    private String registeredPlace;

    @Column(name = "din")
    private String din;

    @Column(name = "date")
    private String date;

    @Column(name = "place")
    private String place;

    @Column(name = "authorizeName")
    private String authorizeName;

    @Column(name="authorizeDesignation")
    private String authorizeDesignation;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;

    public static DeclarationForm create(final CreateDeclarationFormRequest createDeclarationFormRequest){
        final DeclarationForm DeclarationForm = new DeclarationForm();
        DeclarationForm.setKycId(createDeclarationFormRequest.getKycId());
        DeclarationForm.setMemberName(createDeclarationFormRequest.getMemberName());
        DeclarationForm.setRegisteredPlace(createDeclarationFormRequest.getRegisteredPlace());
        DeclarationForm.setDin(createDeclarationFormRequest.getDin());
        DeclarationForm.setDate(createDeclarationFormRequest.getDate());
        DeclarationForm.setPlace(createDeclarationFormRequest.getPlace());
        DeclarationForm.setAuthorizeName(createDeclarationFormRequest.getAuthorizeName());
        DeclarationForm.setAuthorizeDesignation(createDeclarationFormRequest.getAuthorizeDesignation());
        DeclarationForm.setUid(createDeclarationFormRequest.getUid());
        DeclarationForm.onCreate();
        DeclarationForm.setStatus(Status.ACTIVE);
        return DeclarationForm;
    }

   public void  update(final UpdateDeclarationFormRequest updateDeclarationFormRequest){
        this.setKycId(updateDeclarationFormRequest.getKycId());
       this.setMemberName(updateDeclarationFormRequest.getMemberName());
       this.setRegisteredPlace(updateDeclarationFormRequest.getRegisteredPlace());
       this.setDin(updateDeclarationFormRequest.getDin());
       this.setDate(updateDeclarationFormRequest.getDate());
       this.setPlace(updateDeclarationFormRequest.getPlace());
       this.setAuthorizeName(updateDeclarationFormRequest.getAuthorizeName());
       this.setAuthorizeDesignation(updateDeclarationFormRequest.getAuthorizeDesignation());
       this.setUid(updateDeclarationFormRequest.getUid());
       this.onCreate();
       this.setStatus(Status.ACTIVE);
    }

}
