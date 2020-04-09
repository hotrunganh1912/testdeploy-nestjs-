import {
  Entity,
  Column,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn({ unique: true })
  _id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
}
