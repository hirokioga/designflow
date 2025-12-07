-- DeFlo BOM Dashboard - Initial Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================
-- Extends Supabase auth.users with additional profile information
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'engineer' CHECK (role IN ('engineer', 'manager', 'admin')),
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- BOM ITEMS TABLE
-- ============================================================================
-- Hierarchical Bill of Materials structure
CREATE TABLE bom_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES bom_items(id) ON DELETE CASCADE,

  -- Part identification
  part_number TEXT UNIQUE NOT NULL,
  part_name TEXT NOT NULL,
  description TEXT,
  revision TEXT DEFAULT 'A',

  -- Hierarchy
  level INTEGER NOT NULL CHECK (level >= 0),
  sort_order INTEGER DEFAULT 0,

  -- Supplier info
  supplier_name TEXT,
  supplier_code TEXT,

  -- Status
  status TEXT DEFAULT 'in_development' CHECK (status IN ('in_development', 'released', 'obsolete')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Indexes for performance
CREATE INDEX idx_bom_items_parent_id ON bom_items(parent_id);
CREATE INDEX idx_bom_items_level ON bom_items(level);
CREATE INDEX idx_bom_items_part_number ON bom_items(part_number);
CREATE INDEX idx_bom_items_status ON bom_items(status);

-- ============================================================================
-- BOM METRICS TABLE
-- ============================================================================
-- Cost, weight, performance, and drawing metrics for each BOM item
CREATE TABLE bom_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bom_item_id UUID REFERENCES bom_items(id) ON DELETE CASCADE,

  -- Cost tracking
  cost_current DECIMAL(10, 2),
  cost_target DECIMAL(10, 2),
  cost_currency TEXT DEFAULT 'USD',
  cost_status TEXT CHECK (cost_status IN ('on_target', 'warning', 'over_budget')),

  -- Weight tracking
  weight_current DECIMAL(10, 3), -- in kg
  weight_target DECIMAL(10, 3),
  weight_unit TEXT DEFAULT 'kg',
  weight_status TEXT CHECK (weight_status IN ('on_target', 'warning', 'over_weight')),

  -- Performance tracking
  performance_tests_total INTEGER DEFAULT 0,
  performance_tests_met INTEGER DEFAULT 0,
  performance_status TEXT CHECK (performance_status IN ('on_track', 'at_risk', 'failing')),

  -- Drawing tracking
  drawings_required INTEGER DEFAULT 0,
  drawings_released INTEGER DEFAULT 0,
  drawing_status TEXT CHECK (drawing_status IN ('complete', 'in_progress', 'not_started')),

  -- Timestamps
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id),

  UNIQUE(bom_item_id)
);

CREATE INDEX idx_bom_metrics_bom_item_id ON bom_metrics(bom_item_id);

-- ============================================================================
-- ENGINEERING DATA LINKS TABLE
-- ============================================================================
-- Links to engineering files (2D CAD, 3D models, performance data, etc.)
CREATE TABLE engineering_data_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bom_item_id UUID REFERENCES bom_items(id) ON DELETE CASCADE,

  -- Data type
  data_type TEXT NOT NULL CHECK (data_type IN ('2d_cad', '3d_cad', 'crash', 'pedestrian', 'durability', 'formability')),
  data_category TEXT CHECK (data_category IN ('design', 'performance')),

  -- Mock file reference (in MVP, just metadata)
  file_name TEXT,
  file_url TEXT,
  file_type TEXT, -- '.dwg', '.step', '.xlsx', etc.
  file_size_mb DECIMAL(10, 2),

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved')),
  version TEXT DEFAULT '1.0',

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by UUID REFERENCES profiles(id)
);

CREATE INDEX idx_engineering_data_bom_item_id ON engineering_data_links(bom_item_id);
CREATE INDEX idx_engineering_data_type ON engineering_data_links(data_type);

