import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Thumbnail } from './thumbnail.entity';

@Entity({ name: 't_blogs' })
export class Blog extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @OneToOne(() => Thumbnail)
  @JoinColumn()
  thumbnail: Thumbnail;

  @Column({ name: 'meta', type: 'varchar', length: 255, nullable: true })
  meta?: string;

  @Column({ name: 'slug', type: 'varchar', length: 255 })
  slug: string;

  @Column({ name: 'featured', type: 'boolean', nullable: true })
  featured?: boolean;

  @Column({ name: 'tags', type: 'simple-array', nullable: true })
  tags?: string[];

  @ManyToOne(() => User, (user) => user.blogs)
  author: User;
}
