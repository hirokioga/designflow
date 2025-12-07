import { BomItem } from '@/types/bom.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BomMetrics } from './BomMetrics'
import { BomStatusIndicator } from './BomStatusIndicator'

interface BomItemCardProps {
  item: BomItem
  showMetrics?: boolean
}

export function BomItemCard({ item, showMetrics = true }: BomItemCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'released':
        return 'bg-green-100 text-green-700'
      case 'in_development':
        return 'bg-yellow-100 text-yellow-700'
      case 'obsolete':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-blue-100 text-blue-700'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{item.part_name}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {item.part_number} • Rev {item.revision}
            </p>
          </div>
          <Badge className={getStatusColor(item.status)}>
            {item.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {item.description && (
          <p className="text-sm text-gray-600">{item.description}</p>
        )}

        {(item.supplier_name || item.supplier_code) && (
          <div className="text-sm">
            <p className="font-semibold">Supplier</p>
            <p className="text-gray-600">
              {item.supplier_name}
              {item.supplier_code && ` (${item.supplier_code})`}
            </p>
          </div>
        )}

        <div className="flex gap-2 text-sm">
          <Badge variant="outline">Level {item.level}</Badge>
          <Badge variant="outline">Sort {item.sort_order}</Badge>
        </div>

        {showMetrics && item.metrics && (
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3">Metrics</h4>
            <BomMetrics metrics={item.metrics} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
