"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import { cloudName } from "@/env";

type Props = {
  publicId: string;
  onValueChange: (value: string) => void;
  setImageUrl: Dispatch<SetStateAction<string>>;
  imageUrl: string;
};
const ImageUploader = ({
  publicId,
  onValueChange,
  setImageUrl,
  imageUrl,
}: Props) => {
  const [imgConfig, setImgConfig] = useState({ width: 0, height: 0 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadSuccess = (results: any) => {
    setImageUrl(results?.info?.secure_url);
    onValueChange(results?.info?.public_id);
    setImgConfig((prev) => ({
      ...prev,
      width: results?.info?.width,
      height: results?.info?.height,
    }));
  };

  const onUploadError = () => {
    toast.error("Failed to upload image, please try again");
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="onelga"
        options={{
          cloudName: cloudName,
          multiple: false,
          resourceType: "image",
        }}
        onSuccess={onUploadSuccess}
        onError={onUploadError}
      >
        {({ open }) => {
          return (
            <>
              {publicId && imageUrl ? (
                <Image
                  src={imageUrl}
                  width={imgConfig.width}
                  height={imgConfig.height}
                  alt="banner"
                  className="aspect-video mt-4 object-contain"
                />
              ) : (
                <div
                  onClick={() => open()}
                  className="flex flex-col items-center p-4 cursor-pointer"
                >
                  <ImageIcon className="size-12 text-gray-400" />
                  <p className="text-muted-foreground text-sm">Upload Image</p>
                </div>
              )}
            </>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUploader;
