/*
  # Initial SmartHealth Database Setup

  1. New Tables
    - `profiles` - User profiles with subscription tiers
    - `health_data` - User health information and symptoms
    - `meal_plans` - Custom meal plans for users
    - `chat_messages` - AI chat history
    - `bp_estimates` - Blood pressure estimates
    - `orders` - Purchase orders for subscriptions and accessories
    - `order_items` - Individual items in orders
    - `daily_tips` - Health tips content
    - `rides` - Ride sharing (if needed for future features)
    - `bookings` - Ride bookings

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for data access
    - Create triggers for automatic profile creation

  3. Functions
    - Auto-create profile on user signup
    - Update timestamp triggers
*/

-- Create update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  phone text,
  institution text,
  role text CHECK (role IN ('student', 'faculty', 'staff')),
  subscription_tier text CHECK (subscription_tier IN ('free', 'tier1', 'tier2')) DEFAULT 'free',
  vouchers integer DEFAULT 100,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create health_data table
CREATE TABLE IF NOT EXISTS health_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  age integer,
  work_type text CHECK (work_type IN ('sedentary', 'active', 'high_stress')),
  last_activity text DEFAULT '',
  mood text CHECK (mood IN ('excellent', 'good', 'fair', 'poor')),
  symptoms text[] DEFAULT '{}',
  lifestyle_habits text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create meal_plans table
CREATE TABLE IF NOT EXISTS meal_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  goal text CHECK (goal IN ('weight_loss', 'energy_boost', 'immune_support')) NOT NULL,
  dietary_preference text CHECK (dietary_preference IN ('vegan', 'keto', 'low_carb', 'balanced')) DEFAULT 'balanced',
  budget text CHECK (budget IN ('low', 'medium', 'high')) DEFAULT 'medium',
  meals jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  response text DEFAULT '',
  message_type text CHECK (message_type IN ('text', 'voice')) DEFAULT 'text',
  created_at timestamptz DEFAULT now()
);

-- Create bp_estimates table
CREATE TABLE IF NOT EXISTS bp_estimates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  systolic integer NOT NULL CHECK (systolic BETWEEN 70 AND 250),
  diastolic integer NOT NULL CHECK (diastolic BETWEEN 40 AND 150),
  age integer CHECK (age BETWEEN 1 AND 120),
  work_type text CHECK (work_type IN ('sedentary', 'active', 'high_stress')),
  activity_level text CHECK (activity_level IN ('low', 'moderate', 'high')),
  mood text CHECK (mood IN ('excellent', 'good', 'fair', 'poor')),
  stress_level integer CHECK (stress_level BETWEEN 1 AND 10),
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  subscription_tier text CHECK (subscription_tier IN ('tier1', 'tier2')),
  total_amount decimal(10,2) NOT NULL DEFAULT 0,
  discount_amount decimal(10,2) DEFAULT 0,
  paystack_reference text UNIQUE,
  status text CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  item_type text CHECK (item_type IN ('subscription', 'accessory')) NOT NULL,
  item_id text NOT NULL,
  item_name text NOT NULL,
  quantity integer DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  discounted_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create daily_tips table
CREATE TABLE IF NOT EXISTS daily_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text CHECK (category IN ('nutrition', 'exercise', 'mental_health', 'sleep', 'hydration', 'general')) DEFAULT 'general',
  target_audience text CHECK (target_audience IN ('all', 'free', 'tier1', 'tier2')) DEFAULT 'all',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create rides table (for future features)
