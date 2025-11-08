# WellSync Healthcare Process Testing Guide

## 🏥 Complete Testing Flow

### Prerequisites
1. **Mock API Server** running on `http://localhost:5001`
   ```bash
   npm run mock-api
   ```

2. **Frontend Dev Server** running on `http://localhost:5173`
   ```bash
   npm run dev
   ```

---

## 👤 Patient Flow Testing

### Test Account
- **Email:** `patient@test.com`
- **Password:** `1234`
- **Role:** Patient

### Step 1: Login as Patient
1. Go to `http://localhost:5173`
2. Click **"Login"** button
3. Enter credentials:
   - Email: `patient@test.com`
   - Password: `1234`
4. Click **"Sign In"**
5. ✅ **Expected:** Redirects to `/patient/dashboard`
6. ✅ **Expected:** Navbar shows: Dashboard, Goals, Profile, Logout

### Step 2: View Patient Dashboard
**What to verify:**
- ✅ Welcome message with patient name ("Welcome, John Doe!")
- ✅ **Goals Card** showing:
  - Steps: 5600 (with progress bar)
  - Water: 1.8L (with progress bar)
  - Sleep: 7h (with progress bar)
  - "Update Goals" button visible
- ✅ **Reminders Card** showing:
  - "Annual Blood Test" reminder
  - Date: 2025-11-15
- ✅ **Health Tip Card** showing:
  - "Drink water before meals."

**Check Browser Console:**
- Should see API call: `GET http://localhost:5001/patient`
- No errors

### Step 3: Update Goals
1. Click **"Update Goals"** button (or click "Goals" in navbar)
2. ✅ **Expected:** Navigate to `/patient/goals`
3. Fill in the form:
   - Steps: `8000`
   - Water (Liters): `2.5`
   - Sleep (Hours): `8`
4. Click **"Update Goals"**
5. ✅ **Expected:** 
   - Loading state shows "Updating..."
   - Redirects back to `/patient/dashboard`
   - Dashboard shows updated values (8000 steps, 2.5L water, 8h sleep)
   - Progress bars update

**Check Browser Console:**
- Should see: `PUT http://localhost:5001/patient`
- Should see query invalidation messages

**Check Mock API Terminal:**
- Should see the PUT request logged
- `db.json` file should be updated with new values

### Step 4: View/Edit Profile
1. Click **"Profile"** in navbar
2. ✅ **Expected:** Navigate to `/patient/profile`
3. **View Mode:**
   - ✅ See profile information:
     - Name: John Doe
     - Age: 28
     - Allergies: None
     - Medications: (empty)
   - ✅ "Edit" button visible

4. Click **"Edit"** button
5. ✅ **Expected:** Form fields become editable
6. Update profile:
   - Name: `John Smith`
   - Age: `30`
   - Allergies: `Peanuts`
   - Medications: `Aspirin 100mg daily`
7. Click **"Save"**
8. ✅ **Expected:**
   - Success alert: "Profile updated successfully!"
   - Form switches back to view mode
   - Updated values displayed
   - Navbar name updates to "John Smith"

**Check Browser Console:**
- Should see: `PUT http://localhost:5001/patient`
- Redux state should update

**Check Mock API Terminal:**
- Should see PUT request
- `db.json` should reflect changes

### Step 5: Navigate Between Pages
1. Click **"Dashboard"** in navbar → Should go to dashboard
2. Click **"Goals"** in navbar → Should go to goals page
3. Click **"Profile"** in navbar → Should go to profile page
4. ✅ **Expected:** Navigation works smoothly, data persists

### Step 6: Logout
1. Click **"Logout"** button
2. ✅ **Expected:**
   - Redirects to `/login`
   - Navbar shows: Login, About, Privacy (no Dashboard/Goals/Profile)
   - Redux state cleared
   - localStorage cleared

---

## 👨‍⚕️ Provider Flow Testing

### Test Account
- **Email:** `provider@test.com`
- **Password:** `1234`
- **Role:** Provider

### Step 1: Login as Provider
1. Go to `http://localhost:5173/login`
2. Enter credentials:
   - Email: `provider@test.com`
   - Password: `1234`
3. Click **"Sign In"**
4. ✅ **Expected:** Redirects to `/provider/dashboard`
5. ✅ **Expected:** Navbar shows: Dashboard, Logout (no Goals/Profile)

### Step 2: View Provider Dashboard
**What to verify:**
- ✅ Welcome message: "Welcome, Dr. Rao!"
- ✅ **Patient List Table** showing:
  - Column headers: Name, Status
  - Row 1: "John Doe" with green "Goal Met" chip
  - Row 2: "Asha" with red "Missed Checkup" chip
  - Rows are clickable (hover effect)

**Check Browser Console:**
- Should see: `GET http://localhost:5001/provider`
- No errors

### Step 3: View Patient Details
1. Click on **"John Doe"** row in the table
2. ✅ **Expected:** Navigate to `/provider/patient/1`
3. **What to verify:**
   - ✅ **Profile Information Card:**
     - Name: John Doe
     - Age: 28
     - Allergies: None
     - Medications: (empty)
   - ✅ **Current Goals Card:**
     - Steps, Water, Sleep with progress bars
     - Progress percentages
   - ✅ **Upcoming Reminders Card:**
     - "Annual Blood Test" reminder
   - ✅ **Health Tip:**
     - "Drink water before meals."
   - ✅ "Back to Dashboard" button visible

