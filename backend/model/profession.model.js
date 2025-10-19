import mongoose from 'mongoose';

const ProfessionSchema = new mongoose.Schema(
  {
    UIN: { type: Number, required: true },
    Category: { type: String, required: true },
    Professions: { type: String, required: true },
    Status: { type: String, required: true },
    'Professions-Icon': { type: String, required: true },
    'Top Professions': { type: String, required: true },
  },
  {
    collection: 'Professions',
  }
);

const Profession = mongoose.model('Profession', ProfessionSchema);

export default Profession;


