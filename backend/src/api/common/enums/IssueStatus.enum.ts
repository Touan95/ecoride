export enum IssueAutomationStatus {
  NEW = 'new',
  SPAM = 'spam',
  ORPHAN_ORGANIZATION = 'orphan_organization',
  IN_ORGANIZATION = 'in_organization',
  NON_SUBSCRIBER_ORGANIZATION = 'non_subscriber_organization',
}

export const ISSUE_AUTOMATION_STATUS: IssueAutomationStatus[] = [
  IssueAutomationStatus.NEW,
  IssueAutomationStatus.SPAM,
  IssueAutomationStatus.ORPHAN_ORGANIZATION,
  IssueAutomationStatus.IN_ORGANIZATION,
  IssueAutomationStatus.NON_SUBSCRIBER_ORGANIZATION,
];

export const NO_NEW_ISSUE_AUTOMATION_STATUS: IssueAutomationStatus[] =
  ISSUE_AUTOMATION_STATUS.filter((status) => status !== IssueAutomationStatus.NEW);
