# AIM Dashboard

A modern, feature-rich dashboard application built with React and typescript for managing various platform operations including sessions, assessments, team management, and more.

## Tech Stack

- **Frontend Framework**: React with Typescript using Vite.
- **Styling**: Tailwind CSS with custom theming support
- **UI Components**: Custom components built with Radix UI primitives and Shadcn.
- **Icons**: Lucide React
- **Date Handling**: Custom date picker and range components
- **State Management**: Redux Tool Kit with TS configuration
- **Routing**: React Router

## Features

- 🌓 Dark/Light mode support
- 📊 Interactive data tables with Pagination
- 📅 Session management with status tracking
- 👥 Team member management
- 📋 Assessment management
- 💰 Finance and payment tracking
- 📱 Responsive design

## Project Structure

```
aim-dashboard/
├── public/                    # Static public assets
│   ├── aimshala.png
│   └── vite.svg
├── src/
│   ├── assets/               # Static assets and images
│   │   ├── logos/           # Brand logos and assets
│   │   ├── Assignuser/      # User assignment images
│   │   └── TempVideo/       # Video assets
│   ├── auth/                # Authentication components
│   │   └── ProtectedRoute.tsx
│   ├── commons/             # Shared reusable components
│   │   └── CardButtons.tsx
│   ├── components/          # UI component library
│   │   ├── application-component/  # App-specific components
│   │   │   ├── CardComponent.tsx
│   │   │   ├── date-range-picker.tsx
│   │   │   ├── explorer-table.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── ui/              # Base UI components (Shadcn)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── table.tsx
│   │   │   └── [30+ other UI components]
│   │   ├── date-picker.tsx
│   │   ├── mode-toggle.tsx
│   │   └── theme-provider.tsx
│   ├── constants/           # Application constants
│   │   └── sidebarContents.ts
│   ├── data/               # Data models and mock data
│   │   └── Data.ts
│   ├── hooks/              # Custom React hooks
│   │   └── use-mobile.ts
│   ├── layout/             # Layout components
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── pages/              # Feature-based page components
│   │   ├── DevopsDesk/     # DevOps management pages
│   │   │   ├── Cases.tsx
│   │   │   ├── DevopsDesk.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── Mycases.tsx
│   │   ├── DigitalDesk/    # Digital content management
│   │   │   ├── CMS/        # Content Management System
│   │   │   ├── Engage/     # User engagement features
│   │   │   ├── Libraries/  # Educational content libraries
│   │   │   ├── Survey/     # Survey management
│   │   │   └── [other digital desk features]
│   │   ├── FinanceDesk/    # Financial management
│   │   │   ├── Commission.tsx
│   │   │   ├── Earning.tsx
│   │   │   ├── Payments.tsx
│   │   │   └── [other finance features]
│   │   ├── HRMS/          # Human Resource Management
│   │   │   ├── CurrenOpenings.tsx
│   │   │   ├── JobApplication.tsx
│   │   │   └── [other HR features]
│   │   ├── PlatformDesk/  # Platform administration
│   │   │   ├── Assessment/ # Assessment management
│   │   │   ├── Plans/     # Subscription plans
│   │   │   ├── Sessions/  # Session management
│   │   │   ├── SessionTables/ # Session data tables
│   │   │   ├── underDeskIAM/ # Identity & Access Management
│   │   │   └── [other platform features]
│   │   ├── RelationDesk/  # Relationship management
│   │   │   ├── Cases/     # Case management
│   │   │   ├── Components/ # Relation-specific components
│   │   │   ├── Leads/     # Lead management
│   │   │   ├── Organisation/ # Organization management
│   │   │   └── [other relation features]
│   │   ├── ReviewDesk/    # Review and approval workflows
│   │   │   ├── Pages/     # Review page components
│   │   │   ├── PoolTables/ # Review pool data tables
│   │   │   └── [other review features]
│   │   ├── Landing.tsx    # Landing page
│   │   └── Login.tsx      # Authentication page
│   ├── routes/            # Routing configuration
│   │   └── AppRoutes.tsx
│   ├── store/             # Redux state management
│   │   ├── slices/        # Redux slices by feature
│   │   │   ├── authSlice.ts
│   │   │   ├── devOpsDesk/
│   │   │   ├── digitalDesk/
│   │   │   ├── financeDesk/
│   │   │   ├── hrmsDesk/
│   │   │   ├── platformDesk/
│   │   │   ├── relationDesk/
│   │   │   └── reviewDesk/
│   │   ├── index.ts       # Store configuration
│   │   └── rootReducer.ts # Root reducer
│   ├── types/             # TypeScript type definitions
│   │   ├── sidebar.ts
│   │   └── types.ts
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── components.json        # Shadcn component configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

## Key Components

- **Session Management**: Complete session lifecycle management from creation to completion
- **Assessment System**: Comprehensive assessment creation and management
- **Team Management**: Role-based team member management with permissions
- **Finance Module**: Payment tracking and financial reporting
- **Digital Desk**: Content management and digital asset handling
- **Platform IAM**: Identity and Access Management system

## Getting Started

1. **Installation**

   ```bash
   cd client
   npm install
   ```

2. **Development**

   ```bash
   npm run dev
   ```

3. **Build**
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Component Library

The project uses a custom component library built with:

- Radix UI primitives
- Tailwind CSS
- Custom theming system

Key components include:

- Buttons
- Cards
- Tables
- Forms
- Modals
- Date pickers
-

## Theming

The application supports dynamic theming with:

- Light/Dark mode toggle
- Custom color variables
- Consistent styling across components
- Responsive design patterns

## API Integrations

The application uses **Redux Toolkit** with **createAsyncThunk** for comprehensive API integration and state management. All API logic is centralized in the `store` folder with a feature-based architecture.

### Store Architecture

```
src/store/
├── index.ts                 # Store configuration with Redux Toolkit
├── rootReducer.ts          # Combined reducers from all slices
└── slices/                 # Feature-based Redux slices
    ├── authSlice.ts        # Authentication & user management
    ├── devOpsDesk/         # DevOps operations (empty - placeholder)
    ├── digitalDesk/        # Digital content management (empty)
    ├── financeDesk/        # Financial operations (empty)
    ├── hrmsDesk/           # HR management (empty)
    ├── platformDesk/       # Core platform functionality
    │   ├── assessmentSlice.ts  # Assessment data management
    │   ├── questionSlice.ts    # Question bank management
    │   ├── categoriesThunk.ts  # Category CRUD operations
    │   ├── ManageThunk.ts      # Assessment management operations
    │   └── segmentThunk.ts     # Segment management
    ├── relationDesk/       # Customer relationship management (empty)
    └── reviewDesk/         # Review workflows (empty)
