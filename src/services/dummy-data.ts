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

export const rideRoute = {
  pickup: 'Maitama',
  destination: 'Transcorp',
  pickupFull: 'Maitama District',
  destinationFull: 'Transcorp Hilton',
  durationMins: 12,
  distanceKm: 4.5,
};

export type RideCategory = {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  seats: number;
  description: string;
  pickupMins: number;
  price: number;
  originalPrice?: number;
  priceNote?: string;
  iconBg: string;
  icon: string;
};

export const rideCategories: RideCategory[] = [
  {
    id: 'economy',
    name: 'Swift Economy',
    tag: 'Eco',
    tagColor: '#FFFFFF',
    tagBg: '#835500',
    seats: 4,
    description: 'Affordable everyday ride • AC included',
    pickupMins: 3,
    price: 4500,
    originalPrice: 5400,
    iconBg: 'rgba(255,221,180,0.5)',
    icon: 'car-sport',
  },
  {
    id: 'comfort',
    name: 'Swift Comfort',
    tag: 'Plus',
    tagColor: '#FFFFFF',
    tagBg: '#006D40',
    seats: 4,
    description: 'Newer sedans with extra legroom',
    pickupMins: 5,
    price: 6500,
    priceNote: 'Top rated',
    iconBg: '#ECEEED',
    icon: 'car',
  },
  {
    id: 'premium',
    name: 'Swift Premium',
    tag: 'VIP',
    tagColor: '#644000',
    tagBg: '#F5A623',
    seats: 4,
    description: 'Executive luxury SUVs & VIP treatment',
    pickupMins: 7,
    price: 9500,
    priceNote: 'Chauffeured',
    iconBg: '#2E3131',
    icon: 'car-sport',
  },
  {
    id: 'xl',
    name: 'Swift XL',
    tag: '6-Seat',
    tagColor: '#FFFFFF',
    tagBg: '#5A605D',
    seats: 6,
    description: 'Spacious rides for groups & luggage',
    pickupMins: 8,
    price: 8000,
    priceNote: 'Extra boot',
    iconBg: '#ECEEED',
    icon: 'bus',
  },
  {
    id: 'keke',
    name: 'Swift Keke',
    tag: 'Fast',
    tagColor: '#007243',
    tagBg: '#8AF5B4',
    seats: 3,
    description: 'Fast urban intra-city hops & traffic dodging',
    pickupMins: 2,
    price: 1800,
    priceNote: 'Quickest',
    iconBg: 'rgba(138,245,180,0.5)',
    icon: 'bicycle',
  },
];

export const activeRideTrip = {
  driverName: 'Emmanuel Okafor',
  vehicle: 'Silver Toyota Corolla',
  plate: 'ABC-123XY',
  rating: 4.94,
  trips: 2410,
  safetyPin: '4821',
  destination: 'Transcorp Hilton',
  etaMins: 14,
  remainingKm: 3.8,
  fare: 4500,
  walletBalance: 48200,
  sharingWith: 'Amaka (Wife)',
};

export const restaurantDetail = {
  name: 'Kilimanjaro Restaurant',
  cuisine: 'Nigerian • Grills • Swallows • Naija Delicacies',
  location: 'Wuse 2, Abuja',
  status: 'OPEN • FAST KITCHEN',
  rating: 4.8,
  ratingsCount: 1840,
  etaMins: '20-30 min',
  distanceKm: 2.4,
  deliveryFee: '₦650 Swift',
  deliverTo: 'Transcorp Hilton, Maitama',
  deliverEta: '18-25 mins',
  promoCode: 'JOLOFFEST',
  promoDiscount: '20% Off',
  promoMinOrder: 3000,
  swiftPoints: 108,
};

export const menuCategories = [
  { id: 'popular', label: 'Popular (★)' },
  { id: 'jollof', label: 'Smoky Jollof & Rice' },
  { id: 'swallow', label: 'Swallow & Native Soups' },
  { id: 'grills', label: 'Grills & Suya' },
  { id: 'sides', label: 'Sides & Small Chops' },
  { id: 'drinks', label: 'Drinks & Palm Wine' },
];

