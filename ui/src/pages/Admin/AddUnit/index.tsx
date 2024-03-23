import * as yup from "yup";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  SwitchProps,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NumericFormat } from "react-number-format";
import Room from "@mui/icons-material/Home";
import axios from "axios";
import { green } from "@mui/material/colors";
import styled from "@emotion/styled";
import { useSetState } from "react-use";
import { yupResolver } from "@hookform/resolvers/yup";

type FormType = {
  id?: string;
  bldg_number: number;
  rm_number: number;
  flr_number: number;
  status?: string;
  tenant_id?: string;
  utilities: {
    electricity?: string;
    water?: string;
    bedType?: string;
    withAC: boolean;
  };
  date_added?: Date;
};

function AddUnit() {
  const [addUnitState, setAddUnitState] = useSetState<FormType>({
    bldg_number: 0,
    flr_number: 0,
    rm_number: 0,
    id: "",
    utilities: { withAC: true },
  });
  const defaultValues = {
    // dateAdded: "",
    bldg: "",
    flr: "",
    rm: "",
    electricity: "",
    water: "",
    bedType: "",
    withAC: true,
  };
  const schema = yup.object().shape({
    // dateAdded: yup.date().nonNullable().required("Date is required."),
    bldg: yup.string().required("This field is required."),
    flr: yup.string().required("This field is required."),
    rm: yup.string().required("This field is required."),
    electricity: yup.string().required("This field is required."),
    water: yup.string().required("This field is required."),
    bedType: yup.string().required("This field is required."),
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
  const theme = useTheme();
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "primary.light",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  });
  const onSubmit = (data: any) => {
    axios
      .post("http://localhost:3200/units", {
        id: `B${addUnitState.bldg_number}F${addUnitState.flr_number}R${addUnitState.rm_number}`,
        bldg_number: addUnitState.bldg_number,
        flr_number: addUnitState.flr_number,
        rm_number: addUnitState.rm_number,
        status: "available",
        tenant_id: "",
        utilities: {
          electricity: addUnitState.utilities.electricity,
          water: addUnitState.utilities.water,
          withAC: addUnitState.utilities.withAC,
        },
        date_added: new Date(),
      })
      .then((res) => {
        res.data;
      });
  };
  return (
    <>
      <Box
        marginLeft={30}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Typography color="primary.main" letterSpacing={4} variant="h4">
          Add Unit
        </Typography>

        <Room style={{ fontSize: 40, color: green[900] }} />
      </Box>
      <Divider sx={{ my: 2 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box marginX={30}>
          <Stack spacing={4}>
            <Box>
              <Typography marginBottom={1} variant="h6">
                Location
              </Typography>
              <Stack direction={"row"} spacing={8}>
                <Controller
                  control={control}
                  name="bldg"
                  render={({ field }) => (
                    <NumericFormat
                      inputProps={{
                        style: {
                          fontFamily: "Montserrat",
                          letterSpacing: 2,
                          fontWeight: 700,
                        },
                      }}
                      label={
                        <Typography
                          fontFamily="Montserrat"
                          textAlign="left"
                          variant="body1"
                        >
                          Bldg No.
                        </Typography>
                      }
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      onValueChange={(values) => {
                        setAddUnitState({ bldg_number: values.floatValue });
                      }}
                      value={field.value}
                      error={!!errors.bldg}
                      helperText={errors.bldg ? errors.bldg.message : null}
                      size="small"
                      allowLeadingZeros
                      prefix={`Bldg: `}
                      allowNegative={false}
                      customInput={TextField}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="flr"
                  render={({ field }) => (
                    <NumericFormat
                      inputProps={{
                        style: {
                          fontFamily: "Montserrat",
                          letterSpacing: 2,

                          fontWeight: 700,
                        },
                      }}
                      label={
                        <Typography
                          fontFamily="Montserrat"
                          textAlign="left"
                          variant="body1"
                        >
                          Flr No.
                        </Typography>
                      }
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      onValueChange={(values) => {
                        setAddUnitState({ flr_number: values.floatValue });
                      }}
                      value={field.value}
                      error={!!errors.flr}
                      helperText={errors.flr ? errors.flr.message : null}
                      size="small"
                      allowLeadingZeros
                      prefix={`Flr: `}
                      allowNegative={false}
                      customInput={TextField}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="rm"
                  render={({ field }) => (
                    <NumericFormat
                      inputProps={{
                        style: {
                          fontFamily: "Montserrat",
                          letterSpacing: 2,
                          fontWeight: 700,
                        },
                      }}
                      label={
                        <Typography
                          fontFamily="Montserrat"
                          textAlign="left"
                          variant="body1"
                        >
                          Rm No.
                        </Typography>
                      }
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      onValueChange={(values) => {
                        setAddUnitState({ rm_number: values.floatValue });
                      }}
                      value={field.value}
                      error={!!errors.rm}
                      helperText={errors.rm ? errors.rm.message : null}
                      size="small"
                      allowLeadingZeros
                      prefix={`Rm: `}
                      allowNegative={false}
                      customInput={TextField}
                    />
                  )}
                />
              </Stack>
            </Box>
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h6">Utilities</Typography>
              <FormControl>
                <FormLabel sx={{ ml: 1.5 }}>Electricity</FormLabel>
                <Controller
                  control={control}
                  name="electricity"
                  render={({ field }) => (
                    <>
                      <RadioGroup
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setAddUnitState({
                            ...addUnitState,
                            utilities: {
                              ...addUnitState.utilities,
                              electricity: e.target.value,
                            },
                          });
                        }}
                        value={field.value}
                        row
                      >
                        <FormControlLabel
                          sx={{ ml: 0.2 }}
                          value="sub-metered"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 40,
                                },
                              }}
                            />
                          }
                          label="Sub-metered"
                        />
                        <FormControlLabel
                          sx={{ ml: 0.2 }}
                          value="no-meter"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 40,
                                },
                              }}
                            />
                          }
                          label="No meter"
                        />
                      </RadioGroup>
                      {errors.electricity && (
                        <Typography
                          marginLeft={2}
                          variant="subtitle2"
                          fontFamily="Montserrat"
                          color="error"
                        >
                          Select an option.
                        </Typography>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <Divider />
              <FormControl>
                <FormLabel sx={{ ml: 1.5 }}>Water</FormLabel>
                <Controller
                  control={control}
                  name="water"
                  render={({ field }) => (
                    <>
                      <RadioGroup
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setAddUnitState({
                            ...addUnitState,
                            utilities: {
                              ...addUnitState.utilities,
                              water: e.target.value,
                            },
                          });
                        }}
                        value={field.value}
                        row
                      >
                        <FormControlLabel
                          sx={{ ml: 0.2 }}
                          value="sub-metered"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 40,
                                },
                              }}
                            />
                          }
                          label="Sub-metered"
                        />
                        <FormControlLabel
                          sx={{ ml: 0.2 }}
                          value="no-meter"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 40,
                                },
                              }}
                            />
                          }
                          label="No meter"
                        />
                      </RadioGroup>
                      {errors.water && (
                        <Typography
                          marginLeft={2}
                          variant="subtitle2"
                          fontFamily="Montserrat"
                          color="error"
                        >
                          Select an option.
                        </Typography>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <Divider />
              <FormControl>
                <FormLabel sx={{ ml: 1.5 }}>Bed type</FormLabel>
                <Controller
                  control={control}
                  name="bedType"
                  render={({ field }) => (
                    <>
                      <RadioGroup
                        onChange={(e) => {
                          field.onChange(e);
                          setAddUnitState({
                            ...addUnitState,
                            utilities: {
                              ...addUnitState.utilities,
                              bedType: e.target.value,
                            },
                          });
                        }}
                        value={field.value}
                      >
                        <FormControlLabel
                          sx={{ ml: 0.2 }}
                          value="single"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 40,
                                },
                              }}
                            />
                          }
                          label="Single"
                        />
                        <FormControlLabel
                          sx={{ ml: 0.2 }}
                          value="double"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 40,
                                },
                              }}
                            />
                          }
                          label="Double"
                        />
                        <FormControlLabel
                          sx={{ ml: 0.2 }}
                          value="custom"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 40,
                                },
                              }}
                            />
                          }
                          label="Custom"
                        />
                      </RadioGroup>
                      {errors.bedType && (
                        <Typography
                          marginLeft={2}
                          variant="subtitle2"
                          fontFamily="Montserrat"
                          color="error"
                        >
                          Select an option.
                        </Typography>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <Divider />
              <FormControlLabel
                control={
                  <Controller
                    control={control}
                    name="withAC"
                    render={({ field }) => (
                      <IOSSwitch
                        onBlur={field.onBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange(e);
                          setAddUnitState({
                            ...addUnitState,
                            utilities: {
                              ...addUnitState.utilities,
                              withAC: e.target.checked,
                            },
                          });
                        }}
                        checked={field.value}
                        inputRef={field.ref}
                        value={field.value}
                        sx={{ m: 2 }}
                      />
                    )}
                  />
                }
                label="With AC"
              />

              <Box textAlign="center">
                <Button
                  type="submit"
                  endIcon={<ArrowForwardIcon style={{ fontSize: 40 }} />}
                  variant="outlined"
                  disableRipple
                  sx={{
                    borderRadius: 8,
                    minWidth: 300,
                    minHeight: 50,
                    border: "light solid",
                    ":hover": {
                      bgcolor: "primary.light",
                      color: "white",
                    },
                  }}
                >
                  <Typography
                    letterSpacing={2}
                    fontFamily="Montserrat"
                    variant="body1"
                  >
                    Submit
                  </Typography>
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </form>
    </>
  );
}

export default AddUnit;
