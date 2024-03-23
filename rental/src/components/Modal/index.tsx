import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Modal as MuiModal,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
  ModalProps,
} from "@mui/material";

function Modal({ children, ...props }: ModalProps & { header: string }) {
  const theme = useTheme();
  const style = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 5,
    p: 4,
    border: `5px ${theme.palette.primary.main} solid`,
    borderRadius: 5,
  };
  return (
    <>
      <MuiModal {...props}>
        <Box position="absolute" sx={style}>
          <Box position="absolute" right={1} top={1}>
            <IconButton
              onClick={props.onClose as () => void}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Stack spacing={3}>
            <Typography
              fontFamily={"Montserrat"}
              textAlign={"center"}
              variant="h4"
            >
              {props.header}
            </Typography>
            {children}
          </Stack>
        </Box>
      </MuiModal>
    </>
  );
}

export default Modal;
