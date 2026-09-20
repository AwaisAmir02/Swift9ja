import { ComingSoonScreen } from '@/components/swift/coming-soon-screen';
import { driverNavItems } from '@/constants/nav-items';

export default function InboxScreen() {
  return <ComingSoonScreen title="Inbox" icon="chatbubbles" navItems={driverNavItems} activeKey="inbox" />;
}
