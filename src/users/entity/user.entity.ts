import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../decorators/roles.decorator';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: Role.User })
  role: string;
}
