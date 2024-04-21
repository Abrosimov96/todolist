import {AppStoreType} from '../store';
import { TodolistType } from '../todolists-reducer';

export const todolistSelector = (store: AppStoreType): TodolistType[] => store.todolists