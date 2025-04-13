import { Router } from 'express';
import route from './route';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const getBlockedUsers = Router().get('/users/blocked', validatedExpressRequest(route));
