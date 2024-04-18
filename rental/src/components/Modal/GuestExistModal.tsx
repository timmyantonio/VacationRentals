import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { IGuest } from "../../types/Guest";
import Modal from ".";
import { useNavigate } from "react-router-dom";

export const GuestExistModal = ({
  guest,
  setShowModal,
  showModal,
}: {
  guest: IGuest | undefined;
  setShowModal: (value: boolean) => void;
  showModal: boolean;
}) => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  return (
    <Modal
      header="Guest Exist"
      open={showModal}
      onClose={() => {
        setShowModal(false);
        setVerified(false);
      }}
    >
      <>
        <Stack justifyContent="center" spacing={1}>
          <Typography
            textAlign="center"
            variant="h5"
            letterSpacing={2}
            fontWeight={600}
          >
            {guest?.contact.mobileNumber}
          </Typography>
          <Typography
            letterSpacing={1}
            textAlign="center"
          >{` is registered to ${guest?.name.forename.toUpperCase()} ${
            guest?.name.middleName
              ? guest?.name.middleName[0].toUpperCase() + "."
              : ""
          } ${guest?.name.surname.toUpperCase()} ${
            guest?.name.suffix ?? ""
          }`}</Typography>
          <Box textAlign="center">
            <FormControlLabel
              label={
                <Typography
                  letterSpacing={1}
                  fontWeight={800}
                  variant="subtitle2"
                  color="error.dark"
                >
                  Is this correct?
                </Typography>
              }
              control={
                <Checkbox
                  disableRipple
                  checked={verified}
                  onChange={() => setVerified(!verified)}
                />
              }
            />
          </Box>
          {verified && (
            <Box textAlign="center">
              {/* <Link href="/bookings">Click here to continue booking</Link> */}
              <Button
                onClick={() =>
                  navigate("/bookings", { state: { guest: guest } })
                }
                sx={{ textTransform: "none" }}
              >
                <Typography variant="h6">
                  Click here to continue booking
                </Typography>
              </Button>
            </Box>
          )}
          <Box textAlign="right">
            <Button
              onClick={() => {
                setShowModal(false);
                setVerified(false);
              }}
              size="small"
              color="error"
              variant="contained"
            >
              Close
            </Button>
          </Box>
        </Stack>
      </>
    </Modal>
  );
};
