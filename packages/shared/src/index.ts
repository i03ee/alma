export const API_PREFIX = '/api/v1' as const;

export const orderStatuses = [
  'DRAFT',
  'CREATED',
  'SEARCHING_DRIVER',
  'DRIVER_ASSIGNED',
  'DRIVER_ACCEPTED',
  'DRIVER_ARRIVING',
  'PICKUP_STARTED',
  'PURCHASING',
  'PURCHASE_EVIDENCE_PENDING',
  'PURCHASE_APPROVED',
  'IN_TRANSIT',
  'ARRIVED',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED',
  'EXPIRED',
  'REJECTED',
  'DISPUTED',
  'FAILED'
] as const;

export type OrderStatus = (typeof orderStatuses)[number];

const transitionMap: Record<OrderStatus, readonly OrderStatus[]> = {
  DRAFT: ['CREATED', 'CANCELLED'],
  CREATED: ['SEARCHING_DRIVER', 'CANCELLED', 'EXPIRED'],
  SEARCHING_DRIVER: ['DRIVER_ASSIGNED', 'CANCELLED', 'EXPIRED', 'FAILED'],
  DRIVER_ASSIGNED: ['DRIVER_ACCEPTED', 'REJECTED', 'CANCELLED', 'EXPIRED'],
  DRIVER_ACCEPTED: ['DRIVER_ARRIVING', 'CANCELLED', 'DISPUTED'],
  DRIVER_ARRIVING: ['PICKUP_STARTED', 'CANCELLED', 'DISPUTED'],
  PICKUP_STARTED: ['PURCHASING', 'IN_TRANSIT', 'CANCELLED', 'DISPUTED'],
  PURCHASING: ['PURCHASE_EVIDENCE_PENDING', 'CANCELLED', 'DISPUTED'],
  PURCHASE_EVIDENCE_PENDING: ['PURCHASE_APPROVED', 'DISPUTED', 'CANCELLED'],
  PURCHASE_APPROVED: ['IN_TRANSIT', 'DISPUTED', 'CANCELLED'],
  IN_TRANSIT: ['ARRIVED', 'DISPUTED', 'FAILED'],
  ARRIVED: ['DELIVERED', 'DISPUTED'],
  DELIVERED: ['COMPLETED', 'DISPUTED'],
  COMPLETED: [],
  CANCELLED: [],
  EXPIRED: [],
  REJECTED: ['SEARCHING_DRIVER', 'FAILED'],
  DISPUTED: ['COMPLETED', 'FAILED'],
  FAILED: []
};

export function canTransitionOrder(from: OrderStatus, to: OrderStatus): boolean {
  return transitionMap[from].includes(to);
}

export interface HealthResponse {
  status: 'ok';
  service: 'alma-api';
  version: string;
  timestamp: string;
}
