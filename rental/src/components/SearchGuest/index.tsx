import {
  Autocomplete,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { IGuest } from "../../types/Guest";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Spinner from "../Spinner";
import { format } from "date-fns";
import { useGuestsQuery } from "../../store/api";
import { useLocation } from "react-router-dom";

export const SearchGuest = ({
  setGuest,
}: {
  setGuest: (value: IGuest | null) => void;
}) => {
  const { data: guestsData, isLoading } = useGuestsQuery();
  const location = useLocation();
  const theme = useTheme();

  return (
    <>
      {isLoading && <Spinner />}
      {guestsData && (
        <Autocomplete
          defaultValue={location.state?.guest}
          size="small"
          id="search-guest-combo"
          onChange={(e, value, reason) => {
            value && setGuest(value);
            if (reason === "clear") {
              setGuest(null);
            }
          }}
          fullWidth
          groupBy={(option) => option.name.forename[0].toUpperCase()}
          options={guestsData}
          getOptionLabel={(option) =>
            `${option.name.forename} ${
              option.name.middleName
                ? option.name.middleName?.toUpperCase()[0] + "."
                : ""
            } ${option.name.surname} ${
              option.name.suffix ? option.name.suffix + "." : ""
            }(mob: ${option.contact.mobileNumber}) `
          }
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                style: {
                  letterSpacing: 2,
                  fontWeight: 800,
                  color: theme.palette.common.black,
                  textAlign: "center",
                  borderColor: "primary.light",
                },
              }}
              label={
                <Typography
                  color="primary.main"
                  variant="h6"
                  fontFamily="Montserrat"
                  letterSpacing={3}
                >
                  Guest
                </Typography>
              }
            />
          )}
          renderGroup={(params) => (
            <div key={params.key}>
              <Typography
                paddingLeft={3}
                fontFamily="Montserrat"
                color="secondary.main"
                variant="body1"
              >
                {params.group}
              </Typography>
              <Stack direction="row">
                <PermIdentityIcon sx={{ pl: 3, mt: 0.5 }} />
                <Typography
                  letterSpacing={1}
                  fontWeight={600}
                  fontFamily="Montserrat"
                  color="primary.dark"
                  variant="body1"
                >
                  {params.children}
                </Typography>
              </Stack>
            </div>
          )}
        />
      )}
    </>
  );
};

export default SearchGuest;
