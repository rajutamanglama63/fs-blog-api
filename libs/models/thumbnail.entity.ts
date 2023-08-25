import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 't_thumbnails' })
export class Thumbnail extends BaseEntity {
  @Column({ name: 'url', type: 'varchar' })
  url: string;

  @Column({ name: 'public_id', type: 'varchar' })
  publicId: string;
}
