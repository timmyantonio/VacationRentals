import * as yup from "yup";

import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { blue, blueGrey, green, grey } from "@mui/material/colors";
import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BookingDetailsFormType } from "../../../types/BookingDetailsFormType";
import { BorderColor } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { IGuest } from "../../../types/Guest";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "../../../components/Modal";
import { NumericFormat } from "react-number-format";
import PaymentModal from "../payment-modal";
import SaveIcon from "@mui/icons-material/Save";
import SearchGuest from "../../../components/SearchGuest";
import axios from "axios";
import { unit_price } from "../../../Config/pricing.json";
import { useSetState } from "react-use";
import { yupResolver } from "@hookform/resolvers/yup";

function NewBooking() {
  const [selectedUnit, setSelectedUnit] = useState<
    "select" | "standard" | "double" | "extra"
  >("select");
  const defaultValues: BookingDetailsFormType = {
    type: "online",
    unitType: "select",
    planDate: "",
    numberOfAdults: 0,
    numberOfChildren: 0,
    numberOfDays: 0,
  };

  const schema = yup.object().shape({
    type: yup
      .string()
      .oneOf(["online", "onsite"], "Please select a valid options."),
    unitType: yup
      .string()
      .oneOf(
        ["standard", "double", "extra"],
        "Please select one of the options."
      ),
    planDate: yup.string().required("This field is required."),
    numberOfAdults: yup
      .number()
      .min(1, "At least 1 adult is present.")
      .typeError("This field is required."),
    numberOfChildren: yup.number().typeError("This field is required."),
    numberOfDays: yup
      .number()
      .min(1, "Pleaser enter a valid number of days.")
      .typeError("This field is required."),
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
  const [guest, setGuest] = useState<IGuest | null>();
  const [formData, setFormData] =
    useState<BookingDetailsFormType>(defaultValues);
  const [showModal, setShowModal] = useState(false);
  const onSubmit = (data: any) => {
    setShowModal(true);
    setFormData((prevVal: BookingDetailsFormType) => ({ ...prevVal, ...data }));
    //setSelectedUnit("select");
    //reset(defaultValues);
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);
  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  return (
    <>
      {showModal && (
        <PaymentModal
          formData={formData}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
      <Box sx={{ mx: 50, mt: 5 }}>
        <Box sx={{ mb: 5 }}>
          <Typography
            fontWeight={500}
            color="primary"
            letterSpacing={4}
            textAlign="center"
            variant="h5"
          >
            New Booking Form
          </Typography>
        </Box>
        <Box marginBottom={5}>
          <SearchGuest setGuest={setGuest} />
        </Box>
        {guest && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <Controller
                          control={control}
                          name="planDate"
                          render={({ field }) => (
                            <DatePicker
                              sx={{
                                letterSpacing: 2,
                                "& fieldset": {
                                  borderRadius: "50px",
                                  borderColor: "secondary.main",
                                  borderWidth: 2,
                                },
                              }}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  fullWidth: true,
                                  inputProps: {
                                    style: {
                                      fontWeight: 800,
                                      textAlign: "center",
                                    },
                                  },
                                  error: !!errors.planDate,
                                  helperText: (
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        letterSpacing: 2,
                                        fontWeight: 800,
                                        variant: "subtitle2",
                                      }}
                                    >
                                      {errors.planDate
                                        ? errors.planDate.message
                                        : null}
                                    </Typography>
                                  ),
                                  label: (
                                    <Typography
                                      letterSpacing={2}
                                      fontWeight={800}
                                      variant="subtitle2"
                                    >
                                      Plan Date
                                    </Typography>
                                  ),
                                  value: field.value,
                                  onBlur: field.onBlur,
                                },
                              }}
                              // value={dayjs(field.value)}
                              onChange={field.onChange}
                              disablePast
                              format="MMMM DD, YYYY"
                            />
                          )}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid marginTop={1} item sm={3}>
                    <FormControl fullWidth>
                      <InputLabel id="number-of-days-label">
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Number of Days
                        </Typography>
                      </InputLabel>
                      <Controller
                        control={control}
                        name="numberOfDays"
                        render={({ field }) => (
                          <Select
                            size="small"
                            type="number"
                            sx={{
                              letterSpacing: 2,
                              "& fieldset": {
                                borderRadius: "50px",
                                borderColor: "secondary.main",
                                borderWidth: 2,
                              },
                            }}
                            error={!!errors.numberOfDays}
                            labelId="number-of-days-label"
                            id="number-of-days"
                            value={field.value}
                            label="Number of Days"
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                          >
                            {[...Array(28).keys()].map((index: number) => {
                              return (
                                <MenuItem value={index}>
                                  <Typography
                                    fontWeight={800}
                                    textAlign="center"
                                  >
                                    {index}
                                  </Typography>
                                </MenuItem>
                              );
                            })}
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
                        {errors.numberOfDays
                          ? errors.numberOfDays.message
                          : null}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  {selectedUnit != "select" && (
                    <Grid item sm={3}>
                      <Box>
                        <Typography
                          fontWeight={800}
                          letterSpacing={2}
                          paddingTop={3}
                          variant="body2"
                        >
                          {`₱${unit_price[selectedUnit]} / day`}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="booking-type-label">
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Booking Type
                        </Typography>
                      </InputLabel>
                      <Controller
                        control={control}
                        name="type"
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
                            error={!!errors.type}
                            labelId="booking-type-label"
                            id="booking-type"
                            value={field.value as "online" | "onsite"}
                            label="Booking Type"
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                          >
                            <MenuItem value="online">
                              <Typography fontWeight={800} textAlign="center">
                                Online
                              </Typography>
                            </MenuItem>
                            <MenuItem value="onsite">
                              <Typography fontWeight={800} textAlign="center">
                                Onsite
                              </Typography>
                            </MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText sx={{ color: "error.main" }}>
                        {errors.type ? errors.type.message : null}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="unit-type-label">
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Unit Type
                        </Typography>
                      </InputLabel>
                      <Controller
                        control={control}
                        name="unitType"
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
                            error={!!errors.unitType}
                            labelId="unit-type-label"
                            id="unit-type"
                            value={field.value}
                            label="Unit Type"
                            onBlur={field.onBlur}
                            onChange={(e: any) => {
                              field.onChange(e);
                              setSelectedUnit(e.target.value);
                            }}
                          >
                            <MenuItem value="select">
                              <Typography textAlign="center">
                                -- Select --
                              </Typography>
                            </MenuItem>
                            <MenuItem value="standard">
                              <Typography fontWeight={800} textAlign="center">
                                Standard
                              </Typography>
                            </MenuItem>
                            <MenuItem value="double">
                              <Typography fontWeight={800} textAlign="center">
                                Double
                              </Typography>
                            </MenuItem>
                            <MenuItem value="extra">
                              <Typography fontWeight={800} textAlign="center">
                                Extra
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
                        {errors.unitType ? errors.unitType.message : null}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="number-of-adults-label">
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Number of Adults
                        </Typography>
                      </InputLabel>
                      <Controller
                        control={control}
                        name="numberOfAdults"
                        render={({ field }) => (
                          <Select
                            size="small"
                            type="number"
                            inputProps={{ style: { textAlign: "center" } }}
                            sx={{
                              letterSpacing: 2,
                              "& fieldset": {
                                borderRadius: "50px",
                                borderColor: "secondary.main",
                                borderWidth: 2,
                              },
                            }}
                            error={!!errors.numberOfAdults}
                            labelId="number-of-adults-label"
                            id="number-of-adults"
                            value={field.value}
                            label="Number of Adults"
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                          >
                            {[...Array(28).keys()].map((index: number) => {
                              return (
                                <MenuItem value={index}>
                                  <Typography
                                    fontWeight={800}
                                    textAlign="center"
                                  >
                                    {index}
                                  </Typography>
                                </MenuItem>
                              );
                            })}
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
                        {errors.numberOfAdults
                          ? errors.numberOfAdults.message
                          : null}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="number-of-children-label">
                        <Typography
                          letterSpacing={2}
                          fontWeight={800}
                          variant="subtitle2"
                        >
                          Number of Children
                        </Typography>
                      </InputLabel>
                      <Controller
                        control={control}
                        name="numberOfChildren"
                        render={({ field }) => (
                          <Select
                            size="small"
                            type="number"
                            inputProps={{ style: { textAlign: "center" } }}
                            sx={{
                              letterSpacing: 2,
                              "& fieldset": {
                                borderRadius: "50px",
                                borderColor: "secondary.main",
                                borderWidth: 2,
                              },
                            }}
                            error={!!errors.numberOfChildren}
                            labelId="number-of-children-label"
                            id="number-of-children"
                            value={field.value}
                            label="Number of Children"
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                          >
                            {[...Array(28).keys()].map((index: number) => {
                              return (
                                <MenuItem value={index}>
                                  <Typography
                                    fontWeight={800}
                                    textAlign="center"
                                  >
                                    {index}
                                  </Typography>
                                </MenuItem>
                              );
                            })}
                          </Select>
                        )}
                      />
                      <FormHelperText sx={{ color: "error.main" }}>
                        {errors.numberOfChildren
                          ? errors.numberOfChildren.message
                          : null}
                      </FormHelperText>
                    </FormControl>
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
        )}
      </Box>
    </>
  );
}

export default NewBooking;
