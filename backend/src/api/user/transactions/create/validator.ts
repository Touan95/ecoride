import { buildValidationMiddleware } from '../../../../core/middlewares';
import { validator } from '../../../../core/validator';
import { TransactionType } from '../../../../entities/transaction.entity';

export interface CreateTransactionRequest {
  body: {
    description: string;
    amount: number;
    transactionType: TransactionType
    payerId: string
    receiverId: string
  };
}


export const CreateTransactionValidator = {
  body: validator.object({
    description: validator.string().max(2000).required(),
    amount: validator.number().required(),
    transactionType: validator.string().valid(TransactionType).required(),
    payerId: validator.string().uuid().required(),
    receiverId: validator.string().uuid().required(),
  }),
};

export default buildValidationMiddleware(CreateTransactionValidator);
