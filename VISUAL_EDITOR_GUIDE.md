# Visual Page Editor - Usage Guide

## 🎨 Quick Start

### 1. **Enable Editor Mode**
- Look for the orange **"Edit Page"** button in the bottom-right corner (only visible in development)
- Click it to enter edit mode

### 2. **Select an Element**
- **Hover** over any section - it will highlight in blue
- **Click** the section to select it - it will highlight in orange
- A label shows the element type (e.g., `section.hero-section`)

### 3. **Edit Styles**
A style panel appears on the right with controls for:

#### **Spacing**
- **Padding**: Top, Right, Bottom, Left (in pixels)
- **Margin**: Top, Bottom (in pixels)

#### **Typography**
- **Font Size**: Adjust text size
- **Font Weight**: Light (300) to Bold (700)

#### **Size**
- **Width**: Set element width (px or %)
- **Height**: Set element height (px or %)

### 4. **Preview Changes**
- All changes apply **instantly** to the live page
- See exactly how it looks before publishing

### 5. **Publish to GitHub**
- Click **"Publish to GitHub"** in the editor toolbar
- Your changes are:
  1. Saved to `app/editor-styles.css`
  2. Committed to Git with a descriptive message
  3. Pushed to GitHub
  4. Automatically deployed to Vercel

### 6. **Exit Editor**
- Click the **"Exit Editor"** button
- Or click **"Reset"** to discard all unpublished changes

## 📋 Features

✅ **Point & Click Selection** - No code editing needed
✅ **Live Preview** - See changes in real-time
✅ **Visual Feedback** - Clear hover and selection indicators
✅ **One-Click Publishing** - Automatic Git commit & push
✅ **Auto Deployment** - Vercel deploys changes automatically
✅ **Change Counter** - See how many edits you've made
✅ **Reset Option** - Discard changes before publishing

## 🔧 Technical Details

### Files Created
- `components/editor/visual-editor-context.tsx` - State management
- `components/editor/editor-toolbar.tsx` - Toggle and publish UI
- `components/editor/element-selector.tsx` - Click-to-select logic
- `components/editor/style-panel.tsx` - Style editing controls
- `app/api/editor/publish/route.ts` - Git publishing API

### How It Works
1. Editor wraps your app in development mode only
2. Click handlers capture element selection
3. Style changes update both DOM and state
4. Publish endpoint generates CSS and commits to Git
5. Vercel auto-deploys on push to main branch

### Generated Files
- `app/editor-styles.css` - Auto-generated CSS from your edits
- This file is committed and deployed with your changes

## 🗑️ Removing the Editor

When you're done, ask me to remove the editor. I'll:
1. Delete all editor components
2. Remove editor imports from layout
3. Delete the API route
4. Clean up editor-styles.css
5. Commit the cleanup

## ⚠️ Important Notes

- **Development Only**: Editor is invisible in production
- **Sections Only**: Currently targets `<section>` elements and `[data-editable]` attributes
- **Pixel Values**: Most inputs expect pixel values (automatically adds `px`)
- **Git Required**: Publishing requires Git to be configured
- **Vercel Auto-Deploy**: Ensure Vercel is connected to your repo

## 🚀 Try It Now!

1. Open http://localhost:3000
2. Look for the orange "Edit Page" button
3. Start clicking and editing!

---

**Built with Claude Code** 🤖
