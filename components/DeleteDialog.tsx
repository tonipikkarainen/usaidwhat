import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface IDeleteProps {
    onClose: (value: boolean) => void;
}

export default function ResponsiveDialog(props: IDeleteProps) {
    const [open, setOpen] = React.useState(false);
    const { onClose } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleCancel = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setOpen(false);
        onClose(false);
    };

    const handleOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setOpen(false);
        onClose(true);
    };

    return (
        <div>
            <IconButton onClick={(e) => handleClickOpen(e)}>
                <DeleteIcon />
            </IconButton>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby='responsive-dialog-title'
            >
                <DialogTitle id='responsive-dialog-title'>
                    {'Delete lesson and all messages?'}
                </DialogTitle>

                <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                        NO!
                    </Button>
                    <Button onClick={handleOk} autoFocus>
                        YES!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
