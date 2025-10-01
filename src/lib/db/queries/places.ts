import { sql } from "@/lib/db";

// 장소 메뉴 타입 (Place에서 사용)
export interface PlaceMenu {
  id: number;
  name: string;
  image_url: string;
}

// 장소 등록 시 메뉴 입력 타입
export interface PlaceRegistrationMenu {
  name: string;
  image: string;
}

export interface Place {
  id: number;
  name: string;
  address: string;
  rating: number;
  menus: PlaceMenu[];
  tags: string[];
  category: string;
  lat: number;
  lng: number;
  image_url: string;
  images: string[];
}

// 장소 등록을 위한 입력 데이터 타입
export interface PlaceRegistrationData {
  name: string;
  address: string;
  rate: number;
  menu: PlaceRegistrationMenu[];
  images: string[];
  main_image: string;
  category: string;
  tags: string[];
  lat: number;
  lng: number;
}

// 데이터베이스 쿼리 결과 타입들
interface PlaceQueryResult {
  id: number;
  name: string;
  address: string;
  category: string;
  lat: number;
  lng: number;
  rating: number;
  image_url: string;
  menus: PlaceMenu[] | null;
  tags: string[] | null;
  images: string[] | null;
}

interface TagQueryResult {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export const getPlaces = async (): Promise<Place[]> => {
  const places = await sql`
    SELECT
      p.id,
      p.name,
      p.address,
      p.category,
      p.lat,
      p.lng,
      p.rating,
      p.image_url,
      COALESCE((
        SELECT ARRAY_AGG(JSON_BUILD_OBJECT('id', m.id, 'name', m.name, 'image_url', m.image_url))
        FROM dalian.menus m
        WHERE m.place_id = p.id
      ), '{}') as menus,
      COALESCE((
        SELECT ARRAY_AGG(DISTINCT t.name)
        FROM dalian.place_tags pt
        JOIN dalian.tags t ON pt.tag_id = t.id
        WHERE pt.place_id = p.id
      ), '{}') as tags,
      COALESCE((
        SELECT ARRAY_AGG(pi.image_url)
        FROM dalian.place_images pi
        WHERE pi.place_id = p.id
      ), '{}') as images
    FROM dalian.places p
    ORDER BY p.created_at DESC
  `;