CREATE TABLE IF NOT EXISTS rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  destination text NOT NULL,
  ride_date timestamptz NOT NULL,
  available_seats integer NOT NULL CHECK (available_seats >= 0),
  total_seats integer NOT NULL CHECK (total_seats > 0),
  car_name text NOT NULL,
  car_model text NOT NULL,
  license_plate text NOT NULL,
  base_price decimal(10,2) NOT NULL CHECK (base_price > 0),
  surge_multiplier decimal(3,2) DEFAULT 1.0 CHECK (surge_multiplier > 0),
  final_price decimal(10,2) NOT NULL CHECK (final_price > 0),
  status text CHECK (status IN ('active', 'full', 'completed', 'cancelled')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id uuid REFERENCES rides(id) ON DELETE CASCADE NOT NULL,
  rider_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status text CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  UNIQUE(ride_id, rider_id)
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bp_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can read other profiles" ON profiles FOR SELECT TO authenticated USING (true);

-- Health data policies
CREATE POLICY "Users can read own health data" ON health_data FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own health data" ON health_data FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own health data" ON health_data FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own health data" ON health_data FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Meal plans policies
CREATE POLICY "Users can read own meal plans" ON meal_plans FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own meal plans" ON meal_plans FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own meal plans" ON meal_plans FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own meal plans" ON meal_plans FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Users can read own chat messages" ON chat_messages FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chat messages" ON chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chat messages" ON chat_messages FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own chat messages" ON chat_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- BP estimates policies
CREATE POLICY "Users can read own BP estimates" ON bp_estimates FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own BP estimates" ON bp_estimates FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own BP estimates" ON bp_estimates FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own BP estimates" ON bp_estimates FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can read own orders" ON orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON orders FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can read own order items" ON order_items FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can insert own order items" ON order_items FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Daily tips policies
CREATE POLICY "Anyone can read active tips" ON daily_tips FOR SELECT TO authenticated USING (is_active = true);

-- Rides policies
CREATE POLICY "Anyone can read active rides" ON rides FOR SELECT TO authenticated USING ((status = 'active') OR (driver_id = auth.uid()));
CREATE POLICY "Users can create rides" ON rides FOR INSERT TO authenticated WITH CHECK (driver_id = auth.uid());
CREATE POLICY "Users can update own rides" ON rides FOR UPDATE TO authenticated USING (driver_id = auth.uid());
CREATE POLICY "Users can delete own rides" ON rides FOR DELETE TO authenticated USING (driver_id = auth.uid());

-- Bookings policies
CREATE POLICY "Users can read own bookings" ON bookings FOR SELECT TO authenticated USING (rider_id = auth.uid());
CREATE POLICY "Drivers can read ride bookings" ON bookings FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = bookings.ride_id AND rides.driver_id = auth.uid())
);
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT TO authenticated WITH CHECK (rider_id = auth.uid());
CREATE POLICY "Users can update own bookings" ON bookings FOR UPDATE TO authenticated USING (rider_id = auth.uid());
CREATE POLICY "Drivers can update ride bookings" ON bookings FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = bookings.ride_id AND rides.driver_id = auth.uid())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS health_data_user_id_idx ON health_data(user_id);
CREATE INDEX IF NOT EXISTS health_data_created_at_idx ON health_data(created_at DESC);
CREATE INDEX IF NOT EXISTS meal_plans_user_id_idx ON meal_plans(user_id);
CREATE INDEX IF NOT EXISTS meal_plans_created_at_idx ON meal_plans(created_at DESC);
CREATE INDEX IF NOT EXISTS meal_plans_goal_idx ON meal_plans(goal);
CREATE INDEX IF NOT EXISTS chat_messages_user_id_idx ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS chat_messages_created_at_idx ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS bp_estimates_user_id_idx ON bp_estimates(user_id);
CREATE INDEX IF NOT EXISTS bp_estimates_created_at_idx ON bp_estimates(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_paystack_reference_idx ON orders(paystack_reference);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);
CREATE INDEX IF NOT EXISTS order_items_item_type_idx ON order_items(item_type);
CREATE INDEX IF NOT EXISTS daily_tips_category_idx ON daily_tips(category);
CREATE INDEX IF NOT EXISTS daily_tips_active_idx ON daily_tips(is_active);
CREATE INDEX IF NOT EXISTS daily_tips_created_at_idx ON daily_tips(created_at DESC);

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rides_updated_at BEFORE UPDATE ON rides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, subscription_tier)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    'free'
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();