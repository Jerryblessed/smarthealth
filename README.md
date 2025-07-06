# SmartHealth

![SmartHealth Logo](https://raw.githubusercontent.com/Jerryblessed/smarthealth/main/logo.png)

**SmartHealth** is an AI-powered web app designed to help Nigerians live healthier lives by providing daily health tips, meal plans, blood pressure estimations, and virtual doctor advice via text or voice.

---

## 💡 Features

* **AI Health Tips** – Personalized daily health advice using GPT-4o
* **Meal Planning** – Affordable, goal-based local meal suggestions
* **Blood Pressure Estimator** – No device needed; based on age, work, and recent activity
* **AI Chat & Voice GP** – Text and voice-based virtual doctor (Pro users)
* **Smart Accessory Store** – Discounted smartwatches, thermometers, and more (Pro+ only)
* **Email Receipts** – Users and admin receive detailed email receipts
* **Paystack Integration** – Supports tiered pricing and accessory checkout

---

## 📦 Tech Stack

* **Frontend**: Vite + TailwindCSS
* **AI**: Azure OpenAI GPT-4o + ElevenLabs
* **Backend**: Node.js (Express) + Supabase Auth
* **Payments**: Paystack
* **Email**: Nodemailer (Gmail SMTP)

---

## 📂 Installation

```bash
git clone https://github.com/Jerryblessed/smarthealth.git
cd smarthealth
cp .env.example .env # Replace with your credentials
npm install
npm run dev
```

---

## 🔐 Environment Variables (.env)

```env
# Azure OpenAI
AZURE_OPENAI_API_BASE=https://thisisoajo.openai.azure.com/
AZURE_OPENAI_MODEL=gpt-4o
AZURE_OPENAI_API_KEY=your_azure_openai_key
AZURE_OPENAI_API_VERSION=2023-06-01-preview

# ElevenLabs
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM

# Paystack
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@smarthealth.com
```

---

## 🚀 MVP Highlights

* No hospital required
* Accessible on low-end smartphones
* Free tier for everyone
* Built specifically for Nigerian users

---

## 👥 Team

**Jeremiah Ope** – Founder & Developer

> Built the app logic, integrations, design, and feature set.

---

## 📸 Screenshots / Demo

*Add screenshots to `/screenshots/` and link here.*

---

## 📈 Roadmap

* [x] AI Chatbot + Voice GP
* [x] Blood pressure estimator
* [x] Email receipts
* [x] Tiered pricing + checkout
* [ ] Mobile-first PWA
* [ ] Offline support
* [ ] Multi-language support (Yoruba, Hausa, Igbo)

---

## 🤝 Contributions

Pull requests and feedback are welcome. Let’s build a healthier Africa together!

---

## 📫 Contact

Jeremiah Ope
📧 [jeremiah.ope@stu.cu.edu.ng](mailto:jeremiah.ope@stu.cu.edu.ng)
🔗 [SmartHealth GitHub](https://github.com/Jerryblessed/smarthealth)
