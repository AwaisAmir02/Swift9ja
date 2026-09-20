import { ComingSoonScreen } from '@/components/swift/coming-soon-screen';
import { driverNavItems } from '@/constants/nav-items';

export default function DriverEarningsScreen() {
  return <ComingSoonScreen title="Earnings" icon="wallet" navItems={driverNavItems} activeKey="driver-earnings" />;
}
