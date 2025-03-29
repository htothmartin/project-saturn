import { ConnectedAccount } from './connected-accounts';

export type User = {
  id: number;
  profilePictureUrl: string;
  fullName: string;
  firstname: string;
  lastname: string;
  email: string;
  connectedAccounts: ConnectedAccount[];
};
