export interface SancSearchData {
    id: number;
    kycId: number;
    name: string;
    matching_score: number;
    identity: string;
}
export interface SancHitSearchData {
    id: number;
    searchId: number;
    name: string;
    matchingScore: number;
    display: string;
}
export interface KycSearchDetails {

    name: string;
    searchingScore: number;
    uid: number;
    kycId: number;
}
export interface KycSanSearchDetails {

    name: string;
    searchingScore: number;
    uid: number;
    kycId: number;
}
export interface KycCriminalSearchDetails {

    name: string;
    searchingScore: number;
    uid: number;
    kycId: number;
    screeningType:number;
    applicantFormId:number;
    isScreening:number;
}