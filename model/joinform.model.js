import mongoose from 'mongoose';

const JoinFormSchema = new mongoose.Schema({
  "First Name": String,
  "Middle Name": String,
  "Last Name": String,
  Phone: String,
  Profession: String,
  Gender: String,
  province: String,
  district: String,
  City: String,
  ward: String,
  Area: String,
  referredBy: String,
  dateOfBirth: String,
  bloodGroup: String,
  maritalStatus: String,
  Headshot:String,
  idUpload: String,
  idType:String,
  status: {
    type: String,
    enum: ['Basic', 'Professional', 'Premium', 'Suspended', 'Offline'],
    default: 'Basic'
  },

}, {
 timestamps: true });

const JoinForm = mongoose.model('JoinForm', JoinFormSchema, 'joinforms');
export default JoinForm;