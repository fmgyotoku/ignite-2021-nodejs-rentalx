import { Request, Response } from "express"
import { Specification } from "../../entities/Specification"
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository"
import { inject, injectable } from "tsyringe"

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