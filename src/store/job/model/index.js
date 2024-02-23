export const jobModel = {
  title: "",
  slug: "",
  category: [],
  subCategory: [],
  tag: [],
  company: null,
  details: "",
  qualifications: "",
  responsibilities: "",
  keyword: [],
  skills: [],
  benefits: [],
  salary: "",
  currency: null,
  phoneNumber: "",
  email: "",
  metaDescription: "",
  metaTitle: "",
  author: "",
  featuredImageUrl: "",
  featuredImageTitle: "",
  featuredImageCaptions: "",
  featuredImageDescriptions: "",
  featuredImageAltText: "",
  isActive: true,
};

// enums: ["Full-Time", "Part-Time", "Contractual"],
export const jobTypes = [
  {
    label: "Full-Time",
    value: "Full-Time",
  },
  {
    label: "Part-Time",
    value: "Part-Time",
  },
  {
    label: "Contractual",
    value: "Contractual",
  },
];
export const currenciesOptions = [
  {
    label: "USD",
    value: "USD",
    sign: "$",
  },
  {
    label: "BDT",
    value: "BDT",
    sign: "৳",
  },
];

export const benefitsOptions = [
  {
    label: "Company meals",
    value: "Company meals",
  },
  {
    label: "Equity benefits",
    value: "Equity benefits",
  },
  {
    label: "Flexible working hours",
    value: "Flexible working hours",
  },
  {
    label: "Generous vacation",
    value: "Generous vacation",
  },
  {
    label: "Healthcare",
    value: "Healthcare",
  },
  {
    label: "Life insurance",
    value: "Life insurance",
  },
  {
    label: "Paid parental leave",
    value: "Paid parental leave",
  },
  {
    label: "Paid vacation",
    value: "Paid vacation",
  },
];
