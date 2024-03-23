import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { FormType } from "../../types/FormType";
import Modal from "../../components/Modal";
import { NumericFormat } from "react-number-format";
import ProcessIcon from "@mui/icons-material/Publish";
import { unit_price } from "../../Config/pricing.json";
import { useNewBookingMutation } from "../../store/api";

function PaymentModal({
  formData,
  setShowModal,
  showModal,
}: {
  formData: FormType;
  setShowModal: (value: boolean) => void;
  showModal: boolean;
}) {
  const [newBooking, result] = useNewBookingMutation();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("now");
  const [paymentReference, setPaymentReference] = useState("");
  const [error, setError] = useState(false);
  const handleProcess = () => {
    if (selectedPaymentOption === "now" && paymentReference.trim() == "") {
      setError(true);
    } else {
      setError(false);
      console.log("Processing!");
      console.log(formData);
      newBooking({...formData})
      
    }
  };

  const handlePaymentOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPaymentOption((event.target as HTMLInputElement).value);
  };

  return (
    <Modal
      header="Payment"
      open={showModal}
      onClose={() => setShowModal(false)}
    >
      <>
        <NumericFormat
          size="small"
          label={<Typography variant="h5">Total Amount</Typography>}
          InputProps={{
            readOnly: true,
            inputProps: {
              style: {
                textAlign: "center",
                fontWeight: 800,
                letterSpacing: 3,
                fontSize: 20,
              },
            },
          }}
          value={
            formData.unitType !== "select"
              ? unit_price[formData.unitType] * formData.numberOfDays
              : null
          }
          prefix="₱"
          thousandSeparator
          sx={{ textAlign: "center" }}
          customInput={TextField}
        />
        <Box textAlign="center">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={selectedPaymentOption}
              onChange={handlePaymentOptionChange}
            >
              <FormControlLabel
                value="now"
                control={<Radio />}
                label="Pay Now"
              />
              <FormControlLabel
                value="later"
                control={<Radio />}
                label="Pay On Arrival"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {selectedPaymentOption === "now" && (
          <TextField
            helperText={error ? "Please enter payment reference." : null}
            error={error}
            size="small"
            label="Reference"
            value={paymentReference}
            onChange={(e) => setPaymentReference(e.target.value)}
          />
        )}
        <Button
          startIcon={<ProcessIcon />}
          sx={{ letterSpacing: 2 }}
          onClick={handleProcess}
          variant="contained"
        >
          Process
        </Button>
      </>
    </Modal>
  );
}

export default PaymentModal;
