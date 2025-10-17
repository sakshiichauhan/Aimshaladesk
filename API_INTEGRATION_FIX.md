# API Integration Fix - Questions & Categories

## Issues Fixed

### 1. **Selector Mismatch**
**Problem:** `Question.tsx` was importing category actions from `QuestionCategory.ts` but using the selector from `assessmentSlice.ts`, causing data inconsistencies.

**Fix:** Updated to use `selectQuestionCategories` from `QuestionCategory.ts` consistently.

### 2. **Invalid API Response Structure Error**
**Problem:** The question API was expecting a specific response structure but the actual API might return different formats.

**Fix:** Made the response handling more robust in `questionSlice.ts` to handle multiple response structures:
- Direct array response
- Response with `data` property
- Response with `success` flag and `data` array

### 3. **Hardcoded Categories**
**Problem:** The QuestionForm component had hardcoded category options instead of using dynamic categories from the API.

**Fix:** 
- Added `categories` from Redux store to QuestionForm
- Fetches categories on component mount
- Uses dynamic categories with IDs instead of hardcoded names
- Updates the `createQuestion` call to use the selected category ID

## Changes Made

### `src/pages/PlatformDesk/Assessment/Question.tsx`

1. **Updated imports:**
   ```typescript
   // Changed from:
   import { selectCategories } from "@/store/slices/platformDesk/assessmentSlice";
   
   // To:
   import { selectQuestionCategories } from "@/store/slices/platformDesk/QuestionCategory";
   ```

2. **Updated CategoryPopup component:**
   ```typescript
   const categories = useSelector(selectQuestionCategories);
   ```

3. **Updated QuestionForm component:**
   - Added categories from Redux store
   - Added useEffect to fetch categories on mount
   - Changed category dropdown to use dynamic categories with IDs
   - Updated createQuestion to use `Number(qCategory)` for category ID

### `src/store/slices/platformDesk/questionSlice.ts`

1. **Improved API response handling:**
   ```typescript
   // Handle different response structures
   let dataArray: ApiQuestionResponse[] = [];
   
   if (Array.isArray(response.data)) {
     dataArray = response.data;
   } else if (response.data && Array.isArray(response.data.data)) {
     dataArray = response.data.data;
   } else if (response.data && response.data.success !== false && Array.isArray(response.data.data)) {
     dataArray = response.data.data;
   } else {
     console.error("Invalid API response structure:", response.data);
     return { questions: [], guid };
   }
   ```

### `src/store/rootReducer.ts`

Already properly configured with:
```typescript
questionCategory: questionCategoryReducer,
```

## How It Works Now

### Question Categories Flow:

1. **Fetching Categories:**
   ```typescript
   dispatch(fetchCategories())
   ```
   - Calls `/api/v1/assesment/question-category`
   - Returns array of `{ id: number, name: string }`
   - Stored in `state.questionCategory.categories`

2. **Creating Categories:**
   ```typescript
   dispatch(saveCategory({ 
     title: "New Category", 
     status: 1, 
     service_assesment_id: 1 
   }))
   ```
   - Creates new category
   - Automatically refreshes the category list

3. **Updating Categories:**
   ```typescript
   dispatch(updateCategory({ 
     id: 123, 
     title: "Updated Name", 
     status: 1 
   }))
   ```

4. **Deleting Categories:**
   ```typescript
   dispatch(deleteCategory(categoryId))
   ```

### Questions Flow:

1. **Fetching Questions:**
   ```typescript
   dispatch(fetchQuestionsByGuid(guid))
   ```
   - Calls `/api/v1/assesment/question`
   - Handles multiple response structures
   - Transforms data to component format

2. **Creating Questions:**
   ```typescript
   dispatch(createQuestion({
     assessment_question_category_id: 1,
     qualification_id: 1,
     title: "Question text",
     answers: ["Option 1", "Option 2", ...],
     correct_answer: "Option 1",
     added_by: userId,
     status: 1
   }))
   ```
   - Creates new question
   - Automatically refreshes the question list

3. **Deleting Questions:**
   ```typescript
   dispatch(deleteQuestion(questionId))
   ```

## API Endpoints

All endpoints use Bearer token authentication from localStorage:

### Questions:
- **GET** `/api/v1/assesment/question` - Fetch all questions
- **POST** `/api/v1/assesment/question` - Create question
- **PUT** `/api/v1/assesment/question/{id}` - Update question
- **DELETE** `/api/v1/assesment/question/{id}` - Delete question

### Categories:
- **GET** `/api/v1/assesment/question-category` - Fetch all categories
- **POST** `/api/v1/assesment/question-category` - Create category
- **PUT** `/api/v1/assesment/question-category/{id}` - Update category
- **DELETE** `/api/v1/assesment/question-category/{id}` - Delete category

## Redux State Structure

```typescript
{
  questions: {
    questions: Question[],
    loading: boolean,
    error: string | null,
    currentAssessmentGuid: string | null
  },
  questionCategory: {
    categories: Category[],
    loading: boolean,
    error: string | null
  }
}
```

## Testing Checklist

- [ ] Categories load correctly on page mount
- [ ] Can create new categories
- [ ] Can update existing categories
- [ ] Can delete categories
- [ ] Questions load with correct category names
- [ ] Can create questions with selected category
- [ ] Can delete questions
- [ ] Categories in dropdown are populated from API
- [ ] No console errors about "Invalid API response structure"

## Notes

- The `updateQuestion` import is added but not yet used - ready for edit functionality implementation
- All API calls automatically refresh the list after successful operations
- Error handling is in place for all operations
- Categories are fetched from the dedicated question category endpoint, not from the assessment categories

