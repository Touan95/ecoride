import { resolve } from 'path';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { IssueEntity } from '../../../entities/issue.entity';
import { sendEmail } from '../../../core/mailer';
import { IssueProcessingStatus } from '../../../api/common/enums/IssueProcessingStatus.enum';

const buildStatusChangeIssueSubject = (
  issue: IssueEntity,
): { subject: string; description: string } => {
  switch (issue.processingStatus) {
    case IssueProcessingStatus.TO_ASSIGN:
      return {
        subject: `Votre signalement a été créé sous la demande ${issue.id}`,
        description: `Votre demande à bien été pris en compte par Signaleo, vous serai averti quand la demande sera en cours de traitement et quand elle sera terminé.`,
      };
    case IssueProcessingStatus.ASSIGNED:
      return {
        subject: `Votre signalement ${issue.id} a été assigné`,
        description:
          'Votre demande à bien été assignée ! Vous serai averti quand la demande sera en cours de traitement et quand elle sera terminé.',
      };
    case IssueProcessingStatus.IN_PROGRESS:
      return {
        subject: `Votre signalement ${issue.id} est en cours de traitement`,
        description: 'Votre demande est en cours de traitement.',
      };

    case IssueProcessingStatus.DONE:
      return {
        subject: `Bonne nouvelle, votre signalement ${issue.id} a été traité`,
        description: 'Votre demande est traitée.',
      };
    case IssueProcessingStatus.CANCELLED:
      return {
        subject: `Votre signalement ${issue.id} a été annulé`,
        description: 'Votre signalement à été annulé sur Signaleo.',
      };
    case IssueProcessingStatus.ALREADY_PROCESSED:
      return {
        subject: `Votre signalement ${issue.id} avait déjà été traité`,
        description: 'Votre demande sur Signaleo avait déjà été traitée dans le passé.',
      };
    default:
      return {
        subject: `Votre signalement a été créé sous la demande ${issue.id}`,
        description:
          'Votre demande à bien été pris en compte par Signaleo, vous serai averti quand la demande sera en cours de traitement et quand elle sera terminé.',
      };
  }
};

export const sendEmailForIssueStatusUpdate = async (issue: IssueEntity): Promise<void> => {
  if (!issue.requestIssue?.feedbackEmail) {
    return;
  }

  const { subject, description } = buildStatusChangeIssueSubject(issue);

  const html = await emailRenderer({
    baseTemplate: 'internal',
    subTemplatePath: resolve(__dirname, './templates/updateIssue.template.hbs'),
    params: {
      email: issue.requestIssue.feedbackEmail,
      description,
    },
  });

  await sendEmail({ html, subject, to: issue.requestIssue.feedbackEmail });
};
