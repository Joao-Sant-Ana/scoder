# Scoder Challenge

🔗 [Access the live project](https://scoder-silk.vercel.app/)

Please read the entire README file to understand the decisions made and the step-by-step instructions on how to run the project.

## AI Usage
- Used to fix English grammar and spelling.
- Used to fix small bugs.
- Used to create or refactor small parts of the code.

## Configure Environment
First of all, you need to configure some environment variables to run Docker and make the project work.  
Create a `.env` file by copying the variable names from `.env.example`. Then, set your own values.  

**Important:** The database host should be `postgres_db` because the name of the Docker container is `postgres_db`.  
**Important:** `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` must match the placeholders in the following URL:  
`postgresql://POSTGRES_USER:POSTGRES_PASSWORD@postgres_db:5432/POSTGRES_DB`

## How to Run Docker
- Install Docker: Follow the official [Docker docs](https://docs.docker.com/desktop/setup/install/windows-install/) to install it.
- Run:
    ```bash
    docker-compose up --build
    ```
- To stop and remove the containers, run:
    ```bash
    docker-compose down -v
    ```

## Tech Stack
- **Frontend:**
    - [Next.js](https://nextjs.org/) (as requested)
    - [Shadcn](https://ui.shadcn.com/) for components
    - [Tailwind CSS](https://tailwindcss.com/) for styling
    - [Zod](https://zod.dev/) and [React Hook Form](https://react-hook-form.com/) for validation
- **Backend:**
    - [Prisma](https://www.prisma.io/orm) ORM for database queries
    - [Bcrypt](https://www.npmjs.com/package/bcrypt) for password encryption
    - [Jose](https://www.npmjs.com/package/jose) for creating, signing, and validating JWT tokens
    - [Cookies-next](https://www.npmjs.com/package/cookies-next) for handling cookies
- **Development Tools:**
    - [Prettier](https://prettier.io/docs/install.html) for code formatting
    - [ESLint](https://eslint.org/) for code linting

## Project structure:
```
|-- prisma
|   `-- migrations // Contains database migrations managed by Prisma.
|-- public // Contains static assets served by Next.js.
`-- src
    |-- app
    |   |-- admin // Routes related to the admin area.
    |   |   `-- dashboard // Dashboard accessible only when logged in with JWT authentication.
    |   |-- api // Api routes
    |   |   |-- auth // Handles user authentication.
    |   |   `-- leads // Routes to retrieve data related to leads.
    |   `-- lead // Page to view a specific lead by ID.
    |-- components
    |   |-- captureLeadPage // Components specific to pages.
    |   |-- dashboard 
    |   |-- publicLeadPage
    |   |-- shared // Shared components used across multiple pages.
    |   `-- ui // Atomic UI components
    |-- lib // Utils and queries
    `-- types
```

## Decisions

- Why use Shadcn:  
  - _Because it allows faster development of good UI without wasting too much time._

- Why deploy on Vercel:  
  - _For two main reasons: first, simplicity and speed; second, cost. Honestly, I would appreciate it much more if I could deploy on a VPS, configure it myself, and use my own domain._
  
