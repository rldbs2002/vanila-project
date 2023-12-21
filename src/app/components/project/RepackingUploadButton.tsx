"use client";

import "@uploadthing/react/styles.css";
import { useState } from "react";
import Link from "next/link";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RepackingUploadButton({ data }: any) {
  const router = useRouter();
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);

  const [repackingConfirmation, setRepackingConfirmation] = useState(false);

  // Function to handle the upload completion
  const handleUploadComplete = async (res: any) => {
    if (res) {
      setImages(res);

      try {
        const imageFileUrls = res.map((image: any) => image.fileUrl);

        const response = await fetch(`/api/checkout/${data}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            repacking: {
              repacking_images: imageFileUrls,
              repacking_at: new Date(),
              repacking_confirm: repackingConfirmation,
            },
            status: 6,
          }),
        });

        if (response.ok) {
          console.log("Image file keys sent to the server.");
          router.push(`/checkout/${data}`);
        } else {
          console.error("Server responded with an error.");
        }
      } catch (error) {
        console.error("Error handling submission:", error);
      }
    }
  };

  return (
    <main className="flex flex-col items-end">
      {/* <h1>Repacking Image Upload</h1> */}
      <FormControlLabel
        control={
          <Checkbox
            checked={repackingConfirmation}
            onChange={() => setRepackingConfirmation(!repackingConfirmation)}
          />
        }
        label="Repacking Confirmation"
      />
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
