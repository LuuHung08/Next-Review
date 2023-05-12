export interface StationProps {
  address: string;
  bicycles: any[];
  closeTime: string;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  distance: number;
  id: number;
  isActive: boolean;
  lat: number;
  long: number;
  name: string;
  openTime: string;
  parking: number;
  searchAddress: string;
  updatedAt: string;
}

export interface LocationProps {
  lat: number;
  lng: number;
}

export interface MapProps {
  id: number;
  lat: number;
  long: number;
  status: string;
  commune: string;
  country: string;
  district: string;
  map_captured: string;
  name: string;
  province: string;
  street: string;
  user_full_name: string;
  is_blacklist: boolean;
  isLock: boolean;
  user_name_owner: {
    username: string;
    full_name: string;
  };
  user_id: {
    username: string;
    full_name: string;
  };
}
