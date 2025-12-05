export interface RawExhibitionItem {
  seq: string;
  title: string;
  place: string;
  startDate: string;
  endDate: string;
  realmName: string;
  thumbnail: string;
  area: string;
  sigungu: string;
  gpsY: string;
  gpsX: string;
}

export interface ExhibitionBody {
  items: {
    item: RawExhibitionItem | RawExhibitionItem[];
  };
  numOfrows: string;
  pageNo: string;
  totalCount: string;
}

export interface PublicApiExhibitionResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: ExhibitionBody;
  };
}

export interface Exhibition {
  id: number;
  title: string;
  location: string;
  date: string;
  category: string;
  image: string;
  region: string;
  specificRegion: string;
  lat: number;
  lng: number;
}

export interface ExhibitionsResponse {
  exhibitions: Exhibition[];
  totalCount: number;
  currentPage: number;
  hasMore: boolean;
}
