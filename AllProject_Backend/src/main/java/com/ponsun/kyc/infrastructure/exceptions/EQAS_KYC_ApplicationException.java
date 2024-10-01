package com.ponsun.kyc.infrastructure.exceptions;

public class EQAS_KYC_ApplicationException extends AbstractPlatformException{

    public EQAS_KYC_ApplicationException(String message){
        super("error.msg.generic",message);
    }
}
