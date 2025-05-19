# Wall of Fame

A custom Drupal module that provides a reusable "Wall of Fame" feature using Paragraphs. Designed to showcase winners in a visually styled layout, the module includes Paragraph types, fields, templates, and SCSS styles compiled via Gulp.

---

## 📦 Features

- **Paragraph types:**
  - `podium`: A container paragraph holding one or more `wall_of_fame` entries.
  - `wall_of_fame`: A paragraph type with fields for title, subtitle, description, image, and date.

- **Fields:**
  - Title (`field_title`)
  - Subtitle (`field_subtitle`)
  - Description (`field_description`)
  - Image (`field_image`)
  - Date of Adding (`field_date_of_adding`)
  - Nested reference from `podium` to `wall_of_fame` via `field_winner`.

- **Twig Templates:**
  - `paragraph--podium.html.twig` for rendering the layout.
  - Responsive and customizable markup.

- **SCSS Styles:**
  - Located under `/css/global.scss`.
  - Compiled via Gulp to `/css/global.css`.

- **Gulp Workflow:**
  - SCSS compilation and live development support.

---

## 🚀 Installation

### Prerequisites

- Drupal 10
- Paragraphs module enabled
- Node.js and npm installed for Gulp usage

### Step-by-step

1. **Place the module:**

   Copy the `wall_of_fame/` folder into your custom modules directory:
   
2. **Enable the module:**

Use Drush:

```bash
drush en wall_of_fame -y
drush cr


