export enum IssueProcessingStatus {
  TO_ASSIGN = 'to_assign',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  CANCELLED = 'cancelled',
  ALREADY_PROCESSED = 'already_processed',
}

export const ISSUE_PROCESSING_STATUS: IssueProcessingStatus[] = [
  IssueProcessingStatus.TO_ASSIGN,
  IssueProcessingStatus.ASSIGNED,
  IssueProcessingStatus.IN_PROGRESS,
  IssueProcessingStatus.DONE,
  IssueProcessingStatus.CANCELLED,
  IssueProcessingStatus.ALREADY_PROCESSED,
];
