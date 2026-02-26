This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Register form requirement:

# Registration & Profile Creation Flow Requirements

## Overview

This document defines the multi-step registration and profile creation flow for Antigravity.

The goal is to create a low-friction onboarding experience that collects essential matchmaking data progressively while keeping the UI intuitive and responsive.

All dropdowns must be powered by master APIs and support search filtering.

---

# Step 1 — Basic Registration

## Fields

### Profile Created For (Dropdown)

Options:

- Myself
- Daughter
- Son
- Sister
- Brother
- Relative
- Friend

Required: Yes

---

### Gender (Radio Buttons)

Options:

- Male
- Female

Required: Yes

---

### Full Name (Text Input)

Required: Yes

Validation:

- Minimum 2 characters

---

### Country Code (Dropdown with Search)

Source: Master Countries API

Required: Yes

---

### Mobile Number (Numeric Input)

Required: Yes

Validation:

- Numeric only
- Length validation based on country

---

### OTP Verification

- Use dummy OTP: `1111`
- OTP input field (4 digits)

Required before proceeding.

---

### Register Free Button

Action:

- Validate fields
- Move to Step 2

---

# Step 2 — Account Details

## Fields

### Date of Birth

Inputs:

- Day dropdown
- Month dropdown
- Year dropdown

Required: Yes

Validation:

- Age must meet platform minimum

---

### Mother Tongue (Searchable Dropdown)

Source: Master Mother Tongue API

Required: Yes

---

### Email Address (Input)

Required: Yes

Validation:

- Valid email format

---

### Create Password (Input)

Required: Yes

Validation:

- Minimum length
- Strength rules

---

### Next Button

Moves to Step 3.

---

# Step 3 — Personal Details

## Fields

### Height (Searchable Dropdown)

Source: Master Heights API

Required: Yes

---

### Physical Status (Dropdown)

Options:

- Normal
- Physically Challenged

Required: Yes

---

### Marital Status (Dropdown)

Options:

- Never Married
- Widower
- Awaiting Divorce
- Divorced

Required: Yes

---

### Conditional Field — Children Count

Condition:
IF marital_status != "Never Married"

Show:

- Number of Children (numeric input)

Required when visible.

---

### Religion (Searchable Dropdown)

Source: Master Religions API

Required: Yes

---

### Caste (Searchable Dropdown)

Condition:
Loads after religion selection.

Source:
GET castes by religion.

Required: Yes

---

### Subcaste (Text Input)

Optional.

---

### Next Button

Moves to Step 4.

---

# Step 4 — Location Details

## Fields

### Country (Searchable Dropdown)

Source: Master Countries API

Required: Yes

---

### State (Searchable Dropdown)

Condition:
Loads after country selection.

Source:
States API.

Required: Yes

---

### City (Searchable Dropdown)

Condition:
Loads after state selection.

Source:
Cities API.

Required: Yes

---

### Next Button

Moves to Step 5.

---

# Step 5 — Professional Details

## Fields

### Education (Searchable Dropdown)

Source: Master Education API

Required: Yes

---

### Employment Type (Searchable Dropdown)

Source: Master Employment API

Required: Yes

---

### Occupation (Searchable Dropdown)

Condition:
Loads after employment type selection.

Source:
Occupation API.

Required: Yes

---

### Annual Income Currency (Searchable Dropdown)

Source: Master Currency API

Required: Yes

---

### Annual Income Range (Searchable Dropdown)

Condition:
Loads after currency selection.

Source:
Income Range API.

Required: Yes

---

### Next Button

Moves to Step 6.

---

# Step 6 — Family Details

## Fields

### Family Status (Dropdown)

Options:

- Middle Class
- Upper Middle Class
- Rich / Elite

Required: Yes

---

### Conditional Field — Network Search

Condition:
IF family_status == "Rich / Elite"

Show:

- Network Search Dropdown

Optional selection.

---

### About Yourself (Textarea)

Label:
"A few words about yourself"

Required: Yes

Validation:

- Minimum character count

---

### Submit Button

Action:

- Validate all steps
- Create user profile
- Redirect to dashboard

---

# UX Requirements

- Multi-step progress indicator
- Autosave progress
- Field-level validation messages
- Smooth transitions
- Mobile responsive layout
- Keyboard friendly navigation

---

# API Integration

Each dropdown must:

- Fetch from master endpoints
- Support search filtering
- Cache results
- Handle loading states

---

# Validation Rules

- Required fields enforced
- Conditional logic enforced
- Backend validation mirrors frontend rules

---

# Error Handling

- Show inline errors
- Prevent submission on invalid data
- Graceful API error messages

---

# Success Criteria

User can:

- Complete registration smoothly
- Submit profile successfully
- Experience minimal friction

---

# Future Enhancements

- Photo upload step
- Profile completeness indicator
- AI profile suggestions
- Save and resume onboarding
