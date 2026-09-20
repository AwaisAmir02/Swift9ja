import { ComingSoonScreen } from '@/components/swift/coming-soon-screen';
import { marketplaceNavItems } from '@/constants/nav-items';

export default function OrdersScreen() {
  return (
    <ComingSoonScreen
      title="My Orders"
      icon="receipt"
      navItems={marketplaceNavItems}
      activeKey="orders"
      activeColor="#835500"
    />
  );
}
