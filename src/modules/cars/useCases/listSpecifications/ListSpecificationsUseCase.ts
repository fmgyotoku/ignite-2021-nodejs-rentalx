import { Request, Response } from "express"
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification"
import { inject, injectable } from "tsyringe"
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository"

@injectable()
class ListSpecificationsUseCase {

  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) { }

  async execute(request: Request, response: Response): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list()

    return specifications
  }
}

export { ListSpecificationsUseCase }