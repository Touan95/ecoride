import { Request } from 'express';
export interface AuthObject {
  userId: string;
  isAdmin: boolean;
  email: string;
  firstName: string;
  lastName: string;
  currentOrganizationId: string | null;
  currentOrganizationName: string | null;
  referentNodeIds: string[];
}

export interface RequestWithJwt extends Request {
  jwt: AuthObject;
}

export type ResetPasswordTokenAuthObjectType = Pick<AuthObject, 'userId' | 'email'>;
export type RefreshTokenAuthObjectType = Pick<AuthObject, 'userId'>;

export interface JoinOrganizationObject {
  email: string;
  organizationId: string;
}

export interface ApproveRoutingIssueObject {
  organizationId: string;
  requestIssueId: string;
}
