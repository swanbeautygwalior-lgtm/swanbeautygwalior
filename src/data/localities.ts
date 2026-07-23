export interface Locality {
  name: string;
  pincode: string;
  zone: string;
  estimatedArrival: string;
  available: boolean;
}

export const GWALIOR_LOCALITIES: Locality[] = [
  { name: 'City Centre', pincode: '474011', zone: 'Central Gwalior', estimatedArrival: '20-30 mins', available: true },
  { name: 'Morar', pincode: '474006', zone: 'East Gwalior', estimatedArrival: '25-35 mins', available: true },
  { name: 'Lashkar', pincode: '474001', zone: 'West Gwalior', estimatedArrival: '20-30 mins', available: true },
  { name: 'Thatipur', pincode: '474011', zone: 'Central Gwalior', estimatedArrival: '20-30 mins', available: true },
  { name: 'University Road / Govindpuri', pincode: '474011', zone: 'South Gwalior', estimatedArrival: '25-35 mins', available: true },
  { name: 'Patel Nagar', pincode: '474002', zone: 'Central Gwalior', estimatedArrival: '20-30 mins', available: true },
  { name: 'Deen Dayal Nagar (DD Nagar)', pincode: '474005', zone: 'North Gwalior', estimatedArrival: '30-40 mins', available: true },
  { name: 'Anand Nagar', pincode: '474012', zone: 'Central Gwalior', estimatedArrival: '20-30 mins', available: true },
  { name: 'Alkapuri', pincode: '474011', zone: 'South Gwalior', estimatedArrival: '25-35 mins', available: true },
  { name: 'Vinay Nagar', pincode: '474012', zone: 'North Gwalior', estimatedArrival: '30-40 mins', available: true },
  { name: 'Lalitpur Colony', pincode: '474009', zone: 'Lashkar Zone', estimatedArrival: '20-30 mins', available: true },
  { name: 'Windsor Hills / Shivpuri Link Road', pincode: '474001', zone: 'South Gwalior', estimatedArrival: '30-45 mins', available: true },
  { name: 'Phoolbagh / Padav', pincode: '474002', zone: 'Central Gwalior', estimatedArrival: '20-30 mins', available: true },
  { name: 'Dabra Road', pincode: '475110', zone: 'Outer Gwalior', estimatedArrival: '35-45 mins', available: true },
];
