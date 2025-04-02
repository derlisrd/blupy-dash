import { Menu, MenuItem } from "@mui/material";

interface MenuOption {
  label: string;
  onClick: () => void;
}

interface RowOptionsMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  options: MenuOption[];
  /*   selectedRow: ClientesResults | null;
  onToggleActive?: (row: ClientesResults) => void; */
}

function RowOptionsMenu({ anchorEl, open, onClose, options }: RowOptionsMenuProps) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {options.map((option, index) => (
        <MenuItem key={index} onClick={option.onClick}>
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default RowOptionsMenu;
