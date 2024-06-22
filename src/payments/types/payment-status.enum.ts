export const PaymentStatusType = {
  received: 'received',
  success: 'success',
  processed: 'processed',
  completed: 'completed',
};

export type PaymentStatusEnum =
  (typeof PaymentStatusType)[keyof typeof PaymentStatusType];
