import React from 'react';
import GraphiQL from 'graphiql';
import { graphql } from 'graphql';
import { render } from 'react-dom';
import schema from './schema';

import 'normalize.css';
import 'graphiql/graphiql.css';
import './style.css';

const fetcher = (params: any) => {
  console.log(params);
  return graphql(schema, params.query, params.variables);
}

const defaultQuery = `{
  vehicles {
    wheels
    classification
    ...on Car {
      type
    }
  }
}`;

render(
  <GraphiQL fetcher={fetcher} schema={schema} defaultQuery={defaultQuery}/>,
  document.getElementById('root'),
);
