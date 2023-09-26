import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'images' })
export class ImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'file_name' })
  file_name: string;

  @Column({ name: 'file_original_name' })
  file_original_name: string;

  @Column({ type: 'longtext', name: 'aws_url' })
  aws_url: string;
}
