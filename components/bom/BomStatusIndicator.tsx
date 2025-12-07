import { Badge } from '@/components/ui/badge'
import { MetricStatus, PerformanceStatus, DrawingStatus } from '@/types/bom.types'

interface StatusIndicatorProps {
  status: MetricStatus | PerformanceStatus | DrawingStatus | null
  type?: 'cost' | 'weight' | 'performance' | 'drawing'
}

export function BomStatusIndicator({ status, type }: StatusIndicatorProps) {
  if (!status) return <Badge variant="outline">-</Badge>

  const getVariant = () => {
    // Success states (green)
    if (status === 'on_target' || status === 'on_track' || status === 'complete') {
      return 'default' // Green
    }

    // Warning states (yellow)
    if (status === 'warning' || status === 'at_risk' || status === 'in_progress') {
      return 'secondary' // Yellow
    }

    // Error states (red)
    if (status === 'over_budget' || status === 'over_weight' || status === 'failing' || status === 'not_started') {
      return 'destructive' // Red
    }

    return 'outline'
  }

  const getLabel = () => {
    const labels: Record<string, string> = {
      on_target: 'On Target',
      warning: 'Warning',
      over_budget: 'Over Budget',
      over_weight: 'Over Weight',
      on_track: 'On Track',
      at_risk: 'At Risk',
      failing: 'Failing',
      complete: 'Complete',
      in_progress: 'In Progress',
      not_started: 'Not Started',
    }
    return labels[status] || status
  }

  const getClassName = () => {
    const variant = getVariant()

    if (variant === 'default') {
      return 'bg-green-100 text-green-700 hover:bg-green-200'
    }
    if (variant === 'secondary') {
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
    }
    if (variant === 'destructive') {
      return 'bg-red-100 text-red-700 hover:bg-red-200'
    }

    return ''
  }

  return (
    <Badge
      variant={getVariant()}
      className={getClassName()}
    >
      {getLabel()}
    </Badge>
  )
}
