import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {OrderEntity} from '../models';
import {OrderEntityRepository} from '../repositories';

export class OrderControllerController {
  constructor(
    @repository(OrderEntityRepository)
    public orderEntityRepository : OrderEntityRepository,
  ) {}

  @post('/order-entities')
  @response(200, {
    description: 'OrderEntity model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderEntity)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderEntity, {
            title: 'NewOrderEntity',
            exclude: ['id'],
          }),
        },
      },
    })
    orderEntity: Omit<OrderEntity, 'id'>,
  ): Promise<OrderEntity> {
    return this.orderEntityRepository.create(orderEntity);
  }

  @get('/order-entities/count')
  @response(200, {
    description: 'OrderEntity model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderEntity) where?: Where<OrderEntity>,
  ): Promise<Count> {
    return this.orderEntityRepository.count(where);
  }

  @get('/order-entities')
  @response(200, {
    description: 'Array of OrderEntity model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderEntity, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderEntity) filter?: Filter<OrderEntity>,
  ): Promise<OrderEntity[]> {
    return this.orderEntityRepository.find(filter);
  }

  @patch('/order-entities')
  @response(200, {
    description: 'OrderEntity PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderEntity, {partial: true}),
        },
      },
    })
    orderEntity: OrderEntity,
    @param.where(OrderEntity) where?: Where<OrderEntity>,
  ): Promise<Count> {
    return this.orderEntityRepository.updateAll(orderEntity, where);
  }

  @get('/order-entities/{id}')
  @response(200, {
    description: 'OrderEntity model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderEntity, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OrderEntity, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderEntity>
  ): Promise<OrderEntity> {
    return this.orderEntityRepository.findById(id, filter);
  }

  @patch('/order-entities/{id}')
  @response(204, {
    description: 'OrderEntity PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderEntity, {partial: true}),
        },
      },
    })
    orderEntity: OrderEntity,
  ): Promise<void> {
    await this.orderEntityRepository.updateById(id, orderEntity);
  }

  @put('/order-entities/{id}')
  @response(204, {
    description: 'OrderEntity PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() orderEntity: OrderEntity,
  ): Promise<void> {
    await this.orderEntityRepository.replaceById(id, orderEntity);
  }

  @del('/order-entities/{id}')
  @response(204, {
    description: 'OrderEntity DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderEntityRepository.deleteById(id);
  }
}
