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

import { FormType } from "../../types/FormType";
import Modal from "../../components/Modal";
import { NumericFormat } from "react-number-format";
import ProcessIcon from "@mui/icons-material/Publish";
import { unit_price } from "../../Config/pricing.json";

function PaymentModal({
  formData,
  setShowModal,
  showModal,
}: {
  formData: FormType;
  setShowModal: (value: boolean) => void;
  showModal: boolean;
}) {
  const [newBooking, bookingResult] = useNewBookingMutation();
  const [newGuest, newGuestResult] = useNewGuestMutation();
  const {
    data: allUnits,
    isLoading: unitDataLoading,
    error: unitError,
  } = useUnitsQuery();

  const offeredUnit = allUnits?.find(
    (u) => u.status === "available" && u.description === formData.unitType
  );
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("now");
  const [paymentReference, setPaymentReference] = useState("");
  const [guestId, setGuestId] = useState("");
  const [error, setError] = useState(false);
  const handleProcess = () => {
    if (selectedPaymentOption === "now" && paymentReference.trim() == "") {
      setError(true);
    } else {
      setError(false);
      console.log("Processing!");
      console.log(formData);

      newGuest({
        ...formData,
        joinedDate: new Date(),
        contact: { mobileNumber: formData.mobile },
        name: {
          title: formData.title,
          forename: formData.name.forename,
          surname: formData.name.surname,
        },
      })
        .unwrap()
        .then((res) => {
          if (!!offeredUnit?._id) {
            newBooking({
              ...formData,
              unitId: offeredUnit._id,
              guestId: res.guestId,
              planDate: new Date(formData.planDate),
              amount:
                unit_price[
                  formData.unitType as "standard" | "double" | "extra"
                ] * formData.numberOfDays,
            });
          }
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
