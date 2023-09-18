import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 't_blogs' })
export class Blog extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'desc', type: 'varchar' })
  desc: string;

  @Column({ name: 'meta', type: 'varchar', length: 255, nullable: true })
  meta?: string;

  @Column({ name: 'slug', type: 'varchar', length: 255, nullable: true })
  slug: string;

  @Column({ name: 'featured', type: 'boolean', nullable: true })
  featured?: boolean;

  @Column({ name: 'tags', type: 'simple-array', nullable: true })
  tags?: string[];

  @Column({ name: 'thumbnail', type: 'varchar', nullable: true })
  thumbnail?: string;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  image?: string;

  @ManyToOne(() => User, (user) => user.blogs)
  author: User;
}
