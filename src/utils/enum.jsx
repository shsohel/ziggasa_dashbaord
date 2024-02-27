import countryData from "./data/country.json";

export const confirmObj = {
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  html: "You can use <b>bold text</b>",
  confirmButtonText: "Yes !",
  cancelButtonText: "No",
};

export const status = {
  success: 200,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
  severError: 500,
  conflict: 409,
  methodNotAllow: 405,
};

export const countries = countryData.map((country) => ({
  country: country.name,
  code: country.code,
  state: country.state,
}));

export const countriesOption = countryData.map((country) => ({
  countryName: country.country,
  countryCode: country.code,
  value: country.country,
  label: country.country,
  states: country?.state?.map((state) => ({
    countryName: country.country,
    countryCode: country.code,
    stateName: state.name,
    stateCode: state.code,
    value: state.name,
    label: state.name,
  })),
}));

export const propertyLabels = [{ label: "Hot Offer", value: "Hot Offer" }];

export const sortTypes = [
  { label: "Category", value: "category" },
  { label: "Property Types", value: "propertyTypes" },
];
export const propertyTypes = [
  { label: "For Rent", value: "For rent" },
  { label: "For Sale", value: "For Sale" },
];
export const propertyStatus = [
  { label: "For Rent", value: "For rent" },
  { label: "For Sale", value: "For Sale" },
];
export const unitTypes = [
  { label: "None", value: "None" },
  { label: "Thousand", value: "Thousand" },
  { label: "Billion", value: "Billion" },
  { label: "Million", value: "Million" },
];
export const propertyCategories = [
  { label: "Apartment", value: "Apartment" },
  { label: "Bar", value: "Bar" },
  { label: "Cafe", value: "Cafe" },
  { label: "Farm", value: "House" },
  { label: "Restaurant", value: "Restaurant" },
  { label: "Single Family", value: "Single Family" },
  { label: "Spa", value: "Spa" },
  { label: "Store", value: "Store" },
  { label: "Villa", value: "Villa" },
];

export const videoTypes = [
  { label: "Youtube", value: "Youtube" },
  { label: "Facebook", value: "Facebook" },
];
