import { Card, CardContent, Typography } from "@mui/material";

interface FichaCardProps {
  title: string;
  subtitle: string;
}

function FichaCard({ title, subtitle }: FichaCardProps) {
  return (
    <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
      <CardContent>
        <Typography variant="caption">{title}</Typography>
        <Typography variant="body1">{subtitle}</Typography>
      </CardContent>
    </Card>
  );
}

export default FichaCard;