```

### API Integration Patterns

#### 1. **Authentication (authSlice.ts)**

- **Base URL**: `https://a.aimshala.com/api/admin/login`
- **Features**: Login, logout, token management, localStorage persistence
- **Token Expiry**: Automatic handling with 1-hour expiration

```typescript
// Usage Example
dispatch(loginUser({ email, password }));
```

#### 2. **Assessment Management (assessmentSlice.ts)**

- **Endpoints**:
  - `GET /api/assesment/attempted` - Fetch attempted assessments
  - Integration with categories, segments, and manage assessments
- **Features**: Data transformation, error handling, loading states

```typescript
// Usage Example
dispatch(fetchAssessments());
dispatch(fetchManageAssessments());
```

#### 3. **Question Management (questionSlice.ts)**

- **Endpoints**:
  - `GET /api/assesment/questions/{guid}` - Fetch questions by GUID
  - `POST /api/assesment/question-save` - Create new question
  - `PUT /api/assesment/question-update/{id}` - Update question
  - `DELETE /api/assesment/question-delete/{id}` - Delete question
- **Features**: CRUD operations, automatic list refresh after mutations

```typescript
// Usage Examples
dispatch(fetchQuestionsByGuid(guid));
dispatch(createQuestion(questionData));
dispatch(updateQuestion({ id, ...updateData }));
dispatch(deleteQuestion(id));
```

#### 4. **Category Management (categoriesThunk.ts)**

- **Endpoints**:
  - `GET /api/assesment/category` - Fetch categories
  - `POST /api/assesment/category-save` - Create category
  - `PUT /api/assesment/category-update/{id}` - Update category
  - `DELETE /api/assesment/category-delete/{id}` - Delete category
- **Features**: Robust data normalization, automatic refresh after mutations

#### 5. **Assessment Management (ManageThunk.ts)**

- **Endpoints**:
  - `GET /api/services/assesments` - Fetch manage assessments
  - `POST /api/services/assesment-save` - Create assessment
  - `PUT /api/services/assesments-update/{id}` - Update assessment
  - `DELETE /api/services/assesments-delete/{id}` - Delete assessment
- **Features**: Complex data transformation, segment handling

### API Configuration

#### Authentication Headers

All API calls include standardized headers:

```typescript
{
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

#### Error Handling

Consistent error handling across all thunks:

- **Token validation** before API calls
- **Response validation** and transformation
- **Standardized error messages** via `rejectWithValue`
- **Axios error handling** with status code checks

#### Loading States

Each slice manages loading states for:

- **Primary data loading** (e.g., `loading`)
- **Specific feature loading** (e.g., `categoriesLoading`, `segmentsLoading`)
- **Error states** for each feature separately

### Data Transformation

#### Assessment Data

- Transforms API response from `aceReportData[]` to normalized `Assessment[]`
- Handles payment details and user data extraction
- Converts timestamps and numeric values

#### Question Data

- Parses pipe-separated answers: `"Answer1 | Answer2 | Answer3"`
- Converts score strings to arrays for multi-choice scoring
- Determines correct answers based on highest scores

#### Category Data

- Robust normalization handling various API response formats
- Fallback ID assignment for items without proper IDs
- Flexible field mapping (`name`, `category`, `title`, `label`)

### State Management

#### Selectors

Comprehensive selectors for filtered data access:

```typescript
// Assessment selectors
selectAssessmentById(id);
selectAssessmentsByUserId(userId);
selectInProgressAssessments();
selectCompletedAssessments();
selectDirectAssessments();
selectPartnerAssessments();

// Question selectors
selectQuestions();
selectQuestionsLoading();
selectCurrentAssessmentGuid();
```

#### Local Storage Integration

- **Authentication state** persisted automatically
- **Token expiration** handling with cleanup
- **State restoration** on app initialization

### Usage in Components

```typescript
// In React components
import { useSelector, useDispatch } from 'react-redux'
import { fetchAssessments, selectAssessments } from '@/store/slices/platformDesk/assessmentSlice'

const MyComponent = () => {
  const dispatch = useDispatch()
  const assessments = useSelector(selectAssessments)
  const loading = useSelector(selectAssessmentLoading)

  useEffect(() => {
    dispatch(fetchAssessments())
  }, [dispatch])

  return (
    // Component JSX
  )
}
```


