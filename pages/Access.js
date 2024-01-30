import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { signIn, useSession } from "next-auth/react";

import GoogleIcon from "@mui/icons-material/Google";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import Router from "next/router";

// import BasicLayout from "/pagesComponents/authentication/components/BasicLayout";

function Basic() {
  const { data: session, status } = useSession();
  const [rememberMe, setRememberMe] = useState(false);
  console.log("session", session, status);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  useEffect(() => {
    if (session) {
      Router.push("/Landingpage");
    }
  });
  return (
    <>
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(/bg-sign-in-cover.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  mt={1}
                >
                  Sign in / Sign Up
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDButton
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={async () => {
                    await signIn("google");
                    Router.push("/Landingpage");
                  }}
                >
                  <GoogleIcon sx={{ color: "#DB4437" }} /> Sign In / Sign Up
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export default Basic;