4. Click **"Back to Dashboard"**
5. ✅ **Expected:** Returns to provider dashboard

### Step 4: View Another Patient
1. Click on **"Asha"** row
2. ✅ **Expected:** Navigate to `/provider/patient/2`
3. Note: This patient might not have full data (mock limitation)

### Step 5: Logout
1. Click **"Logout"**
2. ✅ **Expected:** Redirects to `/login`

---

## 🔐 Registration Flow Testing

### Step 1: Register New Patient
1. Go to `http://localhost:5173/register`
2. Fill registration form:
   - Name: `Jane Smith`
   - Email: `jane@test.com`
   - Password: `1234`
   - Confirm Password: `1234`
   - Role: Select **"Patient"**
   - ✅ Check consent checkbox
3. Click **"Register"**
4. ✅ **Expected:**
   - Auto-login after registration
   - Redirects to `/patient/dashboard`
   - New user appears in navbar

**Check Mock API Terminal:**
- Should see: `POST http://localhost:5001/users`
- New user added to `db.json`

### Step 2: Register New Provider
1. Logout first
2. Go to register page
3. Fill form with:
   - Role: **"Provider"**
   - Different email (e.g., `doctor@test.com`)
4. Click **"Register"**
5. ✅ **Expected:** Auto-login and redirect to `/provider/dashboard`

---

## 🛡️ Security & Route Protection Testing

### Test 1: Unauthenticated Access
1. **Without logging in**, try to access:
   - `http://localhost:5173/patient/dashboard`
   - `http://localhost:5173/patient/goals`
   - `http://localhost:5173/patient/profile`
   - `http://localhost:5173/provider/dashboard`
2. ✅ **Expected:** All redirect to `/login`

### Test 2: Role-Based Access Control
1. **Login as Patient** (`patient@test.com`)
2. Try to access:
   - `http://localhost:5173/provider/dashboard`
3. ✅ **Expected:** Redirects to `/patient/dashboard` (patient's dashboard)

4. **Login as Provider** (`provider@test.com`)
5. Try to access:
   - `http://localhost:5173/patient/dashboard`
6. ✅ **Expected:** Redirects to `/provider/dashboard` (provider's dashboard)

### Test 3: Session Persistence
1. Login as patient
2. Close browser tab
3. Open new tab, go to `http://localhost:5173`
4. ✅ **Expected:** Still logged in (localStorage persisted)
5. Navigate to `/patient/dashboard`
6. ✅ **Expected:** Works without re-login

---

## 🔄 Data Flow Testing

### Test 1: Real-time Updates
1. Login as patient
2. Open dashboard
3. In another browser/incognito window, login as provider
4. Provider views patient details
5. Patient updates goals
6. ✅ **Expected:** Provider can see updated goals (after refresh)

### Test 2: Query Invalidation
1. Patient updates goals
2. ✅ **Expected:** Dashboard automatically refreshes with new data
3. Check browser console for query invalidation messages

### Test 3: Error Handling
1. **Stop mock API server** (Ctrl+C in terminal)
2. Try to login
3. ✅ **Expected:** Error message shown
4. Try to load dashboard
5. ✅ **Expected:** Error alert displayed
6. **Restart mock API server**
7. ✅ **Expected:** Everything works again

---

## 📊 Complete End-to-End Test Scenario

### Scenario: Patient Wellness Journey

1. **Registration**
   - Register new patient: `test@patient.com` / `1234`
   - ✅ Auto-login works

2. **Initial Dashboard View**
   - View default goals and reminders
   - ✅ All data loads correctly

3. **Update Goals**
   - Set Steps: 10000, Water: 3L, Sleep: 8h
   - ✅ Goals update and dashboard refreshes

4. **Update Profile**
   - Add allergies: "Dairy, Gluten"
   - Add medications: "Vitamin D 1000IU"
   - ✅ Profile saves successfully

5. **Provider View**
   - Logout as patient
   - Login as provider
   - View patient list
   - Click on patient
   - ✅ See updated goals and profile

6. **Logout**
   - Logout from provider
   - ✅ Session cleared

---

## ✅ Testing Checklist

### Patient Features
- [ ] Login works
- [ ] Dashboard loads with all data
- [ ] Goals update successfully
- [ ] Profile view/edit works
- [ ] Navigation between pages works
- [ ] Logout works

### Provider Features
- [ ] Login works
- [ ] Patient list loads
- [ ] Patient details view works
- [ ] Navigation works
- [ ] Logout works

### Security
- [ ] Unauthenticated access blocked
- [ ] Role-based access control works
- [ ] Session persistence works
- [ ] Logout clears session

### Data Flow
- [ ] API calls work correctly
- [ ] Query invalidation works
- [ ] Real-time updates work
- [ ] Error handling works

---

## 🐛 Common Issues & Solutions

### Issue: 404 Errors
**Solution:** Make sure mock API server is running on port 5001

### Issue: CORS Errors
**Solution:** Check that API client is pointing to correct port (5001)

### Issue: Data Not Updating
**Solution:** Check browser console for errors, verify mock API is running

### Issue: Login Not Working
**Solution:** 
- Verify mock API is running
- Check email/password match `db.json`
- Check browser console for errors

---

## 📝 Notes

- All data is stored in `src/api/mock/db.json`
- Changes persist until you restart the mock API server
- To reset data, restart the mock API server
- Check browser DevTools Network tab to see all API calls
- Check browser DevTools Console for any errors

Happy Testing! 🎉

