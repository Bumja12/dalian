import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useMemo, useState } from "react";

type ImageData = {
  id: number;
  name: string;
  image_url: string;
};

type ImageCarouselProps = {
  menus?: ImageData[];
  mainImage?: string;
  images?: string[];
  options?: EmblaOptionsType;
  height?: number;
};

export default function ImageCarousel({
  menus = [],
  mainImage = "",
  images = [],
  options,
  height = 160,
}: ImageCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    ...options,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [imageDimensions, setImageDimensions] = useState<
    Record<string, { width: number; height: number }>
  >({});

  const handleImageLoad = (
    src: string,
    naturalWidth: number,
    naturalHeight: number
  ) => {
    setImageDimensions(prev => ({
      ...prev,
      [src]: { width: naturalWidth, height: naturalHeight },
    }));
  };

  const imageList = useMemo((): ImageData[] => {
    const mainImageData = mainImage
      ? [{ id: 0, name: "메인 이미지", image_url: mainImage }]
      : [];

    return [
      ...mainImageData,
      ...menus,
      ...images.map((image, index) => ({
        id: index + 10000,
        name: `이미지 ${index + 1}`,
        image_url: image,
      })),
    ];
  }, [images, mainImage, menus]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">
          {imageList.length > 0 &&
            imageList.map(image => {
              const imageDim = imageDimensions[image.image_url];
              const aspectRatio = imageDim
                ? imageDim.width / imageDim.height
                : 1;
              const width = height * aspectRatio;

              const minWidth = height * 0.7;
              const maxWidth = height * 1.8;
              const constrainedWidth = Math.max(
                minWidth,
                Math.min(maxWidth, width)
              );

              return (
                <div
                  key={image.id}
                  className="relative flex-none overflow-hidden rounded-lg bg-gray-100"
                  style={{
                    width: `${constrainedWidth}px`,
                    height: `${height}px`,
                  }}
                >
                  <Image
                    src={image.image_url}
                    alt={image.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                    onLoad={e => {
                      const img = e.target as HTMLImageElement;
                      handleImageLoad(
                        image.image_url,
                        img.naturalWidth,
                        img.naturalHeight
                      );
                    }}
                    unoptimized
                  />
                  <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-black/50 to-transparent p-2">
                    <p className="truncate text-sm font-medium text-white">
                      {image.name}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
