-- DeFlo BOM Dashboard - Seed Data
-- Sample data for development and testing
-- Run this after running the initial schema migration

-- Note: This assumes you have at least one user created in Supabase Auth
-- Replace 'your-user-id-here' with an actual user UUID from auth.users

-- ============================================================================
-- SAMPLE BOM HIERARCHY - Automotive Hood Assembly
-- ============================================================================

-- Level 0: Vehicle (Root)
INSERT INTO bom_items (id, parent_id, part_number, part_name, description, level, sort_order, status)
VALUES
  ('00000000-0000-0000-0000-000000000001', NULL, 'VEH-001', 'Vehicle Assembly', 'Complete vehicle assembly', 0, 0, 'in_development');

-- Level 1: Major Assembly
INSERT INTO bom_items (id, parent_id, part_number, part_name, description, level, sort_order, supplier_name, supplier_code, status)
VALUES
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'HOOD-ASY-001', 'Hood Assembly', 'Complete hood assembly including inner and outer panels', 1, 10, NULL, NULL, 'in_development');

-- Level 2: Sub-assemblies
INSERT INTO bom_items (id, parent_id, part_number, part_name, description, level, sort_order, supplier_name, supplier_code, status)
VALUES
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'HOOD-OUT-001', 'Hood Outer', 'Outer panel of hood assembly', 2, 1, 'In-House', NULL, 'released'),
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'HOOD-INN-001', 'Hood Inner', 'Inner panel of hood assembly', 2, 2, 'In-House', NULL, 'in_development'),
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'HOOD-HNG-001', 'Hood Hinge Assembly', 'Left and right hood hinges', 2, 3, 'ABC Automotive', 'ABC-001', 'released');

-- Level 3: Components
INSERT INTO bom_items (id, parent_id, part_number, part_name, description, level, sort_order, supplier_name, supplier_code, status)
VALUES
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000004', 'HOOD-RNF-001', 'Hood Inner Reinforcement Bracket', 'Reinforcement bracket for hood inner', 3, 1, 'TUV US', 'TUV-001', 'in_development'),
  ('00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000005', 'HOOD-HNG-L-001', 'Hood Hinge Left', 'Left side hood hinge', 3, 1, 'ABC Automotive', 'ABC-001', 'released'),
  ('00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000005', 'HOOD-HNG-R-001', 'Hood Hinge Right', 'Right side hood hinge', 3, 2, 'ABC Automotive', 'ABC-001', 'released');

-- Level 4: Sub-components
INSERT INTO bom_items (id, parent_id, part_number, part_name, description, level, sort_order, supplier_name, supplier_code, status)
VALUES
  ('00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000006', 'S3300-12345', 'Bracket Mounting Plate', 'Steel mounting plate for reinforcement bracket', 4, 1, 'TUV US', 'TUV-001', 'in_development'),
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000006', 'S3301-12345', 'Bracket Support Beam', 'Support beam for reinforcement bracket', 4, 2, 'TUV US', 'TUV-001', 'in_development');

-- ============================================================================
-- BOM METRICS - Cost, Weight, Performance, Drawings
-- ============================================================================

-- Metrics for Hood Assembly
INSERT INTO bom_metrics (bom_item_id, cost_current, cost_target, cost_status, weight_current, weight_target, weight_status, performance_tests_total, performance_tests_met, performance_status, drawings_required, drawings_released, drawing_status)
VALUES
  ('00000000-0000-0000-0000-000000000002', 4300.00, 4250.00, 'warning', 29.8, 30.0, 'on_target', 50, 48, 'on_track', 8, 10, 'in_progress');

-- Metrics for Hood Outer
INSERT INTO bom_metrics (bom_item_id, cost_current, cost_target, cost_status, weight_current, weight_target, weight_status, performance_tests_total, performance_tests_met, performance_status, drawings_required, drawings_released, drawing_status)
VALUES
  ('00000000-0000-0000-0000-000000000003', 1900.00, 2000.00, 'on_target', 12.0, 12.5, 'on_target', 15, 15, 'on_track', 3, 3, 'complete');

