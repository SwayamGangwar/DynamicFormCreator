
import { FormFieldConfig } from '../types/form';

export const basicForm: FormFieldConfig[] = [
  {
    title: "Name",
    name: "name",
    placeholder: "Enter your name",
    type: "text",
    validator: "^[a-zA-Z ]{3,}$",
    value: "",
    required: true,
    error: "Name must be at least 3 letters."
  },
  {
    title: "Email",
    name: "email",
    placeholder: "you@example.com",
    type: "email",
    validator: "^[\\w.-]+@[\\w.-]+\\.\\w{2,4}$",
    required: true,
    value: "",
    error: "Invalid email format."
  },
  {
    title: "Age",
    name: "age",
    type: "number",
    min: "18",
    max: "99",
    resolution: "1",
    required: false,
    value: "",
    error: "Age must be between 18 and 99."
  }
];

export const selectForm: FormFieldConfig[] = [
  {
    title: "Primary Language",
    name: "language",
    type: "select",
    data: [
      { id: "js", title: "JavaScript" },
      { id: "py", title: "Python" },
      { id: "rb", title: "Ruby" }
    ],
    required: true,
    value: "py",
    error: "Please select a language."
  },
  {
    title: "Technologies Known",
    name: "tech_stack",
    type: "multiselect",
    data: [
      { id: "react", title: "React" },
      { id: "vue", title: "Vue" },
      { id: "flutter", title: "Flutter" },
      { id: "angular", title: "Angular" },
      { id: "svelte", title: "Svelte" }
    ],
    required: false,
    value: ["react"],
    error: "Select at least one technology."
  }
];

export const complexForm: FormFieldConfig[] = [
  {
    title: "Full Name",
    name: "fullName",
    placeholder: "Enter your full name",
    type: "text",
    validator: "^[a-zA-Z ]{3,}$",
    required: true,
    error: "Full name must be at least 3 characters."
  },
  {
    title: "Upload Profile Picture",
    name: "profile_pic",
    type: "file",
    data: {
      url: "https://httpbin.org/post",
      method: "POST",
      headers: {
        "Authorization": "Bearer sampleToken"
      }
    },
    required: false,
    error: "Profile picture upload failed."
  },
  {
    title: "Preferred Contact Method",
    name: "contact_method",
    type: "buttons",
    data: [
      { id: "email", title: "Email" },
      { id: "phone", title: "Phone" },
      { id: "sms", title: "SMS" }
    ],
    required: true,
    value: "email",
    error: "Please select a contact method."
  },
  {
    title: "Education Details",
    name: "education",
    type: "card",
    data: [
      {
        title: "Institution",
        name: "institution",
        placeholder: "University/College name",
        type: "text",
        validator: "^.{3,}$",
        required: true,
        error: "Institution name is required."
      },
      {
        title: "Degree",
        name: "degree",
        type: "select",
        data: [
          { id: "bachelor", title: "Bachelor's" },
          { id: "master", title: "Master's" },
          { id: "phd", title: "PhD" }
        ],
        required: true,
        error: "Please select your degree."
      },
      {
        title: "Start Date",
        name: "start_date",
        type: "date",
        min: "2000-01-01",
        max: "2025-12-31",
        required: true,
        error: "Enter valid start date."
      },
      {
        title: "End Date",
        name: "end_date",
        type: "date",
        min: "2000-01-01",
        max: "2025-12-31",
        required: false,
        error: "Enter valid end date."
      }
    ],
    required: true,
    error: "All education fields are mandatory."
  },
  {
    title: "Skills",
    name: "skills",
    type: "typeahead",
    placeholder: "Start typing to search skills...",
    data: [
      { id: "javascript", title: "JavaScript" },
      { id: "python", title: "Python" },
      { id: "react", title: "React" },
      { id: "vue", title: "Vue.js" },
      { id: "node", title: "Node.js" },
      { id: "mongodb", title: "MongoDB" },
      { id: "postgresql", title: "PostgreSQL" }
    ],
    required: false,
    error: "Please select a skill."
  },
  {
    title: "Bio",
    name: "bio",
    placeholder: "Tell us about yourself...",
    type: "textarea",
    validator: "^.{10,}$",
    required: false,
    error: "Bio must be at least 10 characters."
  }
];
