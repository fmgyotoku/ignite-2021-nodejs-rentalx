import { Router } from "express"
import multer from 'multer'

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController"
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController"
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/ImportCategoriesController"

const categoriesRoutes = Router()
const upload = multer({
  dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoriesController()
const importCategoriesController = new ImportCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoriesController.handle(request, response)
})

export { categoriesRoutes }