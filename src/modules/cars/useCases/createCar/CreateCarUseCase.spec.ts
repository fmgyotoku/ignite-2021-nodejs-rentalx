import { CarsRepositoryMock } from "@modules/cars/infra/mock/CarsRepositoryMock"
import { CreateCarUseCase } from "./CreateCarUseCase"
import { AppError } from "@shared/errors/AppError"

let createCarUseCase: CreateCarUseCase
let carsRepositoryMock: CarsRepositoryMock

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock()
    createCarUseCase = new CreateCarUseCase(carsRepositoryMock)
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fox",
      description: "Fox Hatchback 1.6 Prime 5 doors",
      daily_rate: 70.00,
      license_plate: "ABC-123",
      fine_amount: 20.00,
      maker: "Volkswagen",
      category_id: "abcde"
    })

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car with existing license", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "i30",
        description: "i30 Hatchback 5 doors",
        daily_rate: 70.00,
        license_plate: "ABC-1235",
        fine_amount: 20.00,
        maker: "Hyundai",
        category_id: "abcde"
      })

      await createCarUseCase.execute({
        name: "Elantra",
        description: "Elantra sedan 4 doors",
        daily_rate: 70.00,
        license_plate: "ABC-1235",
        fine_amount: 20.00,
        maker: "Hyundai",
        category_id: "abcde"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create a new car with availability", async () => {
    const car = await createCarUseCase.execute({
      name: "Fox",
      description: "Fox Hatchback 1.6 Prime 5 doors",
      daily_rate: 70.00,
      license_plate: "ABC-1238",
      fine_amount: 20.00,
      maker: "Volkswagen",
      category_id: "abcde"
    })

    expect(car.available).toBe(true)
  })
})