export const featuredDish = {
  id: 'jollof-combo',
  name: 'Smoky Party Jollof & Grilled Chicken Combo',
  badge: 'Bestseller',
  subBadge: 'Smoky Firewood Recipe',
  description:
    'Authentic firewood-infused Nigerian party jollof rice served with spiced quarter-leg grilled chicken, sweet golden dodo plantains, and fresh slaw.',
  price: 4200,
  originalPrice: 4800,
  note: 'Customizable Options',
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  tag?: { text: string; bg: string; color: string };
  dotColor?: string;
};

export const menuItems: MenuItem[] = [
  {
    id: 'pounded-yam',
    name: 'Pounded Yam & Native Egusi Soup',
    description: 'Smooth pounded yam paired with rich melon-seed Egusi, dry fish, shaki, kpomo, and tender beef.',
    price: 5500,
    tag: { text: 'Chef Recommended', bg: '#ECEEED', color: '#F5A623' },
    dotColor: '#006D40',
  },
  {
    id: 'peppered-beef',
    name: 'Peppered Beef & Crispy Yam Duo',
    description: 'Spicy slow-braised beef chunks tossed in scotch bonnet & habanero pepper sauce, with fried yam.',
    price: 3800,
    tag: { text: 'Spicy Naija Rub', bg: 'transparent', color: '#5A605D' },
    dotColor: '#F5A623',
  },
  {
    id: 'grilled-catfish',
    name: 'Charcoal Grilled Catfish (Point & Kill)',
    description: 'Basted with secret Kilimanjaro spice rub, served with sweet roasted plantain bole and pepper sauce.',
    price: 6900,
    tag: { text: 'Fresh Daily', bg: 'rgba(138,245,180,0.4)', color: '#006D40' },
    dotColor: '#006D40',
  },
  {
    id: 'dodo',
    name: 'Sweet Fried Plantain (Dodo Portion)',
    description: 'Caramelized golden-fried ripe plantain slices, freshly tossed in light sea salt.',
    price: 1200,
  },
];

export const tripRatingData = {
  driverFirstName: 'Ibrahim',
  driverName: 'Ibrahim Garba',
  destination: 'Transcorp Hilton, Maitama',
  distanceKm: 8.4,
  durationMins: 22,
  vehicle: 'Silver Toyota Corolla',
  plate: 'ABC-782-RSH',
  rating: 4.9,
  completedTrips: 1240,
  positiveTags: ['Polite & Respectful', 'Smooth Driving', 'Clean Car', 'On-time Pickup', 'Great Music'],
  defaultSelectedTags: ['Polite & Respectful', 'Smooth Driving', 'Clean Car'],
  complimentNote: 'Ibrahim was very professional and helped with my luggage at Tower B!',
  fare: 2850,
  reference: '#SW-RD-9042',
  breakdown: [
    { label: 'Base fare', value: 1200 },
    { label: 'Distance & Time (8.4 km, 22m)', value: 1350 },
    { label: 'Toll & City Transit Levy', value: 300 },
    { label: 'SwiftPass Saver Discount', value: -500, accent: true },
  ],
  tipOptions: [300, 500, 1000, 2000],
  defaultTip: 500,
  swiftPoints: 45,
  tier: 'Tier Gold',
};

export const walletDetail = {
  balance: 125500.0,
  escrowAmount: 0,
  verificationTier: 'TIER-3 VERIFIED ACCOUNT',
  verificationSubtitle: 'BVN Linked • NDIC Insured Partner',
};

export const subWallets = [
  {
    id: 'rewards',
    name: 'SwiftRewards',
    badge: 'Tier Gold',
    badgeColor: '#835500',
    badgeBg: 'rgba(255,221,180,0.5)',
    value: '4,850',
    valueUnit: 'Pts',
    subtext: 'Value = ₦4,850.00',
    cta: 'Redeem for Rides',
  },
  {
    id: 'fuel',
    name: 'SwiftFuel Wallet',
    badge: 'Active',
    badgeColor: '#007243',
    badgeBg: 'rgba(138,245,180,0.5)',
    value: '15,000',
    valueUnit: '₦',
    subtext: 'Accepted at Total & NNPC',
    cta: 'Top Up Fuel',
  },
];

export const fundingAccount = {
  bank: 'Providus Bank',
  number: '9920194820',
};

