import { types } from '../tipos';
import { replaceObjects } from '../utils';

export const report = () => 'Converts Objects to JavaScript';

export function replace () {
  return {
    ...replaceObjects({
      objects: types
    })
  };
}
