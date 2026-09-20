import { ComingSoonScreen } from '@/components/swift/coming-soon-screen';
import { homeNavItems } from '@/constants/nav-items';

export default function AccountScreen() {
  return <ComingSoonScreen title="Account" icon="person-circle" navItems={homeNavItems} activeKey="account" />;
}
