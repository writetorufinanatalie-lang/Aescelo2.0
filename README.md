Aesculo

AI-powered healthcare web app that turns prescriptions and lab reports into simple, plain-language explanations with safety flags.

Many people struggle to understand medical documents because they are full of technical terms. Aesculo uses AI vision to read a prescription or lab report and explain it in words anyone can follow.

> Example: Instead of "1-0-1 AC", Aesculo says, "Take one tablet in the morning and one at night, before food."

Features

- Upload a photo of a prescription or lab report
- AI vision reads the document and extracts medicines and lab values
- Plain-language explanation of every item
- Safety flags for abnormal results or points that need attention
- Secure sign-up and login
- Report history saved per user, with private data (row-level security)


Tech Stack

| Part | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| AI | Anthropic SDK (vision) |
| Auth and Database | Supabase (PostgreSQL) |

Why an Express backend?  It keeps the AI API key on the server, so it is never exposed in the browser.



 Database Schema

Aesculo uses five tables in Supabase:

| Table | What it stores |
|---|---|
| `profiles` | User details |
| `reports` | Each uploaded report |
| `medications` | Medicines found in a report |
| `lab_values` | Test results found in a report |
| `flags` | Safety warnings for a report |

Row-level security (RLS) is turned on, so each user can only see their own data.



 Getting Started

 1. Requirements

- [Node.js](https://nodejs.org) (version 18 or higher)
- A free [Supabase](https://supabase.com) account
- An [Anthropic API key](https://console.anthropic.com)

 2. Clone the project

git clone https://github.com/<your-username>/aesculo.git
cd aesculo


 3. Install packages

npm install


If the frontend and backend are in separate folders, run `npm install` inside each one.

 4. Set up environment variables

Create a file named `.env.local` in the project folder and add:

ANTHROPIC_API_KEY=your_anthropic_key_here
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key


Important: Never upload `.env.local` to GitHub. Make sure `.env.local` is listed in your `.gitignore` file.

5. Set up the database

1. Open your Supabase project
2. Go to SQL Editor
3. Paste and run the SQL schema that creates the five tables and the RLS policies

6. Run the app

Start the backend
npm run server

Start the frontend (in a new terminal)
npm start

Then open the link shown in the terminal (usually `http://localhost:3000`).

> Script names can differ. Check the `scripts` section of your `package.json` for the exact commands.


How It Works

1. The user logs in and uploads an image
2. The image goes to the Express backend
3. The backend sends it to the AI model, which reads and explains it
4. The results are saved in Supabase
5. The user sees the explanation and any safety flags


Disclaimer

Aesculo is for (understanding only). It does not give medical advice, diagnosis, or treatment. Always talk to a doctor or pharmacist before making any health decision.

Future Ideas

- Support for regional languages
- Medicine reminders
- Trend charts for repeated lab tests


Team

Built by Rufina , CIT Chennai.

License

MIT
