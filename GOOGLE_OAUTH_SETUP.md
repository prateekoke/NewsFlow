# Google OAuth Setup Guide - Fixing redirect_uri_mismatch Error

This guide will help you resolve the "redirect_uri_mismatch" error when using Google OAuth with Supabase.

## Understanding the Error

The error occurs when the redirect URI used in the OAuth request doesn't match any of the redirect URIs configured in Google Cloud Console for your OAuth 2.0 client.

## Step-by-Step Solution

### Step 1: Get Your Supabase Project URL

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy your **Project URL** (it looks like: `https://xxxxxxxxxxxxx.supabase.co`)

### Step 2: Configure Google OAuth in Supabase

1. In your Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list and click on it
3. Enable Google provider
4. You'll need to add:
   - **Client ID** (from Google Cloud Console - see Step 3)
   - **Client Secret** (from Google Cloud Console - see Step 3)
5. Click **Save**

### Step 3: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. If prompted, configure the OAuth consent screen first:
   - Choose **External** (for development) or **Internal** (for Google Workspace)
   - Fill in the required fields (App name, User support email, Developer contact)
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if needed (for External type)

6. Create OAuth Client ID:
   - **Application type**: Web application
   - **Name**: NewsFlow (or your preferred name)
   
7. **IMPORTANT - Add Authorized redirect URIs**:
   Add these redirect URIs (replace `xxxxxxxxxxxxx` with your Supabase project reference):
   ```
   https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
   ```
   
   For local development, you might also need:
   ```
   http://localhost:8080
   http://localhost:3000
   ```

8. Click **Create**
9. Copy the **Client ID** and **Client Secret**

### Step 4: Add Redirect URIs in Google Cloud Console

After creating the OAuth client:

1. Go back to **APIs & Services** → **Credentials**
2. Click on your OAuth 2.0 Client ID
3. In the **Authorized redirect URIs** section, make sure you have:
   ```
   https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
   ```
   (Replace `xxxxxxxxxxxxx` with your actual Supabase project reference)

4. For additional local development URLs (optional):
   ```
   http://localhost:8080
   http://127.0.0.1:8080
   ```

5. Click **Save**

### Step 5: Update Supabase Configuration

1. Go back to Supabase Dashboard → **Authentication** → **Providers** → **Google**
2. Paste the **Client ID** and **Client Secret** from Step 3
3. Click **Save**

### Step 6: Verify Environment Variables

Make sure you have a `.env` file (or `.env.local`) in your project root with:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

To get your keys:
- Go to Supabase Dashboard → **Settings** → **API**
- Copy **Project URL** → `VITE_SUPABASE_URL`
- Copy **anon/public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`

### Step 7: Restart Your Development Server

After making changes:

```bash
# Stop your dev server (Ctrl+C)
# Restart it
npm run dev
```

## Common Issues and Solutions

### Issue 1: Still getting redirect_uri_mismatch

**Solution:**
- Double-check the redirect URI in Google Cloud Console exactly matches: `https://[your-project-ref].supabase.co/auth/v1/callback`
- Make sure there are no trailing slashes
- Ensure you're using the correct Supabase project URL
- Wait a few minutes after updating (Google caches these settings)

### Issue 2: OAuth consent screen not configured

**Solution:**
- Complete the OAuth consent screen setup in Google Cloud Console
- Add your email as a test user if using "External" type
- Make sure the app is in "Testing" mode and add test users

### Issue 3: Local development redirect issues

**Solution:**
- The redirect URI should be the Supabase callback URL, not your local URL
- Supabase handles the OAuth callback and then redirects to your app
- The `redirectTo` parameter in your code (`${window.location.origin}/`) is where Supabase redirects AFTER processing the OAuth callback

### Issue 4: "redirect_uri_mismatch" persists after changes

**Solution:**
1. Clear your browser cache and cookies
2. Wait 5-10 minutes for Google's changes to propagate
3. Verify the redirect URI matches exactly (case-sensitive)
4. Check if you're using the correct Google Cloud project
5. Make sure the OAuth client is enabled in Google Cloud Console

## Testing

1. Make sure your dev server is running: `npm run dev`
2. Navigate to your auth page
3. Click "Continue with Google"
4. You should be redirected to Google's sign-in page
5. After signing in, you should be redirected back to your app

## Important Notes

- The redirect URI format for Supabase is: `https://[project-ref].supabase.co/auth/v1/callback`
- The `redirectTo` parameter in your code is where users land AFTER Supabase processes the OAuth callback
- Changes in Google Cloud Console can take a few minutes to propagate
- Always use HTTPS for production redirect URIs
- For local development, HTTP is acceptable but Supabase callback must use HTTPS

## Additional Resources

- [Supabase OAuth Documentation](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Setup](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Dashboard](https://app.supabase.com)

