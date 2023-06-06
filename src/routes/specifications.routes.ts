import { Router } from "express"
import { createSpecificationController } from "../modules/cars/useCases/createSpecification"
import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications"

const specificationsRoutes = Router()

specificationsRoutes.post('/', (request, response) => {
  createSpecificationController.handle(request, response)

  return response.status(201).send()
})

specificationsRoutes.get('/', (request, response) => {

  return response.json(listSpecificationsController.handle(request, response))
})

export { specificationsRoutes }