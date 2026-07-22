import { Card, CardContent, Typography } from "@mui/material";

interface FichaCardProps {
  title: string;
  subtitle: string;
}

function FichaCard({ title, subtitle }: FichaCardProps) {
  return (
    <Card sx={{ boxShadow: 1, bgcolor: "primary.dark" }}>
      <CardContent>
        <Typography variant="caption">{title}</Typography>
        <Typography variant="body1">{subtitle}</Typography>
      </CardContent>
    </Card>
  );
}

export default FichaCard;
