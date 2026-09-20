import { ComingSoonScreen } from '@/components/swift/coming-soon-screen';
import { homeNavItems } from '@/constants/nav-items';

export default function MessagesScreen() {
  return (
    <ComingSoonScreen title="Messages" icon="chatbubble-ellipses" navItems={homeNavItems} activeKey="messages" />
  );
}
