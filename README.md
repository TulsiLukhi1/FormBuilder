# Form Builder

## Installation

### Clone the repository
```
git clone https://github.com/TulsiLukhi1/FormBuilder.git 
cd FormBuilder
```

### Install dependencies
```
npm install
```

## Setup Authentication for Clerk

1. **Environment Variables**: 
   
   In the `.env` file, provide credentials for the following environment variables:
   
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

   For your Clerk app, refer to the [documentation](https://clerk.com/docs/quickstarts/nextjs) for details.

2. **Update `.env` file**:

   After creating the Clerk application and obtaining the required environment variables, add them to the `.env` file:

   ```dotenv
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

## Database and Prisma Setup

1. **Create Database on Vercel**:

   - Login or signup to [Vercel](https://vercel.com/dashboard/stores).
   - Create a database.
   - Choose PostgreSQL and continue.
   - Provide a database name, select region, and click create.

2. **Configure Environment Variables**:

   After creating the database, you will be redirected to a setup page. Select the `env.local` tab, copy the snippet, and paste it into the project's `.env` file.

3. **Run Migrations**:

   Run the following command for schema migration:
   
   ```bash
   npx prisma migrate dev
   ```

4. **View Schema and Data**:

   To view the schema and data, run:
   
   ```bash
   npx prisma studio
   ```

## Running the Project

To run the project:

```bash
npm run dev
```
