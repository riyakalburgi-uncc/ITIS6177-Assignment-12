import {Entity, model, property} from '@loopback/repository';

@model()
export class OrderEntity extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  order_date: string;

  @property({
    type: 'boolean',
    required: true,
  })
  is_complete: boolean;


  constructor(data?: Partial<OrderEntity>) {
    super(data);
  }
}

export interface OrderEntityRelations {
  // describe navigational properties here
}

export type OrderEntityWithRelations = OrderEntity & OrderEntityRelations;
