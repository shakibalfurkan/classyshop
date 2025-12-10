import { createApp } from "./app.js";

const port = process.env.PORT || 5000;

async function main(): Promise<void> {
  try {
    // Connect to database
    // await connectToDatabase();

    // Create app
    const app = await createApp();

    // Start server
    app.listen(port, () => {
      console.log(`Auth service is listening on port: ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

main();
