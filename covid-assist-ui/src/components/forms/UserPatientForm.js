import React, { useEffect } from "react";
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

function UserPatientForm() {
  const classes = useStyles();
  const { position, error } = useGeoLocation();
  const { handleSubmit, register, errors, reset, trigger, watch } = useForm({
    criteriaMode: "all",
    defaultValues: {},
  });

  const watchFields = watch(["needAmbulanceService", "lookingForHospitals"]);

  useEffect(() => {
    trigger(["needAmbulanceService", "lookingForHospitals"]);
  }, [watchFields.needAmbulanceService, watchFields.lookingForHospitals]);

  const onSubmit = (data) => {
    console.table(data);
    console.log(JSON.stringify(data));
  };

  return (
    <>
      <ErrorBanner errorMSG={error} />
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h1">User-Patient form</Typography>
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
                id="standard-required"
                label={LABELS.name}
                fullWidth
                disabled={!position}
                name="patientName"
                variant="filled"
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  maxLength: 20,
                })}
                error={errors.patientName}
                helperText={errors.patientName?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="standard-required"
                label={LABELS.age}
                variant="filled"
                name="patientAge"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  min: {
                    value: 1,
                    message: "must be greater than 1",
                  },
                  max: {
                    value: 99,
                    message: "must be lesser than 100",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: MESSAGES.errorOnlyNumberAllowed,
                  },
                })}
                inputProps={{
                  maxLength: 2,
                }}
                error={errors.patientAge}
                helperText={errors.patientAge?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">{LABELS.sex}</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="patientGender"
                  defaultValue="female"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio inputRef={register} disabled={!position} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio inputRef={register} disabled={!position} />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  {LABELS.questionSymptoms}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="cough"
                        inputRef={register}
                        disabled={!position}
                      />
                    }
                    label={LABELS.symptomsCough}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="fever"
                        inputRef={register}
                        disabled={!position}
                      />
                    }
                    label={LABELS.symptomsFever}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="breathingDifficulty"
                        inputRef={register}
                        disabled={!position}
                      />
                    }
                    label={LABELS.symptomsBreathingDifficulty}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="noneOfTheDiseaseList"
                        inputRef={register}
                        disabled={!position}
                      />
                    }
                    label={LABELS.symptomsNoneOfTheDiseaseList}
                  />
                </FormGroup>
                <FormHelperText>{LABELS.symptomsHelperText}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  {LABELS.questionDiseaseList}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="diseaseDiabetes"
                        inputRef={register}
                        disabled={!position}
                      />
                    }
                    label={LABELS.diseaseDiabetes}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="diseaseHypertension"
                        inputRef={register}
                        disabled={!position}
                      />
                    }
                    label={LABELS.diseaseHypertension}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="diseaseLungDisease"
                        inputRef={register}
                        disabled={!position}
                      />
                    }
                    label={LABELS.diseaseLungDisease}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="diseaseHeartDisease"
                        inputRef={register}
                        disabled={!position}
                      />
                    }
                    label={LABELS.diseaseHeartDisease}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="diseaseNone"
                        inputRef={register}
                        disabled={!position}
                      />
                    }
                    label={LABELS.symptomsNoneOfTheDiseaseList}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {LABELS.questionTravelHistory}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="internationalTravelLast14Days"
                        inputRef={register}
                        disabled={!position}
                      />
                    }
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                error={errors.needAmbulanceService}
                required
              >
                <FormLabel component="legend" required>
                  {LABELS.questionServiceAmbulance}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="needAmbulanceService"
                        inputRef={register({
                          validate: (value) =>
                            value ||
                            watchFields.lookingForHospitals ||
                            "Do you need Ambulance Service or Are you looking for Hospitals. One among these two fields must be selected as Yes.",
                        })}
                        required
                        disabled={!position}
                      />
                    }
                  />
                </FormGroup>
                <FormHelperText>
                  {errors.needAmbulanceService?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                error={errors.lookingForHospitals}
              >
                <FormLabel component="legend" required>
                  {LABELS.questionLookupHospitals}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="lookingForHospitals"
                        inputRef={register({
                          validate: (value) =>
                            value ||
                            watchFields.needAmbulanceService ||
                            "Do you need Ambulance Service or Are you looking for Hospitals. One among these two fields must be selected as Yes.",
                        })}
                        required
                        disabled={!position}
                        defaultChecked
                      />
                    }
                  />
                </FormGroup>
                <FormHelperText>
                  {errors.lookingForHospitals?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="standard-required"
                label={LABELS.contactNumber}
                variant="filled"
                name="patientContactNumber"
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
                error={errors.patientContactNumber}
                helperText={errors.patientContactNumber?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="standard-required"
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
                required
                id="standard-required"
                label={LABELS.emergencyContactNumber}
                variant="filled"
                name="patientEmergencyContactNumber"
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
                error={errors.patientEmergencyContactNumber}
                helperText={errors.patientEmergencyContactNumber?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="patientAddress"
                label={LABELS.address}
                variant="filled"
                name="patientAddress"
                fullWidth
                disabled={!position}
                inputRef={register}
                multiline
                rows={4}
                rowsMax={4}
                error={errors.patientAddress}
                helperText={errors.patientAddress?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="currentLocation"
                required
                label={LABELS.currentLocation}
                variant="filled"
                disabled={!position}
                inputProps={{
                  readOnly: true,
                }}
                name="currentLocation"
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

export default UserPatientForm;