export const virtualCard = {
  label: 'SWIFT9JA VIRTUAL CARD',
  currencyToggle: 'USD | NGN',
  last4: '8831',
  cardholder: 'CHUKWUDIE OKOYE',
  expiry: '08/28',
};

export const linkedCard = {
  name: 'GTBank Naira Mastercard',
  badge: 'Default',
  detail: 'Mastercard Debit •••• 6920',
};

export type WalletActivity = {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  amount: number;
  action?: string;
  status?: string;
  statusColor?: string;
  statusBg?: string;
};

export const walletActivity: WalletActivity[] = [
  {
    id: 'ride',
    icon: 'car-sport',
    iconBg: 'rgba(255,221,180,0.5)',
    title: 'Ride - Toyota Corolla (ABC-123XY)',
    subtitle: 'Today • 08:30 AM • Ikeja to VI',
    amount: -4500,
    action: 'Receipt',
  },
  {
    id: 'topup',
    icon: 'checkmark-circle',
    iconBg: 'rgba(138,245,180,0.5)',
    title: 'Wallet Top-up via Providus',
    subtitle: 'Yesterday • Bank Transfer',
    amount: 50000,
    status: 'Successful',
    statusColor: '#007243',
    statusBg: 'rgba(138,245,180,0.5)',
  },
  {
    id: 'food',
    icon: 'restaurant',
    iconBg: 'rgba(255,221,180,0.5)',
    title: 'Kilimanjaro Jollof & Chicken',
    subtitle: '24 Oct • SwiftEats Express',
    amount: -7200,
    action: 'Details',
  },
  {
    id: 'cashback',
    icon: 'gift',
    iconBg: 'rgba(255,221,180,0.5)',
    title: 'SwiftRewards 5% Cashback',
    subtitle: '22 Oct • Fuel Purchase Promo',
    amount: 450,
    status: 'Earned',
    statusColor: '#835500',
    statusBg: '#F5A623',
  },
];

export const walletPromoBanner = {
  label: 'LAGOS RUSH PROMO',
  title: 'Earn 2x Points on Island Rides',
  subtitle: 'Book between 4 PM - 7 PM to boost your SwiftRewards.',
};

export const checkoutOrder = {
  restaurantName: 'Kilimanjaro',
  deliveryAddress: {
    label: 'Transcorp Hilton, Maitama',
    detail: 'Room 2, Tower B • Aguiyi Ironsi St, Abuja',
    contact: 'Chinedu O. • +234 803 555 0192',
    note: 'Leave at concierge desk during arrival',
  },
  speedTiers: [
    { id: 'standard', label: 'Standard', eta: '20-30 mins', price: 0 },
    { id: 'turbo', label: 'Turbo Drop', eta: '10-15 mins', price: 150, badge: 'Limited' },
  ],
  defaultSpeedTier: 'standard',
  sidePortionQty: 1,
  promoCode: 'JOLOFFEST20',
  promoDiscount: 1080,
  swiftPassDeliverySaved: 650,
  swiftPointsRedeem: 400,
  courierTipOptions: [200, 500, 1000],
  defaultCourierTip: 500,
  paymentMethod: 'SwiftWallet',
  walletBalance: 48200,
  walletTopUp: 500,
  summary: {
    itemsSubtotal: 5400,
    promoDiscount: -1080,
    packagingLevy: 250,
    courierTip: 500,
    totalPayable: 5070,
  },
  pointsEarned: 120,
};

export const foodOrderTracking = {
  orderId: '#SW-FD-7821',
  restaurant: 'Kilimanjaro',
  hub: 'Wuse 2 Hub',
  etaRange: '14-18 mins',
  arrivalTime: '2:15 PM',
  distanceAway: '1.8 km away',
  trafficNote: 'Light traffic along Maitama Flyover Live',
  statusStep: 'Approaching Shehu Shagari Way',
  statusDetail: 'Next turn right towards Maitama Gate 3',
  statusBadge: 'On Schedule',
  handoverPin: '8421',
  rider: {
    name: 'Ibrahim Garba',
    rating: 4.9,
    deliveries: 1240,
    vehicle: 'Honda 125 • Silver (ABJ-432-KW)',
  },
  quickReplies: ["I'm at lobby", 'Please ring bell'],
  packageItems: [
    { id: 'combo', name: 'Kilimanjaro Smoky Jollof Combo', detail: 'Quarter leg chicken, Dodo, Spicy sauce', qty: 1, price: 4200 },
    { id: 'plantain', name: 'Extra Fried Plantain (Dodo Portion)', price: 650 },
    { id: 'cutlery', name: 'Eco Cutlery, Extra Napkins & Toothpick', price: 0, free: true },
    { id: 'dispatch', name: 'Express Swift Dispatch & Packaging Fee', price: 220 },
  ],
  paymentMethod: 'SwiftWallet',
  paymentAmount: 5070,
  dropoff: {
    name: 'Transcorp Hilton Maitama',
    address: '1 Aguiyi Ironsi St, Maitama, Abuja 900271',
    instructions: 'Leave at concierge desk or ring arrival. Room 412, Tower B.',
  },
};

