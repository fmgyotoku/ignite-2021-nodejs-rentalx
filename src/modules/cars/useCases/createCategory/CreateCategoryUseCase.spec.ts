import { AppError } from "@shared/errors/AppError"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { CategoriesRepositoryMock } from "@modules/cars/infra/mock/CategoriesRepositoryMock"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryMock: CategoriesRepositoryMock

describe("Create Category", () => {
  
  beforeEach(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock)
  })

  it ("should be able to create a new category", async () => {
    const category = {
      name: "Category test", 
      description: "Category description test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })

    const categoryCreated = await  categoriesRepositoryMock.findByName(
      category.name
    )

    expect(categoryCreated).toHaveProperty("id")
  })

  it ("should not be able to create a new category with same name", async () => {
    expect(async () => {
      const category = {
        name: "Category test", 
        description: "Category description test"
      }
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})

export { CategoriesRepositoryMock }