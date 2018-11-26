import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, Card, CardContent, CardActions } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    width: '90%',
    padding: '10px',
    marginTop: '10px'
  },
  verticalCenter: {
  },
  resultText: {
    "text-align": "left"
  },
  hidden: { 'display': 'none' },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [{
        id: 0,
        value: "",
        name: "test attribute"
      }],
      lastId: 0
    }
  }
  handleChange = index => event => {
    if (this.state.tasks.length - 1 === index) {
      if (event.target.value !== '') {
        this.addNewTask();
      }
    }
    this.state.tasks[index].value = event.target.value
    this.setState({
      tasks: this.state.tasks
    });
  };
  saveTasks = () => {
    this.props.onChange(this.state.tasks.map(task => task.value).slice(0, this.state.tasks.length - 1))
  }
  addNewTask = () => {
    if (!this.state.tasks) {
      this.setState({
        tasks: [],
        lastId: 0,
      });
    }
    this.state.tasks.push({
      id: ++this.state.lastId,
      value: "",
      name: "test attribute"
    })
    this.setState({
      tasks: this.state.tasks,
      lastId: this.state.lastId,
    });
  };
  removeTask = index => event => {
    if (this.state.tasks.length === 1) {
      return;
    }
    this.state.tasks.splice(index, 1);
    this.setState({
      tasks: this.state.tasks,
      lastId: this.state.lastId,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Card className={classes.root}>
          <CardContent>
            <Grid container spacing={24}>
              <Grid item sm={4}>
                <Typography component="p" className={classes.resultText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                </Typography>
              </Grid>
              <Grid item sm={8}>
                <List>
                  {this.state.tasks.map((task, index) => <ListItem>
                    <TextField
                      key={task.id}
                      label={task.name}
                      value={task.value}
                      style={{ margin: 8 }}
                      placeholder="Placeholder"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.handleChange(index)}
                    />
                    <Button size="small" className={this.state.tasks.length - 1 == index ? classes.hidden : classes.verticalCenter} onClick={this.removeTask(index)}>X</Button>
                    <Button size="small" className={this.state.tasks.length - 1 != index ? classes.hidden : classes.verticalCenter} disabled={true}> </Button>
                  </ListItem>)}
                </List>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" disabled={true}>
              Cancel
            </Button>
            <Button size="small" color="primary" onClick={this.saveTasks}>
              Save
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default withStyles(styles)(App);
