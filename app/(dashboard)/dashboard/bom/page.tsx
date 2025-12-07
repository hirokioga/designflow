import { createClient } from '@/lib/supabase/server'
import { getAllBomItems, buildBomTree } from '@/lib/supabase/queries/bom'
import { BomTree } from '@/components/bom/BomTree'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function BomPage() {
  const supabase = await createClient()

  // Fetch all BOM items
  const bomItems = await getAllBomItems(supabase)

  // Build tree structure
  const bomTree = buildBomTree(bomItems)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">BOM Explorer</h1>
          <p className="text-gray-600 mt-1">
            View and manage your Bill of Materials hierarchy
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <BomTree nodes={bomTree} />
    </div>
  )
}
