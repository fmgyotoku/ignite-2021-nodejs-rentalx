import { Router } from "express"
import { authenticationAssessment } from "@shared/infra/http/middlewares/authenticationAssessment"
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController"
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController"

const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()

specificationsRoutes.use(authenticationAssessment)

specificationsRoutes.post('/', createSpecificationController.handle)

specificationsRoutes.get('/', listSpecificationsController.handle)

export { specificationsRoutes }