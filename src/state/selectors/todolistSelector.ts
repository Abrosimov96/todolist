import {AppRootStateType} from '../store';
import { TodolistType } from '../todolists-reducer';

export const todolistSelector = (store: AppRootStateType): TodolistType[] => store.todolists