-- ============================================================================
-- PERFORMANCE EVALUATIONS TABLE
-- ============================================================================
-- Detailed performance test data
CREATE TABLE performance_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bom_item_id UUID REFERENCES bom_items(id) ON DELETE CASCADE,

  -- Test identification
  test_type TEXT NOT NULL CHECK (test_type IN ('crash_safety', 'pedestrian_protection', 'durability', 'formability')),
  test_name TEXT NOT NULL,
  test_standard TEXT, -- e.g., 'FMVSS 208', 'Euro NCAP', etc.

  -- Test results
  test_status TEXT DEFAULT 'pending' CHECK (test_status IN ('pending', 'passed', 'failed', 'conditional')),
  test_date TIMESTAMP WITH TIME ZONE,
  test_score DECIMAL(5, 2), -- Percentage or rating

  -- Requirements
  requirement_met BOOLEAN DEFAULT false,
  target_value DECIMAL(10, 2),
  actual_value DECIMAL(10, 2),
  unit TEXT,

  -- Notes
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_performance_bom_item_id ON performance_evaluations(bom_item_id);
CREATE INDEX idx_performance_test_type ON performance_evaluations(test_type);

-- ============================================================================
-- ACTIVITY LOG TABLE
-- ============================================================================
-- Audit trail for all changes
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),

  -- Activity details
  action TEXT NOT NULL CHECK (action IN ('created', 'updated', 'deleted')),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('bom_item', 'metric', 'engineering_data', 'performance_evaluation')),
  entity_id UUID NOT NULL,

  -- Changes (JSON for flexibility)
  changes JSONB,

  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_log_entity ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_log_user ON activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bom_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bom_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE engineering_data_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, update only their own
CREATE POLICY "Profiles are viewable by authenticated users" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- BOM Items: Authenticated users can read all, create/update/delete based on auth
CREATE POLICY "BOM items are viewable by authenticated users" ON bom_items
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Engineers can create BOM items" ON bom_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Engineers can update BOM items" ON bom_items
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Engineers can delete BOM items" ON bom_items
  FOR DELETE USING (auth.role() = 'authenticated');

-- BOM Metrics: Same as BOM items
CREATE POLICY "BOM metrics are viewable by authenticated users" ON bom_metrics
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Engineers can create BOM metrics" ON bom_metrics
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Engineers can update BOM metrics" ON bom_metrics
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Engineers can delete BOM metrics" ON bom_metrics
  FOR DELETE USING (auth.role() = 'authenticated');

-- Engineering Data Links: Same as BOM items
CREATE POLICY "Engineering data are viewable by authenticated users" ON engineering_data_links
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Engineers can create engineering data" ON engineering_data_links
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Engineers can update engineering data" ON engineering_data_links
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Engineers can delete engineering data" ON engineering_data_links
  FOR DELETE USING (auth.role() = 'authenticated');

-- Performance Evaluations: Same as BOM items
CREATE POLICY "Performance evaluations are viewable by authenticated users" ON performance_evaluations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Engineers can create performance evaluations" ON performance_evaluations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Engineers can update performance evaluations" ON performance_evaluations
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Engineers can delete performance evaluations" ON performance_evaluations
  FOR DELETE USING (auth.role() = 'authenticated');

-- Activity Log: Read only, insert for logging
CREATE POLICY "Activity log is viewable by authenticated users" ON activity_log
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Activity log can be inserted by authenticated users" ON activity_log
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bom_items_updated_at BEFORE UPDATE ON bom_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bom_metrics_updated_at BEFORE UPDATE ON bom_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_engineering_data_links_updated_at BEFORE UPDATE ON engineering_data_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_performance_evaluations_updated_at BEFORE UPDATE ON performance_evaluations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- INITIAL SETUP COMPLETE
-- ============================================================================

COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE bom_items IS 'Hierarchical Bill of Materials structure';
COMMENT ON TABLE bom_metrics IS 'Cost, weight, performance metrics for BOM items';
COMMENT ON TABLE engineering_data_links IS 'Links to engineering files and data';
COMMENT ON TABLE performance_evaluations IS 'Detailed performance test results';
COMMENT ON TABLE activity_log IS 'Audit trail for all system changes';
