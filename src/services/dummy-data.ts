export const currentUser = {
  firstName: 'Ibrahim',
  greeting: 'Good morning',
  location: 'Maitama, Abuja',
  tier: 'VIP GOLD',
  phone: '803 555 0192',
  walletBalance: 125500.0,
  cashbackPercent: 4.2,
};

export type ServiceItem = {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  iconBg: string;
  badge?: { text: string; bg: string; color: string };
};

export const everydayServices: ServiceItem[] = [
  { id: 'ride', label: 'Ride', sublabel: 'Fast Pick', icon: 'car-sport', iconBg: 'rgba(131,85,0,0.1)', badge: { text: 'Popular', bg: '#F5A623', color: '#644000' } },
  { id: 'shared', label: 'Shared', sublabel: 'Smart Pool', icon: 'people', iconBg: 'rgba(0,109,64,0.1)', badge: { text: '-40%', bg: '#006D40', color: '#FFFFFF' } },
  { id: 'routes', label: 'Routes', sublabel: 'Metro Bus', icon: 'bus', iconBg: '#E6E9E8' },
  { id: 'intercity', label: 'Intercity', sublabel: 'State-to-State', icon: 'map', iconBg: '#E6E9E8' },
  { id: 'courier', label: 'Courier', sublabel: 'Instant', icon: 'cube', iconBg: 'rgba(131,85,0,0.1)' },
  { id: 'food', label: 'Food', sublabel: 'Top Eateries', icon: 'restaurant', iconBg: 'rgba(186,26,26,0.1)', badge: { text: 'Hot', bg: '#BA1A1A', color: '#FFFFFF' } },
  { id: 'market', label: 'Shops', sublabel: '9ja Mart', icon: 'storefront', iconBg: 'rgba(0,109,64,0.1)' },
  { id: 'swiftcare', label: 'SwiftCare', sublabel: 'Emergency', icon: 'medkit', iconBg: '#E6E9E8' },
];

export const quickServices = ['SwiftFuel Voucher', 'Swift Own (Financing)', 'Corporate Accounts', 'SwiftRewards'];

export const savedPlaces = [
  { id: 'home', label: 'Home', detail: 'Wuse 2', icon: 'home' },
  { id: 'work', label: 'Work', detail: 'CBD, Abuja', icon: 'briefcase' },
  { id: 'saved', label: 'Saved', detail: 'Nnamdi Azikiwe Airport', icon: 'star' },
];

export const recentPlaces = [
  { id: 'p1', title: 'Transcorp Hilton, Abuja', subtitle: '1 Aguiyi Ironsi St, Maitama • 3.2 km', icon: 'business' },
  { id: 'p2', title: 'Jabi Lake Mall', subtitle: 'Bala Sokoto Way, Jabi • 5.8 km', icon: 'cart' },
];

export const recommendedRestaurant = {
  name: 'Kilimanjaro Restaurant',
  subtitle: 'Wuse 2, Abuja • Nigerian Delicacies & Pastries',
  eta: '20-30 mins',
  rating: 4.8,
  deliveryFee: '₦650 Swift Delivery • Free with SwiftPass',
};

export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stockLabel: string;
  badge?: { text: string; bg: string; color: string };
  discountBadge?: string;
  imageColor: string;
  icon: string;
};

export const products: Product[] = [
  {
    id: 'iphone-15-pro-max',
    title: 'iPhone 15 Pro Max\n256GB - Titanium',
    category: 'Phones & Tech',
    price: 1450000,
    originalPrice: 1650000,
    rating: 4.9,
    reviews: 182,
    stockLabel: 'In Stock',
    badge: { text: 'Authentic', bg: '#8AF5B4', color: '#007243' },
    discountBadge: '-12%',
    imageColor: '#F2F4F3',
    icon: 'phone-portrait',
  },
  {
    id: 'samsung-55-uhd-tv',
    title: 'Samsung 55" Crystal\nUHD 4K Smart TV',
    category: 'Home Appliances',
    price: 520000,
    originalPrice: 585000,
    rating: 4.8,
    reviews: 94,
    stockLabel: '2 Left',
    badge: { text: 'Same-Day', bg: '#8DF8B7', color: '#002110' },
    imageColor: '#F2F4F3',
    icon: 'tv',
  },
  {
    id: 'royal-stallion-rice-50kg',
    title: 'Bag of Royal Stallion\nRice 50kg',
    category: 'Groceries',
    price: 78000,
    originalPrice: 84500,
    rating: 5.0,
    reviews: 410,
    stockLabel: 'Wholesale',
    badge: { text: '100% Stone-Free', bg: '#FFDDB4', color: '#291800' },
    imageColor: '#F2F4F3',
    icon: 'nutrition',
  },
  {
    id: '10kva-solar-inverter',
    title: '10kVA Hybrid Solar\nInverter System',
    category: 'Solar & Power',
    price: 890000,
    originalPrice: 1120000,
    rating: 4.9,
    reviews: 68,
    stockLabel: 'Free Install',
    badge: { text: '3yr Warranty', bg: '#8AF5B4', color: '#007243' },
    discountBadge: '-20%',
    imageColor: '#F2F4F3',
    icon: 'flash',
  },
];

