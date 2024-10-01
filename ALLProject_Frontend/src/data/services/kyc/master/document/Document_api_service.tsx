import { toast } from "react-toastify";
import HttpClientWrapper from "../../../../api/http-client-wrapper";

class DocumentApiService {
    private httpClientWrapper: HttpClientWrapper;

    constructor() {
        this.httpClientWrapper = new HttpClientWrapper();
    }

  
    // async getImages(kycId: number) {
    //     try {
    //         const response = await this.httpClientWrapper.getLocalImage(`/api/v1/AlgorithamFileUpload/files/${kycId}`, { responseType: 'blob' });
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching bank images:", error);
    //         throw error;
    //     }
    // }

    // getName = async () => {
    //     try {
    //         const response = await this.httpClientWrapper.get('/api/v1/GetName');
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    // getName = async (kycId:number) => {
    //     try {
    //         const response = await this.httpClientWrapper.get(`/api/v1/NameSearch/KycFormNameSearch/{kycId}?kycId=${kycId}`);
    //         console.log("responseget",response);
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    
    // getImage = async (kycId:number=1) => {
    //     try {
    //         const response = await this.httpClientWrapper.getLocalImage(`/api/v1/AlgorithamFileUpload/files/kycId=${kycId}`);
    //         return response;
    //     } catch (error) {
    //         console.error("AddressApiService getLocalImage() error:", error);
    //         throw error;
    //     }
    // };

    uploadFiles = async (files: File[], kycId: number, pathIds: number[], isChecked: number[]) => {
        console.log('Starting file upload');
        const formData = new FormData();
        for (let file of files) {
            console.log(`Appending file: ${file.name}`);
            formData.append('files', file);
        }
        formData.append('kycId', String(kycId));
        formData.append('pathId', pathIds.join(','));
        formData.append('isChecked', isChecked.join(','));
        console.log('FormData prepared', formData);
    
        try {
            const response = await this.httpClientWrapper.postFormDatas('/api/v1/AlgorithamFileUpload/files/upload', formData);
            console.log('Upload response received', response.data);
            return response.data;
        } catch (error) {
            console.error('Error uploading files:', error);
            throw error;
        }
    };
 
  

    getPDF = async (pathId: number, kycId: number,imageName:string) => {
        try {
            const response: any = await this.httpClientWrapper.kycgetLocalPDF(`/api/v1/FileUpload/downloadCompanyFile/${kycId}?imageName=${imageName}&pathId=${pathId}`);
            const filename = typeof response === 'object' && response.headers
                ? (response.headers['content-disposition'] || '').split('filename=')[1]
                : 'default_filename.pdf';
            return { data: response, filename };
        } catch (error) {
            console.error("AddressApiService getPDF() error:", error);
            throw error;
        }
    };
    getName = async (kycId: number) => {
        try {
            const response = await this.httpClientWrapper.kycget(`/api/v1/NameSearch/KycFormNameSearch/${kycId}?kycId=${kycId}`);
            console.log("responseget", response);
            return response;
        } catch (error) {
            console.error('Error in getName:', error);
            throw error;
        }
    };

    getFilepath = async (kycId: number) => {
        try {
            const response = await this.httpClientWrapper.kycget(`/api/v1/AlgorithamFileUpload/getId/${kycId}`);
            console.log("responseFilepath", response);
            return response;
        } catch (error) {
            console.error('Error in getFilepath:', error);
            throw error;
        }
    };

  
    
   
    async getFiles(imgId: number, pathId: number){
        try {
            const response = await this.httpClientWrapper.kycgetLocalImage(`/api/v1/AlgorithamFileUpload/downloadFiles/${imgId}/${pathId}`);
            console.log("responseFile", response);
            return response;
        } catch (error) {
            console.error('Error in getFiles:', error);
            throw error;
        }
    }


}

export default DocumentApiService;

   
    // uploadFiles = async (files: File[], kycId: string) => {
    //     console.log('Starting file upload');
    //     const formData = new FormData();
    //     for (let file of files) {
    //         console.log(`Appending file: ${file.name}`);
    //         formData.append('files', file);
    //     }
    //     // formData.append('BankId', kycId);
    //     console.log('FormData prepared', formData);

    //     try {
    //         const response = await this.httpClientWrapper.postFormDatas('/api/v1/FileUpload/files/upload', formData);
    //         console.log('Upload response received', response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error uploading files:', error);
    //         throw error;
    //     }
    // };
  

  // saveCustomerRequest = async (
    //     files: File[]) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('PepDetailsWriteDTO', JSON.stringify(files));

    //         if (files && files.length > 0) {
    //             files.forEach((file, index) => {
    //                 if (file) {
    //                     formData.append('files', file);
    //                 }
    //             });
    //         }
    //         console.log('FormData:', formData);
    //         const response = await this.httpClientWrapper.postFormDatas('/api/v1/FileUpload/files/upload',formData);
    //         console.log('Response data:', response?.data);
    //         return response?.data;
    //     } catch (error) {
    //         console.error('AddressApiService saveCustomerDetails() error:', error);
    //         throw error;
    //     }
    // };

    // saveCustomerRequest = async (files: { [key: string]: File }) => {
    //     try {
    //         const formData = new FormData();
    //         Object.keys(files).forEach(key => {
    //             formData.append(key, files[key]);
    //         });
    
    //         const response = await this.httpClientWrapper.postFormDatas('/api/v1/FileUpload/files/upload', formData);
    //         console.log('Response data:', response?.data);
    //         return response?.data;
    //     } catch (error) {
    //         console.error('AddressApiService saveCustomerDetails() error:', error);
    //         throw error;
    //     }
    // };
    