-- Metrics for Hood Inner
INSERT INTO bom_metrics (bom_item_id, cost_current, cost_target, cost_status, weight_current, weight_target, weight_status, performance_tests_total, performance_tests_met, performance_status, drawings_required, drawings_released, drawing_status)
VALUES
  ('00000000-0000-0000-0000-000000000004', 2500.00, 2300.00, 'over_budget', 15.8, 15.0, 'over_weight', 20, 18, 'at_risk', 4, 2, 'in_progress');

-- Metrics for Hood Hinge Assembly
INSERT INTO bom_metrics (bom_item_id, cost_current, cost_target, cost_status, weight_current, weight_target, weight_status, performance_tests_total, performance_tests_met, performance_status, drawings_required, drawings_released, drawing_status)
VALUES
  ('00000000-0000-0000-0000-000000000005', 950.00, 1000.00, 'on_target', 1.8, 2.0, 'on_target', 10, 10, 'on_track', 2, 2, 'complete');

-- Metrics for Hood Inner Reinforcement Bracket
INSERT INTO bom_metrics (bom_item_id, cost_current, cost_target, cost_status, weight_current, weight_target, weight_status, performance_tests_total, performance_tests_met, performance_status, drawings_required, drawings_released, drawing_status)
VALUES
  ('00000000-0000-0000-0000-000000000006', 4.40, 4.50, 'on_target', 0.19, 0.20, 'on_target', 5, 4, 'at_risk', 1, 0, 'not_started');

-- Metrics for Bracket components
INSERT INTO bom_metrics (bom_item_id, cost_current, cost_target, cost_status, weight_current, weight_target, weight_status, performance_tests_total, performance_tests_met, performance_status, drawings_required, drawings_released, drawing_status)
VALUES
  ('00000000-0000-0000-0000-000000000009', 3.68, 3.70, 'on_target', 0.13, 0.14, 'on_target', 3, 3, 'on_track', 1, 1, 'complete'),
  ('00000000-0000-0000-0000-000000000010', 3.68, 3.70, 'on_target', 0.13, 0.14, 'on_target', 3, 2, 'at_risk', 1, 0, 'in_progress');

-- ============================================================================
-- ENGINEERING DATA LINKS - Mock Files
-- ============================================================================

-- 2D CAD Data for Hood Outer
INSERT INTO engineering_data_links (bom_item_id, data_type, data_category, file_name, file_url, file_type, file_size_mb, status, version)
VALUES
  ('00000000-0000-0000-0000-000000000003', '2d_cad', 'design', 'hood_outer_drawing.dwg', '/mock/2d/hood_outer.dwg', '.dwg', 2.4, 'approved', '2.0'),
  ('00000000-0000-0000-0000-000000000003', '3d_cad', 'design', 'hood_outer_model.step', '/mock/3d/hood_outer.step', '.step', 15.7, 'approved', '2.0');

-- Performance Data for Hood Outer
INSERT INTO engineering_data_links (bom_item_id, data_type, data_category, file_name, file_url, file_type, file_size_mb, status, version)
VALUES
  ('00000000-0000-0000-0000-000000000003', 'crash', 'performance', 'hood_crash_results.xlsx', '/mock/performance/hood_crash.xlsx', '.xlsx', 1.2, 'approved', '1.0'),
  ('00000000-0000-0000-0000-000000000003', 'pedestrian', 'performance', 'hood_pedestrian_test.pdf', '/mock/performance/hood_pedestrian.pdf', '.pdf', 3.5, 'approved', '1.0'),
  ('00000000-0000-0000-0000-000000000003', 'formability', 'performance', 'hood_formability_analysis.rst', '/mock/performance/hood_formability.rst', '.rst', 8.9, 'review', '1.0');

-- 2D/3D Data for Hood Inner
INSERT INTO engineering_data_links (bom_item_id, data_type, data_category, file_name, file_url, file_type, file_size_mb, status, version)
VALUES
  ('00000000-0000-0000-0000-000000000004', '2d_cad', 'design', 'hood_inner_drawing.dwg', '/mock/2d/hood_inner.dwg', '.dwg', 2.1, 'review', '1.5'),
  ('00000000-0000-0000-0000-000000000004', '3d_cad', 'design', 'hood_inner_model.step', '/mock/3d/hood_inner.step', '.step', 12.3, 'review', '1.5');

