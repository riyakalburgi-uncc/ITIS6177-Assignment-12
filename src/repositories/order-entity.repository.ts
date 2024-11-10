import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {OrderEntity, OrderEntityRelations} from '../models';

export class OrderEntityRepository extends DefaultCrudRepository<
  OrderEntity,
  typeof OrderEntity.prototype.id,
  OrderEntityRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(OrderEntity, dataSource);
  }
}
