import { getAllCategories } from "../controllers/product/catergory.js"
import { getProductsByCategoryId } from "../controllers/product/product.js"

export const categoryRoutes = async (fastify, options) => {
    fastify.get("/categories", getAllCategories)
}
export const productRoutes = async (fastify, options) => {
    fastify.get("/products/:catergoryId", getProductsByCategoryId)
}