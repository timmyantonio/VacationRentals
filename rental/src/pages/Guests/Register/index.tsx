import * as yup from "yup";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useMemo, useState } from "react";
import {
  useGuestByMobileNumberQuery,
  useGuestsQuery,
  useNewGuestMutation,
} from "../../../store/api";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { GuestDetailFormType } from "../../../types/GuestDetailsFormType";
import { GuestExistModal } from "../../../components/Modal/GuestExistModal";
import { IGuest } from "../../../types/Guest";
import PaymentModal from "../../Bookings/payment-modal";
import SaveIcon from "@mui/icons-material/Save";
import Spinner from "../../../components/Spinner";
import { SuccessRegisterModal } from "../../../components/Modal/SuccessRegisterModal";
import { yupResolver } from "@hookform/resolvers/yup";

export const Register = () => {
  const [mobile, setMobile] = useState("");
  const [addGuest, addGuestResult] = useNewGuestMutation();
  const guestsResult = useGuestsQuery();
  const guest = useMemo(() => {
    return guestsResult.data?.find((g) => g.contact.mobileNumber === mobile);
  }, [mobile, guestsResult.data]);

  const defaultValues: GuestDetailFormType = {
    title: "",
    mobile: "",
    name: {
      forename: "",
      surname: "",
      middleName: "",
      suffix: "",
    },
    email: "",
    telephone: "",
  };

  const schema = yup.object().shape({
    title: yup
      .string()
      .oneOf(["mr", "mrs", "ms"], "Please select a valid options."),
    mobile: yup.string().required("This field is required."),
    telephone: yup.string().notRequired(),
    name: yup.object().shape({
      forename: yup.string().required("This field is required."),
      surname: yup.string().required("This field is required."),
      middleName: yup.string().nullable().notRequired(),
      suffix: yup.string().nullable().notRequired(),
    }),
    email: yup.string().email("Enter a valid email.").notRequired(),
  });

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const [showGuestFoundModal, setShowGuestFoundModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const onSubmit = (data: any) => {
    if (guest) {
      setShowGuestFoundModal(true);
    } else {
      addGuest({
        name: {
          title: data.title,
          forename: data.name.forename,
          middleName: data.name.middleName,
          surname: data.name.surname,
          suffix: data.name.suffix,
        },
        contact: {
          mobileNumber: data.mobile,
          email: data.email,
          telephoneNumber: data.telephone,
        },
        joinedDate: new Date(),
      })
        .unwrap()
        .then((result) => {
          result.guestId && setShowSuccessModal(true);
        });
    }
  };

  return (
    <Box sx={{ mx: 50, mt: 5 }}>
      {guest && (
        <GuestExistModal
          guest={guest}
          showModal={showGuestFoundModal}
          setShowModal={setShowGuestFoundModal}
        />
      )}
      {guestsResult.isLoading || (addGuestResult.isLoading && <Spinner />)}
      {addGuestResult.isSuccess && (
        <SuccessRegisterModal
          guest={guest}
          showModal={showSuccessModal}
          setShowModal={setShowSuccessModal}
        />
      )}
      <Box sx={{ mb: 5 }}>
        <Typography
          fontWeight={500}
          color="primary"
          letterSpacing={4}
          textAlign="center"
          variant="h5"
        >
          Guest Registration Form
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Box>
            <Grid container spacing={2}></Grid>
          </Box>

          <Box sx={{ width: "20%" }}>
            <FormControl fullWidth>
              <InputLabel id="title-label">
                <Typography
                  padding={0}
                  letterSpacing={2}
                  fontWeight={800}
                  variant="subtitle2"
                >
                  Title
                </Typography>
              </InputLabel>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Select
                    size="small"
                    sx={{
                      letterSpacing: 2,
                      "& fieldset": {
                        borderRadius: "50px",
                        borderColor: "secondary.main",
                        borderWidth: 2,
                      },
                    }}
                    id="title"
                    labelId="title-label"
                    error={!!errors.title}
                    value={field.value as "mr" | "mrs" | "ms"}
                    label="title"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  >
                    <MenuItem value="mr">
                      <Typography fontWeight={800} textAlign="center">
                        Mr
                      </Typography>
                    </MenuItem>
                    <MenuItem value="mrs">
                      <Typography fontWeight={800} textAlign="center">
                        Mrs
                      </Typography>
                    </MenuItem>
                    <MenuItem value="ms">
                      <Typography fontWeight={800} textAlign="center">
                        Miss
                      </Typography>
                    </MenuItem>
                  </Select>
                )}
              />
              <FormHelperText
                sx={{
                  color: "error.main",
                  letterSpacing: 2,
                  fontWeight: 800,
                  variant: "subtitle2",
                }}
              >
                {errors.title ? errors.title.message : null}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item sm={3.4}>
                <Controller
                  control={control}
                  name="name.forename"
                  render={({ field }) => (
                    <TextField
                      size="small"
                      inputProps={{
                        style: { textAlign: "center", fontWeight: 800 },
                      }}
                      sx={{
                        letterSpacing: 2,
                        "& fieldset": {
                          borderRadius: "50px",
                          borderColor: "secondary.main",
                          borderWidth: 2,
                        },
                      }}
                      error={!!errors.name?.forename}
                      helperText={
                        <Typography
                          variant="caption"
                          sx={{
                            letterSpacing: 2,
                            fontWeight: 800,
                            variant: "subtitle2",
                          }}
                        >
                          {errors.name?.forename
                            ? errors.name.forename.message
                            : null}
                        </Typography>
                      }
                      fullWidth
                      label={
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Forename
                        </Typography>
                      }
                      variant="outlined"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3.4}>
                <Controller
                  control={control}
                  name="name.middleName"
                  render={({ field }) => (
                    <TextField
                      size="small"
                      fullWidth
                      inputProps={{
                        style: { textAlign: "center", fontWeight: 800 },
                      }}
                      sx={{
                        letterSpacing: 2,
                        "& fieldset": {
                          borderRadius: "50px",
                          borderColor: "secondary.main",
                          borderWidth: 2,
                        },
                      }}
                      label={
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Middle name
                        </Typography>
                      }
                      variant="outlined"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3.4}>
                <Controller
                  control={control}
                  name="name.surname"
                  render={({ field }) => (
                    <TextField
                      size="small"
                      label={
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Surname
                        </Typography>
                      }
                      inputProps={{
                        style: { textAlign: "center", fontWeight: 800 },
                      }}
                      sx={{
                        letterSpacing: 2,
                        "& fieldset": {
                          borderRadius: "50px",
                          borderColor: "secondary.main",
                          borderWidth: 2,
                        },
                      }}
                      error={!!errors.name?.surname}
                      helperText={
                        <Typography
                          variant="caption"
                          sx={{
                            letterSpacing: 2,
                            fontWeight: 800,
                            variant: "subtitle2",
                          }}
                        >
                          {errors.name?.surname
                            ? errors.name.surname.message
                            : null}
                        </Typography>
                      }
                      fullWidth
                      variant="outlined"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={1.8}>
                <Controller
                  control={control}
                  name="name.suffix"
                  render={({ field }) => (
                    <TextField
                      size="small"
                      fullWidth
                      inputProps={{
                        style: { textAlign: "center", fontWeight: 800 },
                      }}
                      sx={{
                        letterSpacing: 2,
                        "& fieldset": {
                          borderRadius: "50px",
                          borderColor: "secondary.main",
                          borderWidth: 2,
                        },
                      }}
                      label={
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Suffix
                        </Typography>
                      }
                      variant="outlined"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item sm={4}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      size="small"
                      error={!!errors.email}
                      helperText={
                        <Typography
                          variant="caption"
                          sx={{
                            letterSpacing: 2,
                            fontWeight: 800,
                            variant: "subtitle2",
                          }}
                        >
                          {errors.email ? errors.email.message : null}
                        </Typography>
                      }
                      fullWidth
                      inputProps={{
                        style: { textAlign: "center", fontWeight: 800 },
                      }}
                      sx={{
                        letterSpacing: 2,
                        "& fieldset": {
                          borderRadius: "50px",
                          borderColor: "secondary.main",
                          borderWidth: 2,
                        },
                      }}
                      label={
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Email
                        </Typography>
                      }
                      variant="outlined"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4}>
                <Controller
                  control={control}
                  name="mobile"
                  render={({ field }) => (
                    <TextField
                      size="small"
                      error={!!errors.mobile}
                      helperText={
                        <Typography
                          variant="caption"
                          sx={{
                            letterSpacing: 2,
                            fontWeight: 800,
                            variant: "subtitle2",
                          }}
                        >
                          {errors.mobile ? errors.mobile.message : null}
                        </Typography>
                      }
                      fullWidth
                      inputProps={{
                        style: { textAlign: "center", fontWeight: 800 },
                      }}
                      sx={{
                        letterSpacing: 2,
                        "& fieldset": {
                          borderRadius: "50px",
                          borderColor: "secondary.main",
                          borderWidth: 2,
                        },
                      }}
                      label={
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Mobile
                        </Typography>
                      }
                      variant="outlined"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => {
                        field.onChange(e);
                        setMobile(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4}>
                <Controller
                  control={control}
                  name="telephone"
                  render={({ field }) => (
                    <TextField
                      size="small"
                      fullWidth
                      inputProps={{
                        style: { textAlign: "center", fontWeight: 800 },
                      }}
                      sx={{
                        letterSpacing: 2,
                        "& fieldset": {
                          borderRadius: "50px",
                          borderColor: "secondary.main",
                          borderWidth: 2,
                        },
                      }}
                      label={
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Telephone
                        </Typography>
                      }
                      variant="outlined"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Box sx={{ px: "20%", mt: 8, mb: 10 }}>
          <Button
            startIcon={<SaveIcon />}
            size="large"
            fullWidth
            sx={{ borderRadius: 8, textTransform: "none" }}
            variant="contained"
            color="secondary"
            type="submit"
          >
            <Typography fontWeight={800} letterSpacing={2}>
              Submit
            </Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
};
