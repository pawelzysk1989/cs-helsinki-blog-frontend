import { Unset } from '../types/unset';
import isUnset from './is_unset';

const isSet = <T>(candidate: T | Unset): candidate is T => !isUnset(candidate);

export default isSet;
