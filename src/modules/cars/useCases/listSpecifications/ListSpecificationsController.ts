import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { Specification } from "../../model/Specification";

class ListSpecificationsController {
    constructor(private listSpecificationUseCase: ListSpecificationsUseCase) { }

    handle(request: Request, response: Response): Specification[] {
        return this.listSpecificationUseCase.execute(request, response)
    }
}

export { ListSpecificationsController }