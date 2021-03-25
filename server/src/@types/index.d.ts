export declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]> | T[P];
};

export declare type FindConditions<T> = {
  [P in keyof T]?: FindConditions<T[P]>;
};

export interface FindOneOptions<Entity = any> {
  select?: (keyof Entity)[];

  where?: FindConditions<Entity>;

  relations?: string[];

  order?: {
    [P in EntityFieldsNames<Entity>]?: 'ASC' | 'DESC' | 1 | -1;
  };
}

export interface FindManyOptions<Entity = any> extends FindOneOptions<Entity> {
  skip?: number;
  take?: number;
}
