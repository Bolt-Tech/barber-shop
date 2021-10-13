# Welcome to Jack's Barber Shop!

## Preview demo

![Barber Shop](demo/demo_barber-shop.png)

## Prerequisites

* **[NodeJS](https://nodejs.org/en/)** | Package manager to run `npm`/`node` commands.
* **[XAMPP](https://www.apachefriends.org/index.html)** | To access MySQL DB for account locally.

* **[Visual Studio Code](https://code.visualstudio.com/)** | Install one extensions (Optional):
  * **[Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)** | To make comments more readable & colored texts. I have documented some of it (it highlights important or alert etc.)

## Get Started

1. Run `XAMPP Control Panel`, then click `Start` **Apache** & **MySQL**, and click `Admin` on **MySQL** tab to open **phpMyAdmin** database, then create new "**barber**" database name and create two empty tables "**customers**" & "**appointments**". In customers's DB structure has **first_name, last_name, email, phone, password**, while appointment's DB structure has **time, customer_id, available (boolean)** for MySQL.

2. Open VS Code and redirect to `barber-shop/` root directory.


3. Split in two separate terminals by opening with `Ctrl`+`Shift`+`5` or click `bash` then click `Split Terminal` (when using VS Code's Terminal)

4. First in root directory server-side and create `.env` file, then copy the following to this file: 

```bash
# MySQL Database
MYSQL_HOST=localhost        # Keep this when working locally
MYSQL_USER=root             # Keep root by default or you can to change anything else
MYSQL_PASSWORD=             # Leave blank or type it if you want to add password in XAMPP locally
MYSQL_DATABASE=your_DB_name # Type your database name

# DB_TABLE=your_TABLE_name # Type your table name [Fix queries later****]
```

5. Run server-side:

```bash
npm install
node index.js # Running server-side
# This'll have running in port no. 8080 or 3000
```

6. Then redirect to client-side by typing `cd frontend/` in other terminal, then open live server each one on `index.html`, `login.html` and `signUp.html`.
<!-- 
```bash
npm install
npm start # Starting ReactJS Sign in homepage
``` -->

7. Finally, try out making new appointment for barber by using sign in & sign up to store new account to DB.

**NOTE:** When `npm` is starting up, it probably will ask you to run on a different port `Y/N`, type `Y` as a yes. This is because React and Node server will conflict them with the same port no. 3000, to prevent this, React will run 3001 instead (or an alternative port). If problem didn't occur and client-side sign in or sign up is working (not blank page), nothing to worry about.
