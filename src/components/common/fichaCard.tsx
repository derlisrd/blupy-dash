import { Card, CardContent, Typography } from "@mui/material";

interface FichaCardProps {
  title: string;
  subtitle: string;
  bold?: boolean;
}

function FichaCard({ title, subtitle, bold }: FichaCardProps) {
  return (
    <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
      <CardContent>
        <Typography variant="caption">{title}</Typography>
        <Typography variant="body1" fontWeight={bold ? "bold" : "normal"}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FichaCard;
