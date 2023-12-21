// NoticeIdPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const NoticeContent = ({ data, onEdit }: any) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleEdit = () => {
    onEdit();
  };

  const handleDelete = async () => {
    // 공지를 삭제하는 로직을 구현합니다
    try {
      const response = await fetch(`/api/notice/${data._id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // 선택적으로 삭제 후 다른 페이지로 이동할 수 있습니다
        router.push("/notice");
      } else {
        console.error("공지 삭제 중 오류:", response.statusText);
      }
    } catch (error: any) {
      console.error("공지 삭제 중 오류:", error.message);
    }
  };

  return (
    <div>
      {data && (
        <>
          <h1 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            {data.title}
          </h1>
          <p>{new Date(data.date).toLocaleDateString()}</p>
          <hr />
          <p
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></p>
        </>
      )}
    </div>
  );
};

const NoticeContents = ({ data }: any) => {
  const [noticeData, setNoticeData] = useState<any>(null);
  const [editedContent, setEditedContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNoticeData(data);
        setEditedContent(data.content);
      } catch (error) {
        console.error("Error fetching notice data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div>
      <NoticeContent data={noticeData} />
    </div>
  );
};

export default NoticeContents;
