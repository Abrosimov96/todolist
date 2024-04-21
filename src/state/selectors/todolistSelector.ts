import {AppStoreType} from '../store';
import {TodolistType} from '../../App';

export const todolistSelector = (store: AppStoreType): TodolistType[] => store.todolists