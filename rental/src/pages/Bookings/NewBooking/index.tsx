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
import React, { forwardRef, useEffect, useState } from "react";
import { addDays, differenceInDays, format } from "date-fns";
import { blue, blueGrey, green, grey } from "@mui/material/colors";
import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BookingDetailsFormType } from "../../../types/BookingDetailsFormType";
import { BorderColor } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { IGuest } from "../../../types/Guest";
import { IUnit } from "../../../types/Unit";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "../../../components/Modal";
import { NumericFormat } from "react-number-format";
import PaymentModal from "../payment-modal";
import ReactDatePicker from "react-datepicker";
import SaveIcon from "@mui/icons-material/Save";
import SearchGuest from "../../../components/SearchGuest";
import axios from "axios";
import { formatDate } from "date-fns/format";
import { unit_price } from "../../../Config/pricing.json";
import { useGetUnitsByDescriptionAndStatusQuery } from "../../../store/api";
import { useLocation } from "react-router-dom";
import { useSetState } from "react-use";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues: BookingDetailsFormType = {
  type: "online",
  unitType: "select",
  startDate: "",
  endDate: "",
  numberOfAdults: 0,
  numberOfChildren: 0,
};
function NewBooking() {
  const location = useLocation();
  const [guest, setGuest] = useState<IGuest | null>();
  const [formData, setFormData] =
    useState<BookingDetailsFormType>(defaultValues);
  const [showModal, setShowModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<IUnit | null>();
  const [selectedUnitType, setSelectedUnitType] = useState<
    "select" | "standard" | "double" | "extra"
  >("select");
  const {
    data: units,
    isLoading,
    isError,
  } = useGetUnitsByDescriptionAndStatusQuery(
    {
      description: selectedUnitType,
      status: "available",
    },
    { skip: selectedUnitType === "select" }
  );

  useEffect(() => {
    setGuest(location.state?.guest);
  }, []);

  useEffect(() => {
    if (!!units) {
      setSelectedUnit(units[0]);
    }
  }, [units, selectedUnitType]);

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
    startDate: yup.string().required("This field is required."),
    endDate: yup.string().required("This field is required."),
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
    setShowModal(true);
    setFormData((prevVal: BookingDetailsFormType) => ({ ...prevVal, ...data }));
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  return (
    <>
      {showModal && units && guest && selectedUnit && endDate && (
        <PaymentModal
          bookingData={{
            amount:
              selectedUnitType !== "select"
                ? unit_price[selectedUnitType] *
                  differenceInDays(endDate, startDate!)
                : 0,
            guestId: guest._id!,
            unitId: selectedUnit._id,
            numberOfAdults: formData.numberOfAdults,
            numberOfDays: differenceInDays(endDate!, startDate!),
            numberOfChildren: formData.numberOfAdults,
            startDate: new Date(startDate!),
            endDate: new Date(endDate!),
            type: formData.type,
            unitType: formData.unitType as "standard" | "double" | "extra",
          }}
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
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item sm={3}>
                    <Controller
                      control={control}
                      name="startDate"
                      render={({ field }) => (
                        <ReactDatePicker
                          minDate={new Date()}
                          selected={startDate}
                          onChange={(date) => {
                            field.onChange(date);
                            setEndDate(null);
                            resetField("endDate");
                            setStartDate(date);
                          }}
                          placeholderText="Start date"
                          customInput={
                            <TextField
                              fullWidth
                              error={!!errors.startDate}
                              helperText={
                                errors.startDate
                                  ? errors.startDate.message
                                  : null
                              }
                              size="small"
                              inputProps={{ style: { textAlign: "center" } }}
                              sx={{
                                letterSpacing: 2,
                                "& fieldset": {
                                  borderRadius: "50px",
                                  borderColor: "secondary.main",
                                  borderWidth: 2,
                                },
                              }}
                              variant="outlined"
                              label={
                                <Typography
                                  letterSpacing={2}
                                  fontWeight={800}
                                  variant="subtitle2"
                                >
                                  Start date
                                </Typography>
                              }
                              value={startDate}
                            />
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <Controller
                      control={control}
                      name="endDate"
                      render={({ field }) => (
                        <ReactDatePicker
                          disabled={!startDate}
                          selected={endDate}
                          onChange={(date) => {
                            field.onChange(date);
                            setEndDate(date);
                          }}
                          minDate={addDays(startDate!, 1)}
                          placeholderText="End date"
                          customInput={
                            <TextField
                              fullWidth
                              disabled
                              error={!!errors.endDate}
                              helperText={
                                errors.endDate ? errors.endDate.message : null
                              }
                              size="small"
                              inputProps={{
                                style: { textAlign: "center" },
                              }}
                              sx={{
                                letterSpacing: 2,
                                "& fieldset": {
                                  borderRadius: "50px",
                                  borderColor: "secondary.main",
                                  borderWidth: 2,
                                },
                              }}
                              variant="outlined"
                              label={
                                <Typography
                                  letterSpacing={2}
                                  fontWeight={800}
                                  variant="subtitle2"
                                >
                                  End date
                                </Typography>
                              }
                              value={endDate}
                            />
                          }
                        />
                      )}
                    />
                  </Grid>
                  {endDate && (
                    <Grid item sm={3}>
                      <TextField
                        fullWidth
                        size="small"
                        inputProps={{
                          style: { textAlign: "center" },
                        }}
                        sx={{
                          letterSpacing: 2,
                          "& fieldset": {
                            borderRadius: "50px",
                            borderColor: "secondary.main",
                            borderWidth: 2,
                          },
                        }}
                        variant="outlined"
                        label={
                          <Typography
                            letterSpacing={2}
                            fontWeight={800}
                            variant="subtitle2"
                          >
                            Number of Nights
                          </Typography>
                        }
                        value={differenceInDays(endDate!, startDate!)}
                      />
                    </Grid>
                  )}

                  {selectedUnitType != "select" && (
                    <Grid item sm={3}>
                      <TextField
                        fullWidth
                        size="small"
                        inputProps={{
                          style: { textAlign: "center" },
                        }}
                        sx={{
                          letterSpacing: 2,
                          "& fieldset": {
                            borderRadius: "50px",
                            borderColor: "secondary.main",
                            borderWidth: 2,
                          },
                        }}
                        variant="outlined"
                        label={
                          <Typography
                            letterSpacing={2}
                            fontWeight={800}
                            variant="subtitle2"
                          >
                            Price
                          </Typography>
                        }
                        value={`₱${unit_price[selectedUnitType]} / night`}
                      />
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
                              setSelectedUnitType(e.target.value);
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
