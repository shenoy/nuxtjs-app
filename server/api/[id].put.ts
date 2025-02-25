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

  // Read the request body (form data)
  const body = await readBody(event);
  const { name, comment, imageUrl, yumFactor } = body;

  // Validate the input
  if (!name || !comment || !imageUrl || !yumFactor) {
    throw createError({
      statusCode: 400,
      statusMessage: 'All fields are required',
    });
  }

  // Validate Comment length
  if (comment.length < 5 || comment.length > 200) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Comment must be between 5 and 200 characters',
    });
  }

  // Validate Yum Factor
  if (yumFactor < 1 || yumFactor > 5) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Yum Factor must be between 1 and 5',
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

  // Find the cake to update
  const cakeIndex = cakes.findIndex((cake: { id: number; }) => cake.id === Number(cakeId));

  if (cakeIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cake not found',
    });
  }

  // Update the cake
  cakes[cakeIndex] = {
    ...cakes[cakeIndex],
    name,
    comment,
    imageUrl,
    yumFactor,
  };

  // Write the updated array back to the file
  const newContent = `export default ${JSON.stringify(cakes, null, 2)}`;
  fs.writeFileSync(filePath, newContent, 'utf-8');

  // Return a success response
  return { success: true, message: 'Cake updated successfully' };
});