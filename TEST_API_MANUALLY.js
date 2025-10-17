/**
 * Manual API Test Script
 * 
 * HOW TO USE:
 * 1. Open your application in the browser
 * 2. Open Browser Console (F12 > Console tab)
 * 3. Copy and paste this entire script
 * 4. Press Enter
 * 5. Check the console output
 */

console.log("🧪 Starting Manual API Test...");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// Step 1: Check if auth token exists
console.log("\n📋 Step 1: Checking Authentication Token...");
const authState = localStorage.getItem("authState");

if (!authState) {
  console.error("❌ FAIL: No authState found in localStorage");
  console.log("💡 Solution: Log in to the application first");
  throw new Error("Authentication required");
}

console.log("✅ authState found in localStorage");

let token;
try {
  const parsed = JSON.parse(authState);
  token = parsed.token;
  
  if (!token) {
    console.error("❌ FAIL: No token found in authState");
    console.log("💡 Solution: Log out and log back in");
    throw new Error("Token missing");
  }
  
  console.log("✅ Token extracted successfully");
  console.log("Token preview:", token.substring(0, 20) + "...");
} catch (error) {
  console.error("❌ FAIL: Error parsing authState:", error);
  throw error;
}

// Step 2: Prepare test data
console.log("\n📋 Step 2: Preparing Test Data...");
const testAssessmentData = {
  assesment_name: "Test Assessment " + new Date().getTime(),
  segment_id: ["1", "2"],
  assesment_category_id: "1",
  price: "1000",
  discounted_price: "800",
  gst_amount: "122.03",
  gst_percentage: "18",
  partner_share_std: "20",
  partner_share_pre: "12",
  status: 1
};

console.log("✅ Test data prepared:");
console.log(JSON.stringify(testAssessmentData, null, 2));

// Step 3: Make API request
console.log("\n📋 Step 3: Making API Request...");
console.log("🔗 Endpoint: /api/v1/services/assesment");
console.log("📤 Method: POST");

fetch('/api/v1/services/assesment', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify(testAssessmentData)
})
.then(async response => {
  console.log("\n📋 Step 4: Analyzing Response...");
  console.log("📊 Response Status:", response.status);
  console.log("📊 Response Status Text:", response.statusText);
  console.log("📊 Response OK:", response.ok);
  
  // Get response headers
  const headers = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  console.log("📊 Response Headers:", headers);
  
  // Try to parse response
  const contentType = response.headers.get("content-type");
  let data;
  
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  
  console.log("📊 Response Data:", data);
  
  // Analyze result
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  if (response.ok) {
    console.log("✅ SUCCESS: API call completed successfully!");
    console.log("✅ Assessment should be created");
    console.log("\n💡 What this means:");
    console.log("   - Your token is valid");
    console.log("   - The API endpoint is accessible");
    console.log("   - The data format is correct");
    console.log("   - The issue might be in how the form calls the API");
    console.log("\n📝 Next Steps:");
    console.log("   1. Check the form's dispatch call");
    console.log("   2. Verify Redux state updates");
    console.log("   3. Check for any React errors in the console");
  } else {
    console.error("❌ FAIL: API call failed");
    console.log("\n💡 Analysis:");
    
    if (response.status === 401) {
      console.log("🔒 401 Unauthorized:");
      console.log("   - Your token might be invalid or expired");
      console.log("   - Solution: Log out and log back in");
    } else if (response.status === 422) {
      console.log("⚠️ 422 Validation Error:");
      console.log("   - The API rejected the data format");
      console.log("   - Check the error details above");
      console.log("   - Compare with working Postman request");
    } else if (response.status === 404) {
      console.log("🔍 404 Not Found:");
      console.log("   - The endpoint might be incorrect");
      console.log("   - Verify the proxy configuration in vite.config.ts");
      console.log("   - Check if the API route exists");
    } else if (response.status === 500) {
      console.log("🔥 500 Server Error:");
      console.log("   - The server encountered an error");
      console.log("   - Check server logs");
      console.log("   - Contact backend team");
    } else {
      console.log(`❓ ${response.status} Error:`);
      console.log("   - Unexpected error code");
      console.log("   - Check the response data above for details");
    }
  }
  
  return { response, data };
})
.catch(error => {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.error("❌ FAIL: Request failed with exception");
  console.error("💥 Error:", error);
  console.error("💥 Error Message:", error.message);
  
  console.log("\n💡 Analysis:");
  
  if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
    console.log("🌐 Network Error:");
    console.log("   - Cannot reach the server");
    console.log("   - Possible causes:");
    console.log("     1. Dev server not running");
    console.log("     2. Proxy misconfigured");
    console.log("     3. CORS issues");
    console.log("     4. Server is down");
    console.log("\n📝 Solutions:");
    console.log("   1. Check if 'npm run dev' is running");
    console.log("   2. Verify vite.config.ts proxy settings");
    console.log("   3. Check if https://a.aimshala.com is accessible");
  } else {
    console.log("❓ Unknown Error:");
    console.log("   - Check the error details above");
    console.log("   - This might be a JavaScript error");
  }
  
  throw error;
})
.finally(() => {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🧪 Test Complete");
  console.log("\n📝 Summary:");
  console.log("   - If successful: The API works, check form integration");
  console.log("   - If failed: Follow the solutions suggested above");
  console.log("\n💡 Need more help?");
  console.log("   - Share this console output");
  console.log("   - Include Network tab details");
  console.log("   - Compare with working Postman request");
});

// Additional helper functions
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("💡 Additional Test Commands Available:");
console.log("\n1. Check token validity:");
console.log("   localStorage.getItem('authState')");
console.log("\n2. View full token:");
console.log("   JSON.parse(localStorage.getItem('authState')).token");
console.log("\n3. Clear auth and re-login:");
console.log("   localStorage.removeItem('authState')");
console.log("\n4. Test with different data:");
console.log("   (Modify testAssessmentData object above and re-run)");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

