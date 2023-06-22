import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from "uuid"

@Entity("specifications")
class Specification {
  @PrimaryColumn({ type: "uuid" })
  id?: string

  @Column({ type: "text" })
  name: string

  @Column({ type: "text" })
  description: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id)
      this.id = uuidv4()
  }
}

export { Specification }