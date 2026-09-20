import { ComingSoonScreen } from '@/components/swift/coming-soon-screen';
import { driverNavItems } from '@/constants/nav-items';

export default function BoostsScreen() {
  return <ComingSoonScreen title="Boosts" icon="flash" navItems={driverNavItems} activeKey="boosts" />;
}
