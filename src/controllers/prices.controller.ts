import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {getBitcoinPrices} from '../helper/bitcoin-api';
import {Prices} from '../models';
import {PricesRepository} from '../repositories';

export class PricesController {
  constructor(
    @repository(PricesRepository)
    public pricesRepository: PricesRepository,
  ) {}

  @post('/prices')
  @response(200, {
    description: 'Prices model instance',
    content: {'application/json': {schema: getModelSchemaRef(Prices)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prices, {
            title: 'NewPrices',
            exclude: ['priceId'],
          }),
        },
      },
    })
    prices: Omit<Prices, 'priceId'>,
  ): Promise<Prices> {
    return this.pricesRepository.create(prices);
  }

  @get('/prices/count')
  @response(200, {
    description: 'Prices model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Prices) where?: Where<Prices>): Promise<Count> {
    return this.pricesRepository.count(where);
  }

  @get('/bitcoin/prices')
  @response(200, {
    description: 'Array of bitcoin prices',
    content: {
      'application/json': {
        type: 'any',
      },
    },
  })
  async getBTPrices(): Promise<any> {
    return getBitcoinPrices();
    // try {
    //   const data = getBitcoinPrices();
    //   return await Promise.resolve(data);
    // } catch (error) {
    //   return Promise.reject(error);
    // }
  }

  @get('/prices')
  @response(200, {
    description: 'Array of Prices model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Prices, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Prices) filter?: Filter<Prices>): Promise<Prices[]> {
    return this.pricesRepository.find(filter);
  }

  @patch('/prices')
  @response(200, {
    description: 'Prices PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prices, {partial: true}),
        },
      },
    })
    prices: Prices,
    @param.where(Prices) where?: Where<Prices>,
  ): Promise<Count> {
    return this.pricesRepository.updateAll(prices, where);
  }

  @get('/prices/{id}')
  @response(200, {
    description: 'Prices model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Prices, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Prices, {exclude: 'where'})
    filter?: FilterExcludingWhere<Prices>,
  ): Promise<Prices> {
    return this.pricesRepository.findById(id, filter);
  }

  @patch('/prices/{id}')
  @response(204, {
    description: 'Prices PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prices, {partial: true}),
        },
      },
    })
    prices: Prices,
  ): Promise<void> {
    await this.pricesRepository.updateById(id, prices);
  }

  @put('/prices/{id}')
  @response(204, {
    description: 'Prices PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() prices: Prices,
  ): Promise<void> {
    await this.pricesRepository.replaceById(id, prices);
  }

  @del('/prices/{id}')
  @response(204, {
    description: 'Prices DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pricesRepository.deleteById(id);
  }
}