export type FleetOption = {
  id: string;
  label: string;
  capacity: string;
  eta: string;
  price: number;
  icon: string;
};

export const courierFleetOptions: FleetOption[] = [
  { id: 'bike', label: 'Express Bike', capacity: '<5kg capacity', eta: '~25m', price: 1800, icon: 'bicycle' },
  { id: 'car', label: 'Car Boot', capacity: '<25kg capacity', eta: '~40m', price: 3200, icon: 'car' },
  { id: 'van', label: 'Van Cargo', capacity: '<100kg capacity', eta: '~55m', price: 7500, icon: 'bus' },
];

export const courierBooking = {
  distanceKm: 8.4,
  pickup: {
    location: 'Kilimanjaro Hub, Wuse 2, Abuja',
    contact: 'Chinedu O. • +234 803 555 0192',
  },
  dropoff: {
    location: 'Transcorp Hilton Lobby, Maitama',
    contact: 'Emenike K. • +234 807 111 5844',
  },
  handlingNote: 'Leave at front reception, call upon arrival',
  estimatedWeight: '2.3 kg estimated',
  packageCategories: ['Documents', 'Electronics (Fragile)', 'Clothing', 'Food & Perishables', 'Gifts'],
  defaultCategory: 'Electronics (Fragile)',
  weightRange: '0.5kg — 5.0kg',
  fragileHandling: true,
  guaranteeInsurance: 350,
  handoverPinFee: 0,
  fareBreakdown: {
    distanceFare: 1800,
    guaranteeCoverage: 350,
    memberDiscount: -400,
    total: 1800,
  },
  walletBalance: 48200,
};

export const swiftcareData = {
  networkStatus: 'Official Swift9JA Network',
  breakdownEtaMins: 12,
  breakdownTitle: 'Stuck on the road?',
  breakdownSubtitle: 'Rapid rescue patrol units stationed alternated across Abuja expressways and Lagos hubs.',
  vehicle: {
    name: '2019 Toyota Corolla',
    detail: 'Silver • ABC-782-RSH',
    verified: false,
  },
  breakdownPin: 'Shehu Shagari Way',
  breakdownLocation: 'Near Federal Secretariat Complex, CBD, Abuja',
  nearbyVans: 4,
  nearbyRangeKm: 2.7,
  servicesAvailable: 6,
  assuranceTitle: 'SwiftCare Assurance Warranty',
  assuranceSubtitle:
    '100% Vetted ASE Certified Mechanics • Fixed upfront rates • 30-Day nationwide repair warranty across Nigeria.',
};

export type SwiftcareService = {
  id: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  icon: string;
};

export const swiftcareServices: SwiftcareService[] = [
  {
    id: 'tyre',
    name: 'Flat Tyre & Puncture Repair',
    price: 2500,
    description: 'Mobile vulcanizer arrives in ~14 mins with heavy compressor',
    tags: ['Patch or Space Swap', '+10 Min ETA'],
    icon: 'disc',
  },
  {
    id: 'battery',
    name: 'Battery Jumpstart & Diagnostic',
    price: 4000,
    description: '12V/24V heavy duty booster pack & alternator test',
    tags: ['Alternator Test', 'New Battery Option'],
    icon: 'battery-charging',
  },
  {
    id: 'towing',
    name: 'Emergency Flatbed Towing',
    price: 18000,
    description: 'Zero damage tread, flatbed to certified garage or home',
    tags: ['Hydraulic Ramp', 'Gift Transit Insured'],
    icon: 'car',
  },
  {
    id: 'fuel',
    name: 'Emergency Fuel Delivery',
    price: 6500,
    description: '5L/10L certified premium petrol/diesel in sealed safety containers',
    tags: ['Anti-Spill Pump', 'Fuel Grade Fuel'],
    icon: 'water',
  },
  {
    id: 'mechanic',
    name: 'Certified Mobile Mechanic',
    price: 5000,
    description: 'On-site engine, brake, and electronic OBD-2 computer diagnostics',
    tags: ['ASE Certified', 'ECU Scanning'],
    icon: 'construct',
  },
  {
    id: 'ac',
    name: 'AC & Overheating Repair',
    price: 4500,
    description: 'Radiator coolant top-up, fan belt check & emergency leak seal',
    tags: ['Coolant Flush', 'Intercooler Seal'],
    icon: 'snow',
  },
];

