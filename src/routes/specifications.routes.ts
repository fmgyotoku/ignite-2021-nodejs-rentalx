import { Router } from "express"
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController"
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController"
import { authenticationAssessment } from "../middlewares/authenticationAssessment"

const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()

specificationsRoutes.use(authenticationAssessment)

specificationsRoutes.post('/', createSpecificationController.handle)

specificationsRoutes.get('/', listSpecificationsController.handle)

export { specificationsRoutes }