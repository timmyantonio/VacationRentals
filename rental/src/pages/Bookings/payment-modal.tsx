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
import {
  useNewBookingMutation,
  useNewGuestMutation,
  useUnitsQuery,
} from "../../store/api";

import { IBooking } from "../../types/Booking";
import Modal from "../../components/Modal";
import { NumericFormat } from "react-number-format";
import ProcessIcon from "@mui/icons-material/Publish";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

function PaymentModal({
  bookingData,
  setShowModal,
  showModal,
}: {
  bookingData: IBooking & { unitType: "standard" | "double" | "extra" };
  setShowModal: (value: boolean) => void;
  showModal: boolean;
}) {
  const [newBooking, bookingResult] = useNewBookingMutation();
  const navigate = useNavigate();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("now");
  const [paymentReference, setPaymentReference] = useState("");
  const [error, setError] = useState(false);
  const handleProcess = () => {
    if (selectedPaymentOption === "now" && paymentReference.trim() == "") {
      setError(true);
    } else {
      setError(false);
      newBooking({ ...bookingData })
        .unwrap()
        .then((res) => {
          res.bookingId && setShowModal(false);
          navigate("/success", { state: { message: "Booking Successful!" } });
        });
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
        {bookingResult.isLoading && <Spinner />}
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
          value={bookingData.amount}
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
