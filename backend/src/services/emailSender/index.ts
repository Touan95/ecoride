import { sendEmailToInviteUserToOrganization } from './inviteUserToOrganization';
import { sendEmailForIssueStatusUpdate } from './issueStatusUpdate';
import { resendEmailToInviteUserToOrganization } from './reinviteUserToOrganization';
import { sendEmailRequestIssueForUnsubscribedOrganization } from './requestIssueNewOrganization';
import { sendEmailToRequestResetPassword } from './resetPasswordRequest';

export interface EmailSenderMethods {
  issueStatusChange: typeof sendEmailForIssueStatusUpdate;
  inviteUserToOrganization: typeof sendEmailToInviteUserToOrganization;
  reinviteUserToOrganization: typeof resendEmailToInviteUserToOrganization;
  resetPasswordRequest: typeof sendEmailToRequestResetPassword;
  inviteOrganization: typeof sendEmailRequestIssueForUnsubscribedOrganization;
}

export const emailSender: EmailSenderMethods = {
  issueStatusChange: sendEmailForIssueStatusUpdate,
  inviteUserToOrganization: sendEmailToInviteUserToOrganization,
  reinviteUserToOrganization: resendEmailToInviteUserToOrganization,
  resetPasswordRequest: sendEmailToRequestResetPassword,
  inviteOrganization: sendEmailRequestIssueForUnsubscribedOrganization,
};
