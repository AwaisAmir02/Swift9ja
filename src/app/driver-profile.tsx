import { ComingSoonScreen } from '@/components/swift/coming-soon-screen';
import { driverNavItems } from '@/constants/nav-items';

export default function DriverProfileScreen() {
  return (
    <ComingSoonScreen title="Driver Profile" icon="person-circle" navItems={driverNavItems} activeKey="driver-profile" />
  );
}
