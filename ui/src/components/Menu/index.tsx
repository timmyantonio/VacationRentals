import {
  Button,
  Typography,
  IconButton,
  Stack,
  IconButtonProps,
  Box,
} from "@mui/material";
import styled from "@emotion/styled";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AdminIcon from "@mui/icons-material/AdminPanelSettings";
import PaymentIcon from "@mui/icons-material/Payment";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useNavigate } from "react-router-dom";
import pathConfig from "../../route/config.json";

export default () => {
  const navigate = useNavigate();
  const MenuButton = styled(IconButton)({
    borderRadius: 20,
    ":hover": { backgroundColor: "unset" },
  });
  const Option = ({
    text,
    icon,
    onClick,
  }: {
    text: string;
    icon: JSX.Element;
    onClick: () => void;
  }) => (
    <MenuButton onClick={onClick}>
      {icon}
      <Typography color="primary" letterSpacing={2} variant="h6">
        {text}
      </Typography>
    </MenuButton>
  );

  return (
    <Box marginTop={18} borderRadius={5} marginBottom={8}>
      <Stack marginTop={2} direction="row" justifyContent="space-around">
        <Option
          onClick={() => navigate(pathConfig.onboard)}
          text="Onboard"
          icon={
            <PersonAddAlt1Icon sx={{ fontSize: 35, mr: 1 }} color="primary" />
          }
        />
        <Option
          onClick={() => navigate(pathConfig.admin)}
          text="Admin"
          icon={<AdminIcon sx={{ fontSize: 35, mr: 1 }} color="primary" />}
        />
        <Option
          onClick={() => alert("thanks god!")}
          text="Payment"
          icon={<PaymentIcon sx={{ fontSize: 35, mr: 1 }} color="primary" />}
        />
        <Option
          onClick={() => alert("thanks god!")}
          text="Maintenance"
          icon={
            <EngineeringIcon sx={{ fontSize: 35, mr: 1 }} color="primary" />
          }
        />
      </Stack>
    </Box>
  );
};
