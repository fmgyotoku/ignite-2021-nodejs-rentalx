import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListCarsUseCase } from "./ListCarsUseCase"

interface IQueryParams {
  maker: string
  name: string
  category_id: string
}

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { maker, name, category_id } = request.query
    const listCarsUseCase = container.resolve(ListCarsUseCase)
    const cars = await listCarsUseCase.execute({ 
      maker: maker as string, 
      name: name as string, 
      category_id: category_id as string
    })

    return response.json(cars)
  }
}

export { ListCarsController }