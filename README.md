# DeFlo - Automotive BOM Dashboard

A Bill of Materials (BOM) management system for automotive engineers, built with Next.js, TypeScript, and Supabase.

## Features

- **Hierarchical BOM Management**: Manage multi-level BOM structures (Vehicle → Assembly → Sub-assembly → Components)
- **Metrics Tracking**: Track cost, weight, performance tests, and drawing releases
- **Engineering Data Links**: Link 2D CAD, 3D models, and performance evaluation data
- **User Authentication**: Secure login/signup with Supabase Auth
- **Real-time Updates**: Built on Supabase for real-time data synchronization
- **Status Indicators**: Color-coded metrics (on target, warning, over budget)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works great)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd /Users/hirokiogasawara/Desktop/designflow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Supabase**:

   a. Create a new project at [supabase.com](https://supabase.com)

   b. Get your API credentials from Project Settings → API:
      - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
      - `anon/public key` (NEXT_PUBLIC_SUPABASE_ANON_KEY)

   c. Update `.env.local` with your credentials:
      ```bash
      NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
      NEXT_PUBLIC_APP_URL=http://localhost:3000
      ```

4. **Run database migrations**:

   a. Go to your Supabase project dashboard

   b. Navigate to SQL Editor

   c. Copy and paste the entire contents of `supabase/migrations/001_initial_schema.sql`

   d. Click "Run" to create all tables, indexes, and policies

5. **Seed sample data** (optional but recommended):

   a. In the Supabase SQL Editor, copy and paste the contents of `supabase/seed.sql`

   b. Click "Run" to load sample automotive BOM data (Hood Assembly example)

6. **Start the development server**:
   ```bash
   npm run dev
   ```

7. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
designflow/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── auth/callback/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── dashboard/       # Main dashboard
│   │   └── layout.tsx       # Dashboard layout
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page (redirects)
│
├── components/
│   ├── bom/                 # BOM components (to be built)
│   ├── engineering/         # Engineering data components (to be built)
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/                  # shadcn/ui components
│
├── lib/
│   ├── supabase/            # Supabase clients
│   │   ├── client.ts        # Browser client
│   │   └── server.ts        # Server client
│   ├── utils/               # Utility functions
│   │   └── formatters.ts    # Number/currency formatters
│   └── utils.ts             # shadcn utils
│
├── types/
│   └── bom.types.ts         # TypeScript type definitions
│
├── supabase/
│   ├── migrations/          # Database schema
│   │   └── 001_initial_schema.sql
│   └── seed.sql             # Sample data
│
├── middleware.ts            # Route protection
└── .env.local               # Environment variables (create this)
```

## Usage

### Creating Your First Account

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Click "Sign up" to create an account
3. Enter your email, password, and full name
4. You'll be automatically logged in and redirected to the dashboard

### Viewing BOM Data

If you loaded the seed data, you'll see a sample Hood Assembly with:
- Multiple levels (Level 1-4)
- Cost and weight metrics
- Performance test data
- Engineering data links (mock files)

### Next Steps for Development

The foundation is now complete! Here are the next features to implement:

1. **BOM Tree Component** - Display hierarchical BOM structure
2. **CRUD Operations** - Add/edit/delete BOM items
3. **Metrics Display** - Show color-coded status indicators
4. **Engineering Data Viewer** - Display linked engineering files
5. **Search & Filtering** - Filter by part number, status, level

## Database Schema

### Core Tables

- **profiles** - User profiles (extends Supabase auth.users)
- **bom_items** - Hierarchical BOM structure (self-referencing)
- **bom_metrics** - Cost, weight, performance, drawing metrics
- **engineering_data_links** - Links to CAD files, test data
- **performance_evaluations** - Detailed performance test results
- **activity_log** - Audit trail for all changes

### Key Relationships

- BOM items have a parent-child hierarchy via `parent_id`
- Each BOM item has one metrics record (1:1)
- Each BOM item can have multiple engineering data links (1:many)
- Each BOM item can have multiple performance evaluations (1:many)

## Environment Variables

Required variables in `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=         # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Your Supabase anon/public key

# App
NEXT_PUBLIC_APP_URL=              # http://localhost:3000 for development
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Security

- Row Level Security (RLS) is enabled on all tables
- Users can only access data when authenticated
- Passwords are hashed by Supabase Auth
- API keys are kept in environment variables (never committed)

## Future Enhancements

- Multi-project support (multiple vehicles)
- Real file uploads (Supabase Storage)
- Collaboration features (comments, @mentions)
- Export to Excel/PDF
- Advanced analytics and reporting
- Real-time collaboration (Supabase Realtime)
- Notifications and alerts

## Troubleshooting

### "Database connection failed"

- Check that your Supabase credentials in `.env.local` are correct
- Verify your Supabase project is active
- Ensure you've run the migration SQL

### "Auth redirect error"

- Verify `NEXT_PUBLIC_APP_URL` matches your current URL
- Check that the auth callback route exists at `/auth/callback`

### "No BOM data showing"

- Run the seed SQL file to load sample data
- Check the browser console for errors
- Verify RLS policies are configured correctly

## Contributing

This is an MVP project. Future contributions could include:
- Additional BOM tree features
- Advanced filtering and search
- Data visualization charts
- Mobile responsive improvements

## License

MIT

## Support

For issues or questions:
1. Check the Supabase dashboard for database errors
2. Review browser console for client-side errors
3. Check Next.js server logs for server-side errors

---

Built with Next.js, TypeScript, Supabase, and Tailwind CSS.
