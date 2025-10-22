import mongoose from "mongoose";

const ProfessionalUserSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      alias: "ID",
    },
    firstName: {
      type: String,
      alias: "First Name",
    },
    lastName: {
      type: String,
      alias: "Last Name",
    },
    phone: {
      type: String,
      alias: "Phone",
    },
    topProfessional: {
      type: String,
      alias: "Top Pro",
    },
    profession: {
      type: String,
      alias: "Profession",
    },
    city: {
      type: String,
      alias: "City",
    },
    area: {
      type: String,
      alias: "Area",
    },
    createdBy: {
      type: String,
      alias: "Created By",
    },
    createdDate: {
      type: String,
      alias: "Created Date",
    },
     "Active in App": { 
    type: String, 
    enum: ["Yes", "No", "Suspended", "Terminated", "Others"],
    default: "No"
  },
  "User Type": {
    type: String,
    enum: ["Premium", "Professional", "Basic", "Unverified"],
    default: "Basic"
  },
    "User Status": {
    type: String,
    enum: ["Online", "Offline"],
    default: "Online"
  },
    gender: {
      type: String,
      alias: "Gender",
    },
    updated: {
      type: String,
      alias: "Updated",
    },
    email: {
      type: String,
      alias: "Email",
    },
    whatsappAc: {
      type: String,
      alias: "WhatsApp Ac",
    },
    workingHours: {
      type: String,
      alias: "Working Hours",
    },
    whatsapp: {
      type: String,
      alias: "WhatsApp",
    },
    ward: {
      type: String,
      alias: "Ward #",
    },
    payment: {
      type: String,
      alias: "Payment",
    },
    uin: {
      type: Number,
      alias: "UIN",
    },
    referredBy: {
      type: String,
      alias: "Referred By",
    },
  },
  {
    collection: "ProfessionalUsers",
  }
);

// Prevent model overwrite during development (important for hot reloads)
const ProfessionalUser =
  mongoose.model("ProfessionalUser", ProfessionalUserSchema);

export default ProfessionalUser;
