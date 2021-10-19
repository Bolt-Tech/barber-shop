# Welcome to Jack's Barber Shop!

### Sample barber admin viewing customer's names & appointment time table data preview.

![Barber Shop](demo/demo_barber-shop.png)

## Prerequisites

* **[NodeJS](https://nodejs.org/en/)** | Package manager to run `npm`/`node` commands.
* **[XAMPP](https://www.apachefriends.org/index.html)** | To access MySQL DB for account locally.

* **[Visual Studio Code](https://code.visualstudio.com/)** | Install some extensions (**Recommended**):
  * **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** | Run HTML to host live.
  * **[Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)** | **(Optional)** To make comments more readable & colored texts. I have documented some of it (it highlights important or alert etc.)

## Get Started

1. Run `XAMPP Control Panel`, then click `Start` **Apache** & **MySQL**, and click `Admin` on **MySQL** tab to open **phpMyAdmin** database. In `barber`, there're 3 tables "**customers**", "**appointments**" and "**admins**". In appointment table one of columns has available **(0 as unavailable, 1 as available)**.
   * **Skip this step** if you're already have database & table ready, otherwise continue reading this:
      1. Create a new database named `barber` (You can write a different name, but I suggest keep default to maintain unchanged settings)
      2. Import database from `/demo/barber.sql` to the same name from your current database

2. Open VS Code and redirect to `barber-shop/` root directory.

3. In root directory server-side and create new `.env` file, then copy the following to this file: 

```bash
# MySQL Database
MYSQL_HOST=localhost        # Keep this when working locally
MYSQL_USER=root             # Keep root by default or you can to change anything else
MYSQL_PASSWORD=             # Leave blank or type it if you want to add password in XAMPP locally
MYSQL_DATABASE=your_DB_name # Type your database name, type 'barber' in this sample

# Sample verification token key, you can renew token when in login page and click "Don't have token? Fetch new token to access your account with appointment!" link and rename it here
JWT_TOKEN_SECRET = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmFyYmVyIFNob3AiLCJpYXQiOjE2MzQ2Mzc1NjZ9.GNrfgLCGYfqLA8gduo3h6B5xU5SoPSgqARgq5qdnHJ0
```

4. Run NodeJS server-side:

```bash
npm install
node index.js # Running server-side
```

5. Then redirect to frontend by clicking right click and open live server `login.html` or `signUp.html` homepage.

6. Finally, try out making new appointment for customer after login or admin to view customer's data.