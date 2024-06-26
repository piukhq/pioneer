const MEMBERSHIP_CARD_IMAGE_TYPES = {
  HERO: 0,
  BANNER: 1,
  OFFER: 2,
  ICON: 3,
  ASSET: 4,
  REFERENCE: 5,
  PERSONAL_OFFERS: 6,
  PROMOTIONS: 7,
  TIER: 8,
  ALTERNATIVE: 9,
}

const MODAL_ACTION_TYPES = {
  PAYMENT_CARD_LIMIT: 'PAYMENT_CARD_LIMIT',
  PAYMENT_CARD_ADD_FORM: 'PAYMENT_CARD_ADD_FORM',
  PAYMENT_CARD_DELETE_FORM: 'PAYMENT_CARD_DELETE_FORM',
  PAYMENT_CARD_LINKING_SUCCESS: 'PAYMENT_CARD_LINKING_SUCCESS',
  PAYMENT_CARD_LINKING_ERROR: 'PAYMENT_CARD_LINKING_ERROR',
  MEMBERSHIP_CARD_HERO: 'MEMBERSHIP_CARD_HERO',
  MEMBERSHIP_CARD_TRANSACTIONS: 'MEMBERSHIP_CARD_TRANSACTIONS',
  MEMBERSHIP_CARD_NO_TRANSACTIONS: 'MEMBERSHIP_CARD_NO_TRANSACTIONS',
  MEMBERSHIP_CARD_NO_REWARDS: 'MEMBERSHIP_CARD_NO_REWARDS',
  MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS: 'MEMBERSHIP_CARD_NON_ACTIVE_VOUCHERS',
  MEMBERSHIP_CARD_DELETE: 'MEMBERSHIP_CARD_DELETE',
  VOUCHER: 'VOUCHER',
  ACCOUNT_MENU: 'ACCOUNT_MENU',
  NO_MODAL: 'NO_MODAL',
  MODAL_REQUEST: 'modals/MODAL_REQUEST',
}

const BARCODE_TYPES = {
  CODE128: 'code128',
  QR_CODE: 'qrcode',
  AZTEC_CODE: 'azteccode',
  PDF417: 'pdf417',
  EAN13: 'ean13',
  DATAMATRIX: 'datamatrix',
  ITF14: 'itf14',
  CODE39: 'code39',
}

const MEMBERSHIP_CARD_REASON_CODES = {
  AUTHORISED_CODE: 'X300',
  REENROL_CODES: ['X101', 'X201'],
  READD_CODES: ['X102', 'X104', 'X202', 'X302', 'X303', 'X304'],
  PENDING_CODES: ['X200', 'X203', 'X301', 'X302'],
  GENERIC_ERROR_CODES: ['X100', 'X101', 'X102', 'X103', 'X104', 'X303', 'X304'],
  ACCOUNT_NOT_REGISTERED_CODE: 'X105',
  ENROL_REJECTED_CODE: 'X201',
  ACCOUNT_ALREADY_EXISTS_CODE: 'X202',
}

const MOBILE_OS_NAMES = {
  ANDROID: 'Android',
  IOS: 'iOS',
}

export { MEMBERSHIP_CARD_IMAGE_TYPES, MODAL_ACTION_TYPES, BARCODE_TYPES, MEMBERSHIP_CARD_REASON_CODES, MOBILE_OS_NAMES }
