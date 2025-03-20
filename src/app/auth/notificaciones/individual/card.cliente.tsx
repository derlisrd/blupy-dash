import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

interface CardClienteProps {
  title: string;
  descripcion: string;
  action?: () => void;
  actionText?: string;
}

function CardCliente({ title, descripcion, action, actionText }: CardClienteProps) {
  return (
    <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
      <CardContent>
        <Typography variant="caption">{title}</Typography>
        <Typography variant="body1">{descripcion}</Typography>
      </CardContent>
      {action && (
        <CardActions>
          <Button size="small" onClick={action} color="primary">
            {actionText}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default CardCliente;
