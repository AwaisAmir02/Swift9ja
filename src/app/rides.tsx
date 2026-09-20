import { ComingSoonScreen } from '@/components/swift/coming-soon-screen';
import { marketplaceNavItems } from '@/constants/nav-items';

export default function RidesScreen() {
  return (
    <ComingSoonScreen
      title="Swift Mobility"
      icon="car-sport"
      navItems={marketplaceNavItems}
      activeKey="rides"
      activeColor="#835500"
    />
  );
}
