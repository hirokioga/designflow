import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">BOM Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage and track your automotive Bill of Materials
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Parts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-500 mt-1">
              Across all levels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cost Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-gray-500 mt-1">
              Current vs target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weight Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-gray-500 mt-1">
              Current vs target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Performance Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0/0</div>
            <p className="text-xs text-gray-500 mt-1">
              Passed / Total
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Follow these steps to set up your DeFlo BOM dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
              1
            </div>
            <div>
              <h3 className="font-medium">Set up Supabase Database</h3>
              <p className="text-sm text-gray-600 mt-1">
                Run the SQL migration file in your Supabase project: <code className="bg-gray-100 px-1 rounded">supabase/migrations/001_initial_schema.sql</code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
              2
            </div>
            <div>
              <h3 className="font-medium">Update Environment Variables</h3>
              <p className="text-sm text-gray-600 mt-1">
                Add your Supabase credentials to <code className="bg-gray-100 px-1 rounded">.env.local</code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
              3
            </div>
            <div>
              <h3 className="font-medium">Seed Sample Data (Optional)</h3>
              <p className="text-sm text-gray-600 mt-1">
                Load sample automotive BOM data by running: <code className="bg-gray-100 px-1 rounded">supabase/seed.sql</code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
              4
            </div>
            <div>
              <h3 className="font-medium">Start Managing Your BOM</h3>
              <p className="text-sm text-gray-600 mt-1">
                Navigate to BOM Explorer to view and manage your parts hierarchy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
