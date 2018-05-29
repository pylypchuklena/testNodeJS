import * as React from 'react';
import * as  PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconList from '@material-ui/icons/LibraryBooks';
import IconTable from '@material-ui/icons/ViewModule';
import IconSettings from '@material-ui/icons/Settings';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import IconIdentity from '@material-ui/icons/PermIdentity';
import IconPayment from '@material-ui/icons/Payment';
const styles = (theme:any) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    // height: '100vh'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component<any,any> {
  static propTypes: { classes: PropTypes.Validator<any>; };
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
    
        > 
        
        <ListItem button>
            <ListItemIcon>
              <IconPayment />
            </ListItemIcon>
            <ListItemText inset primary="Payment" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <IconIdentity />
            </ListItemIcon>
            <ListItemText inset primary="Manage Customer" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText inset primary="Manage Sample" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <IconSettings />
            </ListItemIcon>
            <ListItemText inset primary="Manage Other Info" />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <IconList />
            </ListItemIcon>
            <ListItemText inset primary="Warehouse" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <IconTable />
                </ListItemIcon>
                <ListItemText inset primary="Art" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);