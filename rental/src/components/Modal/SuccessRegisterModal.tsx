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

export const SuccessRegisterModal = ({
  guest,
  setShowModal,
  showModal,
}: {
  guest: IGuest | undefined;
  setShowModal: (value: boolean) => void;
  showModal: boolean;
}) => {
  return (
    <Modal
      header="Registration complete"
      open={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <>
        <Stack justifyContent="center" spacing={1}>
          <Box textAlign="center">
            <Link href="/bookings">Click here to continue booking</Link>
          </Box>
          <Box textAlign="right">
            <Button
              onClick={() => {
                setShowModal(false);
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
