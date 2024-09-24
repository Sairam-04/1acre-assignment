interface LandData {
  id: number;
  lat: string;
  long: string;
  total_land_size_in_acres: {
    acres: number;
    guntas: number;
  };
  price_per_acre_crore: {
    crore: number;
    lakh: number;
  };
  status: string;
  exposure_type: string;
  seller_type: string;
  division_slugs: {
    state: string;
    district: string;
    mandal: string;
    village: string;
  };
  highway_facing: boolean;
}