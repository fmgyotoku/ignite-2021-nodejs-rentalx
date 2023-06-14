import { Request, Response } from "express"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { container } from "tsyringe"

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, password, driver_license, email } = request.body

    const createCategoryUseCase = container.resolve(CreateUserUseCase)
    
    await createCategoryUseCase.execute({ 
      name, 
      password, 
      driver_license, 
      email
    })

    return response.status(201).send()
  }
}

export { CreateUserController }