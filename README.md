<p align="center">
  <img src="logo.svg" alt="FileAI Logo" width="150">
</p>

# 🚀 FileAI: Transforming Text Prompts into Fully Formatted Files

---

## 📜 Overview

FileAI is a personal project designed to streamline the process of converting simple text prompts into fully formatted files. It provides a seamless and intelligent solution for users who need structured documents, reports, or data files without manually formatting them.  

---

## 🎯 Use Cases

✅ **Reports & Documents** – Turn brief text into structured reports.  
✅ **Spreadsheets** – Generate organized Excel sheets.  
✅ **Visualizations** – Create charts & bar graphs.  
✅ **PDFs** – Auto-format content into PDFs.  

---

## 🔥 Key Features

🎭 **Multi-Format Output** – PDF, Excel, and more!  
🎨 **Customizable Layouts** – Personalize styles and formats.  
⚡ **Fast & Efficient** – No manual formatting needed.  
🖥️ **Easy to Use** – No technical skills required.  
📚 **Structured Output** – Well-organized and readable content.  
✏️ **Editable Files** – Modify content anytime.  

---

## 🌍 Who Can Benefit?

👨‍💼 **Professionals** – Quick document creation.  
🎓 **Students** – Easy project reports.  
🏢 **Businesses** – Automated file generation.  
🔬 **Researchers** – Data formatting made simple.  

---

## 🛠️ Tech Stack

🖥️ **Frontend:** [Next.js](https://nextjs.org/)  
🖧 **Backend:** [Django](https://www.djangoproject.com/)  
🗄️ **Database:** [MySQL](https://www.mysql.com/)  
📦 **Containerization:** [Docker](https://www.docker.com/)  

---

## 💻 Development Setup
Follow these steps to run the **File AI** project locally, make changes, and test it.

---

### 📥 Clone the Repository  

First, clone the repository and navigate to the project directory:

``` bash  
git clone https://github.com/justsomerandomdude264/File_AI.git  
cd File_AI  
```

---

### ⚙️ Environment Setup  

Create two **`.env`** files for configuration.

#### 🔹 Root Directory `.env`  
Create a `.env` file in the **root directory** with the following content:

```env  
MYSQL_ROOT_PASSWORD=ROOT PASSWORD  
DB_USER=DATABASE USER  
DB_PASSWORD=DATABASE USER PASSWORD  
```

#### 🔹 Backend Directory `.env`  
Create another `.env` file inside the **backend directory**:

``` env  
OPENAI_API_KEY="YOUR OPENAI API KEY"  

DB_ROOT_PASSWORD=ROOT PASSWORD  
DB_NAME=fileai_db  
DB_USER=DATABASE USER  
DB_PASSWORD=DATABASE USER PASSWORD  
DB_HOST=db  
DB_PORT=3306  
TEST_DB_NAME=fileai_test  

DJANGO_SECRET_KEY="YOUR DJANGO SECRET KEY"  

TEST=1  

SENDGRID_API_KEY="YOUR SENDGRID API KEY"  
TWILIO_ACCOUNT_SID="ACCOUNT SID"  
TWILIO_AUTH_TOKEN="ACCOUNT AUTH TOKEN"  
```

---

### 🐳 Run with Docker (Recommended)  

If you prefer **Docker**, simply run:

```bash  
docker-compose up  
```

---

### ⚡ Manual Setup (Without Docker)  

If you don't want to use **Docker**, follow these steps:

#### 1️⃣ Ensure MySQL Database is Running  

#### 2️⃣ Setup Python Virtual Environment  
Create and activate a virtual environment, then install dependencies:

```bash
python -m venv venv
venv/Scripts/activate
pip install -r requirements.txt  
```

#### 3️⃣ Run the Backend  
Navigate to the backend folder and start the Django server:

```bash  
cd backend  
python manage.py runserver  
```

#### 4️⃣ Run the Frontend   
Navigate to the frontend folder and start the Next.js development server:

```bash  
cd frontend_nextjs  
npm run dev  
```

---

### ✅ You're All Set!  
Now, open your browser on `localhost:3000` if running manually and `localhost:80` if running docker and start using **File AI** 🎉

---

## Contributions

Please feel free to contribute to this projects, open issues and pull requests. 😄

---
