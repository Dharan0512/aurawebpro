/**
 * Maps nested backend profile data into a flat structure for the wizard form.
 */
export const mapProfileToFormData = (profile: any) => {
  if (!profile) return {};

  return {
    // Basic Info (User Model)
    createdFor: profile.user?.createdFor || "Myself",
    gender: profile.user?.gender || "Male",
    firstName: profile.user?.firstName || "",
    lastName: profile.user?.lastName || "",
    mobile: profile.user?.mobile || "",

    // Personal Details (Profile Model)
    dob: profile.profile?.dob || "",
    height: profile.profile?.heightCm?.toString() || "170",
    maritalStatus: profile.profile?.maritalStatus || "Never Married",
    childrenCount: profile.profile?.childrenCount?.toString() || "0",
    childrenLivingWith: profile.profile?.childrenLivingWith || false,
    physicalStatus: profile.profile?.physicalStatus || "Normal",

    // Religion/Community
    religionId: profile.profile?.religionId?.toString() || "",
    casteId: profile.profile?.casteId?.toString() || "",
    subCaste: profile.profile?.subcaste || "",
    motherTongue: profile.profile?.motherTongueId?.toString() || "",

    // Education/Career
    educationId: profile.profile?.educationId?.toString() || "",
    educationDetail: profile.profile?.educationDetail || "",
    employmentTypeId: profile.profile?.employmentTypeId?.toString() || "1",
    occupationId: profile.profile?.occupationId?.toString() || "",
    incomeRangeId: profile.profile?.incomeRangeId?.toString() || "",

    // Location
    countryId: profile.profile?.countryId?.toString() || "",
    stateId: profile.profile?.stateId?.toString() || "",
    cityId: profile.profile?.cityId?.toString() || "",
    citizenship: profile.profile?.countryId?.toString() || "",

    // Lifestyle
    diet: profile.profile?.diet || "Veg",
    spirituality: profile.profile?.spirituality || "Not Spiritual",
    drink: profile.profile?.drink || "No",
    smoke: profile.profile?.smoke || "No",
    ambition: profile.profile?.ambition || "Moderate",
    careerAfterMarriage: profile.profile?.careerAfterMarriage || "Yes",
    relocation: profile.profile?.relocation || "No",
    fitness: profile.profile?.fitness || "Regular",
    familyStatus: profile.profile?.familyStatus || "Middle Class",
    aboutMe: profile.profile?.aboutMe || "",

    // Preferences
    partnerAgeMin: profile.preferences?.minAge || 22,
    partnerAgeMax: profile.preferences?.maxAge || 30,
    partnerHeightMin: profile.preferences?.minHeightCm || 150,
    partnerHeightMax: profile.preferences?.maxHeightCm || 190,
    partnerMaritalStatus: profile.preferences?.maritalStatus || "Never Married",
    partnerReligion: profile.preferences?.religionId?.toString() || "",
    partnerCaste: profile.preferences?.casteId?.toString() || "",
    partnerEducation: profile.preferences?.educationId?.toString() || "",
    partnerCountry: profile.preferences?.countryId?.toString() || "",
    partnerState: profile.preferences?.stateId?.toString() || "",
  };
};

/**
 * Compares current form data with initial data and returns only modified fields.
 * This reduces payload size for PATCH requests.
 */
export const getFormDataDiff = (initialData: any, currentData: any) => {
  const diff: any = {};

  Object.keys(currentData).forEach((key) => {
    // Deep comparison for primitives and simple values
    if (currentData[key] !== initialData[key]) {
      diff[key] = currentData[key];
    }
  });

  return diff;
};
