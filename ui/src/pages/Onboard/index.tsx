import React from "react";
import { useOneStore } from "../../store";
import { TextField, Typography, Stack, Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Onboard() {
  const firstname = useOneStore((state) => state.firstname);
  const setFirstname = useOneStore((state) => state.setFirstname);
  return (
    <>
      {/* <div>{firstname}</div>
      <input
        type="text"
        value={firstname}
        onChange={(evt) => setFirstname(evt.target.value)}
      /> */}
      <Typography textAlign="center" variant="h3">
        Onboarding form
      </Typography>

      <Stack>
        <TextField sx={{}} label="First name" variant="standard" />
        <TextField label="Surname" variant="standard" />
      </Stack>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value="Title"
            label="Age"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default Onboard;
