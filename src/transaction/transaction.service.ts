import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './interfaces/transaction.interface';
import { Model } from 'mongoose';
import { CreateTransactionDTO } from './dto/createtransaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
  ) {}
  //Fetch all transaction history
  async getAllHistory(): Promise<Transaction[]> {
    const transactionHistory = await this.transactionModel.find().exec();
    return transactionHistory;
  }
  //Fetch single transaction
  async getExchangeTransaction(transactionID: string): Promise<Transaction> {
    const singleExchangeTransaction = await this.transactionModel
      .findById(transactionID)
      .exec();
    return singleExchangeTransaction;
  }
  //Filter history with date or from_currency or price type
  async getFilteredHistory(someProp: any): Promise<Transaction[]> {
    //const propKey = someProp[0];
    const propValue = someProp[1];
    // const filteredtransactionhistory = await this.transactionModel.findby(someProp).exec();
    const filteredTransactionHistory = await this.transactionModel
      .find({ from_currency: propValue })
      .exec();
    return filteredTransactionHistory;
  }
  //Post an exchange transaction
  async addExchangeTransaction(
    createTransactionDTO: CreateTransactionDTO,
  ): Promise<Transaction> {
    const newExchangeTransaction = await new this.transactionModel(
      createTransactionDTO,
    );
    return newExchangeTransaction.save();
  }
  //Delete an exchange transaction
  async deleteExchangeTransaction(transactionID): Promise<Transaction> {
    const delExchangeTransaction =
      await this.transactionModel.findByIdAndRemove(transactionID);
    return delExchangeTransaction;
  }
}
