Authentica

Overview

Authentica is a product verification system designed to combat counterfeit goods by allowing users to scan and validate products using a secure One-Time Password (OTP) system. The platform ensures transparency in the supply chain and enables users to report counterfeit or expired products.
Features
Product Authentication: Users can scan product QR codes to verify authenticity.
OTP Verification: Secure 5-digit OTP for product validation.
Reporting System: Users can report counterfeit or expired products along with store details.
User Dashboard: Clean and simple UI with bottom navigation for easy access.
Crate Management: Stores handle crates, ensuring batch verification at scale.
Admin Controls: Oversee reports, verify claims, and manage the database.

User Roles

1. User
Scans individual products to verify authenticity.
Manually enters a 5-digit OTP for validation.
Reports counterfeit or expired products.
Views scan history and reports.

2. Store
Scans and verifies crates of products.
Ensures the legitimacy of bulk shipments.
Registers with a unique store ID for verification.

3. Admin
Manages product database and verification logs.
Reviews and resolves reported product issues.
Oversees store and user activities.

Installation

Prerequisites
Node.js & npm (Ensure the latest version is installed)
Tailwind CSS for styling
MySQL/PostgreSQL for the database
Setup

Clone the repository

git clone https://github.com/yourusername/authentica.git
cd authentica

Install dependencies

npm install
Setup Tailwind CSS
npx tailwindcss init -p
Run the development server
npm run dev

Database Migration
Configure the database connection in .env file.
Run migration script:
npm run migrate

Technologies Used

Frontend: Vite, React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MySQL/PostgreSQL
Authentication: OTP-based verification
Cloud Storage: AWS S3 (for logs and product reports)

Future Enhancements
AI-powered counterfeit detection.
Blockchain integration for immutable verification records.
Multi-language support for global reach.
Store performance insights and analytics.

Contributing

Feel free to contribute! Fork the repo and submit a pull request.
License

This project is licensed under the MIT License.
Contact

For any inquiries or support, reach out to:
📧 Email: kmanyama009@gmail.com,, bayandamlomo1@gmail.com,, thamidwane17@gmail.com,,  🌐 Website: Authentica
