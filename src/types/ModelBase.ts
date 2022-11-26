import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ModelBase{
    @PrimaryGeneratedColumn()
    id: number;
}