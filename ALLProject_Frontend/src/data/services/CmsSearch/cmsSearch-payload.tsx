// export interface CmsSearchData {
//   searchDtos: SearchDtos[];
// };

// export interface SearchDtos {
//   id: number;
//   searchId: number;
//   name: string;
//   matchingScore: number;
//   fromDate: string;
//   toDate: string;
// };

// export interface SearchDetailsDataList {
//   id: number;
//   searchId: number;
//   name: string;
//   searchingScore: number;
//   typeId: number;
//   uid: number;
//   fromDate: string;
//   toDate: string;
// };
export interface CmsSearchData {
  searchDtos: SearchDto[];
}

export interface SearchDto {
  name: string;
  matchingScore: number | null;
  uid: number;
  fromDate: string;
  toDate: string;
  hitRecordData: HitRecordData[];
}

export interface HitRecordData {
  id: number;
  searchId: number;
  name: string;
  matchingScore: number;
  uid: number;
  criminalId: number;
  display: string;
  statusNowId: number;
  cycleId: number;
  fromDate: string;
  toDate: string;
}
