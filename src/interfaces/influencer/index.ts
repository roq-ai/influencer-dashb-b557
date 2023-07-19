import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface InfluencerInterface {
  id?: string;
  name: string;
  genre: string;
  location: string;
  contact_details: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface InfluencerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  genre?: string;
  location?: string;
  contact_details?: string;
  company_id?: string;
}
