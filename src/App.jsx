import React, { Component } from 'react';
// prettier-ignore
import {
  Paper,  Typography,  CssBaseline,  Container,  Grid,  Box,  Switch,  FormControlLabel,  FormControl,  
  InputLabel,  Select,  MenuItem,  Button,  Divider } from '@material-ui/core';
// prettier-ignore
import {  FormatTextdirectionRToL,  FormatTextdirectionLToR } from '@material-ui/icons';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color';
import { create } from 'jss';
import rtl from 'jss-rtl';

// RTL Plugin
const jss = create({
  plugins: [...jssPreset().plugins, rtl()]
});

class App extends Component {
  state = {
    palette: {
      type: 'dark',
      primary: { main: '#3f51b5' },
      secondary: { main: '#f50057' }
    },
    spacing: 8,
    typography: {
      fontSize: 14
    },
    direction: 'ltr'
  };

  // Switch , Select & Button Change Handler
  handleChange = ({ target: { name, value } }) => {
    switch (name) {
      // Change font Size
      case 'fontSize':
        this.setState({ typography: { [name]: value } });
        break;
      // Change Direction RTL <-> LTR
      case 'direction':
        this.setState({ [name]: value === 'ltr' ? 'rtl' : 'ltr' });
        break;
      // Change Light Mode Dark <-> Light
      case 'darkMode':
        this.setState(({ palette }) => ({
          palette: {
            ...palette,
            type: value === 'dark' ? 'light' : 'dark'
          }
        }));
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  };

  // Primary Color Picker Handler
  handlePrimaryColorChange = color => {
    this.setState(({ palette }) => ({
      palette: {
        ...palette,
        primary: {
          main: color.hex
        }
      }
    }));
  };

  // Secondary Color Picker Handler
  handleSecondaryColorChange = color => {
    this.setState(({ palette }) => ({
      palette: {
        ...palette,
        secondary: {
          main: color.hex
        }
      }
    }));
  };

  // Colorized Typography Component Item
  gridItemText = target => {
    return (
      <Grid item xs={12} sm={4}>
        <Typography component="div" variant="body1">
          <Box color={target} border={1} p={2}>
            {target}
          </Box>
        </Typography>
      </Grid>
    );
  };

  // Colorized Background Typography Component Item
  gridItemBackground = target => {
    const targetColor = target.split('.')[0];
    let color = `${targetColor}.contrastText`;
    if (targetColor === 'text') color = 'background.paper';

    return (
      <Grid item xs={12} sm={4}>
        <Box bgcolor={target} color={color} p={2}>
          {target}
        </Box>
      </Grid>
    );
  };

  render() {
    return (
      <React.Fragment>
        {/* Material UI Theme Provider */}
        <MuiThemeProvider theme={createMuiTheme(this.state)}>
          {/*  RTL & LTR Plugin Provider */}
          <StylesProvider jss={jss}>
            {/* Material UI Global Theme */}
            <CssBaseline />
            <Typography variant="h1" align="center" gutterBottom>
              Material UI
            </Typography>
            <Container maxWidth="md" dir={this.state.direction}>
              <Paper elevation={24}>
                <Box p={1} marginBottom={5}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item>
                          {/* Dark Mode Switch */}
                          <FormControlLabel
                            control={
                              <Switch
                                defaultChecked={true}
                                onChange={this.handleChange}
                                name="darkMode"
                                value={this.state.palette.type}
                              />
                            }
                            label="Dark"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid item>
                          {/* Font Size Selector */}
                          <FormControl
                            variant="outlined"
                            style={{ minWidth: 120 }}
                          >
                            <InputLabel>Font Size</InputLabel>
                            <Select
                              label="Font Size"
                              name="fontSize"
                              defaultValue={14}
                              onChange={this.handleChange}
                            >
                              <MenuItem value={14}>
                                <em>
                                  Default <b>14</b>
                                </em>
                              </MenuItem>
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={12}>12</MenuItem>
                              <MenuItem value={16}>16</MenuItem>
                              <MenuItem value={20}>20</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item>
                          {/* Spacing Selector */}
                          <FormControl
                            variant="outlined"
                            style={{ minWidth: 120 }}
                          >
                            <InputLabel>Spacing</InputLabel>
                            <Select
                              label="Spacing"
                              name="spacing"
                              defaultValue={8}
                              onChange={this.handleChange}
                            >
                              <MenuItem value={8}>
                                <em>
                                  Default <b>8</b>
                                </em>
                              </MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={6}>6</MenuItem>
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={12}>12</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item>
                          {/* Direction Toggle Button */}
                          <Button
                            variant="outlined"
                            value={this.state.direction}
                            startIcon={
                              this.state.direction === 'ltr' ? (
                                <FormatTextdirectionLToR />
                              ) : (
                                <FormatTextdirectionRToL />
                              )
                            }
                            onClick={e => {
                              this.handleChange({
                                target: {
                                  name: 'direction',
                                  value: e.currentTarget.value
                                }
                              });
                            }}
                          >
                            Direction
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="h4" align="center" gutterBottom>
                        Direction
                      </Typography>
                    </Grid>
                    {/* Always LTR Item */}
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" align="center" gutterBottom>
                        Always LTR :
                      </Typography>
                    </Grid>
                    {/* Always RTL Item */}
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" align="center" gutterBottom>
                        Always RTL :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Divider />
                    </Grid>
                    {/* Always LTR Item */}
                    <Grid item xs={6} sm={6}>
                      <MuiThemeProvider
                        theme={createMuiTheme({ direction: 'ltr' })}
                      >
                        <Box dir="ltr" p={2}>
                          Welcome
                        </Box>
                      </MuiThemeProvider>
                    </Grid>
                    {/* Always RTL Item */}
                    <Grid item xs={6} sm={6}>
                      <MuiThemeProvider
                        theme={createMuiTheme({ direction: 'rtl' })}
                      >
                        <StylesProvider jss={jss}>
                          <Box dir="rtl" p={2}>
                            Welcome
                          </Box>
                        </StylesProvider>
                      </MuiThemeProvider>
                    </Grid>
                    {/* Always LTR Arabic Item */}
                    <Grid item xs={6} sm={6}>
                      <MuiThemeProvider
                        theme={createMuiTheme({ direction: 'ltr' })}
                      >
                        <Box dir="ltr" p={2}>
                          اهلاّ وسهلاّ
                        </Box>
                      </MuiThemeProvider>
                    </Grid>
                    {/* Always RTL Arabic Item */}
                    <Grid item xs={6} sm={6}>
                      <MuiThemeProvider
                        theme={createMuiTheme({ direction: 'rtl' })}
                      >
                        <StylesProvider jss={jss}>
                          <Box dir="rtl" p={2}>
                            اهلاّ وسهلاّ
                          </Box>
                        </StylesProvider>
                      </MuiThemeProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* Primary Color Picker */}
                      <Grid container direction="column" alignItems="center">
                        <Grid item xs={6} sm={6}>
                          <Typography variant="h6" gutterBottom>
                            Primary
                          </Typography>
                        </Grid>
                        <Grid item>
                          <SketchPicker
                            width={150}
                            onChange={this.handlePrimaryColorChange}
                            presetColors={[
                              {
                                color: '#3f51b5',
                                title: 'Primary.Main Default'
                              },
                              {
                                color: '#f50057',
                                title: 'Secondary.Main Default'
                              },
                              { color: '#f50057', title: 'Error.Main Default' },
                              {
                                color: '#ff9800',
                                title: 'Warning.Main Default'
                              },
                              { color: '#2196f3', title: 'Info.Main Default' },
                              {
                                color: '#4caf50',
                                title: 'Success.Main Default'
                              }
                            ]}
                            color={this.state.palette.primary.main}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* Secondary Color Picker */}
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <Typography variant="h6" gutterBottom>
                            Secondary
                          </Typography>
                        </Grid>
                        <Grid item>
                          <SketchPicker
                            width={150}
                            onChange={this.handleSecondaryColorChange}
                            presetColors={[
                              {
                                color: '#3f51b5',
                                title: 'Primary.Main Default'
                              },
                              {
                                color: '#f50057',
                                title: 'Secondary.Main Default'
                              },
                              {
                                color: '#f50057',
                                title: 'Error.Main Default'
                              },
                              {
                                color: '#ff9800',
                                title: 'Warning.Main Default'
                              },
                              {
                                color: '#2196f3',
                                title: 'Info.Main Default'
                              },
                              {
                                color: '#4caf50',
                                title: 'Success.Main Default'
                              }
                            ]}
                            color={this.state.palette.secondary.main}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Color Examples */}
                    <Grid item xs={12} sm={12}>
                      <Typography variant="h4" align="center" gutterBottom>
                        Colors
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={1}>
                        {this.gridItemText('primary.main')}
                        {this.gridItemText('secondary.main')}
                        {this.gridItemText('error.main')}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={1}>
                        {this.gridItemText('warning.main')}
                        {this.gridItemText('info.main')}
                        {this.gridItemText('success.main')}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={1}>
                        {this.gridItemText('text.primary')}
                        {this.gridItemText('text.secondary')}
                        {this.gridItemText('text.disabled')}
                      </Grid>
                    </Grid>
                    {/* Background Color Examples */}
                    <Grid item xs={12} sm={12}>
                      <Typography variant="h4" align="center" gutterBottom>
                        Background Colors
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={1}>
                        {this.gridItemBackground('primary.main')}
                        {this.gridItemBackground('secondary.main')}
                        {this.gridItemBackground('error.main')}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={1}>
                        {this.gridItemBackground('warning.main')}
                        {this.gridItemBackground('info.main')}
                        {this.gridItemBackground('success.main')}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={1}>
                        {this.gridItemBackground('text.primary')}
                        {this.gridItemBackground('text.secondary')}
                        {this.gridItemBackground('text.disabled')}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Container>
          </StylesProvider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
