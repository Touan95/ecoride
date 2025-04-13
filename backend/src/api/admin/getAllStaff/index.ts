import { Router } from 'express';
import route from './route';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const getAllStaff = Router().get('/staff', validatedExpressRequest(route));
