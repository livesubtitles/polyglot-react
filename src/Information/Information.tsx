import * as React from 'react'
import Logo from 'src/media/icon_square.png';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

export interface InformationProps extends WithStyles<typeof styles> {
}

const styles = createStyles({
    root: {
        padding: "1em"
    }
});
export const InformationComponent = (props: InformationProps) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
        <img src={Logo} width="80%"/>
        <p>
            Sed ut perspiciatis unde omnis iste natus error sit 
            voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et 
            quasi architecto beatae vitae dicta sunt explicabo. Nemo 
            enim ipsam voluptatem quia voluptas sit aspernatur 
            aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro 
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
            adipisci velit, sed quia non numquam eius modi tempora incidunt 
            ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad 
            minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur? 
            </p>        
        </div>
    );
}

export const Information = withStyles(styles)(InformationComponent);