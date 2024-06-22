export const PaymentStatusType = {
  received: 'received',
  success: 'success',
  processed: 'processed',
};

export type PaymentStatusEnum =
  (typeof PaymentStatusType)[keyof typeof PaymentStatusType];
