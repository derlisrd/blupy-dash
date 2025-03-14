import { Dialog, DialogContent, Grid2 as Grid } from "@mui/material";

function EnviarModal() {
  return (
    <Dialog open={true}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}></Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default EnviarModal;
