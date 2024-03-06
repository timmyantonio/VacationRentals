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
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useSetState } from "react-use";
import { yupResolver } from "@hookform/resolvers/yup";

// import DatePicker from "react-datepicker";
yup.addMethod(yup.object, "dayjs", function method(message) {
  return this.test("dayjs", message, function validate(value) {
    if (!value) {
      return true;
    }
    return dayjs.isDayjs(value);
  });
});
const bookingData = {
  _id: "123",
  guestId: "abc",
  unitId: "unit123",
  type: "online|onsite",
  agentCode: 123456,
  checkInDate: "date and time",
  checkOutDate: "date and time",
  numberOfAdults: 2,
  numberOfChildren: 1,
  payments: [],
  addOns: [],
  isFullyPaid: true,
  isCancelled: true,
  amount: 3500,
};

type FormType = {
  title: string;
  mobile: string;
  agentCode?: number;
  checkInDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  amount?: number;
  type: "online" | "onsite";
  name: {
    forename: string;
    surname: string;
    middleName?: string;
    suffix?: string;
  };
};
function NewBooking() {
  const [bookingState, setBookingState] = useSetState<FormType>({
    title: "",
    mobile: "",
    checkInDate: "",
    name: {
      forename: "",
      surname: "",
    },
    numberOfAdults: 0,
    numberOfChildren: 0,
    type: "online",
  });

  const defaultValues = {
    title: "",
    mobile: "",
    agentCode: 0,
    checkInDate: "",
    forename: "",
    surname: "",
    middleName: "",
    suffix: "",
    numberOfAdults: 0,
    numberOfChildren: 0,
    type: "",
  };

  const schema = yup.object().shape({
    title: yup
      .string()
      .oneOf(["mr", "mrs", "miss"], "Please select one of the options."),
    type: yup
      .string()
      .oneOf(["online", "onsite"], "Please select one of the options."),
    mobile: yup.string().required("This field is required."),
    forename: yup.string().required("This field is required."),
    surname: yup.string().required("This field is required."),
    middleName: yup.string(),
    checkInDate: yup.string().required("This field is required."),
    numberOfAdults: yup
      .number()
      .min(1, "At least 1 adult is present.")
      .typeError("This field is required."),
    numberOfChildren: yup.number().typeError("This field is required."),
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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleTitleChange = (event: SelectChangeEvent) => {
    setBookingState({ title: event.target.value });
  };
  const handleTypeChange = (event: SelectChangeEvent) => {
    setBookingState({ type: event.target.value as "onsite" | "online" });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Box sx={{ mx: 60, mt: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Box sx={{ width: "24%" }}>
            <FormControl fullWidth>
              <InputLabel id="booking-type-label">
                <Typography variant="subtitle2">Booking Type</Typography>
              </InputLabel>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    sx={{
                      "& fieldset": {
                        borderRadius: "50px",
                      },
                    }}
                    error={!!errors.type}
                    labelId="booking-type-label"
                    id="booking-type"
                    value={field.value as "online" | "onsite"}
                    label="Booking Type"
                    onBlur={field.onBlur}
                    onChange={(e: SelectChangeEvent<"online" | "onsite">) => {
                      field.onChange(e);
                      handleTypeChange(e);
                    }}
                  >
                    <MenuItem value="online">Online</MenuItem>
                    <MenuItem value="onsite">Onsite</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.type ? errors.type.message : null}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{ width: "24%" }}>
            <FormControl fullWidth>
              <InputLabel id="title-label">
                <Typography variant="subtitle2">Title</Typography>
              </InputLabel>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Select
                    sx={{
                      "& fieldset": {
                        borderRadius: "50px",
                      },
                    }}
                    id="title"
                    labelId="title-label"
                    error={!!errors.title}
                    value={field.value as "mr" | "mrs" | "ms"}
                    label="title"
                    onBlur={field.onBlur}
                    onChange={(e) => {
                      field.onChange(e);
                      handleTitleChange(e);
                    }}
                  >
                    <MenuItem value="mr">Mr</MenuItem>
                    <MenuItem value="mrs">Mrs</MenuItem>
                    <MenuItem value="ms">Miss</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.title ? errors.title.message : null}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <Controller
                  control={control}
                  name="forename"
                  render={({ field }) => (
                    <TextField
                      inputProps={{
                        style: { textAlign: "center" },
                      }}
                      sx={{
                        "& fieldset": {
                          borderRadius: "50px",
                        },
                        "& .MuiInputLabel-root": {
                          right: 0,
                          textAlign: "center",
                        },
                        "& .MuiInputLabel-shrink": {
                          margin: "0 auto",
                          position: "absolute",
                          right: "0",
                          left: "0",
                          top: "-3px",
                          width: "150px", // Need to give it a width so the positioning will work
                          background: "white", // Add a white background as below we remove the legend that had the background so text is not meshing with the border
                          // display: "none" //if you want to hide it completly
                        },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          "& legend ": {
                            display: "none",
                          },
                        },
                      }}
                      error={!!errors.forename}
                      helperText={
                        errors.forename ? errors.forename.message : null
                      }
                      fullWidth
                      label="Forename"
                      variant="outlined"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => {
                        field.onChange(e);
                        setBookingState((prevState) => ({
                          name: {
                            forename: e.target.value,
                            surname: prevState.name.surname,
                            middleName: prevState.name.middleName,
                            suffix: prevState.name.suffix,
                          },
                        }));
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3}>
                <Controller
                  control={control}
                  name="middleName"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      inputProps={{ style: { textAlign: "center" } }}
                      sx={{
                        "& fieldset": {
                          borderRadius: "50px",
                        },
                      }}
                      label="Middle name"
                      variant="outlined"
                      value={bookingState.name.middleName}
                      onBlur={field.onBlur}
                      onChange={(e) => {
                        field.onChange(e);

                        setBookingState((prevState) => ({
                          name: {
                            surname: prevState.name.surname,
                            forename: prevState.name.forename,
                            middleName: e.target.value,
                            suffix: prevState.name.suffix,
                          },
                        }));
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3}>
                <Controller
                  control={control}
                  name="surname"
                  render={({ field }) => (
                    <TextField
                      inputProps={{ style: { textAlign: "center" } }}
                      sx={{
                        "& fieldset": {
                          borderRadius: "50px",
                        },
                      }}
                      error={!!errors.surname}
                      helperText={
                        errors.surname ? errors.surname.message : null
                      }
                      fullWidth
                      label="Surname"
                      variant="outlined"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => {
                        field.onChange(e);
                        setBookingState((prevState) => ({
                          name: {
                            forename: prevState.name.forename,
                            surname: e.target.value,
                            middleName: prevState.name.middleName,
                            suffix: prevState.name.suffix,
                          },
                        }));
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3}>
                <TextField
                  fullWidth
                  inputProps={{ style: { textAlign: "center" } }}
                  sx={{
                    "& fieldset": {
                      borderRadius: "50px",
                    },
                  }}
                  label="Suffix"
                  variant="outlined"
                  value={bookingState.name.suffix}
                  onChange={(e) =>
                    setBookingState((prevState) => ({
                      name: {
                        surname: prevState.name.surname,
                        forename: prevState.name.forename,
                        middleName: prevState.name.middleName,
                        suffix: e.target.value,
                      },
                    }))
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Stack direction="row" spacing={2}>
            <Controller
              control={control}
              name="mobile"
              render={({ field }) => (
                <TextField
                  error={!!errors.mobile}
                  helperText={errors.mobile ? errors.mobile.message : null}
                  fullWidth
                  inputProps={{ style: { textAlign: "center" } }}
                  sx={{
                    "& fieldset": {
                      borderRadius: "50px",
                    },
                  }}
                  label="Mobile"
                  variant="outlined"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    field.onChange(e);
                    setBookingState({
                      mobile: e.target.value,
                    });
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="numberOfAdults"
              render={({ field }) => (
                <TextField
                  inputProps={{ style: { textAlign: "center" } }}
                  sx={{
                    "& fieldset": {
                      borderRadius: "50px",
                    },
                  }}
                  error={!!errors.numberOfAdults}
                  helperText={
                    errors.numberOfAdults ? errors.numberOfAdults.message : null
                  }
                  fullWidth
                  type="number"
                  label="Number Of Adults"
                  variant="outlined"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    field.onChange(e);
                    setBookingState({
                      numberOfAdults: +e.target.value,
                    });
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="numberOfChildren"
              render={({ field }) => (
                <TextField
                  inputProps={{ style: { textAlign: "center" } }}
                  sx={{
                    "& fieldset": {
                      borderRadius: "50px",
                    },
                  }}
                  error={!!errors.numberOfChildren}
                  helperText={
                    errors.numberOfChildren
                      ? errors.numberOfChildren.message
                      : null
                  }
                  fullWidth
                  type="number"
                  label="Number Of Children"
                  variant="outlined"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    field.onChange(e);
                    setBookingState({
                      numberOfChildren: +e.target.value,
                    });
                  }}
                />
              )}
            />
          </Stack>
          <Box sx={{ width: "24%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <Controller
                  control={control}
                  name="checkInDate"
                  render={({ field }) => (
                    <DatePicker
                      sx={{
                        "& fieldset": {
                          borderRadius: "50px",
                          borderColor: "primary.main",
                          borderWidth: 2,
                        },
                      }}
                      slotProps={{
                        textField: {
                          error: !!errors.checkInDate,
                          helperText: errors.checkInDate
                            ? errors.checkInDate.message
                            : null,
                          label: "Check-in date",
                          onBlur: field.onBlur,
                        },
                      }}
                      value={dayjs(field.value)}
                      onChange={(newValue: any) => {
                        field.onChange(newValue);
                        // setBookingState({ checkInDate: newValue });
                      }}
                      disablePast
                    />
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Stack>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}

export default NewBooking;
