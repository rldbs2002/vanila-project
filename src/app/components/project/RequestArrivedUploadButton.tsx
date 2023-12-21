"use client";

import "@uploadthing/react/styles.css";
import { useState, useEffect } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RequestArrivedUploadButton({ data }: any) {
  const router = useRouter();

  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);

  const [arrivedConfirmation, setArrivedConfirmation] = useState(false);

  // Function to handle the upload completion
  const handleUploadComplete = async (res: any) => {
    if (res) {
      setImages(res);

      try {
        const imageFileUrls = res.map((image: any) => image.fileUrl);

        console.log("Image URLs:", imageFileUrls); // Log the image URLs

        const response = await fetch(`/api/request/${data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            arrived: {
              arrived_images: imageFileUrls,
              arrived_at: new Date(),
              arrived_confirm: arrivedConfirmation,
            },
            status: 2,
          }),
        });

        if (response.ok) {
          console.log("Image file keys sent to the server.");
          router.push(`/admin/request`);
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
      <h1>Arrived Image Upload</h1>
      <FormControlLabel
        control={
          <Checkbox
            checked={arrivedConfirmation}
            onChange={() => setArrivedConfirmation(!arrivedConfirmation)}
          />
        }
        label="Arrived Confirmation"
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
