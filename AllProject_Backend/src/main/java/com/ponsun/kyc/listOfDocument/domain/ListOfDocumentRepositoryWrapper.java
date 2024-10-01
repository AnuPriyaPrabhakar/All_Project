package com.ponsun.kyc.listOfDocument.domain;

import com.ponsun.kyc.listOfDocument.request.AbstractListOfDocumentRequest;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListOfDocumentRepositoryWrapper extends AbstractListOfDocumentRequest {
    private final ListOfDocumentRepository listOfDocumentRepository;
    @Transactional
    public ListOfDocument findOneWithNotFoundDetection(final Integer id){
        return this.listOfDocumentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("List Of Document Not found "+id));
    }
    @Override
    public String toString() { return  super.toString();}

}
