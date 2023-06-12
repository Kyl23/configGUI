import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const ModalLayout = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  opacity: 0.22;
  width: 99vw;
  height: 100vh;
`;

export const DialogBox = styled(Box)`
  padding: 30px;
  width: 50vw;
  max-height: 50vh;
`;
