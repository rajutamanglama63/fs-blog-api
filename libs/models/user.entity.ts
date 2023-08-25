import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Blog } from './blog.entity';

@Entity({ name: 't_users' })
export class User extends BaseEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];
}
