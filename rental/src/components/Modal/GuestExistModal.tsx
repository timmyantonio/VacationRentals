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

export const GuestExistModal = ({
  guest,
  setShowModal,
  showModal,
}: {
  guest: IGuest | undefined;
  setShowModal: (value: boolean) => void;
  showModal: boolean;
}) => {
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
          <Typography textAlign="center" letterSpacing={1} fontWeight={600}>
            {guest?.contact.mobileNumber}
          </Typography>
          <Typography
            letterSpacing={1}
            textAlign="center"
          >{` is registered to ${guest?.name.forename.toUpperCase()} ${
            guest?.name.middleName ?? ""
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
              <Link href="/bookings">Click here to continue booking</Link>
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
