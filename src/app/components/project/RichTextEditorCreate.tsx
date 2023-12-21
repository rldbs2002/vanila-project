"use client";

import dynamic from "next/dynamic";
import React, { useState, ChangeEvent, useEffect, FC } from "react";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";
import { Button, TextField, Box } from "@mui/material";
import ReactQuill from "react-quill";
import QuillNoSSRWriter from "./QuillNoSSRWriter";
import { useSession } from "next-auth/react";

const RichTextEditorCreate = ({}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillInstance = useRef<ReactQuill>(null);
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
      },
      imageCompress: {
        maxWidth: 400,
        maxHeight: 400,
        debug: true, // default
        suppressErrorLogging: false,
        insertIntoEditor: undefined,
      },
      ImageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const requestData = {
      content: content,
      title: title,
      writer: session?.user.role,
    };
    try {
      const response = await fetch("/api/notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        router.push("/notice");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={3}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
          style={{ marginBottom: 16, maxWidth: "1000px" }}
          fullWidth
        />

        <QuillNoSSRWriter
          forwardedRef={quillInstance}
          value={content}
          onChange={setContent}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
          style={{ maxWidth: "1000px", width: "100%", height: "800px" }}
        />

        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          style={{ marginTop: "5rem" }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default RichTextEditorCreate;