  // PostgreSQL 배열을 JavaScript 배열로 변환
  return (places as PlaceQueryResult[]).map(place => ({
    id: place.id,
    name: place.name,
    address: place.address,
    category: place.category,
    lat: place.lat,
    lng: place.lng,
    rating: place.rating,
    image_url: place.image_url,
    menus: Array.isArray(place.menus)
      ? (place.menus.filter(
          (item: PlaceMenu | null) => item !== null
        ) as PlaceMenu[])
      : [],
    tags: Array.isArray(place.tags)
      ? (place.tags.filter((item: string | null) => item !== null) as string[])
      : [],
    images: Array.isArray(place.images)
      ? (place.images.filter(
          (item: string | null) => item !== null
        ) as string[])
      : [],
  })) as Place[];
};

// 장소 등록 함수
export const createPlace = async (
  placeData: PlaceRegistrationData
): Promise<number> => {
  const {
    name,
    address,
    rate,
    menu,
    images,
    main_image,
    category,
    tags,
    lat,
    lng,
  } = placeData;

  try {
    // 1. places 테이블에 기본 장소 정보 삽입
    const [placeResult] = await sql`
      INSERT INTO dalian.places (name, address, category, rating, lat, lng, image_url)
      VALUES (${name}, ${address}, ${category}, ${rate}, ${lat}, ${lng}, ${main_image})
      RETURNING id
    `;
    const placeId = placeResult.id;

    // 2. tags 테이블에 태그들 삽입 (중복 방지)
    if (tags.length > 0) {
      for (const tag of tags) {
        await sql`
          INSERT INTO dalian.tags (name)
          VALUES (${tag})
          ON CONFLICT (name) DO NOTHING
        `;
      }
    }

    // 3. place_tags 테이블에 장소-태그 관계 삽입
    if (tags.length > 0) {
      // 태그 ID들을 가져옴
      const tagResults = await sql`
        SELECT id, name FROM dalian.tags WHERE name = ANY(${tags})
      `;

      const tagIdMap = new Map(
        (tagResults as TagQueryResult[]).map(tr => [tr.name, tr.id])
      );

      for (const tag of tags) {
        const tagId = tagIdMap.get(tag);
        if (tagId) {
          await sql`
            INSERT INTO dalian.place_tags (place_id, tag_id)
            VALUES (${placeId}, ${tagId})
          `;
        }
      }
    }

    // 4. menus 테이블에 메뉴들 삽입
    if (menu.length > 0) {
      for (const menuItem of menu) {
        await sql`
          INSERT INTO dalian.menus (name, image_url, place_id)
          VALUES (${menuItem.name}, ${menuItem.image}, ${placeId})
        `;
      }
    }

    // 5. place_images 테이블에 이미지들 삽입
    if (images.length > 0) {
      for (const imageUrl of images) {
        await sql`
          INSERT INTO dalian.place_images (image_url, place_id)
          VALUES (${imageUrl}, ${placeId})
        `;
      }
    }

    return placeId;
  } catch (error) {
    console.error("장소 등록 중 오류 발생:", error);
    throw error;
  }
};

export const getTags = async (): Promise<Tag[]> => {
  const tags = await sql`
    SELECT id, name
    FROM dalian.tags
    ORDER BY name ASC
  `;

  return (tags as TagQueryResult[]).map(tag => ({
    id: tag.id,
    name: tag.name,
  }));
};

export const getPlacesWithFilters = async (
  categories?: string[],
  tagIds?: number[]
): Promise<Place[]> => {
  // 필터가 없으면 전체 데이터 반환
  if (
    (!categories || categories.length === 0) &&
    (!tagIds || tagIds.length === 0)
  ) {
    return getPlaces();
  }

  let query;

  // 카테고리만 필터링
  if (categories && categories.length > 0 && (!tagIds || tagIds.length === 0)) {
    query = sql`
      SELECT
        p.id,
        p.name,
        p.address,
        p.category,
        p.lat,
        p.lng,
        p.rating,
        p.image_url,
        COALESCE((
          SELECT ARRAY_AGG(JSON_BUILD_OBJECT('id', m.id, 'name', m.name, 'image_url', m.image_url))
          FROM dalian.menus m
          WHERE m.place_id = p.id
        ), '{}') as menus,
        COALESCE((
          SELECT ARRAY_AGG(DISTINCT t.name)
          FROM dalian.place_tags pt
          JOIN dalian.tags t ON pt.tag_id = t.id
          WHERE pt.place_id = p.id
        ), '{}') as tags,
        COALESCE((
          SELECT ARRAY_AGG(pi.image_url)
          FROM dalian.place_images pi
          WHERE pi.place_id = p.id
        ), '{}') as images
      FROM dalian.places p
      WHERE p.category = ANY(${categories})
      ORDER BY p.created_at DESC
    `;
  }
  // 태그만 필터링
  else if (
    tagIds &&
    tagIds.length > 0 &&
    (!categories || categories.length === 0)
  ) {
    query = sql`
      SELECT
        p.id,
        p.name,
        p.address,
        p.category,
        p.lat,
        p.lng,
        p.rating,
        p.image_url,
        COALESCE((
          SELECT ARRAY_AGG(JSON_BUILD_OBJECT('id', m.id, 'name', m.name, 'image_url', m.image_url))
          FROM dalian.menus m
          WHERE m.place_id = p.id
        ), '{}') as menus,
        COALESCE((
          SELECT ARRAY_AGG(DISTINCT t.name)
          FROM dalian.place_tags pt
          JOIN dalian.tags t ON pt.tag_id = t.id
          WHERE pt.place_id = p.id
        ), '{}') as tags,
        COALESCE((
          SELECT ARRAY_AGG(pi.image_url)
          FROM dalian.place_images pi
          WHERE pi.place_id = p.id
        ), '{}') as images
      FROM dalian.places p
      WHERE EXISTS (
        SELECT 1 FROM dalian.place_tags pt
        WHERE pt.place_id = p.id AND pt.tag_id = ANY(${tagIds})
      )
      ORDER BY p.created_at DESC
    `;
  }
  // 카테고리와 태그 모두 필터링
  else {
    query = sql`
      SELECT
        p.id,
        p.name,
        p.address,
        p.category,
        p.lat,
        p.lng,
        p.rating,
        p.image_url,
        COALESCE((
          SELECT ARRAY_AGG(JSON_BUILD_OBJECT('id', m.id, 'name', m.name, 'image_url', m.image_url))
          FROM dalian.menus m
          WHERE m.place_id = p.id
        ), '{}') as menus,
        COALESCE((
          SELECT ARRAY_AGG(DISTINCT t.name)
          FROM dalian.place_tags pt
          JOIN dalian.tags t ON pt.tag_id = t.id
          WHERE pt.place_id = p.id
        ), '{}') as tags,
        COALESCE((
          SELECT ARRAY_AGG(pi.image_url)
          FROM dalian.place_images pi
          WHERE pi.place_id = p.id
        ), '{}') as images
      FROM dalian.places p
      WHERE p.category = ANY(${categories}) AND EXISTS (
        SELECT 1 FROM dalian.place_tags pt
        WHERE pt.place_id = p.id AND pt.tag_id = ANY(${tagIds})
      )
      ORDER BY p.created_at DESC
    `;
  }

  const places = await query;

  // PostgreSQL 배열을 JavaScript 배열로 변환
  return (places as PlaceQueryResult[]).map(place => ({
    id: place.id,
    name: place.name,
    address: place.address,
    category: place.category,
    lat: place.lat,
    lng: place.lng,
    rating: place.rating,
    image_url: place.image_url,
    menus: Array.isArray(place.menus)
      ? (place.menus.filter(
          (item: PlaceMenu | null) => item !== null
        ) as PlaceMenu[])
      : [],
    tags: Array.isArray(place.tags)
      ? (place.tags.filter((item: string | null) => item !== null) as string[])
      : [],
    images: Array.isArray(place.images)
      ? (place.images.filter(
          (item: string | null) => item !== null
        ) as string[])
      : [],
  })) as Place[];
};
