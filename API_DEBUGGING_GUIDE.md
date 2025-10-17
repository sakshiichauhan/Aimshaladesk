# API Integration Debugging Guide

## Changes Made

### 1. Enhanced Error Handling in ManageThunk.ts
- Added comprehensive console logging with emojis for easy identification
- Added specific error type detection (Network errors, 401, 422, etc.)
- Improved error messages for better debugging

### 2. Fixed Accessibility Issues in Manage.tsx
- Removed invalid `aria-expanded` attributes from regular buttons
- Added proper `aria-label` attributes for buttons without text
- Added `aria-hidden="true"` to decorative icons

### 3. Enhanced Form Error Handling
- Added detailed console logs in both Draft and Publish handlers
- Added proper error state handling with `createAssessment.rejected.match()`
- Better toast notifications with specific error messages

### 4. Improved ConfirmModal Component
- Added React Portal rendering for proper z-index handling
- Added keyboard (ESC) support to close modal
- Added proper ARIA attributes for accessibility
- Prevents body scroll when modal is open

## How to Debug the API Issue

### Step 1: Open Browser DevTools
1. Press `F12` or `Right-click > Inspect`
2. Go to the **Console** tab
3. Clear all previous logs (click the 🚫 icon)

### Step 2: Try Creating an Assessment
1. Fill in the form with:
   - Assessment Name
   - Select at least one segment
   - Select a category
   - Enter price and offer price
2. Click "Publish"
3. Confirm in the popup

### Step 3: Check Console Logs
Look for the following logs in sequence:

#### ✅ Expected Successful Flow:
```
🚀 handleConfirmPublish - Starting assessment creation...
📝 Form Data:
  - Assessment Name: [name]
  - Category: [category] -> ID: [id]
  - Segment Leaves: [array of IDs]
  ... (more fields)
📦 Final API Payload: {...}
🔄 Dispatching createAssessment thunk...
✅ Token found, proceeding with API call
📤 Creating assessment with data: {...}
🔗 API Endpoint: /api/v1/services/assesment
✅ Create assessment SUCCESS - Response: {...}
📊 Response status: 200 or 201
🔄 Refreshing assessment list...
📨 Dispatch result: {...}
📊 Result type: assessment/createAssessment/fulfilled
✅ Assessment created successfully!
```

#### ❌ Common Error Patterns:

**1. Network Error:**
```
❌ Error creating assessment:
Error code: ERR_NETWORK
🌐 Network error - check if the server is running
```
**Solution:** 
- Check if the dev server is running (`npm run dev`)
- Verify the proxy configuration in `vite.config.ts`
- Check if `https://a.aimshala.com` is accessible

**2. Authentication Error:**
```
❌ No authentication token found in authState
```
OR
```
Response status: 401
🔒 Unauthorized - token might be invalid
```
**Solution:**
- Log out and log back in to get a fresh token
- Check localStorage for `authState`
- Verify the token hasn't expired

**3. Validation Error:**
```
Response status: 422
⚠️ Validation error: {...}
```
**Solution:**
- Check the API response for specific validation errors
- Ensure all required fields are filled
- Verify the data format matches what the API expects

**4. No Logs at All:**
If you don't see ANY logs when clicking Publish:
- Check if the button click is being triggered
- Check browser console for any JavaScript errors
- Verify the form isn't being prevented from submitting
- Check if there are any React errors in the console

### Step 4: Check Network Tab
1. In DevTools, go to the **Network** tab
2. Try creating an assessment again
3. Look for a request to `/api/v1/services/assesment`
4. Click on it to see:
   - **Headers**: Check if Authorization token is present
   - **Payload**: Verify the JSON data being sent
   - **Response**: See what the server returned

### Step 5: Compare with Postman
If it works in Postman but not in the app:

1. **Headers Comparison:**
   - Postman: Copy all headers
   - Browser Network tab: Check if the same headers are being sent
   - Especially check: `Authorization`, `Content-Type`, `Accept`

2. **Payload Comparison:**
   - Postman: Copy the request body
   - Browser Network tab: Copy the request payload
   - Use a JSON diff tool to compare them

3. **Token Verification:**
   - The token in Postman might be different from the one in localStorage
   - Try using the exact same token from Postman in your localStorage

## Common Issues and Solutions

### Issue 1: Empty segment_id Array
**Symptom:** API returns validation error about segments
**Check:** Look for the log `- Segment Leaves: []`
**Solution:** Ensure you're selecting segments in the SegmentStaticPicker

### Issue 2: Wrong Category ID
**Symptom:** API returns category not found
**Check:** Look for the log `- Category: [name] -> ID: [id]`
**Solution:** Verify the category ID exists in the database

### Issue 3: CORS Error
**Symptom:** Browser console shows CORS policy error
**Solution:** 
- Verify the proxy configuration in `vite.config.ts`
- For production, ensure the API server allows your origin

### Issue 4: Token Expired
**Symptom:** 401 Unauthorized error
**Solution:**
- Log out and log back in
- Check if the token has an expiration time
- Implement token refresh if needed

## Testing Checklist

- [ ] Console logs appear when clicking Publish/Draft
- [ ] Token is found in localStorage
- [ ] API request appears in Network tab
- [ ] Request payload matches Postman payload
- [ ] Authorization header is present
- [ ] Response status is 200/201 for success
- [ ] Error messages are displayed if API fails
- [ ] Assessment list refreshes after creation

## API Payload Reference

The expected payload format:
```json
{
  "assesment_name": "string",
  "segment_id": ["1", "2"],
  "assesment_category_id": "1",
  "price": "6499",
  "discounted_price": "2499",
  "gst_amount": "381.20",
  "gst_percentage": "18",
  "partner_share_std": "25",
  "partner_share_pre": "50",
  "status": 1
}
```

Note: All numeric values are sent as strings except `status`.

## Additional Debugging Commands

### Check localStorage Token:
```javascript
// Run in browser console
const authState = localStorage.getItem("authState");
console.log(JSON.parse(authState));
```

### Manually Test API Call:
```javascript
// Run in browser console
const authState = localStorage.getItem("authState");
const { token } = JSON.parse(authState);

fetch('/api/v1/services/assesment', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    assesment_name: "Test Assessment",
    segment_id: ["1"],
    assesment_category_id: "1",
    price: "100",
    discounted_price: "90",
    gst_amount: "13.73",
    gst_percentage: "18",
    partner_share_std: "20",
    partner_share_pre: "12",
    status: 1
  })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

## Next Steps

1. Run the application with the updated code
2. Open the browser console
3. Try creating an assessment
4. Share the console logs if the issue persists

The enhanced logging will help identify exactly where the issue is occurring.

