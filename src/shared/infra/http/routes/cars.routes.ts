import { Router } from "express"

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { authenticationAssessment } from "../middlewares/authenticationAssessment"
import { adminAssessment } from "../middlewares/adminAssessment"
import { ListCarsUseCase } from "@modules/cars/useCases/listCars/ListCarsUseCase"
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListCarsController()

carsRoutes.post("/", authenticationAssessment, adminAssessment, createCarController.handle)
carsRoutes.get("/", listAvailableCarsController.handle)

export { carsRoutes }