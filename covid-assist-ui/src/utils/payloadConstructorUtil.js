export const getSavePatientPayload = ({
  name,
  age,
  sex,
  internationalTravel,
  ambulanceRequired,
  hospitalRequired,
  contactNo,
  emailId,
  emergencyContactNo,
  address,
  lattitude,
  longitude,
  ...rest
}) => {
  const payload = {
    name,
    age: Number(age),
    sex,
    contactNo,
    emailId,
    emergencyContactNo,
    address,
    lattitude: Number(lattitude),
    longitude: Number(longitude),
    internationalTravel: internationalTravel ? "yes" : "no",
    ambulanceRequired: ambulanceRequired ? "yes" : "no",
    hospitalRequired: hospitalRequired ? "yes" : "no",
    medicalCondition: Object.entries(rest)
      .filter(([key, value]) => key.includes("medicalCondition-") && value)
      .map(([key, value]) => key.split("-").pop())
      .join(","),
    covidSympton: Object.entries(rest)
      .filter(([key, value]) => key.includes("covidSympton-") && value)
      .map(([key, value]) => key.split("-").pop())
      .join(","),
  };
  return `?${Object.entries(payload)
    .filter(([key, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
};

export const getSaveHospitalPayload = ({
  hospitalName,
  ambulanceServiceAvailable,
  numberOfAmbulance,
  totalIsolationBed,
  totalIcu,
  totalOxygenUnit,
  totalVentilator,
  contactNo,
  emailId,
  hospitalAddress,
  lattitude,
  longitude,
}) => {
  const payload = {
    hospitalName,
    ambulanceServiceAvailable,
    numberOfAmbulance,
    totalIsolationBed,
    totalIcu,
    totalOxygenUnit,
    totalVentilator,
    contactNo,
    emailId,
    hospitalAddress,
    lattitude,
    longitude,
  };
  return `?${Object.entries(payload)
    .filter(([key, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
};
