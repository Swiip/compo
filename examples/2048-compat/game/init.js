import { range } from '../../../src/utils';

import { size } from './conf';
import { createTile } from './tile';

export function init() {
  const dimension = range(size);
  return dimension.map(() => dimension.map(() => createTile()));
}
