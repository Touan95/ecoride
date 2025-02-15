import { resolve } from 'path';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { emailRenderer } from '../../../core/mailer/emailRenderer';
import { sendEmail } from '../../../core/mailer';
import { OrganizationEntityInterface } from '../../../entities/organization.entity';
import { RequestIssueWithAllRelations } from '../../../repositories/requestIssue.repository';
import { urlJoin } from '../../../utils/urlHelper';
import config from '../../../loader/config';

dayjs.locale('fr');

interface EmailParams {
  requestIssue: RequestIssueWithAllRelations;
  organization: OrganizationEntityInterface;
}

const getStaticMapImage = (latitude: number, longitude: number): string => {
  return urlJoin(
    config.BASE_URL,
    `/api/map/static?latitude=${latitude}&longitude=${longitude}&width=600&height=162`,
  );
};

export const sendEmailRequestIssueForUnsubscribedOrganization = async ({
  requestIssue,
  organization,
}: EmailParams): Promise<void> => {
  const formattedDate = dayjs(requestIssue.creationDate).format('DD MMM. YYYY [à] HH[h]mm');

  const displayedTotalPhotoNumber =
    requestIssue.pictures.length - 3 > 0 ? requestIssue.pictures.length - 3 : undefined;

  const postalCodeRegex = /(\d{5})/;
  const matches = requestIssue.address.match(postalCodeRegex);
  let firstAddress = requestIssue.address;
  let secondAddress = '';

  if (matches && matches.index !== undefined) {
    const index = matches.index;
    firstAddress = requestIssue.address.substring(0, index).trim();
    secondAddress = requestIssue.address.substring(index).trim();
  }

  const truncatedDescription =
    requestIssue.description.length > 310
      ? requestIssue.description.substring(0, 310) + '...'
      : requestIssue.description;

  const organizationInvitationHtml = await emailRenderer({
    baseTemplate: 'public',
    subTemplatePath: resolve(
      __dirname,
      './templates/requestIssueForUnsubscribedOrganization.template.hbs',
    ),
    params: {
      email: organization.email ?? '',
      cityName: organization.name,
      issueTitle: requestIssue.title,
      issueDate: formattedDate,
      issueMap: getStaticMapImage(
        requestIssue.location.coordinate.latitude,
        requestIssue.location.coordinate.longitude,
      ),
      firstAddress: firstAddress,
      secondAddress: secondAddress,
      firstPhotoURL: requestIssue.pictures[0]?.url,
      secondPhotoURL: requestIssue.pictures[1]?.url,
      thirdPhotoURL: requestIssue.pictures[2]?.url,
      totalPhotoNumber: displayedTotalPhotoNumber,
      categoryType: requestIssue.category?.name,
      description: truncatedDescription,
    },
  });

  await sendEmail({
    to: organization.email ?? '',
    html: organizationInvitationHtml,
    subject: `[SIGNALEO] : Informations du signalement`,
  });
};
