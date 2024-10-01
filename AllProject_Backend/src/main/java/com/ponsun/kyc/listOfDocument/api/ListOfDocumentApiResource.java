package com.ponsun.kyc.listOfDocument.api;

import com.ponsun.kyc.infrastructure.utils.Response;
import com.ponsun.kyc.listOfDocument.domain.ListOfDocument;
import com.ponsun.kyc.listOfDocument.request.CreateListOfDocumentRequest;
import com.ponsun.kyc.listOfDocument.request.UpdateListOfDocumentRequest;
import com.ponsun.kyc.listOfDocument.services.ListOfDocumentReadPlatformService;
import com.ponsun.kyc.listOfDocument.services.ListOfDocumentWritePlatformService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/ListOfDocument")
@Tag(name ="ListOfDocumentApiResource")
public class ListOfDocumentApiResource {
    private final ListOfDocumentWritePlatformService listOfDocumentWritePlatformService;
    private final ListOfDocumentReadPlatformService listOfDocumentReadPlatformService;

    @PostMapping("/CreateListOfDocumentRequest")
    public Response saveListOfDocument(@RequestBody CreateListOfDocumentRequest createListOfDocumentRequest){
       log.debug("START saveListOfDocument request body{}",createListOfDocumentRequest);
       Response response = this.listOfDocumentWritePlatformService.createListOfDocument(createListOfDocumentRequest);
       log.debug("START saveListOfDocument response",response);
       return response;
    }

    @GetMapping("/GetListOfDocument")
    public List<ListOfDocument> fetchAll() { return this.listOfDocumentReadPlatformService.fetchAllListOfDocument();}

    @GetMapping("/{id}")
    public ListOfDocument fetchListOfDocumentById(@PathVariable(name ="id")Integer id){
       return  this.listOfDocumentReadPlatformService.fetchListOfDocumentById(id);
    }

    @PutMapping("/{id}")
    public Response updateListOfDocument(@PathVariable Integer id, @RequestBody UpdateListOfDocumentRequest updateListOfDocumentRequest){
        log.debug("START updateListOfDocument request body {}",updateListOfDocumentRequest);
        Response response = this.listOfDocumentWritePlatformService.updateListOfDocument(id,updateListOfDocumentRequest);
        log.debug("START updateListOfDocument response",response);
        return  response;
    }
}
