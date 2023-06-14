import { Router } from "express"
import multer from "multer"

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController"
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatarUseCase/UpdateUserAvatarController"
import uploadConfig from '../config/upload'
import { authenticationAssessment } from "../middlewares/authenticationAssessment"

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUsersController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUsersController.handle)

usersRoutes.patch(
  '/avatar', 
  authenticationAssessment, 
  uploadAvatar.single('avatar'), 
  updateUserAvatarController.handle
)

export { usersRoutes }