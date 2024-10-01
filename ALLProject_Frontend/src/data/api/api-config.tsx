import axios, { AxiosInstance } from "axios";

class ApiConfig {

    // private baseURL = 'http://192.168.1.65:8096';//san 
    // private baseURL = 'http://192.168.1.58:8096';
    // private baseURL = 'http://61.2.136.192:8091';
    // private basepepURL = 'http://192.168.1.65:8091';//pep 
    private baseSecURL = 'http://192.168.1.58:8093';//cms   
    // private basekycURL = 'http://192.168.1.58:8094';//kyc
    // private baseamlURL = 'http://192.168.1.58:8095';//aml
    // private basebtmsURL = 'http://192.168.1.58:8082';//btms
    // private basegoogleURL = 'http://localhost:8090';//googlesearch

    private baseURL = 'http://192.168.1.58:8096';//san
    private basepepURL = 'http://192.168.1.58:8090';//pep 
    // private baseSecURL = 'http://61.2.136.192:8092';//cms   
    private basekycURL = 'http://192.168.1.58:8094';//kyc
    private baseamlURL = 'http://192.168.1.58:8095';//aml
    private basebtmsURL = 'http://192.168.1.58:8082';//btms
    private basegoogleURL = 'http://localhost:8090';//googlesearch

    private apiBaseUrl: string;
    private apibaselocalSanURL: string;
    private apibaselocalSanBulkURL: string;
    private apiBaseSecUrl: string;
    private apibaselocalCmsURL: string;
    private apibasepepURL: string;
    private apibaselocalPepURL: string;
    private apibaseamlURL: string;
    private apibasebtmsURL: string;
    private apibasekycURL: string;
    private apibasegooglesearchURL: string;

    constructor() {
        this.apiBaseUrl = this.baseURL;
        this.apibaselocalSanURL = this.baseURL;
        this.apibaselocalSanBulkURL = this.baseURL;
        this.apiBaseSecUrl = this.baseSecURL;
        this.apibaselocalCmsURL = this.baseSecURL;
        this.apibasepepURL = this.basepepURL;
        this.apibaselocalPepURL = this.basepepURL;
        this.apibaseamlURL = this.baseamlURL;
        this.apibasebtmsURL = this.basebtmsURL;
        this.apibasekycURL = this.basekycURL;
        this.apibasegooglesearchURL = this.basegoogleURL;
    }

    private getApiBaseURL = () => {
        return this.apiBaseUrl;
    }

    public getAxiosInstance = () => {
        return axios.create({ baseURL: this.getApiBaseURL() });
    }

    private getApiLocalSanBaseURL = () => {
        return this.apibaselocalSanURL;
    }

    public getAxiosLocalSanInstance = () => {
        return axios.create({ baseURL: this.getApiLocalSanBaseURL() });
    }

    private getApiLocalSanBulkBaseURL = () => {
        return this.apibaselocalSanBulkURL;
    }

    public getAxiosLocalSanBulkInstance = () => {
        return axios.create({ baseURL: this.getApiLocalSanBulkBaseURL() });
    }

    private getApiBaseSecURL = () => {
        return this.apiBaseSecUrl;
    }

    public getAxiosSecInstance = () => {
        return axios.create({ baseURL: this.getApiBaseSecURL() });
    }

    private getApiLocalCmsBaseSecURL = () => {
        return this.apibaselocalCmsURL;
    }

    public getAxiosLocalCmsInstance = () => {
        return axios.create({ baseURL: this.getApiLocalCmsBaseSecURL() });
    }

    private getApiPepBaseSecURL = () => {
        return this.apibasepepURL;
    }

    public getAxiosThrirdInstance = () => {
        return axios.create({ baseURL: this.getApiPepBaseSecURL() });
    }

    private getApiLocalPepBaseSecURL = () => {
        return this.apibaselocalPepURL;
    }

    public getAxiosLocalPepInstance = () => {
        return axios.create({ baseURL: this.getApiLocalPepBaseSecURL() });
    }

    private getApiAmlBaseSecURL = () => {
        return this.apibaseamlURL;
    }

    public getAxiosFourInstance = () => {
        return axios.create({ baseURL: this.getApiAmlBaseSecURL() });
    }

    private getApiBtmsBaseSecURL = () => {
        return this.apibasebtmsURL;
    }

    public getAxiosFifthInstance = () => {
        return axios.create({ baseURL: this.getApiBtmsBaseSecURL() });
    }

    private getApiKYCBaseSecURL = () => {
        return this.apibasekycURL;
    }

    public getAxiosSevenInstance = () => {
        return axios.create({ baseURL: this.getApiKYCBaseSecURL() });
    }

    private getApiGoogleBaseSecURL = () => {
        return this.apibasegooglesearchURL;
    }

    public getAxiosgooleInstance = () => {
        return axios.create({ baseURL: this.getApiGoogleBaseSecURL() });
    }

}

export default ApiConfig;