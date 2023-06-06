import fs from "fs"
import { parse as csvParse } from "csv-parse"

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const parseFile = csvParse({ quote: "'" })
      const categories: IImportCategory[] = []

      stream.pipe(parseFile)

      parseFile.on('data', async (line) => {
        const [name, description] = line
        categories.push({
          name: name,
          description: description
        })
      })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map((category) => {
      const { name, description } = category

      const isExistingCategory = this.categoriesRepository.findByName(name)

      if (!isExistingCategory) {
        this.categoriesRepository.create({
          name,
          description
        })
      }
    })
  }
}

export { ImportCategoriesUseCase }