import type { BottomNavItem } from '@/components/swift/bottom-nav';

export const homeNavItems: BottomNavItem[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'activity', label: 'Activity', icon: 'pulse' },
  { key: 'wallet', label: 'Wallet', icon: 'wallet', badge: '₦' },
  { key: 'messages', label: 'Messages', icon: 'chatbubble-ellipses' },
  { key: 'account', label: 'Account', icon: 'person-circle' },
];

export const marketplaceNavItems: BottomNavItem[] = [
  { key: 'market', label: 'Market', icon: 'storefront' },
  { key: 'rides', label: 'Rides', icon: 'car-sport' },
  { key: 'orders', label: 'Orders', icon: 'receipt' },
  { key: 'wallet', label: 'Wallet', icon: 'wallet' },
  { key: 'account', label: 'Account', icon: 'person-circle' },
];

export const driverNavItems: BottomNavItem[] = [
  { key: 'trips', label: 'Trips', icon: 'navigate' },
  { key: 'driver-earnings', label: 'Earnings', icon: 'wallet' },
  { key: 'boosts', label: 'Boosts', icon: 'flash' },
  { key: 'inbox', label: 'Inbox', icon: 'chatbubbles' },
  { key: 'driver-profile', label: 'Profile', icon: 'person-circle' },
];
