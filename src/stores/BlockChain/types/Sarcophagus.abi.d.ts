/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export interface SarcophagusAbi extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): SarcophagusAbi;
  clone(): SarcophagusAbi;
  methods: {
    sarcoToken(): NonPayableTransactionObject<string>;

    initialize(_sarcoToken: string): NonPayableTransactionObject<void>;

    archaeologistCount(): NonPayableTransactionObject<string>;

    archaeologistAddresses(
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    archaeologists(
      account: string
    ): NonPayableTransactionObject<
      [
        boolean,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    >;

    sarcophagusCount(): NonPayableTransactionObject<string>;

    sarcophagusIdentifier(
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    embalmerSarcophagusCount(
      embalmer: string
    ): NonPayableTransactionObject<string>;

    embalmerSarcophagusIdentifier(
      embalmer: string,
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    archaeologistSarcophagusCount(
      archaeologist: string
    ): NonPayableTransactionObject<string>;

    archaeologistSarcophagusIdentifier(
      archaeologist: string,
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    recipientSarcophagusCount(
      recipient: string
    ): NonPayableTransactionObject<string>;

    recipientSarcophagusIdentifier(
      recipient: string,
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    archaeologistSuccessesCount(
      archaeologist: string
    ): NonPayableTransactionObject<string>;

    archaeologistSuccessesIdentifier(
      archaeologist: string,
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    archaeologistCancelsCount(
      archaeologist: string
    ): NonPayableTransactionObject<string>;

    archaeologistCancelsIdentifier(
      archaeologist: string,
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    archaeologistAccusalsCount(
      archaeologist: string
    ): NonPayableTransactionObject<string>;

    archaeologistAccusalsIdentifier(
      archaeologist: string,
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    archaeologistCleanupsCount(
      archaeologist: string
    ): NonPayableTransactionObject<string>;

    archaeologistCleanupsIdentifier(
      archaeologist: string,
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    sarcophagus(
      identifier: string | number[]
    ): NonPayableTransactionObject<
      [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    >;

    registerArchaeologist(
      currentPublicKey: string | number[],
      endpoint: string,
      paymentAddress: string,
      feePerByte: number | string | BN,
      minimumBounty: number | string | BN,
      minimumDiggingFee: number | string | BN,
      maximumResurrectionTime: number | string | BN,
      freeBond: number | string | BN
    ): NonPayableTransactionObject<string>;

    updateArchaeologist(
      endpoint: string,
      newPublicKey: string | number[],
      paymentAddress: string,
      feePerByte: number | string | BN,
      minimumBounty: number | string | BN,
      minimumDiggingFee: number | string | BN,
      maximumResurrectionTime: number | string | BN,
      freeBond: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    withdrawBond(
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    createSarcophagus(
      name: string,
      archaeologist: string,
      resurrectionTime: number | string | BN,
      storageFee: number | string | BN,
      diggingFee: number | string | BN,
      bounty: number | string | BN,
      identifier: string | number[],
      recipientPublicKey: string | number[]
    ): NonPayableTransactionObject<string>;

    updateSarcophagus(
      newPublicKey: string | number[],
      identifier: string | number[],
      assetId: string,
      v: number | string | BN,
      r: string | number[],
      s: string | number[]
    ): NonPayableTransactionObject<boolean>;

    cancelSarcophagus(
      identifier: string | number[]
    ): NonPayableTransactionObject<boolean>;

    rewrapSarcophagus(
      identifier: string | number[],
      resurrectionTime: number | string | BN,
      diggingFee: number | string | BN,
      bounty: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    unwrapSarcophagus(
      identifier: string | number[],
      privateKey: string | number[]
    ): NonPayableTransactionObject<boolean>;

    accuseArchaeologist(
      identifier: string | number[],
      singleHash: string | number[],
      paymentAddress: string
    ): NonPayableTransactionObject<boolean>;

    burySarcophagus(
      identifier: string | number[]
    ): NonPayableTransactionObject<boolean>;

    cleanUpSarcophagus(
      identifier: string | number[],
      paymentAddress: string
    ): NonPayableTransactionObject<boolean>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}