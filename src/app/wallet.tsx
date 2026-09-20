import { ComingSoonScreen } from '@/components/swift/coming-soon-screen';
import { homeNavItems } from '@/constants/nav-items';

export default function WalletScreen() {
  return <ComingSoonScreen title="Swift Wallet" icon="wallet" navItems={homeNavItems} activeKey="wallet" />;
}
