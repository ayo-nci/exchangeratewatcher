import {
  Body,
  Controller,
  Res,
  Get,
  HttpStatus,
  Post,
  // Put,
  // Query,
  NotFoundException,
  // Delete,
  Param,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDTO } from './dto/createtransaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  //add an exchange rate transaction
  @Post('/create')
  async addtransactionTransaction(
    @Res() res,
    @Body() createtransactionDTO: CreateTransactionDTO,
  ) {
    const transactionTransaction =
      await this.transactionService.addExchangeTransaction(
        createtransactionDTO,
      );
    return res.status(HttpStatus.OK).json({
      message: 'Transaction has been created successfully',
      transactionTransaction,
    });
  }
  //Retrive exchange rate transaction list
  @Get('transactions')
  async getAllTransactions(@Res() res) {
    const allTransactions = await this.transactionService.getAllHistory();
    return res.status(HttpStatus.OK).json(allTransactions);
  }
  //Retrieve single exchange rate transaction by ID
  @Get('transaction/:transactionID')
  async getTransaction(@Res() res, @Param('transtionID_or_TBD') transactionID) {
    const transaction = await this.transactionService.getExchangeTransaction(
      transactionID,
    );
    if (!transaction)
      throw new NotFoundException('Transaction does not exist!');
    return res.status(HttpStatus.OK).json(transaction);
  }
  //Filter transaction history by property
  @Get('transactions/:transactionProperty')
  async filterTransactions(
    @Res() res,
    @Param('the_transactionProperty') transactionProperty,
  ) {
    const filteredTransactions =
      await this.transactionService.getFilteredHistory(transactionProperty);
    return res.status(HttpStatus.OK).json(filteredTransactions);
  }
}
