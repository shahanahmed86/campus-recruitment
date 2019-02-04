import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class PositionedSnackbar extends React.Component {
    state = {
        open: false,
        vertical: 'bottom',
        horizontal: 'left',
    };

    render() {
        const { vertical, horizontal } = this.state;
        const { open, message, close } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={close}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                />
            </div>
        );
    }
}

export default PositionedSnackbar;