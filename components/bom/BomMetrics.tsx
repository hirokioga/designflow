import { BomMetrics as BomMetricsType } from '@/types/bom.types'
import { formatCurrency, formatWeight } from '@/lib/utils/formatters'
import { BomStatusIndicator } from './BomStatusIndicator'

interface BomMetricsProps {
  metrics: BomMetricsType
  compact?: boolean
}

export function BomMetrics({ metrics, compact = false }: BomMetricsProps) {
  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-500">Cost: </span>
          <span className="font-medium">
            {formatCurrency(metrics.cost_current)} / {formatCurrency(metrics.cost_target)}
          </span>
        </div>
        <div>
          <BomStatusIndicator status={metrics.cost_status} type="cost" />
        </div>
        <div>
          <span className="text-gray-500">Weight: </span>
          <span className="font-medium">
            {formatWeight(metrics.weight_current)} / {formatWeight(metrics.weight_target)}
          </span>
        </div>
        <div>
          <BomStatusIndicator status={metrics.weight_status} type="weight" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Cost Section */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm">Cost</h4>
          <BomStatusIndicator status={metrics.cost_status} type="cost" />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Current</p>
            <p className="font-medium">{formatCurrency(metrics.cost_current, metrics.cost_currency)}</p>
          </div>
          <div>
            <p className="text-gray-500">Target</p>
            <p className="font-medium">{formatCurrency(metrics.cost_target, metrics.cost_currency)}</p>
          </div>
        </div>
      </div>

      {/* Weight Section */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm">Weight</h4>
          <BomStatusIndicator status={metrics.weight_status} type="weight" />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Current</p>
            <p className="font-medium">{formatWeight(metrics.weight_current, metrics.weight_unit)}</p>
          </div>
          <div>
            <p className="text-gray-500">Target</p>
            <p className="font-medium">{formatWeight(metrics.weight_target, metrics.weight_unit)}</p>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm">Performance Tests</h4>
          <BomStatusIndicator status={metrics.performance_status} type="performance" />
        </div>
        <div className="text-sm">
          <p className="font-medium">
            {metrics.performance_tests_met} / {metrics.performance_tests_total} Passed
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${metrics.performance_tests_total > 0
                  ? (metrics.performance_tests_met / metrics.performance_tests_total) * 100
                  : 0}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Drawings Section */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm">Drawings</h4>
          <BomStatusIndicator status={metrics.drawing_status} type="drawing" />
        </div>
        <div className="text-sm">
          <p className="font-medium">
            {metrics.drawings_released} / {metrics.drawings_required} Released
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${metrics.drawings_required > 0
                  ? (metrics.drawings_released / metrics.drawings_required) * 100
                  : 0}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
