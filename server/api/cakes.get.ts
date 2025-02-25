import cakes  from "../data/cakes";

export default defineEventHandler(async (event) => {
    console.log(cakes);
    return {
        cakes,
    }
  })