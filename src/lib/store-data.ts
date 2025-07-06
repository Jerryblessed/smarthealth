export const storeItems = [
  {
    id: 'fitbit-charge-5',
    name: 'Fitbit Charge 5',
    description: 'Heart rate, steps, sleep & stress monitoring',
    price: 130,
    image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'fitness-tracker'
  },
  {
    id: 'omron-bp-monitor',
    name: 'Omron BP Monitor',
    description: 'Bluetooth-enabled blood pressure monitor',
    price: 80,
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'health-monitor'
  },
  {
    id: 'oura-ring-gen3',
    name: 'Oura Ring Gen 3',
    description: 'Sleep, HRV, body temp & recovery tracking',
    price: 299,
    image: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'wearable'
  },
  {
    id: 'xiaomi-mi-band-7',
    name: 'Xiaomi Mi Band 7',
    description: 'Budget fitness band with HR, SpO₂ & sleep tracking',
    price: 45,
    image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'fitness-tracker'
  },
  {
    id: 'upright-go-2',
    name: 'Upright Go 2',
    description: 'Wearable posture corrector',
    price: 75,
    image: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'wellness'
  },
  {
    id: 'withings-smart-scale',
    name: 'Withings Smart Scale',
    description: 'Weight, BMI, fat %, water %, sync with health apps',
    price: 100,
    image: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'health-monitor'
  },
  {
    id: 'hidratespark-pro',
    name: 'HidrateSpark Pro',
    description: 'Smart bottle reminding you to hydrate',
    price: 60,
    image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'wellness'
  },
  {
    id: 'kinsa-smart-thermometer',
    name: 'Kinsa Smart Thermometer',
    description: 'App-connected digital thermometer',
    price: 35,
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'health-monitor'
  }
]

export const subscriptionPlans = {
  free: {
    name: 'Free',
    price: 0,
    currency: '₦',
    features: ['Daily tips', 'Basic meal plan', 'No chat access']
  },
  tier1: {
    name: 'Pro',
    price: 3000,
    currency: '₦',
    features: ['Full meal plans', 'GPT-4o chat', 'BP estimator', 'Priority support']
  },
  tier2: {
    name: 'Pro+',
    price: 5000,
    currency: '₦',
    features: ['All Pro features', 'Voice GP responses', '10% off accessories', 'Premium support']
  }
}