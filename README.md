# 🏠 Newfound Living – Rental Property Management Website

This is a Flask-based web application for **Newfound Living**, a rental property management company based in St. John's, NL. The site allows users to:

- View available rental units
- Submit rental applications
- Confirm rent payments
- Join the waitlist for future properties

---

## 🚀 Features

- 📄 **Rental Application Form** — Collects applicant, employment, and reference details
- 📬 **Email Notification Signup** — Users can leave their email to be notified of new availability
- ✉️ **Email Copy Button** — One-click to copy the rent payment address

---

## 🧰 Tech Stack

- **Backend:** Python (Flask)
- **Frontend:** HTML5, CSS3, Jinja2 templating
- **Form Handling:** [Formspree](https://formspree.io/)
- **Deployment Ready:** Works on Heroku, Render, or any WSGI-compatible platform

---

## 📁 Project Structure

NewFoundLiving-main/
│
├── app.py # Main Flask application
├── templates/ # HTML templates (Jinja2)
│ ├── index.html
│ ├── rent.html
│ ├── layout.html
│ └── rental-application.html
├── static/ # CSS, JS, images
├── requirements.txt # Python dependencies
├── Pipfile / Pipfile.lock # Pipenv environment
├── README.md # This file
└── CNAME # (Optional) for custom domain