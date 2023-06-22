import { v4 as uuidv4 } from "uuid"
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity("users")
class User {
  @PrimaryColumn({type: "uuid"})
  id?: string

  @Column({type: "text"})
  name: string

  @Column({type: "text"})
  password: string

  @Column({type: "text"})
  email: string

  @Column({type: "text"})
  driver_license: string

  @Column({type: "boolean"})
  isAdmin: boolean

  @Column({type: "text"})
  avatar: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id)
      this.id = uuidv4()
  }
}

export { User }