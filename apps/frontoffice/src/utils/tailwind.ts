type MarginBaseRestriction = 'mx-' | 'my-' | 'ml-' | 'mr-' | 'mt-' | 'mb-' | 'm-';

export type MarginRestrictedClassnames =
  | `${MarginBaseRestriction}${number}`
  | `${MarginBaseRestriction}${number} ${MarginBaseRestriction}${number}`;
