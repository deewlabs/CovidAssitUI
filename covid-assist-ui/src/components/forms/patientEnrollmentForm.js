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
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";

import "react-datepicker/dist/react-datepicker.css";
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

function PatientEnrollmentForm(props) {
  const classes = useStyles();
  const { handleSubmit, register, errors, reset, control } = useForm({
    criteriaMode: "all",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.table(data);
    console.log(JSON.stringify(data));
  };

  return (
    <>
      {/* <ErrorBanner errorMSG={error} /> */}

      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h1">Patient enrollment form</Typography>
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
                id="patientId"
                label={LABELS.patientId}
                fullWidth
                name="patientId"
                variant="filled"
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                })}
                error={errors.patientId}
                helperText={errors.patientId?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        aria-label="search patient id"
                        onClick={() => alert("search triggered")}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="patientId"
                label={LABELS.name}
                fullWidth
                name="patientName"
                variant="filled"
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
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
                    control={<Radio inputRef={register} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio inputRef={register} />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="date"
                required
                label={LABELS.enrollmentDate}
                type="date"
                name="enrollmentDate"
                // defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                })}
                error={errors.enrollmentDate}
                helperText={errors.enrollmentDate?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  {LABELS.questionSymptoms}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="cough" inputRef={register} />}
                    label={LABELS.symptomsCough}
                  />
                  <FormControlLabel
                    control={<Checkbox name="fever" inputRef={register} />}
                    label={LABELS.symptomsFever}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="breathingDifficulty"
                        inputRef={register}
                      />
                    }
                    label={LABELS.symptomsBreathingDifficulty}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="noneOfTheDiseaseList"
                        inputRef={register}
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
                      <Checkbox name="diseaseDiabetes" inputRef={register} />
                    }
                    label={LABELS.diseaseDiabetes}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="diseaseHypertension"
                        inputRef={register}
                      />
                    }
                    label={LABELS.diseaseHypertension}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox name="diseaseLungDisease" inputRef={register} />
                    }
                    label={LABELS.diseaseLungDisease}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="diseaseHeartDisease"
                        inputRef={register}
                      />
                    }
                    label={LABELS.diseaseHeartDisease}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox name="diseaseNone" inputRef={register} />
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
                      />
                    }
                  />
                </FormGroup>
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
                required
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                })}
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
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={reset}
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

export default PatientEnrollmentForm;
