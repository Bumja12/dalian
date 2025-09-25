import { sql } from "@/lib/db";

export interface Place {
  id: number;
  name: string;
  address: string;
  rating: number;
  representativeMenus: string[];
  tags: string[];
  category: string;
  lat: number;
  lng: number;
}

export const getPlaces = async (): Promise<Place[]> => {
  const places = await sql`SELECT * FROM dalian.places`;
  return places as Place[];
};
