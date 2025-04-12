export enum ErrorCodes {
  ORGANIZATION_NOT_FOUND = 'organization-not-found',
  ORGANIZATION_EMAIL_NOT_FOUND = 'organization-email-not-found',
  STATUS_NOT_TO_ASSIGN = 'status-not-to-assign',
  ISSUE_ATTRIBUTED_TO_AGENT = 'issue-attributed-to-agent',
  ISSUE_ATTRIBUTED_TO_NODE = 'issue-attributed-to-node',
  AGENT_NOT_FOUND = 'agent-not-found',
  AGENT_NOT_REFERENT = 'agent-not-referent',
  POINT_MISSING_IN_REQUEST_ISSUE = 'point-missing-in-request-issue',
  AGENT_ALREADY_IN_NODE = 'agent-already-in-node',
  ISSUE_NODE_ASSIGNATION_FORBIDDEN = 'issue-node-assignation-forbidden',
  ISSUE_AGENT_ASSIGNATION_FORBIDDEN = 'issue-agent-assignation-forbidden',
  ISSUE_AGENT_ALREADY_EXISTS = 'issue-agent-already-exists',
  CHANGE_STATUS_FORBIDDEN = 'change-status-forbidden',
  APP_INITIALIZATION_ERROR = 'app-initialization-error',
  STATIC_MAP_ERROR = 'static-map-error',
  NODE_ALREADY_AFFECTED = 'node-already-affected',
  NO_ISSUE_ORGANIZATION_ID = 'no-issue-organization-id',
  BEGIN_ISSUE_FORBIDDEN = 'begin-issue-forbidden',
  NODE_ALREADY_BEGIN = 'node-already-begin',
  NODE_NAME_ALREADY_USED = 'node-name-already-used',
  NODE_NOT_FOUND = 'node-not-found',
  NODE_AGENT_NOT_FOUND_IN_ORGANIZATION = 'node-not-found-in-organization',
  INVALID_JWT_FORMAT = 'invalid-jwt-format',
  ISSUE_NOT_FOUND = 'issue-not-found',
  REQUEST_ISSUE_NOT_FOUND = 'request-issue-not-found',
  ISSUE_ALREADY_ASSOCIATED_TO_AN_ORGANIZATION = 'issue-already-associated-to-an-organization',
  ISSUE_ALREADY_EXISTS = 'issue-already-exists',
  CATEGORY_NOT_FOUND = 'category-not-found',
  USER_NOT_FOUND = 'user-not-found',
  PAYER_NOT_FOUND = 'payer-not-found',
  RECEIVER_NOT_FOUND = 'receiver-not-found',
  USER_DOES_NOT_EXIST_YET = 'user-does-not-exist-yet',
  USER_ALREADY_IN_ORGANIZATION = 'user-already-in-organization',
  USER_EMAIL_ALREADY_EXISTS = 'user-email-already-exists',
  BAD_CREDENTIALS = 'bad-credentials',
  INVALID_TOKEN_UNAUTHORIZED = 'invalid-token-unauthorized',
  INVALID_INVITATION = 'invalid-invitation',
  ACCEPT_INVITATION_FORBIDDEN = 'accept-invitation-forbidden',
  UNAUTHORIZED = 'Unauthorized',
  UPDATE_ISSUE_NOT_REFERENT_FORBIDDEN = 'update-issue-not-referent-forbidden',
  AFFECT_ISSUE_NOT_NODE_AGENT_FORBIDDEN = 'affect-issue-not-node-agent-forbidden',
  AFFECT_DONE_AND_AFFECTED_ISSUE_FORBIDDEN = 'affect-done-and-affected-issue-forbidden',
  QUEUE_RELATIVE_URI_NOT_FOUND = 'queue-relative-uri-not-found',
  EMAIL_NOT_IN_ORGANIZATION = 'email-not-in-organization',
  USER_NOT_IN_ORGANIZATION = 'user-not-in-organization',
  INVITE_DOES_NOT_EXIST = 'invite-does-not-exists',
  INTERNAL_SERVER_ERROR = 'internal-server-error',
  FORBIDDEN_ADMIN_ACCESS = 'forbidden-admin-access',
  FORBIDDEN_STAFF_ACCESS = 'forbidden-staff-access',
  //
  CAR_NOT_FOUND = 'car-not-found',
  RIDE_NOT_FOUND = 'ride-not-found',
  RIDE_PASSENGER_NOT_FOUND = 'ride-passenger-not-found',
  USER_ALREADY_PASSENGER = 'user-already-passenger',
  USER_NOT_PASSENGER = 'user-not-passenger',
  USER_NOT_DRIVER = 'user-not-driver',
  RIDE_BALANCE_ISSUE = 'ride-balance-issue',
  USER_IS_DRIVER = 'user-is-driver',
  RIDE_FULLY_BOOKED = 'ride-fully-booked',
  NOT_ENOUGH_CREDITS = 'not-enough-credits',
  RIDE_START_TOO_SOON = 'ride-start-too-soon',
  RIDE_NOT_UPCOMING = 'ride-not-upcoming',
  RIDE_NOT_ONGOING = 'ride-not-ongoing',
  RIDE_ALREADY_REVIEWED = 'ride-already-reviewed',
  USER_NOT_STAFF = 'user-not-staff',
  USER_NOT_ADMIN = 'user-not-admin',
  REVIEW_ALREADY_APPROVED = 'review-already-approved',
  REVIEW_NOT_FOUND = 'review-not-found',
}
