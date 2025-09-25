import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useState } from "react";

type ImageData = {
  src: string;
  alt: string;
};

type PropType = {
  images: ImageData[];
  options?: EmblaOptionsType;
  height?: number;
};

export default function ImageCarousel({
  images,
  options,
  height = 160,
}: PropType) {
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

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">
          {images.map((image, index) => {
            const imageDim = imageDimensions[image.src];
            const aspectRatio = imageDim ? imageDim.width / imageDim.height : 1;
            const width = height * aspectRatio;

            const minWidth = height * 0.7;
            const maxWidth = height * 1.8;
            const constrainedWidth = Math.max(
              minWidth,
              Math.min(maxWidth, width)
            );

            return (
              <div
                key={index}
                className="flex-none overflow-hidden rounded-lg bg-gray-100"
                style={{
                  width: `${constrainedWidth}px`,
                  height: `${height}px`,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                  onLoad={e => {
                    const img = e.target as HTMLImageElement;
                    handleImageLoad(
                      image.src,
                      img.naturalWidth,
                      img.naturalHeight
                    );
                  }}
                  unoptimized
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
