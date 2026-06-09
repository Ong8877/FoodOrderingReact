// src/data/foodData.ts

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  prepTime: string;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
  remarks: string;
}

export const FOOD_DATA: FoodItem[] = [
  // ==================== MALAYSIAN LOCAL FOODS (10 Items) ====================
  {
    id: 'f1',
    name: 'Nasi Lemak Ayam Goreng',
    category: 'Local Rice',
    price: 13.50,
    description: 'Fragrant coconut rice served with crispy spiced fried chicken, signature spicy sambal, crunchy anchovies, peanuts, and boiled egg.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400',
    prepTime: '10-15 mins',
  },
  {
    id: 'f2',
    name: 'Penang Char Kway Teow',
    category: 'Noodles',
    price: 10.50,
    description: 'Flat rice noodles stir-fried over high heat "wok hei" with juicy fresh prawns, cockles, crunchy bean sprouts, chives, and egg.',
    image: 'https://images.unsplash.com/photo-1617470703128-26a0fc9af10f?q=80&w=400',
    prepTime: '8-12 mins',
  },
  {
    id: 'f3',
    name: 'Roti Canai Double Toast',
    category: 'Roti',
    price: 4.50,
    description: 'Two pieces of crispy, flaky, and fluffy flatbread, hand-flipped to perfection and served with aromatic dhal curry and sambal.',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400',
    prepTime: '5-8 mins',
  },
  {
    id: 'f4',
    name: 'Classic Chicken Satay (6pcs)',
    category: 'Sides',
    price: 9.00,
    description: 'Skewered chicken chunks marinated in lemongrass and local spices, charcoal-grilled and paired with rich, thick peanut dipping sauce.',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=400',
    prepTime: '12-15 mins',
  },
  {
    id: 'f5',
    name: 'Aromatic Curry Laksa',
    category: 'Noodles',
    price: 12.00,
    description: 'Noodles immersed in rich, spicy, creamy coconut milk curry broth, topped with shredded chicken, tofu puffs, fish cakes, and mint.',
    // 💡 FIXED: Switched to a high-availability, fully public static Asian noodle dish image link
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=400',
    prepTime: '10-12 mins',
  },
  {
    id: 'f6',
    name: 'Hainanese Chicken Rice',
    category: 'Local Rice',
    price: 11.00,
    description: 'Tender poached chicken served with fragrant seasoned chicken rice, light soy sauce, fresh cucumber slices, and zesty chili garlic paste.',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=400',
    prepTime: '8-10 mins',
  },
  {
    id: 'f7',
    name: 'Maggie Goreng Special',
    category: 'Noodles',
    price: 8.50,
    description: 'Stir-fried instant noodles with fresh vegetables, tofu cubes, and local seasoning, crowned with a perfect sunny-side-up fried egg.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=400',
    prepTime: '5-7 mins',
  },
  {
    id: 'f8',
    name: 'Banana Fritters (Pisang Goreng)',
    category: 'Sides',
    price: 5.00,
    description: 'Sweet local bananas coated in a special airy batter and deep-fried until perfectly golden, crispy, and shatteringly crunchy.',
    image: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?q=80&w=400',
    prepTime: '5-6 mins',
  },
  {
    id: 'f9',
    name: 'Keropok Lekor Terengganu',
    category: 'Sides',
    price: 6.00,
    description: 'Traditional fish crackers from East Coast fried crisp on the outside and chewy inside, served with a sweet and tangy local sweet chili sauce.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400',
    prepTime: '5-8 mins',
  },
  {
    id: 'f10',
    name: 'Ayam Masak Merah with Rice',
    category: 'Local Rice',
    price: 12.50,
    description: 'Tender chicken pieces braised in a rich, sweet, and mildly spicy tomato chili gravy, served with hot steamed jasmine rice.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=400',
    prepTime: '10-14 mins',
  },

  // ==================== REFRESHING LOCAL DRINKS (10 Items) ====================
  {
    id: 'd1',
    name: 'Iced Teh Tarik (Teh Ais)',
    category: 'Drinks',
    price: 3.80,
    description: 'Rich, froth-crowned black tea pulled smoothly with sweet condensed milk, served chilled over crushed ice cubes.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=400',
    prepTime: '3-4 mins',
  },
  {
    id: 'd2',
    name: 'Iced Milo Dinosaur XL',
    category: 'Drinks',
    price: 5.50,
    description: 'Classic chilled malty iced Milo chocolate drink, topped generously with a mountain of pure undissolved Milo powder.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=400',
    prepTime: '3-5 mins',
  },
  {
    id: 'd3',
    name: 'Sirap Bandung Cincau',
    category: 'Drinks',
    price: 4.50,
    description: 'Fragrant pink rose syrup mixed with sweet condensed milk and packed with shredded herbal grass jelly ribbons.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400',
    prepTime: '2-4 mins',
  },
  {
    id: 'd4',
    name: 'Refreshing Ambra Sour Plum',
    category: 'Drinks',
    price: 4.80,
    description: 'Freshly blended green Kedondong juice balanced perfectly with savory, salty local dried sour plum (Asam Boi).',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=400',
    prepTime: '4-5 mins',
  },
  {
    id: 'd5',
    name: 'Teh O Ais Limau',
    category: 'Drinks',
    price: 3.50,
    description: 'Chilled iced black tea brewed freshly and brightened with squeezed zesty local calamansi lime juice juice extracts.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400',
    prepTime: '2-3 mins',
  },
  {
    id: 'd6',
    name: 'Fresh Coconut Water',
    category: 'Drinks',
    price: 6.00,
    description: 'Pure, refreshing, naturally sweet hydration fluid extracted straight from fresh chilled Pandan coconuts.',
    // 💡 FIXED: Switched to a secure, stable pure organic whole tropical coconut image link
    image: 'https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=400',
    prepTime: '2-3 mins',
  },
  {
    id: 'd7',
    name: 'Barley Ais Homemade',
    category: 'Drinks',
    price: 3.50,
    description: 'Traditional slow-boiled pearled barley grain water, served ice-cold with light rock sugar sweetness.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400',
    prepTime: '2-3 mins',
  },
  {
    id: 'd8',
    name: 'Soya Cincau (Michael Jackson)',
    category: 'Drinks',
    price: 4.20,
    description: 'Chilled local fresh organic soy milk combined perfectly with diced black herbal grass jelly bits.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=400',
    prepTime: '2-3 mins',
  },
  {
    id: 'd9',
    name: 'Kopi Ais Traditional',
    category: 'Drinks',
    price: 3.80,
    description: 'Nanyang roasted local coffee beans brewed strong, mixed with condensed milk and poured over thick ice.',
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=400',
    prepTime: '3-4 mins',
  },
  {
    id: 'd10',
    name: 'Ribena Lychee Soda',
    category: 'Drinks',
    price: 5.00,
    description: 'Sweet blackcurrant Ribena syrup combined with carbonated soda fizz and real whole juicy tropical lychee fruits.',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=400',
    prepTime: '2-3 mins',
  }
];

let globalCart: CartItem[] = [];

export const getGlobalCart = (): CartItem[] => {
  return globalCart;
};

export const updateGlobalCart = (newCart: CartItem[]) => {
  globalCart = newCart;
};

export const CATEGORIES = ['All', 'Local Rice', 'Noodles', 'Roti', 'Sides', 'Drinks'];