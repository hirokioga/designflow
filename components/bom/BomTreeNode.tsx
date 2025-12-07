'use client'

import { useState } from 'react'
import { BomTreeNode as BomTreeNodeType } from '@/types/bom.types'
import { ChevronRight, ChevronDown, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BomStatusIndicator } from './BomStatusIndicator'
import { formatCurrency, formatWeight } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils'

interface BomTreeNodeProps {
  node: BomTreeNodeType
  depth?: number
}

export function BomTreeNode({ node, depth = 0 }: BomTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 2) // Auto-expand first 2 levels
  const hasChildren = node.children && node.children.length > 0

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'released':
        return 'text-green-600'
      case 'in_development':
        return 'text-yellow-600'
      case 'obsolete':
        return 'text-gray-600'
      default:
        return 'text-blue-600'
    }
  }

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors',
          depth > 0 && 'ml-' + (depth * 4)
        )}
        style={{ marginLeft: `${depth * 24}px` }}
        onClick={toggleExpand}
      >
        {/* Expand/Collapse Icon */}
        <div className="w-5 h-5 flex items-center justify-center">
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand()
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <div className="w-4" />
          )}
        </div>

        {/* Package Icon */}
        <Package className={cn('h-5 w-5', getStatusColor(node.status))} />

        {/* Part Info */}
        <div className="flex-1 flex items-center gap-4">
          <div className="min-w-[120px]">
            <p className="font-medium text-sm">{node.part_number}</p>
          </div>
          <div className="flex-1">
            <p className="text-sm">{node.part_name}</p>
            {node.supplier_name && (
              <p className="text-xs text-gray-500">{node.supplier_name}</p>
            )}
          </div>
        </div>

        {/* Metrics Summary */}
        {node.metrics && (
          <div className="flex items-center gap-4 text-sm">
            <div className="min-w-[100px]">
              <span className="text-gray-500">Cost: </span>
              <span className="font-medium">
                {formatCurrency(node.metrics.cost_current)}
              </span>
            </div>
            <div className="min-w-[80px]">
              <BomStatusIndicator status={node.metrics.cost_status} type="cost" />
            </div>
            <div className="min-w-[100px]">
              <span className="text-gray-500">Weight: </span>
              <span className="font-medium">
                {formatWeight(node.metrics.weight_current)}
              </span>
            </div>
            <div className="min-w-[80px]">
              <BomStatusIndicator status={node.metrics.weight_status} type="weight" />
            </div>
            <div className="min-w-[60px] text-center">
              <span className="font-medium">
                {node.metrics.performance_tests_met}/{node.metrics.performance_tests_total}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {node.children.map((child) => (
            <BomTreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
