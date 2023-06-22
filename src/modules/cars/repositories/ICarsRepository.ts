import { ICreateCarDTO } from "../dto/ICreateCarDTO"
import { Car } from "../infra/typeorm/entities/Car"

interface IListCars {
  category_id?: string
  maker?: string
  name?: string
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
  findAvailable(data: IListCars): Promise<Car[]>
}

export { ICarsRepository, IListCars }