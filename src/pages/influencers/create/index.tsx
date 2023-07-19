import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createInfluencer } from 'apiSdk/influencers';
import { Error } from 'components/error';
import { influencerValidationSchema } from 'validationSchema/influencers';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { InfluencerInterface } from 'interfaces/influencer';

function InfluencerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InfluencerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInfluencer(values);
      resetForm();
      router.push('/influencers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InfluencerInterface>({
    initialValues: {
      name: '',
      genre: '',
      location: '',
      contact_details: '',
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: influencerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Influencer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="genre" mb="4" isInvalid={!!formik.errors?.genre}>
            <FormLabel>Genre</FormLabel>
            <Input type="text" name="genre" value={formik.values?.genre} onChange={formik.handleChange} />
            {formik.errors.genre && <FormErrorMessage>{formik.errors?.genre}</FormErrorMessage>}
          </FormControl>
          <FormControl id="location" mb="4" isInvalid={!!formik.errors?.location}>
            <FormLabel>Location</FormLabel>
            <Input type="text" name="location" value={formik.values?.location} onChange={formik.handleChange} />
            {formik.errors.location && <FormErrorMessage>{formik.errors?.location}</FormErrorMessage>}
          </FormControl>
          <FormControl id="contact_details" mb="4" isInvalid={!!formik.errors?.contact_details}>
            <FormLabel>Contact Details</FormLabel>
            <Input
              type="text"
              name="contact_details"
              value={formik.values?.contact_details}
              onChange={formik.handleChange}
            />
            {formik.errors.contact_details && <FormErrorMessage>{formik.errors?.contact_details}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'influencer',
    operation: AccessOperationEnum.CREATE,
  }),
)(InfluencerCreatePage);
