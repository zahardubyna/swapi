import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../app.roles';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String })
  @Column()
  username: string;

  @ApiProperty({ type: String })
  @Column()
  password: string;

  @ApiProperty({ type: String })
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  // @ApiProperty({ type: String })
  // @Column({ default: null })
  // refresh_token: string;
}
