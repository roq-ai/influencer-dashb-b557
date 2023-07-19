import * as yup from 'yup';

export const influencerValidationSchema = yup.object().shape({
  name: yup.string().required(),
  genre: yup.string().required(),
  location: yup.string().required(),
  contact_details: yup.string().required(),
  company_id: yup.string().nullable(),
});
