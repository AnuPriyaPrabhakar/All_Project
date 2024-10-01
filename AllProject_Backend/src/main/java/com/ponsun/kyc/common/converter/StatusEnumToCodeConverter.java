package com.ponsun.kyc.common.converter;


import com.ponsun.kyc.common.entity.Status;
import jakarta.persistence.AttributeConverter;

public class StatusEnumToCodeConverter implements AttributeConverter<Status, String> {

    @Override
    public String convertToDatabaseColumn(final Status status) {
        return status.getCode();
    }

    @Override
    public Status convertToEntityAttribute(final String code) {
        if(code != null) {
            return (code.equalsIgnoreCase("A")) ? Status.ACTIVE : Status.DELETE;
        }
        return null;
    }
}