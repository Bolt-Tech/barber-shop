# Welcome to Barber's Shop!

Let's Create an account for admins using behind-the-scene database, then sign in client-side to view customer names and their appointment time. Customer in client-side can sign-up, then generate token and set appointment or sign-in to set up appointment quickly.

### A sample barber's admin viewing customer name & appointment time in table data preview:

![Barber Shop](demo/demo_barber-shop.png)

## Prerequisites

* **[NodeJS](https://nodejs.org/en/)** | Package manager to run `npm`/`node` commands.

* Choose one Databases Software + GUI (or you can use a different product not from list as long as it supports SQL)

  * **[XAMPP](https://www.apachefriends.org/index.html)**
  * [MySQL](https://dev.mysql.com/downloads/installer/) - [Install Guide](https://www.onlinetutorialspoint.com/mysql/install-mysql-on-windows-10-step-by-step.html)

* **[Visual Studio Code](https://code.visualstudio.com/)** | Install some extensions (**Recommended**):
  * **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** | Run HTML to host live.
  * **[Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)** | **(Optional)** To make comments more readable & colored texts. I have documented some of it (it highlights important or alert etc.)

## How It Works

According to `/demo/barber.sql` database table structure with encrypted password using [bcrypt](https://www.npmjs.com/package/bcrypt), so the following 3 samples of visual table here:

`admins`

| id | first_name | last_name | email                 | password |
|----|------------|-----------|-----------------------|----------|
| 1  | John       | Smith     | johnsmith@example.com | MTIzNA== |



`customer`

| id | first_name | last_name | email                    | phone      | password |
|----|------------|-----------|--------------------------|------------|----------|
| 1  | Johnny     | Walker    | johnnywalker@example.com | 1234567890 | @!IzNX== |

> Example decrypted passwords for admins & customer are "1234" in sign-in page (without quotation)

`appointments`


| id | time  | customer_id | available |
|----|-------|-------------|-----------|
| 1  | 09:00 | 1           | 0         |
| 2  | 10:00 | NULL        | 1         |

There will be connection this with a customer table above. Also availability value: 0 is unvailable while 1 is avilable.

---

## Usage

1. Now let's get started by running `XAMPP Control Panel`, then click `Start` **Apache** & **MySQL**, and click `Admin` on **MySQL** tab to open **phpMyAdmin** database.

![XAMPP Startup](demo/XAMPP-Startup.jpg)

2. Create a new database named `barber` (Example name DB)

3. While on **Database: barber** page, click `Import tab` on top bar then browse database from `demo/barber.sql`, after that, click run, now you have barber DB with 3 tables has been inserted.

4. Now, dotenv has already preconfigured with sample input (no need to edit anything), including `JWT_TOKEN_SECRET`. Create new `.env` file in root directory and paste the following code:

```bash
# Use XAMPP to access database "barber"

MYSQL_HOST=localhost
MYSQL_USER=root
# If you have setup your password by XAMPP/Workbench or other software, insert it here, otherwise leave it empty (no password)
MYSQL_PASSWORD=
MYSQL_DATABASE=barber

# Sample verification token key, you can renew token in a login page and click
# "Don't have token? Fetch new token to access your account with appointment!" 
# link and rename it here with generated token key
JWT_TOKEN_SECRET = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmFyYmVyIFNob3AiLCJpYXQiOjE2MzQ2Mzc1NjZ9.GNrfgLCGYfqLA8gduo3h6B5xU5SoPSgqARgq5qdnHJ0
```

5. Redirect to `barber-shop/` root directory with VS Code.

6. Run NodeJS server-side:

```bash
npm install
node index.js # Running server-side
```

7. While server is running, let's open client-side by redirecting to `frontend/` and right click then open live server `login.html` or `signUp.html` as homepage.

8. Finally, try out making new appointment for **customer** or **admin** to view customer's data. Also use XAMPP to create admin account or view appointment table, customer in database. Look at VS Code terminal for console logging activity such as checking if user is signed up or detailed error or login etc.