import { v4 as uuidv4 } from "uuid"
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity("categories")
class Category {
  @PrimaryColumn({type: "uuid"})
  id?: string

  @Column({type: "text"})
  name: string

  @Column({type: "text"})
  description: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id)
      this.id = uuidv4()
  }
}

export { Category }