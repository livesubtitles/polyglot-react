import * as React from 'react'
import Logo from 'src/media/icon_square.png';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

export interface InformationProps extends WithStyles<typeof styles> {
  imageWidthEm?: number
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
      <img src={Logo} width={props.imageWidthEm ? props.imageWidthEm.toString() + "em" : "50em"}/>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit 
        voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et 
        quasi architecto beatae vitae dicta sunt explicabo. Nemo 
        enim ipsam voluptatem quia voluptas sit aspernatur 
        aut odit aut fugit, sed quia consequuntur magni dolores
        eos qui ratione voluptatem sequi nesciunt.
      </p>        
    </div>
    );
}

export const Information = withStyles(styles)(InformationComponent);