export const chatSupportData = {
  agent: { name: 'Adaeze', badge: 'Priority Care' },
  order: { id: '#SW-FD-7821', context: 'Kilimanjaro Wuse 2' },
  rider: {
    name: 'Ibrahim Garba',
    etaText: '8 mins away',
    vehicle: 'Honda 125 • Silver (ABJ-432-KW)',
    pin: '8421',
  },
  encryptionNote: 'End-to-end encrypted with Swift Care Concierge',
  dateLabel: 'Today, 2:04 PM',
  messages: [
    {
      id: 'm1',
      from: 'agent',
      time: '2:04 PM',
      text: "Hello Chinedu! 👋 I can see your Kilimanjaro jollof order #SW-FD-7821 is currently in transit with dispatch rider Ibrahim. How can I assist you today?",
    },
    {
      id: 'm2',
      from: 'user',
      time: '2:05 PM',
      text: 'Hi Adaeze! Can Ibrahim drop the package at Tower B reception directly? I am in an urgent meeting.',
    },
    {
      id: 'm3',
      from: 'agent',
      time: '2:06 PM',
      text: 'Absolutely! I have updated the rider delivery note and Ibrahim has confirmed drop-off at Tower B concierge desk. Your secure 4-digit handover PIN remains 8421.',
      card: {
        status: 'Updated',
        item: 'Kilimanjaro Jollof & Smoked Turkey',
        dropoff: 'Tower B Reception Desk',
        riderContact: 'Ibrahim (0803 491 8820)',
      },
    },
  ],
  quickReplies: ['Thank you, all good! 👍', 'Ask rider to call upon arrival 📞'],
};

export const accountProfile = {
  name: 'Chinedu Okafor',
  phone: '+234 803 555 0192',
  rating: 4.95,
  tier: 'Gold',
  badge: 'SwiftPass Elite',
  walletBalance: 48200,
};

export const membershipPerks = [
  {
    id: 'savings',
    name: 'SwiftPass Savings',
    badge: 'Active',
    value: '₦12,400',
    subtitle: 'Saved on trips this month',
    cta: 'View Benefits',
  },
  {
    id: 'rewards',
    name: 'SwiftRewards',
    badge: 'Points',
    value: '4,850 pts',
    subtitle: 'Worth ₦4,850 in fare & shop credit',
    cta: 'Redeem Now',
  },
];

export const safetySettings = [
  {
    id: 'share-trip',
    icon: 'people',
    title: 'Share Live Trip Status',
    subtitle: 'Auto-share with Naledi O., Omeka K.',
    enabled: true,
  },
  {
    id: 'audio',
    icon: 'mic',
    title: 'Audio Trip Recording',
    subtitle: 'Encrypted, archives if route deviates',
    enabled: true,
  },
  {
    id: 'pin',
    icon: 'keypad',
    title: '4-Digit Driver Handover PIN',
    subtitle: 'Driver must verify PIN before starting ride',
    enabled: true,
  },
];

