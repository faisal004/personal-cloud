
# Personal Cloud

This app is clone of apple Cloud


## Tech Stack

- Turborepo
- Next.js
- Tailwind CSS
- tRPC
- Drizzle ORM
- Auth.js
- Uploadthing

## Features
- User authentication with Auth.js using passkey.

## To Setup Locally

```
git clone https://github.com/faisal004/personal-cloud.git

```

1. Add .env varaible in app/web
 


 ```
 AUTH_SECRET="" # Add it using `npx auth`. Read more: https://cli.authjs.dev
DATABASE_URL="your db url'
 ```

 2. Now run in app/web



 ```
 pnpm i
 ```

 3. Add .env in packages/database

 ```
 DATABASE_URL="your db url'
 ```

 4. Now run in  packages/database

 ```
 pnpm i
 pnpm db:push // to generate and sync tables 

```

## Database Schema
The project uses Drizzle ORM.

### Auth.js Tables
The following tables are provided by Auth.js for handling user authentication and sessions:
- users
- accounts
- sessions
- verificationTokens
- authenticators
### Custom Tables
In addition to the authentication tables, we have custom tables to store user data:

#### Files
Stores information about files uploaded by the user.
 - id: Unique identifier for each file.
 - url: The URL where the file is stored.
 - userId: References the id in the users table to associate the file with a user.
 #### Images
Stores information about images uploaded by the user.

- id: Unique identifier for each image.
- url: The URL where the image is stored.
- userId: References the id in the users table to associate the image with a user.

#### Notes
Stores user-created notes.

- id: Unique identifier for each note.
- content: The text content of the note.
- userId: References the id in the users table to associate the note with a user.
- createdAt: Timestamp of when the note was created.
- updatedAt: Timestamp of the last update to the note.

## Feedback
If you have any feedback, please reach out to me at faisalhusain1320@gmail.com