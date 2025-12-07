'use client'

import { BomTreeNode as BomTreeNodeType } from '@/types/bom.types'
import { BomTreeNode } from './BomTreeNode'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BomTreeProps {
  nodes: BomTreeNodeType[]
  title?: string
}

export function BomTree({ nodes, title = 'Bill of Materials' }: BomTreeProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No BOM items found. Add your first BOM item to get started.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-4 text-sm text-gray-500 mt-2">
          <span>Part Number</span>
          <span className="flex-1">Part Name</span>
          <span>Cost</span>
          <span>Status</span>
          <span>Weight</span>
          <span>Status</span>
          <span>Tests</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {nodes.map((node) => (
            <BomTreeNode key={node.id} node={node} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
