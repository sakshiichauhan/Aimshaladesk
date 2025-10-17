# Category API Integration - Testing Guide

## Prerequisites
1. Ensure the development server is running: `npm run dev`
2. Make sure you're logged in to the application
3. Navigate to Platform Desk > Assessments > Select an Assessment > Questions

## Testing Steps

### 1. Open Category Popup
**Action**: Click the "Categories" button in the top bar
**Expected Result**: 
- Category popup slides in from the right
- Existing categories are loaded and displayed
- Search bar is visible
- "Add Category" button is visible

### 2. Test GET - Fetch Categories
**Action**: Categories should auto-load when popup opens
**Expected Result**:
- List of categories is displayed
- Each category shows its name
- No error messages

**API Call**:
```
GET /api/v1/assesment/question-category
Authorization: Bearer {token}
```

### 3. Test POST - Create New Category

#### Valid Category Creation
**Action**: 
1. Click "Add Category" button
2. Enter a unique category name (e.g., "JavaScript Basics")
3. Click "Add Category" button in the form

**Expected Result**:
- Toast notification: "Category added successfully"
- Form closes automatically
- New category appears in the list
- Category list refreshes

**API Call**:
```
POST /api/v1/assesment/question-category
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "JavaScript Basics",
  "status": 1,
  "service_assesment_id": 1
}
```

#### Duplicate Category Validation
**Action**: 
1. Click "Add Category" button
2. Enter an existing category name
3. Try to submit

**Expected Result**:
- Error message appears below input: "Category already exists"
- "Add Category" button is disabled
- Toast notification: "Category already exists" (if submitted)

#### Empty Category Validation
**Action**: 
1. Click "Add Category" button
2. Leave input empty or enter only spaces
3. Try to submit

**Expected Result**:
- "Add Category" button is disabled
- Form cannot be submitted

### 4. Test PUT - Update Category

#### Update Category Name
**Action**: 
1. Select a category by clicking its checkbox
2. Click the edit icon (pencil) that appears
3. Change the category name
4. Click "Update" button

**Expected Result**:
- Toast notification: "Category updated successfully"
- Edit form closes
- Category name is updated in the list
- Category list refreshes

**API Call**:
```
PUT /api/v1/assesment/question-category/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Category Name",
  "status": 1,
  "service_assesment_id": 1
}
```

#### Update Category Status
**Action**: 
1. Select a category and click edit
2. Toggle the status switch (Active/Inactive)
3. Click "Update" button

**Expected Result**:
- Toast notification: "Category updated successfully"
- Category status is updated
- Category list refreshes

**API Call**:
```
PUT /api/v1/assesment/question-category/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Category Name",
  "status": 0,  // 0 = Inactive, 1 = Active
  "service_assesment_id": 1
}
```

#### Cancel Edit
**Action**: 
1. Select a category and click edit
2. Make some changes
3. Click "Cancel" button

**Expected Result**:
- Edit form closes
- No changes are saved
- No API call is made

### 5. Test DELETE - Delete Category

#### Successful Deletion
**Action**: 
1. Select a category by clicking its checkbox
2. Click the delete icon (trash)
3. Confirm deletion in the confirmation dialog

**Expected Result**:
- Confirmation dialog appears with message
- After confirmation:
  - Toast notification: "Category deleted successfully"
  - Category is removed from the list
  - If category was selected, it's removed from selected categories
  - Category list refreshes

**API Call**:
```
DELETE /api/v1/assesment/question-category/{id}
Authorization: Bearer {token}
```

#### Cancel Deletion
**Action**: 
1. Select a category and click delete
2. Click "Cancel" in the confirmation dialog

**Expected Result**:
- Confirmation dialog closes
- Category is not deleted
- No API call is made

### 6. Test Search & Filter

#### Search Categories
**Action**: 
1. Enter text in the search bar (e.g., "Java")
2. Observe the category list

**Expected Result**:
- List filters in real-time
- Only categories containing "Java" are shown
- Search is case-insensitive

#### Empty Search Results
**Action**: 
1. Enter text that doesn't match any category
2. Observe the category list

**Expected Result**:
- "No categories found" message is displayed
- "Try adjusting your search" helper text is shown
- Search icon is displayed

#### Clear Search
**Action**: 
1. Clear the search input
2. Observe the category list

**Expected Result**:
- All categories are displayed again

### 7. Test Category Selection