export const productDetail = {
  id: 'iphone-15-pro-max',
  title: 'iPhone 15 Pro Max 256GB - Natural Titanium',
  price: 1450000,
  originalPrice: 1650000,
  savings: 200000,
  storageOptions: [
    { label: '128GB', price: '₦1.32M' },
    { label: '256GB', price: '₦1.45M' },
    { label: '512GB', price: '₦1.68M' },
    { label: '1TB', price: '₦1.92M' },
  ],
  colorOptions: [
    { label: 'Natural Titanium', hex: '#9A968F' },
    { label: 'Blue Titanium', hex: '#2D3748' },
    { label: 'White Titanium', hex: '#E3E4E6' },
    { label: 'Black Titanium', hex: '#212124' },
  ],
  seller: {
    name: 'iStore Abuja Official',
    rating: 4.9,
    orders: '2,400+',
    onTime: '98%',
  },
  bnplMonthly: 362500,
  dispatch: 'Dispatches in 45 mins to Maitama, Abuja & VI, Lagos.',
};

export const marketplaceCategories = [
  { id: 'all', label: 'All', active: true },
  { id: 'phones', label: 'Phones & Tech' },
  { id: 'groceries', label: 'Groceries' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'auto', label: 'Auto Spares' },
  { id: 'naija', label: 'Nigerian Brands' },
];

export const exploreCategories = [
  { id: 'smartphones', label: 'Smartphones', detail: '8.2k Items', icon: 'phone-portrait', bg: 'rgba(255,221,180,0.4)' },
  { id: 'fresh-food', label: 'Fresh Food', detail: 'Market Run', icon: 'nutrition', bg: 'rgba(141,248,183,0.5)' },
  { id: 'fabrics', label: 'African Fabrics', detail: 'Ankara & Lace', icon: 'shirt', bg: 'rgba(255,221,180,0.4)' },
  { id: 'appliances', label: 'Appliances', detail: 'Warranty Guaranteed', icon: 'tv', bg: '#ECEEED' },
  { id: 'vehicle-parts', label: 'Vehicle Parts', detail: 'Ladipo Direct', icon: 'car', bg: '#ECEEED' },
  { id: 'solar', label: 'Solar & Power', detail: 'Zero NEPA wahala', icon: 'flash', bg: 'rgba(141,248,183,0.5)' },
];

export const driverStats = {
  todayEarnings: 32500,
  surgeEarned: 4200,
  trips: 8,
  hoursOnline: 5.2,
  rating: 4.96,
  ratingPercentile: 'NTPP Top 2%',
  pingArea: 'Abuja CBD & Wuse 2',
  gpsStatus: 'GPS 4G • 0 km/h',
};

export const driverHotspots = [
  { id: 'maitama', label: '+₦800 Surge', location: 'Maitama District', tone: 'gold' as const },
  { id: 'airport', label: '+₦500 Inbound', location: 'Nnamdi Azikiwe Airport', tone: 'mint' as const },
];

export const driverWeatherDemand = {
  title: 'Rain in Wuse 2',
  boostPercent: '+45%',
  subtitle: 'Surge multipliers active until 3:30 PM',
};

export const driverActiveQuest = {
  title: 'Midday Trip Boost',
  expiry: 'Expires at 3:00 PM (1h 12m left)',
  reward: '+₦3,000',
  rewardLabel: 'Bonus Cash',
  completed: 8,
  total: 10,
  progressPercent: 80,
  hint: 'Need just 2 more trips in Wuse or CBD',
};

export const driverQuickActions = [
  { id: 'destination', label: 'Set Destination', icon: 'navigate-circle-outline' },
  { id: 'fuel', label: 'SwiftFuel Hub', icon: 'flame-outline' },
  { id: 'sos', label: 'Driver SOS', icon: 'warning' },
];
