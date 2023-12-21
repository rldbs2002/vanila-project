import { FC } from "react";
import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/project/Mdx";
import ShopLayout2 from "@/app/components/ShopLayout2";
import Card1 from "@/app/components/Card1";
import { Container, Box } from "@mui/material";
import { H2 } from "@/app/components/Typography";

interface pageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) notFound();

  return doc;
}

const page = async ({ params }: pageProps) => {
  const doc = await getDocFromParams(params.slug);

  // doc.date 값을 Date 객체로 파싱합니다.
  const dateObj = new Date(doc.date);

  // 날짜를 원하는 형식으로 포맷팅합니다.
  const formattedDate = dateObj.toISOString().split("T")[0]; // "2021-12-24" 형식으로 변환

  return (
    <ShopLayout2>
      <Box sx={{ backgroundColor: "grey.100" }}>
        <Container sx={{ py: 6, maxWidth: "80%" }}>
          <H2
            fontSize={36}
            textAlign="center"
            fontWeight="700"
            color="secondary.main"
            mb={5}
            textTransform="uppercase"
          >
            BLOGS
          </H2>
        </Container>
      </Box>
      <Container sx={{ my: "5rem", maxWidth: "80%", mx: "auto" }}>
        <Card1>
          <h3
            style={{
              fontSize: "2rem",
              margin: "10px 0",
              overflow: "hidden",
              fontWeight: "bold",
            }}
          >
            {doc.title}
          </h3>
          <p style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
            {formattedDate}
          </p>
          <hr></hr>
          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Mdx code={doc.body.code} />
          </div>
        </Card1>
      </Container>
    </ShopLayout2>
  );
};

export default page;