#### Select Individual Categories
**Action**: 
1. Click checkboxes next to individual categories
2. Observe the selected state

**Expected Result**:
- Selected categories have highlighted background
- Edit and delete icons appear for selected categories
- Badge changes style for selected categories

#### Select All Categories
**Action**: 
1. Click "All Categories" checkbox
2. Observe the selection state

**Expected Result**:
- All individual selections are cleared
- "All Categories" is highlighted
- Edit and delete icons disappear

### 8. Test Error Handling

#### Network Error
**Action**: 
1. Disconnect internet or stop the backend server
2. Try to create/update/delete a category

**Expected Result**:
- Toast notification with error message
- User-friendly error message is displayed
- Error is logged to console

#### Authentication Error
**Action**: 
1. Clear localStorage or use invalid token
2. Try to perform any CRUD operation

**Expected Result**:
- Toast notification: "No authentication token found" or similar
- Operation fails gracefully

#### Server Error (500)
**Action**: 
1. Trigger a server error (if possible)
2. Observe the error handling

**Expected Result**:
- Toast notification with server error message
- Error is logged to console

### 9. Test UI/UX

#### Popup Overlay
**Action**: Click outside the popup (on the dark overlay)
**Expected Result**: Popup closes

#### Popup Animation
**Action**: Open and close the popup multiple times
**Expected Result**: Smooth slide-in/slide-out animation

#### Form Submission via Enter Key
**Action**: 
1. Open add category form
2. Type a category name
3. Press Enter key

**Expected Result**: Category is created (same as clicking button)

#### Loading States
**Action**: Observe the UI during API calls
**Expected Result**: 
- Loading indicators are shown (if implemented)
- Buttons may show loading state
- UI is responsive

## Edge Cases to Test

1. **Very Long Category Names**: Enter 100+ character name
2. **Special Characters**: Enter categories with emojis, symbols
3. **Leading/Trailing Spaces**: Enter "  Test  " and verify trimming
4. **Rapid Clicks**: Click Add/Update/Delete rapidly
5. **Multiple Popup Opens**: Open and close popup multiple times
6. **Concurrent Operations**: Try to edit and delete simultaneously

## API Response Validation

### Success Response Structure
```json
{
  "data": [
    {
      "id": 1,
      "title": "Category Name",
      "status": 1,
      "service_assesment_id": 1,
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": null,
  "prev_cursor": null,
  "has_more": false
}
```

### Error Response Structure
```json
{
  "message": "Error message here",
  "error": "Error details"
}
```

## Browser DevTools Checklist

### Network Tab
- [ ] Verify correct API endpoints are called
- [ ] Check request headers (Authorization token)
- [ ] Validate request payloads
- [ ] Verify response status codes (200, 201, 204, etc.)
- [ ] Check response data structure

### Console
- [ ] No console errors (except expected/handled ones)
- [ ] Error messages are logged with context
- [ ] No memory leaks or warnings

### Redux DevTools
- [ ] Check state updates after each operation
- [ ] Verify loading states
- [ ] Validate error states
- [ ] Ensure categories array is properly updated

## Performance Checks
- [ ] Popup opens quickly (<500ms)
- [ ] List updates immediately after operations
- [ ] Search is responsive (no lag)
- [ ] No unnecessary re-renders

## Accessibility Checks
- [ ] Keyboard navigation works
- [ ] Screen reader announcements (if applicable)
- [ ] Focus management is correct
- [ ] Color contrast is sufficient

## Browser Compatibility
Test on:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Common Issues & Solutions

### Categories Not Loading
**Solution**: 
- Check network tab for 401/403 errors
- Verify authentication token in localStorage
- Check proxy configuration in vite.config.ts

### Duplicate Category Not Detected
**Solution**: 
- Check case-sensitivity in comparison
- Verify trim() is applied to input

### Toast Not Showing
**Solution**: 
- Verify Toaster component is in main.tsx
- Check sonner import in Question.tsx

### Edit/Delete Icons Not Appearing
**Solution**: 
- Select a category first (click checkbox)
- Icons only appear for selected categories

## Success Criteria
✅ All CRUD operations work correctly  
✅ Proper error handling with user feedback  
✅ Toast notifications appear for all operations  
✅ UI is responsive and animations are smooth  
✅ No console errors  
✅ Redux state updates correctly  
✅ API calls use correct endpoints and data format  
✅ Authentication is handled properly  
✅ Search and filter work as expected  

