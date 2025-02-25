import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  // Get the cake ID from the URL parameters
  const cakeId = event.context.params?.id;

  if (!cakeId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cake ID is required',
    });
  }

  // Define the path to the allcakes.ts file
  const filePath = path.resolve(process.cwd(), 'server/data/cakes.ts');

  // Read the existing data from the file
  let cakes = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    // Extract the array from the file content
    const match = fileContent.match(/export default (\[.*\])/s);
    if (match) {
      cakes = JSON.parse(match[1]); // Use JSON.parse instead of eval
    }
  }

  // Find the cake by ID
  const cake = cakes.find((cake: { id: number; }) => cake.id === Number(cakeId));

  if (!cake) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cake not found',
    });
  }

  // Return the cake
  return cake;
});