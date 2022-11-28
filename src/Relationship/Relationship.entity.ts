import { TypeOfRelationship } from "../Types/TypeOfRelationship"; 
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Relationship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  SourceId: number;

  @Column({ nullable: false })
  TargetId: number;

  @Column({
    type: "enum",
    enum: TypeOfRelationship,
    default: TypeOfRelationship.requested,
  })
  Type: TypeOfRelationship;
}
