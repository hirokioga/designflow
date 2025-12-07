// BOM Item Types
export interface BomItem {
  id: string
  parent_id: string | null

  // Identification
  part_number: string
  part_name: string
  description: string | null
  revision: string

  // Hierarchy
  level: number
  sort_order: number

  // Supplier
  supplier_name: string | null
  supplier_code: string | null

  // Status
  status: 'in_development' | 'released' | 'obsolete'

  // Timestamps
  created_at: string
  updated_at: string
  created_by: string | null

  // Relations (loaded separately or joined)
  metrics?: BomMetrics
  children?: BomItem[]
  engineering_data?: EngineeringDataLink[]
  performance_evaluations?: PerformanceEvaluation[]
}

// BOM Metrics Types
export type MetricStatus = 'on_target' | 'warning' | 'over_budget' | 'over_weight'
export type PerformanceStatus = 'on_track' | 'at_risk' | 'failing'
export type DrawingStatus = 'complete' | 'in_progress' | 'not_started'

export interface BomMetrics {
  id: string
  bom_item_id: string

  // Cost
  cost_current: number | null
  cost_target: number | null
  cost_currency: string
  cost_status: MetricStatus | null

  // Weight
  weight_current: number | null
  weight_target: number | null
  weight_unit: string
  weight_status: MetricStatus | null

  // Performance
  performance_tests_total: number
  performance_tests_met: number
  performance_status: PerformanceStatus | null

  // Drawings
  drawings_required: number
  drawings_released: number
  drawing_status: DrawingStatus | null

  // Timestamps
  updated_at: string
  updated_by: string | null
}

// Engineering Data Types
export type EngineeringDataType =
  | '2d_cad'
  | '3d_cad'
  | 'crash'
  | 'pedestrian'
  | 'durability'
  | 'formability'

export interface EngineeringDataLink {
  id: string
  bom_item_id: string

  data_type: EngineeringDataType
  data_category: 'design' | 'performance'

  file_name: string | null
  file_url: string | null
  file_type: string | null
  file_size_mb: number | null

  status: 'draft' | 'review' | 'approved'
  version: string

  created_at: string
  updated_at: string
  uploaded_by: string | null
}

// Performance Evaluation Types
export type PerformanceTestType =
  | 'crash_safety'
  | 'pedestrian_protection'
  | 'durability'
  | 'formability'

export interface PerformanceEvaluation {
  id: string
  bom_item_id: string

  test_type: PerformanceTestType
  test_name: string
  test_standard: string | null

  test_status: 'pending' | 'passed' | 'failed' | 'conditional'
  test_date: string | null
  test_score: number | null

  requirement_met: boolean
  target_value: number | null
  actual_value: number | null
  unit: string | null

  notes: string | null

  created_at: string
  updated_at: string
}

// Tree Types
export interface BomTreeNode extends BomItem {
  children: BomTreeNode[]
  expanded?: boolean
  depth?: number
}

// Form Types
export interface BomItemFormData {
  parent_id: string | null
  part_number: string
  part_name: string
  description: string
  revision: string
  level: number
  supplier_name: string
  supplier_code: string
  status: BomItem['status']
}

export interface BomMetricsFormData {
  cost_current: number
  cost_target: number
  weight_current: number
  weight_target: number
  performance_tests_total: number
  performance_tests_met: number
  drawings_required: number
  drawings_released: number
}

// Helper type for BOM with metrics
export type BomItemWithMetrics = BomItem & {
  metrics: BomMetrics
}
