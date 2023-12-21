import { Container } from "@mui/material";
import ShopLayout2 from "../components/ShopLayout2";
import { Paragraph } from "../components/Typography";
import MypageWrapper from "../components/project/MyPageWrapper";

const MyPage = () => {
  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto" }}>
        <Paragraph
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            margin: "2rem",
          }}
        >
          MyPage
        </Paragraph>
        <MypageWrapper />
      </Container>
    </ShopLayout2>
  );
};

export default MyPage;
