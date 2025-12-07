import { SupabaseClient } from '@supabase/supabase-js'
import { BomItem, BomTreeNode } from '@/types/bom.types'

/**
 * Fetch all BOM items with their metrics
 */
export async function getAllBomItems(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('bom_items')
    .select(`
      *,
      metrics:bom_metrics(*),
      engineering_data:engineering_data_links(*),
      performance_evaluations(*)
    `)
    .order('level', { ascending: true })
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching BOM items:', error)
    throw error
  }

  return data as BomItem[]
}

/**
 * Fetch BOM items by level
 */
export async function getBomItemsByLevel(supabase: SupabaseClient, level: number) {
  const { data, error } = await supabase
    .from('bom_items')
    .select(`
      *,
      metrics:bom_metrics(*)
    `)
    .eq('level', level)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching BOM items by level:', error)
    throw error
  }

  return data as BomItem[]
}

/**
 * Fetch a single BOM item by ID with all related data
 */
export async function getBomItemById(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from('bom_items')
    .select(`
      *,
      metrics:bom_metrics(*),
      engineering_data:engineering_data_links(*),
      performance_evaluations(*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching BOM item:', error)
    throw error
  }

  return data as BomItem
}

/**
 * Build hierarchical tree structure from flat BOM items
 */
export function buildBomTree(items: BomItem[]): BomTreeNode[] {
  // Create a map for quick lookup
  const itemMap = new Map<string, BomTreeNode>()

  // Initialize all items as tree nodes
  items.forEach(item => {
    itemMap.set(item.id, {
      ...item,
      children: [],
      expanded: false,
      depth: item.level
    })
  })

  // Build the tree
  const rootNodes: BomTreeNode[] = []

  items.forEach(item => {
    const node = itemMap.get(item.id)!

    if (item.parent_id === null) {
      // Root node
      rootNodes.push(node)
    } else {
      // Child node - add to parent
      const parent = itemMap.get(item.parent_id)
      if (parent) {
        parent.children.push(node)
      }
    }
  })

  return rootNodes
}

/**
 * Get children of a specific BOM item
 */
export async function getBomChildren(supabase: SupabaseClient, parentId: string) {
  const { data, error } = await supabase
    .from('bom_items')
    .select(`
      *,
      metrics:bom_metrics(*)
    `)
    .eq('parent_id', parentId)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching BOM children:', error)
    throw error
  }

  return data as BomItem[]
}

/**
 * Create a new BOM item
 */
export async function createBomItem(
  supabase: SupabaseClient,
  item: Partial<BomItem>
) {
  const { data, error } = await supabase
    .from('bom_items')
    .insert(item)
    .select()
    .single()

  if (error) {
    console.error('Error creating BOM item:', error)
    throw error
  }

  return data as BomItem
}

/**
 * Update a BOM item
 */
export async function updateBomItem(
  supabase: SupabaseClient,
  id: string,
  updates: Partial<BomItem>
) {
  const { data, error } = await supabase
    .from('bom_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating BOM item:', error)
    throw error
  }

  return data as BomItem
}

/**
 * Delete a BOM item (cascade deletes children)
 */
export async function deleteBomItem(supabase: SupabaseClient, id: string) {
  const { error } = await supabase
    .from('bom_items')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting BOM item:', error)
    throw error
  }
}

/**
 * Search BOM items by part number or name
 */
export async function searchBomItems(
  supabase: SupabaseClient,
  searchTerm: string
) {
  const { data, error } = await supabase
    .from('bom_items')
    .select(`
      *,
      metrics:bom_metrics(*)
    `)
    .or(`part_number.ilike.%${searchTerm}%,part_name.ilike.%${searchTerm}%`)
    .order('level', { ascending: true })

  if (error) {
    console.error('Error searching BOM items:', error)
    throw error
  }

  return data as BomItem[]
}
