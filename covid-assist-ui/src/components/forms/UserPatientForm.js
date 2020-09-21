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
import useApi from "./../hooks/useApi";
import allCovidSymptonsApi from "../../api/allCovidSymptons";
import allMedicalConditionApi from "../../api/allMedicalCondition";
import savePatientApi from "../../api/savePatient";

import axios from "axios";
// import fakeCovidSymptoms from "../../temp/fakeAllCovidSymps";
import { getSavePatientPayload } from "./../../utils/payloadConstructorUtil";

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
  const {
    handleSubmit,
    register,
    errors,
    reset,
    trigger,
    watch,
    setValue,
  } = useForm({
    criteriaMode: "all",
    defaultValues: {
      lattitude: position?.coords?.latitude,
      longitude: position?.coords?.longitude,
    },
  });
  const getAllCovidSymptomsApi = useApi(
    allCovidSymptonsApi.getAllCovidSymptoms
  );
  const getAllMedicalConditionApi = useApi(
    allMedicalConditionApi.getAllMedicalConditions
  );
  const savePatientDataApi = useApi(savePatientApi.savePatient);
  const watchFields = watch(["ambulanceRequired", "hospitalRequired"]);

  useEffect(() => {
    getAllCovidSymptomsApi.request();
    getAllMedicalConditionApi.request();
  }, []);

  useEffect(() => {
    setValue("lattitude", position?.coords?.latitude);
    setValue("longitude", position?.coords?.longitude);
  }, [position]);

  useEffect(() => {
    trigger(["needAmbulanceService", "lookingForHospitals"]);
  }, [watchFields.needAmbulanceService, watchFields.lookingForHospitals]);

  const onSubmit = async (data) => {
    console.table(data);
    const payload = getSavePatientPayload(data);
    console.log(JSON.stringify(data));
    const result = await savePatientDataApi.request(payload);
    reset({
      lattitude: position?.coords?.latitude,
      longitude: position?.coords?.longitude,
    });
    console.log({ result });
  };

  return (
    <>
      <ErrorBanner errorMSG={error} />
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h1">Patient form</Typography>
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
                name="name"
                variant="filled"
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                })}
                error={errors.name}
                helperText={errors.name?.message}
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
                name="age"
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
                error={errors.age}
                helperText={errors.age?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">{LABELS.sex}</FormLabel>
                <RadioGroup aria-label="gender" name="sex" defaultValue="F">
                  <FormControlLabel
                    value="F"
                    control={<Radio inputRef={register} disabled={!position} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="M"
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
                  {getAllCovidSymptomsApi.data.map((item) => (
                    <FormControlLabel
                      key={item.symptonId}
                      control={
                        <Checkbox
                          name={`covidSympton-${item.symptonId}`}
                          inputRef={register}
                          disabled={!position}
                        />
                      }
                      label={item.symptons}
                    />
                  ))}
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
                  {getAllMedicalConditionApi.data.map((item) => (
                    <FormControlLabel
                      key={item.pastMedConId}
                      control={
                        <Checkbox
                          name={`medicalCondition-${item.pastMedConId}`}
                          inputRef={register}
                          disabled={!position}
                        />
                      }
                      label={item.medCon}
                    />
                  ))}
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
                        name="internationalTravel"
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
                error={errors.hospitalRequired}
                required
              >
                <FormLabel component="legend" required>
                  {LABELS.questionServiceAmbulance}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="ambulanceRequired"
                        inputRef={register({
                          validate: (value) =>
                            value ||
                            watchFields.hospitalRequired ||
                            "Do you need Ambulance Service or Are you looking for Hospitals. One among these two fields must be selected as Yes.",
                        })}
                        required
                        disabled={!position}
                      />
                    }
                  />
                </FormGroup>
                <FormHelperText>
                  {errors.ambulanceRequired?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" error={errors.hospitalRequired}>
                <FormLabel component="legend" required>
                  {LABELS.questionLookupHospitals}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="hospitalRequired"
                        inputRef={register({
                          validate: (value) =>
                            value ||
                            watchFields.ambulanceRequired ||
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
                  {errors.hospitalRequired?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="standard-required"
                label={LABELS.contactNumber}
                variant="filled"
                name="contactNo"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  minLength: {
                    value: 10,
                    message: "must be 10 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "must be 10 characters",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: MESSAGES.errorOnlyNumberAllowed,
                  },
                })}
                inputProps={{
                  maxLength: 10,
                }}
                error={errors.contactNo}
                helperText={errors.contactNo?.message}
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
                name="emergencyContactNo"
                fullWidth
                disabled={!position}
                inputRef={register({
                  required: MESSAGES.errorNoBlank,
                  minLength: {
                    value: 10,
                    message: "must be 10 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "must be 10 characters",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: MESSAGES.errorOnlyNumberAllowed,
                  },
                })}
                inputProps={{
                  maxLength: 10,
                }}
                error={errors.emergencyContactNo}
                helperText={errors.emergencyContactNo?.message}
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
                name="address"
                fullWidth
                disabled={!position}
                inputRef={register}
                multiline
                rows={4}
                rowsMax={4}
                error={errors.address}
                helperText={errors.address?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lattitude"
                required
                label={LABELS.lattitude}
                variant="filled"
                disabled={!position}
                inputProps={{
                  readOnly: true,
                }}
                name="lattitude"
                fullWidth
                inputRef={register}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="longitude"
                required
                label={LABELS.longitude}
                variant="filled"
                disabled={!position}
                inputProps={{
                  readOnly: true,
                }}
                name="longitude"
                fullWidth
                inputRef={register}
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
