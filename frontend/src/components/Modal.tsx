import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { type ReactNode } from "react"
import CloseIcon from '@mui/icons-material/Close';

export const Modal = ({ children, open, setOpen}: { children: ReactNode, open: boolean, setOpen: (open:boolean) => void }) => {
    return <Dialog
        open={open}
    >
        <DialogTitle sx={{ m: 0, p: 2 }}>
        Dialog Title
        <IconButton
          aria-label="close"
          onClick={()=>setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>
}