# SUPABASE

## Emails

Confirm Your Signup

```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
```

You have been invited

```html
<h2>You have been invited</h2>

<p>You have been invited to create a user on {{ .SiteURL }}. Follow this link to accept the invite:</p>
<p><a href="{{ .ConfirmationURL }}">Accept the invite</a></p>
```

Your Magic Link

```html
<h2>Magic Link</h2>

<p>Follow this link to login:</p>
<p><a href="{{ .ConfirmationURL }}">Log In</a></p>
```

Confirm Email Change

```html
<h2>Confirm Change of Email</h2>

<p>Follow this link to confirm the update of your email from {{ .Email }} to {{ .NewEmail }}:</p>
<p><a href="{{ .ConfirmationURL }}">Change Email</a></p>
```

Reset Your Password

```html
<h2>Reset Password</h2>

<p>Follow this link to reset the password for your user:</p>
<p><a href="{{ .SiteURL }}/api/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/new-password">Reset Password</a></p>

<p>If you did not request a code, you can ignore this email.</p>
```

Confirm Reauthentication

```html
<h2>Confirm reauthentication</h2>

<p>Enter the code: {{ .Token }}</p>
```

## URL Configuration

- Site URL: `http://localhost`
- Redirect URLs: `http://localhost:3000/**`
