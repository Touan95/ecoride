import { connectAndSendSms } from '../../../core/sms';
import { IssueEntity } from '../../../entities/issue.entity';
import { IssueProcessingStatus } from '../enums/IssueProcessingStatus.enum';

const buildStatusChangeIssueSms = (issue: IssueEntity): string | undefined => {
  switch (issue.processingStatus) {
    case IssueProcessingStatus.IN_PROGRESS:
      return `Bonjour, votre signalement ${issue.id} est en cours de traitement.`;
    case IssueProcessingStatus.DONE:
      return `Bonjour, votre signalement ${issue.id} est terminé.`;
    case IssueProcessingStatus.CANCELLED:
      return `Bonjour, votre signalement ${issue.id} est annulé.`;
    default:
      return undefined;
  }
};

export interface SendSmsNewIssueOptions {
  issue: IssueEntity;
}
export const sendSmsStatusChangeIssue = async ({
  issue,
}: SendSmsNewIssueOptions): Promise<void> => {
  if (!issue.requestIssue?.feedbackPhoneNumber) {
    return;
  }

  const text = buildStatusChangeIssueSms(issue);
  if (!text) {
    return;
  }

  await connectAndSendSms({ text, to: issue.requestIssue.feedbackPhoneNumber });
};
