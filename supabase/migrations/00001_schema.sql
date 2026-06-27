-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  topic TEXT NOT NULL DEFAULT 'calculus',
  lesson_order INTEGER NOT NULL,
  is_free BOOLEAN NOT NULL DEFAULT false,
  lemon_variant_id TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published lessons"
  ON lessons FOR SELECT
  USING (published = true);

-- User lesson access (for paid lessons)
CREATE TABLE user_lesson_access (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, lesson_id)
);

ALTER TABLE user_lesson_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own access"
  ON user_lesson_access FOR SELECT
  USING (auth.uid() = user_id);

-- User progress tracking
CREATE TABLE user_progress (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  score FLOAT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, lesson_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Purchases table (for Lemon Squeezy)
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lemon_order_id TEXT UNIQUE,
  lemon_product_id TEXT,
  lemon_variant_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own purchases"
  ON purchases FOR SELECT
  USING (auth.uid() = user_id);

-- Seed data: 10 calculus lessons (3 free, 7 paid)
INSERT INTO lessons (slug, title, description, topic, lesson_order, is_free, lemon_variant_id) VALUES
  ('limits-intro', 'What is a Limit?', 'Explore the fundamental concept of limits through interactive graphs. Understand left and right-hand limits, and how functions behave near points.', 'calculus', 1, true, NULL),
  ('derivatives-intro', 'Introduction to Derivatives', 'Learn what derivatives represent and how to compute them from first principles. Interactive step-by-step derivative calculator included.', 'calculus', 2, true, NULL),
  ('integrals-intro', 'The Antiderivative & Basic Integrals', 'Discover the relationship between derivatives and integrals. Work through basic integration problems with interactive feedback.', 'calculus', 3, true, NULL),
  ('chain-rule', 'The Chain Rule', 'Master the chain rule for differentiating composite functions. Practice with progressively harder examples.', 'calculus', 4, false, 'paid-lessons-variant'),
  ('product-quotient', 'Product & Quotient Rules', 'Learn when and how to apply the product and quotient rules for derivatives.', 'calculus', 5, false, 'paid-lessons-variant'),
  ('u-substitution', 'U-Substitution', 'The integration equivalent of the chain rule. Learn to spot when u-substitution is needed and how to apply it.', 'calculus', 6, false, 'paid-lessons-variant'),
  ('integration-by-parts', 'Integration by Parts', 'Derived from the product rule, this technique helps integrate products of functions.', 'calculus', 7, false, 'paid-lessons-variant'),
  ('lhopitals-rule', 'L''Hôpital''s Rule', 'Evaluate tricky limits using derivatives. Learn when this rule applies and how to apply it correctly.', 'calculus', 8, false, 'paid-lessons-variant'),
  ('taylor-series', 'Taylor Series', 'Approximate any smooth function using polynomials. The foundation of many numerical methods.', 'calculus', 9, false, 'paid-lessons-variant'),
  ('differential-equations', 'Introduction to Differential Equations', 'Learn the basics of ODEs: separation of variables, first-order linear equations, and modeling real-world phenomena.', 'calculus', 10, false, 'paid-lessons-variant');
