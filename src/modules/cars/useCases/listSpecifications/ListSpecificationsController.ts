import { Request, Response } from "express"
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase"
import { Specification } from "../../infra/typeorm/entities/Specification"
import { container } from "tsyringe"

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase)
    const specifications = await listSpecificationsUseCase.execute(request, response)
    return response.json(specifications)
  }
}

export { ListSpecificationsController }