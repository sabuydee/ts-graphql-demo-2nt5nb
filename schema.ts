// A simple schema that can be queried in GraphiQL -->
// Open the Docs pane to view the schema.
// Try adding some types yourself
import {
  Field,
  Implements,
  InterfaceType,
  ObjectType,
  enumType,
  list,
  TSGraphQLInt,
  buildObjectType,
  buildNamedTypes,
  EnumTypeCase,
} from 'ts-graphql';
import { GraphQLSchema, printSchema } from 'graphql';

enum VehicleClassification {
  Commercial,
  NonCommercial,
}

const VehicleClassificationGraphQL = enumType(VehicleClassification, {
  name: 'VehicleClassification',
  changeCase: EnumTypeCase.Constant,
});

@InterfaceType()
abstract class Vehicle {
  @Field({ type: () => TSGraphQLInt })
  wheels!: number;

  @Field({ type: () => VehicleClassificationGraphQL })
  classification!: VehicleClassification;
}

@ObjectType()
@Implements(Vehicle)
class Motorcycle {
  classification = VehicleClassification.NonCommercial;
  wheels = 2;
}

enum CarType {
  Sedan,
  StationWagon,
  SUV,
}

const CarTypeGraphQL = enumType(CarType, {
  name: 'CarType',
  changeCase: EnumTypeCase.Constant,
});

@ObjectType()
@Implements(Vehicle)
class Car {
  classification = VehicleClassification.NonCommercial;
  wheels = 4;

  @Field({ type: () => CarTypeGraphQL })
  type: CarType;

  constructor(type: CarType) {
    this.type = type;
  }
}

@ObjectType()
@Implements(Vehicle)
class TractorTrailer {
  classification = VehicleClassification.Commercial;
  wheels = 18;
}

@ObjectType()
class Query {
  @Field({ type: () => list(Vehicle) })
  vehicles() {
    return [
      new Motorcycle(),
      new Car(CarType.Sedan),
      new Car(CarType.SUV),
      new TractorTrailer(),
    ];
  }
}

export default new GraphQLSchema({
  query: buildObjectType(Query),
  // Interface implementations that aren't referenced
  // somewhere in the schema need to be passed in
  types: buildNamedTypes([
    Motorcycle,
    Car,
    TractorTrailer,
  ]),
});