export const accountPreferences = [
  {
    id: 'personal',
    icon: 'person',
    title: 'Personal Information',
    subtitle: 'Chinedu Okafor',
    badge: 'BVN & NIN Verified',
  },
  { id: 'places', icon: 'map', title: 'Saved Places', subtitle: 'Home (Maitama) • Work (Wuse 2)' },
  {
    id: 'vehicles',
    icon: 'car',
    title: 'My Vehicles (SwiftCare)',
    subtitle: '2019 Toyota Corolla (ABC-782-RSH)',
    badge: 'Insurance OK',
  },
  { id: 'payment', icon: 'card', title: 'Payment Methods', subtitle: 'Previous Virtual Card • Access Bank' },
  {
    id: 'corporate',
    icon: 'briefcase',
    title: 'Corporate Profile Mode',
    subtitle: 'Bill rides to Sahara Energy Ltd.',
    toggle: false,
  },
];

export const appSettings = [
  { id: 'biometric', icon: 'finger-print', title: 'Face ID & Biometric Login', subtitle: 'Instant and secure app unlocking', enabled: true },
  { id: 'alerts', icon: 'notifications', title: 'Push & SMS Delivery Alerts', subtitle: 'Instant trip arrival & transfer receipts', enabled: true },
];

export const onboardingSlide = {
  badge: 'The 3-in-1 Ecosystem',
  title: 'One App. Endless Possibilities.',
  subtitle: 'Mobility, food, shopping, vehicles, payments and rewards — all with Swift9JA.',
  tags: ['₦ Instant Transfers', 'SwiftCare 24/7'],
  slideIndex: 3,
  slideTotal: 3,
  features: [
    { id: 'mobility', icon: 'car', label: 'Swift Mobility', detail: 'Cars & Keke' },
    { id: 'food', icon: 'fast-food', label: 'Food & Courier', detail: 'Express Dispatch' },
    { id: 'wallet', icon: 'card', label: 'SwiftWallet', detail: '₦0 Free Transfers' },
  ],
  swiftcareBanner: {
    title: 'SwiftCare Roadside Rescue',
    subtitle: '24/7 on-demand vehicle assistance across Nigeria.',
  },
};

export const driverEarningsSummary = {
  availableForCashout: 58450.0,
  tier: 'Tier 3',
  bankAccount: 'Access Bank •••• 4920',
  bankNote: 'Instant Settlement Deducted',
  cashoutNote: 'Instant NIBSS Switch • Flat ₦50 processing fee per transfer',
  fuelCredit: 12700,
  periodLabel: 'NET EARNED (16 - 22 Oct)',
  periodLink: 'Abuja Urban Surge',
  netEarned: 184200,
  netEarnedChangePercent: 9.6,
  stats: [
    { id: 'completed', label: 'Completed', value: '42 trips' },
    { id: 'online', label: 'Online hours', value: '31.4 hrs' },
    { id: 'avgHourly', label: 'Avg Hourly', value: '₦5,860' },
  ],
  dailyPattern: [
    { day: 'M', level: 0.3 },
    { day: 'T', level: 0.4 },
    { day: 'W', level: 0.35 },
    { day: 'T', level: 0.5 },
    { day: 'F', level: 0.85, accent: 'gold' },
    { day: 'S', level: 1, accent: 'emerald' },
    { day: 'S', level: 0.2 },
  ],
  surgeQuest: {
    title: 'Weekend Surge Hunter',
    reward: 10000,
    location: 'Abuja Central • Maitama / Wuse',
    completed: 16,
    total: 35,
    progressPercent: 72,
    hoursLeft: 16,
    tripsRemaining: 7,
  },
  weeklyStatement: [
    { label: 'Standard Trip Fares (Gross)', value: 152400 },
    { label: 'Surge & Rain Multipliers', value: 18600 },
    { label: 'Quests & Weekend Boosts', value: 8500 },
    { label: 'Passenger Tips (100% yours)', value: 4700 },
    { label: 'Swift9JA Partner Fee (15% Tier)', value: -22860 },
  ],
  netTakeHome: 161340,
  settlements: [
    {
      id: 's1',
      icon: 'car-sport',
      iconBg: 'rgba(255,221,180,0.5)',
      title: 'Transcorp Hilton → Jabi Lake Mall',
      subtitle: 'Today, 5:15 PM • +₦700 Surge Included',
      amount: 4500,
      status: 'Credited',
    },
    {
      id: 's2',
      icon: 'business',
      iconBg: 'rgba(138,245,180,0.5)',
      title: 'Instant Payout • Access Bank',
      subtitle: 'Yesterday, 8:30 PM • Ref: N9855-8945',
      amount: -40000,
      status: 'Settled',
    },
    {
      id: 's3',
      icon: 'gift',
      iconBg: 'rgba(255,221,180,0.5)',
      title: 'Midday Rush Incentive Bonus',
      subtitle: 'Yesterday, 3:15 PM • Central Business District',
      amount: 3000,
      status: 'Quest Met',
    },
    {
      id: 's4',
      icon: 'airplane',
      iconBg: 'rgba(255,221,180,0.5)',
      title: 'Wuse 2 → Nnamdi Azikiwe Airport',
      subtitle: '24 Oct, 03:10 AM • Includes ₦1,000 Tip',
      amount: 9200,
      status: 'Credited',
    },
  ],
};

