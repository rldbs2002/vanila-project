"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { Link as Scroll } from "react-scroll";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import { styled, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/styled-engine";
import clsx from "clsx";
import Image from "../components/BazaarImage";
import { FlexBox } from "../components/flex-box";
import Sidenav from "../components/Sidenav";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Icon from "@/app/components/icons";

const headerHeight = 72;

const slideFromTop = keyframes`
from { top: -${headerHeight}px; }
to { top: 0; }`;

const HeaderWrapper = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  "& .link": {
    cursor: "pointer",
    transition: "color 250ms ease-in-out",
    fontWeight: 500,
    "&:hover": { color: theme.palette.primary.main },
  },

  "& .fixedHeader": {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    background: "white",
    height: headerHeight,
    boxShadow: theme.shadows[2],
    animation: `${slideFromTop} 250ms ease-in-out`,
    "& .link": { color: "inherit" },
  },

  [theme.breakpoints.down("sm")]: {
    "& .right-links": { display: "none" },
    "& .purchase-link": { display: "none" },
  },
}));

const Header = () => {
  const session = useSession();
  const { data: login } = useSession();
  console.log(login?.user.role);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const toggleSidenav = () => setOpen((open) => !open);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" }); // 로그아웃 후 리다이렉트할 URL 설정
  };

  const scrollListener = debounce(() => {
    if (window?.pageYOffset >= headerHeight) setFixed(true);
    else setFixed(false);
  }, 50);

  return (
    <Fragment>
      <HeaderWrapper>
        <Box className={clsx({ fixedHeader: isFixed })}>
          <Container>
            <FlexBox height={headerHeight} alignItems="center">
              <Scroll to="top" duration={400} smooth={true} isDynamic>
                <Box sx={{ cursor: "pointer" }}>
                  <Link href="/">
                    {/* <Image
                      width="96px"
                      height="44px"
                      src="/assets/images/logo2.svg"
                      alt="logo"
                    /> */}
                    <Image
                      width="96px"
                      height="35px"
                      src="/assets/images/logo.png"
                      alt="logo"
                    />
                  </Link>
                </Box>
              </Scroll>

              <Box sx={{ mx: "auto" }}></Box>

              <FlexBox className="right-links" alignItems="center">
                {session.status === "unauthenticated" && (
                  <Fragment>
                    <Link href="/notice">
                      <Typography
                        className="link"
                        color="grey.600"
                        p="0.25rem 1.25rem"
                      >
                        Notice
                      </Typography>
                    </Link>

                    <Link href="/event">
                      <Typography
                        className="link"
                        color="grey.600"
                        p="0.25rem 1.25rem"
                      >
                        Event
                      </Typography>
                    </Link>
                  </Fragment>
                )}

                {session.status === "authenticated" && (
                  <Fragment>
                    {login?.user.role === "admin" ? (
                      <Fragment>
                        <Link href="/notice">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Notice
                          </Typography>
                        </Link>
                        <Link href="/event">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Event
                          </Typography>
                        </Link>

                        <Link href="/admin">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Admin
                          </Typography>
                        </Link>

                        <Link href="/admin/request">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Admin Request
                          </Typography>
                        </Link>

                        <Link href="/admin/cart">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Admin Cart
                          </Typography>
                        </Link>

                        <Link href="/admin/checkout">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Admin Checkout
                          </Typography>
                        </Link>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Link href="/notice">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Notice
                          </Typography>
                        </Link>
                        <Link href="/event">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Event
                          </Typography>
                        </Link>

                        <Link href="/newrequest">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            New Request
                          </Typography>
                        </Link>

                        <Link href="/requests">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Requests
                          </Typography>
                        </Link>

                        <Link href="/cart">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Cart
                          </Typography>
                        </Link>

                        <Link href="/checkout">
                          <Typography
                            className="link"
                            color="grey.600"
                            p="0.25rem 1.25rem"
                          >
                            Check out
                          </Typography>
                        </Link>

                        <Box component={IconButton}>
                          <Link href="/mypage">
                            <Icon.User
                              sx={{
                                color: "grey.600",
                                fontSize: 20,
                                marginRight: "0.3rem",
                              }}
                            />
                          </Link>
                        </Box>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </FlexBox>

              {!downSM && (
                <>
                  {session.status === "unauthenticated" ? (
                    <>
                      <Link href="/signin">
                        <Button variant="outlined" sx={{ mr: 1 }}>
                          Sign In
                        </Button>
                      </Link>

                      <Link href="/signup">
                        <Button variant="contained" color="primary">
                          Sign up
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={handleSignOut} // SignOut 버튼을 클릭할 때 로그아웃 함수 실행
                    >
                      Sign Out
                    </Button>
                  )}
                </>
              )}

              {/* mobile menu */}
              {downSM && (
                <Sidenav
                  open={open}
                  width={260}
                  position="right"
                  toggleSidenav={toggleSidenav}
                  handle={
                    <IconButton>
                      <Menu />
                    </IconButton>
                  }
                >
                  <Box
                    p={2}
                    sx={{
                      "& .link": {
                        cursor: "pointer",
                        transition: "color 250ms ease-in-out",
                        "&:hover": { color: "primary.main" },
                      },
                    }}
                  >
                    {session.status === "unauthenticated" ? (
                      <>
                        <Link href="/notice">
                          <Typography
                            className="link"
                            py={1}
                            mb={2}
                            onClick={toggleSidenav}
                          >
                            Notice
                          </Typography>
                        </Link>

                        <Link href="/event">
                          <Typography
                            className="link"
                            py={1}
                            mb={2}
                            onClick={toggleSidenav}
                          >
                            Event
                          </Typography>
                        </Link>
                      </>
                    ) : (
                      <>
                        {/* Admin-specific links for authenticated admin users */}
                        {login?.user.role === "admin" && (
                          <>
                            <Link href="/notice">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Notice
                              </Typography>
                            </Link>

                            <Link href="/event">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Event
                              </Typography>
                            </Link>

                            <Link href="/admin">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Admin
                              </Typography>
                            </Link>

                            <Link href="/admin/request">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Admin Request
                              </Typography>
                            </Link>

                            <Link href="/admin/cart">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Admin Cart
                              </Typography>
                            </Link>

                            <Link href="/admin/checkout">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Admin Checkout
                              </Typography>
                            </Link>
                          </>
                        )}

                        {login?.user.role === "user" && (
                          <>
                            <Link href="/notice">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Notice
                              </Typography>
                            </Link>

                            <Link href="/event">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Event
                              </Typography>
                            </Link>

                            <Link href="/newrequest">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                New Request
                              </Typography>
                            </Link>

                            <Link href="/requests">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Requests
                              </Typography>
                            </Link>

                            <Link href="/cart">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Cart
                              </Typography>
                            </Link>

                            <Link href="/checkout">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                Checkout
                              </Typography>
                            </Link>

                            <Link href="/mypage">
                              <Typography
                                className="link"
                                py={1}
                                mb={2}
                                onClick={toggleSidenav}
                              >
                                My page
                              </Typography>
                            </Link>
                          </>
                        )}
                      </>
                    )}

                    <>
                      {session.status === "unauthenticated" ? (
                        <>
                          <Link href="/signin">
                            <Typography
                              className="link"
                              py={1}
                              mb={2}
                              onClick={toggleSidenav}
                            >
                              Sign In
                            </Typography>
                          </Link>
                        </>
                      ) : (
                        <Typography
                          variant="button"
                          className="link"
                          sx={{
                            cursor: "pointer",
                            marginRight: "1rem",
                            display: "inline-block",
                          }}
                          onClick={() => {
                            handleSignOut(); // SignOut을 클릭할 때 로그아웃 함수 실행
                          }}
                        >
                          Sign Out
                        </Typography>
                      )}
                    </>
                  </Box>
                </Sidenav>
              )}
            </FlexBox>
          </Container>
        </Box>
      </HeaderWrapper>

      {isFixed && <Box height={headerHeight} />}
    </Fragment>
  );
};

export default Header;