-- 2D Data for Reinforcement Bracket
INSERT INTO engineering_data_links (bom_item_id, data_type, data_category, file_name, file_url, file_type, file_size_mb, status, version)
VALUES
  ('00000000-0000-0000-0000-000000000006', '2d_cad', 'design', 'bracket_drawing.dwg', '/mock/2d/bracket.dwg', '.dwg', 0.8, 'draft', '1.0'),
  ('00000000-0000-0000-0000-000000000006', '3d_cad', 'design', 'bracket_model.step', '/mock/3d/bracket.step', '.step', 4.2, 'draft', '1.0');

-- ============================================================================
-- PERFORMANCE EVALUATIONS - Test Results
-- ============================================================================

-- Crash Safety Tests for Hood Outer
INSERT INTO performance_evaluations (bom_item_id, test_type, test_name, test_standard, test_status, test_date, test_score, requirement_met, target_value, actual_value, unit, notes)
VALUES
  ('00000000-0000-0000-0000-000000000003', 'crash_safety', 'Frontal Impact Test', 'FMVSS 208', 'passed', '2024-11-15', 95.5, true, 90.0, 95.5, 'score', 'Excellent performance in frontal crash'),
  ('00000000-0000-0000-0000-000000000003', 'crash_safety', 'Side Impact Test', 'FMVSS 214', 'passed', '2024-11-18', 92.0, true, 85.0, 92.0, 'score', 'Good side impact protection'),
  ('00000000-0000-0000-0000-000000000003', 'pedestrian_protection', 'Head Impact Test', 'Euro NCAP', 'passed', '2024-11-20', 88.5, true, 80.0, 88.5, 'score', 'Meets pedestrian safety requirements');

-- Durability Tests for Hood Assembly
INSERT INTO performance_evaluations (bom_item_id, test_type, test_name, test_standard, test_status, test_date, test_score, requirement_met, target_value, actual_value, unit, notes)
VALUES
  ('00000000-0000-0000-0000-000000000002', 'durability', 'Fatigue Cycle Test', 'Internal Standard', 'passed', '2024-11-10', 100.0, true, 100000.0, 125000.0, 'cycles', 'Exceeded target fatigue cycles'),
  ('00000000-0000-0000-0000-000000000002', 'durability', 'Corrosion Test', 'ASTM B117', 'passed', '2024-11-12', 95.0, true, 720.0, 850.0, 'hours', 'Good corrosion resistance');

-- Formability Tests for Hood Outer
INSERT INTO performance_evaluations (bom_item_id, test_type, test_name, test_standard, test_status, test_date, test_score, requirement_met, target_value, actual_value, unit, notes)
VALUES
  ('00000000-0000-0000-0000-000000000003', 'formability', 'Forming Limit Diagram', 'Internal Standard', 'passed', '2024-10-25', 90.0, true, 1.5, 1.62, 'FLD ratio', 'Good formability characteristics');

-- Pending tests for Hood Inner
INSERT INTO performance_evaluations (bom_item_id, test_type, test_name, test_standard, test_status, requirement_met, notes)
VALUES
  ('00000000-0000-0000-0000-000000000004', 'crash_safety', 'Frontal Impact Test', 'FMVSS 208', 'pending', false, 'Scheduled for December 2024'),
  ('00000000-0000-0000-0000-000000000004', 'formability', 'Forming Limit Diagram', 'Internal Standard', 'pending', false, 'Waiting for material samples');

-- ============================================================================
-- SEED DATA COMPLETE
-- ============================================================================

-- Note: To use this data, you'll need to:
-- 1. Create a user account in Supabase Auth
-- 2. Get the user's UUID from auth.users
-- 3. Update the created_by and uploaded_by fields if needed
-- 4. The profile will be auto-created via the trigger when you sign up
