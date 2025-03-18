import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

interface FichaCardProps {
  title: string;
  subtitle: string;
  bold?: boolean;
  actions?: boolean;
  onClickButtonActions?: () => void;
}

function FichaCard({ title, subtitle, bold, actions, onClickButtonActions }: FichaCardProps) {
  return (
    <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
      <CardContent>
        <Typography variant="caption">{title}</Typography>
        <Typography variant="body1" fontWeight={bold ? "bold" : "normal"}>
          {subtitle}
        </Typography>
      </CardContent>
      <CardActions>{actions && <Button onClick={onClickButtonActions}>Ver</Button>}</CardActions>
    </Card>
  );
}

export default FichaCard;
