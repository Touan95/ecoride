import { IssueProcessingStatus } from '../api/common/enums/IssueProcessingStatus.enum';

export const checkIsAssignableIssueStatus = (status: IssueProcessingStatus): boolean => {
  if (
    status === IssueProcessingStatus.TO_ASSIGN ||
    status === IssueProcessingStatus.ASSIGNED ||
    status === IssueProcessingStatus.IN_PROGRESS
  ) {
    return true;
  }
  return false;
};
