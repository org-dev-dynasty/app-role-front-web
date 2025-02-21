export const INSTITUTE_PARTNER = {
  GLOBAL_PARTNER: 'GLOBAL_PARTNER',
  PROMOTER_PARTNER: 'PROMOTER_PARTNER',
  NO_PARTNER: 'NO_PARTNER',
} as const;

export const institutePartnerMap = {
  [INSTITUTE_PARTNER.GLOBAL_PARTNER]: 'Global Partner',
  [INSTITUTE_PARTNER.PROMOTER_PARTNER]: 'Promoter Partner',
  [INSTITUTE_PARTNER.NO_PARTNER]: 'No Partner',
};

export const institutePartnerKeys = Object.values(INSTITUTE_PARTNER);

export type InstitutePartner =
  (typeof INSTITUTE_PARTNER)[keyof typeof INSTITUTE_PARTNER];

export const institutePartnerFields = institutePartnerKeys.map((type) => ({
  value: type,
  label: institutePartnerMap[type],
}));
