import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Blog } from './blog.entity';

@Entity({ name: 't_thumbnails' })
export class Thumbnail extends BaseEntity {
  @Column({ name: 'url', type: 'varchar' })
  url: string;

  @Column({ name: 'public_id', type: 'varchar' })
  publicId: string;

  @OneToOne(() => Blog, (blog) => blog.thumbnail, { onDelete: 'CASCADE' })
  blog: Blog;
}
