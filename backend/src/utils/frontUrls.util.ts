import config from '../loader/config';

export function buildAskResetPasswordUrl(token: string): string {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `${config.WEBAPP_BASE_URL}${config.WEBAPP_RESET_PASSWORD_PATH}?token=${token}`;
}

export function buildJoinOrganizationUrl(token: string): string {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `${config.WEBAPP_BASE_URL}${config.WEBAPP_JOIN_ORGANIZATION_PATH}?token=${token}`;
}
