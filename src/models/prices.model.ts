import {Entity, model, property} from '@loopback/repository';

@model()
export class Prices extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  priceId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  current_price: number;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;


  constructor(data?: Partial<Prices>) {
    super(data);
  }
}

export interface PricesRelations {
  // describe navigational properties here
}

export type PricesWithRelations = Prices & PricesRelations;
