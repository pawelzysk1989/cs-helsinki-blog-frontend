import { Unset } from '../types/unset';

const isUnset = <T>(candidate: T | Unset): candidate is Unset =>
  candidate === undefined || candidate === null;

export default isUnset;
