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

  // Find the index of the cake to delete
  const cakeIndex = cakes.findIndex((cake: { id: number; }) => cake.id === Number(cakeId));

  if (cakeIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cake not found',
    });
  }

  // Remove the cake from the array
  cakes.splice(cakeIndex, 1);

  // Write the updated array back to the file
  const newContent = `export default ${JSON.stringify(cakes, null, 2)}`;
  fs.writeFileSync(filePath, newContent, 'utf-8');

  // Return a success response
  return { success: true, message: 'Cake deleted successfully' };
});