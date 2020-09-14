import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { useForm } from "react-hook-form";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";

import useGeoLocation from "./../hooks/useGeoLocation";
import ErrorBanner from "./../ErrorBanner";
import LABELS from "../../const/labels";
import MESSAGES from "../../const/messages";

const useStyles = makeStyles((theme) => ({
  buttonGrp: {
    // background: "white",
    // position: "sticky",
    // top: 20,
    // bottom: 20,
    // paddingTop: '40px',
    // paddingBottom: '40px',
    // zIndex: 5,
    paddingTop: 8,
  },
  form: {
    marginTop: 16,
  },
}));

function HospitalReistrationForm() {
  const classes = useStyles();
  const { position, error } = useGeoLocation();
  const { handleSubmit, register, errors, reset } = useForm({
    criteriaMode: "all",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.table(data);
    console.log(JSON.stringify(data));
  };

  return (
    <>
      <ErrorBanner errorMSG={error} />
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h1">Hospital registration form</Typography>
        <Divider />
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="hospitalName"
                label={LABELS.hospitalName}
                fullWidth
                disabled={!position}
                name="hospitalName"
                variant="filled"
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                })}
                error={errors.hospitalName}
                helperText={errors.hospitalName?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" required>
                  {LABELS.availableServiceAmbulance}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="availableServiceAmbulance"
                        inputRef={register}
                        required
                        disabled={!position}
                      />
                    }
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="numberOfAmbulance"
                label={LABELS.numberOfAmbulance}
                variant="filled"
                name="numberOfAmbulance"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: MESSAGES.errorOnlyNumberAllowed,
                  },
                })}
                error={errors.numberOfAmbulance}
                helperText={errors.numberOfAmbulance?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" required>
                  {LABELS.availableIsolationWard}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="availableIsolationWard"
                        inputRef={register}
                        required
                        disabled={!position}
                      />
                    }
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="numberIsolationBeds"
                label={LABELS.numberIsolationBeds}
                variant="filled"
                name="numberIsolationBeds"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: MESSAGES.errorOnlyNumberAllowed,
                  },
                })}
                error={errors.numberIsolationBeds}
                helperText={errors.numberIsolationBeds?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="numberIcuBeds"
                label={LABELS.numberIcuBeds}
                variant="filled"
                name="numberIcuBeds"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: MESSAGES.errorOnlyNumberAllowed,
                  },
                })}
                error={errors.numberIcuBeds}
                helperText={errors.numberIcuBeds?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="numberOxygenUnits"
                label={LABELS.numberOxygenUnits}
                variant="filled"
                name="numberOxygenUnits"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: MESSAGES.errorOnlyNumberAllowed,
                  },
                })}
                error={errors.numberOxygenUnits}
                helperText={errors.numberOxygenUnits?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="numberVentilators"
                label={LABELS.numberVentilators}
                variant="filled"
                name="numberVentilators"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: MESSAGES.errorOnlyNumberAllowed,
                  },
                })}
                error={errors.numberVentilators}
                helperText={errors.numberVentilators?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="contactNumber"
                label={LABELS.contactNumber}
                variant="filled"
                name="hospitalContactNumber"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: MESSAGES.errorOnlyNumberAllowed,
                  },
                })}
                inputProps={{
                  maxLength: 15,
                }}
                error={errors.hospitalContactNumber}
                helperText={errors.hospitalContactNumber?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="emailId"
                label={LABELS.emailId}
                variant="filled"
                name="emailId"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: MESSAGES.errorInvalidEmail,
                  },
                })}
                error={errors.emailId}
                helperText={errors.emailId?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="hospitalAddress"
                required
                label={LABELS.address}
                variant="filled"
                name="hospitalAddress"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                })}
                multiline
                rows={4}
                rowsMax={4}
                error={errors.hospitalAddress}
                helperText={errors.hospitalAddress?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="locationHospital"
                required
                label={LABELS.locationHospital}
                variant="filled"
                disabled={!position}
                inputProps={{
                  readOnly: true,
                }}
                name="locationHospital"
                fullWidth
                inputRef={register}
                InputLabelProps={{
                  shrink: true,
                }}
                value={`latitude: ${position?.coords?.latitude}, longitude: ${position?.coords?.longitude}`}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <div className={classes.buttonGrp}>
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<SaveIcon />}
                    type="submit"
                    disabled={!position}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={reset}
                    disabled={!position}
                  >
                    Reset
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default HospitalReistrationForm;