export const incomingRequest = {
  category: 'Swift Economy',
  surgeMultiplier: '1.4x Surge Applied',
  respondSeconds: 18,
  grossFare: 4200,
  surgeBonus: 700,
  passenger: {
    name: 'Amina B.',
    rating: 4.9,
    rides: 142,
    verified: true,
  },
  pickup: {
    label: 'Transcorp Hilton',
    address: '1 Aguiyi Ironsi St, Maitama, Abuja',
    etaMins: 4,
    distanceKm: 1.2,
  },
  dropoff: {
    label: 'Jabi Lake Mall',
    address: 'Bala Sokoto Way, Jabi, Abuja',
    etaMins: 18,
    distanceKm: 6.4,
  },
};

export const activeNavigation = {
  nextTurnDistance: '300m',
  nextTurnStreet: 'Shehu Shagari Way',
  turnEta: '3 min',
  turnRemaining: '900m left',
  pickupNote: 'Pickup: Transcorp Hilton Gate 2',
  vehicleLabel: 'You (Toyota Corolla)',
  rider: {
    name: 'Ibrahim K.',
    badge: 'Top Rider',
    rating: 4.85,
    rides: 38,
    note: 'Waiting by the main hotel lobby gate, carrying a leather black briefcase.',
  },
  dropoff: { label: 'Jabi Lake Mall, Abuja', fare: 4500 },
  securityPin: ['4', '8', '2', '1'],
  pinVerifiedNote: 'PIN Verified — Passenger Ibrahim verified in vehicle',
  safetyTools: [
    { id: 'sos', icon: 'shield', label: 'SwiftGuard SOS', bg: 'rgba(255,218,214,0.6)', color: '#BA1A1A' },
    { id: 'route', icon: 'navigate', label: 'Share Route', bg: 'rgba(138,245,180,0.4)', color: '#007243' },
    { id: 'delay', icon: 'warning', label: 'Report Delay', bg: 'rgba(255,221,180,0.5)', color: '#835500' },
  ],
  supportLine: 'Abuja Driver Support Fleet',
  supportSubtitle: '24/7 Priority Assistance Line',
};

export const driverKyc = {
  complianceScore: 9,
  complianceTotal: 10,
  compliancePercent: 90,
  complianceLabel: '90% Verified Partner',
  expiryWarning: {
    title: 'Vehicle Inspection (VIS) expires in 14 days',
    subtitle: 'Renew via Route on Nov 15, 2024 to preserve active dispatch status.',
  },
  tabs: ['Documents (4)', 'Identity', 'Driver License'],
  documents: [
    {
      id: 'nin',
      title: 'NIN / NIMC Verification',
      status: 'VERIFIED',
      detail: 'National ID: •••••4920',
      subtitle: 'Verified on NIMC Database',
      action: 'View Slip',
    },
    {
      id: 'license',
      title: 'HGV Commercial License',
      status: 'VERIFIED',
      detail: 'Class B • FCT-DMV-A1 - Bus',
      subtitle: 'Front & Rear Scans Verified',
      action: 'View Card',
    },
    {
      id: 'inspection',
      title: 'Vehicle Inspection Certificate',
      status: 'EXPIRES SOON',
      detail: 'Valid until: 15 Nov 2024',
      subtitle: 'Renew & Upload',
      action: 'Renew & Upload',
      attention: true,
    },
    {
      id: 'insurance',
      title: 'Leadway Commercial Insurance',
      status: 'VERIFIED',
      detail: 'POD-2024-RCT-1900 Fee',
      subtitle: 'Expires: 12 Jan 2025',
      action: 'View Policy',
    },
    {
      id: 'roadworthiness',
      title: 'Roadworthiness & UWN',
      status: 'VERIFIED',
      detail: 'Toyota Corolla • ABC-123XY',
      subtitle: 'NAFDAC & FCT DVLA Certified',
      action: 'View Papers',
    },
    {
      id: 'guarantor',
      title: 'Guarantor Attestation',
      status: 'REVIEWING',
      detail: 'Ref: Alh. Abdulkarim Mohammed',
      subtitle: 'Submitted 2 days ago • Manual check',
      action: '24 - 48h ETA',
    },
  ],
  vehicle: {
    name: 'Toyota Corolla',
    colorBadge: 'Silver',
    plate: 'ABC-123XY',
    regionBadge: 'FCT',
    tags: ['Swift Economy', 'Swift Comfort', 'Courier Delivery'],
  },
  supportBanner: {
    title: 'Need Help with Documentation?',
    subtitle: 'Our Abuja Onboarding Centre is open Mon - Sat',
    cta: 'Chat with Driver Support',
  },
  footer: 'FCT Transport Certified • NTPP Compliant',
};

