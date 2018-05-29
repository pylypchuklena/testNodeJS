import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card/Card';
import Button from '@material-ui/core/Button/Button';
import CardText from 'material-ui/Card/CardText';
import { Link } from 'react-router-dom';

const styles = (theme: any) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});


class TestLoginPage extends React.Component<any, any> {
  state = {
    name: 'Cat in the Hat',
  };

  handleChange = (name: string) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className="container_box ">
        <form noValidate autoComplete="off">
          <h2 className='card-heading'>Login</h2>

          <div className="field-line">
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              // value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
          </div>
          <div className="field-line">
            <TextField
              id="password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
          </div>
          <div className="button-line">
            <Button variant="raised" type="submit" color="primary" >Log in</Button>
          </div>
          <CardText>Don't have account? <Link to="/">Create one</Link></CardText>
        </form>

      </Card>
    );
  }
}


export default withStyles(styles as any)(TestLoginPage);