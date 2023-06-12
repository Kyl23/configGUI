import { Button } from "@mui/material";
import { Layout } from "./style";

function PredictButton({ onClick }) {
  return (
    <Layout>
      <Button variant="contained" onClick={onClick}>
        Predict
      </Button>
    </Layout>
  );
}

export default PredictButton;