export const deliveryMode = {
  active: true,
  capacityNote: 'Capacity: Up to 25kg (Sedan Trunk)',
  tabs: ['All Deliveries (2)', 'Express Parcels', 'Eatery'],
  surgeBanner: {
    title: 'High Parcel Volume • Wuse 2',
    subtitle: '+₦450 Surge per parcel drop',
  },
  hubsLabel: 'Live Courier Hubs (Abuja)',
  hubPickupCount: 'Wuse 2 Hub: 14 Pickups',
  hubReadyCount: 'Jabi Mall: 8 Ready',
  job: {
    id: '#SW-8921',
    payout: 3650,
    payoutNote: 'Instant Wallet Payout on Drop',
    category: 'Electronics & Documents',
    fragile: true,
    weight: '2.4 kg (Fits Front/Boot)',
    handling: 'Keep Upright & Dry',
  },
  pickup: {
    label: 'GadgetHub Wuse 2',
    address: 'Plot 41 Aminu Kano Crescent',
    sender: 'Sender: Aisha M.',
    distanceKm: 1.4,
    etaMins: 5,
  },
  dropoff: {
    label: 'Transcorp Hilton Lobby',
    address: '1 Aguiyi Ironsi St, Maitama',
    recipient: 'Recipient: Emmanuel K. (PIN verification on delivery)',
    distanceKm: 4.2,
  },
  securityProtocol: [
    'Scan Merchant Package QR code at pickup.',
    'Capture Photo Proof & enter 4-digit recipient PIN at drop-off.',
  ],
  stackDelivery: {
    reward: 1800,
    subtitle: 'En-route pickup near Wuse 2 hub.',
  },
  todayStats: {
    shift: 'Active Shift: 4h 15m',
    dropsDone: 6,
    dropsNote: '100% On-Time',
    grossEarned: '₦18.4K',
    grossNote: 'Incl. Surges',
    rating: '5.0★',
    ratingNote: 'Gold Courier',
  },
};

export const riderPickup = {
  location: 'Abuja CBD / Wuse 2',
  riderTag: 'Swift-Rider #R-41',
  assignmentId: '#SW-PK-9042',
  pickupBadge: 'PICKUP AT STORE',
  etaMins: 4,
  distanceKm: 1.1,
  destinationLabel: 'Mega Plaza Superstore & Electronics',
  store: {
    name: 'Mega Plaza Tech Hub',
    address: 'Shop 14, Ground Floor, Adetokunbo Ademola Cres, Wuse 2',
  },
  instruction: 'Show pickup QR/code at counter B. Customer already paid in full via SwiftWallet Escrow.',
  checklist: [
    { id: 'phone', title: 'iPhone 15 Pro Max 256GB', subtitle: 'Sealed Box • IMEI SN# verified', checked: true },
    { id: 'charger', title: 'Apple 20W USB-C Power Adapter', subtitle: 'Standard Packaging', checked: true },
    {
      id: 'seal',
      title: 'SwiftCourier Security Seal Tag',
      subtitle: '#NGR-8821 • Scan Required',
      checked: false,
    },
  ],
  payout: 2350,
  baseRate: 1850,
  peakSurge: 500,
};
