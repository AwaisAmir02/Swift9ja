import { ComingSoonScreen } from '@/components/swift/coming-soon-screen';
import { homeNavItems } from '@/constants/nav-items';

export default function ActivityScreen() {
  return (
    <ComingSoonScreen title="Activity" icon="pulse" navItems={homeNavItems} activeKey="activity" />
  );
}
